const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'color';
const DEFUALT_COLOR = '#000000'

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;
let currentColor = DEFUALT_COLOR;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const sketchPad = document.querySelector('.sketchPad');
const colorBtn = document.querySelector('#colorBtn');
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
    gridElement.addEventListener('mousedown', changecolor)
    gridElement.addEventListener('mouseover', changecolor)
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

function changecolor(e){
    if (e.type === 'mouseover' && !mouseDown) return
    
    if(currentMode === 'eraser'){
        eraserMode();
    }
    else if (currentMode === 'color'){
        colorMode();
    }
    else if (currentMode === 'rainbow'){
        rainbowMode();
    }
    this.style.backgroundColor = currentColor;
}

function colorMode(){
    const colorPicker = document.querySelector('#colorPicker');
    currentColor = colorPicker.value;
}
function eraserMode(){
    currentColor = '#FFFFFF';
}

function rainbowMode(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    currentColor = `#${randomColor}`; 
}

function activeMode(newMode){ 
    if(typeof newMode != 'string' ){
        newMode = this.value;
    }
    
    if (currentMode === 'color'){
    colorBtn.classList.remove('active');
    }
    else if(currentMode === 'rainbow'){
    rainbowBtn.classList.remove('active');
    }
    else if(currentMode === 'eraser'){
    eraserBtn.classList.remove('active');
    }

    if (newMode === 'color'){
    colorBtn.classList.add('active');
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