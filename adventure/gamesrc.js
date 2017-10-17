document.getElementById("ball").style.display = "none";
document.getElementById("brick").style.display = "none";
document.getElementById("dbrick").style.display = "none";
document.getElementById("tank").style.display = "none";
document.getElementById("brickBall").style.display = "none";

+ new Date()

var music = document.getElementById("djmushroom")
var play = false;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ball_img = document.getElementById("ball");
var tank_img = document.getElementById("tank");
var elem = document.getElementById("myBar");
var brick_img = document.getElementById("brick");
var brickBall_img = document.getElementById("brickBall");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var spaceReleased = true;
var fired = 0;

var score = 0;
var lives = 5;
var fuj = 0;
var counter = 0;
var key = 0
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

var lvl1 = []

function mouseDown(key){
    if(key==39){
        rightPressed = true;
        
    } else if(key==37){
        leftPressed = true;
        
    } else if(key==40){
        downPressed = true;
        
    } else if(key==38){
        upPressed = true;
        
    } else if(key==41){
        spacePressed = true;
    }
}
function mouseUp(key){
    if(key==39){
        rightPressed = false;
        
    } else if(key==37){
        leftPressed = false;
        
    } else if(key==40){
        downPressed = false;
        
    } else if(key==38){
        upPressed = false;
        
    } else if(key==41){
        spacePressed = false;
    }
}

function keyDownHandler(e){
    if(e.keyCode==39){
        
        rightPressed = true;
        
    }
    else if(e.keyCode==37){
        
        leftPressed = true;
        
    }
    if(e.keyCode==38){
        
        upPressed = true;
        
    }
    else if(e.keyCode==40){
        
        downPressed = true;
        
    }
    if(e.keyCode==32 && spaceReleased){
        
        spacePressed = true;
        spaceReleased = false;
        
    }
    
}

function keyUpHandler(e){
    
    if(e.keyCode==39){
        
        rightPressed = false;
    }
    else if(e.keyCode==37){
        
        leftPressed = false;
        
    }
    if(e.keyCode==38){
        
        upPressed = false;
        
    }
    else if(e.keyCode==40){
        
        downPressed = false;
        
    }
    if(e.keyCode==32){
        
        spacePressed = false;
        spaceReleased = true;
        
    }
}

function drawBall(){
    for(i = 0; i < fired; i++) {
        if(ball[i+1].status == 1) {
            ctx.beginPath();
            ctx.drawImage(ball_img, ball[i+1].x, ball[i+1].y);
            ctx.closePath();
        }
    }
}

function drawPaddle(){
    ctx.beginPath();
    ctx.drawImage(tank_img, paddleX, paddleY);
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
    if(!play) {
        //music.play();
        play = true
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 4;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
    if(downPressed && paddleY + paddleHeight < canvas.height) {
        paddleY += 4;
    }
    else if(upPressed && paddleY - paddleHeight/2 > 0) {
        paddleY -= 4;
    }
    if(spacePressed) {
        spacePressed = false;
        for(i = 0; i < fired; i++) {
            if(ball[i+1].status == 0) {
                added = true;
                ball[i+1] = { x: paddleX+6, y: paddleY, status: 1};
                break;
            }
        } if(!added) {
            fired++;
            ball[fired] = { x: paddleX+6, y: paddleY, status: 1};
        }
    }
    for(i = 0; i < fired; i++) {
        if(ball[i+1].status == 1) {
            ball[i+1].y += dy;
            //ball[i+1].angle -= dy;
        }
    }
    added = false;
}
var main = setInterval(draw,10);
