

function logIndex(button) {
    let row = button.parentNode.parentNode;
    console.log(row.getAttribute("index"));
}

function loadTable() {
    let table = document.getElementById("tb");
    let row1 = table.insertRow(-1);
    row1.setAttribute("index", 0);
    let cell1 = row1.insertCell(-1);
    cell1.innerHTML = "Mihailo";
    let cell2 = row1.insertCell(-1);
    cell2.innerHTML = "Vasic";
    let cell3 = row1.insertCell(-1);
    cell3.innerHTML = "1179/19";
    let cell8 = row1.insertCell(-1);
    cell8.innerHTML = "<button type='button' onclick=logIndex(this)>" + "Log index" + "</button>";
    let row2 = table.insertRow(-1);
    row2.setAttribute("index", 1);
    let cell4 = row2.insertCell(-1);
    cell4.innerHTML = "Marko";
    let cell5 = row2.insertCell(-1);
    cell5.innerHTML = "Markovic";
    let cell6 = row2.insertCell(-1);
    cell6.innerHTML = "9999/99";
    let cell7 = row2.insertCell(-1);
    cell7.innerHTML = "<button type='button' onclick=logIndex(this)>" + "Log index" + "</button>";

}