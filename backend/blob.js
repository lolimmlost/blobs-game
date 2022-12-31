function Blob(x, y, r, c, v, m) {
  //Blob Properties;

  this.x = x; // X Pos of Blob
  this.y = y; // Y Pos of Blob
  this.r = r; //SET radius of blob
  this.c = c; //SET color of blob
  this.v = v; // Velocity
  this.mass = m; // MASS of Blob
   this.mass = max(100, m);


  this.pos = createVector(x, y); //SET position of blob

  this.vel = createVector(v, v); //SET velocity of blob

  let colors = [
    //COLORS LIST
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

  var randCol = getColor();

  // UPDATING POSITION OF BLOB Against Boundries
  this.update = function () {
    //Update direction of Blob plus children
    var updateVelocity = createVector(mouseX - width / 2, mouseY - height / 2);
    //console.log(this.mass, this.r)
    updateVelocity.setMag(10* (1 / this.mass) +5);
    //else updateVelocity.setMag(6);
    this.vel.lerp(updateVelocity, 0.6);
    this.pos.add(this.vel);
    console.log("Current Velocity" + this.pos + this.vel);
  };

  //CHECKING if user blob eats small blobs
  this.eats = function (other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      this.mass += other.mass;
      console.log("Mass:" + this.mass);
      return true;
    } else {
      return false;
    }
  };

  //DISPLAY blobs
  this.show = function () {
    if (this.c == 0) fill(colors[randCol]);
    else fill(this.c);

    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    return false;
  };

  //SPLIT Blob / ATTACK
  this.half = function () {
    var halfRadius = this.r / 1.5;
    var newRadius = floor(sqrt((PI * halfRadius * halfRadius) / PI));
    var tempX = this.pos.x + newRadius;
    var tempY = this.pos.y + newRadius;
    var childTemp = new Blob(tempX, tempY, newRadius, 0, 0, 1);

    child.push(childTemp);
    this.r = floor(sqrt((PI * halfRadius * halfRadius) / PI));

    console.log("Child:" + child);

    this.mass = this.mass / 2;
    //return false;
  };

  function getColor() {
    var randCol = random(colors.length);
    randCol = floor(randCol);
    return randCol;
  }
}
/*
// Calculate the angle of direction towards the pointer
    let angle = Math.atan2(mouseY - this.y, mouseX - this.x);
    // Set the velocity based on the angle and a fixed speed
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    // Update the blob's position based on its velocity
    this.x += this.vx;
    this.y += this.vy;

    */
