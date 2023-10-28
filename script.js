const canvas = document.getElementById("canvas");
const toolBtns = document.querySelectorAll(".tool");
const ctx = canvas.getContext("2d");
const sizeAdjust = document.getElementById("widthSize");
const menuBtn = document.getElementById("menuBtn");
const pencil = document.getElementById("pencil");
const widthBox = document.getElementById("widthBox");

const drawingHistory = [];
const redoHistory = [];
let pathCount = 0;

let prevMouseX;
let prevMouseY;
let snapshot;
let isDrawing = false;
let selectedTool = "";
let brushWidth = 2;
let drawingColor = "black";
let bgColor = "black";
let canvasBG = "white";

const isactiveClass = () => {
  for (let i = 0; i < toolBtns.length; i++) {
    if (toolBtns[i].classList.contains("active")) {
      return true;
    } else {
      return false;
    }
  }
};

const drawRect = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawCircle = (e) => {
  ctx.beginPath();
  let radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawElipse = (e) => {
  ctx.beginPath();
  const radiusX = Math.abs(e.offsetX - prevMouseX);
  const radiusY = Math.abs(e.offsetY - prevMouseY);
  const rotation = 0;
  const startAngle = 0;
  const endAngle = 2 * Math.PI;

  ctx.ellipse(
    prevMouseX,
    prevMouseY,
    radiusX,
    radiusY,
    rotation,
    startAngle,
    endAngle
  );

  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const drawOblique = (e) => {
  const centerX = (prevMouseX + e.offsetX) / 2;
  const centerY = (prevMouseY + e.offsetY) / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, prevMouseY);
  ctx.lineTo(e.offsetX, centerY);
  ctx.lineTo(centerX, e.offsetY);
  ctx.lineTo(prevMouseX, centerY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const startDraw = (e) => {
  if (isactiveClass) {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = bgColorpicker.value;
    widthBox.classList.add("disp");
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } else isDrawing = false;
};

const drawLine = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const drawTriangle = (e) => {
  ctx.beginPath();

  const sideLength = Math.abs(prevMouseX - e.offsetX);
  const height = sideLength * (Math.sqrt(3) / 2);

  const x1 = prevMouseX - sideLength / 2;
  const y1 = prevMouseY + height / 2;

  const x2 = prevMouseX + sideLength / 2;
  const y2 = prevMouseY + height / 2;

  const x3 = prevMouseX;
  const y3 = prevMouseY - height / 2;

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();

  fillColor.checked ? ctx.fill() : ctx.stroke();
};

const eraseDrawing = (e) => {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = canvasBG;
  ctx.stroke();
};

const freeHandPencil = (e) => {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  widthBox.style.display = "none";
  if (selectedTool === "pencil" && isactiveClass) {
    freeHandPencil(e);
  } else if (selectedTool === "square" && isactiveClass) {
    drawRect(e);
  } else if (selectedTool === "circle" && isactiveClass) {
    drawCircle(e);
  } else if (selectedTool === "line" && isactiveClass) {
    drawLine(e);
  } else if (selectedTool === "triangle" && isactiveClass) {
    drawTriangle(e);
  } else if (selectedTool === "oblique" && isactiveClass) {
    drawOblique(e);
  } else if (selectedTool === "eraser" && isactiveClass) {
    eraseDrawing(e);
  } else if (selectedTool === "elipse" && isactiveClass) {
    drawElipse(e);
  } else {
    isDrawing = false;
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tool").forEach((e) => {
      e.classList.remove("active");
    });

    btn.classList.add("active");
    selectedTool = btn.id;
    if (selectedTool === "pencil") {
      pencil.addEventListener("click", () => {
        pencil.classList.remove("active");
      });
    }

    widthBox.style.display = "flex";
    console.log(selectedTool);
  });
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
sizeAdjust.addEventListener("change", () => (brushWidth = sizeAdjust.value));
