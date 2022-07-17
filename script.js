const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "color";
const DEFUALT_COLOR = "#333333"

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColor = DEFUALT_COLOR;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const sketchPad = document.querySelector(".sketchPad");
const sliderBtn = document.querySelector('#sizeSlider');
const sliderText = document.querySelector('#sizeValue');

sliderBtn.addEventListener('input', resizeGrid)

function createElements(){
    const gridElement = document.createElement('div');

    gridElement.className = 'grid-element';
    gridElement.addEventListener('mousedown', changeColor)
    gridElement.addEventListener('mouseover', changeColor)
    return gridElement;
}

function createSketchPad(size){

    for(let i = 0; i < (size*size); i++){
        sketchPad.appendChild(createElements());
    }
    sketchPad.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}
function clearGrid(){
    sketchPad.innerHTML = ''
}

function resizeGrid(){
    clearGrid();
    currentSize = this.value
    createSketchPad(currentSize);
    sliderText.textContent = `${currentSize} x ${currentSize}`
}

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown) return
    this.style.backgroundColor = "black";
    console.log(sliderBtn.value);
}

function erasorMode(){
    this.style.backgroundColor = "white";
}
window.onload = () => {
    createSketchPad(DEFAULT_SIZE);
    // activateButton(DEFAULT_MODE);
}