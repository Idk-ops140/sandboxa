// Persistent Data
let users = JSON.parse(localStorage.getItem("users")) || { "defaultUser": { password: "password", coins: 0, christmasPack: false } };
let elements = JSON.parse(localStorage.getItem("elements")) || {
  "Water": { type: "liquid", description: "Essential for life." },
  "Sand": { type: "solid", description: "A granular material." },
  "Fire": { type: "gas", description: "A source of heat and light." },
  "Sapling": { type: "living", description: "A young tree." },
  "Humans": { type: "living", description: "Human beings." },
  "Flea": { type: "living", description: "A tiny parasite." },
  "Malaria": { type: "disease", description: "A dangerous disease transmitted by mosquitoes." },
  "Disease": { type: "customization", description: "A variety of diseases." },
  "Virus": { type: "customization", description: "Viruses that affect living organisms." },
  "Car": { type: "solid", description: "A vehicle used for transport." },
  "Acid": { type: "liquid", description: "A corrosive substance." },
  "Bleach": { type: "liquid", description: "A disinfectant liquid." },
  "Soap": { type: "liquid", description: "A cleaning agent." },
  "Paint": { type: "liquid", description: "A substance used for coloring surfaces." },
  "Canvas": { type: "solid", description: "A surface for painting." },
};

let currentUser = null;
let christmasEndDate = new Date("2024-12-27");

// Show Christmas Pop-Up
const today = new Date();
if (today < christmasEndDate) {
  document.getElementById("christmas-popup").style.display = "block";
}

// Close Christmas Pop-Up
document.getElementById("close-popup-btn").addEventListener("click", () => {
  document.getElementById("christmas-popup").style.display = "none";
});

// Loading Screen
let loadingProgress = 0;
let loadingInterval = setInterval(() => {
  loadingProgress += 1;
  document.getElementById("loading-bar").style.width = `${loadingProgress}%`;
  if (loadingProgress >= 100) {
    clearInterval(loadingInterval);
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }
}, 50);

// Check Login Status
function checkLogin() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    updateHomebar();
    dailyReward();
  }
}

// Daily Coins Reward
function dailyReward() {
  const lastLogin = localStorage.getItem("lastLogin");
  const today = new Date().toISOString().split("T")[0];

  if (lastLogin !== today) {
    users[currentUser].coins += 5;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("lastLogin", today);
    updateHomebar();
  }
}

// Update Homebar
function updateHomebar() {
  document.getElementById("username-display").textContent = currentUser ? `Welcome, ${currentUser}` : "";
  document.getElementById("coins-display").textContent = currentUser ? users[currentUser].coins : 0;
}

// Game Version Selection
document.querySelectorAll(".game-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const version = btn.dataset.version;
    alert(`You have selected the ${version} version!`);
    // Redirect to game version page or load the game
  });
});

// Login / Sign-Up System
document.getElementById("login-btn").addEventListener("click", () => {
  if (currentUser) {
    currentUser = null;
    localStorage.removeItem("currentUser");
    updateHomebar();
  } else {
    // Handle Login/Sign-Up (Show Modal)
    alert("Please log in or sign up.");
  }
});

// Initialize
checkLogin();
