'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightbulbAccessory = require('./LightbulbAccessory.js');

var DimmableLightbulbAccessory = function (_LightbulbAccessory) {
  _inherits(DimmableLightbulbAccessory, _LightbulbAccessory);

  function DimmableLightbulbAccessory(log, url, accessToken, device, homebridge) {
    _classCallCheck(this, DimmableLightbulbAccessory);

    var Characteristic = homebridge.hap.Characteristic;

    var _this = _possibleConstructorReturn(this, (DimmableLightbulbAccessory.__proto__ || Object.getPrototypeOf(DimmableLightbulbAccessory)).call(this, log, url, accessToken, device, homebridge));

    _this.actorService.getCharacteristic(Characteristic.Brightness).on('set', _this.setBrightness.bind(_this)).on('get', _this.getBrightness.bind(_this));
    _this.brightnessFunctionName = "brightness";
    return _this;
  }

  _createClass(DimmableLightbulbAccessory, [{
    key: 'setBrightness',
    value: function setBrightness(value, callback) {
      var _this2 = this;

      this.brightness = value;
      this.callParticleFunction(this.brightnessFunctionName, value, function (error, response, body) {
        return _this2.callbackHelper(error, response, body, callback);
      }, true);
    }
  }, {
    key: 'getBrightness',
    value: function getBrightness(callback) {
      var _this3 = this;

      this.callParticleFunction(this.brightnessFunctionName, '?', function (error, response, body) {
        _this3.brightness = parseInt(body);
        try {
          callback(null, _this3.brightness);
        } catch (error) {
          _this3.log('Caught error ' + error + ' when calling homebridge callback.');
        }
      }, true);
    }
  }]);

  return DimmableLightbulbAccessory;
}(LightbulbAccessory);

module.exports = DimmableLightbulbAccessory;