function Blob(x, y, r, c, v) {
  //blob split holder;
  this.v = v;
  this.x = x;
  this.x = y;

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
  this.update = function () {
    if (this.pos.x - this.r < -mapSize[0]) this.pos.add(1, 0);
    else if (this.pos.x + this.r > mapSize[0]) this.pos.add(-1, 0);
    else if (this.pos.y - this.r < -mapSize[1]) this.pos.add(0, 1);
    else if (this.pos.y + this.r > mapSize[1]) this.pos.add(0, -1);
    else {
      //Direction of Blob plus children
      var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
      //if (this.v == 4) newvel.setMag(7);
      //newvel.setMag(floor((PI * this.r) *2 / this.r));
      //newvel.setMag(floor((PI * this.r * 2) / this.r));
      //newvel.setMag(floor(1/this.r)+PI*2);
      newvel.setMag(floor(100 / sqrt(this.r)));
      this.vel.lerp(newvel, 0.6);
      this.pos.add(this.vel);
    }
  };
  //CHECKING if user blob eats small blobs
  this.eats = function (other) {
    if (other == child) {}
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      return true;
    } else {
      return false;
    }
  };

  //DISPLAY blobs
  this.show = function () {
    if (this.c == 0) fill(colors[randCol]);
    if (this.c == 255) fill(this.c);

    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    return false;
  };

  //SPLIT Blob / ATTACK
  this.half = function () {
    if (score > 10) {
      this.r = floor(sqrt((PI * this.r * this.r) / 2) / 2);
      score = floor(score / 2);
      var tempX = this.pos.x + this.r;
      var tempY = this.pos.y + this.r;
      var childTemp = new Blob(tempX, tempY, this.r, 0, 4);
      child.push(childTemp);
      console.log(child);
    } else return false;
  };
}