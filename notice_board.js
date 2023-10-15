document.addEventListener("DOMContentLoaded", function () {
  const postForm = document.getElementById("post-form");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const postsList = document.getElementById("posts");

  postForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = titleInput.value;
    const content = contentInput.value;
    if (title && content) {
      addPost(title, content);
      titleInput.value = "";
      contentInput.value = "";
    }
  });

  function addPost(title, content) {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
    postsList.appendChild(li);
  }
});
