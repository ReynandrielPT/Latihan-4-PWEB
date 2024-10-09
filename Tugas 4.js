window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

 
    canvas.width = 400;
    canvas.height = 400;
  
    const gridSize = 20;
    let snake = [{x: 160, y: 160}]; 
    let dx = gridSize;
    let dy = 0;
    let food = spawnFood();
    let score = 0;
    let highestScore = 0; 
    let gameOver = false;
    let gameInterval;


    document.addEventListener('keydown', changeDirection);
    document.getElementById('startStopButton').addEventListener('click', startStopGame);


    function gameLoop() {
        if (gameOver) {
            clearInterval(gameInterval);
            if (score > highestScore) {
                highestScore = score;
                document.getElementById('highestScore').textContent = 'Highest Score: ' + highestScore;
            }
            alert("Game Over! Final Score: " + score);
            return;
        }

        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        checkSelfCollision();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        ctx.fillStyle = '#00FF00';
        snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};

        if (head.x >= canvas.width) {
            head.x = 0;
        } else if (head.x < 0) {
            head.x = canvas.width - gridSize;
        }

        if (head.y >= canvas.height) {
            head.y = 0;
        } else if (head.y < 0) {
            head.y = canvas.height - gridSize;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            document.getElementById('score').textContent = 'Score: ' + score;
            food = spawnFood();
        } else {
            snake.pop();
        }
    }


    function drawFood() {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

  
    function spawnFood() {
        let foodX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        let foodY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        return {x: foodX, y: foodY};
    }

  
    function changeDirection(event) {
        const keyPressed = event.keyCode;
        const goingUp = dy === -gridSize;
        const goingDown = dy === gridSize;
        const goingRight = dx === gridSize;
        const goingLeft = dx === -gridSize;

        if (keyPressed === 37 || keyPressed === 65 && !goingRight) {
            dx = -gridSize;
            dy = 0;
        } else if (keyPressed === 38 || keyPressed === 87 && !goingDown) {
            dx = 0;
            dy = -gridSize;
        } else if (keyPressed === 39 || keyPressed === 68 && !goingLeft) {
            dx = gridSize;
            dy = 0;
        } else if (keyPressed === 40 || keyPressed === 83 && !goingUp) {
            dx = 0;
            dy = gridSize;
        }
    }


    function checkSelfCollision() {
        const head = snake[0];
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver = true;
            }
        }
    }


    function startStopGame() {
        if (gameOver) {
            // Reset the game
            resetGame();
        }


        if (!gameInterval) {
            gameInterval = setInterval(gameLoop, 100);
            document.getElementById('startStopButton').textContent = 'Stop';
        } else {
            clearInterval(gameInterval);
            gameInterval = null;
            document.getElementById('startStopButton').textContent = 'Start';
        }
    }


    function resetGame() {
        snake = [{x: 160, y: 160}];
        dx = gridSize;
        dy = 0;
        food = spawnFood();
        score = 0;
        gameOver = false;
        document.getElementById('score').textContent = 'Score: ' + score;
        clearCanvas();
        drawFood();
        drawSnake();
    }
}
