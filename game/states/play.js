
  'use strict';

  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');

  function Play() {}
  Play.prototype = {
    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      //initiates the physics sysytem in our game
      this.game.physics.arcade.gravity.y = 500;
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

    },
    update: function() {
      this.game.physics.arcade.collide(this.bird, this.ground);

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
