var blob;
var child = [];
var zoom = 0.6;
var blobs = [];
var score = 0;
var mainBlob = 32;
var miniBlob = 16;
let photo, maskImage;
let mapSize = [3920, 3080];

//TODO: Calculate radius of blob from mass realtime
//refactor eats and half functions
// calculate angle direction
//add splitting for children --- Done
// add mass rejoin feature after x time
// merge to main Branch

// function preload() {
//   photo = loadImage("https://picsum.photos/300/200");
// }
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
console.log(blobs.length);
console.log(child.length);
function keyPressed() {
  if (keyCode === 32) {
    if (score > 10) {
      blob.half();
      child.forEach(function (child) {
        child.half();
      });

      score = floor(score / 2);
    }
  } else {
    return false; // prevent any default behaviour;
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight - 10);

  blob = new Blob(0, 0, mainBlob, 255, 0);

  for (var i = 0; i < mapSize[1] / 4; i++) {
    var x = random(-mapSize[0], mapSize[0]);
    var y = random(-mapSize[1], mapSize[1]);
    blobs[i] = new Blob(x, y, miniBlob, 0);
  }

  scale(zoom);
}

function draw() {
  background(0);
  let fps = floor(frameRate());

  //Translating Vewpoint to followblob
  color(5);
  textSize(24);

  translate(width / 2 - 32, height / 2 - 32);

  //Smoothly Zooming
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.05);

  scale(zoom);
  color(0);

  translate(-blob.pos.x, -blob.pos.y);

  //GAMEBOARD BACKGROUND

  push();
  fill("gray");
  beginShape();
  vertex(-mapSize[0], mapSize[1]);
  vertex(mapSize[0], mapSize[1]);
  vertex(mapSize[0], -mapSize[1]);
  vertex(-mapSize[0], -mapSize[1]);
  endShape(CLOSE);
  pop();
  //BORDER OF GAME
  push();
  fill("red");
  strokeWeight(10);
  line(mapSize[0], mapSize[1], -mapSize[0], mapSize[1]);
  line(mapSize[0], -mapSize[1], -mapSize[0], -mapSize[1]);
  line(mapSize[0], -mapSize[1], mapSize[0], mapSize[1]);
  line(-mapSize[0], mapSize[1], -mapSize[0], -mapSize[1]);
  noStroke();
  pop();

  //DRAWING food above map area.
  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();

    //EATS FUNCTION
    if (blob.eats(blobs[i])) {
      //Adding to score
      score += 1;
      // Adding more blobs after they have been eaten
      blobs.splice(i, 1);
      var x = random(-mapSize[0], mapSize[0]);
      var y = random(-mapSize[1], mapSize[1]);
      blobs.push(new Blob(x, y, miniBlob, 0));
    }
  }
  // DRAWING CHILDREN of BLOB
  for (var k = child.length - 1; k >= 0; k--) {
    child[k].show();
    for (var j = blobs.length - 1; j >= 0; j--) {
      //EATS FUNCTION
      if (child[k].eats(blobs[j])) {
        //Adding to score
        score += 1;
        // Adding more blobs after they have been eaten
        blobs.splice(j, 1);
        var x2 = random(-mapSize[0], mapSize[0]);
        var y2 = random(-mapSize[1], mapSize[1]);
        blobs.push(new Blob(x2, y2, miniBlob, 0));
      }
    }
    child[k].update();
    //console.log(child[child.length-1])
  }
  blob.show();

  blob.update();

  //Score Display
  push();
  fill(0);
  stroke(255);
  textSize(blob.r / 2);
  text("Score: " + score, blob.pos.x - blob.r, blob.pos.y + blob.r / blob.r);
  text("FPS: " + fps, blob.pos.x - blob.r, blob.pos.y + blob.r + 25 / blob.r);
  pop();
}
