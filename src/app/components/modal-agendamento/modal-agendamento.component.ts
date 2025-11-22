import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgendamentoService } from '../../services/agendamento.service';
import { AuthService } from '../../services/auth.service';
import { Subcategoria, AgendamentoAtual } from '../../models/agendamento.model';

@Component({
  selector: 'app-modal-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-agendamento.component.html',
  styleUrl: './modal-agendamento.component.css'
})
export class ModalAgendamentoComponent implements OnInit, OnDestroy {
  mostrarModal = false;
  passoAtual = 1;
  servicoSelecionado: string | null = null;
  nomeServicoSelecionado: string = '';
  subcategorias: Subcategoria[] = [];
  subcategoriaSelecionada: Subcategoria | null = null;
  mostrarOutroServico = false;
  outroServicoNome = '';
  outroServicoValor = '';
  dataSelecionada: string | null = null;
  horarioSelecionado: string | null = null;
  observacoes = '';
  mesCalendario = new Date();
  dataMinima = new Date();
  diasCalendario: any[] = [];
  horariosDisponiveis: string[] = [];
  mostrarHorarios = false;

  private abrirModalListener: any;
  private fecharModalListener: any;

  constructor(
    private agendamentoService: AgendamentoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.abrirModalListener = () => this.abrirModal();
    this.fecharModalListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.fecharModal();
      }
    };
    window.addEventListener('abrirModalAgendamento', this.abrirModalListener);
    window.addEventListener('keydown', this.fecharModalListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('abrirModalAgendamento', this.abrirModalListener);
    window.removeEventListener('keydown', this.fecharModalListener);
  }

  abrirModal(): void {
    if (!this.authService.isLoggedIn()) {
      alert('Faça login para agendar um corte!');
      window.dispatchEvent(new CustomEvent('abrirModalLogin'));
      return;
    }
    this.agendamentoService.resetAgendamentoAtual();
    this.resetarFormulario();
    this.mostrarModal = true;
    this.passoAtual = 1;
  }

  fecharModal(): void {
    this.mostrarModal = false;
    this.resetarFormulario();
  }

  resetarFormulario(): void {
    this.passoAtual = 1;
    this.servicoSelecionado = null;
    this.nomeServicoSelecionado = '';
    this.subcategorias = [];
    this.subcategoriaSelecionada = null;
    this.mostrarOutroServico = false;
    this.outroServicoNome = '';
    this.outroServicoValor = '';
    this.dataSelecionada = null;
    this.horarioSelecionado = null;
    this.observacoes = '';
    this.mesCalendario = new Date();
    this.dataMinima = new Date();
    this.mostrarHorarios = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.fecharModal();
    }
  }

  selecionarServico(servico: string, nome: string): void {
    this.servicoSelecionado = servico;
    this.nomeServicoSelecionado = nome;
    this.subcategorias = this.agendamentoService.getSubcategorias(servico);
    this.subcategoriaSelecionada = null;
    this.mostrarOutroServico = false;
    this.passoAtual = 2;
    this.agendamentoService.setAgendamentoAtual({ servico });
  }

  selecionarSubcategoria(subcategoria: Subcategoria): void {
    this.subcategoriaSelecionada = subcategoria;
    this.agendamentoService.setAgendamentoAtual({ subcategoria });
  }

  abrirOutroServico(): void {
    this.mostrarOutroServico = true;
  }

  confirmarOutroServico(): void {
    if (!this.outroServicoNome || !this.outroServicoValor) {
      alert('Preencha o nome e valor do serviço!');
      return;
    }
    const subcategoria: Subcategoria = {
      id: 'outro-' + Date.now(),
      nome: this.outroServicoNome,
      valor: parseFloat(this.outroServicoValor)
    };
    this.subcategoriaSelecionada = subcategoria;
    this.agendamentoService.setAgendamentoAtual({ subcategoria });
    this.mostrarOutroServico = false;
    this.outroServicoNome = '';
    this.outroServicoValor = '';
  }

  avancarPasso(): void {
    if (this.passoAtual === 2) {
      if (!this.subcategoriaSelecionada) {
        alert('Selecione uma opção!');
        return;
      }
      this.passoAtual = 3;
      this.inicializarCalendario();
    } else if (this.passoAtual === 3) {
      if (!this.dataSelecionada || !this.horarioSelecionado) {
        alert('Selecione data e horário!');
        return;
      }
      this.passoAtual = 4;
    }
  }

  voltarPasso(): void {
    if (this.passoAtual > 1) {
      this.passoAtual--;
      if (this.passoAtual === 2) {
        this.mostrarHorarios = false;
      }
    }
  }

  inicializarCalendario(): void {
    const hoje = new Date();
    this.dataMinima = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    this.mesCalendario = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    this.gerarCalendario();
  }

  gerarCalendario(): void {
    const ano = this.mesCalendario.getFullYear();
    const mes = this.mesCalendario.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaSemanaPrimeiro = primeiroDia.getDay();

    this.diasCalendario = [];
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

    diasSemana.forEach(dia => {
      this.diasCalendario.push({ tipo: 'header', texto: dia });
    });

    for (let i = 0; i < diaSemanaPrimeiro; i++) {
      this.diasCalendario.push({ tipo: 'vazio', texto: '' });
    }

    for (let dia = 1; dia <= diasNoMes; dia++) {
      const dataAtual = new Date(ano, mes, dia);
      const dataString = dataAtual.toISOString().split('T')[0];
      const isDesabilitado = dataAtual < this.dataMinima;
      const isSelecionado = dataString === this.dataSelecionada;

      this.diasCalendario.push({
        tipo: 'dia',
        numero: dia,
        data: dataString,
        desabilitado: isDesabilitado,
        selecionado: isSelecionado
      });
    }

    const diasRestantes = 42 - (diaSemanaPrimeiro + diasNoMes);
    for (let i = 0; i < diasRestantes; i++) {
      this.diasCalendario.push({ tipo: 'vazio', texto: '' });
    }
  }

  getMesAnoFormatado(): string {
    return this.mesCalendario.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  }

  mesAnterior(): void {
    const hoje = new Date();
    const mesAtualComparacao = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const mesCalendarioComparacao = new Date(this.mesCalendario.getFullYear(), this.mesCalendario.getMonth(), 1);

    if (mesCalendarioComparacao > mesAtualComparacao) {
      this.mesCalendario.setMonth(this.mesCalendario.getMonth() - 1);
      this.gerarCalendario();
    }
  }

  proximoMes(): void {
    this.mesCalendario.setMonth(this.mesCalendario.getMonth() + 1);
    this.gerarCalendario();
  }

  selecionarData(data: string): void {
    this.dataSelecionada = data;
    this.horarioSelecionado = null;
    this.agendamentoService.setAgendamentoAtual({ data });
    this.gerarCalendario();
    this.gerarHorarios();
    this.mostrarHorarios = true;
  }

  gerarHorarios(): void {
    this.horariosDisponiveis = this.agendamentoService.getHorariosDisponiveis();
  }

  selecionarHorario(horario: string): void {
    this.horarioSelecionado = horario;
    this.agendamentoService.setAgendamentoAtual({ horario });
  }

  getResumoAgendamento(): string {
    const usuario = this.authService.getUsuarioLogado();
    if (!usuario || !this.subcategoriaSelecionada || !this.dataSelecionada || !this.horarioSelecionado) {
      return '';
    }

    const data = new Date(this.dataSelecionada + 'T00:00:00');
    const dataFormatada = data.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let html = `
      <p><strong>Serviço:</strong> ${this.subcategoriaSelecionada.nome}</p>
      <p><strong>Data:</strong> ${dataFormatada}</p>
      <p><strong>Horário:</strong> ${this.horarioSelecionado}</p>
      <p><strong>Cliente:</strong> ${usuario.nome}</p>
      <p><strong>E-mail:</strong> ${usuario.email}</p>
      <p><strong>WhatsApp:</strong> ${usuario.whatsapp}</p>
    `;

    if (this.observacoes) {
      html += `<p><strong>Observações:</strong> ${this.observacoes}</p>`;
    }

    return html;
  }

  confirmarAgendamento(): void {
    const usuario = this.authService.getUsuarioLogado();
    if (!usuario) {
      return;
    }

    this.agendamentoService.setAgendamentoAtual({ observacoes: this.observacoes });
    const agendamento = this.agendamentoService.confirmarAgendamento(usuario);
    this.enviarConfirmacao(agendamento);
    alert('Agendamento realizado com sucesso! Confirmação enviada por email e WhatsApp.');
    this.fecharModal();
    window.dispatchEvent(new CustomEvent('atualizarPainel'));
  }

  enviarConfirmacao(agendamento: any): void {
    const usuario = this.authService.getUsuarioLogado();
    if (!usuario) return;

    const data = new Date(agendamento.data + 'T00:00:00');
    const dataFormatada = data.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const nomeServico = this.agendamentoService.getNomeServico(agendamento.subcategoria) || agendamento.servico;

    const mensagem = `Olá ${usuario.nome}!

Seu agendamento foi confirmado:

Serviço: ${nomeServico}
Data: ${dataFormatada}
Horário: ${agendamento.horario}
Cliente: ${usuario.nome}
E-mail: ${usuario.email}
WhatsApp: ${usuario.whatsapp}
${agendamento.observacoes ? `Observações: ${agendamento.observacoes}` : ''}

Obrigado por escolher nossos serviços!

Elite Barber`;

    const emailLink = `mailto:${usuario.email}?subject=Confirmação de Agendamento - Elite Barber&body=${encodeURIComponent(mensagem)}`;
    window.open(emailLink);

    const telefone = '5583991816152';
    const mensagemWhatsApp = `Olá, tenho um novo agendamento:\n\n${mensagem}`;
    const whatsappLink = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagemWhatsApp)}`;
    window.open(whatsappLink);
  }
}

