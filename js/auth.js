const apiUrl = "http://localhost:3001/api/auth";

async function handleRegisterForm(event) {
  event.preventDefault();
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
      window.location.href = "login.html";
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
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Login successful!");
      localStorage.setItem("userId", data.user_id);
      localStorage.setItem("userEmail", email);
      window.location.href = "index.html";
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

const errorMessage = document.getElementById("errorMessage");
errorMessage.innerText = "An error occurred. Please try again later.";
if (response.status === 401) {
  alert("Invalid credentials");
} else if (response.status === 500) {
  alert("Server error. Please try again later.");
} else {
  alert("Unknown error occurred.");
}
