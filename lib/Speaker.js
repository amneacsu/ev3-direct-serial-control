const { command, lc0, lc1, lc2 } = require('./commands');

const opSound = 0x94;

const SOUND_SUBCODE = {
  BREAK: 0,
  TONE: 1,
  PLAY: 2,
  REPEAT: 3,
  SERVICE: 4,
};

class Speaker {
  tone(level, frequency, duration) {
    return command([
      lc0(opSound),
      lc0(SOUND_SUBCODE.TONE),
      lc1(level), // VOLUME
      lc2(frequency), // FREQUENCY
      lc2(duration), // DURATION
    ]);
  }
}

module.exports = Speaker;
