/**
 * Create home page's page list.
 */
function getList(){
    const content = document.querySelector("#content-list");
    for (let i=0;i<items.length;i++) {
        const a = document.createElement("a");
        a.className = "list-group-item list-group-item-action";
        a.href = items[i].href;
        content.append(a);

        let div = document.createElement("div");
        div.className = "d-flex w-100 justify-content-between";
        a.append(div);


        const h5 = document.createElement("h5");
        h5.textContent = items[i].title;
        div.append(h5);


        let small = document.createElement("small");
        small.textContent = items[i].time;
        div.append(small);

        const p = document.createElement("p");
        p.textContent = items[i].describe;
        a.append(p);

        small = document.createElement("small");
        small.style.float = "right";
        small.textContent = items[i].category;
        a.append(small);
    }
}

document.body.onload = function (){
    getSystemTime();
    getList();
}