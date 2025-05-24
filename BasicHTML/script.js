const colorSelector = document.getElementById("selectColor");

colorSelector.addEventListener("change", changeColor);

function bulbOn() {
  const b = document.getElementById("bulb");
  b.style.backgroundColor = "yellow";
}

function bulbOff() {
  const b = document.getElementById("bulb");
  b.style.backgroundColor = "white";
}

function bulbOnOff() {
  const b = document.getElementById("bulb");
  b.classList.toggle("glow");
}

function changeColor() {
  const b = document.getElementById("bulb2");
  b.style.backgroundColor = colorSelector.value;
}
