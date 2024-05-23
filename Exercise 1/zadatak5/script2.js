let responses = [];

function sortById() {
    responses.sort((resp1, resp2) => resp2.id - resp1.id);
    updateTable();
}

function saveAsFavorite(button) {
    let parent = button.parentNode;
    let bodyValue = parent.previousElementSibling;
    let titleValue = bodyValue.previousElementSibling;
    let idValue = titleValue.previousElementSibling;
    let loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser !== null) {
        console.log(idValue.innerText);
        let favorites = JSON.parse(localStorage.getItem(loggedUser));
        if (favorites === null)
            favorites = [];
        favorites.push(idValue.innerText);
        localStorage.setItem(loggedUser, JSON.stringify(favorites));
        updateTable();
    }
}

function updateTable() {
    let loggedUser = localStorage.getItem("loggedUser");
    let favorites = JSON.parse(localStorage.getItem(loggedUser));
    let table = document.getElementById("tb");
    table.innerHTML = "";
    responses.forEach((element) => {
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(-1);
        cell1.setAttribute("onclick", "sortById()");
        console.log("ELEMENT ID: " + element.id);
        cell1.innerHTML = element.id;
        let cell2 = row.insertCell(-1);
        cell2.innerHTML = element.title;
        let cell3 = row.insertCell(-1);
        cell3.innerHTML = element.body;
        let cell4 = row.insertCell(-1);
        cell4.innerHTML = "<button type=\"button\" onclick=\"saveAsFavorite(this)\">Save as fav</button>";
        if (favorites !== null && favorites.includes("" + element.id)) {
            console.log("YES, SHOULD BE RED");
            cell1.style.cssText += "border: 1px solid red";
            cell2.style.cssText += "border: 1px solid red";
            cell3.style.cssText += "border: 1px solid red";
            cell4.style.cssText += "border: 1px solid red";
        }
    })
}

function fetchRaces() {
    console.log(localStorage.getItem("loggedUser"));
    console.log(localStorage.getItem(localStorage.getItem("loggedUser")));
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status) {
            responses = JSON.parse(xhr.responseText);
            updateTable();
        }
    }

    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=5", true);
    xhr.send();
}

function deleteAll() {
    let user = localStorage.getItem("loggedUser");
    if (user != null) {
        localStorage.removeItem(user);
        updateTable();
    }
}