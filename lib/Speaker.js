const Message = require('./Message');

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
    const message = new Message(opSound, SOUND_SUBCODE.TONE);

    message.lc1(level); // VOLUME
    message.lc2(frequency); // FREQUENCY
    message.lc2(duration); // DURATION

    return message;
  }
}

module.exports = Speaker;
