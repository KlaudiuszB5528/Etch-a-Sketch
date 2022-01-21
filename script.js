const container = document.getElementById("display");
const input = document.getElementById("sizeChange");
const erase = document.getElementById("erase");
const clear = document.getElementById("clear");
const sticky = document.getElementById("sticky");
const random = document.getElementById("random");
const black = document.getElementById("black");
const shading = document.getElementById("shading");
const adjustMessage = document.getElementById("adjust-message");
let acitveFunc;
let value = input.value;
let size = value * value;

const randomColor = (e) => {
  let color = [];
  for (let j = 0; j < 3; j++) {
    color.push(Math.floor(Math.random() * 256));
  }
  e.target.style.backgroundColor = "rgb(" + color.join(",") + ")";
};

acitveFunc = randomColor;

black.addEventListener("click", (e) => {
  addEvent(blackHandle);
  acitveFunc = blackHandle;
});

random.addEventListener("click", (e) => {
  addEvent(randomColor);
  acitveFunc = randomColor;
});

clear.addEventListener("click", (e) => {
  acitveFunc = randomColor;
  generateGrid();
});

sticky.addEventListener("click", (e) => {
  addEvent(randomColor, true);
  acitveFunc = handleSticky;
});

erase.addEventListener("click", (e) => {
  addEvent(eraseHandle);
  acitveFunc = eraseHandle;
});

shading.addEventListener("click", (e) => {
  addEvent(shadingHandle);
  acitveFunc = shadingHandle;
});

const generateGrid = () => {
  let div = document.querySelectorAll(".tile");
  div.forEach((tile) => {
    container.removeChild(tile);
  });
  value = input.value;
  size = value * value;
  adjustMessage.textContent = `${value} x ${value}`;
  for (let i = 0; i < size; i++) {
    let div = document.createElement("div");
    div.classList.add("tile");
    div.addEventListener("mouseover", acitveFunc);
    container.appendChild(div);
    container.style.gridTemplateColumns = `repeat(${value},1fr)`;
    container.style.gridTemplateColumns = `repeat(${value},1fr)`;
  }
};

generateGrid();

input.addEventListener("input", generateGrid);

const addEvent = (func, isOnce) => {
  let div = document.querySelectorAll(".tile");
  div.forEach((tile) => {
    tile.removeEventListener("mouseover", acitveFunc);
    tile.addEventListener("mouseover", func, { once: isOnce });
  });
};

const handleSticky = () => {
  return addEvent(randomColor, true);
};

const shadingHandle = (e) => {
  e.target.style.backgroundColor = "black";
  e.target.style.opacity = +e.target.style.opacity + 0.1;
};

const eraseHandle = (e) => {
  e.target.style.backgroundColor = "transparent";
};

const blackHandle = (e) => {
  e.target.style.backgroundColor = "black";
};
