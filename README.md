# Elite Barber - Angular

Projeto de barbearia convertido para Angular com componentes separados.

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Componente de cabeçalho
│   │   ├── hero/            # Componente hero section
│   │   ├── servicos/        # Componente de serviços
│   │   ├── modal-agendamento/  # Modal de agendamento
│   │   ├── modal-login/     # Modal de login/cadastro
│   │   └── painel-cliente/  # Painel do cliente
│   ├── services/
│   │   ├── auth.service.ts      # Serviço de autenticação
│   │   └── agendamento.service.ts # Serviço de agendamentos
│   ├── models/
│   │   ├── usuario.model.ts
│   │   └── agendamento.model.ts
│   ├── app.component.ts
│   └── app.module.ts
├── styles.css               # Estilos globais
└── index.html
```

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto:
```bash
npm start
```

O projeto estará disponível em `http://localhost:4200`

## Funcionalidades

- ✅ Sistema de autenticação (login/cadastro)
- ✅ Agendamento de serviços com múltiplos passos
- ✅ Calendário visual para seleção de data
- ✅ Painel do cliente com agendamentos
- ✅ Gerenciamento de agendamentos (cancelar/adiar)
- ✅ Armazenamento local (localStorage)

## Componentes

### HeaderComponent
Cabeçalho com navegação e botão de login.

### HeroComponent
Seção hero com call-to-action.

### ServicosComponent
Exibição dos serviços disponíveis.

### ModalAgendamentoComponent
Modal com formulário progressivo em 4 etapas:
1. Seleção de serviço
2. Seleção de subcategoria
3. Seleção de data e horário
4. Confirmação

### ModalLoginComponent
Modal com abas para login e cadastro.

### PainelClienteComponent
Painel exibido após login com:
- Lista de agendamentos
- Informações do usuário
- Ações para gerenciar agendamentos

## Services

### AuthService
Gerencia autenticação de usuários com localStorage.

### AgendamentoService
Gerencia agendamentos, calendário e horários disponíveis.

## Tecnologias

- Angular 21
- TypeScript 5.6
- CSS3
- LocalStorage para persistência
- Standalone Components

