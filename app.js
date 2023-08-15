const gridEl = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreEl = document.getElementById("score");
let squaresArr = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speedRatio = 0.9;
let timerId = 0;

function createGrid() {
    for(let i = 0; i < width * width; i++) {
        const squareEl = document.createElement("div");
        squareEl.classList.add("square");
        gridEl.appendChild(squareEl);
        squaresArr.push(squareEl);
    }
}
createGrid(); 
currentSnake.forEach(index => squaresArr[index].classList.add("snake"));

function startGame() {
    currentSnake.forEach(index => squaresArr[index].classList.remove("snake"));
    squaresArr[appleIndex].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    scoreEl.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApples();
    currentSnake.forEach(index => squaresArr[index].classList.add("snake"));
    timerId = setInterval(move, intervalTime);
}

function move() {
    if(
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] < width && direction === -width) ||
        (squaresArr[currentSnake[0] + direction].classList.contains("snake"))
        ) {
        return clearInterval(timerId);
    }

    const tail = currentSnake.pop();
    squaresArr[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    squaresArr[currentSnake[0]].classList.add("snake");

    // snake eating apple
    if(squaresArr[currentSnake[0]].classList.contains("apple")) {
        squaresArr[currentSnake[0]].classList.remove("apple");
        squaresArr[tail].classList.add("snake");
        currentSnake.push(tail);
        generateApples();
        score++;
        scoreEl.textContent = score;
        clearInterval(timerId);
        intervalTime *= speedRatio;
        timerId = setInterval(move, intervalTime);
    }
}

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squaresArr.length);
    } while(squaresArr[appleIndex].classList.contains("snake"));
    squaresArr[appleIndex].classList.add("apple");
}
generateApples();

function control(e) {
    if(e.keyCode === 37) {
        direction = -1;
    } else if(e.keyCode === 38) {
        direction = -width;
    } else if(e.keyCode === 39) {
        direction = 1;
    } else if(e.keyCode === 40) {
        direction = width;
    }
}
document.addEventListener("keydown", control);

startBtn.addEventListener("click", startGame);