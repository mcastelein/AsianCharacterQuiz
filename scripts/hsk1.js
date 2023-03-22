"use strict";

// Booleans
let characterSelectorBool = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

// Data Import
import dataObj from "../json/hsk1.json" assert { type: "json" };
let data = [];
let displayData = [];

// Selectors
const question = document.querySelector(".question");
const kana = document.querySelector(".kana");
const score = document.getElementById("score");
const tracker = document.getElementById("tracker");
const myTextbox = document.getElementById("answer");
const inputElement = document.querySelector("input");
const wrong = document.querySelector(".wrong");

// Buttons
const btnSubmit = document.querySelector(".submit");
const btnIncorrect = document.querySelector(".incorrect");
const btnRestart = document.querySelector(".restart");
const btnStart = document.querySelector(".start");
const btnChoose = document.querySelector(".choose");
const characterSelector = document.querySelectorAll(".characterSelector");

// What to show initially
// Only text saying to select the characters you want
question.textContent = "Select the characters you want to study";
kana.textContent = "";
wrong.textContent = "";
myTextbox.style.display = "none";
inputElement.classList.add(".hidden");
btnSubmit.classList.add(".hidden");
score.textContent = "";
tracker.textContent = "";

// Initializations
let questionNum = 0;
let scoreNum = 0;
let incorrectAnswers = [];
let incorrectDisplayAnswers = [];
let questions;
let answers;

// Functions
function wrongDisplay(input) {
  wrong.textContent = input;
}

// Filters out the Elements in an Object based off their categroy
const filterByCategory = (data, cat) =>
  Object.keys(data)
    .filter((key) => data[key].category === cat)
    .reduce((result, key) => {
      result[key] = data[key];
      return result;
    }, {});

// Shuffles input Array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function correctAnswer() {
  // Increase Score
  scoreNum++;
  score.textContent = `Score: ${scoreNum}`;

  // Check if quiz is finished
  if (questionNum === questions.length - 1) {
    finishQuiz();
  } else {
    // Next Question
    questionNum++;
    // Update Both Question Numbers
    question.textContent = `Question ${questionNum + 1}:`;
    tracker.textContent = `#${questionNum + 1}/${questions.length}`;
    return updateQuestion(questions[questionNum]);
  }
}

function wrongAnswer() {
  // Update Both Question Numbers
  question.textContent = `Question ${questionNum + 1}:`;
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;

  // Add wrong answer to list
  incorrectAnswers.push(questions[questionNum]);
  incorrectDisplayAnswers.push(
    `(${questions[questionNum][0]},${questions[questionNum][1][0]})`
  );
  displayIncorrect(incorrectDisplayAnswers);

  // Check if quiz is finished
  if (questionNum === questions.length - 1) {
    finishQuiz();
  } else {
    // Next Question
    questionNum++;
    return updateQuestion(questions[questionNum]);
  }
}

function finishQuiz() {
  if (incorrectAnswers.length === 0) {
    question.textContent = "You Finished the Quiz, and got everything right!";
    wrong.textContent = "";
  } else {
    question.textContent = "You Finished the Quiz!";

    // Remove hidden class from the Restart and Study Incorrect Buttons
    btnIncorrect.classList.remove("hidden");
  }
  kana.textContent = "";
  btnRestart.classList.remove("hidden");
  btnSubmit.classList.add("hidden");
  btnSubmit.disabled = true;
  myTextbox.style.display = "none";
  btnChoose.classList.remove("hidden");
}

function updateQuestion(nextQuestion) {
  const question = nextQuestion[0];
  const answer = nextQuestion[1];
  kana.textContent = question;
  return answer;
}

function displayIncorrect(incorrectAnswers) {
  wrong.textContent = `Wrong: ${incorrectAnswers}`;
}

// const keys = Object.keys(dataObj);
// for (let key of keys) {
//   console.log(`${key}: ${dataObj[key].character}`);
// }

function characterSelectorFunc(boolean, array) {
  boolean = !boolean;
  const keys = Object.keys(array);
  if (boolean) {
    for (let key of keys) {
      data.push([array[key].character, array[key].reading]);
      displayData.push(array[key].character);
    }
  } else {
    for (let key of keys) {
      if (displayData.includes(array[key].character)) {
        data.splice(
          data.indexOf([array[key].character, array[key].reading]),
          1
        );
        displayData.splice(displayData.indexOf(array[key].character), 1);
      }
    }
  }
  wrongDisplay(`Selected: ${displayData}`);
  return boolean;
}

function showCharacterSelectors(boolean) {
  for (let i = 0; i < characterSelector.length; i++) {
    if (boolean) {
      characterSelector[i].classList.remove("hidden");
      characterSelector[i].classList.remove("clicked");
    } else {
      characterSelector[i].classList.add("hidden");
    }
  }
}

// Building Character Selector Array for HSK1

const g1 = filterByCategory(dataObj, "Group 1");
const g2 = filterByCategory(dataObj, "Group 2");
const g3 = filterByCategory(dataObj, "Group 3");
const g4 = filterByCategory(dataObj, "Group 4");
const g5 = filterByCategory(dataObj, "Group 5");
const g6 = filterByCategory(dataObj, "Group 6");
const g7 = filterByCategory(dataObj, "Group 7");
const g8 = filterByCategory(dataObj, "Group 8");
const g9 = filterByCategory(dataObj, "Group 9");
const g10 = filterByCategory(dataObj, "Group 10");
const g11 = filterByCategory(dataObj, "Group 11");
const g12 = filterByCategory(dataObj, "Group 12");
const g13 = filterByCategory(dataObj, "Group 13");
const g14 = filterByCategory(dataObj, "Group 14");
const g15 = filterByCategory(dataObj, "Group 15");
const g16 = filterByCategory(dataObj, "Group 16");
const g17 = filterByCategory(dataObj, "Group 17");
const g18 = filterByCategory(dataObj, "Group 18");

