const rectContainer = document.querySelector("#rect-container");
const rect = document.querySelector("#rect-example");

const inputNumber = document.querySelector("#rect-input-number");
const inputRange = document.querySelector("#rect-input-range");


const inputName = document.querySelector("#rect-input-name");
const inputUnit = document.querySelector("#rect-input-unit");

let rectInfo = {
    width : 200,
    height : 200,
    rotateX : 0, rotateY : 0, rotateZ : 0,
    translateX : 0, translateY : 0, translateZ : 0,
    openPerspective : false,
    perspective : 300, xAxis : 50, yAxis : 50
}

const inputPerspective = document.querySelector("#setting > div:nth-child(6)");
const inputPerspectiveOrigin = document.querySelector("#setting > div:nth-child(7)");

function setRectInfo(){
    rect.style.width = rectInfo.width + "px";
    rect.style.height = rectInfo.height + "px";
    rect.style.transform = "translateX("+rectInfo.translateX + "px) " +
        "translateY(" + rectInfo.translateY + "px) " +
        "translateZ(" + rectInfo.translateZ + "px)"  +
        "rotateX(" + rectInfo.rotateX + "deg) " +
        "rotateY(" + rectInfo.rotateY + "deg) " +
        "rotateZ(" + rectInfo.rotateZ + "deg)";
    if (rectInfo.openPerspective) {
        rectContainer.style.perspective = rectInfo.perspective + "px";
        rectContainer.style.perspectiveOrigin = rectInfo.xAxis + "% " + rectInfo.yAxis + "%";
    }else {
        rectContainer.style.perspective = "none";
    }
}

const radioWidth = document.querySelector("#rect-width");
const radioPerspective = document.querySelector("#rect-perspective");
function openSettingPerspective(element){
    if (element.checked){
        rectInfo.openPerspective = true;
        inputPerspectiveOrigin.className = "row";
        inputPerspective.className = "row";
        radioPerspective.checked = true;
        inputSelect(radioPerspective);
    }else{
        rectInfo.openPerspective = false;
        inputPerspectiveOrigin.className = "row d-none";
        inputPerspective.className = "row d-none";
        radioWidth.checked = true;
        inputSelect(radioWidth);
    }
    setRectInfo();
}

function getSettingName(number){
    let string = inputName.textContent;
    rectInfo[string] = number;
    setRectInfo();
}


function inputSelect(element) {
    let id = element.id.split("-");
    inputName.textContent = id[1];
    if (id[1] === "width" || id[1] === "height" || id[1].substring(0, id[1].length - 1) === "translate") {
        inputUnit.textContent = "px";
        inputRange.min = inputNumber.min = -300;
        inputRange.max = inputNumber.max = 300;
    } else if (id[1].substring(0, id[1].length - 1) === "rotate") {
        inputUnit.textContent = "deg"
        inputRange.min = inputNumber.min = -360;
        inputRange.max = inputNumber.max = 360;
    } else if (id[1].substring(1, id[1].length) === "Axis") {
        inputUnit.textContent = "%"
        inputRange.min = inputNumber.min = 0;
        inputRange.max = inputNumber.max = 100;
    }else if(id[1] === "perspective" ){
        inputUnit.textContent = "px"
        inputRange.min = inputNumber.min = 0;
        inputRange.max = inputNumber.max = 1000;
    }
    inputNumber.value = inputRange.value = rectInfo[id[1]];
}

function inputRangeChange(element) {
    let number = element.value
    inputNumber.value = number;
    getSettingName(parseInt(number));
}

function inputNumberChange(element) {
    let number = parseInt(element.value);
    if (number > element.max) {
        element.value = element.max;
    } else if (number < element.min) {
        element.value = element.min;
    }
    inputRange.value = number;
    getSettingName(number);
}

document.body.onload = function (){
    createNavbar();
}