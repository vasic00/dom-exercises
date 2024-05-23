function fun1() {
    let element = document.getElementById("div1");
    if (element.style.display === "none")
        element.style.display = "block";
    else element.style.display = "none";
}

function fun2(element) {
    let newElement = document.createElement("div");
    newElement.innerHTML = window.navigator.userAgent;
    document.body.insertBefore(newElement, element);
    let div4 = document.getElementById("div4");
    let inputElement = document.getElementById("name");
    div4.innerText = inputElement.value;
}

function fillDiv5() {
    document.getElementById("div5").innerHTML = document.getElementById("name").value;
    let elementsByTagName = document.getElementsByTagName("div");
    for (let index in elementsByTagName) {
        console.log(elementsByTagName[index].innerText);
    }
}

function showDiv6(element) {
    let children = element.children;
    for (let index in children) {
        console.log(children[index].innerText);
    }
}

function showRadio() {
    let element = document.getElementById("div8");
    let radios = document.getElementsByName("xdd");
    for (let i in radios) {
        if (radios[i].checked)
            element.innerText += radios[i].value;
    }
}