const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'colour';
const DEFUALT_COLOR = '#333333'

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColor = DEFUALT_COLOR;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const sketchPad = document.querySelector('.sketchPad');
const colourBtn = document.querySelector('#colourBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const sliderBtn = document.querySelector('#sizeSlider');
const sliderText = document.querySelector('#sizeValue');
const modes = document.querySelectorAll('.mode');
modes.forEach(mode => mode.addEventListener('click', activeMode))

sliderBtn.addEventListener('input', resizeGrid)
clearBtn.addEventListener('click', clearGrid)


function createElements(){
    const gridElement = document.createElement('div');

    gridElement.className = 'grid-element';
    gridElement.addEventListener('mousedown', changeColour)
    gridElement.addEventListener('mouseover', changeColour)
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
    createSketchPad(currentSize)
}

function resizeGrid(){
    currentSize = this.value
    clearGrid();
    sliderText.textContent = `${currentSize} x ${currentSize}`
}

function changeColour(e){
    if (e.type === 'mouseover' && !mouseDown) return
    console.log(currentMode);
    if(currentMode === 'eraser'){
        this.style.backgroundColor = 'white';
    }
    else if (currentMode === 'colour'){
        this.style.backgroundColor = currentColor;
    }
    getColour();
}

function getColour(){
    const colourPicker = document.querySelector('#colourPicker');
    currentColor = colourPicker.value;
}
// function eraserMode(){
//     this.style.backgroundColor = 'white';
// }

function activeMode(newMode){ 
    if(typeof newMode != 'string' ){
        newMode = this.value;
    }
    
    if (currentMode === 'colour'){
    colourBtn.classList.remove('active');
    }
    else if(currentMode === 'rainbow'){
    rainbowBtn.classList.remove('active');
    }
    else if(currentMode === 'eraser'){
    eraserBtn.classList.remove('active');
    }

    if (newMode === 'colour'){
    colourBtn.classList.add('active');
    }
    else if(newMode === 'rainbow'){
    rainbowBtn.classList.add('active');
    }
    else if(newMode === 'eraser'){
    eraserBtn.classList.add('active');
    }

    currentMode = newMode;
}
window.onload = () => {
    createSketchPad(DEFAULT_SIZE);
    activeMode(DEFAULT_MODE);
}