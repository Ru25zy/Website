let timeIs = document.querySelector("#Beijing_z43d");
let children = timeIs.children;

let timeString = document.querySelector("#timeString");
let dateString = document.querySelector("#dateString");
let sunRise = document.querySelector("#sunRise");
let sunDown = document.querySelector("#sunDown");

let weekdays = {
    Monday: "一",
    Tuesday: "二",
    Wednesday: "三",
    Thursday: "四",
    Friday: "五",
    Saturday: "六",
    Sunday: "日",
}

function getTime() {
    if (children.length > 0){
        timeString.innerHTML = children[0].textContent;
        let array = children[2].textContent.split(" ");
        let year = array[1].split("/");
        year = year[2] + "-" +year[1] + "-" +year[0];
        dateString.innerHTML = year + " " + weekdays[array[0]];
        array = children[4].textContent.split("Day");
        let sunTemp = array[0].split(" ");
        sunRise.innerHTML = sunTemp[1];
        sunDown.innerHTML = sunTemp[3];
        console.log(children[4].textContent);
    }
    window.setTimeout(getTime, 1000);
}
getTime();
