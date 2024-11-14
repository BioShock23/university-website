const textInput = document.getElementById('textInput');
const wordArea = document.getElementById("wordArea");
const outputArea = document.getElementById("outputArea");
const dropZone = document.getElementById("dropZone");

let itemsList = [];
let itemIndexArray = [];

function onButtonClick() {
  const textContent = textInput.value;
  itemsList = analyzeText(textContent);
  initializeIndexArray(itemsList);
  renderItems(itemsList);
}

function initializeIndexArray(items) {
  itemIndexArray = [];
  items.forEach((item, index) => {
    itemIndexArray.push({code: item.id, index: index});
  });
}

const analyzeText = (text) => {
  const items = text
    .split('-')
    .map(item => item.trim())
    .filter(Boolean);
  const categorized = categorizeItems(items);

  return generateItemObjects(categorized);
}

const categorizeItems = (elements) => {
  const categorizedData = {
    lowercase: [],
    uppercase: [],
    numbers: []
  };

  elements.forEach((element) => {
    if (!isNaN(element)) {
      categorizedData.numbers.push(element);
    } else if (element[0] === element[0].toLowerCase()) {
      categorizedData.lowercase.push(element);
    } else {
      categorizedData.uppercase.push(element);
    }
  });

  return {
    lowercase: categorizedData.lowercase.sort(),
    uppercase: categorizedData.uppercase.sort(),
    numbers: categorizedData.numbers.sort((a, b) => Number(a) - Number(b))
  };
}

const generateItemObjects = (data) => {
  let items = [];
  Object.entries(data).forEach(([type, words]) => {
    let prefixType
    if (type === "numbers") {
      prefixType = 'n'
    } else if (type === "uppercase") {
      prefixType = 'b'
    } else {
      prefixType = 'a'
    }
    words.forEach((word, i) => {
      items.push({id: `${prefixType}${i + 1}`, content: word});
    });
  });
  return items;
}

function clearAllAreas() {
  wordArea.innerHTML = '';
  dropZone.innerHTML = '';
  outputArea.innerHTML = '';
}

function renderItems(items) {
  clearAllAreas();

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.id = `item-${item.id}`;
    itemDiv.className = "draggable-item";
    itemDiv.draggable = true;
    itemDiv.textContent = `${item.id} ${item.content}`;
    const color = generateRandomColor();
    itemDiv.style.backgroundColor = color;
    itemDiv.setAttribute('initial-color', color);
    itemDiv.addEventListener("click", (e) => updateOutputArea(e, item));
    itemDiv.addEventListener("dragstart", onDragStart);
    wordArea.appendChild(itemDiv);
  });
}

function updateOutputArea(event, item) {
  if (event.target.parentElement.id === "dropZone")
    outputArea.textContent += ` ${item.content}`;
}

function generateRandomColor() {
  return `hsl(${Math.random() * 360}, 80%, 80%)`;
}

function onDragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text");
  const itemElement = document.getElementById(itemId);

  const targetId = event.target.id;
  const targetParentId = event.target.parentElement.id;

  if (targetId === "dropZone" || targetParentId === "dropZone") {
    moveItemToDropZone(itemElement, event.target, event);
  } else if (targetId === "wordArea" || targetParentId === "wordArea") {
    moveItemBackToContainer(itemElement);
  }
}

function moveItemToDropZone(element, target, event) {
  if (target.className === "draggable-item") {
    target = target.parentElement;
  }

  element.style.position = "absolute";
  const position = getRelativePosition(event, target, element);
  element.style.left = `${position.x}px`;
  element.style.top = `${position.y}px`;
  element.style.backgroundColor = "#cacaca";
  target.appendChild(element);
}

function moveItemBackToContainer(element) {
  element.style.position = "static";
  element.style.backgroundColor = element.getAttribute("initial-color");
  const itemCode = element.textContent.split(" ")[0];
  const currentIndex = findIndexByCode(itemCode);

  for (let existingElement of wordArea.children) {
    const existingCode = existingElement.textContent.split(" ")[0];
    const existingIndex = findIndexByCode(existingCode);

    if (existingIndex > currentIndex) {
      wordArea.insertBefore(element, existingElement);
      return;
    }
  }
  wordArea.appendChild(element);
}

function findIndexByCode(code) {
  for (let item of itemIndexArray) {
    if (item.code === code) {
      return item.index;
    }
  }
  return -1;
}

function getRelativePosition(event, container, element) {
  const rect = container.getBoundingClientRect();
  return {
    x: Math.min(Math.max(0, event.clientX - rect.left), rect.width - element.offsetWidth),
    y: Math.min(Math.max(0, event.clientY - rect.top), rect.height - element.offsetHeight),
  };
}