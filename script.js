window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('close-popup');

  // Show pop-up after loading
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    popup.style.display = 'block';
  }, 5000);

  // Close pop-up
  closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});

// (Rest of your script.js including physics improvements)

// Physics improvements for liquids and fire
function updateGrid() {
  for (let y = gridHeight - 1; y >= 0; y--) {
    for (let x = 0; x < gridWidth; x++) {
      const material = grid[y][x];
      if (!material) continue;

      const properties = materialProperties[material];

      if (properties.liquid) {
        // Improved gravity for liquids
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
        // Fire spreads to flammable materials
        const neighbors = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1]
        ];

        neighbors.forEach(([nx, ny]) => {
          if (nx >= 0 && nx < gridWidth && ny >= 0 && ny < gridHeight) {
            const neighbor = grid[ny][nx];
            if (neighbor && materialProperties[neighbor]?.flammable) {
              grid[ny][nx] = 'fire';
            }
          }
        });

        // Extinguish fire on liquids
        if (y + 1 < gridHeight && materialProperties[grid[y + 1][x]]?.liquid) {
          grid[y][x] = null;
        }
      }
    }
  }
  drawGrid();
}
