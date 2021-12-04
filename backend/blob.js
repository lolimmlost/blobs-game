function Blob(x, y, r, c, v) {
  //blob split holder;
  this.v = createVector(64/this.r, 64/this.r);
  //this.v.setMag(2);
  this.x = x;
  this.x = y;

  this.t = 0;
  //SET position of blob
  this.pos = createVector(x, y);
  //SET radius of blob
  this.r = r;
  //SET velocity of blob
  this.vel = createVector(0, 0);
  //SET color of blob
  this.c = c;
  //COLORS LIST
  let colors = [
    "#800080", //Purple
    "#FF00FF", //Fuchsia
    "#000080", //Navy
    "#0000FF", //Blue
    "#008080", //Teal
    "#00FFFF", //Aqua
    "#008000", //Green
    "#00FF00", //Lime
    "#808000", //Olive
    "#FFFF00", //Yellow
    "#800000", //Maroon
    "#FF0000", //Red
  ];
  // RANDOM color logic
  var randCol = random(colors.length);
  randCol = floor(randCol);


  // UPDATING POSITION OF BLOB Against Boundries
  this.update = function() {
    console.log(this.v);
    if (this.pos.x - this.r < -mapSize[0]) this.pos.add(1, 0);
    else if (this.pos.x + this.r > mapSize[0]) this.pos.add(-1, 0);
    else if (this.pos.y - this.r < -mapSize[1]) this.pos.add(0, 1);
    else if (this.pos.y + this.r > mapSize[1]) this.pos.add(0, -1);
    else {
      //Direction of Blob plus children
      var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
      // I THINK I BROKE THIS AS WELL
      newvel.setMag(10).add(this.v);
      this.vel.lerp(newvel, 0.5);
      console.log(this.pos);
      //NEED to rewrite this move function to use v or A variable to set speed.
      this.pos.add(this.vel);
    }
  };
  //CHECKING if user blob eats small blobs
  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = floor(sqrt(sum / PI));
      return true;
    } else return false;
  };
  // CHECKING if user eats child after x time
  this.mergeWith = function(other) {
    var newTime = minute();
    var distanceFrom = p5.Vector.dist(this.pos, other.pos);
    var blobOverlap = 0.5 * (distanceFrom - this.r - other.r);
    //Checking collision and pushing blbos away broke time
    if ((distanceFrom < this.r + other.r - blobOverlap) || ((newTime - this.t) < 1) ) {
      other.pos.x += blobOverlap * (this.pos.x - other.pos.x) / distanceFrom;
      other.pos.y += blobOverlap * (this.pos.y - other.pos.y) / distanceFrom;
    } else if ((newTime - this.t) > 1) {
      //Merging blobs after X time and collisions
      if (distanceFrom <= this.r + other.r - (this.r * 0.1)) {
        var sum = PI * this.r * this.r + PI * other.r * other.r;
        this.r = floor(sqrt(sum / PI));
        return true;
      }
    }
  };

  //DISPLAY blobs
  this.show = function() {
    if (this.c == 0) fill(colors[randCol]);
    if (this.c == 255) fill(this.c);
    strokeWeight(zoom / 1);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    return false;
  };
  //SPLIT Blob / ATTACK

  this.half = function() {
    if (score > 10) {
      this.r = floor(sqrt((PI * this.r * this.r) / 2) / 2);
      score = floor(score / 2);
      var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
      newvel.setMag(4);
      var tempX = blob.pos.x + (newvel.x);
      var tempY = blob.pos.y + (newvel.y);
      var childTemp = new Blob(tempX, tempY, this.r, 0, 1);
      child.push(childTemp);
      console.log(this.t);
      this.t = minute();
    } else return false;
  };
}
