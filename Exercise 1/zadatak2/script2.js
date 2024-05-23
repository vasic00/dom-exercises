function deleteDrive(button) {
    let buttonContainer = button.parentElement;
    let dateElement = buttonContainer.previousElementSibling;
    let destinationElement = dateElement.previousElementSibling;
    let startElement = destinationElement.previousElementSibling;
    let nameElement = startElement.previousElementSibling;
    let drivesOfUser = JSON.parse(localStorage.getItem(nameElement.textContent));
    drivesOfUser = drivesOfUser.filter((drive) => {
        return drive.date !== dateElement.textContent && drive.destination !== destinationElement.textContent && drive.start !== startElement.textContent
    })
    localStorage.setItem(nameElement.textContent, JSON.stringify(drivesOfUser));
    loadTable(false);
}

function passDrive(button) {
    let buttonContainer = button.parentElement;
    let deleteButton = buttonContainer.previousElementSibling;
    let dateElement = deleteButton.previousElementSibling;
    let destinationElement = dateElement.previousElementSibling;
    let startElement = destinationElement.previousElementSibling;
    let nameElement = startElement.previousElementSibling;
    let drivesOfUser = JSON.parse(localStorage.getItem(nameElement.textContent));
    drivesOfUser.forEach((drive) => {
        if (drive.date === dateElement.textContent && drive.destination === destinationElement.textContent && drive.start === startElement.textContent) {
            drive.passed = "passed";
        }
    })
    localStorage.setItem(nameElement.textContent, JSON.stringify(drivesOfUser));
}

function loadTable(nameSort) {
    let allDrives = [];
    let users = JSON.parse(localStorage.getItem("users"));
    let tbody = document.getElementById("tablebody");
    tbody.innerHTML = "";
    console.log(tbody);
    if (users !== null) {
        users.forEach((user) => {
            console.log(user);
            let drives = JSON.parse(localStorage.getItem(user));
            if (drives !== null) {
                drives.forEach((drive) => {
                    let obj = {
                        name: user,
                        start: drive.start,
                        destination: drive.destination,
                        date: drive.date
                    }
                    allDrives.push(obj);
                    console.log(drive);
                    // tbody.innerHTML += "<tr>"
                    //     + "<td>" + user + "</td>"
                    //     + "<td>" + drive.start + "</td>"
                    //     + "<td>" + drive.destination + "</td>"
                    //     + "<td>" + drive.date + "</td>"
                    //     + "</tr>"
                })
            }
        })
    }
    allDrives.sort((drive1, drive2) => new Date(drive2.date).getTime() - new Date(drive1.date).getTime());
    if (nameSort)
        allDrives.sort((drive1, drive2) => drive1.name.localeCompare(drive2.name))
    allDrives.forEach((drive) => {
        tbody.innerHTML += "<tr>"
            + "<td>" + drive.name + "</td>"
            + "<td>" + drive.start + "</td>"
            + "<td>" + drive.destination + "</td>"
            + "<td>" + drive.date + "</td>"
            + "<td><button type=\"button\" onclick=\"deleteDrive(this)\">Delete</button></td>"
            + "<td><button type=\"button\" onclick=\"passDrive(this)\">Pass</button></td>"
            + "</tr>"
    })
}