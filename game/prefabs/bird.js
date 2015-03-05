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

  // write your prefab's specific update code here

};

module.exports = Bird;
