"use strict";

let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", event => {
    this.loadData();
});
let result = document.createElement("div");
searchBtn.after(result);

function loadData() {
    let input = document.getElementById("input").value;

    fetch(`https://swapi.dev/api/people?search=${input}`)
    .then((response) => {
        if (!response.ok) throw new Error("Fetch request failed!");
        return response.json();
    })
    .then((data) => {
        result.innerHTML = `<p>I personaggi che contengono ${input} nel nome sono ${data.count}</p>`;
        for (let p of data.results) {
            if (p.species.length == 0) {
                let pData = document.createElement('p');
                pData.innerHTML = `Nome :${p.name}, Razza: Non specificata`;
                result.after(pData);
            } else {
                fetch(p.species[0])
                .then((response) => {
                    if (!response.ok) throw new Error("Fetch request of species name failed!");
                    return response.json();
                })
                .then((data) => {
                    let pData = document.createElement("p");
                    pData.innerHTML = `Nome :${p.name}, Razza: ${data.name}`;
                    result.after(pData);
                });
            }
        }
    });
}

/*
Creare una fetch che mostri:
1. Nome e modello di tutte le navi di Star Wars raggruppate per manufacturer
2. Tutti i pianeti, con nome e qualcos'altro, che sono apparsi in almeno due film, con il titolo
    dei film in cui sono apparsi e nome e razza dei residenti di quel pianeta
    2a. Tutti i personaggi per cui quel pianeta è designato come "homeworld" (nome, razza)
*/