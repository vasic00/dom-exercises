function start() {
    if (localStorage.getItem("voznje") === null)
        localStorage.setItem("voznje", JSON.stringify([]));
}

function submitForm() {
    let voznje = JSON.parse(localStorage.getItem("voznje"));
    let voznjeZaKorisnika = voznje.find((voznja) => voznja.ime === document.forms["form1"]["ime"].value);
    if (voznjeZaKorisnika === undefined) {
        voznjeZaKorisnika = { ime: document.forms["form1"]["ime"].value, voznje: [] };
        voznje.push(voznjeZaKorisnika);
    }
    let novaVoznja = { polaznaTacka: document.forms["form1"]["polaznaTacka"].value, odrediste: document.forms["form1"]["odrediste"].value, datum: document.forms["form1"]["datum"].value, status: "NEODOBRENA" };
    voznjeZaKorisnika.voznje.push(novaVoznja);
    localStorage.setItem("voznje", JSON.stringify(voznje));
    load();
    document.forms["form1"]["polaznaTacka"].value = "";
    document.forms["form1"]["odrediste"].value = "";
    document.forms["form1"]["datum"].value = "";
}

function resetForm() {
    document.forms["form1"].reset();
}

function load() {
    let container = document.getElementById("container");
    container.innerHTML = "";
    let voznje = JSON.parse(localStorage.getItem("voznje"));
    let voznjeZaKorisnika = voznje.find((voznja) => voznja.ime === document.forms["form1"]["ime"].value);
    if (voznjeZaKorisnika !== undefined) {
        voznjeZaKorisnika.voznje.forEach((voznja) => {
            container.innerHTML += "<li>ime: " + voznjeZaKorisnika.ime + ", polazna tacka: " + voznja.polaznaTacka + ", odrediste: " + voznja.odrediste + ", datum: " + voznja.datum + ", status: " + voznja.status + "</li>";
        })
    }
}