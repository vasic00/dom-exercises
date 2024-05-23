function submitForm() {
    let ime = document.forms["form1"]["ime"].value;
    localStorage.setItem("loggedUser", ime);
    window.location.href = "page2.html";
}

function checkName() {
    if (document.forms["form1"]["ime"].value !== "") {
        document.getElementById("submit").disabled = false;
    }
    else document.getElementById("submit").disabled = true;
}