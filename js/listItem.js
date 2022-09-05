const items = [
    {
        href: "Pages/RingRose/index.html",
        title: "Ring Rose",
        time: "2022.08.31",
        describe: "简单的 Ring Rose 助手。"
    }
];

function getList(){
    const content = document.querySelector("#content-list");
    for (let i=0;i<items.length;i++) {
        const a = document.createElement("a");
        a.className = "list-group-item list-group-item-action";
        a.href = items[i].href;
        content.append(a);

        const div = document.createElement("div");
        div.className = "d-flex w-100 justify-content-between";
        a.append(div);


        const h5 = document.createElement("h5");
        h5.textContent = items[i].title;
        div.append(h5);


        const small = document.createElement("small");
        small.textContent = items[i].time;
        div.append(small);

        const p = document.createElement("p");
        p.textContent = items[i].describe;
        a.append(p);
    }
}