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
  blood: { color: '#8B0000', solid: false, liquid: true },
  mud: { color: '#6B4226', solid: true },
  'rock-wall': { color: '#808080', solid: true },
  steam: { color: '#AAAAAA', solid: false },
  ash: { color: '#555555', solid: true },
  'sugar-water': { color: '#ADD8E6', solid: false, liquid: true },
  honey: { color: '#FFD700', solid: false, liquid: true },
  soap: { color: '#FFF5EE', solid: false },
  glue: { color: '#F8F8FF', solid: true }
};

// Material mixing rules
const mixingRules = {
  water: {
    dirt: 'mud',
    fire: 'steam',
    blood: 'red-water'
  },
  fire: {
    sand: 'glass',
    'rock-wall': 'ash'
  },
  'sugar-water': {
    fire: 'caramel'
  }
};

// Listen for material selection
document.querySelectorAll('.material').forEach(button => {
  button.addEventListener('click', () => {
    currentMaterial = button.dataset.type;
  });
});

// Listen for tool selection
document.getElementById('draw-tool').addEventListener('click', () => {
  currentTool = 'draw';
});
document.getElementById('erase-tool').addEventListener('click', () => {
  currentTool = 'erase';
});

// Handle canvas interaction
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

        // Check for mixing
        const neighbors = [
          [y - 1, x],
          [y + 1, x],
          [y, x - 1],
          [y, x + 1]
        ];

        neighbors.forEach(([ny, nx]) => {
          if (ny >= 0 && ny < gridHeight && nx >= 0 && nx < gridWidth) {
            const neighbor = grid[ny][nx];
            if (neighbor && mixingRules[material]?.[neighbor]) {
              grid[y][x] = mixingRules[material][neighbor];
              grid[ny][nx] = null;
            }
          }
        });
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
