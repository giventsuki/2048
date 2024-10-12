let wrapper = document.querySelector('.wrapper');
let cells = document.querySelectorAll('.cell');
const hammer = new Hammer(wrapper);

const colors = {
  0: 'lightgray', // Для пустых ячеек
  2: '#d6b9b9', 
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f67c5f',
  128: '#f9f50e',
  256: '#edcf72',
  512: '#edcc61',
  1024: '#edc850',
  2048: '#edc53f',
  // Добавьте дополнительные цвета для больших значений, если необходимо
};

// Инициализация Hammer.js

// Обработка свайпов
hammer.on('swipe', function(event) {
  switch (event.direction) {
    case Hammer.DIRECTION_UP:
      keyW(); // Движение вверх
      break;
    case Hammer.DIRECTION_DOWN:
      keyS(); // Движение вниз
      break;
    case Hammer.DIRECTION_LEFT:
      keyA(); // Движение влево
      break;
    case Hammer.DIRECTION_RIGHT:
      keyD(); // Движение вправо
      break;
  }
});


const grid = [];
const size = 4;

function initializeGrid() {
  for (let i = 0; i < size; i++) {
    grid[i] = Array(size).fill(0); 
  }
  addRandomTile(); 
}

function addRandomTile() {
  let emptyTiles = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === 0) {
        emptyTiles.push({ x: i, y: j });
      }
    }
  }
  if (emptyTiles.length > 0) {
    const { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]; 
    grid[x][y] = Math.random() < 0.9 ? 2 : 4; 
  }
}

initializeGrid();
updateGridDisplay();
console.log(grid); 

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  switch(key) {
    case 'w': keyW(); break;
    case 'a': keyA(); break;
    case 's': keyS(); break;
    case 'd': keyD(); break;
    default: break;
  }
});

// Движение вверх
function keyW() {
  for (let j = 0; j < size; j++) {
    let merged = [false, false, false, false]; 
    for (let i = 0; i < size; i++) {
      if (grid[i][j] !== 0) {
        let row = i;
        while (row > 0 && grid[row - 1][j] === 0) {
          grid[row - 1][j] = grid[row][j];
          grid[row][j] = 0;
          row--;
        }
        if (row > 0 && grid[row - 1][j] === grid[row][j] && !merged[row - 1]) {
          grid[row - 1][j] *= 2; 
          grid[row][j] = 0; 
          merged[row - 1] = true; 
        }
      }
    }
  }
  addRandomTile(); 
  updateGridDisplay();
}

// Движение влево
function keyA() {
  for (let i = 0; i < size; i++) {
    let merged = [false, false, false, false]; 
    for (let j = 1; j < size; j++) {
      if (grid[i][j] !== 0) {
        let col = j;
        while (col > 0 && grid[i][col - 1] === 0) {
          grid[i][col - 1] = grid[i][col];
          grid[i][col] = 0;
          col--;
        }
        if (col > 0 && grid[i][col - 1] === grid[i][col] && !merged[col - 1]) {
          grid[i][col - 1] *= 2; 
          grid[i][col] = 0; 
          merged[col - 1] = true; 
        }
      }
    }
  }
  addRandomTile(); 
  updateGridDisplay();
}

// Движение вниз
function keyS() {
  for (let j = 0; j < size; j++) {
    let merged = [false, false, false, false]; 
    for (let i = size - 2; i >= 0; i--) {
      if (grid[i][j] !== 0) {
        let row = i;
        while (row < size - 1 && grid[row + 1][j] === 0) {
          grid[row + 1][j] = grid[row][j];
          grid[row][j] = 0;
          row++;
        }
        if (row < size - 1 && grid[row + 1][j] === grid[row][j] && !merged[row + 1]) {
          grid[row + 1][j] *= 2; 
          grid[row][j] = 0; 
          merged[row + 1] = true; 
        }
      }
    }
  }
  addRandomTile(); 
  updateGridDisplay();
}

// Движение вправо
function keyD() {
  for (let i = 0; i < size; i++) {
    let merged = [false, false, false, false]; 
    for (let j = size - 2; j >= 0; j--) {
      if (grid[i][j] !== 0) {
        let col = j;
        while (col < size - 1 && grid[i][col + 1] === 0) {
          grid[i][col + 1] = grid[i][col];
          grid[i][col] = 0;
          col++;
        }
        if (col < size - 1 && grid[i][col + 1] === grid[i][col] && !merged[col + 1]) {
          grid[i][col + 1] *= 2; 
          grid[i][col] = 0; 
          merged[col + 1] = true; 
        }
      }
    }
  }
  addRandomTile(); 
  updateGridDisplay();
}

// Обновление отображения сетки
function updateGridDisplay() {
  cells.forEach((cell, index) => {
    let value = grid[Math.floor(index / size)][index % size];
    cell.textContent = value || '';
    cell.style.backgroundColor = colors[value] || 'lightgray'; // Используем цвет из объекта
  });
}
