const EV3 = {
  Brick: require('./Brick'),
  Input: require('./Input'),
  Output: require('./Output'),
  Motor: require('./Motor'),
  Screen: require('./Screen'),
  Speaker: require('./Speaker'),
  InfraredSensor: require('./InfraredSensor'),
  LCX: require('./opcodes/macros').LCX,
  LCS: require('./opcodes/macros').LCS,
  LVX: require('./opcodes/macros').LVX,
  GVX: require('./opcodes/macros').GVX,
};

module.exports = EV3;
