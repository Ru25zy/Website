/**
 * Draw setting card tab change.
 * @param element
 */
function tabChange(element) {
    let tabs = ["segmentTab", "cylinderTab", "rotateTab"],
        panels = ["segmentSetting", "cylinderSetting", "rotateSetting"];
    let index = tabs.indexOf(element.id);
    let drawButton = document.querySelector("#drawButton");
    if (index !== -1) {
        drawButton.className = index === 0 || index === 1 ? "btn btn-primary" : "d-none btn btn-primary";
        for (let i = 0; i < tabs.length; i++) {
            let tab = document.querySelector("#" + tabs[i]);
            let panel = document.querySelector("#" + panels[i]);
            if (i === index) {
                tab.className = "nav-link active";
                panel.className = "card-body";
                if (i !== 2) {
                    drawRingRose();
                    rose.checkGap(ringOutsideNumber, ringInsideNumber, false);
                }else if (i === 2){
                    drawRingRose();
                    rose.checkGap(ringOutsideNumber, ringInsideNumber, true);
                }
            } else {
                tab.className = "nav-link";
                panel.className = "d-none card-body";
            }
        }
    }
}

/**
 * Create input element for segment names and angles form.
 * @param parent
 * @param className
 * @param id {string}
 * @param type {string}
 * @param value
 */
function createInput(parent, className, id, type, value) {
    let input = document.createElement("input");
    input.id = id;
    input.className = className;
    input.type = type;
    input.value = value
    parent.append(input)
}

function createSpan(parent, string) {
    let span = document.createElement("span");
    span.className = "input-group-text";
    span.innerHTML = string;
    parent.append(span);
}

/**
 * Create all segment names and angles
 * @param segmentNames {[]}
 * @param segmentAngles {[]}
 */
function createSegmentInfoInput(segmentNames, segmentAngles) {
    let segmentInfo = document.querySelector("#segmentInfo");
    segmentInfo.innerHTML = "";
    for (let i = 0; i < segmentAngles.length; i++) {
        let div = document.createElement("div");
        div.className = "input-group input-group-sm";
        let number = i + 1 < 10 ? "0" + (i + 1) : i + 1;
        createSpan(div, number + ". ");
        createInput(div, "form-control text-center", "segmentName" + i, "text", segmentNames[i]);
        createInput(div, "form-control text-end", "segmentAngle" + i, "number", segmentAngles[i]);
        createSpan(div, "°");
        segmentInfo.append(div);
    }
}

/**
 * Change segment count from input number.
 */
function changeSegmentCount() {
    let count = document.querySelector("#segmentCount").value;
    if (count > 0) {
        let segmentNames = [];
        for (let i = 0; i < count; i++) {
            if (i === 0) {
                segmentNames.push("K");
            } else if (i === 1) {
                segmentNames.push("B1");
            } else if (i === (count - 1)) {
                segmentNames.push("B2")
            } else {
                segmentNames.push("A" + (i - 1));
            }
        }
        let segmentAngles = [];
        for (let i = 0; i < segmentNames.length; i++) {
            //angles.push("");
            segmentAngles.push(360 / count);
        }
        createSegmentInfoInput(segmentNames, segmentAngles);
    }
}

/**
 * Show error prompt.
 * @param error {string} error message.
 */
function errorPrompt(error) {
    const modal = new bootstrap.Modal('#infoModal', {
        keyboard: false
    });
    const modalContent = document.querySelector("#modalBody");
    const modalTitle = document.querySelector("#modalTitle");
    modalTitle.innerHTML = "报错提示：";
    modalContent.innerHTML = error;
    modal.show();
}

let mainCanvas = document.querySelector("#canvas");
let rose = new RingRoseDrawer(mainCanvas);
let ringInsideNumber = 0, ringOutsideNumber = 0, drawSameGap = true;

/**
 * Get ring information from input form.
 */
function getDrawInformation() {
    // SEGMENT
    let segmentCount = parseInt(document.querySelector("#segmentCount").value);
    let segmentInfo = document.querySelector("#segmentInfo");
    if (segmentCount < 1) {
        errorPrompt("请检查管片数量输入框！");
    } else {
        if (segmentCount !== segmentInfo.children.length) {
            errorPrompt("请按下管片数量变更设置按钮，并重新填写名称和角度！");
            return;
        }
        let segmentNames = [], segmentAngles = [];
        for (let i = 0; i < segmentCount; i++) {
            let temp = document.querySelector("#segmentName" + i).value;
            if (temp === "") {
                errorPrompt("未查询到 {管片 - " + (i + 1) + "} 的命名！请检查输入的信息！");
                return;
            }
            segmentNames.push(temp);
            temp = document.querySelector("#segmentAngle" + i).value;
            if (temp === "") {
                errorPrompt("输入的管片角度为空 ！");
                return;
            }
            temp = parseFloat(temp);
            if (temp < 0) {
                errorPrompt("输入的管片角度应大于等于 0 ！");
                return;
            }
            segmentAngles.push(temp);
        }
        rose.segmentNames = segmentNames;
        rose.segmentAngles = segmentAngles;
    }
    // CYLINDER
    let cylinderCount = document.querySelector("#cylinderCount").value;
    if (cylinderCount === "") {
        errorPrompt("输入的油缸数量为空！");
        return;
    }else if (parseInt(cylinderCount) < 2) {
        errorPrompt("输入的油缸数量应大于等于 2 ！");
        return;
    }else {
        rose.cylinder.count = parseInt(cylinderCount);
    }
    let cylinderAngle = document.querySelector("#cylinderAngleStart").value;
    if (cylinderAngle === "") {
        errorPrompt("油缸起始角度输入为空！！");
        return;
    } else {
        rose.cylinder.firstAngle = parseFloat(cylinderAngle);
    }
    let cylinderStart = document.querySelector("#cylinderNumberStart").value;
    if (cylinderStart === "") {
        errorPrompt("油缸起始编号输入为空！");
        return;
    } else {
        rose.cylinder.start = parseInt(cylinderStart);
    }
    let cylinderStep = document.querySelector("#cylinderNumberStep").value;
    if (cylinderStep === "") {
        errorPrompt("增加步长输入为空！！");
        return;
    } else {
        rose.cylinder.step = parseInt(cylinderStep);
    }
    rose.cylinder.word = document.querySelector("#cylinderWord").value;
}

