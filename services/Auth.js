function loadHTML(id, url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.log("Error loading HTML:", error));
}

// Tải các phần tử header, home và footer
loadHTML("header", "partials/header.html");
loadHTML("home", "partials/home.html");
loadHTML("footer", "partials/footer.html");

// Function để khởi tạo sự kiện cho các form
function initializeForms() {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const phone = document.getElementById("phone").value;

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          alert("Registration successful!");
          console.log(result);
        } else {
          const errorData = await response.json();
          alert(
            "Registration failed: " + (errorData.message || "Unknown error")
          );
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          alert("Login successful!");
          console.log(result);
        } else {
          const errorData = await response.json();
          alert("Login failed: " + (errorData.message || "Unknown error"));
        }
      } catch (error) {
        alert("An error occurred. Please try again later.");
      }
    });
  }
}

// Sử dụng MutationObserver để đợi nội dung `#home` tải xong
const homeObserver = new MutationObserver((mutations, observer) => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm || loginForm) {
    initializeForms();
    observer.disconnect(); // Ngừng quan sát sau khi forms đã được khởi tạo
  }
});

// Quan sát các thay đổi trong phần tử #home
document.addEventListener("DOMContentLoaded", () => {
  const homeElement = document.getElementById("home");
  homeObserver.observe(homeElement, { childList: true, subtree: true });
});
