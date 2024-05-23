function show(container) {
    let content = container.nextElementSibling;
    if (content.style.display === "block")
        content.style.display = "none";
    else content.style.display = "block";
}

function fetch() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let container = document.getElementById("container");
            let titleCounter = 1;
            response.forEach((element) => {
                container.innerHTML += "<div><div class=\"title\" onclick=\"show(this)\" id=\"title" + titleCounter + "\">" + element.title + "</div>"
                    + "<div class=\"content\">" + element.body + "</div></div>";
            })
        }
    }
    let id = document.forms["form1"]["id"].value;
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}