const undoBtn = document.querySelector("#undoBtn");
const redoBtn = document.querySelector("#redoBtn");

function undo() {
  if (pathCount > 0) {
    redoHistory.push(drawingHistory.pop());
    pathCount--;
    if (pathCount === 0) {
      clearCan();
    } else {
      ctx.putImageData(drawingHistory[pathCount - 1], 0, 0);
    }
  }
}
function redo() {
  if (redoHistory.length > 0) {
    const redoCaptured = redoHistory.pop();
    drawingHistory.push(redoCaptured);
    pathCount++;
    ctx.putImageData(redoCaptured, 0, 0);
  }
}

undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
