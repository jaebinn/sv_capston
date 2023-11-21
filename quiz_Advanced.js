const questions = [
  {
    question:
      "친구가 여행을 가고 싶다고 말합니다. 어떤 장소에 가고 싶어하는지 물어봅니다. 친구는 해변에 가고 싶다고 합니다. 이때, 무슨 질문을 할 것인가요?",
    answers: [
      { text: "해변 여행 어때? 어떤 곳에 가고 싶어?", correct: true },
      { text: "여행일정은 어때?", correct: false },
      { text: "해변에서 무엇을 하고 싶어?", correct: false },
      { text: "바다에서 무엇을 할 거야?", correct: false },
    ],
  },
  {
    question:
      "당신과 친구가 긴 휴가 기간에 대한 계획을 세우고 있습니다. 당신이 제안하는 계획은 무엇인가요?",
    answers: [
      { text: "어때, 긴 휴가에 어디 놀러 갈까?", correct: true },
      { text: "뭐하고 놀까? 서핑을 해보자.", correct: false },
      { text: "휴가를 어떻게 보낼까?", correct: false },
      { text: "계획없이 휴식을 취해도 좋아?", correct: false },
    ],
  },
  {
    question:
      "친구의 생일이 다가오고, 당신은 어떤 선물을 줄 것인지 고민 중입니다. 어떤 생각을 나눠볼 것인가요?",
    answers: [
      { text: "생일 선물로 무엇을 생각해?", correct: true },
      { text: "어떤 것이 필요할 것 같아?", correct: false },
      { text: "언제 생일인데?", correct: false },
      { text: "선물로 뭐가 좋을까?", correct: false },
    ],
  },
  {
    question:
      "당신의 친구가 최근에 봤던 영화에 대해 얘기하고 있는데, 당신은 영화를 아직 보지 않았습니다. 어떻게 대화에 참여할 것인가요?",
    answers: [
      { text: "나도 그 영화를 보고 싶어.", correct: false },
      { text: "그 영화는 어땠어?", correct: false },
      { text: "영화가 어때?", correct: false },
      { text: "내가 그 영화를 아직 못 봤어.", correct: true },
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
  img.src = "image/고급.png";
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
