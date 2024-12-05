const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth - 320;
canvas.height = window.innerHeight - 120;

// Pixel size and grid setup
const size = 10; // Pixel size
const gridWidth = Math.floor(canvas.width / size);
const gridHeight = Math.floor(canvas.height / size);
const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));

// Default material
let currentMaterial = 'dirt';

// Material properties
const materialProperties = {
  dirt: { color: '#8B4513', solid: true },
  sand: { color: '#F4A460', solid: true },
  glass: { color: '#87CEFA', solid: true },
  water: { color: '#0000FF', solid: false, liquid: true },
  'rock-wall': { color: '#808080', solid: true },
  fire: { color: '#FF4500', solid: false, spreads: true },
  blood: { color: '#8B0000', solid: false, liquid: true },
  mud: { color: '#6B4226', solid: true },
  carmel: { color: '#D2691E', solid: true },
  honey: { color: '#FFD700', solid: false, liquid: true },
  sap: { color: '#FFE4B5', solid: false, liquid: true },
  'sugar-water': { color: '#ADD8E6', solid: false, liquid: true },
  alcohol: { color: '#C4E7FF', solid: false, liquid: true },
  soap: { color: '#FFF5EE', solid: false, liquid: true },
  glue: { color: '#F8F8FF', solid: true },
  shampoo: { color: '#E6E6FA', solid: false, liquid: true },
  'living-cells': { color: '#9ACD32', solid: true }
};

// Listen for material selection
document.querySelectorAll('.material').forEach(button => {
  button.addEventListener('click', () => {
    currentMaterial = button.dataset.type;
  });
});

// Add a material to the grid
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
      if (material) {
        const properties = materialProperties[material];

        // Liquids: Flow down and sideways
        if (properties.liquid) {
          if (y + 1 < gridHeight && !grid[y + 1][x]) {
            grid[y + 1][x] = material;
            grid[y][x] = null;
          } else if (
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

        // Fire: Spread to nearby flammable materials
        if (properties.spreads) {
          const neighbors = [
            [y - 1, x],
            [y + 1, x],
            [y, x - 1],
            [y, x + 1]
          ];

          neighbors.forEach(([ny, nx]) => {
            if (ny >= 0 && ny < gridHeight && nx >= 0 && nx < gridWidth) {
              const neighbor = grid[ny][nx];
              if (neighbor && materialProperties[neighbor]?.flammable) {
                grid[ny][nx] = 'fire';
              }
            }
          });
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

// Show pop-up window for the update
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.createElement('div');
  popup.id = 'popup';
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Welcome to the New Update!</h2>
      <p>We've added fire, blood, and enhanced physics to Sandboxa. Start creating!</p>
      <button id="close-popup">Close</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById('close-popup').addEventListener('click', () => {
    popup.style.display = 'none';
  });
});
