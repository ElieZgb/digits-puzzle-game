let squares = Array.from(document.querySelectorAll(".grid div"));
squares.forEach(square => square.addEventListener('click', swap));
const winDisplay = document.querySelector(".win");
const shuffleBtn = document.querySelector(".shuffleBtn");
const playBtn = document.querySelector(".playBtn");
colors = ["#ed5326", "#fe9701", "#837619", "#b0b42d", "#699f38", "#449f49", "#019688", "#0297a6", 
			"#0288d0", "#1a61c5", "#3f51b5", "#673cb0", "#ab46bc", "#eb407a", "#db3e37"]


let taken = []
for(let i=1;i<squares.length;i++){
	let random = Math.floor(Math.random()*squares.length);
	while(exists(taken, random)){
		random = Math.floor(Math.random()*squares.length);
	}
	squares[random].innerHTML = i;
	taken.push(random);
}

for(let i=0;i<squares.length;i++){
	if(!exists(taken, i)){
		squares[i].classList.add("empty");
		break;
	}
}

function tileColors(){
	for(let i=0;i<colors.length;i++){
		for(let j=0;j<squares.length;j++){
			if(parseInt(squares[j].innerHTML) == i+1){
				squares[j].style.backgroundColor = colors[i];
				break;
			}
		}
	}
}


function exists(arr, n){
	for(let i=0;i<arr.length;i++){
		if(arr[i]===n){
			return true;
		}
	}
	return false;
}

tileColors();
let col1 = [squares[0], squares[4], squares[8], squares[12]]
let col2 = [squares[1], squares[5], squares[9], squares[13]]
let col3 = [squares[2], squares[6], squares[10], squares[14]]
let col4 = [squares[3], squares[7], squares[11], squares[15]]
let row1 = [squares[0], squares[1], squares[2], squares[3]]
let row2 = [squares[4], squares[5], squares[6], squares[7]]
let row3 = [squares[8], squares[9], squares[10], squares[11]]
let row4 = [squares[12], squares[13], squares[14], squares[15]]
let cols = [col1,col2,col3,col4];
let rows = [row1,row2,row3,row4];

function swap(e){
	const square = e.target;
	updateNeighbor(square, squares.indexOf(square));
	tileColors();
	checkGrid();
}

function updateNeighbor(element, index){
	const isAtRightEdge = (index % 4 == 3);
	const isAtLeftEdge =  (index%4 == 0);
	let emptySquare = document.querySelector(".empty");

	for(let i=0;i<cols.length;i++){
		if(exists(cols[i], element) && exists(cols[i], emptySquare)){
			if(squares.indexOf(emptySquare) < index){
				let emptyIndex = squares.indexOf(emptySquare);
				while(!element.classList.contains("empty")){
					squares[emptyIndex+4].classList.add("empty");
					squares[emptyIndex].classList.remove("empty");
					squares[emptyIndex].innerHTML = squares[emptyIndex+4].innerHTML;
					squares[emptyIndex+4].innerHTML = "";
					emptyIndex+=4;
				}
			}else if(squares.indexOf(emptySquare) > index){
				let emptyIndex = squares.indexOf(emptySquare);
				while(!element.classList.contains("empty")){
					squares[emptyIndex-4].classList.add("empty");
					squares[emptyIndex].classList.remove("empty");
					squares[emptyIndex].innerHTML = squares[emptyIndex-4].innerHTML;
					squares[emptyIndex-4].innerHTML = "";
					emptyIndex-=4;
				}
			}

			break;
		}
		else if(exists(rows[i], element) && exists(rows[i], emptySquare)){
			if(squares.indexOf(emptySquare) < index){
				let emptyIndex = squares.indexOf(emptySquare);
				while(!element.classList.contains("empty")){
					squares[emptyIndex+1].classList.add("empty");
					squares[emptyIndex].classList.remove("empty");
					squares[emptyIndex].innerHTML = squares[emptyIndex+1].innerHTML;
					squares[emptyIndex+1].innerHTML = "";
					emptyIndex+=1;
				}
			}else if(squares.indexOf(emptySquare) > index){
				let emptyIndex = squares.indexOf(emptySquare);
				while(!element.classList.contains("empty")){
					squares[emptyIndex-1].classList.add("empty");
					squares[emptyIndex].classList.remove("empty");
					squares[emptyIndex].innerHTML = squares[emptyIndex-1].innerHTML;
					squares[emptyIndex-1].innerHTML = "";
					emptyIndex-=1;
				}
			}

			break;
		}
	}
}
	
function checkGrid(){
	let gridCompleted = true;
	for(let i=0;i<squares.length-1;i++){
		for(let j=i+1;j<squares.length-1;j++){
			if(parseInt(squares[j].innerHTML)<parseInt(squares[i].innerHTML) || squares[j].innerHTML == ""){
				gridCompleted = false;
			}
		}
	}

	if(gridCompleted){
		setTimeout(win, 50)
	}
}

function shuffle(){
	shuffleBtn.style.display = "block";
	playBtn.style.display = "none";
	winDisplay.style.display = "none";
	squares.forEach(square => {
		if(square.classList.contains("empty")){
			square.classList.remove("empty");
		}
		square.addEventListener('click', swap)
	})
	
	taken = []
	for(let i=1;i<squares.length;i++){
		let random = Math.floor(Math.random()*squares.length);
		while(exists(taken, random)){
			random = Math.floor(Math.random()*squares.length);
		}
		squares[random].innerHTML = i;
		taken.push(random);
	}

	for(let i=0;i<squares.length;i++){
		if(!exists(taken, i)){
			squares[i].classList.add("empty");
			squares[i].innerHTML = ""
			break;
		}
	}

	tileColors();
	col1 = [squares[0], squares[4], squares[8], squares[12]]
	col2 = [squares[1], squares[5], squares[9], squares[13]]
	col3 = [squares[2], squares[6], squares[10], squares[14]]
	col4 = [squares[3], squares[7], squares[11], squares[15]]
	row1 = [squares[0], squares[1], squares[2], squares[3]]
	row2 = [squares[4], squares[5], squares[6], squares[7]]
	row3 = [squares[8], squares[9], squares[10], squares[11]]
	row4 = [squares[12], squares[13], squares[14], squares[15]]
	cols = [col1,col2,col3,col4];
	rows = [row1,row2,row3,row4];
}

function win(){
	winDisplay.style.display = "flex";
	shuffleBtn.style.display = "none";
	playBtn.style.display = "block";
	squares.forEach(square => square.removeEventListener('click', swap));
}