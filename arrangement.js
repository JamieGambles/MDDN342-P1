/*
 * This program draws your arrangement of faces on the canvas.
 */

const canvasWidth = 960;
const canvasHeight = 500;
let curRandomSeed = 0;

let lastSwapTime = 0;
const millisPerSwap = 3000;

function setup () {
  // create the drawing canvas, save the canvas element
  let main_canvas = createCanvas(canvasWidth, canvasHeight);
  main_canvas.parent('canvasContainer');

  curRandomSeed = int(random(0, 1000));

  // rotation in degrees
  angleMode(DEGREES);
}

function changeRandomSeed() {
  curRandomSeed = curRandomSeed + 1;
  lastSwapTime = millis();
}

// global variables for colors
const bg_color1 = [242, 242, 235];

function mouseClicked() {
  changeRandomSeed();
}

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  // reset the random number generator each time draw is called
  randomSeed(curRandomSeed);

  // clear screen
  background(bg_color1);
  noStroke();

  //draw a grid of faces, spaced apart by exactly the width and height of each face.
  for (let i=-200; i<=200; i+=200){ 
        push();

      translate((width/2), 0);
      translate(i,0)
    for (let z = -200; z<=0; z+=200) {
      push();
      translate(0, (height/2)+100);
      translate(0,z)
      scale(10);
      let faceShape = random(0,1);
      let faceType = random(0, 1);
      let waviness = random(0, .5);
      let eyeType = random(0,1);
      let faceHeight = random(0,-5);
      let xIncrement = int(random(1, 10));
      let backgroundCol = random(0,1);
      drawFace1(waviness, faceType, faceShape, xIncrement, eyeType, faceHeight, backgroundCol);
      pop();
  }
  pop();
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}
