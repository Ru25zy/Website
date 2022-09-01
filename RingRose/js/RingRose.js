/***
 * 角度转弧度。
 * @param deg {number} 输入角度。
 * @returns {number} 输出弧度。
 * @constructor
 */
function Rad(deg) {
    return deg * Math.PI / 180;
}

class RingRoseDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.location = {x: canvas.width / 2, y: canvas.height / 2};
        this.ringWidth = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        this.insideRadius = canvas.width < canvas.height ? canvas.width * 0.7 : canvas.height * 0.7;
        this.lineColor = "black";
        this.lineWidth = this.insideRadius > 150 ? 2 : 1;
        this.segmentColor1 = "#FFFF00";
        this.segmentColor2 = "#FF0000";

        this.segmentAngles = [12.857142, 38.571428, 38.571428, 38.571428,
            38.571428, 38.571428, 38.571428, 38.571428, 38.571428, 38.571428];
        this.segmentNames = ["K", "B1", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "B2"];
        this.cylinder = {count: 28, word: "U", start: 1, step: 1, firstAngle: 0};
        this.sameGapAngle = 2;
    }

    setNameFont(fontWeight, fontSize, fontFamily, color) {
        this.context.font = fontWeight + " " + fontSize + "px " + fontFamily;
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.strokeStyle = color;
        this.context.fillStyle = color
    }

    draw(color, fill) {
        this.context.lineWidth = this.lineWidth;
        this.context.strokeStyle = color;
        this.context.fillStyle = color
        fill ? this.context.fill() : this.context.stroke();
    }

    drawSegment(radius, crossAngle, color, fill) {
        crossAngle = Rad(crossAngle);
        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, crossAngle, false);
        this.context.arc(0, 0, radius + this.ringWidth, crossAngle, 0, true);
        this.draw(color, fill);
    }

    drawRingBackground(radius) {
        this.context.save();
        let angle = 0, colorNumber = 0, colorArray = [this.segmentColor1, this.segmentColor2];
        for (let i = 0; i < this.segmentAngles.length; i++) {
            this.context.rotate(Rad(angle));
            colorNumber = colorNumber === 0 ? 1 : 0;
            colorNumber = this.segmentAngles.length % 2 === 0 ? colorNumber : 1;
            this.drawSegment(radius, this.segmentAngles[i], colorArray[colorNumber], true);
            angle = this.segmentAngles[i];
        }
        this.context.restore();
    }

    drawRingLine(radius) {
        this.context.save();
        let angle = 0;
        for (let i = 0; i < this.segmentAngles.length; i++) {
            this.context.rotate(Rad(angle));
            this.drawSegment(radius, this.segmentAngles[i], this.lineColor, false);
            angle = this.segmentAngles[i];
        }
        this.context.restore();
    }

    drawSegmentNames(radius) {
        let angle = this.segmentAngles[0] / 2 + 90;
        this.setNameFont("bolder", 15, "Arial", "black");
        this.context.save();
        for (let i = 0; i < this.segmentNames.length; i++) {
            if (i !== 0) {
                angle += this.segmentAngles[i] / 2;
            }
            this.context.rotate(Rad(angle));
            this.context.fillText(this.segmentNames[i], 0, -(radius + this.ringWidth / 2));
            angle = this.segmentAngles[i] / 2;
        }
        this.context.restore();

    }

    drawRing(cylinderNumber, isRingIn) {
        let radius = this.insideRadius;
        if (!isRingIn) radius = this.insideRadius + this.ringWidth * 1.1;
        let angle = (360 / this.cylinder.count) * cylinderNumber + this.cylinder.firstAngle;
        this.context.save();
        this.context.translate(this.location.x, this.location.y);
        this.context.rotate(-(Math.PI / 2 + Rad(this.segmentAngles[0] / 2)) + Rad(angle));
        this.drawRingBackground(radius);
        this.drawRingLine(radius);
        this.drawSegmentNames(radius);
        this.context.restore();
    }

    drawCylinders(isDrawNames) {
        // cylinder
        this.context.save();
        this.context.translate(this.location.x, this.location.y);
        let radius = this.insideRadius + this.ringWidth * 2.6;
        this.context.beginPath();
        this.context.arc(0, 0, radius, 0, 2 * Math.PI);
        this.draw(this.lineColor, false);

        for (let i = 0; i < this.cylinder.count; i++) {
            this.context.rotate(Rad(360 / this.cylinder.count));
            this.context.beginPath();
            this.context.arc(0, -radius, 3, 0, 2 * Math.PI);
            this.draw("red", true);
            this.draw(this.lineColor, false);
        }

        // cylinder names
        if (!isDrawNames) return;
        radius = this.insideRadius + this.ringWidth * 2.6;
        for (let i = 0; i < this.cylinder.count; i++) {
            this.context.beginPath();
            this.setNameFont("bolder", this.ringWidth / 3, "Arial", this.lineColor);
            let number = this.cylinder.start + this.cylinder.step * i;
            this.context.fillText(this.cylinder.word + number, 0, -radius - this.ringWidth / 2);
            this.context.rotate(Rad(360 / this.cylinder.count));
        }
        this.context.restore();
    }

    getInitialGapPosition(){
        let gap = [];
        for (let i=0;i<this.segmentAngles.length;i++){
            if (i === 0){
                gap.push(this.segmentAngles[i] / 2);
            }
            else{
                let angle = gap[i-1] + this.segmentAngles[i];
                gap.push(angle);
            }
        }
        return gap;
    }

    getGapPosition(angle){
        let gap = this.getInitialGapPosition();
        for (let i=0;i<gap.length;i++){
            gap[i] = gap[i] + angle < 360 ? gap[i] + angle : gap[i] + angle - 360;
        }
        return gap;
    }

    checkAngleInArray(angle, angleArray){
        for (let i = 0;i<angleArray.length;i++){
            if (Math.abs(angle - angleArray[i]) < this.sameGapAngle){
                return true;
            }
        }
        return false;
    }

    checkGap(ringOut, ringIn, isDraw) {
        let sameGapAngle = false;
        let cylinderAngle = 360 / this.cylinder.count;
        let outArray = this.getGapPosition(ringOut * cylinderAngle);
        let inArray = this.getGapPosition(ringIn * cylinderAngle);
        for (let i = 0;i< outArray.length; i++){
            let check = this.checkAngleInArray(outArray[i], inArray);
            if (check){
                sameGapAngle = true;
                if (isDraw) {
                    this.context.save();
                    this.context.translate(this.location.x, this.location.y);
                    this.context.rotate(Rad(outArray[i] - 90 - this.sameGapAngle / 2));
                    this.drawSegment(this.insideRadius * 0.7, this.sameGapAngle, "#06266F", true);
                    this.drawSegment(this.insideRadius * 1.15, this.sameGapAngle, "#1240AB", true);
                    this.drawSegment(this.insideRadius * 1.6, this.sameGapAngle, "#6C8CD5", true);
                    this.context.restore();
                }
            }
        }
        return sameGapAngle;
    }
}