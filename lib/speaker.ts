import Message from './message';

const opSound = 0x94;

const SOUND_SUBCODE = {
  BREAK: 0,
  TONE: 1,
  PLAY: 2,
  REPEAT: 3,
  SERVICE: 4,
};

export const tone = (level: number, frequency: number, duration: number) => {
  const message = new Message(opSound, SOUND_SUBCODE.TONE);

  message.lc1(level); // VOLUME
  message.lc2(frequency); // FREQUENCY
  message.lc2(duration); // DURATION

  return message;
}
