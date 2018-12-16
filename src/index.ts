import Comm from './comm';
import Motor from './motor';
import Speaker from './speaker';

const port = new Comm('/dev/tty.EV3-SerialPort-1');
const m1 = new Motor();
const move = m1.outputStepSpeed();

const s1 = new Speaker();
const zz = s1.tone(2, 1000, 1000);

setInterval(() => {
  port.dispatch([move, zz]);
}, 3000);
