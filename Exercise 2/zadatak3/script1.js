function submitForm() {
    let imeVal = document.forms["form1"]["ime"].value;
    if (localStorage.getItem(imeVal) === null) {
        localStorage.setItem(imeVal, JSON.stringify([]));
    }
    let voznje = JSON.parse(localStorage.getItem(imeVal));
    voznje.push({
        ime: imeVal, polaznaTacka: document.forms["form1"]["polaznaTacka"].value,
        odrediste: document.forms["form1"]["odrediste"].value, datum: document.forms["form1"]["datum"].value
    });
    localStorage.setItem(imeVal, JSON.stringify(voznje));
    loadList();
    resetForm();
}


function loadList() {
    let imeVal = document.forms["form1"]["ime"].value;
    let list = document.getElementById("list");
    list.innerHTML = "";
    if (localStorage.getItem(imeVal) !== null) {
        let voznje = JSON.parse(localStorage.getItem(imeVal));
        voznje.forEach((voznja) => {
            let status = "";
            if (voznja.status !== undefined)
                status = ", status: " + voznja.status;
            list.innerHTML += "<li> Ime: " + voznja.ime + ", polazna tacka: " + voznja.polaznaTacka + ", odrediste: " + voznja.odrediste + ", datum: " + voznja.datum + status + "</li>";
        });
    }
}

function resetForm() {
    document.getElementById("form1").reset();
}