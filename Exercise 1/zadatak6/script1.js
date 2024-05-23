let itemsToBuy = [];
let payment = "";

function loadItems() {
    document.getElementById("form1").style.display = "block";

    let items = [];
    items.push({ name: "product1", description: "description1", price: 20 });
    items.push({ name: "product2", description: "description2", price: 50 });
    items.push({ name: "product3", description: "description3", price: 30 });
    items.push({ name: "product4", description: "description4", price: 10 });
    items.push({ name: "product5", description: "description5", price: 5 });
    items.push({ name: "product6", description: "description6", price: 80 });
    items.push({ name: "product7", description: "description7", price: 15 });
    items.push({ name: "product8", description: "description8", price: 8 });
    items.push({ name: "product9", description: "description9", price: 200 });
    items.push({ name: "product10", description: "description10", price: 150 });
    items.push({ name: "product11", description: "description11", price: 35 });
    items.push({ name: "product12", description: "description12", price: 18 });
    items.push({ name: "product13", description: "description13", price: 22 });
    items.push({ name: "product14", description: "description14", price: 130 });
    items.push({ name: "product15", description: "description15", price: 125 });
    items.push({ name: "product16", description: "description16", price: 110 });
    items.push({ name: "product17", description: "description17", price: 40 });
    items.push({ name: "product18", description: "description18", price: 21 });
    items.push({ name: "product19", description: "description19", price: 11 });
    items.push({ name: "product20", description: "description20", price: 14 });
    localStorage.setItem("items", JSON.stringify(items));
    let cardContainer = document.getElementById("card-container");
    items.forEach((item) => {
        // let card = cardContainer.appendChild(document.createElement("div"));
        cardContainer.innerHTML += "<div class=\"card\">" + "<div>" + item.name + "</div>" + "<div>"
            + item.description + "</div>" + "<div>" + item.price + "</div>" + "<div>" +
            "<input type=\"checkbox\" name=\"" + item.name + "\">" + "</div>" + "</div>";
    })
}

function submitForm() {
    let items = JSON.parse(localStorage.getItem("items"));
    items.forEach((item) => {
        if (document.forms["form1"][item.name].checked)
            if (document.forms["form1"][item.name].value === "on")
                itemsToBuy.push(item);
    });
    console.log(itemsToBuy);
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "block";
}

function showPaymentInput() {
    let container = document.getElementById("paymentTypeInputContainer");
    container.innerHTML = "";
    if (document.forms["form2"]["paymentType"].value === "card") {
        container.innerHTML += "<label for=\"paymentTypeInput\">Card number:</label><input type=\"text\" name=\"paymentTypeInput\" required>"
    }
    else if (document.forms["form2"]["paymentType"].value === "live") {
        container.innerHTML += "<label for=\"paymentTypeInput\">Address:</label><input type=\"text\" name=\"paymentTypeInput\" id=\"paymentTypeInput\" required>"
    }
}

function submitPayment() {
    if (document.forms["form2"]["paymentType"] !== undefined && document.forms["form2"]["paymentTypeInput"] !== undefined) {
        payment = document.forms["form2"]["paymentType"].value + "_" + document.forms["form2"]["paymentTypeInput"].value;
        document.getElementById("form2").style.display = "none";
        document.getElementById("result").style.display = "block";
        document.getElementById("paymentResult").innerHTML = payment;
        let table = document.getElementById("tb");

        itemsToBuy.sort((item1, item2) => item2.price - item1.price);


        let totalPrice = 0;
        itemsToBuy.forEach((item) => {
            let row = table.insertRow(-1);
            let cell1 = row.insertCell(-1);
            cell1.innerHTML = item.name;
            let cell2 = row.insertCell(-1);
            cell2.innerHTML = item.description;
            let cell3 = row.insertCell(-1);
            cell3.innerHTML = item.price;
            totalPrice += item.price;
        })
        document.getElementById("totalPrice").innerHTML = totalPrice;
    }
}