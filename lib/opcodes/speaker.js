const { LCX, LCS } = require('./macros');
const opcode = require('./opcode');

const opSound = 0x94;

module.exports = {
  break: opcode(
    opSound,
    LCX(0x00),
  ),
  tone: opcode(
    opSound,
    LCX(0x01),
    LCX, // volume
    LCX, // frequency
    LCX, // duration
  ),
  play: opcode(
    opSound,
    LCX(0x02),
    LCX, // volume
    LCS, // name
  ),
  repeat: opcode(
    opSound,
    LCX(0x03),
    LCX, // volume
    LCS, // name
  ),
};
