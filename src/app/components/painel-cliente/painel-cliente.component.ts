import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { Agendamento } from '../../models/agendamento.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-painel-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-cliente.component.html',
  styleUrl: './painel-cliente.component.css'
})
export class PainelClienteComponent implements OnInit, OnDestroy {
  mostrarPainel = false;
  usuario: Usuario | null = null;
  agendamentos: Agendamento[] = [];

  private atualizarListener: any;

  constructor(
    private authService: AuthService,
    private agendamentoService: AgendamentoService
  ) {}

  ngOnInit(): void {
    this.atualizarListener = () => this.atualizarPainel();
    window.addEventListener('atualizarPainel', this.atualizarListener);
    
    this.authService.usuarioLogado$.subscribe((usuario: Usuario | null) => {
      this.usuario = usuario;
      this.atualizarPainel();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('atualizarPainel', this.atualizarListener);
  }

  atualizarPainel(): void {
    this.usuario = this.authService.getUsuarioLogado();
    this.mostrarPainel = !!this.usuario;
    
    if (this.usuario) {
      this.agendamentos = this.agendamentoService.getAgendamentosPorUsuario(this.usuario.email);
    } else {
      this.agendamentos = [];
    }
  }

  logout(): void {
    this.authService.logout();
    this.mostrarPainel = false;
    alert('Desconectado com sucesso!');
  }

  abrirModalAgendamento(): void {
    window.dispatchEvent(new CustomEvent('abrirModalAgendamento'));
  }

  cancelarAgendamento(id: number): void {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.agendamentoService.cancelarAgendamento(id);
      this.atualizarPainel();
      alert('Agendamento cancelado!');
    }
  }

  adiarAgendamento(id: number): void {
    const novaData = prompt('Digite a nova data (YYYY-MM-DD):');
    const novoHorario = prompt('Digite o novo horário (HH:MM):');

    if (novaData && novoHorario) {
      this.agendamentoService.adiarAgendamento(id, novaData, novoHorario);
      this.atualizarPainel();
      alert('Agendamento adiado com sucesso!');
    }
  }

  getNomeServico(subcategoriaId: string): string {
    return this.agendamentoService.getNomeServico(subcategoriaId);
  }

  formatarData(data: string): string {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
  }
}

