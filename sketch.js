const canvasWidth = document.documentElement.clientWidth;
const canvasHeight = document.documentElement.clientHeight;

let font;
let particles = [];


function setup() {
    colorMode(HSB)
    const t = "Hover me"

    createCanvas(canvasWidth, canvasHeight);
    background(0)
    textSize(canvasHeight / 3);

    textSize(180);

    let points = font.textToPoints(t, canvasWidth / 2 - textWidth(t) / 2 - 40, canvasHeight / 2 + textAscent() / 3, 180);


    points.forEach((p, i) => particles.push(new Particle(p.x, p.y, 12, map(i, 0, points.length, 0, 360), canvasWidth, canvasHeight)));
}

function draw() {
    background(0);
    showParticles();
}

function showParticles() {
    particles.forEach(p => {
        p.behaviors();
        p.update();
        p.draw();
    })
}


function preload() {
    font = loadFont("PermanentMarker-Regular.ttf");
}
