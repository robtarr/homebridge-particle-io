'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LightbulbAccessory = require('./LightbulbAccessory.js');
var DimmableLightbulbAccessory = require('./DimmableLightbulbAccessory.js');
var ColorLightbulbAccessory = require('./ColorLightbulbAccessory.js');
var SwitchAccessory = require('./SwitchAccessory.js');
var HumiditySensorAccessory = require('./HumiditySensorAccessory.js');
var TemperatureSensorAccessory = require('./TemperatureSensorAccessory.js');
var LightSensorAccessory = require('./LightSensorAccessory.js');
var MotionSensorAccessory = require('./MotionSensorAccessory.js');

var accessoryRegistry = {
  lightbulb: LightbulbAccessory,
  dimmablelightbulb: DimmableLightbulbAccessory,
  colorlightbulb: ColorLightbulbAccessory,
  switch: SwitchAccessory,
  temperaturesensor: TemperatureSensorAccessory,
  humiditysensor: HumiditySensorAccessory,
  lightsensor: LightSensorAccessory,
  motionsensor: MotionSensorAccessory
};

var AccessoryFactory = function () {
  function AccessoryFactory(log, url, accessToken, devices, homebridge) {
    _classCallCheck(this, AccessoryFactory);

    this.log = log;
    this.url = url;
    this.accessToken = accessToken;
    this.devices = devices;
    this.homebridge = homebridge;
  }

  _createClass(AccessoryFactory, [{
    key: 'getAccessories',
    value: function getAccessories() {
      var _this = this;

      var validDevices = this.devices.filter(function (device) {
        return device.type.toLowerCase() in accessoryRegistry;
      });
      return validDevices.map(function (device) {
        return _this.createAccessory(device);
      });
    }
  }, {
    key: 'createAccessory',
    value: function createAccessory(device) {
      this.log("Create Accessory for device:", device);
      return new accessoryRegistry[device.type.toLowerCase()](this.log, this.url, this.accessToken, device, this.homebridge);
    }
  }]);

  return AccessoryFactory;
}();

module.exports = AccessoryFactory;