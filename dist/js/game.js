(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappy-bird-re');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  //set the birds anchor to be centred
  this.anchor.setTo(0.5,0.5);

  //add the animations
  this.animations.add('flap');
  //play the animations
  this.animations.play('flap', 12, true);
  //this verses this.bird when we are referencing within variable and outside
  //give brief explanation of this to the kids here!

  /////////////////////////ADDING PHYSICS TO SPRITE //////////////////////////////
  this.game.physics.arcade.enableBody(this);
  //this is all we have to do to have the game recognize that the sprite has physics!
  //THIS IS SO COOL!!!! (or when you go home this.code was so cool!!


  // initialize your prefab here

};



Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {

  //check to see if our angle is less than 90
  //if it is rotate the bird towards the ground by 2.5 degrees
  if(this.angle < 90) {
    this.angle += 2.5;

  }

  // write your prefab's specific update code here


};
Bird.prototype.flap = function(){
  //have the bird jump
  this.body.velocity.y = -400;

  //rotate the bird up 40 degrees when its jumping
  this.game.add.tween(this).to({angle: -40}, 100).start();
};

module.exports = Bird;

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
  // start scrolling our ground
  this.autoScroll(-200,0);
  // initialize your prefab here
  this.game.physics.arcade.enableBody(this);

  // we don't want the ground's body
  // to be affected by gravity
  this.body.allowGravity = false;
  //we want to tell it to only be affected by physics created and set by itself
  //no external forces can influnce it!
  this.body.immovable = true;

};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ground;

},{}],4:[function(require,module,exports){
'use strict';

var Pipe = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true;

  this.body.velocity.x = -200;


  // initialize your prefab here

};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Pipe;

},{}],5:[function(require,module,exports){
'use strict';

var Pipe = require('./pipe');

var PipeGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  this.topPipe = new Pipe(this.game, 0,0,0);
  this.add(this.topPipe);
  // initialize your prefab here
  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.bottomPipe);

  this.hasScored=false;

};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = PipeGroup;

},{"./pipe":4}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    ////////////////////// BACKGROUND ////////////////////////////
    //we want to create/load our background image
    this.background = this.game.add.sprite(0,0, 'background');
    //we want to add a ground that is constantly moving. one way to do that is
    //when the sprite hits the spot a new ground is initiated and an old one is replaced
    //an easier way to do this is to use TileSprite so it auto scrolls
    this.ground= this.game.add.tileSprite(0, 400, 355, 112, 'ground');
    this.ground.autoScroll(-200, 0);

    ///////////////////// TITLE ///////////////////////////////////
    //Step 1 create a group we can put the title and bird into and
    //manipulate together
    this.titleGroup= this.game.add.group();
    //Step 2 create a title sprite
    this.title= this.game.add.sprite(0,0, 'title');
    //add it to the titleGroup
    this.titleGroup.add(this.title);
    //Step 3 create a bird sprite
    this.bird = this.game.add.sprite(200,5, 'bird');
    //add it to the titleGroup
    this.titleGroup.add(this.bird);
    //Step 4 add an animation to the bird
    this.bird.animations.add('flap');
    //and begin the animation
    this.bird.animations.play('flap', 12, true);
    //Step 5 set the originating location fo the group
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;
    //Step 6 create an oscilating animation tween for the group
    this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //////////////////////////////// START BUTTON ////////////////////////////
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);

  },

  startClick: function(){
    this.game.state.start('play');
  },
  update: function() {
  }

};

module.exports = Menu;

},{}],9:[function(require,module,exports){

  'use strict';

  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');
  var PipeGroup = require('../prefabs/pipeGroup');
  var Pipe = require('../prefabs/pipe');

  function Play() {}
  Play.prototype = {
    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      //initiates the physics sysytem in our game
      this.game.physics.arcade.gravity.y = 1200;
      // set the gravity to be max rate of 500px/sec

      ////////////////////ADD BACKGROUND //////////////////////
      this.background = this.game.add.sprite(0, 0, 'background');

      ////////////////CREATE AND ADD BIRD OBJECT//////////////

      //create a new bird object
      this.bird = new Bird(this.game, 100, this.game.height / 2);
      //add it to the game
      this.game.add.existing(this.bird);

      /////////////// CREATE AND ADD GROUND OBJECT//////////////
      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);

      ////////////////// CREATE THE FLAPPING ///////////////////
      //keep the spacebar from propogating up to the browser
      //by default our spacebar scrolls the page down. we want to override this
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      //add keyboard controls
      var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      flapKey.onDown.add(this.bird.flap, this.bird);

      //add mouse/touch controls
      this.input.onDown.add(this.bird.flap, this.bird);

      /////////////////// ADD OBSTACLES //////////////////////////
          //this.pipe = new Pipe(this.game, 200, 0, 335, 112);
          //this.game.add.existing(this.pipe);
      // we will delete this code and replace it with the timer generated obstacles
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();



    },
    update: function() {
      this.game.physics.arcade.collide(this.bird, this.ground);

    },

    generatePipes: function() {
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = new PipeGroup(this.game);
      pipeGroup.x = this.game.width;
      pipeGroup.y = pipeY;


      console.log('generating pipes!');
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;

/////////////////trying to create bird variable without prefab //////////////

  //  var bird = new Bird(this.game, 100, this.game.height / 2);
  //  bird.anchor.setTo(0.5, 0.5);
  //  bird.animations.add('flap');
  //  bird.animations.pla('flap', 12, true);
  //  this.game.physics.arcade.enableBody(bird);
  //  this.game.add.existing(bird);
  //  birdGroup.add(bird);

},{"../prefabs/bird":2,"../prefabs/ground":3,"../prefabs/pipe":4,"../prefabs/pipeGroup":5}],10:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    ////////////////////////BOILERPLATE CODE////////////////////////////////
    // it displays an animated loading image while we load our other assets
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    // this loads our individual images that we need on our menu
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');

    // the width is 34 px the height is 24 px and we want to have 3 different
    //animations for the bird
    this.load.spritesheet('bird', 'assets/bird.png', 34,24,3);
    this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2);



  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])