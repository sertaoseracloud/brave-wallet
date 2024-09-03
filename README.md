# Brave Wallet - Clean Arch

## Visão Geral

Este projeto é uma aplicação React para interagir com a blockchain Ethereum. Ele permite que os usuários verifiquem saldos de tokens, transfiram tokens e BNB (Binance Coin) e realizem outras operações relacionadas a criptomoedas. A aplicação usa Web3.js para a interação com a blockchain e segue uma arquitetura baseada em Clean Architecture para organizar o código.

## Estrutura do Projeto

O projeto é dividido em várias partes principais:

1. **Interface do Usuário (React/ViteJS)**
2. **Controladores (Use Cases)**
3. **Repositórios (Data Access)**
4. **Modelo (Entidades)**

### 1. Interface do Usuário (React)


- **App.tsx**: Componente principal da aplicação React. Permite que o usuário insira um endereço de carteira, selecione um contrato de token e realize transações.

### 2. Controladores (Use Cases)

- **GetBnbBalanceUseCase.ts (application/usecases)**: Caso de uso para obter o saldo de BNB de um endereço.
- **GetTokenBalanceUseCase.ts (application/usecases)**: Caso de uso para obter o saldo de um token específico de um endereço.
- **TransferBnbTokenUseCase.ts (application/usecases)**: Caso de uso para transferir BNB de um endereço para outro.
- **TransferTokenUseCase.ts (application/usecases)**: Caso de uso para transferir um token específico de um endereço para outro.

### 3. Repositórios (Data Access)

- **TokenRepository.ts (adapters/inbound)**: Interface que define os métodos para interagir com a blockchain.
- **Web3Repository.ts (adapters/outbound)**: Implementação da interface `TokenRepository` usando Web3.js para interação com a blockchain Ethereum.

### 4. Modelo (Entidades)

- **Token.ts (domain/models)**: Classe que representa um token com um endereço e um saldo.

## Configuração do Projeto

### Requisitos

- Node.js e npm instalados
- Metamask ou outro provedor de carteira Ethereum no navegador
- Dependências do projeto instaladas (use `npm install` para instalar)

### Execução

1. Clone o repositório do projeto.
2. Navegue até o diretório do projeto.
3. Instale as dependências com `npm install`.
4. Inicie a aplicação com `npm run dev`.

### Dependências

- [web3](https://www.npmjs.com/package/web3)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Conclusão

Esta documentação fornece uma visão geral completa do projeto, incluindo a estrutura do código, as funcionalidades principais e as instruções para execução. Certifique-se de personalizar o código conforme necessário para atender às suas necessidades específicas.
