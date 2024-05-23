function checkIfValid() {
    console.log("change detected");
    let ime = document.forms["form1"]["ime"].value;
    let prezime = document.forms["form1"]["prezime"].value;
    let godina = document.forms["form1"]["godina"].value;
    let brojIndeksa = document.forms["form1"]["brojIndeksa"].value;
    console.log(ime);
    console.log(prezime);
    console.log(godina);
    console.log(brojIndeksa);
    if (ime !== "" && prezime !== "" && godina !== "" && brojIndeksa !== "")
        document.getElementById("submit").disabled = false;
}

function addStudent() {
    let ime = document.forms["form1"]["ime"].value;
    let prezime = document.forms["form1"]["prezime"].value;
    let godina = document.forms["form1"]["godina"].value;
    let brojIndeksa = document.forms["form1"]["brojIndeksa"].value;
    let program = document.forms["form1"]["program"].value;

    let table = document.getElementById("tb");
    let row = table.insertRow(-1);
    row.insertCell(-1).innerHTML = ime;
    row.insertCell(-1).innerHTML = prezime;
    row.insertCell(-1).innerHTML = godina;
    row.insertCell(-1).innerHTML = brojIndeksa;
    row.insertCell(-1).innerHTML = program;
}