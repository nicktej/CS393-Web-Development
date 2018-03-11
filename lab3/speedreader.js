//Speedreader JS code


var counter;
var timer;
var delay;
counter = 0;


function start() {
	var input = document.getElementById("myinput");
	var mytext = input.value;
	var result = mytext.split(/[ \t\n]+/);
	console.log(result);
	var speed = parseInt(document.getElementById("speed").value);
	document.getElementById("st").disabled = true;
	console.log(speed);
	words(result, speed);
}

function speed1(sp) {
	delay=sp.options[sp.selectedIndex].value;
	stop();
	start();
	console.log(delay);
}

function size1(me) {
	document.getElementById("center").style.fontSize = me.value + "pt";
}

function words(result, speed, size) {
	var output = document.getElementById("center");
	timer = setInterval(function(){

		output.innerHTML = result[counter]; counter++;

		if(counter == result.length){
			counter = 0;
		}

	}, speed);
}

function stop() {
	clearInterval(timer);
	document.getElementById("st").disabled = false;
}