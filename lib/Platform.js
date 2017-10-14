'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccessoryFactory = require('./AccessoryFactory.js');

var ParticlePlatform = function () {
  function ParticlePlatform(log, config) {
    _classCallCheck(this, ParticlePlatform);

    this.log = log;
    this.accessToken = config.access_token;
    this.url = config.cloud_url;
    this.devices = config.devices;
    this.accessoryFactory = new AccessoryFactory(log, this.url, this.accessToken, this.devices, global.homebridge);
  }

  _createClass(ParticlePlatform, [{
    key: 'accessories',
    value: function accessories(callback) {
      var foundAccessories = this.accessoryFactory.getAccessories();
      callback(foundAccessories);
    }
  }]);

  return ParticlePlatform;
}();

module.exports = ParticlePlatform;