/*const canvas = document.getElementById("canvas");;
const ctx = canvas.getContext("2d");
const SIZE_SQUARE  = 40;

canvas.width = 600;
canvas.height = 700;

let dx = 5;
let dy = 5;
let x = 20;
let y = 10;


square = () => {
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(x, y, SIZE_SQUARE, SIZE_SQUARE);
}

maze = () => {
	
	const X = [20,580,20,20,530,20,20,70,70,70,580,20];
	const LastX = [580,580,20,530,530,530,20,580,70,580,580,580];
	const Y = [10,10,10,50,50,130,130,180,180,230,230,280];
	const LastY = [10,180,50,50,130,130,280,180,230,230,280,280];

	for (let i = 0; i < X.length; ++i) {
        ctx.beginPath();
        ctx.moveTo(LastX[i],LastY[i]);
        ctx.lineTo(X[i],Y[i]);
        ctx.stroke();
	}
}

rect = () => {
	ctx.beginPath();
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";
	ctx.fill();
	ctx.stroke();
}

clear = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init = () => {
	return setInterval(draw, 10);
}

doKeyDown = (evt) =>{
	switch (evt.keyCode) {
		case 38:  //Up arrow was pressed 
		if (y - dy > 0 && y - dy > 5){
			y -= dy;
		}else{
			//alert(' you are out');
		}
		break;
		case 40:  //Down arrow was pressed 
		if (y + dy < canvas.height - SIZE_SQUARE){
			y += dy;
		}else {
			//alert('you are out');
		}
		break;
		case 37:// Left arrow was pressed 
		if (x - dx > 15 ){
			x -= dx;
			
		}else {
			//alert('you are out');
		}
		break;
		case 39:  // Right arrow was pressed 
		if (x + dx < 540){
			x += dx;
		} else {
			//alert('you are out'); 
		}
		break;
	}
}

draw = () => {
	//clear();
	rect();
	square();
	maze();
}

init();

window.addEventListener('keydown',doKeyDown,true);*/

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		console.log(hero.y,'position');
		if(hero.y > 20) {
		hero.y -= hero.speed * modifier;
		}
	}
	if (40 in keysDown) { // Player holding down
		if(hero.y < canvas.height  - 64) {
		hero.y += hero.speed * modifier;
		}
	}
	if (37 in keysDown) { // Player holding left
		if (hero.x > 20) {
			hero.x -= hero.speed * modifier;
		}
	}
	if (39 in keysDown) { // Player holding right
		if (hero.x < canvas.width -64 )
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		if(monstersCaught === 5) {
			alert('cosa');
		}
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Atrapa al menos 5" , 32, 32);
	ctx.fillText("Personajes atrapados: " + monstersCaught, 32, 64);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();