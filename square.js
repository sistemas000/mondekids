const canvas = document.getElementById("canvas");;
const ctx = canvas.getContext("2d");
const SIZE_SQUARE  = 40;

canvas.width = 400;
canvas.height = 500;

let dx = 5;
let dy = 5;
let x = canvas.width/2;
let y = canvas.height/2;


let square = () => {
	ctx.fillStyle = "#FF0000";
    ctx.fillRect(x, y, SIZE_SQUARE, SIZE_SQUARE);
}

let rect = () => {
	ctx.beginPath();
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.closePath();
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";
	ctx.fill();
	ctx.stroke();
}

let clear = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let init = () => {
	return setInterval(draw, 10);
}

let doKeyDown = (evt) =>{
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
		if (y - dy > 0){
			y -= dy;
		}
		break;
		case 40:  /* Down arrow was pressed */
		if (y + dy < canvas.height - SIZE_SQUARE){
			y += dy;
		}
		break;
		case 37:  /* Left arrow was pressed */
		if (x - dx > 0){
			x -= dx;
		}
		break;
		case 39:  /* Right arrow was pressed */
		if (x + dx < canvas.width - SIZE_SQUARE){
			x += dx;
		}
		break;
	}
}

let draw = () => {
	clear();
	rect();
	square();
}

init();

window.addEventListener('keydown',doKeyDown,true);