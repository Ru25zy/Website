// Get full screen size.
let container = document.querySelector("#canvasContainer");
let fullSize = container.getBoundingClientRect();
function setCanvasSize(canvas){
    canvas.width = fullSize.width;
    canvas.height = fullSize.height;
}

let canvasMap = document.querySelector("#map");
setCanvasSize(canvasMap);
let canvasTower = document.querySelector("#tower");
setCanvasSize(canvasTower);
let canvasEnemy = document.querySelector("#enemy");
setCanvasSize(canvasEnemy);

let context = canvasMap.getContext("2d");
context.arc(canvasMap.width / 2, canvasMap.height / 2, 100, 0, 2*Math.PI);
context.fill();