// Persistent Data
let users = JSON.parse(localStorage.getItem("users")) || { "Astikour_MGames": { password: "admin123", asticreds: 0 } };
let games = JSON.parse(localStorage.getItem("games")) || {
  "Astikour": { description: "The classic Astikour game.", quests: [] },
  "Sandboxa": { description: "The original sandbox game.", quests: [] },
  "ChristmasQuest1": { description: "Help Santa with his gifts!", quests: ["Collect 10 gifts", "Build a snowman"] },
  "ChristmasQuest2": { description: "Explore a snowy wonderland!", quests: ["Find the hidden cave", "Defeat the snow monster"] },
};

let currentUser = null;

// Show Christmas Pop-Up
const today = new Date();
const eventEnd = new Date("2024-12-27");
if (today < eventEnd) {
  document.getElementById("christmas-popup").style.display = "block";
}

// Close Christmas Pop-Up
document.getElementById("close-popup-btn").addEventListener("click", () => {
  document.getElementById("christmas-popup").style.display = "none";
});

// Check Login Status
function checkLogin() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    updateHomebar();
    dailyReward();
  }
}

// Daily Asticreds Reward
function dailyReward() {
  const lastLogin = localStorage.getItem("lastLogin");
  const today = new Date().toISOString().split("T")[0];

  if (lastLogin !== today) {
    users[currentUser].asticreds += 5;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("lastLogin", today);
    updateHomebar();
  }
}

// Update Homebar
function updateHomebar() {
  document.getElementById("username-display").textContent = currentUser ? `Welcome, ${currentUser}` : "";
  document.getElementById("asticreds-display").textContent = currentUser ? users[currentUser].asticreds : 0;
}

// Save Game Data
function saveGameData() {
  localStorage.setItem("games", JSON.stringify(games));
}

// Login System
document.getElementById("login-btn").addEventListener("click", () => {
  if (currentUser) {
    currentUser = null;
    localStorage.removeItem("currentUser");
    updateHomebar();
  } else {
    // Handle Login/Sign-Up Modal
    // (Reuse login/sign-up modal code here)
  }
});

// Initialize
checkLogin();
saveGameData();
