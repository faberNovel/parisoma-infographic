/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Easing = require('famous/transitions/Easing'),
    Transform = require('famous/core/Transform'),
    SlideBase = require('slide');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/**
 * create view layout
 */

function _createLayout(){

  // background surface
  this.bg = {};
  this.bg.surface = new ImageSurface({
    content: require('../../assets/images/01-parisoma.png'),
    size: [894, 800]
  });

  this.bg.modifier = new StateModifier({
    opacity: 0,
    transform: Transform.translate(0, -600, 0)
  });

  // text
  this.text = {};
  this.text.surface = new Surface({
    size: [780, 300],
    content: `<div class='text--white'><p>Starting a company has never been easier. While entrepreneurship was once the calling of the venturous few, it has since become a career path chosen by many. At PARISOMA, we have hosted over 450 entrepreneurs for the past six years.</p><p class='u-pad-top-10'>We know that no two startup founders are the same, we chose to ask our members - who starts a startup?</p></div>`
  });

  this.text.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(0, 50, 0),
    opacity: 0
  });

  // yellow ticker
  this.yellowTicker = {};
  this.yellowTicker.surface = new Surface({
    size: [139, 112],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.yellowTicker.modifier = new StateModifier({
    origin: [1, 0],
    align: [0.5, 0],
    transform: Transform.translate(-25, 220, 0)
  });

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: `<h1 class='title title--intro u-textRight'>Who starts a Startup?</h1>`,
    size: [400, true]
  });

  this.title1.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(-140, 280, 0)
  });

  // title 1
  this.who = {};
  this.who.surface = new Surface({
    content: `<h1 class='title title--intro'>Who</h1>`,
    size: [105, true],
    properties: {
      overflow: 'hidden'
    }
  });

  this.who.modifier = new StateModifier({
    origin: [1, 0],
    align: [0.5, 0],
    transform: Transform.translate(-25, 280, 0)
  });

  // pink ticker
  this.pinkTicker = {};
  this.pinkTicker.surface = new Surface({
    size: [148, 120],
    classes: ['ticker', 'ticker--pink']
  });

  this.pinkTicker.tickerModifier = new StateModifier({
    transform: Transform.skew(0, 39 * toRadian, 0),
    opacity: 1
  });

  this.pinkTicker.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(0, 400, 0)
  });

  // light image
  this.light = {};
  this.light.surface = new ImageSurface({
    content: require('../../assets/images/02-light.png'),
    size: [true, true],
  });

  this.light.modifier = new StateModifier({
    origin: [1, 0],
    align: [0.5, 0],
    opacity: 0,
    transform: Transform.translate(0, 1000, 0)
  });

  // group image
  this.group = {};
  this.group.surface = new ImageSurface({
    content: require('../../assets/images/03-group.png'),
    size: [true, true]
  });

  this.group.modifier = new StateModifier({
    transform: Transform.translate(-2 * 384, 2 * 460 , 0),
    opacity: 0
  });

  this.modifier = new StateModifier({
    opacity: 0
  });

  var node = this
    .add(this.modifier);

  node
    .add(this.bg.modifier)
    .add(this.bg.surface);

  node
    .add(this.light.modifier)
    .add(this.light.surface);

  node
    .add(this.group.modifier)
    .add(this.group.surface);

  node
    .add(this.pinkTicker.modifier)
    .add(this.pinkTicker.tickerModifier)
    .add(this.pinkTicker.surface);

  this.titleGroupModifer = new StateModifier({
    transform: Transform.translate(0, 0, 0)
  });

  var titleGroupNode = node.add(this.titleGroupModifer);

  titleGroupNode
    .add(this.yellowTicker.modifier)
    .add(this.yellowTicker.tickerModifier)
    .add(this.yellowTicker.surface);

  titleGroupNode
    .add(this.who.modifier)
    .add(this.who.surface);

  titleGroupNode
    .add(this.title1.modifier)
    .add(this.title1.surface);

  node
    .add(this.text.modifier)
    .add(this.text.surface);

}

/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);
  this._steps = [
    function() {
      this.modifier.setOpacity(1, { duration : 1500, curve: Easing.outBack });
    },
    function() {
      this.logo.animate(true);
      this.arrow.modifier.setOpacity(1);
      this.title1.surface.addClass('text--white');

      this.titleGroupModifer.setTransform(Transform.translate(0, 0, 0), { duration : 800, curve: Easing.outBack });
      this.text.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
      this.bg.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
      this.bg.modifier.setTransform(Transform.translate(0, 0, 0), { duration : 800, curve: Easing.outBack });
      this.light.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
      this.light.modifier.setTransform(Transform.translate(0, 520, 0), { duration : 800, curve: Easing.outBack });
    }
  ];
}

/*!
 * extend SlideBase
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = Slide;


Slide.prototype.didEnter = function() {
  setTimeout(this.playNextAnimation.bind(this), 2000);
  setTimeout(this.playNextAnimation.bind(this), 4000);
};

/*!
 * module exports
 */

module.exports = Slide;