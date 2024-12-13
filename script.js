// Variables
let asticreds = 0;
const userSlots = [];
const games = {
  "Astikour": { description: "The modern sandbox game.", elements: ["Dirt", "Sand", "Water"] },
  "Original: Sandboxa": { description: "The classic Sandboxa experience.", elements: ["Glass", "Mud", "Fire"] },
};

// Load saved data from localStorage
function loadSavedData() {
  asticreds = parseInt(localStorage.getItem("asticreds")) || 12;
  const savedSlots = JSON.parse(localStorage.getItem("userSlots")) || [];
  savedSlots.forEach((slot) => userSlots.push(slot));
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("asticreds", asticreds);
  localStorage.setItem("userSlots", JSON.stringify(userSlots));
}

// Update Asticreds display
function updateAsticredsDisplay() {
  document.getElementById("asticreds").textContent = asticreds;
}

// Create new slot
function createNewSlot() {
  const slotName = prompt("Enter a name for your new game:");
  if (slotName) {
    userSlots.push(slotName);
    games[slotName] = { description: "Custom game slot.", elements: [] };
    saveData();
    renderSlots();
  }
}

// Render game slots
function renderSlots() {
  const slotsContainer = document.getElementById("slots");
  slotsContainer.innerHTML = "";
  for (const [name, data] of Object.entries(games)) {
    const slotButton = document.createElement("button");
    slotButton.classList.add("slot");
    slotButton.textContent = name;
    slotButton.dataset.name = name;
    slotsContainer.appendChild(slotButton);

    slotButton.addEventListener("click", () => {
      loadGameDetails(name, data.description);
    });
  }
}

// Load game details page
function loadGameDetails(gameName, description) {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("game-details-page").style.display = "block";

  document.getElementById("game-title").textContent = gameName;
  document.getElementById("game-description").textContent = description;

  document.getElementById("play-game-btn").onclick = () => {
    loadGame(gameName);
  };
}

// Load game
function loadGame(gameName) {
  document.getElementById("game-details-page").style.display = "none";
  document.getElementById("loading-screen").style.display = "block";

  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("game-page").style.display = "block";

    const elementsPanel = document.getElementById("elements-list");
    elementsPanel.innerHTML = "";

    // Add elements to the elements panel
    games[gameName].elements.forEach((element) => {
      const elementDiv = document.createElement("div");
      elementDiv.textContent = element;
      elementsPanel.appendChild(elementDiv);
    });

    // Add event listener for "Add Element"
    document.getElementById("add-element-btn").onclick = () => {
      const newElement = prompt("Enter the name of a new element:");
      if (newElement) {
        games[gameName].elements.push(newElement);
        saveData();
        loadGame(gameName); // Reload the game to update elements
      }
    };
  }, 3000);
}

// Initialize game
function init() {
  loadSavedData();
  updateAsticredsDisplay();
  renderSlots();

  // Event Listeners
  document.getElementById("create-slot").addEventListener("click", createNewSlot);
  document.getElementById("home-btn").addEventListener("click", () => {
    document.getElementById("game-details-page").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  });
  document.getElementById("home-btn-game").addEventListener("click", () => {
    document.getElementById("game-page").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  });
}

// Start the game
init();
