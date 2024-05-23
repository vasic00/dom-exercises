let studenti = [];

function dodaj() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById("submit").disabled = true;
}

function odustani() {
    document.getElementById("form1").reset();
    document.getElementById('popup').style.display = 'none';

}

function obrisi(button) {
    let listItem = button.parentNode;
    studenti.splice(listItem.index, 1);
    sacuvaj();
}

function sacuvaj() {
    if (document.forms["form1"]["ime"].value !== "" && document.forms["form1"]["prezime"].value !== "") {
        studenti.push({ ime: document.forms["form1"]["ime"].value, prezime: document.forms["form1"]["prezime"].value })
        document.getElementById("form1").reset();
    }
    let list = document.getElementById("list");
    let index = 0;
    list.innerHTML = "";
    studenti.forEach((student) => {
        let blueColor = "class='blue-bg'";
        if ((index + 1) % 2 !== 0)
            blueColor = "";
        list.innerHTML += "<li " + blueColor + " index='" + index + "'>" + student.ime + " " + student.prezime +
            "<button type='button' onclick='obrisi(this)'>Obrisi</button>" + "</li>";
        index++;
    })
}

function validate() {
    if (document.forms["form1"]["ime"].value !== "" && document.forms["form1"]["prezime"].value !== "") {
        document.getElementById("submit").disabled = false;
    }
    else document.getElementById("submit").disabled = true;
}

