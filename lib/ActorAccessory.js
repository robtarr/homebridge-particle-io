'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var request = require('request');
var Accessory = require('./Accessory.js');

var ActorAccessory = function (_Accessory) {
  _inherits(ActorAccessory, _Accessory);

  function ActorAccessory(log, url, accessToken, device, homebridge, ServiceType, CharacteristicType) {
    _classCallCheck(this, ActorAccessory);

    var _this = _possibleConstructorReturn(this, (ActorAccessory.__proto__ || Object.getPrototypeOf(ActorAccessory)).call(this, log, url, accessToken, device, homebridge, ServiceType, CharacteristicType));

    _this.actorService = new ServiceType(_this.name);
    _this.actorService.getCharacteristic(CharacteristicType).on('set', _this.setState.bind(_this)).on('get', _this.getState.bind(_this));

    _this.services.push(_this.actorService);
    return _this;
  }

  _createClass(ActorAccessory, [{
    key: 'callParticleFunction',
    value: function callParticleFunction(functionName, arg, callback, outputRAW) {
      var url = `${this.url}${this.deviceId}/${functionName}`;
      this.log('Calling function: "', url, '" with arg: ', arg);
      var form = {
        access_token: this.accessToken,
        arg
      };
      if (outputRAW) {
        form.format = 'raw';
      }
      request.post(url, {
        form
      }, callback);
    }
  }, {
    key: 'getState',
    value: function getState(callback) {
      var _this2 = this;

      this.callParticleFunction("power", '?', function (error, response, body) {
        _this2.value = parseInt(body);
        try {
          callback(null, _this2.value);
        } catch (error) {
          _this2.log('Caught error ' + error + ' when calling homebridge callback.');
        }
      }, true);
    }
  }, {
    key: 'setState',
    value: function setState(functionName, value, callback) {
      var _this3 = this;

      this.value = value;
      this.callParticleFunction(functionName, value, function (error, response, body) {
        return _this3.callbackHelper(error, response, body, callback);
      }, true);
    }
  }, {
    key: 'callbackHelper',
    value: function callbackHelper(error, response, body, callback) {
      if (!error) {
        callback();
      } else {
        this.log(error);
        this.log(response);
        this.log(body);
        callback(error);
      }
    }
  }]);

  return ActorAccessory;
}(Accessory);

module.exports = ActorAccessory;