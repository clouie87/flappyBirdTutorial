
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    //we want to create/load our background image
    this.background = this.game.add.sprite(0,0, 'background');
    //we want to add a ground that is constantly moving. one way to do that is
    //when the sprite hits the spot a new ground is initiated and an old one is replaced
    //an easier way to do this is to use TileSprite so it auto scrolls
    this.ground= this.game.add.sprite(0, 400, 355, 112, 'ground');
    this.ground.autoScroll(-200, 0);
  },
  update: function() {
  }

};

module.exports = Menu;
