/*!
 * module deps
 */

var View = require('famous/core/View');


/**
 * Slide Constructor
 */

function Slide() {
  View.apply(this, arguments);
  this._currentStep = -1;
  this._animations = null;
  this._steps = [];

  this._onChange = function(e) {
    if (e.detail.direction === 1 && this._steps[this._currentStep + 1]) {
      e.preventDefault();
      this.playNextAnimation();
    }
  }.bind(this);



}

/*!
 * extend View
 */

Slide.prototype = Object.create(View.prototype);
Slide.prototype.constructor = Slide;

function haltCurrentAnimation() {
}

Slide.prototype.didEnter = function() {};
Slide.prototype.didLeave = function() {};

Slide.prototype.willEnter = function() {
  this._eventInput.on('change-slide', this._onChange);
};

Slide.prototype.willLeave = function(data) {
  if (data.direction === -1) this._currentStep = -1;
  this._eventInput.removeListener('change-slide', this._onChange);
};

Slide.prototype.playNextAnimation = function() {
  haltCurrentAnimation.call(this);
  this._currentStep++;
  if (this._steps[this._currentStep]) {
    this._animations = this._steps[this._currentStep].call(this);
  }
};

/*!
 * module exports
 */

module.exports = Slide;