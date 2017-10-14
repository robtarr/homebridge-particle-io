'use strict';

var ParticlePlatform = require('./Platform.js');

module.exports = function (homebridge) {
  global.homebridge = homebridge;
  homebridge.registerPlatform('homebridge-particle-io', 'ParticleIO', ParticlePlatform);
};