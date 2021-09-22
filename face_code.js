/*
 * This file should contain code that draws your faces.
 *
 * Each function takes parameters and draws a face that is within
 * the bounding box (-10, -10) to (10, 10).
 *
 * These functions are used by your final arrangement of faces as well as the face editor.
 */


function drawFace1(waviness, faceShape, faceType, eyeType, eyePositionX, eyePositionY, faceHeight, xIncrement, backgroundCol) {

  //Background Colour
  if (backgroundCol < .3) {
    rectMode(CENTER);
    fill(91, 121, 148);
    stroke(91,121,148);
    strokeWeight(.1);
    noStroke();
    rect(0, 0, 20, 20);
  }

    //shadow
    push();
    translate(0, 5);
  
    let shadowOpacity = 80 + (faceHeight * 10);
    let shadowOpacityIncrement = shadowOpacity / 5;
    let shadowColr = 91;
    let shadowColg = 121;
    let shadowColb = 148;
  
  
    // Changes the colour of the shadow to be darker if the background colour is blue
    if (backgroundCol < .2) {
      shadowColr = 0;
      shadowColg = 0;
      shadowColb = 0;
    }
  
    fill(shadowColr, shadowColg, shadowColb, shadowOpacity);
    noStroke();
    ellipse(0, 0, 4, 1);
    strokeWeight(.1)
    noFill();
  
    // Draws circles with stroke opacity decreasing to create a gradient
    for (let i = .5; i <= 5; i++) {
      stroke(shadowColr, shadowColg, shadowColb, shadowOpacity - (i * shadowOpacityIncrement));
      ellipse(0, 0, 4 + (i / 5), 1 + (i / 5));
    }
    pop();
  
  
    // Legs
    noFill();
    strokeWeight(.2);
    stroke(242, 76, 61, 250);
    strokeCap(ROUND);
    strokeJoin(ROUND);
  
    beginShape();
    vertex(-.5, faceHeight);
    vertex(-.5, 5);
    vertex(-1, 5);
    endShape();
  
    beginShape();
    vertex(.5, faceHeight);
    vertex(.5, 5);
    vertex(1, 5);
    endShape();

  // Hairy Circle
  function linesCircle(waviness, xIncrement, faceHeight) {

    strokeCap(SQUARE);
    strokeWeight(.1);

    push();

    translate(0, faceHeight);

    // loops the line while rotating it in increments to draw a circle
    for (let i = 0; i < 360; i += 2) {
      angleMode(DEGREES);
      push();
      rotate(i);
      noFill();

      // Connects the vertices into a line
      beginShape();
      curveVertex(0, 0);

      // Draws a line of vertices where xincrement controls how many vertices make up that line
      for (let xPos = 0; xPos <= 4.0; xPos += 4 / xIncrement) {
        stroke(242, 76, 61, random(50, 200));

        // WavinesS distorts the vertices of the lines by a small ammount. (random is used twice so that each point of the line is randomised.)
        curveVertex(xPos, random(-waviness, waviness));
      }
      curveVertex(5, 0);
      endShape();
      pop();
    }
    pop();
  }

  // Hairy Square
  function linesSquare(waviness, xIncrement, faceHeight) {

    strokeCap(SQUARE);
    strokeWeight(.1);

    push();

    translate(0, faceHeight);


    // Loops the section into the square shape by rotating 90 degrees
    for (let z = 0; z < 360; z += 90) {
      push();
      rotate(z);

      // Loops the line while rotating it to create a 1/4 section of the square
      for (let i = -45; i <= 45; i += 2) {
        angleMode(DEGREES);
        push();
        rotate(i);
        noFill();

        let xLength = (5 / cos(i));
        let xSpacing = xLength / 5;

        // Connects the vertices into a line
        beginShape();
        vertex(0, 0);

        // Draws a line of vertices where the distance between each vertice increases as the angle tends to 45 degrees
        for (let xPos = 0; xPos < xLength; xPos += xSpacing) {
          stroke(242, 76, 61, random(50, 200));

          // Wavines distorts the vertices of the lines by a small ammount. (random is used twice so that each point of the line is randomised.)
          curveVertex(xPos, random(-waviness, waviness));
        }

        curveVertex(xLength, 0);
        endShape()
        pop();
      }
      pop();
    }
    pop();
  }

  // Blank Circle
  function circle(faceHeight) {

    push();

    translate(0, faceHeight);

    noStroke();
    fill(242, 76, 61);
    ellipse(0, 0, 5, 5);

    pop();
  }

  // Blank Square
  function square(faceheight) {

    push();

    translate(0, faceHeight);

    rectMode(CENTER);
    noStroke();
    fill(242, 76, 61);
    rect(0, 0, 5, 5);

    pop();
  }

  // Blank Circle with outer radial gradient to be used with either of the hairy faces
  function innergradient() {

    push();

    translate(0, faceHeight);

    fill(242, 76, 61);
    stroke(242, 76, 61);
    ellipse(0, 0, 4, 4);
    strokeWeight(.1)
    noFill();

    // Draws circles with stroke opacity decreasing to create a gradient
    for (let i = 0; i <= 5; i++) {
      stroke(242, 76, 61, 255 - (i * 50));
      ellipse(0, 0, 4 + (i / 5), 4 + (i / 5));
    }
    pop();
  }


  // Logic gates for which face to draw. Gives an even chance for any combination of face shapes and facetypes to drawn
  if (faceShape >= .5 && faceType >= .5) {
    linesCircle(waviness, xIncrement, faceHeight);
    innergradient();
  }

  if (faceShape >= .5 && faceType < .5) {
    circle(faceHeight);
  }

  if (faceShape < .5 && faceType >= .5) {
    linesSquare(waviness, xIncrement, faceHeight);
    innergradient(faceHeight);
  }

  if (faceShape < .5 && faceType < .5) {
    square();
  }




  //Circular Eyes
  function eyeCircle() {
    ellipse(-1 + eyePositionX, 0 + eyePositionY, .5, .5);
    ellipse(1 + eyePositionX, 0 + eyePositionY, .5, .5);

    fill(0);
    ellipse(-1 + eyePositionX, 0 + eyePositionY, .2, .2);
    ellipse(1 + eyePositionX, 0 + eyePositionY, .2, .2);
  }

  // Elliptical Eyes
  function eyeEllipse() {

    beginShape();
    vertex(-.5, 0);
    bezierVertex(-.25, 0, -.25, .25, 0, .25);
    bezierVertex(.25, .25, .25, 0, .5, 0);
    bezierVertex(.25, 0, .25, -.25, 0, -.25);
    bezierVertex(-.25, -.25, -.25, 0, -.5, 0);
    endShape();
  }

  noStroke();
  fill(255);

  push();

  translate(0, faceHeight);


// Logic Gates for which eye type is drawn
  if (eyeType < .5) {
    eyeCircle();
  } else {

    push();
    translate(-1 -eyePositionX, 0 - eyePositionY);
    eyeEllipse();
    pop();

    push();
    translate(1 - eyePositionX, 0 - eyePositionY);
    eyeEllipse();
    pop();

    fill(0);
    ellipse(-1 - eyePositionX, 0 - eyePositionY, .2, .2);
    ellipse(1 - eyePositionX, 0 - eyePositionY, .2, .2);
  }
  pop();
}

function drawFace2() {

}

function drawFace3() {

}