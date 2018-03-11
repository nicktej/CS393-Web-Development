"use stricts";
//fifteen-puzzle

var i = 1;	
var x = 0;
var y = 0;
var complete = false;
var positions = [];
var emptyx = 3;
var emptyy = 3;
var hund = 100;

window.onload = function(){
	addSquare();
	document.getElementById("shufflebutton").onclick = shufflebutton;
}

function shufflebutton(){
	for (var i = 0; i<1000; i++){
		var x; var y;
		x = parseInt(Math.random()*4);
		y = parseInt(Math.random()*4);
		var tx = emptyx;
		var ty = emptyy;
		if(((Math.abs(x-tx)) == 1) && (ty == y)){
			emptyx = x;
			emptyy = y;
			x = tx*hund;
			y = ty*hund;
			var square = document.getElementById("square_" + emptyx + "_" + emptyy);
			square.id="square_" + (x/hund) + "_"+ (y/hund);
			square.style.top = y + "px";
			square.style.left = x + "px";
		}
		else if(((Math.abs(y-ty)) == 1) && (tx == x)){
			var string = "movableV";
			console.log(string);
			emptyx = x;
			emptyy = y;
			x = tx*hund;
			y = ty*hund;
			var square = document.getElementById("square_" + emptyx + "_" + emptyy);
			square.id="square_" + (x/hund) + "_"+ (y/hund);
			square.style.top = y + "px";
			square.style.left = x + "px";
		}

		else {;}
	}
}

function addSquare(){

	while (i<=15){

		if (i==1 || i==2 || i==3 || i==4){ y=0; p=0; } 
		if (i==5 || i==6 || i==7 || i==8){ y=100; p=-100; } 
		if (i==9 || i==10 || i==11 || i==12){ y=200; p=-200; } 
		if (i==13 || i==14 || i==15){ y=300; p=-300; } 
		if (i==1 || i==5 || i==9 || i==13){ x=0; q=0; } 
		if (i==2 || i==6 || i==10 || i==14){ x=100; q=-100; } 
		if (i==3 || i==7 || i==11 || i==15){ x=200; q=-200; } 
		if (i==4 || i==8 || i==12){ x=300; q=-300; } 


	var square = document.createElement("div");
	square.className="square";
	square.id="square_" + (x/hund) + "_"+ (y/hund);
	square.style.top= y + "px";
	square.style.left= x + "px";
	square.style.backgroundImage = "url(background.jpg)";
	square.style.border="black solid 5px";
	square.style.backgroundPosition= q + "px " + p + "px ";
	square.textContent=i;
	square.onmouseover = hover;
	square.onmouseout = mouseoff;
	square.onmousedown = clickSquare;

	//console.log(square.id);
	var puzzlearea = document.getElementById("puzzlearea");
	puzzlearea.appendChild(square);
	i++;
	}
}

function clickSquare() {
	a=(this.id);
	Move(a);
}

function Move(a){
	var what = a;
	ans = canMove(a);
	if (ans){
		var x = what.charAt(7);
		var y = what.charAt(9);
		var tx = emptyx;
		var ty = emptyy;
		emptyx = x;
		emptyy = y;
		x = tx*hund;
		y = ty*hund;
		var square = document.getElementById("square_" + emptyx + "_" + emptyy);
		square.id="square_" + (x/hund) + "_"+ (y/hund);
		square.style.top = y + "px";
		square.style.left = x + "px";
	}
}

function canMove(a){
	return next(a);
}

function next(a){
	var x = a.charAt(7);
	var y = a.charAt(9);
		//console.log(x, y);
	var tx = emptyx;
	var ty = emptyy;
	if(((Math.abs(x-tx)) == 1) && (ty == y)){
		var string = "movableH";
		console.log(string);
		return true;
	}

	else if(((Math.abs(y-ty)) == 1) && (tx == x)){
		var string = "movableV";
		console.log(string);
		return true;
	}

	else { 
		var string = "invalid move";
		console.log(string);
		return false;
	}

}

function hover(a){
	var tell = document.getElementById(a.path[0].id);
	var id = tell.id;
	var x = id.charAt(7);
	var y = id.charAt(9);
	var tx = emptyx;
	var ty = emptyy;
	if(((Math.abs(x-tx)) == 1) && (ty == y)){
		tell.style.color= "red";
		tell.style.border= "red solid 5px";
		tell.style.cursor= "pointer";
	}
	else if(((Math.abs(y-ty)) == 1) && (tx == x)){
		tell.style.color= "red";
		tell.style.border= "red solid 5px";
		tell.style.cursor= "pointer";
	}
	else {}
}

function mouseoff(a){
	var tell = document.getElementById(a.path[0].id);
	tell.style.color= "white";
	tell.style.border= "black solid 5px";
	tell.style.cursor= "default";
}


