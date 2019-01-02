const { command, LCX, LCS } = require('./commands');

const opSound = 0x94;
const opSound_Ready = 0x96;

const SOUND_SUBCODE = {
  BREAK: 0,
  TONE: 1,
  PLAY: 2,
  REPEAT: 3,
  SERVICE: 4,
};

class Speaker {
  constructor(brick) {
    this.brick = brick;
  }

  tone(level, frequency, duration) {
    return this.brick.dispatch([
      command([
        opSound,
        LCX(SOUND_SUBCODE.TONE),
        LCX(level), // VOLUME
        LCX(frequency), // FREQUENCY
        LCX(duration), // DURATION
      ])
    ]);
  }

  playFile(path) {
    // path is relative to /home/lms2012
    // /home/prjs - root of what you see in EV3 file browser
    // eg to play a file from EV3 commander: ../prjs/everstorm/ok1
    // ref: http://ev3.fantastic.computer/doxygen/UIdesign.html
    return command([
      opSound,
      LCX(SOUND_SUBCODE.PLAY),
      LCX(100),
      LCS(path),
    ]);
  }

  waitReady() {
    return command([
      opSound_Ready,
    ]);
  }
}

module.exports = Speaker;
