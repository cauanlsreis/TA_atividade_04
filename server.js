// Importando módulos necessários
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

// Criando app Express e servidor HTTP
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Lendo o arquivo escudos.json (array de objetos com { url })
const escudos = JSON.parse(fs.readFileSync("data/escudos.json"));

// Estado do jogo
let players = {}; // { socketId: { name: "Nome", score: 0 } }
let currentShield = null;
let gameInterval = null;
let answeredPlayers = new Set(); // Players que já responderam ao escudo atual

// Função para normalizar strings (remover acentos e converter para minúsculas)
function normalizeString(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Função para verificar se a resposta está correta
function isCorrectAnswer(answer, shield) {
    const normalizedAnswer = normalizeString(answer);
    const normalizedName = normalizeString(shield.nome);
    
    // Verifica se coincide com o nome
    if (normalizedAnswer === normalizedName) {
        return true;
    }
    
    // Verifica se coincide com alguma alternativa
    return shield.alternativas.some(alt => 
        normalizeString(alt) === normalizedAnswer
    );
}

// Função para enviar novo escudo para todos
function sendNewShield() {
    currentShield = escudos[Math.floor(Math.random() * escudos.length)];
    answeredPlayers.clear(); // Limpar lista de quem já respondeu
    io.emit("escudo", currentShield);
}

// Função para enviar ranking atualizado
function sendRanking() {
    const ranking = Object.values(players)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10); // Top 10
    io.emit("ranking", ranking);
}

// Servindo a pasta "public" (onde ficam os arquivos do cliente)
app.use(express.static("public"));

// Quando um cliente se conecta via socket
io.on("connection", (socket) => {
    console.log("Novo cliente conectado!", socket.id);

    // Enviar escudo atual se existir
    if (currentShield) {
        socket.emit("escudo", currentShield);
    } else {
        // Se não há escudo atual, enviar um novo
        sendNewShield();
    }

    // Enviar ranking atual
    sendRanking();

    // Quando jogador envia seu nome
    socket.on("playerName", (name) => {
        players[socket.id] = { name: name, score: 0 };
        sendRanking();
    });

    // Quando jogador envia uma resposta
    socket.on("answer", (answer) => {
        if (!currentShield || !players[socket.id]) {
            return;
        }

        // Verificar se o jogador já respondeu a este escudo
        if (answeredPlayers.has(socket.id)) {
            socket.emit("answerResult", { 
                correct: false, 
                message: "Você já respondeu a este escudo!",
                correctAnswer: currentShield.nome
            });
            return;
        }

        // Adicionar jogador à lista de quem já respondeu
        answeredPlayers.add(socket.id);

        if (isCorrectAnswer(answer, currentShield)) {
            // Resposta correta - adicionar ponto
            players[socket.id].score += 1;
            socket.emit("answerResult", { 
                correct: true, 
                message: "Correto! +1 ponto",
                correctAnswer: currentShield.nome
            });
            sendRanking();
            
            // Resetar timer e enviar novo escudo após acerto
            clearInterval(gameInterval);
            setTimeout(() => {
                sendNewShield();
                // Reiniciar intervalo normal
                gameInterval = setInterval(() => {
                    sendNewShield();
                }, 10000); // 10 segundos
            }, 2000);
        } else {
            // Resposta incorreta
            socket.emit("answerResult", { 
                correct: false, 
                message: "Resposta incorreta!",
                correctAnswer: currentShield.nome
            });
        }
    });

    // Quando cliente desconecta
    socket.on("disconnect", () => {
        if (players[socket.id]) {
            delete players[socket.id];
            sendRanking();
        }
    });
});

// Iniciar o jogo - enviar novo escudo a cada 10 segundos
if (!gameInterval) {
    gameInterval = setInterval(() => {
        sendNewShield();
    }, 10000); // 10 segundos
}

// Iniciando servidor
server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
