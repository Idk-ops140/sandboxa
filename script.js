const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth - 320;
canvas.height = window.innerHeight - 120;

// Default material
let currentMaterial = 'dirt';

// Listen for material selection
document.querySelectorAll('.material').forEach(button => {
  button.addEventListener('click', () => {
    currentMaterial = button.dataset.type;
  });
});

// Drawing functionality
canvas.addEventListener('mousemove', (event) => {
  if (event.buttons !== 1) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  drawPixel(x, y, currentMaterial);
});

function drawPixel(x, y, material) {
  const size = 10; // Pixel size
  const colorMap = {
    dirt: '#8B4513',
    sand: '#F4A460',
    glass: '#87CEFA',
    water: '#0000FF',
    'rock-wall': '#808080',
    mud: '#6B4226',
    carmel: '#D2691E',
    honey: '#FFD700',
    sap: '#FFE4B5',
    'sugar-water': '#ADD8E6',
    alcohol: '#C4E7FF',
    soap: '#FFF5EE',
    glue: '#F8F8FF',
    shampoo: '#E6E6FA',
    'living-cells': '#9ACD32',
    birds: '#FFB6C1',
    ant: '#4B0082',
    fish: '#4682B4',
    'salt-water': '#5F9EA0',
    algae: '#32CD32',
    flu: '#FF6347',
    'common-cold': '#7FFFD4',
    'covid-19': '#DC143C',
    'cell-plants': '#66CDAA',
    plants: '#228B22',
    wood: '#8B4513',
    seeds: '#D2B48C',
    'hazard-cells': '#FF4500',
    'cell-eggs': '#FFDAB9',
    'habitable-water': '#4169E1',
    'dirty-water': '#2F4F4F',
    grass: '#7CFC00',
    clouds: '#F0F8FF',
    'lighting-clouds': '#FFFF00'
  };

  ctx.fillStyle = colorMap[material] || '#FFFFFF';
  ctx.fillRect(Math.floor(x / size) * size, Math.floor(y / size) * size, size, size);
}
