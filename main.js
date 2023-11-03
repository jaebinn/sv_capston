document
  .getElementById("myCarousel")
  .addEventListener("slid.bs.carousel", function () {
    var activeSlide = document.querySelector(".carousel-item.active");
    var buttons = activeSlide.querySelectorAll(".btn");
    buttons.forEach(function (button) {
      button.style.display = "block";
    });
  });

document
  .getElementById("myCarousel")
  .addEventListener("slide.bs.carousel", function () {
    var activeSlide = document.querySelector(".carousel-item.active");
    var buttons = activeSlide.querySelectorAll(".btn");
    buttons.forEach(function (button) {
      button.style.display = "none";
    });
  });
