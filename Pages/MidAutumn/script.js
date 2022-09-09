const container = document.querySelector(".container");
const screen = container.getBoundingClientRect();
const card = document.querySelector(".card");
document.body.onmousemove = function (event){
    let ox = event.clientX;
    let oy = event.clientY;
    let angle = 30 * (ox - screen.width / 2) / (screen.width / 2);
    card.style.transform = "rotateY(" + angle + "deg)";
}