# Projeto de Login com React, Node com express e SQLite

Este é um projeto de exemplo para demonstrar como criar um sistema de login usando React, Node.js e SQLite. O projeto consiste em uma aplicação web com uma página de login e uma API RESTful para autenticação e gerenciamento de usuários.

![Preview](https://github.com/bitswa/react-login-sqlite/blob/master/preview1.png)
![Preview](https://github.com/bitswa/react-login-sqlite/blob/master/preview2.png)
![Preview](https://github.com/bitswa/react-login-sqlite/blob/master/preview3.png)

## Design

![Preview](https://github.com/bitswa/react-login-sqlite/blob/master/design.png)

Design criado do zero, utilizando o figma.

## Instalação e Execução

Para executar este projeto, siga as instruções abaixo:

Clone o repositório para sua máquina local usando o comando `git clone https://github.com/bitswa/react-login-sqlite`.

### Frontend

1. Navegue até a pasta `frontend` e execute o comando `npm install` para instalar as dependências.
2. Crie um arquivo `.env` com as variáveis de ambiente necessárias (veja mais abaixo).
3. Execute o comando `npm run dev` para iniciar o servidor de desenvolvimento do Vite.

### Backend

1. Navegue até a pasta `backend` e execute o comando `npm install` para instalar as dependências.
2. Crie um arquivo `.env` com as variáveis de ambiente necessárias (veja mais abaixo).
3. Execute o comando `npm run dev` para iniciar o servidor Node.js.

### Variáveis de ambiente

Este projeto usa as seguintes variáveis de ambiente:

#### Frontend

Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente conforme necessário.

- `VITE_PORT`: a porta em que o servidor está sendo executado (padrão: `3003`).

Exemplo:

```
VITE_PORT=3003
```

#### Backend

Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente conforme necessário.

- `PORT`: a porta em que o servidor deve ser executado (padrão: `3003`).
- `JWT_SECRET`: a chave secreta usada para assinar e verificar os tokens JWT.
- `BCRYPT_SALT`: o número de rounds de hashing usados pelo Bcrypt (padrão: `10`).

Exemplo:

```
PORT=3003
JWT_SECRET=mysecretkey
BCRYPT_SALT=10
```

## Tecnologias utilizadas

Este projeto usa as seguintes tecnologias:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/index.html)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Estrutura do projeto

O projeto está organizado em duas pastas: `frontend` e `backend`.

### Frontend

A pasta `frontend` contém o código-fonte do aplicativo web. Ele usa o React para criar a interface do usuário e o Axios para fazer solicitações à API do backend. A pasta `src` contém os arquivos-fonte do projeto, incluindo os componentes React, o código de roteamento e o estilo CSS.

### Backend

A pasta `backend` contém o código-fonte da API RESTful.

## Contribuição

Este é um projeto pessoal, mas fique à vontade para abrir um pull request se quiser contribuir com o projeto ou sugerir melhorias.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
