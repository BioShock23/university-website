const svg = document.getElementById('matrix');
const width = svg.clientWidth;
const numColumns = 50;
const textOptions = "01$";

const createMatrixText = (x, delay) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", -100);
    text.classList.add("matrix-text");
    text.style.animationDuration = `${Math.random() * 2 + 2}s`;
    text.style.animationDelay = `${delay}s`;
    text.textContent = textOptions[Math.floor(Math.random() * textOptions.length)];
    svg.appendChild(text);
};

for (let i = 0; i < numColumns; i++) {
    const x = (i * width) / numColumns;
    const delay = Math.random() * 2;
    createMatrixText(x, delay);
}