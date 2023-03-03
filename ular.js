var canvas =
document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var blockSize=10;
var width= canvas.width / blockSize;
var height = canvas.height / blockSize;

var snake = []
for (var i = 5; i >= 0; i--) {
    snake.push({x:i, y:0});
}

var food = {
    x: Math.round(Math.random()*(width -1)),
    y: Math.round(Math.random()*(height -1))
};

var direction;

var interval= 100;

draw();

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i=0; i < snake.length; i++){
        ctx.fillStyle ="green";
        ctx.fillRect(snake[i].x * blockSize, snake [i].y * blockSize
         ,blockSize,blockSize);

         var headX = snake[0].x;
         var headY = snake[0].y;

         switch(direction) {
            case "right":
                headX++;
                break;
                case "left":
                    headX--;
                    break;
                    case "up":
                        headY--;
                        break;
                        case "down":
                            headY++;
                            break;
         }
         if (headX < 0 || headY < 0 || headX >= width
             || headY >= height|| checkCollision
             (headX, headY, snake)){
                clearInterval(gameLoop);
                alert("Game over")
             }
    }
}