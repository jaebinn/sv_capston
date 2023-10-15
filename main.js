let mainText = document.querySelector("#text2");
let subText = document.querySelector("#text3");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  console.log("scrollY", value);

  if (value > 200) {
    mainText.style.animation = "disappear 2s ease-out forwards";
  } else {
    mainText.style.animation = "slide 2s ease-out";
  }
  if (value > 300) {
    subText.style.animation = "disappear 2s ease-out forwards";
  } else {
    subText.style.animation = "cliptext 2s ease-out";
  }
});
