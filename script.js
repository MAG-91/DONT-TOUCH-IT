let canvas;
let context;
let squareX;
let squareY;
let squareSize = 50;
let squareXSpeed = 8;
let squareYSpeed = 2;

let square2X;
let square2Y;
let square2Size = 70;
let square2XSpeed = 7;
let square2YSpeed = 4;

let square3X;
let square3Y;
let square3Size = 90;
let square3XSpeed = 10;
let square3YSpeed = -1;

let playerX;
let playerY;
let playerSize = 25;
let moveX = 0;
let moveY = 0;
let score = 0;
let gameover = false;
let mainSound = new Audio("./sounds/mainsound.mp3");
let goSound = new Audio("./sounds/gameover.mp3");

window.onload = function() {
	
	canvas = document.getElementById('canvas')
	context = canvas.getContext('2d')
	// mainSound.play();
	//StartPosition
	squareX = canvas.width/2;
	squareY = canvas.height/2;
	square2X = canvas.width/2;
	square2Y = canvas.height/2;
	square3X = canvas.width/2;
	square3Y = canvas.height/2;
	playerX = canvas.width/2 - playerSize/2;
	playerY = 600 - playerSize;
	document.onkeydown = checkKeys;
	document.onkeyup = function() {moveY = 0; moveX = 0;}
	let fps = 60;
	setInterval(function() {
		draw();
		update();
	//1000MS
	}, 1000/fps);
}

function draw() {
	//Canvas
	drawRect(0, 0, canvas.width, canvas.height, 'black');
	//Enemy
	drawRect(squareX, squareY, squareSize, squareSize, 'white');
	//2Enemy
	drawRect(square2X, square2Y, square2Size, square2Size, 'white');
	//3Enemy
	drawRect(square3X, square3Y, square3Size, square3Size, 'white');


	//RealPlayer
	drawRect(playerX, playerY, playerSize, playerSize, 'red');
	text('Score: ' + Math.floor(score), '30px Couture', 10, 50, 'red');
	if(gameover) {	
		goSound.play();
		drawRect(0, 0, canvas.width, canvas.height, 'black');
		text('GAME OVER', '60px Couture', canvas.width/2.75, canvas.height/2, 'white');
		drawRect(canvas.width/2.1, canvas.height/1.75, 100, 50, 'white')
		playerX = canvas.width - playerSize;
		playerY = canvas.height - playerSize;
		score = 0;
	}
}
function update() {
	mainSound.play();
	//Moving to the rightdown
	squareX += squareXSpeed;
	squareY += squareYSpeed;
	square2X += square2XSpeed;
	square2Y += square2YSpeed;
	square3X += square3XSpeed;
	square3Y += square3YSpeed;
	playerX += moveX;
	playerY += moveY;
	score += 0.1;
	let colY = doCollision(playerX, playerY, playerSize/2, squareX, squareY, squareSize/2);
	// console.log(colY)
	if (colY) {
		gameover = true;
	}

	let col2Y = doCollision(playerX, playerY, playerSize/2, square2X, square2Y, square2Size/2);
	if (col2Y) {
		gameover = true;
	}

	let col3Y = doCollision(playerX, playerY, playerSize/2, square3X, square3Y, square3Size/2);
	if (col3Y) {
		gameover = true;
	}
	
	//PlayerOuter canvas
	if (playerX + playerSize > canvas.width || playerX < 0 || playerY + playerSize > canvas.height || playerY < 0) {
		gameover = true;
	}

	//Outer canvas
	if(squareX + squareSize > canvas.width) {
		squareXSpeed = - squareXSpeed
	}
	if(squareX < 0) {
		squareXSpeed = - squareXSpeed
	}
	if(squareY + squareSize > canvas.height) {
		squareYSpeed = - squareYSpeed
	}
	if(squareY < 0) {
		squareYSpeed = - squareYSpeed 
	}
	//square2
	if(square2X + square2Size > canvas.width) {
		square2XSpeed = - square2XSpeed
	}
	if(square2X < 0) {
		square2XSpeed = - square2XSpeed
	}
	if(square2Y + square2Size > canvas.height) {
		square2YSpeed = - square2YSpeed
	}
	if(square2Y < 0) {
		square2YSpeed = - square2YSpeed 
	}
	//square3
	if(square3X + square3Size > canvas.width) {
		square3XSpeed = - square3XSpeed
	}
	if(square3X < 0) {
		square3XSpeed = - square3XSpeed
	}
	if(square3Y + square3Size > canvas.height) {
		square3YSpeed = - square3YSpeed
	}
	if(square3Y < 0) {
		square3YSpeed = - square3YSpeed 
	}
	
}
//Just to draw faster Rects
function drawRect(x, y, width, height, color) {
	context.fillStyle = color;
	context.fillRect(x, y, width, height)
	
}

function checkKeys(key) {
	console.log(key.keyCode)
	//Keys W 87 A 65 S 83 D 68
	//Smother Movement 
	if (key.keyCode === 87) {
		moveY =-10
		moveX = 0
	} else if (key.keyCode === 65) {
		moveX =-10
		moveY = 0
 	} else if (key.keyCode === 68) {
		moveX =+10
		moveY = 0
	} else if (key.keyCode === 83) {
		moveY =+10
		moveX = 0
	}
}

function doCollision(px1, py1, pw1, ex1, ey1, ew1) {
	let desX = ex1 - px1;
	let desY = ey1 - py1;
	let wt = pw1 + ew1;
	return (desX * desX + desY * desY <= wt * wt);
}

function text(txt, fnt, x, y, clr) {
	context.fillStyle = clr;
	context.font = fnt;
	context.fillText(txt, x, y);
}

// function playGoSound (src) {
// 	let sound = $("sound")[0];
// 	sound.src = src;
// 	sound.load();
// 	sound.play();

//     return false;
// }
