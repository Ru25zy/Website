/* Time show card on right side. */
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

function createNavbar(){
    const nav = document.querySelector("nav");
    nav.textContent = "";
    nav.className = "navbar navbar-dark bg-primary mb-3";
    let div = document.createElement("div");
    div.className = "container-fluid";
    nav.append(div);

    let span = document.createElement("span");
    span.className = "navbar-brand fw-bolder";
    span.style.fontSize = "2em";
    div.append(span);

    let img = document.createElement("img");
    img.src = "../../svg/navigation.svg";
    img.width = 32;
    img.height = 30;
    span.append(img);

    let title= document.createTextNode("我的个人博客");
    span.append(title);

    let divLink = document.createElement("div");
    div.append(divLink);

    let a = document.createElement("a");
    a.className = "nav-link text-white";
    a.href = "../../index.html";
    a.textContent = "返回首页"
    divLink.append(a);
}