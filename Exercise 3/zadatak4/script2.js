let questions = [];
let fails = [];
let result = 0;
let index = 0;


function fetch() {
    if (localStorage.getItem("loggedUser") === null)
        window.location.href = "page1.html";
    document.getElementById("nameContainer").innerText += " " + localStorage.getItem("loggedUser");
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let resultObj = JSON.parse(xhr.responseText);
            questions = resultObj.results;
            nextQuestion();
        }
    }

    xhr.open("GET", "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple", true);
    xhr.send();
}

function nextQuestion() {
    let container = document.getElementById("questionContainer");

    if (document.forms["form1"] !== undefined) {
        let answer = document.forms["form1"]["answer"].value;
        if (answer === questions[index].correct_answer) {
            result++;
        }
        else {
            fails.push({ question: questions[index].question, incorrectAnswer: answer });
        }
        index++;
    }
    if (index < 10) {
        let answers = questions[index].incorrect_answers;
        answers.push(questions[index].correct_answer);
        answers.sort((ans1, ans2) => Math.random() - 0.5);
        console.log(answers);
        container.innerHTML = "<div> Question " + (index + 1) + ": " + questions[index].question + "</div>";
        container.innerHTML += "<form id='form1' name='form1' action='javascript:nextQuestion()' method='post'>"
            + "<div><input type='radio' checked name='answer' value='" + answers[0] + "'>" + answers[0] + "</div>"
            + "<div><input type='radio' name='answer' value='" + answers[1] + "'>" + answers[1] + "</div>"
            + "<div><input type='radio' name='answer' value='" + answers[2] + "'>" + answers[2] + "</div>"
            + "<div><input type='radio' name='answer' value='" + answers[3] + "'>" + answers[3] + "</div>"
            + "<div><input type='submit' value='Submit'></div>" +
            "</form>"
    }
    else {
        container.innerHTML = "Your result is " + result;
        container.innerHTML += "<br>";
        fails.forEach((fail) => {
            container.innerHTML += "<div>" + fail.question + "</div>";
            container.innerHTML += "<div>" + fail.incorrectAnswer + "</div>";
        })
        if (localStorage.getItem("results") === null)
            localStorage.setItem("results", JSON.stringify([]));
        let results = JSON.parse(localStorage.getItem("results"));
        let indexToRemove = results.findIndex((res) => res.name === localStorage.getItem("loggedUser"));
        if (indexToRemove > -1)
            results.splice(indexToRemove, 1);
        if (results.length === 3) {
            indexToRemove = results.findIndex((res) => res.points < result);
            if (indexToRemove > -1) {
                results.splice(indexToRemove, 1);
            }
        }
        results.push({ name: localStorage.getItem("loggedUser"), points: result });
        results.sort((res1, res2) => res2.points - res1.points);
        localStorage.setItem("results", JSON.stringify(results));
        container.innerHTML += "<br>";
        container.innerHTML += "<div>LEADERBOARDS</div>"
        results.forEach((res) => {
            container.innerHTML += "<div>" + res.name + ": " + res.points + "</div>";
        })
    }

}