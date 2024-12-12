// Variables
let asticreds = 0; // Initialize Asticreds
let maxSlots = 30; // Default maximum slots
const userSlots = []; // Array to store user-created slots

// Load saved data from localStorage
function loadSavedData() {
  asticreds = parseInt(localStorage.getItem("asticreds")) || 12; // Default 12 Asticreds on first visit
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
    slotsContainer.appendChild(slotButton);
  });
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
  document.getElementById("credits-page-btn").addEventListener("click", () => {
    document.getElementById("homepage").style.display = "none";
    document.getElementById("credits-page").style.display = "block";
  });
  document.getElementById("back-to-home").addEventListener("click", () => {
    document.getElementById("credits-page").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  });
  document.getElementById("purchase-plus").addEventListener("click", () => {
    if (asticreds >= 100) {
      asticreds -= 100;
      maxSlots = 100;
      saveData();
      updateAsticredsDisplay();
      alert("Plus unlocked! You now have access to more slots and buttons.");
    } else {
      alert("Not enough Asticreds!");
    }
  });
}

// Start the game
init();
