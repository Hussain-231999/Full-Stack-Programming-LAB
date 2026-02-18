const quizData = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the full form of DOM?", answer: "Data Object Model" },
    { question: "What is the color of the sky?", answer: "Blue" }
];

const inputIds = ["q1", "q2", "q3", "q4"];

function checkAnswers() {
    let score = 0;
    for (let i = 0; i < quizData.length; i++) {
        const userAnswer = document.getElementById(inputIds[i]).value.trim().toLowerCase();
        const correctAnswer = quizData[i].answer.toLowerCase();
        if (userAnswer === correctAnswer) {
            score++;
        }
    }
    displayResults(score);
}

function displayResults(score) {
    const resultsDiv = document.getElementById("results");
    let message = "";
 
    if (score === quizData.length) {
        message = "Perfect! You got all " + quizData.length + " answers correct.";
    } else if (score >= Math.ceil(quizData.length / 2)) {
        message = "Good job! You scored " + score + " out of " + quizData.length + ".";
    } else {
        message = "Try again! You scored " + score + " out of " + quizData.length + ".";
    }
    resultsDiv.innerHTML = message;
}

function resetQuiz() {
    for (let id of inputIds) {
        document.getElementById(id).value = "";
    }
    document.getElementById("results").innerHTML = "";
}

document.getElementById("submit").addEventListener("click", checkAnswers);
document.getElementById("reset").addEventListener("click", resetQuiz);