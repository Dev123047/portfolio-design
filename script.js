const terminalContainer = document.getElementById('terminalContainer');
const GUIContainer = document.getElementById('GUIContainer');
const dirStructure = document.getElementById('dirStructure');
const contents = document.getElementById('contents');
const currentLocation = document.getElementById('currentLocation');
const locationContents = document.getElementById('locationContents');
const container = document.getElementById('container');

const GUIContainer_terminalContainer_resizer = document.getElementById('GUIContainer_terminalContainer_resizer');
const dirStructure_contents_resizer = document.getElementById('dirStructure_contents_resizer');
const currentLocation_locationContents_resizer = document.getElementById('currentLocation_locationContents_resizer');


let isResizing_GCtC = false;
let isResizing_dSc = false;
let isResizing_cLlC = false;

GUIContainer_terminalContainer_resizer.addEventListener('mousedown', () => {
    isResizing_GCtC = true;
});

dirStructure_contents_resizer.addEventListener('mousedown', () => {
    isResizing_dSc = true;
});

currentLocation_locationContents_resizer.addEventListener('mousedown', () => {
    isResizing_cLlC = true;
});

document.addEventListener('mousemove', (event) => {
    if (isResizing_GCtC) {
        const newHeight = event.clientY;
        const containerHeight = window.innerHeight;
        const newHeight2 = containerHeight-newHeight-5;
        if (newHeight-5 < containerHeight-200 && newHeight2 < 400) { // Minimum width
            GUIContainer.style.height = `${newHeight-5}px`;
            terminalContainer.style.height = `${newHeight2}px`;
        }
    }
    if (isResizing_dSc) {
        const newWidth = event.clientX;
        const containerWidth = window.innerWidth;
        const newWidth2 = containerWidth-newWidth-5;
        if (newWidth-5 > 50 && newWidth2 > 300) { // Minimum width
            console.log('staisfied');
            dirStructure.style.width = `${newWidth-5}px`;
            contents.style.width = `${newWidth2}px`;
        }
    }
});

document.addEventListener('mouseup', () => {
    isResizing_GCtC = false;
    isResizing_dSc = false;
    isResizing_cLlC = false;
});