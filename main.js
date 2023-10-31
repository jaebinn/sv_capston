// let mainText = document.querySelector("#text2");
// let subText = document.querySelector("#text3");

// /*��ũ�� ������ �������� Y���� �ܼ�â�� ����ϱ�*/
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
const sliderImg = document.querySelector(".slider__img"); //�������� ����
const sliderInner = document.querySelector(".slider__inner"); //�����̴� ����
const slider = document.querySelectorAll(".slider"); //���� �̹���
const sliderBtn = document.querySelector(".slider__btn"); //��ư
const sliderBtnPrev = document.querySelector(".prev"); //���ʹ�ư
const sliderBtnNext = document.querySelector(".next"); //�����ʹ�ư

let currentIndex = 0; //���� �̹���
let sliderCount = slider.length; //�̹��� ����
let sliderWidth = sliderImg.offsetWidth; //�̹��� ���ΰ�

// �̹��� �� ���� �ֱ�
sliderInner.style.width = sliderWidth * sliderCount + "px";

// �̹��� �����̴� ����
function gotoSlider(num) {
  sliderInner.style.transition = "all 400ms";
  sliderInner.style.transform = "translateX(" + -sliderWidth * num + "px)";
  currentIndex = num;
}

// ���ʹ�ư Ŭ��
sliderBtnPrev.addEventListener("click", () => {
  let nextIndex = (currentIndex + sliderCount - 1) % sliderCount;
  gotoSlider(nextIndex);
  // 876543210 876543120
});

// �����ʹ�ư Ŭ��
sliderBtnNext.addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % sliderCount;
  gotoSlider(nextIndex);
  // 01234...8 01234...8
});
