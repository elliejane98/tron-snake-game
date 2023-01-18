// This is going to search out HTML for the word 'canvas' once it find that word its going to place that into our canvas variable

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // Varible 'c' mean contexts
// // Creating a 2d context that allows us the draw on the canvas
// This is going to search out HTML for the word 'canvas' once it find that word its going to place that into our canvas variable

let canvas = document.getElementById('grid');
let ctx = canvas.getContext('2d');


// Creating board size
let blockSize = 30;
let rows = 25;
let cols = 25;
let board;
let context;


// Snake head 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = []

//  Food
var foodX;
var foodY;

// Death
var gameOver = false;

window.onload = function() {
    board = document.querySelector('canvas')
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');

    placeFood();
    document.addEventListener('keyup', changeDirection);
    update();
    // every 100 milliseconds its going to run the update function
    setInterval(update, 1000/10); 
}


function update() {

    if (gameOver){
        return;
    }
    
    context.fillStyle='black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle='pink';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // if snake x is equal to food x and snake y is equal to food y 
    if (snakeX == foodX && snakeY == foodY) {
        // Below we are going to grow the segment where the fod was 
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    // .2 the snake now gets the body from the food 
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle='skyBlue';
    // ---------- not sure why this is added below the velocity
    snakeX += velocityX *blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    // .1 Below we are telling it to turn the food into the body when its touched by the body(however this leave the body in one place now we need to connect the new body part to the snake)
    for (let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    // Game over conditions 
    if(snakeX <0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        // alert('Game Over!!!');

        context.fillStyle='white';
        context.font='50px Verdana';
        context.fillText('Game Over',canvas.width / 4, canvas.height / 2);
    }

    // Game over conditions
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        // alert('Game Over!!!');
        }
    }
}

function changeDirection(e){
    if (e.code == 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    //  && velocityX != 1 is checking that if the snake is going left it can not go right as it would eat its self
    if (e.code == 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    // Math.random returns a number between 0-1 and we are multiplying in by the num of colums or rows so this becomes so this becomes a number between 0-24 (because we have 25 rows and 25 colums but it doesnt include the 25th colum or row thats why we use math.floor as it gets rid of decimals) and then we mutiply it by the block size which weve created and is 30
    foodX = Math.floor(Math.random()*cols) *blockSize;
    foodY = Math.floor(Math.random() *rows) *blockSize;
}

// Score 
let count = 0;
count++;
console.log(count); 
count--;
console.log(count); 