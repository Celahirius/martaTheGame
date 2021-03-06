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


var paddleHeight = 56;
var paddleWidth = 32;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = canvas.height-paddleHeight-10;

var added = false;

var ballRadius = 5;
var ball_img = document.getElementById("ball");
var ball = [];//= ctx.createPattern(ball_img, 'no-repeat');
var x = paddleX;
var y = paddleY;
var dx = 2;
var dy = -6;
var dy2 = 4;

var tank_img = document.getElementById("tank");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var spaceReleased = true;
var fired = 0;

var elem = document.getElementById("myBar");

var brick_img = document.getElementById("brick");
var brickBall_img = document.getElementById("brickBall");
var brickRowCount = 3;
var brickColumnCount = 4;
var brickWidth = 75;
var brickHeight = 25;
var brickX = (canvas.width-brickWidth)/2;
var brickY =  2 * brickHeight;
var brickDirection = 0
var brickDirections = [0,1,2,3,2,3,1,0,3,2,3,2,1,0,1,2,1,0,3,2,1]
var brickDirectionID = 0
var brickStatus = true
var brickHealth = 20
var brickPadding = 35;
var brickOffsetTop = 35;
var brickOffsetLeft = 35;
var brickFired = false
var brickShotsFired = 0;
var brickShots = [];
var brickFireDelay = Date.now()

var score = 0;
var lives = 5;
var fuj = 0;
var counter = 0;
var key = 0
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

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
//            ctx.save();
//            ctx.translate(ball[i+1].x, ball[i+1].y);
//            ctx.rotate(ball[i+1].angle);
            ctx.drawImage(ball_img, ball[i+1].x, ball[i+1].y);
//            ctx.restore();
//            ctx.arc(ball[i+1].x,ball[i+1].y,ballRadius,0,2*Math.PI);
//            ctx.fillstyle="#0033FF";
//            ctx.fillStroke="#0033FF";
//            ctx.Stroke="10"
//            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawPaddle(){
    ctx.beginPath();
//    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
//    ctx.fillstyle="#0095DD";
    ctx.drawImage(tank_img, paddleX, paddleY);
//    ctx.fill();
    ctx.closePath();
}


function drawBrickShots(){
    for(i = 0; i < brickShotsFired; i++) {
        if(brickShots[i+1].status == 1) {
            ctx.beginPath();
            ctx.drawImage(brickBall_img, brickShots[i+1].x, brickShots[i+1].y);
            ctx.closePath();
        }
    }
}

function drawBricks() {
    if(brickDirectionID > 19) {
        brickDirectionID = 0
    }
    if(brickDirection == 0) {
        if(brickY <= 6) {
            brickDirectionID++;
            brickDirection = brickDirections[brickDirectionID];
            brickFired = true
        }
        brickY -= 2
    }
    if(brickDirection == 1) {
        if(brickX >= canvas.width - brickWidth - 6) {
            brickDirectionID++;
            brickDirection = brickDirections[brickDirectionID];
            brickFired = true
        }
        brickX += 2
    }
    if(brickDirection == 2) {
        if(brickY >= canvas.height / 2 - 6) {
            brickDirectionID++;
            brickDirection = brickDirections[brickDirectionID];
            brickFired = true
        }
        brickY += 2
    }
    if(brickDirection == 3) {
        if(brickX <= 6) {
            brickDirectionID++;
            brickDirection = brickDirections[brickDirectionID];
            brickFired = true
        }
        brickX -= 2
    }
    
    ctx.beginPath();
    ctx.drawImage(brick_img, brickX, brickY);
    ctx.closePath();
    
    if(((brickX + 20 <= paddleX + 4) && (brickX + 20 >= paddleX - 4)) || ((brickX <= canvas.width/2 + 2) && (brickX >= canvas.width/2 - 2)) || ((brickY <= canvas.height/4 + 2) && (brickY >= canvas.height/4 - 2))) {
        if(Date.now() - brickFireDelay > 600) {
            brickFired = true
            brickFireDelay = Date.now()
        }
    }
}

function drawFuj() {
    ctx.beginPath();
    var dbrick_img = document.getElementById("dbrick");
    var destroyed_brick = ctx.createPattern(dbrick_img, 'no-repeat');
    if(fuj == 1 && counter < 20) {
        ctx.drawImage(dbrick_img, (canvas.width-dbrick_img.width)/3, (canvas.height-dbrick_img.height)/3);
        counter++;
    } else if(counter == 20) {
        counter = 0;
        fuj = 0;
    }
//    ctx.fill();
    ctx.closePath();
}

