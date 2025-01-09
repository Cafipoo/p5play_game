// Game variables
let player;

function setup() {
    // Create the game canvas (16:9 aspect ratio)
    createCanvas(1280, 720);

    // Create the player sprite
    player = new Sprite();
    player.width = 32;
    player.height = 32;
    player.color = 'blue';

    // Set up basic player movement
    player.friction = 0.1;
    player.maxSpeed = 4;
}

function draw() {
    // Set the background
    background(220);

    // Player movement controls
    if (kb.pressing('left')) {
        player.vel.x = -2;
    }
    if (kb.pressing('right')) {
        player.vel.x = 2;
    }
    if (kb.pressing('up')) {
        player.vel.y = -2;
    }
    if (kb.pressing('down')) {
        player.vel.y = 2;
    }

    // In p5play v3, we don't need drawSprites() anymore
    // Sprites are automatically drawn
} 