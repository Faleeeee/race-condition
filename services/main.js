function loadHTML(id, url, callback = null) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error("Error loading HTML:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "partials/header.html", setupNavigation);
  loadHTML("home", "partials/home.html");
  loadHTML("footer", "partials/footer.html");

  document.getElementById("home").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (event.target.id === "registerForm") {
      await handleRegisterForm(event);
    } else if (event.target.id === "loginForm") {
      await handleLoginForm(event);
    }
  });
});

function setupNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = link.getAttribute("data-page");
      if (page) loadHTML("home", page);
    });
  });

  const email = localStorage.getItem("userEmail");
  if (email) {
    updateUserHeader(email);
  }
}
