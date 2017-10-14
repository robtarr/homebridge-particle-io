'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DimmableLightbulbAccessory = require('./DimmableLightbulbAccessory.js');

var ColorLightbulbAccessory = function (_DimmableLightbulbAcc) {
  _inherits(ColorLightbulbAccessory, _DimmableLightbulbAcc);

  function ColorLightbulbAccessory(log, url, accessToken, device, homebridge) {
    _classCallCheck(this, ColorLightbulbAccessory);

    var Characteristic = homebridge.hap.Characteristic;

    var _this = _possibleConstructorReturn(this, (ColorLightbulbAccessory.__proto__ || Object.getPrototypeOf(ColorLightbulbAccessory)).call(this, log, url, accessToken, device, homebridge));

    _this.hueFunctionName = "hue";
    _this.actorService.getCharacteristic(Characteristic.Hue).on('set', _this.setHue.bind(_this)).on('get', _this.getHue.bind(_this));

    _this.saturationFunctionName = "saturation";
    _this.actorService.getCharacteristic(Characteristic.Saturation).on('set', _this.setSaturation.bind(_this)).on('get', _this.getSaturation.bind(_this));
    return _this;
  }

  _createClass(ColorLightbulbAccessory, [{
    key: 'setHue',
    value: function setHue(value, callback) {
      var _this2 = this;

      this.hue = value;
      this.callParticleFunction(this.hueFunctionName, value, function (error, response, body) {
        return _this2.callbackHelper(error, response, body, callback);
      }, true);
    }
  }, {
    key: 'getHue',
    value: function getHue(callback) {
      var _this3 = this;

      this.callParticleFunction(this.hueFunctionName, '?', function (error, response, body) {
        _this3.hue = parseInt(body);
        try {
          callback(null, _this3.hue);
        } catch (error) {
          _this3.log('Caught error ' + error + ' when calling homebridge callback.');
        }
      }, true);
    }
  }, {
    key: 'setSaturation',
    value: function setSaturation(value, callback) {
      var _this4 = this;

      this.saturation = value;
      this.callParticleFunction(this.saturationFunctionName, value, function (error, response, body) {
        return _this4.callbackHelper(error, response, body, callback);
      }, true);
    }
  }, {
    key: 'getSaturation',
    value: function getSaturation(callback) {
      var _this5 = this;

      this.callParticleFunction(this.saturationFunctionName, '?', function (error, response, body) {
        _this5.saturation = parseInt(body);
        try {
          callback(null, _this5.saturation);
        } catch (error) {
          _this5.log('Caught error ' + error + ' when calling homebridge callback.');
        }
      }, true);
    }
  }]);

  return ColorLightbulbAccessory;
}(DimmableLightbulbAccessory);

module.exports = ColorLightbulbAccessory;