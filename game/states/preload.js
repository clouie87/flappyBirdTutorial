
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
