# Pesquisa Eleitoral 📊

![Logo do Aplicativo](./assets/logo.png)

O **Pesquisa Eleitoral** é um aplicativo móvel moderno desenvolvido para coletar, organizar e exibir pesquisas eleitorais em tempo real. Projetado para equipes de campanha e analistas políticos, ele permite o acompanhamento do desempenho de candidatos de maneira rápida e segura.

## 🚀 Funcionalidades Principais

- **Visão Geral em Tempo Real:** Tela inicial que funciona como um resumo rápido da disputa eleitoral, mostrando candidatos, fotos e percentuais de popularidade.
- **Perfil do Candidato:** Análise aprofundada do desempenho individual, com histórico de crescimento (tendência de subida ou queda) e total de votos.
- **Coleta Multidispositivo:** Permite que dezenas de smartphones atuem como coletores de pesquisa simultaneamente. Os dados são enviados automaticamente ao servidor central.
- **Atualização Instantânea:** Graças à tecnologia WebSocket (Socket.io), os gráficos e resultados se atualizam sozinhos na tela assim que um novo voto é registrado.
- **Gráfico de Pizza 3D Premium:** Visualização impactante da divisão de votos, ideal para apresentações.
- **Segurança e Privacidade:** Votos armazenados de forma criptografada no banco de dados (Criptografia AES-256-CTR), garantindo sigilo e confiabilidade dos dados.

## 🛠️ Tecnologias Utilizadas (Stack)

- **Frontend (Mobile):** React Native, Expo, React Navigation
- **Backend (Servidor):** Node.js, Express
- **Tempo Real:** Socket.io
- **Banco de Dados:** SQLite
- **Segurança:** Node Crypto (AES-256)

## 📱 Como Acessar e Rodar o Projeto

Para executar este projeto em sua máquina, você precisará do [Node.js](https://nodejs.org/) instalado.

### 1. Inicializando o Servidor (Backend)

Abra um terminal e execute os seguintes comandos:

```bash
cd d:\pesquisa_eleleitoral\backend
npm install
node server.js
```

O servidor estará rodando na porta 3000. E você verá a mensagem "Conectado ao banco de dados SQLite".

### 2. Inicializando o Aplicativo Móvel (Frontend)

Em um novo terminal, execute:

```bash
cd app
npm install
npx expo start
```

- Use o aplicativo **Expo Go** no seu celular para escanear o QR Code gerado no terminal (ou pressione `a` para rodar em um emulador Android ou `i` para simulador iOS).

## 🌍 Colocando em Produção (Acesso Global)

Por padrão, este aplicativo roda em ambiente local (`192.168.x.x`), o que significa que os celulares precisam estar na mesma rede Wi-Fi do computador para enviar e ver votos. 

Para que sua equipe possa usar o app nas ruas via 4G/5G de qualquer lugar do mundo, os seguintes passos são necessários:

1. **Hospedar o Backend:** Suba a pasta `/backend` para um serviço na nuvem (como Render, Heroku ou AWS). Isso gerará uma URL pública (ex: `https://sua-api.render.com`).
2. **Atualizar o App:** Troque o IP local `192.168.x.x` do arquivo `/app/src/services/socket.js` e das telas (`CollectionScreen`, `ChartScreen`) pela URL pública da sua nuvem.
3. **Gerar o Aplicativo (APK):** Rode o comando `eas build -p android --profile preview` no terminal do Expo para gerar o instalador oficial `.apk` e instalar nos aparelhos da equipe.

## ✅ Tarefas Concluídas

- [x] Estruturação do Banco de Dados SQLite.
- [x] Criação do Backend Node.js com rotas REST e WebSockets.
- [x] Implementação da camada de segurança (Criptografia).
- [x] Criação da estrutura base do Frontend com React Native/Expo.
- [x] Implementação do design UI/UX (em andamento)
- [x] Geração da Documentação README.md.

---
Desenvolvido com foco em alta segurança, interface intuitiva e desempenho em tempo real.
