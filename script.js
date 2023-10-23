const canvas = document.getElementById("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  ctx = canvas.getContext("2d"),
  sizeAdjust = document.getElementById("widthSize"),
  menuBtn = document.getElementById("menuBtn"),
  pencil = document.getElementById("pencil"),
  widthBox = document.getElementById("widthBox");

let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "",
  brushWidth = 2,
  drawingColor = "black",
  bgColor = "black",
  canvasBG = "white";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

window.addEventListener("resize", function () {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
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

const ad = document.querySelectorAll(".tool");
const bool = () => {
  for (let i = 0; i < ad.length; i++) {
    if (ad[i].classList.contains("active")) {
      return true;
    } else {
      return false;
    }
  }
};
const startDraw = (e) => {
  if (bool) {
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
  ctx.closePath();
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

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);
  widthBox.style.display = "none";
  if (selectedTool === "pencil" && bool) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "square" && bool) {
    drawRect(e);
  } else if (selectedTool === "circle" && bool) {
    drawCircle(e);
  } else if (selectedTool === "line" && bool) {
    drawLine(e);
  } else if (selectedTool === "oblique" && bool) {
    drawOblique(e);
  } else if (selectedTool === "eraser" && bool) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = canvasBG;
    ctx.stroke();
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

document.addEventListener(
  "DOMContentLoaded",
  () => (widthBox.style.display = "none")
);

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
sizeAdjust.addEventListener("change", () => (brushWidth = sizeAdjust.value));

menuBtn.addEventListener("click", () => {
  if (widthBox.style.display == "none") {
    widthBox.style.display = "flex";
  } else {
    widthBox.style.display = "none";
  }
});
