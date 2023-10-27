// Function to handle touch/mouse start event
const startDrawing = (e) => {
  e.preventDefault();
  isDrawing = true;
  const touch = e.type === "touchstart" ? e.touches[0] : e;
  prevMouseX = touch.clientX - canvas.getBoundingClientRect().left;
  prevMouseY = touch.clientY - canvas.getBoundingClientRect().top;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  ctx.strokeStyle = colorPicker.value;
  ctx.fillStyle = bgColorpicker.value;
  widthBox.classList.add("disp");
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// Function to handle touch/mouse move event
const drawingMotion = (e) => {
  e.preventDefault();
  if (!isDrawing) return;
  const touch = e.type === "touchmove" ? e.touches[0] : e;
  const x = touch.clientX - canvas.getBoundingClientRect().left;
  const y = touch.clientY - canvas.getBoundingClientRect().top;
  e.offsetX = x;
  e.offsetY = y;
  drawing(e);
};

// Function to handle touch/mouse end event
const endDrawing = () => {
  isDrawing = false;
  drawingHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  pathCount++;
};

// Add touch/mouse event listeners to the canvas
canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", drawingMotion);
canvas.addEventListener("pointerup", endDrawing);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", drawingMotion);
canvas.addEventListener("touchend", endDrawing);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawingMotion);
canvas.addEventListener("mouseup", endDrawing);
