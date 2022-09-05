let weekdays = ["日","一","二","三","四","五","六"];

function getSystemTime() {
    const current = new Date();
    const timeArray = [current.getHours(), current.getMinutes(),current.getSeconds(),
        current.getFullYear(), current.getMonth()+1, current.getDate()];
    const elements = ["system-hour", "system-minute", "system-second", "system-year", "system-month", "system-day"];
    for (let i=0; i<timeArray.length;i++){
        const element = document.querySelector("#" + elements[i]);
        element.textContent = timeArray[i] < 10 ? "0" + timeArray[i] : timeArray[i].toString();
    }
    document.querySelector("#system-week").textContent = "星期"+weekdays[current.getDay()];
    const minuteHand = document.querySelector("#minute-hand");
    const minuteAngle = 6 * timeArray[1];
    minuteHand.setAttribute("transform","translate(8,8) rotate(" + minuteAngle + ")")
    const hourHand = document.querySelector("#hour-hand");
    const hourAngle = 30 * timeArray[0];
    hourHand.setAttribute("transform","translate(8,8) rotate(" + hourAngle + ")")
    window.setTimeout(getSystemTime, 1000);
}

document.body.onload = function (){
    getSystemTime();
    getList();
}