const tabList = document.querySelectorAll(".tab_menu .list li");
const radio1 = document.getElementById("#radio1");
const radio2 = document.getElementById("#radio2");
const radio3 = document.getElementById("#radio3");
for (var i = 0; i < tabList.length; i++) {
  tabList[i].querySelector(".btn").addEventListener("click", function (e) {
    e.preventDefault();
    for (var j = 0; j < tabList.length; j++) {
      tabList[j].classList.remove("is_on");
    }
    this.parentNode.classList.add("is_on");
  });
}

radio1.addEventListener("change", function () {
  console.log("Option 1 selected");
});
radio2.addEventListener("change", function () {
  console.log("Option 2 selected");
});
radio3.addEventListener("change", function () {
  console.log("Option 3 selected");
});
