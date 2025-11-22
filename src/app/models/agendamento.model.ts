export interface Agendamento {
  id: number;
  usuario: string;
  subcategoria: string;
  servico: string;
  data: string;
  horario: string;
  whatsapp: string;
  status: string;
  observacoes?: string;
  dataCriacao: string;
}

export interface Subcategoria {
  id: string;
  nome: string;
  valor: number;
}

export interface AgendamentoAtual {
  servico: string | null;
  subcategoria: Subcategoria | null;
  data: string | null;
  horario: string | null;
  observacoes: string | null;
}

