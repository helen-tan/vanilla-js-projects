const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // Create context - convention is to use 'ctx'

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// Create ball props
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

// Create paddle props
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

// Create brick props
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
const bricks = [];
for(let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for(let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo }; // 2D array of bricks info
    }
}

console.log(bricks);

// Draw ball onto canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw paddle onto canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// Draw score onto canvas
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks onto canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    });
}

// Move paddle on canvas
function movePaddle() {
    paddle.x += paddle.dx;

    // Wall detection
    if(paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if(paddle.x < 0) {
        paddle.x = 0;
    }
}

// Move ball on canvas
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (x-axis: left & right walls)
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        // Reverse direction
        ball.dx *= -1; // ball.dx = ball.dx * -1
    }

    // Wall collision (y-axis: top & bottom walls)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // Paddle collision
    if(ball.x - ball.size > paddle.x &&              // check left
        ball.x + ball.size < paddle.x + paddle.w &&  // check right
        ball.y + ball.size > paddle.y){
            ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible){
                if(ball.x - ball.size > brick.x &&             // brick left side check
                    ball.x + ball.size < brick.x + brick.w &&  // brick right side check
                    ball.y + ball.size > brick.y &&            // brick top check
                    ball.y - ball.size < brick.y + brick.h) {  // brick bottom check
                        ball.dy *= -1;         // Change ball direction
                        brick.visible = false; // Make brick invisble on collision

                        // increase score
                        increaseScore();
                }
            }
        });
    });

    // Hit bottom wall - Lose
    if(ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    } 
}


// Increase score
function increaseScore() {
    score++;

    // Check to see if there are any bricks left
    if(score % (brickRowCount * brickRowCount) === 0) {
        showAllBricks();
    }
}

// Make all bricks appear
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        })
    })
}

// Draw everything into DOM
function draw() {
    // clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

// Update canvas drawing and animation
function update(){
    movePaddle();
    moveBall();

    // Draw everything 
    draw();

    requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
}

// Keyup event
function keyUp(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = 0;
    }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// rulesBtn & closeBtn Event Handlers
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});