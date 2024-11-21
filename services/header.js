function updateUserHeader(email) {
  const userMenu = document.querySelector(".user-menu .user-email");
  const loginOption = document.getElementById("loginOption");
  const registerOption = document.getElementById("registerOption");
  const logoutOption = document.getElementById("logoutOption");

  if (userMenu) userMenu.textContent = email || "Guest";

  const isLoggedIn = !!email;
  if (loginOption) loginOption.style.display = isLoggedIn ? "none" : "block";
  if (registerOption)
    registerOption.style.display = isLoggedIn ? "none" : "block";
  if (logoutOption) logoutOption.style.display = isLoggedIn ? "block" : "none";
}
