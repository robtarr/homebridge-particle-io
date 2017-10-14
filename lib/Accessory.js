'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accessory = function () {
  function Accessory(log, url, accessToken, device, homebridge, ServiceType, CharacteristicType) {
    _classCallCheck(this, Accessory);

    this.log = log;
    this.url = url;
    this.accessToken = accessToken;
    this.ServiceType = ServiceType;
    this.CharacteristicType = CharacteristicType;

    this.name = device.name;
    this.args = device.args;
    this.deviceId = device.device_id;
    this.fakeSerial = device.device_id.slice(-8).toUpperCase();
    this.type = device.type.toLowerCase();
    this.value = null;

    var Service = homebridge.hap.Service;
    var Characteristic = homebridge.hap.Characteristic;
    this.informationService = new Service.AccessoryInformation();
    this.informationService.setCharacteristic(Characteristic.Manufacturer, 'Particle').setCharacteristic(Characteristic.Model, 'Photon').setCharacteristic(Characteristic.SerialNumber, this.fakeSerial);

    this.services = [];
    this.services.push(this.informationService);
  }

  _createClass(Accessory, [{
    key: 'getServices',
    value: function getServices() {
      return this.services;
    }
  }]);

  return Accessory;
}();

module.exports = Accessory;