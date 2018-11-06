var canvas;
var img;
var reader;
var strokeThickness;
var strokeLength;
var strokeThicknessSlider;
var strokeLengthSlider;


function preload() {
    img = loadImage("assets/img".concat(Math.floor(random(0, 3))).concat(".jpg"));
}

function scribbleLines(targetImg) {
    canvas.clear();
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
    reader = new FileReader();

    img.resize(0, Math.min((windowHeight - 100), 400));
    img.loadPixels();

    canvas = createCanvas(windowWidth, windowHeight);

    strokeThicknessSlider = createSlider(1, 50, 5, 1);
    strokeThicknessSlider.style('width', '120px');
    cpos = canvas.position();

    strokeThicknessSlider.position(5, img.height + 50 + cpos.y);

    strokeLengthSlider = createSlider(5, 50, 25, 1);
    strokeLengthSlider.style('width', '120px');
    strokeLengthSlider.position(5, img.height + 100 + cpos.y);

    strokeThickness = strokeThicknessSlider.value(); // 2 default
    strokeLength = strokeLengthSlider.value() // 25 default

    scribbleLines(img);
}

function changeImage(file) {
    reader.onload = function () {
        img = loadImage(reader.result,
            function() {
                img.resize(0, Math.min((windowHeight - 100), 400));
                img.loadPixels();
                selectBox.html("image loaded");
            }
        );
    };
    reader.readAsDataURL(file);
    var selectBox = select("#uploadPrompt");
    console.log(selectBox.html());
    selectBox.html("loading your image...");
    console.log("loading");
}

function draw() {
    canvas = createCanvas(windowWidth, windowHeight);
    strokeThickness = strokeThicknessSlider.value(); // 2 default
    strokeLength = strokeLengthSlider.value() // 25 default

    scribbleLines(img);

    var textHeight = 50;
    textSize(textHeight);
    fill(255,0,255, 180);
    stroke(255,103,0);
    strokeWeight(2);
    text("stroke thickness", strokeThicknessSlider.x * 2 + strokeThicknessSlider.width, strokeThicknessSlider.y - canvas.position().y + textHeight / 2);
    text("stroke length", strokeLengthSlider.x * 2 + strokeLengthSlider.width, strokeLengthSlider.y - canvas.position().y + textHeight / 2);
}
