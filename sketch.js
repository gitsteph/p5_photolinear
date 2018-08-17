var img;


function preload() {
    img = loadImage("assets/baseimage".concat(Math.floor(random(0, 3))).concat(".jpg"));
}

function scribbleLines(targetImg) {
    var canvas = createCanvas(windowWidth, windowHeight);
    cursor("HAND");
    if (targetImg.pixels.length > 0) {
        var scribble = new Scribble();
        var pixelValueWidth = pixelDensity() * targetImg.width * 4;
        for (var imgHeightIndex = 0; imgHeightIndex < targetImg.height; imgHeightIndex += 8) {
            for (var pixelValueWidthIndex = 0; pixelValueWidthIndex < pixelValueWidth; pixelValueWidthIndex += 64) {
                var x1 = pixelValueWidthIndex / 4;
                var y1 = imgHeightIndex;
                var pixelValueBase = pixelValueWidth * imgHeightIndex + pixelValueWidthIndex;
                var r = targetImg.pixels[pixelValueBase];
                var g = targetImg.pixels[pixelValueBase + 1];
                var b = targetImg.pixels[pixelValueBase + 2];
                var a = 200;
                var x2 = x1 - 20;
                var y2 = y1 + 20;
                strokeWeight(2);
                stroke(r, g, b, 200);
                scribble.bowing = random(0, 1, 0.1);
                scribble.roughness = 1.5;
                scribble.maxOffset = 20;
                scribble.scribbleLine(x1, y1, x2, y2);
            }
        }
    }
}

function setup() {
    img.resize(0, Math.min((windowHeight - 100), 480));
    img.loadPixels();
    scribbleLines(img);
}

function draw() {
    scribbleLines(img);
}
