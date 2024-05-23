let questions = [];
let map = new Map();
let index = 0;
let result = 0;

function fetchQuestions() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            questions = JSON.parse(xhr.responseText).results;
            console.log(questions);
            document.getElementById("playerName").innerHTML = localStorage.getItem("name");
            document.getElementById("questionNumber").innerHTML = "Question 1: " + questions[0].question;
            setUpAnswers();
        }
    }

    xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple", true);
    xhr.send();
}


function showNextQuestion() {
    // let container = document.getElementById("questions");
    // container.innerHTML = "<form method=\"post\" action=\"javascript:showNextQuestion()\" name=\"form1\">"
    // container.innerHTML += "<input type=\"text\" display=\"none\" name=\"currentQuestion\" value=\"" + index + "\"/>"
    // container.innerHTML += "<div>Question 1: " + questions[index].question + "</div>";
    if (index <= 9) {
        let answer = document.forms["form1"]["answer"].value;
        if (questions[index].correct_answer === answer)
            result++;
        else map.set(questions[index].question, answer);
        index++;
        let questionNumber = index + 1;
        if (questionNumber <= 10)
            document.getElementById("questionNumber").innerHTML = "Question " + questionNumber + ": " + questions[index].question;
        // document.forms["form1"].reset();
    }

    if (index === 10) {
        let element = document.getElementById("questions");
        element.innerHTML = "Your result is " + result + ".<br>";
        element.innerHTML += "You failed the following questions:<br>";
        map.forEach((value, key, map) => {
            element.innerHTML += "Q: " + key + "<br>";
            element.innerHTML += "A: " + value + "<br>";
            element.innerHTML += "<br>";
        })
        element.innerHTML += "<br>";
        element.innerHTML += "Leaderboard:<br>";
        let list = new Map(JSON.parse(localStorage.getItem("list")));
        console.log(list);
        console.log("LIST SIZE " + list.size);
        let smallestValue = 100;
        let smallestKey = "";
        if (list.size === 0) {
            list.set(localStorage.getItem("name"), result);
        }
        else {
            list.forEach((value, key, map) => {
                if (value <= result && map.size === 3) {
                    console.log("Map size is " + map.size + " and I am inside");
                    if (value <= smallestValue) {
                        smallestValue = value;
                        smallestKey = key;
                    }
                }
            })
        }
        if (smallestValue !== 100)
            list.delete(smallestKey);
        if (list.size < 3)
            list.set(localStorage.getItem("name"), result);
        localStorage.setItem("list", JSON.stringify(Array.from(list.entries())));
        let newList = new Map(JSON.parse(localStorage.getItem("list")));
        console.log(newList);

        let sortedArray = Array.from(list);
        console.log("SORTED ARRAY");
        console.log(sortedArray);
        sortedArray.sort((a, b) => b[1] - a[1]);
        let sortedMap = new Map(sortedArray);
        sortedMap.forEach((value, key, map) => {
            element.innerHTML += key + " : " + value + "<br>";
        })
    }
    else setUpAnswers();
}

function setUpAnswers() {
    let answers = [];
    questions[index].incorrect_answers.forEach(element => {
        console.log(element);
        answers.push(element);
    });
    answers.push(questions[index].correct_answer);
    answers.sort(() => Math.random() - 0.5);

    let answerNumber = 1;
    answers.forEach((answer) => {
        document.getElementById("answer" + answerNumber).value = answer;
        document.getElementById("answer" + answerNumber + "Container").innerHTML = answer;
        answerNumber++;
    });
}
