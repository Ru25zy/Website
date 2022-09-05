const rectContainer = document.querySelector("#rect-container");
const rect = document.querySelector("#rect-example");

const inputNumberWidth = document.querySelector("#rect-width-number");
const inputNumberHeight = document.querySelector("#rect-height-number");
const inputRangeWidth = document.querySelector("#rect-width-range");
const inputRangeHeight = document.querySelector("#rect-height-range");
function setRectSize(element, isWidth) {
    let length = parseInt(element.value);
    if (element.id === "rect-width-range" || element.id === "rect-height-range")
        isWidth ? inputNumberWidth.value = length : inputNumberHeight.value = length;
    else if(element.id === "rect-width-number" || element.id === "rect-height-number"){
        if (length > 300) this.value = 300;
        if (length < 0) this.value = 0;
        length = element.value;
        isWidth ? inputRangeWidth.value = length : inputRangeHeight.value = length;
    }
    isWidth ? rect.style.width = length+"px" : rect.style.height = length+"px";
}

function setRectBackcolor(element){
    rect.style.background = element.value;
}

function setRectRotate(element){
    let angle = parseInt(element.value);
    angle = angle < -360 ? -360 : angle;
    angle = angle > 360 ? 360 : angle;
    let id = element.id.split("-");
    id[2] = id[2] === "number" ? "range" : "number";
    rect.style.transform = id[1] + "(" + angle + "deg)"
    id = id.join("-");
    document.querySelector("#" + id).value = angle;
}