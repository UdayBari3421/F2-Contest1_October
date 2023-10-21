const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let lock = document.getElementById("lock");

let drawingColor = "black";
let previousPosition = null;

function startDrawing(e) {
  previousPosition = [e.clientX, e.clientY];
  c.strokeStyle = drawingColor;
  c.lineWidth = 2;
  canvas.addEventListener("mousemove", drawing);
  canvas.addEventListener("mouseup", onMouseUp);
}

function drawing(e) {
  let currentPosition = [e.clientX, e.clientY];
  if (isPencilActive) {
    c.beginPath();
    c.moveTo(...previousPosition);
    c.lineTo(...currentPosition);
    c.stroke();
  }

  c.closePath();

  previousPosition = currentPosition;
}

function onMouseUp(e) {
  canvas.removeEventListener("mousemove", drawing);
}

function lockClick() {
  lock.classList.toggle("active");
  if (lock.innerText === "lock_open") {
    lock.innerText = "lock";
    lock.classList.toggle("active");
  } else {
    lock.innerText = "lock_open";
    lock.classList.toggle("active");
  }
}

const buttons = document.querySelectorAll(".press");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("active");
  });
});

lock.addEventListener("click", lockClick);
canvas.addEventListener("mousedown", startDrawing);

window.addEventListener("resize", getSizes, false);
let out = document.getElementById("zoom");
let zoom =
  Math.ceil(((window.outerWidth - 10) / window.innerWidth) * 100) + "%";
out.textContent = zoom;

function getSizes() {
  zoom = Math.ceil(((window.outerWidth - 10) / window.innerWidth) * 100) + "%";
  out.textContent = zoom;
}
