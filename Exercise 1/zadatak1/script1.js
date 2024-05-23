function nextPage() {
    let nameValue = document.getElementById("name").value;
    if (nameValue !== null && nameValue !== "") {
        localStorage.setItem("name", nameValue);
        localStorage.setItem("previousPageUrl", window.location.href);
        window.open("page2.html", "_blank");
    }
}