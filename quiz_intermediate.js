const questions = [
  {
    question:
      "친구가 최근에 봤던 영화를 추천해 달라고 말합니다. 어떤 영화를 추천하겠나요?",
    answers: [
      { text: "이번에 본 '다크나이트' 진짜 멋있어. 꼭 봐!", correct: true },
      { text: "영화 추천해 줄게. '뽀로로 모험기' 재미있어.", correct: false },
      {
        text: "영화 보는 거 좋아해? '카메라를 멈춰라' 추천해!",
        correct: false,
      },
      {
        text: "무서운 영화를 보는 거 어때? '헬로우키티의 공포 여행'이야.",
        correct: false,
      },
    ],
  },
  {
    question:
      "당신의 생일 파티를 계획 중입니다. 친구에게 어떤 종류의 케이크를 주문할지 물어봅니다. 이때, 무슨 질문을 할 것인가요?",
    answers: [
      { text: "파티 날짜는 언제야?", correct: false },
      { text: "어떤 케이크를 먹고 싶어?", correct: true },
      { text: "파티 장소는 어디야?", correct: false },
      { text: "무슨 선물을 원해?", correct: false },
    ],
  },
  {
    question:
      "당신의 친구가 어떤 새로운 취미를 시작했다는 소식을 듣고, 축하하고 싶습니다. 어떤 말을 전하면 좋을까요?",
    answers: [
      { text: "그게 대단해!", correct: false },
      { text: "완전 멋져!", correct: true },
      { text: "즐거울 거야.", correct: false },
      { text: "그것은 완벽한 선택이야.", correct: false },
    ],
  },
  {
    question:
      "새로운 도서관이 열렸다는 소식을 듣고 친구에게 알리려고 합니다. 어떤 표현이 적당할까요?",
    answers: [
      { text: "도서관에 가자.", correct: false },
      { text: "새로운 도서관이 생겼어.", correct: true },
      { text: "책을 좋아하는 사람들에게 좋은 소식이야.", correct: false },
      { text: "내일 도서관에 가려고 해.", correct: false },
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
  questionElement.innerHTML = `총 맞은 개수는 ${questions.length}문제 중 ${score}문제 맞았습니다!`;
  nextButton.innerHTML = "다시 풀어보기!";
  nextButton.style.display = "block";
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
