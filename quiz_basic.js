const questions = [
  {
    question:
      "친구가 어떤 동물을 좋아하는지 물어봅니다. 친구는 고양이를 좋아합니다. 이때, 무슨 질문을 할 것인가요?",
    answers: [
      { text: "너는 고양이를 좋아해?", correct: false },
      { text: "뭐 좋아하니?", correct: true },
      { text: "왜 그렇게 귀엽게 생김?", correct: false },
      { text: "고양이 이름이 뭐야?", correct: false },
    ],
  },
  {
    question:
      "친구가 오늘 학교에서 무엇을 배웠는지 물어봅니다. 친구는 수학 시간에 분수를 배웠다고 합니다. 이때, 무슨 질문을 할 것인가요?",
    answers: [
      { text: "오늘 무슨 과목을 배웠어?", correct: false },
      { text: "분수 배우는 거 어려워?", correct: false },
      { text: "어떤 분수를 배웠어?", correct: true },
      { text: "분수를 어디에 사용해?", correct: false },
    ],
  },
  {
    question:
      '친구에게 "오늘 점심으로 뭐 먹을까?"라고 물어보고 싶어요. 어떤 표현을 사용할 것인가요?',
    answers: [
      { text: "뭐 먹을래?", correct: false },
      { text: "배고파?", correct: false },
      { text: "뭐 먹고 싶어?", correct: true },
      { text: "점심 어때?", correct: false },
    ],
  },
  {
    question:
      "휴일에 친구와 놀러 가고 싶어서 어떻게 말할 것인지 고민 중입니다. 어떤 표현이 가장 적절할까요?",
    answers: [
      { text: "뭐 할래?", correct: false },
      { text: "오늘은 뭐 해?", correct: false },
      { text: "휴일에 놀러 가자.", correct: false },
      { text: "친구랑 만날래.", correct: true },
    ],
  },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer_buttons");
const nextButton = document.getElementById("next_btn");
const quitButton = document.getElementById("quit");

let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleQuestions(questions);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "다음";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML =
    "Q" + questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer_btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  var imgDiv = document.querySelector("div img");
  if (imgDiv) {
    imgDiv.parentNode.removeChild(imgDiv);
  }
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  var imgDiv = document.createElement("div");
  var img = document.createElement("img");
  img.src = "image/초급.png";
  img.style.width = "500px"; // 원하는 너비로 설정
  img.style.height = "auto"; // 높이는 자동으로 조정
  imgDiv.style.marginLeft = "110px";
  imgDiv.appendChild(img);

  questionElement.innerHTML = `총 맞은 개수는 ${questions.length}문제 중 ${score}문제 맞았습니다!`;

  nextButton.innerHTML = "다시 풀어보기!";
  nextButton.style.display = "block";

  answerButtons.parentNode.insertBefore(imgDiv, answerButtons.nextSibling);
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    shuffleQuestions(questions);
    startQuiz();
  }
});

startQuiz();
