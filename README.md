# Network-2---Talkify

## Descrição

> Este projeto é uma aplicação web full-stack desenvolvida com **React** no frontend e **NodeJs** no backend. A aplicação permite que o usuário faça a criação de chats em grupo e chats privados, onde é possível fazer a troca de mensagens entre dispositivos.

---

## Índice

- [Tecnologias Usadas](#tecnologias-usadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Frontend](#frontend-angular)
- [Backend](#backend-spring-boot)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Iniciando o projeto](#iniciando-o-projeto)

---

## Tecnologias Usadas

- **Frontend**: [React](https://react.dev/learn)
- **Backend**: [Node](https://nodejs.org/pt), WebSockets, BCrypt, Express
- **Banco de Dados**: [MongoDb](https://www.mongodb.com/pt-br)
- **Autenticação**: JWT (JSON Web Tokens)

---

## Instalação e Configuração

### Pré-requisitos

- Node.js e npm (para o front-end e back-end)
- MongoDB (para o banco de dados)
- Docker (Para iniciar o container do banco)

### Passos para Instalação

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/guilhermegoncalvescolhado/Network-2---Talkify.git
   cd Network-2---Talkify
   ```
2. **Configuração do backend**

    1. Navegue até o diretório do backend e instale as dependências:
    ```bash
    cd backend
    ```
    ```bash
    npm install
    ```
    2. Inicie o container docker:
    ```bash
    docker-compose up
    ```

3. **Configuração do frontend**
    1. Navegue até o diretório do frontend e instale as dependências
    ```bash
    cd frontend
    ```
    2. Installe as dependências do projeto:
    ```bash
    npm install
    ```

## Estrutura do Projeto
```bash
Network-2---Talkify/
├── backend/              # Código fonte do backend
│   ├── config/              # Arquivos de configuração
│   ├── controllers           # Métodos principais das rotas
│   ├── middlewares/              # Códigos dos middlewares
│   ├── models           # Modelos do banco de dados
│   ├── routes/              # Rotas da API
│   ├── utils           # Utilidades para o projeto

├── frontend/             # Código fonte do frontend
│   ├── public/              # Arquivos publicos, assets
│   ├── src      # Código principal
└── README.md             # Documentação do projeto
```

## Frontend (React)
O frontend foi desenvolvido usando React e utiliza Css comum para os componentes de UI.
### Principais Componentes:
- providers: criação de métodos que farão as requisições na api.
- dashboard: Componente que renderiza as páginas.

## Backend (Spring boot)
O backend foi desenvolvido usando Node com um banco de dados MongoDb.

### Principais Controladores
- AuthController: Controla a lógica de autênticação.
- MessageController: Gerencia e criptografa as mensagens.

### Configurações de Segurança
O backend utiliza JWT para autenticação. O token JWT deve ser incluído no cabeçalho das requisições HTTP do frontend.

## Scripts Disponíveis

### Frontend
- npm start: Inicia a aplicação React em localhost:3000.
- npm run build: Compila o projeto React.

### Backend
- node server.js Inicia o servidor backend Node em localhost:5000.

## Iniciando o projeto
1. **Rodando o Backend**
Navegue até o diretório do backend e execute o seguinte comando:
    ```bash
    node server.js
    ```
2. **Rodando o Frontend**
Em uma nova janela do terminal, vá para o diretório do frontend e execute o seguinte comando:
    ```bash
    npm start
    ```

3. **Acessar a Aplicação**
Após rodar os dois serviços, acesse a aplicação em http://localhost:3000.
