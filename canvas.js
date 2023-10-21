let isPencilActive = false;

let pencil = document.getElementById("pencil");

const picker = document.getElementById("color-pick");
const colorPicker = document.getElementById("color-picker");

picker.addEventListener("click", () => {
  colorPicker.classList.toggle("disp");
});

colorPicker.addEventListener("change", () => {
  drawingColor = colorPicker.value;
  picker.style.background = colorPicker.value;
});

function pencilClick(e) {
  pencil.classList.toggle("active");
  isPencilActive = !isPencilActive;
  if (isPencilActive) {
    canvas.addEventListener("mousedown", startDrawing);
    canvas.style.cursor = "crosshair";
  } else {
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.style.cursor = "auto";
  }
}
pencil.addEventListener("click", pencilClick);
