function createElements(){
    const div = document.createElement('div');

    div.className = 'grid-element';
    return div;
}

function createSketchPad(){
    const sketchPad = document.querySelector(".sketchPad");

    for(let i = 0; i < 16; i++){
        sketchPad.appendChild(createElements());
    }
}

function changeColor(){
    this.style.backgroundColor = "black";
}

function erasorMode(){
    this.style.backgroundColor = "white";
}
createSketchPad();
const gridElements = document.querySelectorAll('.grid-element');
gridElements.forEach(gridElement => gridElement.addEventListener('click', changeColor));
