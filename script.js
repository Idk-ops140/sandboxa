window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');

  // Simulate loading time
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 5000); // Adjust as needed
});

const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');

// Responsive canvas setup
function setupCanvas() {
  if (window.innerWidth < 768) {
    // Mobile or tablet
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
  } else {
    // Desktop
    canvas.width = window.innerWidth - 320;
    canvas.height = window.innerHeight;
  }
}
setupCanvas();

// Grid setup
const size = 10; // Size of each pixel
const gridWidth = Math.floor(canvas.width / size);
const gridHeight = Math.floor(canvas.height / size);
const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));

// Default material and tool
let currentMaterial = 'dirt';
let currentTool = 'draw'; // 'draw' or 'erase'

// Physics update interval
const physicsInterval = 50;

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

// Touch and mouse support
function getCursorPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX || event.touches[0].clientX - rect.left) / size);
  const y = Math.floor((event.clientY || event.touches[0].clientY - rect.top) / size);
  return { x, y };
}

canvas.addEventListener('mousedown', (event) => {
  handleInteraction(getCursorPosition(event));
  canvas.addEventListener('mousemove', (e) => handleInteraction(getCursorPosition(e)));
});

canvas.addEventListener('mouseup', () => {
  canvas.removeEventListener('mousemove', handleInteraction);
});

canvas.addEventListener('touchstart', (event) => {
  handleInteraction(getCursorPosition(event));
  canvas.addEventListener('touchmove', (e) => handleInteraction(getCursorPosition(e)));
});

canvas.addEventListener('touchend', () => {
  canvas.removeEventListener('touchmove', handleInteraction);
});

function handleInteraction({ x, y }) {
  if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) return;
  if (currentTool === 'draw' && !grid[y][x]) {
    grid[y][x] = currentMaterial;
  } else if (currentTool === 'erase') {
    grid[y][x] = null;
  }
  drawGrid();
}

// Physics system
function updateGrid() {
  for (let y = gridHeight - 1; y >= 0; y--) {
    for (let x = 0; x < gridWidth; x++) {
      const material = grid[y][x];
      if (!material) continue;

      const properties = materialProperties[material];

      if (properties.liquid) {
        // Gravity for liquids
        if (y + 1 < gridHeight && !grid[y + 1][x]) {
          grid[y + 1][x] = material;
          grid[y][x] = null;
        } else if (x - 1 >= 0 && !grid[y + 1][x - 1]) {
          grid[y + 1][x - 1] = material;
          grid[y][x] = null;
        } else if (x + 1 < gridWidth && !grid[y + 1][x + 1]) {
          grid[y + 1][x + 1] = material;
          grid[y][x] = null;
        }
      }

      if (material === 'fire') {
        // Fire spreading
        const neighbors = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1]
        ];

        neighbors.forEach(([nx, ny]) => {
          if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
            const neighbor = grid[ny][nx];
            if (neighbor && materialProperties[neighbor].flammable) {
              grid[ny][nx] = 'fire';
            }
          }
        });

        // Fire extinguishes on liquids
        if (y + 1 < gridHeight && materialProperties[grid[y + 1][x]]?.liquid) {
          grid[y][x] = null;
        }
      }
    }
  }
  drawGrid();
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
  setTimeout(() => requestAnimationFrame(animate), physicsInterval);
}
animate();
