

function createElements(){
    const div = document.createElement('div');

    div.className = 'grid-element';
    return div;
}

function createSketchPad(){
    const sketchPad = document.querySelector(".sketchPad");

    for(let i = 0; i <= 16; i++){
        sketchPad.appendChild(createElements());
    }
}

createSketchPad();