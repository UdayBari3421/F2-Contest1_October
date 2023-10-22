const canvas = document.getElementById("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  ctx = canvas.getContext("2d"),
  sizeAdjust = document.getElementById("widthSize"),
  widthBox = document.getElementById("widthBox");

let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "pencil",
  brushWidth = 2,
  drawingColor = "black",
  bgColor = "black",
  canvasBG = "white";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

window.addEventListener("resize", function () {
  canvas.width = canvas.innerWidth;
  canvas.height = canvas.innerHeight;
});

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

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = colorPicker.value;
  ctx.fillStyle = bgColorpicker.value;
  widthBox.classList.add("disp");
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawLine = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.closePath();
};

const drawOblique = (e) => {
  if (!isDrawing) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(snapshot, 0, 0);

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

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  widthBox.style.display = "none";
  if (selectedTool === "pencil") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "square") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else if (selectedTool === "line") {
    drawLine(e);
  } else if (selectedTool === "oblique") {
    drawOblique(e);
  } else if (selectedTool === "eraser") {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = canvasBG;
    ctx.stroke();
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tool").forEach((e) => {
      e.classList.remove("active");
    });

    btn.classList.add("active");
    selectedTool = btn.id;
    widthBox.style.display = "flex";
    console.log(selectedTool);
  });
});

document.addEventListener(
  "DOMContentLoaded",
  () => (widthBox.style.display = "none")
);

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
sizeAdjust.addEventListener("change", () => (brushWidth = sizeAdjust.value));
