window.addEventListener("load", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("resize", function () {
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.putImageData(image, 0, 0);
});

window.addEventListener("resize", getSizes, false);
let out = document.getElementById("zoom");
let zoom =
  Math.ceil(((window.outerWidth - 10) / window.innerWidth) * 100) + "%";
out.textContent = zoom;

function getSizes() {
  zoom = Math.ceil(((window.outerWidth - 10) / window.innerWidth) * 100) + "%";
  out.textContent = zoom;
}

let lock = document.getElementById("lock");

function lockClick() {
  lock.classList.toggle("active");
  if (lock.innerText === "lock_open") {
    lock.innerText = "lock";
    lock.classList.add("active");
  } else {
    lock.innerText = "lock_open";
    lock.classList.remove("active");
  }
}

lock.addEventListener("click", lockClick);

document.body.addEventListener("keydown", (event) => {
  if (event.ctrlKey && "cvxspwuaz+-".indexOf(event.key) !== -1) {
    event.preventDefault();
  }
});

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  widthBox.style.display = "none";
});

menuBtn.addEventListener("click", () => {
  if (widthBox.style.display == "none") {
    widthBox.style.display = "flex";
  } else {
    widthBox.style.display = "none";
  }
});
