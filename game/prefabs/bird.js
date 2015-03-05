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
