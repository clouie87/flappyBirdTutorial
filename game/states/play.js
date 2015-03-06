
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

      ////////// CREATE PIPES GROUP FOR PIPEGROUP PREFABS ////////
      this.pipes = this.game.add.group();

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

      // enable collisions between the bird and each group in the pipes group
      this.pipes.forEach(function(pipeGroup) {
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this);

    },
    generatePipes: function() {
      console.log('generating pipes!');
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);
      if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes);
      }
      pipeGroup.reset(this.game.width, pipeY);

    },

    deathHandler: function() {
      this.game.state.start('gameover')
    },



    clickListener: function() {
      this.game.state.start('gameover');
    },

    shutdown: function() {
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
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
