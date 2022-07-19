// If you are reading this, Sorry for the messy code
// ####################################################
const NORMAL_MODE = "normal";
const RAINBOW_MODE = "rainbow";
const ERASER_MODE = "eraser";
const ERASER_COLOR = "#ffffff";

let mouseDown = false;
let currentMode = NORMAL_MODE;

const canvas = document.getElementById("grid");
const range = document.getElementById("range");
const color = document.getElementById("color");
const normalBtn = document.getElementById("normal");
const rainbowBtn = document.getElementById("rainbow");
const EraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear");
const pixelCount = document.getElementById("pixelCount");

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);
clearBtn.onclick = () => resetCanvas();
range.onmouseup = () => resetCanvas();
EraserBtn.onclick = () => changeColor;
range.onmousemove = () => showPixel(range.value);
rainbowBtn.onclick = () => setCurrentMode(RAINBOW_MODE);
normalBtn.onclick = () => setCurrentMode(NORMAL_MODE);
EraserBtn.onclick = () => setCurrentMode(ERASER_MODE);

const clearCanvas = () => (canvas.innerHTML = "");

function showPixel(pixel) {
  if (mouseDown == true) {
    pixelCount.innerText = `${pixel} x ${pixel}`;
  }
}

function resetCanvas() {
  clearCanvas();
  setGridSize();
}

function setCurrentMode(mode) {
  currentMode = mode;
  setButtonColor();
}

function changeColor(e) {
  if (
    (mouseDown == true && currentMode == NORMAL_MODE) ||
    (e.type == "mousedown" && currentMode == NORMAL_MODE)
  ) {
    e.target.style.backgroundColor = `${color.value}`;
  } else if (
    (mouseDown == true && currentMode == RAINBOW_MODE) ||
    (e.type == "mousedown" && currentMode == RAINBOW_MODE)
  ) {
    let rgb1 = Math.floor(Math.random() * 257);
    let rgb2 = Math.floor(Math.random() * 257);
    let rgb3 = Math.floor(Math.random() * 257);
    e.target.style.backgroundColor = `rgb(${rgb1}, ${rgb2}, ${rgb3})`;
  } else if (
    (mouseDown == true && currentMode == ERASER_MODE) ||
    (e.type == "mousedown" && currentMode == ERASER_MODE)
  ) {
    e.target.style.backgroundColor = ERASER_COLOR;
  }
}

function setGridSize() {
  for (let i = 0; i < range.value * range.value; i++) {
    const grid = document.createElement("div");
    grid.className = "pixel";
    grid.addEventListener("mousedown", changeColor);
    grid.addEventListener("mouseover", changeColor);
    canvas.append(grid);
  }
  canvas.style.gridTemplateColumns = `repeat(${range.value},1fr)`;
}

function setButtonColor() {
  currentMode == NORMAL_MODE
    ? normalBtn.classList.add("on")
    : normalBtn.classList.remove("on");

  currentMode == RAINBOW_MODE
    ? rainbowBtn.classList.add("on")
    : rainbowBtn.classList.remove("on");

  currentMode == ERASER_MODE
    ? EraserBtn.classList.add("on")
    : EraserBtn.classList.remove("on");
}

window.onload = () => {
  setButtonColor();
  setGridSize();
};
