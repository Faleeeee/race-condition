const apiUrl = "http://localhost:3001/api/auth";

async function handleRegisterForm(event) {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;

  try {
    const response = await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });

    if (response.ok) {
      alert("Registration successful!");
      loadHTML("home", "partials/login.html");
    } else {
      const errorData = await response.json();
      alert("Registration failed: " + (errorData.message || "Unknown error"));
    }
  } catch (error) {
    console.error("API call error:", error);
    alert("An error occurred. Please try again later.");
  }
}

async function handleLoginForm(event) {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem("userEmail", email);
      loadHTML("home", "partials/home.html");
      updateUserHeader(email);
    } else {
      const errorData = await response.json();
      alert("Login failed: " + (errorData.message || "Unknown error"));
    }
  } catch (error) {
    console.error("API call error:", error);
    alert("An error occurred. Please try again later.");
  }
}

function handleLogout() {
  localStorage.removeItem("userEmail");
  updateUserHeader(null);
  alert("Logged out successfully!");
}
