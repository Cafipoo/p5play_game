const fs = require('fs');
const noise = require('perlin-noise');

const width = 3000;
const height = 900;
const borderSize = Math.floor(Math.random() * 6) + 5; // Random border size between 5 and 10

let grid = [];

// Create the grid with Perlin noise for island shape
for (let i = 0; i < width; i++) {
    grid[i] = [];
    for (let j = 0; j < height; j++) {
        let noiseVal = noise.simplex2(i * 0.01, j * 0.01);
        if (i < borderSize || i >= width - borderSize || j < borderSize || j >= height - borderSize) {
            grid[i][j] = 0; // Water
        } else if (noiseVal > 0.4) {
            grid[i][j] = 1; // Land
        } else {
            grid[i][j] = 0; // Water
        }
    }
}

// Save the grid to a JSON file
fs.writeFileSync('data.json', JSON.stringify({ grid: grid }));