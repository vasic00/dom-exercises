let sveVoznje = [];

function odobri(button) {
    let row = button.parentElement.parentElement;
    let indexOne = row.getAttribute("indexOne");
    let indexTwo = row.getAttribute("indexTwo");
    sveVoznje[indexOne].voznje[indexTwo].status = "ODOBRENA";
    localStorage.setItem("voznje", JSON.stringify(sveVoznje));
    updateTable();
}

function obrisi(button) {
    let row = button.parentElement.parentElement;
    let indexOne = row.getAttribute("indexOne");
    let indexTwo = row.getAttribute("indexTwo");
    sveVoznje[indexOne].voznje.splice(indexTwo, 1);
    localStorage.setItem("voznje", JSON.stringify(sveVoznje));
    updateTable();
}

function izlistajVoznje() {
    if (localStorage.getItem("voznje") !== null) {
        sveVoznje = JSON.parse(localStorage.getItem("voznje"));
        updateTable();
    }

}

function updateTable() {
    let table = document.getElementById("tb");
    table.innerHTML = "";
    sveVoznje.forEach((entry, indexOne) => {
        entry.voznje.forEach((voznja, indexTwo) => {
            let row = table.insertRow(-1);
            row.setAttribute("indexOne", indexOne);
            row.setAttribute("indexTwo", indexTwo);
            let col1 = row.insertCell(-1);
            col1.innerHTML = entry.ime;
            let col2 = row.insertCell(-1);
            col2.innerHTML = voznja.polaznaTacka;
            let col3 = row.insertCell(-1);
            col3.innerHTML = voznja.odrediste;
            let col4 = row.insertCell(-1);
            col4.innerHTML = voznja.datum;
            let col5 = row.insertCell(-1);
            col5.innerHTML = voznja.status;
            let col6 = row.insertCell(-1);
            col6.innerHTML = "<button type='button' onclick='obrisi(this)'>Obrisi</button>"
            console.log(voznja.status);
            if (voznja.status === "NEODOBRENA") {
                console.log("INSIDE");
                let col7 = row.insertCell(-1);
                col7.innerHTML = "<button type='button' onclick='odobri(this)'>Odobri</button>"
            }

        })
    })
}