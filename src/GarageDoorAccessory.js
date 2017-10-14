const ActorAccessory = require('./ActorAccessory.js');

class GarageDoorAccessory extends ActorAccessory {

  constructor(log, url, accessToken, device, homebridge) {
    const Service = homebridge.hap.Service;
    const Characteristic = homebridge.hap.Characteristic;
    super(log, url, accessToken, device, homebridge, Service.GarageDoorOpener, Characteristic.On);
  }

  setState(value, callback) {
    super.setState('activateDoor', value ? '1' : '0', callback);
  }

}

module.exports = GarageDoorAccessory;
