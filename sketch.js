var img;
var strokeThickness;
var strokeLength;
var strokeThicknessSlider;
var strokeLengthSlider;


function preload() {
    img = loadImage("assets/img".concat(Math.floor(random(0, 3))).concat(".jpg"));
}

function scribbleLines(targetImg) {
    var canvas = createCanvas(windowWidth, windowHeight);
    cursor("HAND");
    if (targetImg.pixels.length > 0) {
        var scribble = new Scribble();
        var pixelValueWidth = targetImg.width * 4;
        for (var imgHeightIndex = 0; imgHeightIndex < targetImg.height; imgHeightIndex += 8) {
            for (var pixelValueWidthIndex = 0; pixelValueWidthIndex < pixelValueWidth; pixelValueWidthIndex += 64) {
                var x1 = pixelValueWidthIndex / 4;
                var y1 = imgHeightIndex;
                var pixelValueBase = pixelValueWidth * imgHeightIndex + pixelValueWidthIndex;
                var r = targetImg.pixels[pixelValueBase];
                var g = targetImg.pixels[pixelValueBase + 1];
                var b = targetImg.pixels[pixelValueBase + 2];
                var a = 200;
                var x2 = x1 - strokeLength;
                var y2 = y1 + strokeLength;
                strokeWeight(strokeThickness);
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

    strokeThicknessSlider = createSlider(1, 50, 5, 1);
    strokeThicknessSlider.style('width', '120px');
    strokeThicknessSlider.position(5, img.height + 50);

    strokeLengthSlider = createSlider(5, 50, 25, 1);
    strokeLengthSlider.style('width', '120px');
    strokeLengthSlider.position(5, img.height + 100);

    scribbleLines(img);
}

function draw() {
    strokeThickness = strokeThicknessSlider.value(); // 2 default
    strokeLength = strokeLengthSlider.value() // 25 default

    scribbleLines(img);

    textSize(50);
    fill(255,0,255, 180);
    stroke(255,103,0);
    strokeWeight(2);
    text("stroke thickness", strokeThicknessSlider.x * 2 + strokeThicknessSlider.width, strokeThicknessSlider.y + strokeThicknessSlider.height / 2);
    text("stroke length", strokeLengthSlider.x * 2 + strokeLengthSlider.width, strokeLengthSlider.y + strokeLengthSlider.height / 2);
}
