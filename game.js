// Game variables
let player;
let obstacles = [];
let projectiles = [];
let gridSize = 10;
let cols, rows;
let grid = [];
let islandSize = 2000;
let zoomFactor = 4;
let playerImage, playerImage2;
let currentImage = 0;
let lastToggleTime = 0; // Moment du dernier changement d'image
let toggleInterval = 250; // Intervalle de 250ms pour changer l'image
let land; // Image de terrain
let num = 1;
let vPressedPreviously = false;
function setup() {
    // Create the game canvas (16:9 aspect ratio)
    createCanvas(windowWidth, windowHeight);
    cols = islandSize / gridSize;
    rows = islandSize / gridSize;
    land = loadImage('land.svg'); // Charger l'image du terrain
    // Create the grid with Perlin noise for island shape
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            let noiseVal = noise(i * 0.01, j * 0.01);
            if (noiseVal > 0.4) {
                grid[i][j] = land; // Remplacer la couleur par l'image du terrain pour la terre
            } else {
                grid[i][j] = color(0, 0, 255); // Eau
            }
        }
    }
    // Generate the island map
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            let distanceToEdge = min(i, j, cols - i - 1, rows - j - 1);
            let maxWaterBorder = floor(random(5, 11));
            if (distanceToEdge < maxWaterBorder) {
                grid[i][j] = color(0, 0, 255); // Water
            } else {
                grid[i][j] = land; // Land
            }
        }
    }
    playerImage = loadImage('perso1.png');
    playerImage2 = loadImage('perso2.png');
    playerImage3 = loadImage('perso3.png');
    playerImage4 = loadImage('perso4.png');
    // Create the player sprite
    player = new Sprite();
    player.width = gridSize;
    player.height = gridSize;
    player.image = playerImage;
    player.x = width / 2;
    player.y = height / 2;
    player.scale = 0.010;
    // Set up basic player movement
    player.friction = 0.1;
    player.maxSpeed = 4;

    // Create green obstacles (no more gray obstacles)
obstacleImage = loadImage('pixil-frame-0_3.png');
for (let i = 0; i < 60; i++) {
    let obstacle = new Sprite();
    obstacle.width = 60;
    obstacle.height = 60;
    obstacle.image = obstacleImage;
    let x, y;
    do {
        x = floor(random(1, cols - 1)) * gridSize;
        y = floor(random(1, rows - 1)) * gridSize;
    } while (grid[x / gridSize][y / gridSize] !== land); // Vérifier si la case contient de la terre (image)
    obstacle.x = x;
    obstacle.y = y;
    obstacle.immovable = true;
    obstacles.push(obstacle); // Ajoutez l'obstacle à la liste
}
}

function draw() {
    // Clear background
    background(220);

    // Apply zoom and center on player
    translate(width / 2, height / 2); // Center the canvas
    scale(zoomFactor);               // Apply the zoom
    translate(-player.x, -player.y); // Center on the player

    // Draw the grid with images and water
    for (let i = 0; i < cols; i++) {
        noStroke();
        for (let j = 0; j < rows; j++) {
            if (grid[i][j] instanceof p5.Image) {
                image(grid[i][j], i * gridSize, j * gridSize, gridSize, gridSize); // Draw land image
            } else {
                fill(grid[i][j]); // Fill with color (water)
                rect(i * gridSize, j * gridSize, gridSize, gridSize);
            }
        }
    }

    // Player movement controls
    let newVelX = 0;
    let newVelY = 0;
    if (kb.pressing('left')) {
        newVelX = -2;
        maybeTogglePlayerImage();
        player.mirror.x = true;
    }
    if (kb.pressing('right')) {
        newVelX = 2;
        player.mirror.x = false;
        maybeTogglePlayerImage();

    }
    if (kb.pressing('up')) {
        newVelY = -2;
        maybeTogglePlayerImage();
    }
    if (kb.pressing('down')) {
        newVelY = 2;
        maybeTogglePlayerImage();
    }
    if (kb.pressing('v') && !vPressedPreviously) { // Vérifie si 'v' est pressé et pas encore traité
        vPressedPreviously = true; // Marque comme enfoncée
        if (num >= 2) {
            num = 0;
        }
        num = num + 1;
        console.log(num);
        togglePlayerImage();

        // Réinitialise vPressedPreviously après 100ms
        setTimeout(() => {
            vPressedPreviously = false;
        }, 100);
    }
    // Calculate new position
    let newX = player.x + newVelX;
    let newY = player.y + newVelY;

    // Check for collisions with obstacles
    let collision = false;
    for (let obstacle of obstacles) {
        let distance = dist(newX, newY, obstacle.x, obstacle.y);
        if (distance < gridSize + 10) {
            collision = true;
            break;
        }
    }

    // Check if the new position is in the water (blue border)
    let col = floor(newX / gridSize);
    let row = floor(newY / gridSize);
    if (grid[col][row] === color(0, 0, 255)) {
        collision = true;
    }

    // Update player position if no collision
    if (!collision) {
        player.x = newX;
        player.y = newY;
    }

    // Prevent player from leaving the grid
    player.x = constrain(player.x, gridSize, (cols - 1) * gridSize - player.width);
    player.y = constrain(player.y, gridSize, (rows - 1) * gridSize - player.height);
}

function maybeTogglePlayerImage() {
    // Vérifie si le bouton 'v' est pressé
    if (kb.pressing('v')) {
        togglePlayerImage(); // Change immédiatement l'image
    } else {
        // Vérifie si 250ms sont passées depuis le dernier changement
        if (millis() - lastToggleTime > toggleInterval) {
            togglePlayerImage(); // Change l'image
            lastToggleTime = millis(); // Met à jour le dernier changement d'image
        }
    }
}


function togglePlayerImage() {
    currentImage = (currentImage + 1) % 2; // Change l'image
    if (num === 1){
        player.image = currentImage === 0 ? playerImage : playerImage2;
    }
    else if (num === 2){
        player.image = currentImage === 0 ? playerImage3 : playerImage4;
    }
}