const characterSelectorArray = [
  g1,
  g2,
  g3,
  g4,
  g5,
  g6,
  g7,
  g8,
  g9,
  g10,
  g11,
  g12,
  g13,
  g14,
  g15,
  g16,
  g17,
  g18,
];

// Event Listeners
btnChoose.addEventListener("click", function (e) {
  e.preventDefault();
  // Reveal Kana Choice Buttons and start at false and inclicked
  // inputElement.classList.add("hidden");
  btnRestart.classList.add("hidden");
  btnChoose.classList.add("hidden");
  btnIncorrect.classList.add("hidden");
  btnStart.classList.remove("hidden");
  showCharacterSelectors(true);
  characterSelectorBool = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  // Show textbox and submit button
  // myTextbox.style.display = "block";
  // btnSubmit.classList.remove("hidden");
  // wrong.textContent = "Wrong: ";

  // Disable Button
  btnStart.disabled = false;
  btnSubmit.disabled = false;

  // Reset Initializations
  question.textContent = "Select the characters you want to study";
  kana.textContent = "";
  wrong.textContent = "";
  myTextbox.style.display = "none";
  inputElement.classList.add(".hidden");
  btnSubmit.classList.add(".hidden");
  score.textContent = "";
  tracker.textContent = "";
  questionNum = 0;
  scoreNum = 0;
  incorrectAnswers = [];
  incorrectDisplayAnswers = [];
  displayData = [];
  data = [];
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  if (myTextbox.value != "") {
    let submission = myTextbox.value;
    myTextbox.value = "";
    answers[0] = answers[1];

    if (answers[0].includes(submission)) {
      answers[1] = correctAnswer();
    } else {
      answers[1] = wrongAnswer();
    }
  }
});

// Add event listener for keyup event
const input = document.querySelector("input");
input.addEventListener("keyup", function (event) {
  // Check if the key pressed is 'Enter'
  if (event.key === "Enter") {
    if (myTextbox.value != "") {
      let submission = myTextbox.value.toLowerCase();
      myTextbox.value = "";
      answers[0] = answers[1];

      if (answers[0].includes(submission)) {
        answers[1] = correctAnswer();
      } else {
        answers[1] = wrongAnswer();
      }
    }
  }
});

btnIncorrect.addEventListener("click", function (e) {
  e.preventDefault();
  // Reset QuestionNumber
  questionNum = 0;
  // Make Wrong Answers the Questions
  questions = shuffleArray(incorrectAnswers);
  answers[1] = questions[0][1];
  // Reset Number tracker to #1/NumQs
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;
  // Clear Wrong Answers
  displayIncorrect("");
  incorrectAnswers = [];
  incorrectDisplayAnswers = [];
  // Start new Quiz
  question.textContent = `Question ${questionNum + 1}`;
  kana.textContent = questions[0][0];
  // Toggle Buttons
  btnIncorrect.classList.add("hidden");
  btnRestart.classList.add("hidden");
  btnSubmit.classList.remove("hidden");
  btnSubmit.disabled = false;
  myTextbox.style.display = "block";
});

btnRestart.addEventListener("click", function (e) {
  e.preventDefault();
  // Re-initialize
  questions = shuffleArray(data);
  incorrectAnswers = [];
  incorrectDisplayAnswers = [];
  questionNum = 0;
  scoreNum = 0;
  answers = [questions[0][1], questions[0][1]];
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;
  kana.textContent = questions[0][0];
  question.textContent = `Question ${questionNum + 1}`;
  score.textContent = `Score: ${scoreNum}`;
  displayIncorrect(incorrectDisplayAnswers);
  // Toggle Buttons
  btnIncorrect.classList.add("hidden");
  btnRestart.classList.add("hidden");
  btnSubmit.classList.remove("hidden");
  btnSubmit.disabled = false;
  myTextbox.style.display = "block";
});

btnStart.addEventListener("click", function (e) {
  e.preventDefault();
  // Start the Data Flow
  questions = shuffleArray(data);
  answers = [questions[0][1], questions[0][1]];

  // Change the Displays
  tracker.textContent = `#${questionNum + 1}/${questions.length}`;
  question.textContent = `Question ${questionNum + 1}`;
  kana.textContent = questions[0][0];

  // Toggle the buttons
  inputElement.classList.remove("hidden");
  btnStart.classList.add("hidden");
  showCharacterSelectors(false);

  // Show textbox and submit button
  myTextbox.style.display = "block";
  btnSubmit.classList.remove("hidden");
  wrong.textContent = "Wrong: ";

  // Disable Button
  btnStart.disabled = true;
});

for (let i = 0; i < characterSelector.length; i++) {
  characterSelector[i].addEventListener("click", function (e) {
    e.preventDefault();
    characterSelector[i].classList.toggle("clicked");
    let groupName = "Group " + (i + 1);
    characterSelectorBool[i] = characterSelectorFunc(
      characterSelectorBool[i],
      characterSelectorArray[i]
    );
  });
}
