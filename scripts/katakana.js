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
];

// Data
const characterSelectorArray = [
  [
    ["ア", "a"],
    ["イ", "i"],
    ["ウ", "u"],
    ["エ", "e"],
    ["オ", "o"],
  ],
  [
    ["カ", "ka"],
    ["キ", "ki"],
    ["ク", "ku"],
    ["ケ", "ke"],
    ["コ", "ko"],
  ],
  [
    ["サ", "sa"],
    ["シ", "shi"],
    ["ス", "su"],
    ["セ", "se"],
    ["ソ", "so"],
  ],
  [
    ["タ", "ta"],
    ["チ", "chi"],
    ["ツ", "tsu"],
    ["テ", "te"],
    ["ト", "to"],
  ],
  [
    ["ナ", "na"],
    ["ニ", "ni"],
    ["ヌ", "nu"],
    ["ネ", "ne"],
    ["ノ", "no"],
  ],
  [
    ["ハ", "ha"],
    ["ヒ", "hi"],
    ["フ", "fu"],
    ["ヘ", "he"],
    ["ホ", "ho"],
  ],
  [
    ["マ", "ma"],
    ["ミ", "mi"],
    ["ム", "mu"],
    ["メ", "me"],
    ["モ", "mo"],
  ],
  [
    ["ヤ", "ya"],
    ["ユ", "yu"],
    ["ヨ", "yo"],
  ],
  [
    ["ラ", "ra"],
    ["リ", "ri"],
    ["ル", "ru"],
    ["レ", "re"],
    ["ロ", "ro"],
  ],
  [
    ["ワ", "wa"],
    ["ヲ", "wo"],
    ["ン", "n"],
  ],
];
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
  incorrectDisplayAnswers.push(questions[questionNum][0]);
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

function characterSelectorFunc(boolean, array) {
  boolean = !boolean;
  if (boolean) {
    data.push(...array);
    for (let i = 0; i < array.length; i++) {
      displayData.push(array[i][0]);
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      data = data.filter((element) => element !== array[i]);
      displayData = displayData.filter((element) => element !== array[i][0]);
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

    if (submission === answers[0]) {
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
      let submission = myTextbox.value;
      myTextbox.value = "";
      answers[0] = answers[1];

      if (submission === answers[0]) {
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
    characterSelectorBool[i] = characterSelectorFunc(
      characterSelectorBool[i],
      characterSelectorArray[i]
    );
  });
}

// Want to implement
/*
- Question Shuffle
- List the correct and wrong answers on the bottom -> after finishing the questions those get added back in
- Use external json file to put in the questions instead
- Enter Button
*/

// Adjust which character selector button is showing as selected ->
