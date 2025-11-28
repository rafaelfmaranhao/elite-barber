# Elite Barber - Angular

Plataforma de agendamento para barbearia desenvolvida com Angular 21, utilizando componentes standalone e arquitetura modular.

## 📋 Sobre o Projeto

Elite Barber é uma aplicação web que permite clientes agendarem serviços em uma barbearia. O sistema inclui autenticação de usuários, seleção de serviços, calendário interativo e painel de gerenciamento de agendamentos.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/                    # Cabeçalho com navegação
│   │   ├── hero/                      # Seção hero com call-to-action
│   │   ├── servicos/                  # Listagem de serviços
│   │   ├── modal-agendamento/         # Modal com fluxo de agendamento
│   │   ├── modal-login/               # Modal de autenticação
│   │   └── painel-cliente/            # Painel com agendamentos do usuário
│   ├── services/
│   │   ├── auth.service.ts            # Autenticação e gerenciamento de usuário
│   │   └── agendamento.service.ts     # Gerenciamento de agendamentos
│   ├── models/
│   │   ├── usuario.model.ts           # Modelo de usuário
│   │   └── agendamento.model.ts       # Modelo de agendamento
│   ├── app.component.ts               # Componente raiz
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts                  # Configuração da aplicação
│   └── styles.css                     # Estilos globais
├── index.html
└── main.ts
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- npm (v9 ou superior)

### Passos

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd elite-barber
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em desenvolvimento:
```bash
npm start
```
Ou apenas
```bash
ng serve
```

4. Abra seu navegador e acesse:
```
http://localhost:4200
```

### Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão em `dist/`

## ✨ Funcionalidades

- 🔐 **Autenticação**: Login e cadastro de usuários
- 📅 **Agendamento**: Fluxo intuitivo de agendamento com 4 etapas
- 📆 **Calendário**: Seleção visual de datas e horários disponíveis
- 👤 **Painel do Cliente**: Visualização e gerenciamento de agendamentos
- 💾 **Persistência**: Armazenamento local com localStorage
- 📱 **Responsivo**: Design adaptável para diferentes dispositivos

## 🧩 Componentes

### HeaderComponent
Cabeçalho com navegação principal e botão de login/acesso ao painel.

### HeroComponent
Seção inicial com apresentação do negócio e call-to-action.

### ServicosComponent
Listagem de serviços disponíveis oferecidos pela barbearia.

### ModalAgendamentoComponent
Modal com fluxo de agendamento em 4 etapas:
1. **Seleção de Serviço**: Escolha o tipo de serviço desejado
2. **Seleção de Subcategoria**: Escolha variações do serviço (ex: tipo de corte)
3. **Seleção de Data e Horário**: Escolha data e horário disponível
4. **Confirmação**: Revise os dados e confirme o agendamento

### ModalLoginComponent
Modal com abas para:
- Login de usuários existentes
- Cadastro de novos usuários

### PainelClienteComponent
Painel exibido após autenticação com:
- Lista de agendamentos do usuário
- Informações do perfil
- Ações para gerenciar agendamentos (cancelar/adiar)

## 🔧 Services

### AuthService
Responsável por:
- Autenticação de usuários
- Gerenciamento de sessão
- Persistência de dados de usuário em localStorage

### AgendamentoService
Responsável por:
- CRUD de agendamentos
- Gerenciamento de calendário e horários
- Consulta de disponibilidade

## 🛠 Tecnologias

- **Angular**: 21.0.0 - Framework principal
- **TypeScript**: 5.9.0 - Linguagem de programação
- **CSS3**: Estilização customizada
- **localStorage**: Persistência de dados no navegador
- **Componentes Standalone**: Arquitetura modular sem módulos

## 👨‍💻 Autor

**Rafael Fernandes Maranhão**
**Diego Ferreira da Silva**
**Samuel Vitor das Chagas Leite**
**Arthur Fellipe Lima da Silva**

## 📝 Licença

Este projeto é de uso educacional.
