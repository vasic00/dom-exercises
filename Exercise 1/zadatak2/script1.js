function submitForm() {
    let obj = {
        start: document.forms["form1"]["start"].value,
        destination: document.forms["form1"]["destination"].value,
        date: document.forms["form1"]["date"].value
    }
    let name = document.forms["form1"]["name"].value;
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    if (users === null)
        users = [];
    if (!users.includes(name))
        users.push(name);
    localStorage.setItem("users", JSON.stringify(users));
    let drives = JSON.parse(localStorage.getItem(name));
    if (drives === null)
        drives = [];
    drives.push(obj);
    drives.sort((drive1, drive2) => new Date(drive2.date).getTime() - new Date(drive1.date).getTime());
    localStorage.setItem(name, JSON.stringify(drives));
    let listElement = document.getElementById("list");
    listElement.innerHTML = "";
    drives.forEach(drive => {
        listElement.innerHTML += "<li>Start: " + drive.start + ", destination: " + drive.destination + ", date: " + drive.date + ", " + drive.passed + "</li>";
        listElement.innerHTML += "<br>";
    });
    document.forms["form1"].reset();
}

function resetForm() {
    document.forms["form1"].reset();
}