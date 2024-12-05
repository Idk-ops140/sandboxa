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
  dirt: {
    color: '#8B4513',
    solid: true,
    flammable: false,
    density: 2
  },
  sand: {
    color: '#F4A460',
    solid: true,
    flammable: false,
    density: 1.6
  },
  glass: {
    color: '#87CEFA',
    solid: true,
    flammable: false,
    density: 2.5
  },
  water: {
    color: '#0000FF',
    solid: false,
    liquid: true,
    density: 1,
    flammable: false
  },
  fire: {
    color: '#FF4500',
    solid: false,
    spreads: true,
    flammable: true
  },
  blood: {
    color: '#8B0000',
    solid: false,
    liquid: true,
    density: 1.05,
    flammable: false
  },
  mud: {
    color: '#6B4226',
    solid: true,
    flammable: false,
    density: 2
  },
  'rock-wall': {
    color: '#808080',
    solid: true,
    flammable: false,
    density: 3
  },
  steam: {
    color: '#AAAAAA',
    solid: false,
    liquid: false,
    gas: true,
    density: 0.6,
    flammable: false
  },
  ash: {
    color: '#555555',
    solid: true,
    flammable: false,
    density: 1
  },
  'sugar-water': {
    color: '#ADD8E6',
    solid: false,
    liquid: true,
    density: 1.1,
    flammable: false
  },
  honey: {
    color: '#FFD700',
    solid: false,
    liquid: true,
    density: 1.36,
    flammable: false
  },
  soap: {
    color: '#FFF5EE',
    solid: false,
    liquid: true,
    density: 0.9,
    flammable: false
  },
  glue: {
    color: '#F8F8FF',
    solid: true,
    flammable: false,
    density: 1.2
  }
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
