'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventSource = require('eventsource');
var Accessory = require('./Accessory.js');

var SensorAccessory = function (_Accessory) {
  _inherits(SensorAccessory, _Accessory);

  function SensorAccessory(log, url, accessToken, device, homebridge, ServiceType, CharacteristicType) {
    _classCallCheck(this, SensorAccessory);

    var _this = _possibleConstructorReturn(this, (SensorAccessory.__proto__ || Object.getPrototypeOf(SensorAccessory)).call(this, log, url, accessToken, device, homebridge, ServiceType, CharacteristicType));

    _this.eventName = device.event_name;
    _this.key = device.key;
    _this.unit = null;

    _this.eventUrl = `${_this.url}${_this.deviceId}/events/${_this.eventName}?access_token=${_this.accessToken}`;
    _this.log('Listening for events from:', _this.eventUrl);

    var events = new EventSource(_this.eventUrl);
    events.addEventListener(_this.eventName, _this.processEventData.bind(_this));
    events.onerror = _this.processEventError.bind(_this);

    var sensorService = new ServiceType(_this.name);
    sensorService.getCharacteristic(CharacteristicType).on('get', _this.getCurrentValue.bind(_this));

    _this.services.push(sensorService);
    return _this;
  }

  _createClass(SensorAccessory, [{
    key: 'processEventError',
    value: function processEventError(error) {
      this.log('ERROR!', error);
    }
  }, {
    key: 'processEventData',
    value: function processEventData(e) {
      var data = JSON.parse(e.data);
      var result = this.key ? data.data.split('=')[1] : data.data;

      if (this.services.length < 2) {
        return;
      }

      var service = this.services[1];

      this.log(result, '-', service.displayName, '-', this.type);

      this.setCurrentValue(parseFloat(result));
      service.getCharacteristic(this.CharacteristicType).setValue(this.value);
    }
  }, {
    key: 'setCurrentValue',
    value: function setCurrentValue(value) {
      this.value = value;
    }
  }, {
    key: 'getCurrentValue',
    value: function getCurrentValue(callback) {
      callback(null, this.value);
    }
  }]);

  return SensorAccessory;
}(Accessory);

module.exports = SensorAccessory;