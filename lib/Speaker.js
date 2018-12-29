const { command, LCX } = require('./commands');

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
      opSound,
      LCX(SOUND_SUBCODE.TONE),
      LCX(level), // VOLUME
      LCX(frequency), // FREQUENCY
      LCX(duration), // DURATION
    ]);
  }
}

module.exports = Speaker;
