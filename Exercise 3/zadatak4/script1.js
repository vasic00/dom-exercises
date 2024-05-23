function submitForm() {
    localStorage.setItem("loggedUser", document.forms["form1"]["name"].value);
    window.location.href = "page2.html";
}

function check() {
    if (document.forms["form1"]["name"].value !== "")
        document.forms["form1"]["submit"].disabled = false;
    else document.forms["form1"]["submit"].disabled = true;
}