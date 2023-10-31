// let mainText = document.querySelector("#text2");
// let subText = document.querySelector("#text3");

// /*스크롤 내릴때 윈도우의 Y값을 콘솔창에 출력하기*/
// window.addEventListener("scroll", function () {
//   let value = window.scrollY;
//   console.log("scrollY", value);

//   if (value > 200) {
//     mainText.style.animation = "disappear 2s ease-out forwards";
//   } else {
//     mainText.style.animation = "slide 2s ease-out";
//   }
//   if (value >= 300) {
//     subText.style.animation = "disappear 2s ease-out forwards";
//   } else {
//     subText.style.animation = "cliptext 2s ease-out";
//   }
// });

const sliderWrap = document.querySelector(".slider__wrap");
const sliderImg = document.querySelector(".slider__img"); //보여지는 영역
const sliderInner = document.querySelector(".slider__inner"); //움직이는 영역
const slider = document.querySelectorAll(".slider"); //개별 이미지
const sliderBtn = document.querySelector(".slider__btn"); //버튼
const sliderBtnPrev = document.querySelector(".prev"); //왼쪽버튼
const sliderBtnNext = document.querySelector(".next"); //오른쪽버튼

let currentIndex = 0; //현재 이미지
let sliderCount = slider.length; //이미지 갯수
let sliderWidth = sliderImg.offsetWidth; //이미지 가로값

// 이미지 총 길이 넣기
sliderInner.style.width = sliderWidth * sliderCount + "px";

// 이미지 움직이는 영역
function gotoSlider(num) {
  sliderInner.style.transition = "all 400ms";
  sliderInner.style.transform = "translateX(" + -sliderWidth * num + "px)";
  currentIndex = num;
}

// 왼쪽버튼 클릭
sliderBtnPrev.addEventListener("click", () => {
  let nextIndex = (currentIndex + sliderCount - 1) % sliderCount;
  gotoSlider(nextIndex);
  // 876543210 876543120
});

// 오른쪽버튼 클릭
sliderBtnNext.addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % sliderCount;
  gotoSlider(nextIndex);
  // 01234...8 01234...8
});
