const { LCX, LCS } = require('./macros');
const opcode = require('./opcode');

const opSound = 0x94;

const cmd = {
  BREAK: 0x00,
  TONE: 0x01,
  PLAY: 0x02,
  REPEAT: 0x03,
};

module.exports = {
  break: opcode(
    opSound,
    LCX(cmd.BREAK),
  ),
  tone: opcode(
    opSound,
    LCX(cmd.TONE),
    LCX, // volume
    LCX, // frequency
    LCX, // duration
  ),
  play: opcode(
    opSound,
    LCX(cmd.PLAY),
    LCX, // volume
    LCS, // name
  ),
  repeat: opcode(
    opSound,
    LCX(cmd.REPEAT),
    LCX, // volume
    LCS, // name
  ),
};

const cx1 = module.exports.tone(1, 100, 50);
console.log(cx1); // <Buffer 94 01 01 81 64 81 32>

const cx2 = module.exports.play(100, '/foo/bar/baz/sound1');
console.log(cx2); // <Buffer 94 02 84 2f 66 6f 6f 2f 62 61 72 2f 62 61 7a 2f 73 6f 75 6e 64 31 00>
