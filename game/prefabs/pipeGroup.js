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
