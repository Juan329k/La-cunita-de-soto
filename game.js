const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let selectedCharacter = null;

function selectCharacter(character) {
    selectedCharacter = character;
    startGame();
}

function startGame() {
    document.getElementById('menu').style.display = 'none';
    canvas.style.display = 'block';

    let characterX = canvas.width / 2; // Inicializa la posición X del personaje en la mitad del canvas
    let characterY = canvas.height / 2; // Inicializa la posición Y del personaje en la mitad del canvas
    let jumpStrength = -8; // Fuerza inicial del salto
    let gravity = 0.5; // Gravedad para hacer que el personaje caiga
    let isJumping = false; // Variable para controlar si el personaje está saltando

    let obstacles = []; // Array para almacenar los obstáculos

   function drawCharacter() {
    let img = new Image();
    img.src = 'The game.jpg';
    ctx.drawImage(img, characterX - 20, characterY - 20, 40, 40); // Dibuja la imagen en lugar del círculo
}

function drawObstacles() {
    for (let obstacle of obstacles) {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        // Dibuja un triángulo en lugar de un cuadrado
        ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();
    }
}


    function jump() {
        if (!isJumping) {
            isJumping = true;
            jumpStrength = -8; // Fuerza inicial del salto
        }
    }

    function updateCharacter() {
        if (isJumping) {
            characterY += jumpStrength;
            jumpStrength += gravity;

            if (characterY >= canvas.height / 2) { // Si el personaje toca el suelo
                characterY = canvas.height / 2;
                isJumping = false;
            }
        }
    }

    function generateObstacle() {
        const obstacleWidth = 30;
        const obstacleHeight = 30;
        const obstacleX = canvas.width;
        const obstacleY = canvas.height / 2 - obstacleHeight / 2; // Posición en la mitad de la pantalla verticalmente

        obstacles.push({ x: obstacleX, y: obstacleY, width: obstacleWidth, height: obstacleHeight });
    }

    function updateObstacles() {
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= 5; // Velocidad de desplazamiento de los obstáculos

            if (obstacles[i].x + obstacles[i].width < 0) {
                obstacles.splice(i, 1); // Elimina los obstáculos cuando salen del canvas
                i--; // Ajusta el índice después de eliminar un obstáculo
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCharacter();
        drawObstacles();
        updateCharacter();
        updateObstacles();
        requestAnimationFrame(draw);
    }

    setInterval(generateObstacle, 2000); // Genera un nuevo obstáculo cada 2 segundos

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 32 || event.key === ' ') { // Tecla de espacio para saltar
            jump();
        }
    });

    draw();
}
