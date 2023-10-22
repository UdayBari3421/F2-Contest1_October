const picker = document.getElementById("color-pick"),
  colorPicker = document.getElementById("color-picker"),
  fillColor = document.getElementById("fillColor"),
  BGL = document.getElementById("BGLable"),
  chooseTheme = document.getElementById("chooseTheme"),
  themeColor = document.getElementById("themeColor"),
  bgColorpicker = document.getElementById("bgColorpicker"),
  clearCanvas = document.getElementById("clearBtn"),
  saveBtn = document.getElementById("saveBtn");

function clearCan() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

picker.addEventListener("click", () => {
  colorPicker.classList.toggle("disp");
});

colorPicker.addEventListener("change", () => {
  drawingColor = colorPicker.value;
  picker.style.background = colorPicker.value;
});

BGL.addEventListener("click", () => {
  bgColorpicker.classList.toggle("disp");
});

bgColorpicker.addEventListener("change", () => {
  bgColor = bgColorpicker.value;
  BGL.style.background = bgColorpicker.value;
});

chooseTheme.addEventListener("click", () => {
  themeColor.classList.toggle("disp");
});

themeColor.addEventListener("change", () => {
  canvasBG = themeColor.value;
  canvas.style.background = themeColor.value;
  clearCan();
});

clearCanvas.addEventListener("click", clearCan);

saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
});
