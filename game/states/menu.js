
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
    this.ground= this.game.add.tileSprite(0, 400, 355, 112, 'ground');
    this.ground.autoScroll(-200, 0);

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
    this.titleGroup.y = 0;
    //Step 6 create an oscilating animation tween for the group
    this.game.add.tween(this.titleGroup).to({y:15}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);


  },
  update: function() {
  }

};

module.exports = Menu;
