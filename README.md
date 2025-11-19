# Trabalho Final Disciplina Desenvolvimento de Apis e Micro Serviços

API REST com CRUD de 2 recursos (Cliente e Endereço), documentação e mensageria.

---

## 📚 Sumário

- [📚 Sumário](#-sumário)
- [📌 Descrição](#-descrição)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [📦 Endpoints da Aplicação](#-endpoints-da-aplicação)
- [💻 Tutorial para rodar o projeto](#-tutorial-para-rodar-o-projeto) 
---

## 📌 Descrição

Este projeto foi desenvolvido como trabalho prático na disciplina de Desenvolvimento de Apis e Micro Serviços no curso de Análise e Desenvolvimento de Sistemas. O projeto contém tais funcionalidades:

- CRUD de Clientes
- CRUD de Endereços
- Mensageria com RabbitMQ
- Documentação com Swagger

---

## 🚀 Tecnologias Utilizadas

- Typescript
- Node v22.20.0
- NestJS v11.0.10
- Swagger v11.2.1
- Terminus v11.0.0
- Prisma v6.19.0
- Amqplib v0.10.9
- Axios v1.13.2
- Class-transformer v0.5.1
- Class-validator v0.14.2
- Dotenv v17.2.3
- Nodemailer v7.0.10
- Pg v8.16.3

---

## 📁 Estrutura do Projeto

```
src/
│
├── cep                  # Módulo CEP (CEP Service para validar o cep)
├── cliente              # Módulo Cliente (DTOs, entidade, controller e service)
├── common               # Observabilidade do sistema
|   └── health           # Módulo Health (Health controller com endpoints para verificar o status do sistema, memória, etc...)
|   └── logger           # Serviço de log personalizado
|   └── interceptors     # Logging interceptor 
├── config               # Configurações do Rabbit, Swagger e validações (ValidatorPipe)
├── endereco             # Módulo Endereco (DTOs, entidade, controller e service) 
├── exception            # Exceções personalizadas
├── mail                 # Módulo Mail (Mail Service para envios de emails)
├── prisma               # Módulo Prisma (Prisma Service para realizar persistência de dados)
├── publisher            # Módulo Publisher (Publisher Service para publicar eventos em uma fila)
├── subscriber           # Módulo Subscriber (Subscriber Controller para ouvir eventos de uma fila)
└── validators           # Validators personalizados
├── app.module.ts        # Módulo do aplicativo
├── main.ts              # Arquivo principal do projeto
```

---

## 📦 Endpoints da Aplicação
      
| Método |           Endpoint                    |          Descrição                     |
| ------ | ------------------------------------- | ------------------------------------   | 
| POST   | /cliente                              | Criação de novo cliente                |
| DELETE | /cliente/{id}                         | Deletar um cliente                     |
| PATCH  | /cliente/{id}                         | Atualizar parcialmente um cliente      |
| GET    | /cliente                              | Buscar clientes                        |
| GET    | /cliente/{id}                         | Buscar cliente por ID                  |
| POST   | /endereco/{clienteId}                 | Cadastrar endereço para cliente        |
| DELETE | /endereco/{id}                        | Deletar um endereço                    |
| PATCH  | /endereco/{id}                        | Atualizar parcialmente um endereço     |
| GET    | /endereco/cliente/{clienteId}         | Buscar endereços do cliente            |
| GET    | /endereco/{id}                        | Buscar endereço pelo ID                |
| GET    | /health                               | Health check completo                  |
| GET    | /health/live                          | Verifica se a aplicação está rodando   |
| GET    | /health/ready                         | Verifica se a aplicação recebe tráfego |
| GET    | /docs                                 | Documentação da API |

---

## 💻 Tutorial para rodar o projeto
 
- Passo 1: Instalar o [NodeJS](https://nodejs.org/pt) ou `sudo apt install -y nodejs` no Linux.
- Passo 2: Instalar o [NestJS](https://docs.nestjs.com/#installation) ou `npm i -g @nestjs/cli`.
- Passo 3: Clonar o projeto em sua máquina.
- Passo 4: Criar os arquivos `.env` e `.env.docker` e definir as variáveis de ambiente de acordo com o `.env.example.`
- Passo 5: Abrir o terminal na raiz do projeto e executar `docker compose build`.
- Passo 6: Logo após o build executar: `docker compose up`.
- Passo 7: Acessar `http://localhost:3001/docs` e testar os endpoints.


# Desenvolvido por: Bruno Pressi
