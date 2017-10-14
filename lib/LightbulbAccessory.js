'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActorAccessory = require('./ActorAccessory.js');

var LightbulbAccessory = function (_ActorAccessory) {
  _inherits(LightbulbAccessory, _ActorAccessory);

  function LightbulbAccessory(log, url, accessToken, device, homebridge) {
    _classCallCheck(this, LightbulbAccessory);

    var Service = homebridge.hap.Service;
    var Characteristic = homebridge.hap.Characteristic;
    return _possibleConstructorReturn(this, (LightbulbAccessory.__proto__ || Object.getPrototypeOf(LightbulbAccessory)).call(this, log, url, accessToken, device, homebridge, Service.Lightbulb, Characteristic.On));
  }

  _createClass(LightbulbAccessory, [{
    key: 'setState',
    value: function setState(value, callback) {
      _get(LightbulbAccessory.prototype.__proto__ || Object.getPrototypeOf(LightbulbAccessory.prototype), 'setState', this).call(this, "power", value ? '1' : '0', callback);
    }
  }]);

  return LightbulbAccessory;
}(ActorAccessory);

module.exports = LightbulbAccessory;