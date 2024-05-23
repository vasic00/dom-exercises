let questions = [];
let result = 0;
let index = -1;
let map = new Map();

function fetchData() {
    if (localStorage.getItem("loggedUser") === null)
        window.location.href = "page1.html";
    else {
        document.getElementById("userName").innerText = localStorage.getItem("loggedUser");
    }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let resultObj = JSON.parse(xhr.responseText);
            questions = resultObj.results;
            nextQuestion(true);
        }
    }

    xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple", true);
    xhr.send();
}

function nextQuestion(flag) {
    if (index === -1) {
        index = 0;
        createForm(index);
    }
    else if (index < 10) {
        let answer = document.forms["form1"]["answer"].value;
        if (answer === questions[index].correct_answer)
            result++;
        else map.set(index, answer);
        index++;
        if (index < 10)
            createForm(index);
        else {
            document.getElementById("container").innerHTML = "";
            let failsElement = document.getElementById("fails");
            failsElement.innerHTML = "<div>Your incorrect answers: </div><br>";
            map.forEach((value, key, map) => {
                failsElement.innerHTML += "<div>Question: " + questions[key].question + "</div>" +
                    "<div>Answer: " + value + "</div><br>";
            })
            if (localStorage.getItem("leaderboards") === null) {
                let oneResult = { name: localStorage.getItem("loggedUser"), points: result };
                let resultArray = [];
                resultArray.push(oneResult);
                localStorage.setItem("leaderboards", JSON.stringify(resultArray));
            }
            else {
                let resultArray = JSON.parse(localStorage.getItem("leaderboards"));
                if (resultArray.length === 3) {
                    let indexToRemove = -1;
                    let smallestValue = result;
                    resultArray.forEach((element) => {
                        if (element.points < smallestValue) {
                            indexToRemove = resultArray.indexOf(element);
                            smallestValue = element.points;
                        }
                    })
                    if (indexToRemove !== -1) {
                        resultArray.splice(indexToRemove, 1);
                    }
                }
                resultArray.push({ name: localStorage.getItem("loggedUser"), points: result });
                resultArray.sort((el1, el2) => el2.points - el1.points);
                localStorage.setItem("leaderboards", JSON.stringify(resultArray));

            }
            let leaderboardsElement = document.getElementById("leaderboards");
            let results = JSON.parse(localStorage.getItem("leaderboards"));
            leaderboardsElement.innerHTML = "<div>Leaderboards: </div>";
            results.forEach((element) => {
                leaderboardsElement.innerHTML += "<div>" + element.name + ": " + element.points + "</div>"
            })
        }
    }
}

function createForm(index) {
    let answers = questions[index].incorrect_answers;
    console.log("CORRECT ANSWER IS " + questions[index].correct_answer);
    answers.push(questions[index].correct_answer);
    answers.sort((answer) => Math.random() - 0.5);
    let element = document.getElementById("container");
    element.innerHTML = "<div>" + questions[index].question + "</div>";
    element.innerHTML += "<form name='form1' method='post' action='javascript:nextQuestion()'>" +
        "<div><input type='radio' checked name='answer' value='" + answers[0] + "'>" + answers[0] + "</div>" +
        "<div><input type='radio' name='answer' value='" + answers[1] + "'>" + answers[1] + "</div>" +
        "<div><input type='radio' name='answer' value='" + answers[2] + "'>" + answers[2] + "</div>" +
        "<div><input type='radio' name='answer' value='" + answers[3] + "'>" + answers[3] + "</div>" +
        "<div><input type='submit' value='Submit'></div>"
    "</form>"
}