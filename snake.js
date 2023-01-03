const announcer = document.querySelector('.displayAnnouncer');
const button = document.querySelector('.displayButton');
var tileSize = 25, rows = 20, cols = 20, floor, context, rate = 1000/10; //will create the floor
//affect game physics
var snakeX = tileSize*5, snakeY = tileSize*5, appleX, appleY;
//this will be the rate of change that will this game physics work
const speed = 1;
//length of snake
var appleEaten = 0;
var snakeBody = [];
var velocityX = 0, velocityY = 0;

window.onload = function(){
    floor = document.getElementById("floor");
    floor.height = rows * tileSize;
    floor.width = cols * tileSize;
    context = floor.getContext("2d"); //used to draw the board

    placeFoodRandom();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, rate);
}

//define update
function update(){
    //this is the board
    context.fillStyle="black";
    context.fillRect(0, 0, floor.width, floor.height);

    //apple
    context.fillStyle="red"
    context.fillRect(appleX, appleY, tileSize, tileSize);

    //this is the snake update
    context.fillStyle="lime";
    snakeX += velocityX*tileSize; snakeY += velocityY*tileSize;
    gameOver();
    if(snakeX === appleX && snakeY == appleY){
        snakeBody.push([appleX, appleY]);
        appleEaten++;
        placeFoodRandom();
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];

    }
    
    context.fillRect(snakeX, snakeY, tileSize, tileSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], tileSize, tileSize);
    }
    gameOver();
}

//the food must not be in an areas where the snake has its body
function placeFoodRandom(){
    appleX = Math.floor(Math.random() * cols) * tileSize;
    appleY = Math.floor(Math.random() * rows) * tileSize;
}

function changeDirection(e){
    if((e.code == "ArrowUp" || e.key == 'W' || e.key == 'w') && velocityY != speed){
        velocityX = 0;
        velocityY = -speed;
    }else if((e.code == "ArrowDown" || e.key == 'S' || e.key == 's') && velocityY != -speed){
        velocityX = 0;
        velocityY = speed;
    }else if((e.code == "ArrowRight" || e.key == 'D' || e.key == 'd') && velocityX != -speed){
        velocityX = speed;
        velocityY = 0;
    }else if((e.code == "ArrowLeft" || e.key == 'A' || e.key == 'a') && velocityX != speed){
        velocityX = -speed;
        velocityY = 0;
    }
}

function gameOver(){
    if(snakeX >= floor.width || snakeX <= -1 || snakeY >= floor.height || snakeY <= -1 ){
        velocityX = 0;
        velocityY = 0;
        announcer.classList.remove('hide');
        announcer.classList.remove('hide');
        announcer.innerHTML += `${appleEaten}`;
        return;
    }
    for(let i = 0; i < snakeBody.length; i++){
        const b = snakeBody;
        if(snakeBody[i] == [snakeX, snakeY]){
            velocityX = 0;
            velocityY = 0;
            announcer.classList.remove('hide');
            announcer.classList.remove('hide');
            announcer.innerHTML += `${appleEaten}`;
            return;
            break;
        }
    }
}

function resetGame(){
    announcer.classList.add('hide');
    button.classList.add('hide');
    appleEaten = 0, velocityX = 0, velocityY = 0, snakeX = floor.width/2, snakeY = floor.height/2;
}