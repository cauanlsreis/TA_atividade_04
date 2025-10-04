# 🏆 Quiz dos Escudos de Times de Futebol

Um jogo multiplayer em tempo real onde os jogadores competem para identificar escudos de times de futebol do mundo todo!

## 📌 Descrição

Este é um quiz interativo desenvolvido com **Node.js**, **Express.js** e **Socket.io** que permite múltiplos jogadores competirem simultaneamente para identificar escudos de times de futebol. O jogo funciona em tempo real, com ranking atualizado instantaneamente.

## 🎯 Como Jogar

1. **Acesse o jogo** em seu navegador
2. **Digite seu nome** para entrar na partida
3. **Observe o escudo** que aparece na tela
4. **Digite o nome do time** no campo de texto
5. **Pressione Enter ou clique em "Enviar"** para submeter sua resposta
6. **Ganhe pontos** ao acertar o nome do time
7. **Acompanhe sua posição** no ranking em tempo real

### 🏅 Sistema de Pontuação

- ✅ **Acertou**: +1 ponto
- ❌ **Errou**: 0 pontos
- � **Ranking**: Atualizado em tempo real para todos os jogadores

### 💡 Dicas para Jogar

- Aceita tanto o **nome oficial** quanto **nomes alternativos** (ex: "Barça" para "Barcelona")
- **Não diferencia maiúsculas/minúsculas** nem acentos
- Um **novo escudo aparece a cada 10 segundos**
- Você tem tempo limitado para responder cada pergunta

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **npm** (geralmente vem com o Node.js)

### Instalação e Execução

1. **Clone ou baixe** este repositório
2. **Abra o terminal** na pasta do projeto
3. **Instale as dependências**:
   ```bash
   npm install
   ```
4. **Inicie o servidor**:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   npm start
   ```
5. **Abra seu navegador** e acesse: `http://localhost:3000`

## 📂 Estrutura do Projeto

```
TA_atividade_04/
├── server.js              # Servidor principal (Node.js + Express + Socket.io)
├── package.json            # Dependências e scripts
├── README.md              # Este arquivo
├── data/
│   ├── escudos.json       # Base de dados dos escudos
│   └── nomes_falsos.json  # Arquivo adicional (não utilizado)
└── public/                # Arquivos do cliente (frontend)
    ├── index.html         # Interface do jogo
    ├── styles.css         # Estilos e design
    └── client.js          # Lógica do cliente (JavaScript)
```

## ⚽ Times Disponíveis

O jogo inclui escudos de times famosos como:
- **Barcelona** (Barça, FC Barcelona)
- **Real Madrid** (Real, Real Madrid CF)
- **Liverpool** (LFC, Liverpool FC)
- **Bayern Munique** (FC Bayern, Bayern)
- **PSG** (Paris SG, Paris Saint-Germain)
- **Juventus** (Juve)
- **Santos** (Peixe, Santos FC)
- E muitos outros...

## 🛠️ Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - Socket.io
  
- **Frontend**:
  - HTML5
  - CSS3 (com gradientes e animações)
  - JavaScript (ES6+)
  - Socket.io Client

## 🎮 Funcionalidades

### ✅ Implementadas
- ✅ Interface de entrada com nome do jogador
- ✅ Exibição de escudos em tempo real
- ✅ Sistema de respostas com validação
- ✅ Pontuação individual
- ✅ Ranking multiplayer em tempo real
- ✅ Normalização de strings (ignora acentos e maiúsculas)
- ✅ Suporte a nomes alternativos dos times
- ✅ Interface responsiva e moderna
- ✅ Feedback visual para respostas corretas/incorretas

### 🎯 Recursos Especiais
- **Normalização inteligente**: Aceita "sao paulo", "São Paulo", "SAO PAULO"
- **Múltiplas respostas aceitas**: "Barça", "Barcelona", "FC Barcelona"
- **Interface moderna**: Design responsivo com gradientes e animações
- **Tempo real**: Todos os jogadores veem as mesmas perguntas simultaneamente
- **Ranking dinâmico**: Posições atualizadas instantaneamente

## 🎨 Design e UX

- **Tema moderno** com gradientes azul/roxo
- **Interface responsiva** que funciona em desktop e mobile
- **Animações suaves** para melhor experiência
- **Feedback visual claro** para acertos e erros
- **Ranking destacado** com cores especiais para top 3

## � Configurações

### Tempo entre escudos
Para alterar o intervalo entre escudos (padrão: 10 segundos):
```javascript
// No arquivo server.js, linha ~95
gameInterval = setInterval(() => {
    sendNewShield();
}, 10000); // Altere este valor (em milissegundos)
```

### Adicionar novos escudos
Edite o arquivo `data/escudos.json` seguindo o formato:
```json
{
    "id": 21,
    "nome": "Nome do Time",
    "pais": "País",
    "liga": "Liga",
    "url": "URL_da_imagem",
    "alternativas": ["Nome Alt 1", "Nome Alt 2"]
}
```

## 🎯 Critérios Atendidos

- ✅ **Funcionamento correto**: Acerto = +1 ponto
- ✅ **Ranking em tempo real**: Atualização instantânea para todos
- ✅ **Código organizado**: Estrutura clara e comentada
- ✅ **Interface criativa**: Design moderno e responsivo
- ✅ **Multiplayer**: Suporte a múltiplos jogadores simultâneos

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como atividade avaliativa da disciplina de Tópicos Avançados.

---

**Divirta-se jogando e testando seus conhecimentos sobre futebol! ⚽🎉**