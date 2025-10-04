// Conectar ao servidor via Socket.IO
const socket = io();

// Elementos DOM
const nameModal = document.getElementById("nameModal");
const playerNameInput = document.getElementById("playerNameInput");
const startGameBtn = document.getElementById("startGameBtn");
const gameInterface = document.getElementById("gameInterface");
const playerNameDisplay = document.getElementById("playerName");
const playerScoreDisplay = document.getElementById("playerScore");
const escudoImg = document.getElementById("escudo");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");
const rankingList = document.getElementById("rankingList");

// Estado do jogo
let playerName = "";
let playerScore = 0;
let canAnswer = true;
let hasAnswered = false; // Se já respondeu ao escudo atual

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    // Focar no input do nome
    playerNameInput.focus();
    
    // Event listeners
    startGameBtn.addEventListener("click", startGame);
    playerNameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            startGame();
        }
    });
    
    submitBtn.addEventListener("click", submitAnswer);
    answerInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            submitAnswer();
        }
    });
});

// Função para iniciar o jogo
function startGame() {
    const name = playerNameInput.value.trim();
    
    if (name === "") {
        alert("Por favor, digite seu nome!");
        playerNameInput.focus();
        return;
    }
    
    if (name.length > 20) {
        alert("Nome muito longo! Máximo 20 caracteres.");
        playerNameInput.focus();
        return;
    }
    
    playerName = name;
    playerNameDisplay.textContent = playerName;
    
    // Esconder modal e mostrar jogo
    nameModal.style.display = "none";
    gameInterface.style.display = "block";
    gameInterface.classList.add("fade-in");
    
    // Enviar nome para o servidor
    socket.emit("playerName", playerName);
    
    // Focar no input de resposta
    answerInput.focus();
}

// Função para enviar resposta
function submitAnswer() {
    if (!canAnswer || hasAnswered) return;
    
    const answer = answerInput.value.trim();
    
    if (answer === "") {
        alert("Por favor, digite uma resposta!");
        answerInput.focus();
        return;
    }
    
    // Desabilitar input temporariamente
    canAnswer = false;
    hasAnswered = true;
    submitBtn.disabled = true;
    answerInput.disabled = true;
    
    // Enviar resposta para o servidor
    socket.emit("answer", answer);
    
    // Limpar input
    answerInput.value = "";
}

// Função para reabilitar input após resposta
function enableAnswer() {
    canAnswer = true;
    hasAnswered = false;
    submitBtn.disabled = false;
    answerInput.disabled = false;
    answerInput.focus();
}

// Função para exibir feedback
function showFeedback(result) {
    feedback.textContent = result.message;
    feedback.className = result.correct ? "correct" : "incorrect";
    
    if (result.correct) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
    }
    
    // Mostrar resposta correta se errou
    if (!result.correct) {
        setTimeout(() => {
            feedback.textContent += ` (Resposta: ${result.correctAnswer})`;
        }, 1000);
    }
    
    // Se acertou, não reabilitar input (aguardar próximo escudo)
    // Se errou, reabilitar após 4 segundos
    if (!result.correct) {
        setTimeout(() => {
            feedback.textContent = "";
            feedback.className = "";
            enableAnswer();
        }, 4000);
    }
}

// Função para atualizar ranking
function updateRanking(ranking) {
    rankingList.innerHTML = "";
    
    if (ranking.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Aguardando jogadores...";
        rankingList.appendChild(li);
        return;
    }
    
    ranking.forEach((player, index) => {
        const li = document.createElement("li");
        
        const nameSpan = document.createElement("span");
        nameSpan.className = "player-name";
        nameSpan.textContent = `${index + 1}. ${player.name}`;
        
        const scoreSpan = document.createElement("span");
        scoreSpan.className = "player-score";
        scoreSpan.textContent = `${player.score} pts`;
        
        li.appendChild(nameSpan);
        li.appendChild(scoreSpan);
        
        // Destacar o próprio jogador
        if (player.name === playerName) {
            li.style.backgroundColor = "#e3f2fd";
            li.style.borderLeft = "4px solid #2196f3";
        }
        
        rankingList.appendChild(li);
    });
}

// Event listeners do Socket.IO

// Quando receber um novo escudo
socket.on("escudo", (data) => {
    console.log("Novo escudo recebido:", data);
    escudoImg.src = data.url;
    escudoImg.alt = `Escudo do ${data.nome}`;
    
    // Limpar feedback e reabilitar input para novo escudo
    feedback.textContent = "";
    feedback.className = "";
    enableAnswer();
});

// Quando receber resultado da resposta
socket.on("answerResult", (result) => {
    console.log("Resultado:", result);
    showFeedback(result);
});

// Quando receber ranking atualizado
socket.on("ranking", (ranking) => {
    console.log("Ranking atualizado:", ranking);
    updateRanking(ranking);
});

// Tratar desconexão
socket.on("disconnect", () => {
    alert("Conexão perdida! Recarregue a página.");
});

// Tratar erros de conexão
socket.on("connect_error", () => {
    alert("Erro ao conectar com o servidor!");
});
