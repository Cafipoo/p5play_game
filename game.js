let bricks = [];
let left = [];
let top1 = [];
let bot = [];
let lefttop = [];
let lefttopcorner = [];
let rightTuile = [];
let midTuile = [];
let leftTuile = [];
let leftbot = [];
let leftb = [];
let cornerRT = [];
let cornerbc = [];
let right = [];
let rightb = [];
let leftCorner = [];    
let tilesGroup = [];
let player;
let landImage;
let tileWidth = 40;
let tileHeight = 40;
let obstacles = [];
let gridSize = 10;
let zoomFactor = 4;
let currentImage = 0;
let lastToggleTime = 0;
let toggleInterval = 250;
let num = 1;
let vPressedPreviously = false;
function setup() {
    createCanvas(windowWidth, windowHeight);

    playerImage = loadImage('./assets/perso1.png');
    playerImage2 = loadImage('./assets/perso2.png');
    playerImage3 = loadImage('./assets/perso3.png');
    playerImage4 = loadImage('./assets/perso4.png');
    rightImage = loadImage('./assets/right.png');
    leftCornerImage = loadImage('./assets/cornerleft.png');
    leftImage = loadImage('./assets/left.png');
    topImage = loadImage('./assets/top.png');
    botImage = loadImage('./assets/bot.png');
    rightCornerImage = loadImage('./assets/rightcorner.png');
    rightbcImage = loadImage('./assets/rightbc.png');
    rightbImage = loadImage('./assets/rightb.png');
    leftbImage = loadImage('./assets/leftb.png');
    lefttopImage = loadImage('./assets/lefttop.png');
    lefttopcornerImage = loadImage('./assets/lefttopcorner.png');
    leftbotImage = loadImage('./assets/leftbotcorner.png');
    leftTuileImage = loadImage('./assets/lefttuile.png');
    rightTuileImage = loadImage('./assets/righttuile.png');
    midTuileImage = loadImage('./assets/midtuile.png');

    landImage = loadImage('./assets/land.svg');    // Image pour les briques
    // Carte en grille
    tilesGroup = [
        '...........wtttc...........',
        '...........l===o..........',
        '.......wttty===ittc.....',
        '.......l=======azeo.......',
        '.......l==========o.......',
        '.......l==========o.......',
        '.......l==========o.......',
        '.......l==========o.......',
        '.......l==========o.......',
        '.......l==========o.......',
        '.......nbbbd===xbbr........',
        '...........l===o..........',
        '...........nbbbr.......',
    ];

    // Création des briques
    for (let row = 0; row < tilesGroup.length; row++) {
        for (let col = 0; col < tilesGroup[row].length; col++) {
            if (tilesGroup[row][col] === '=') {
                // Ajout d'une brique
                bricks.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'o') {
                // Ajout d'un obstacle
                right.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'i') {
                // Ajout d'un obstacle
                leftCorner.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'l') {
                // Ajout d'un obstacle
                left.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 't') {
                // Ajout d'un obstacle
                top1.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'b') {
                // Ajout d'un obstacle
                bot.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'c') {
                // Ajout d'un obstacle
                cornerRT.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'x') {
                // Ajout d'un obstacle
                cornerbc.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'r') {
                // Ajout d'un obstacle
                rightb.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'n') {
                // Ajout d'un obstacle
                leftb.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'w') {
                // Ajout d'un obstacle
                lefttop.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'y') {
                // Ajout d'un obstacle
                lefttopcorner.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'd') {
                // Ajout d'un obstacle
                leftbot.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'a') {
                // Ajout d'un obstacle
                leftTuile.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'e') {
                // Ajout d'un obstacle
                rightTuile.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
            }
            else if (tilesGroup[row][col] === 'z') {
                // Ajout d'un obstacle
                midTuile.push({
                    x: col * tileWidth,
                    y: row * tileHeight,
                    w: tileWidth,
                    h: tileHeight,
                });
        }
    }
    }
    player = new Sprite();
    player.width = tileWidth;
    player.height = tileHeight;
    player.image = playerImage;

    // Placer le joueur au centre de la carte
    player.x = (tilesGroup[0].length * tileWidth) / 2;
    player.y = (tilesGroup.length * tileHeight) / 2;

    player.scale = 0.010;

    // Set up basic player movement
    player.friction = 0.1;
    player.maxSpeed = 4;
}


function draw() {
    background(0,0,255);
    translate(width / 2, height / 2);
    scale(zoomFactor);
    translate(-player.x, -player.y);
    // Dessiner les briques avec des images
    for (let brick of bricks) {
        image(landImage, brick.x, brick.y, brick.w, brick.h); // Dessiner chaque brique avec l'image
    }
    for (let lefts of right) {
        image(rightImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftCorner) {
        image(leftCornerImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of left) {
        image(leftImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of top1) {
        image(topImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of bot) {
        image(botImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of cornerRT) {
        image(rightCornerImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of cornerbc) {
        image(rightbcImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of rightb) {
        image(rightbImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftb) {
        image(leftbImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of lefttop) {
        image(lefttopImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of lefttopcorner) {
        image(lefttopcornerImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftbot) {
        image(leftbotImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of leftTuile) {
        image(leftTuileImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of rightTuile) {
        image(rightTuileImage, lefts.x, lefts.y, lefts.w, lefts.h);
    }
    for (let lefts of midTuile) {
        image(midTuileImage, lefts.x, lefts.y, lefts.w, lefts.h);
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
    if (mouseIsPressed && mouseButton === RIGHT && !vPressedPreviously) {
        vPressedPreviously = true;
        if (num >= 2) {
            num = 0;
        }
        num += 1;
        togglePlayerImage();

        // Reset key press after 200ms
        setTimeout(() => {
            vPressedPreviously = false;
        }, 200);
    }

    // Calcul de la nouvelle position
    let newPlayerX = player.x + newVelX;
    let newPlayerY = player.y + newVelY;

    // Vérification des collisions avec les zones autorisées (=)
    let canMove = bricks.some(brick => {
        return (
            newPlayerX + player.width / 2 > brick.x &&
            newPlayerX - player.width / 2 < brick.x + brick.w &&
            newPlayerY + player.height / 2 > brick.y &&
            newPlayerY - player.height / 2 < brick.y + brick.h
        );
    });

    if (canMove) {
        player.x = newPlayerX;
        player.y = newPlayerY;
    }
    

}

function maybeTogglePlayerImage() {
    if (millis() - lastToggleTime > toggleInterval) {
        togglePlayerImage();
        lastToggleTime = millis();
    }
}

function togglePlayerImage() {
    currentImage = (currentImage + 1) % 2;
    if (num === 1) {
        player.image = currentImage === 0 ? playerImage : playerImage2;
    } else if (num === 2) {
        player.image = currentImage === 0 ? playerImage3 : playerImage4;
    }
}
