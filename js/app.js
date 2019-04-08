
let minX = -20;
let maxX = 420;
let minY = -20;
let maxY = 450;

let playerInitX = 200;
let playerInitY = 400;
let playerInitSpeed = 20;

let collisionRangeX=75;
let collisionRangeY=60;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+= dt*this.speed;

    if(this.x>maxX+100){
      this.x = minX;
      this.speed = 100+Math.floor(Math.random() * 200);
    }
    this.handleCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.handleCollision = function() {
    let xDiff = Math.abs(this.x-player.x);
    let yDiff = Math.abs(this.y-player.y);

    if(xDiff<=collisionRangeX && yDiff<=collisionRangeY){
      setTimeout(function(){
          player.x=playerInitX;
          player.y=playerInitY;
      }, 400);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};

Player.prototype.update = function() {
    if(this.y-playerInitSpeed<=minY){
      setTimeout(function(){
          player.x=playerInitX;
          player.y=playerInitY;
      }, 400);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {

    if(move==="left" && this.x-this.speed>=minX){
      this.x-=this.speed;

    }else if(move==="right" && this.x+this.speed<=maxX){
      this.x+=this.speed;

    }else if(move==="up" && this.y-this.speed>=minY){
      this.y-=this.speed;

    }else if(move==="down" && this.y+this.speed<=maxY){
      this.y+=this.speed;

    }

};

Player.prototype.reset = function() {
    this.x = playerInitX;
    this.y = playerInitY;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

window.allEnemies = [];
let enemyYPositions = [60, 145, 230];
enemyYPositions.forEach(locationY=> {
    let speed = 100+Math.floor(Math.random() * 200);
    window.allEnemies.push(new Enemy(minX, locationY, speed));
});

 //for (let i = 0; i <1 ; i++) {
   //window.allEnemies.push(new Enemy(0, 60, 100));
  // window.allEnemies.push(new Enemy(0, 145, 200));
  // window.allEnemies.push(new Enemy(0, 230, 300));
 //}

window.player = new Player(playerInitX, playerInitY, playerInitSpeed);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
