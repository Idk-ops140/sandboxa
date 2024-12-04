const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth - 320;
canvas.height = window.innerHeight - 120;

// Pixel size and grid setup
const size = 10; // Pixel size
const gridWidth = canvas.width / size;
const gridHeight = canvas.height / size;
const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));

// Default material
let currentMaterial = 'dirt';

// Material properties
const materialProperties = {
  dirt: { color: '#8B4513', solid: true },
  sand: { color: '#F4A460', solid: true },
  glass: { color: '#87CEFA', solid: true },
  water: { color: '#0000FF', solid: false },
  'rock-wall': { color: '#808080', solid: true },
  mud: { color: '#6B4226', solid: true },
  carmel: { color: '#D2691E', solid: true },
  honey: { color: '#FFD700', solid: false },
  sap: { color: '#FFE4B5', solid: false },
  'sugar-water': { color: '#ADD8E6', solid: false },
  alcohol: { color: '#C4E7FF', solid: false },
  soap: { color: '#FFF5EE', solid: false },
  glue: { color: '#F8F8FF', solid: true },
  shampoo: { color: '#E6E6FA', solid: false },
  'living-cells': { color: '#9ACD32', solid: true },
  birds: { color: '#FFB6C1', solid: true },
  ant: { color: '#4B0082', solid: true },
  fish: { color: '#4682B4', solid: true },
  'salt-water': { color: '#5F9EA0', solid: false },
  algae: { color: '#32CD32', solid: true },
  flu: { color: '#FF6347', solid: true },
  'common-cold': { color: '#7FFFD4', solid: true },
  'covid-19': { color: '#DC143C', solid: true },
  'cell-plants': { color: '#66CDAA', solid: true },
  plants: { color: '#228B22', solid: true },
  wood: { color: '#8B4513', solid: true },
  seeds: { color: '#D2B48C', solid: true },
  'hazard-cells': { color: '#FF4500', solid: true },
  'cell-eggs': { color: '#FFDAB9', solid: true },
  'habitable-water': { color: '#4169E1', solid: false },
  'dirty-water': { color: '#2F4F4F', solid: false },
  grass: { color: '#7CFC00', solid: true },
  clouds: { color: '#F0F8FF', solid: true },
  'lighting-clouds': { color: '#FFFF00', solid: true }
};

// Listen for material selection
document.querySelectorAll('.material').forEach(button => {
  button.addEventListener('click', () => {
    currentMaterial = button.dataset.type;
  });
});

// Add a material to the grid and canvas
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / size);
  const y = Math.floor((event.clientY - rect.top) / size);

  if (!grid[y][x]) {
    grid[y][x] = currentMaterial;
    drawGrid();
  }
});

// Physics update
function updateGrid() {
  for (let y = gridHeight - 1; y >= 0; y--) {
    for (let x = 0; x < gridWidth; x++) {
      const material = grid[y][x];

      if (material && !materialProperties[material].solid) {
        // Try to move liquid down
        if (y + 1 < gridHeight && !grid[y + 1][x]) {
          grid[y + 1][x] = material;
          grid[y][x] = null;
        }
        // Try to move liquid diagonally left or right
        else if (
          y + 1 < gridHeight &&
          x - 1 >= 0 &&
          !grid[y + 1][x - 1]
        ) {
          grid[y + 1][x - 1] = material;
          grid[y][x] = null;
        } else if (
          y + 1 < gridHeight &&
          x + 1 < gridWidth &&
          !grid[y + 1][x + 1]
        ) {
          grid[y + 1][x + 1] = material;
          grid[y][x] = null;
        }
      }
    }
  }
  drawGrid();
}

// Draw the grid
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

// Start animation
animate();
