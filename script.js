// Authentication Data
let currentUser = null;
const users = JSON.parse(localStorage.getItem("users")) || { "Astikour_MGames": { password: "admin123", asticreds: 0 } };

// Check login status
function checkLogin() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    updateUserDisplay();
  }
}

// Update homebar display with user info
function updateUserDisplay() {
  if (currentUser) {
    document.getElementById("username-display").textContent = `Welcome, ${currentUser}`;
    document.getElementById("asticreds-display").textContent = users[currentUser].asticreds || 0;
    document.getElementById("login-btn").textContent = "Logout";
  }
}

// Login/Sign-Up functionality
document.getElementById("login-btn").addEventListener("click", () => {
  const authModal = document.getElementById("auth-modal");
  const authTitle = document.getElementById("auth-title");
  const authSubmit = document.getElementById("auth-submit");
  const authToggle = document.getElementById("auth-toggle");
  const authUsername = document.getElementById("auth-username");
  const authPassword = document.getElementById("auth-password");

  authModal.style.display = "flex";

  authToggle.addEventListener("click", () => {
    authTitle.textContent = authTitle.textContent === "Login" ? "Sign Up" : "Login";
    authToggle.textContent =
      authToggle.textContent === "Don't have an account? Sign Up" ? "Already have an account? Login" : "Don't have an account? Sign Up";
  });

  authSubmit.addEventListener("click", () => {
    const username = authUsername.value.trim();
    const password = authPassword.value;

    if (authTitle.textContent === "Login") {
      if (users[username] && users[username].password === password) {
        currentUser = username;
        localStorage.setItem("currentUser", currentUser);
        updateUserDisplay();
        authModal.style.display = "none";
      } else {
        alert("Invalid username or password.");
      }
    } else {
      if (!users[username]) {
        users[username] = { password, asticreds: 0 };
        localStorage.setItem("users", JSON.stringify(users));
        alert("Account created successfully!");
        authTitle.textContent = "Login";
      } else {
        alert("Username already exists.");
      }
    }
  });
});

// Initialize homepage
checkLogin();
