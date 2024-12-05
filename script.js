// Load the game after the loading screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 5000); // Adjust time as needed (5 seconds here)
});

// Game logic remains the same
const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth - 320;
canvas.height = window.innerHeight;

// Pixel size and grid setup
const size = 10; // Pixel size
const gridWidth = Math.floor(canvas.width / size);
const gridHeight = Math.floor(canvas.height / size);
const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));

// Default material and tool
let currentMaterial = 'dirt';
let currentTool = 'draw'; // 'draw' or 'erase'

// Material properties
const materialProperties = {
  dirt: { color: '#8B4513', solid: true },
  sand: { color: '#F4A460', solid: true },
  glass: { color: '#87CEFA', solid: true },
  water: { color: '#0000FF', solid: false, liquid: true },
  fire: { color: '#FF4500', solid: false, spreads: true },
  blood: { color: '#8B0000', solid: false, liquid: true }
};

// Material mixing rules
const mixingRules = {
  water: {
    dirt: 'mud',
    fire: 'steam',
    blood: 'red-water'
  },
  fire: {
    sand: 'glass'
  }
};

// Tool and material selection logic
document.querySelectorAll('.material').forEach(button => {
  button.addEventListener('click', () => {
    currentMaterial = button.dataset.type;
  });
});

document.getElementById('draw-tool').addEventListener('click', () => {
  currentTool = 'draw';
});
document.getElementById('erase-tool').addEventListener('click', () => {
  currentTool = 'erase';
});

// Drawing and erasing
canvas.addEventListener('mousedown', (event) => {
  handleInteraction(event);
  canvas.addEventListener('mousemove', handleInteraction);
});

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', handleInteraction);
});

function handleInteraction(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / size);
  const y = Math.floor((event.clientY - rect.top) / size);

  if (currentTool === 'draw' && !grid[y][x]) {
    grid[y][x] = currentMaterial;
  } else if (currentTool === 'erase') {
    grid[y][x] = null;
  }

  drawGrid();
}

// Physics and grid drawing logic
function updateGrid() {
  // Update logic remains the same
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const material = grid[y][x];
      if (material) {
        ctx.fillStyle = materialProperties[material].color;
        ctx.fillRect(x * size, y * size, size, size);
      }
    }
  }
}

// Animation loop
function animate() {
  updateGrid();
  requestAnimationFrame(animate);
}
animate();
