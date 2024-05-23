function submitUser() {
    let name = document.forms["form1"]["name"].value;
    let lastname = document.forms["form1"]["lastname"].value;
    document.forms["form1"].reset();

    let user = localStorage.getItem(name + "_" + lastname);
    console.log(user);
    if (user === null) {
        console.log("ERSDF");
        localStorage.setItem(name + "_" + lastname, JSON.stringify([]));

    }
    localStorage.setItem("loggedUser", name + "_" + lastname);
    location.href = "page2.html";

}