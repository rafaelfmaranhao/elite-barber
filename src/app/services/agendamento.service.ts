import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agendamento, AgendamentoAtual, Subcategoria } from '../models/agendamento.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private agendamentosSubject = new BehaviorSubject<Agendamento[]>(this.getAgendamentosFromStorage());
  public agendamentos$ = this.agendamentosSubject.asObservable();

  private agendamentoAtual: AgendamentoAtual = {
    servico: null,
    subcategoria: null,
    data: null,
    horario: null,
    observacoes: null
  };

  private passoAtual = 1;
  private mesCalendario = new Date();
  private dataMinima = new Date();

  constructor() {
    this.agendamentos$.subscribe(agendamentos => {
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    });
  }

  private getAgendamentosFromStorage(): Agendamento[] {
    const stored = localStorage.getItem('agendamentos');
    return stored ? JSON.parse(stored) : [];
  }

  getAgendamentoAtual(): AgendamentoAtual {
    return { ...this.agendamentoAtual };
  }

  setAgendamentoAtual(agendamento: Partial<AgendamentoAtual>): void {
    this.agendamentoAtual = { ...this.agendamentoAtual, ...agendamento };
  }

  resetAgendamentoAtual(): void {
    this.agendamentoAtual = {
      servico: null,
      subcategoria: null,
      data: null,
      horario: null,
      observacoes: null
    };
    this.passoAtual = 1;
  }

  getPassoAtual(): number {
    return this.passoAtual;
  }

  setPassoAtual(passo: number): void {
    this.passoAtual = passo;
  }

  getMesCalendario(): Date {
    return this.mesCalendario;
  }

  setMesCalendario(data: Date): void {
    this.mesCalendario = data;
  }

  getDataMinima(): Date {
    return this.dataMinima;
  }

  setDataMinima(data: Date): void {
    this.dataMinima = data;
  }

  getSubcategorias(servico: string): Subcategoria[] {
    const subcategorias: { [key: string]: Subcategoria[] } = {
      corte: [
        { id: 'corte-social', nome: 'Corte Social', valor: 60 },
        { id: 'corte-degrad', nome: 'Corte Degradê', valor: 60 },
        { id: 'corte-taper', nome: 'Corte Taper', valor: 60 },
        { id: 'corte-skin', nome: 'Corte Skin', valor: 70 }
      ],
      barba: [
        { id: 'barba-completa', nome: 'Barba Completa', valor: 45 },
        { id: 'barba-manutenção', nome: 'Manutenção', valor: 30 },
        { id: 'barba-design', nome: 'Design de Barba', valor: 50 }
      ],
      luzes: [
        { id: 'luzes-meches', nome: 'Mechas', valor: 120 },
        { id: 'luzes-tinta', nome: 'Tinta', valor: 100 },
        { id: 'luzes-ombre', nome: 'Ombre Hair', valor: 150 }
      ]
    };
    return subcategorias[servico] || [];
  }

  getHorariosDisponiveis(): string[] {
    const horarios: string[] = [];
    const inicio = 9;
    const fim = 18;
    const pausa_inicio = 13;
    const pausa_fim = 14;

    for (let hora = inicio; hora < fim; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        if (!(hora >= pausa_inicio && hora < pausa_fim)) {
          const horaStr = String(hora).padStart(2, '0');
          const minutoStr = String(minuto).padStart(2, '0');
          horarios.push(`${horaStr}:${minutoStr}`);
        }
      }
    }
    return horarios;
  }

  confirmarAgendamento(usuario: Usuario): Agendamento {
    const novoAgendamento: Agendamento = {
      id: Date.now(),
      usuario: usuario.email,
      subcategoria: this.agendamentoAtual.subcategoria?.id || '',
      servico: this.agendamentoAtual.servico || '',
      data: this.agendamentoAtual.data || '',
      horario: this.agendamentoAtual.horario || '',
      whatsapp: usuario.whatsapp,
      status: 'confirmado',
      observacoes: this.agendamentoAtual.observacoes || undefined,
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
      nomeSubcategoria: this.agendamentoAtual.subcategoria?.nome || ''
    };

    const agendamentos = this.agendamentosSubject.value;
    agendamentos.push(novoAgendamento);
    this.agendamentosSubject.next(agendamentos);

    return novoAgendamento;
  }

  getAgendamentosPorUsuario(email: string): Agendamento[] {
    return this.agendamentosSubject.value.filter(a => a.usuario === email);
  }

  cancelarAgendamento(id: number): void {
    const agendamentos = this.agendamentosSubject.value.filter(a => a.id !== id);
    this.agendamentosSubject.next(agendamentos);
  }

  adiarAgendamento(id: number, novaData: string, novoHorario: string): void {
    const agendamentos = this.agendamentosSubject.value;
    const agendamento = agendamentos.find(a => a.id === id);
    if (agendamento) {
      agendamento.data = novaData;
      agendamento.horario = novoHorario;
      this.agendamentosSubject.next([...agendamentos]);
    }
  }

  getNomeServico(subcategoriaId: string): string {
    const nomes: { [key: string]: string } = {
      'corte-social': 'Corte Social',
      'corte-degrad': 'Corte Degradê',
      'corte-taper': 'Corte Taper',
      'corte-skin': 'Corte Skin',
      'barba-completa': 'Barba Completa',
      'barba-manutenção': 'Manutenção de Barba',
      'barba-design': 'Design de Barba',
      'luzes-meches': 'Mechas',
      'luzes-tinta': 'Tinta',
      'luzes-ombre': 'Ombre Hair'
    };
    return nomes[subcategoriaId] || subcategoriaId;
  }
}