function setCanvasSize() {
    let screen = document.body.getBoundingClientRect();
    let canvasContainer = document.querySelector("#canvasContainer").getBoundingClientRect();

    let side = canvasContainer.width;
    mainCanvas.width = side;
    side > screen.height ? mainCanvas.height = screen.height : mainCanvas.height = side;
}

function drawRingRose() {
    rose.context.clearRect(0, 0, rose.canvas.width, rose.canvas.height);
    rose.location.x = mainCanvas.width / 2;
    rose.location.y = mainCanvas.height / 2;
    rose.drawRing(ringInsideNumber, true);
    rose.drawRing(ringOutsideNumber, false);
    rose.drawCylinders(true);
}

function sameGapAngleButton(){
    let sameAngle = document.querySelector("#sameGapAngle").value;
    if (sameAngle === ""){
        errorPrompt("角度输入为空！");
    }else {
        sameAngle = parseFloat(sameAngle);
        if (sameAngle <= 0){
            errorPrompt("应输入大于零的角度。")
        }else {
            rose.sameGapAngle = sameAngle;
            drawRingRose();
            rose.checkGap(ringOutsideNumber, ringInsideNumber, drawSameGap);
        }
    }
}

function rotateRing(isIn, isClockwise) {
    let cylinderNumber = isIn ? ringInsideNumber : ringOutsideNumber;
    if (isClockwise)
        cylinderNumber = cylinderNumber + 1 > rose.cylinder.count - 1 ? 0 : cylinderNumber + 1;
    else
        cylinderNumber = cylinderNumber - 1 < 0 ? rose.cylinder.count - 1 : cylinderNumber - 1;
    isIn ? ringInsideNumber = cylinderNumber : ringOutsideNumber = cylinderNumber;
    document.querySelector("#ringInCylinder").innerHTML = rose.cylinder.word + (ringInsideNumber + 1);
    document.querySelector("#ringOutCylinder").innerHTML = rose.cylinder.word + (ringOutsideNumber + 1);
    drawRingRose();
    document.querySelector("#gapCheck");
    rose.checkGap(ringOutsideNumber, ringInsideNumber, drawSameGap);
}

function createGapTable() {
    let table = document.querySelector("#gapTable");
    table.innerHTML = "";
    for (let i = 0; i < rose.cylinder.count; i++) {
        let tr = document.createElement("tr");
        table.append(tr);
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerText = rose.cylinder.word + (i + 1) + ":";
        tr.append(th);
        for (let j = 0; j < rose.cylinder.count; j++) {
            if (!rose.checkGap(i, j, false)) {
                let td = document.createElement("td");
                td.innerText = rose.cylinder.word + (j + 1);
                tr.append(td);
            }
        }
    }
}

function showSameGap(element) {
    drawSameGap = !!element.checked;
    drawRingRose();
    rose.checkGap(ringOutsideNumber, ringInsideNumber, drawSameGap);
}

/**
 * Draw button click event.
 */
function drawButtonClick(){
    ringInsideNumber = ringOutsideNumber = 0;
    getDrawInformation();
    drawRingRose();
    createGapTable();
}

function init() {

    const modal = new bootstrap.Modal('#welcomeModal', {
        keyboard: false
    });
    modal.show();

    document.querySelector("#segmentCount").value = 10;
    document.querySelector("#cylinderCount").value = 28;
    document.querySelector("#cylinderWord").value = "U";
    document.querySelector("#cylinderNumberStart").value = 1;
    document.querySelector("#cylinderNumberStep").value = 1;
    document.querySelector("#cylinderAngleStart").value = 0;

    let segmentNames = ["K", "B1", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "B2"];
    let segmentAngles = [12.857142, 38.571428, 38.571428, 38.571428,
        38.571428, 38.571428, 38.571428, 38.571428, 38.571428, 38.571428];

    createSegmentInfoInput(segmentNames, segmentAngles);
    setCanvasSize();
    drawRingRose();

    let size = document.querySelector("#segmentSetting").getBoundingClientRect();
    let table = document.querySelector("#tableContainer");
    table.setAttribute("style", "height:" + size.height + "px");
    createGapTable();
}

document.body.onload = init;
document.body.onresize = function () {
    setCanvasSize();
    drawRingRose();
};