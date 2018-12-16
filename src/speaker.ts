import Message from './message';

export const tone = (level: number, frequency: number, duration: number) => {
  const message = new Message();

  message.lc0(0x94); // opSound
  message.lc0(0x01); // CMD: TONE
  message.lc1(level); // VOLUME
  message.lc2(frequency); // FREQUENCY
  message.lc2(duration); // DURATION

  return message;
}
