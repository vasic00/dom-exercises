let sveVoznje = [];

function odobri(button) {
    let parentCell = button.parentNode;
    let sibling1 = parentCell.previousElementSibling;
    let sibling2 = sibling1.previousElementSibling;
    let sibling3 = sibling2.previousElementSibling;
    let sibling4 = sibling3.previousElementSibling;
    let index = 0;
    while (localStorage.key(index) !== null) {
        let voznje = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let flag = false;
        voznje.forEach((voznja) => {
            console.log(voznja.ime == sibling4.innerText);
            console.log(voznja.polaznaTacka == sibling3.innerText);
            console.log(voznja.odrediste == sibling2.innerText);
            console.log(voznja.datum == sibling1.innerText);
            if (voznja.ime == sibling4.innerText && voznja.polaznaTacka == sibling3.innerText && voznja.odrediste == sibling2.innerText && voznja.datum == sibling1.innerText) {
                voznja.status = "ODOBRENA";
                flag = true;
            }
        })
        if (flag) {
            localStorage.setItem(localStorage.key(index), JSON.stringify(voznje));
            fetchData();
            break;
        }
        index++;
    }
}

function odbij(button) {
    let parentCell = button.parentNode;
    let sibling1 = parentCell.previousElementSibling;
    let sibling2 = sibling1.previousElementSibling;
    let sibling3 = sibling2.previousElementSibling;
    let sibling4 = sibling3.previousElementSibling;
    let sibling5 = sibling4.previousElementSibling;
    let index = 0;
    while (localStorage.key(index) !== null) {
        let voznje = JSON.parse(localStorage.getItem(localStorage.key(index)));
        let flag = false;
        voznje.forEach((voznja) => {
            console.log(voznja.ime === sibling4.innerHTML);
            console.log(voznja.polaznaTacka === sibling3.innerHTML);
            console.log(voznja.odrediste === sibling2.innerHTML);
            console.log(voznja.datum === sibling1.innerHTML);
            if (voznja.ime === sibling5.innerHTML && voznja.polaznaTacka === sibling4.innerHTML && voznja.odrediste === sibling3.innerHTML && voznja.datum === sibling2.innerHTML) {
                voznja.status = "ODBIJENA";
                flag = true;
            }
        })
        if (flag) {
            localStorage.setItem(localStorage.key(index), JSON.stringify(voznje));
            fetchData();
            break;
        }
        index++;
    }
}

function fetchData() {
    sveVoznje = [];
    let index = 0;
    while (localStorage.key(index) !== null) {
        let voznje = JSON.parse(localStorage.getItem(localStorage.key(index)));
        sveVoznje = sveVoznje.concat(voznje);
        index++;
    }
    updateTable();
}

function updateTable() {
    let table = document.getElementById("table");
    table.innerHTML = "";
    sveVoznje.forEach((voznja) => {
        let row = table.insertRow(-1);
        let col1 = row.insertCell(-1);
        col1.innerHTML = voznja.ime;
        let col2 = row.insertCell(-1);
        col2.innerHTML = voznja.polaznaTacka;
        let col3 = row.insertCell(-1);
        col3.innerHTML = voznja.odrediste;
        let col4 = row.insertCell(-1);
        col4.innerHTML = voznja.datum;
        if (voznja.status === undefined) {
            let col5 = row.insertCell(-1);
            col5.innerHTML = "<button type='button' onclick='odobri(this)'>Odobri</button>";
            let col6 = row.insertCell(-1);
            col6.innerHTML = "<button type='button' onclick='odbij(this)'>Odbij</button>"
        }
    })
}

function sortByDate() {
    sveVoznje.sort((v1, v2) => new Date(v1.datum).getTime() - new Date(v2.datum).getTime());
    updateTable();
}

function sortByName() {
    sveVoznje.sort((v1, v2) => v1.ime.localeCompare(v2.ime));
    updateTable();
}