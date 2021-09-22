/*
 * This program draws your arrangement of faces on the canvas.
 */

const canvasWidth = 1080;
const canvasHeight = 1080;
let curRandomSeed = 0;


let lastSwapTime = 0;
const millisPerSwap = 3000;

function setup () {
  // create the drawing canvas, save the canvas element
createCanvas(canvasWidth, canvasHeight);



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

function draw () {
  if(millis() > lastSwapTime + millisPerSwap) {
    changeRandomSeed();
  }

  let widthUnit = width/960;

  // reset the random number generator each time draw is called
  randomSeed(curRandomSeed);

  // clear screen
  background(bg_color1);
  noStroke();

  let spacing =  width/2;

  //draw a grid of faces, spaced apart by exactly the width and height of each face.
  for (let i= -width/4; i<=spacing; i+=spacing){ 
      push();
      translate((width/2), 0);
      translate(i,0)
    for (let z = -width/4; z<=height/2; z+=spacing) {
      push();
      translate(0, (height/2));
      translate(0,z)
      scale(spacing/20);
      let faceShape = random(0,1);
      let faceType = random(0, 1);
      let waviness = random(0, .5);
      let eyeType = random(0,1);
      let eyePositionX = random(-.5, .5);
      let eyePositionY = random(-.5, .5);
      let faceHeight = random(0,-5);
      let xIncrement = int(random(1, 10));
      let backgroundCol = random(0,1);
      drawFace1(waviness, faceType, faceShape, eyeType, eyePositionX, eyePositionY, faceHeight, xIncrement, backgroundCol);
      pop();
  }
  pop();
  }
}