var scale = 1
function finishHim() {
    drawImage(imgObj, brickX, brickY, brick_img.width * scale, brick_img.height * scale)
    scale -= 0.1
    if (scale == 0) {
        clearInterval(interval);
    }
}
function finishHimFuj() {
    drawImage(imgObj, brickX, brickY, dbrick_img.width * scale, dbrick_img.height * scale)
    scale += 0.1
    if (scale == 2) {
        clearInterval(interval);
    }
}

function collisionDetection() {
    for(i = 0; i < fired || i < brickShotsFired; i++) {
        if(i < fired && ball[i+1].status == 1) {
            if(ball[i+1].y < ballRadius || ball[i+1].y > canvas.height-ballRadius) {
                ball[i+1].status = 0;
            }
            if(ball[i+1].x + 10 > brickX && ball[i+1].x < brickX+brickWidth
               && ball[i+1].y > brickY && ball[i+1].y < brickY+brickHeight) {
                brickHealth -= 1
                
                var barWidth = brickHealth * 5
                elem.style.width = barWidth + '%';
                
                ball[i+1].status = 0;
                fuj = 1;
                score += 1;
                if(brickHealth == 0) {
                    brickStatus = false
                    alert("YOU WON, CONGRATULATIONS!");
                    document.location.reload();
                }
            }
        }
        if(i < brickShotsFired && brickShots[i+1].status == 1) {
            if(brickShots[i+1].y < ballRadius || brickShots[i+1].y + 12 > canvas.height) {
                brickShots[i+1].status = 0;
            }
            if((brickShots[i+1].x + 12 > paddleX) && (brickShots[i+1].x - 2 < paddleX + paddleWidth)
               && (brickShots[i+1].y + 16 > paddleY) && (brickShots[i+1].y + 16 < paddleY + paddleHeight)) {
                brickShots[i+1].status = 0;
                score--;
                lives--;
                if(lives == 0) {
                    alert("YOU LOST! Xd");
                    alert("Serio, mało rzeczy mnie triggeruje tak jak to chore „Xd”. Kombinacji x i d można używać na wiele wspaniałych sposobów. Coś cię śmieszy? Stawiasz „xD”. Coś się bardzo śmieszy? Śmiało: „XD”! Coś doprowadza Cię do płaczu ze śmiechu? „XDDD” i załatwione. Uśmiechniesz się pod nosem? „xd”. Po kłopocie. A co ma do tego ten bękart klawiaturowej ewolucji, potwór i zakała ludzkiej estetyki - „Xd”? Co to w ogóle ma wyrażać? Martwego człowieka z wywalonym jęzorem? Powiem Ci, co to znaczy. To znaczy, że masz w telefonie włączone zaczynanie zdań dużą literą, ale szkoda Ci klikać capsa na jedno „d” później. Korona z głowy spadnie? Nie sondze. „Xd” to symptom tego, że masz mnie, jako rozmówcę, gdzieś, bo Ci się nawet kliknąć nie chce, żeby mi wysłać poprawny emotikon. Szanujesz mnie? Używaj „xd”, „xD”, „XD”, do wyboru. Nie szanujesz mnie? Okaż to. Wystarczy, że wstawisz „Xd” w choć jednej wiadomości. Nie pozdrawiam");
                    document.location.reload();
                }
            }
        }
    }
}

function collisionDetection2() {
    for(i = 0; i < fired; i++) {
        for(j = 0; j < brickShotsFired; j++) {
            if(ball[i+1].status == 1 && brickShots[j+1].status == 1
               &&brickShots[j+1].x + 5 > ball[i+1].x && brickShots[j+1].x + 5 < ball[i+1].x + 10
               && brickShots[j+1].y + 5 > ball[i+1].y && brickShots[j+1].y + 5 < ball[i+1].y + 10) {
                ball[i+1].status = 0;
                brickShots[j+1].status = 0;
                score++;
            }
        }
    }
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
    drawBrickShots();
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    collisionDetection2();
    drawFuj();
    
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
    
    if(brickFired) {
        brickFired = false
        for(i = 0; i < brickShotsFired; i++) {
            if(brickShots[i+1].status == 0) {
                added = true;
                brickShots[i+1] = { x: brickX+22, y: brickY, status: 1};
                break;
            }
        } if(!added) {
            brickShotsFired++;
            brickShots[brickShotsFired] = { x: brickX+22, y: brickY, status: 1};
        }
    }
    for(i = 0; i < brickShotsFired; i++) {
        if(brickShots[i+1].status == 1) {
            brickShots[i+1].y += dy2;
        }
    }
    added = false;
    //<!--            requestAnimationFrame(draw);-->

}
var main = setInterval(draw,10);
