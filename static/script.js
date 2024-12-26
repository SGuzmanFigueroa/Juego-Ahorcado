const words = [
    {
        word: "gato",
        hints: [
            "Es un animal doméstico",
            "Le gusta cazar ratones",
            "Dice 'miau'"
        ]
    },
    {
        word: "sol",
        hints: [
            "Está en el cielo",
            "Nos da luz y calor",
            "Sale por las mañanas"
        ]
    },
    {
        word: "mesa",
        hints: [
            "Tiene cuatro patas",
            "La usamos para comer",
            "Se encuentra en la cocina"
        ]
    }
];
let selectedWord;
let wordState;
let remainingAttempts;
let score = 0;
let hintIndex = 0;

// Función para iniciar el juego
function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    wordState = Array(selectedWord.word.length).fill("_");
    remainingAttempts = 10;
    hintIndex = 0; // Reinicia el índice de la pista

    // Muestra la primera pista
    document.getElementById("hint").querySelector("span").innerText = selectedWord.hints[hintIndex];
    document.getElementById("word").innerText = wordState.join(" ");
    document.getElementById("message").innerText = `Intentos restantes: ${remainingAttempts}`;
    document.getElementById("letter").value = "";
}

// Función para comprobar la letra ingresada
function checkLetter() {
    const input = document.getElementById("letter");
    const guessedLetter = input.value.toLowerCase();
    input.value = "";

    if (!guessedLetter || guessedLetter.length !== 1) {
        document.getElementById("message").innerText = "Por favor, ingresa una letra válida.";
        return;
    }

    if (selectedWord.word.includes(guessedLetter)) {
        for (let i = 0; i < selectedWord.word.length; i++) {
            if (selectedWord.word[i] === guessedLetter) {
                wordState[i] = guessedLetter;
            }
        }
        document.getElementById("word").innerText = wordState.join(" ");
        if (!wordState.includes("_")) {
            document.getElementById("message").innerText = "¡Ganaste!";
            score += 10;
            setTimeout(resetGame, 2000); // Reinicia el juego después de 2 segundos
        }
    } else {
        remainingAttempts--;
        drawHangman(10 - remainingAttempts); // Dibuja una parte del muñeco
        if (remainingAttempts > 0) {
            if (hintIndex < selectedWord.hints.length - 1) {
                hintIndex++;
                document.getElementById("hint").querySelector("span").innerText = selectedWord.hints[hintIndex];
            }
            document.getElementById("message").innerText = `Intentos restantes: ${remainingAttempts}`;
        } else {
            document.getElementById("message").innerText = `¡Perdiste! La palabra era "${selectedWord.word}".`;
            setTimeout(resetGame, 2000); // Reinicia el juego después de 2 segundos
        }
    }
}


// Función para reiniciar el juego
function resetGame() {
    resetCanvas(); // Limpia el dibujo del muñeco
    initGame();    // Reinicia el juego
}

// Guardar puntuación (opcional)
async function saveScore() {
    const response = await fetch("http://127.0.0.1:5000/save_score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ score })
    });
    const data = await response.json();
    alert(data.message);
}

const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");

// Función para dibujar el muñeco parte por parte
function drawHangman(step) {
    switch (step) {
        case 1: // Base
            ctx.moveTo(10, 240);
            ctx.lineTo(190, 240);
            ctx.stroke();
            break;
        case 2: // Poste vertical
            ctx.moveTo(50, 240);
            ctx.lineTo(50, 20);
            ctx.stroke();
            break;
        case 3: // Poste horizontal
            ctx.moveTo(50, 20);
            ctx.lineTo(120, 20);
            ctx.stroke();
            break;
        case 4: // Cuerda
            ctx.moveTo(120, 20);
            ctx.lineTo(120, 50);
            ctx.stroke();
            break;
        case 5: // Cabeza
            ctx.beginPath();
            ctx.arc(120, 70, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 6: // Cuerpo
            ctx.moveTo(120, 90);
            ctx.lineTo(120, 150);
            ctx.stroke();
            break;
        case 7: // Brazo izquierdo
            ctx.moveTo(120, 100);
            ctx.lineTo(100, 130);
            ctx.stroke();
            break;
        case 8: // Brazo derecho
            ctx.moveTo(120, 100);
            ctx.lineTo(140, 130);
            ctx.stroke();
            break;
        case 9: // Pierna izquierda
            ctx.moveTo(120, 150);
            ctx.lineTo(100, 180);
            ctx.stroke();
            break;
        case 10: // Pierna derecha
            ctx.moveTo(120, 150);
            ctx.lineTo(140, 180);
            ctx.stroke();
            break;
    }
}

// Función para reiniciar el dibujo del muñeco
function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// Iniciar el juego al cargar la página
window.onload = initGame;
