// Variables
let asticreds = 0;
let maxSlots = 30;
const userSlots = [];
const games = {
  "Astikour": "Astikour Game Content",
  "Original: Sandboxa": "Original Sandboxa Content"
};

// Load saved data from localStorage
function loadSavedData() {
  asticreds = parseInt(localStorage.getItem("asticreds")) || 12;
  maxSlots = parseInt(localStorage.getItem("maxSlots")) || 30;
  const savedSlots = JSON.parse(localStorage.getItem("userSlots")) || [];
  savedSlots.forEach((slot) => userSlots.push(slot));
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("asticreds", asticreds);
  localStorage.setItem("maxSlots", maxSlots);
  localStorage.setItem("userSlots", JSON.stringify(userSlots));
}

// Update Asticreds display
function updateAsticredsDisplay() {
  document.getElementById("asticreds").textContent = asticreds;
}

// Create new slot
function createNewSlot() {
  if (userSlots.length < maxSlots) {
    const slotName = `Game Slot ${userSlots.length + 1}`;
    userSlots.push(slotName);
    saveData();
    renderSlots();
  } else {
    alert("You have reached the maximum number of slots. Upgrade to Plus for more!");
  }
}

// Render game slots
function renderSlots() {
  const slotsContainer = document.getElementById("slots");
  slotsContainer.innerHTML = `
    <button class="slot" data-name="Astikour">Astikour</button>
    <button class="slot" data-name="Original: Sandboxa">Original: Sandboxa</button>
  `;
  userSlots.forEach((slot) => {
    const slotButton = document.createElement("button");
    slotButton.classList.add("slot");
    slotButton.textContent = slot;
    slotButton.dataset.name = slot;
    slotsContainer.appendChild(slotButton);
  });

  // Add click event listeners to all slots
  const slotButtons = document.querySelectorAll(".slot");
  slotButtons.forEach((button) => {
    button.addEventListener("click", () => loadGame(button.dataset.name));
  });
}

// Load game when a slot is clicked
function loadGame(gameName) {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("credits-page").style.display = "none";
  document.getElementById("game-page").style.display = "block";

  document.getElementById("game-title").textContent = gameName;
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 600;

  // Placeholder for game logic
  ctx.fillStyle = "#00bfff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText(`${gameName} is loading...`, 50, 50);
}

// Edit game name
function editGameName() {
  const newName = prompt("Enter the new game name:");
  if (newName) {
    document.getElementById("game-title").textContent = newName;
    saveData();
  }
}

// Initialize game
function init() {
  loadSavedData();
  updateAsticredsDisplay();
  renderSlots();

  // Show homepage after loading screen
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  }, 5000);

  // Event Listeners
  document.getElementById("create-slot").addEventListener("click", createNewSlot);
  document.getElementById("go-home-btn").addEventListener("click", () => {
    document.getElementById("game-page").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  });
  document.getElementById("customize-btn").addEventListener("click", () => {
    alert("Customize feature coming soon!");
  });
  document.getElementById("edit-name-btn").addEventListener("click", editGameName);
}

// Start the game
init();
