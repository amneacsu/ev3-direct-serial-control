const EV3 = {
  Brick: require('./Brick'),
  Input: require('./Input'),
  Output: require('./Output'),
  Motor: require('./Motor'),
  Screen: require('./Screen'),
  Speaker: require('./Speaker'),
  InfraredSensor: require('./InfraredSensor'),
  LCX: require('./commands').LCX,
  LCS: require('./commands').LCS,
  LVX: require('./commands').LVX,
  GVX: require('./commands').GVX,
};

module.exports = EV3;
