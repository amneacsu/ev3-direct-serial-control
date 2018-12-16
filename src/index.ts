import Comm from './comm';
import Motor from './motor';

const port = new Comm('/dev/tty.EV3-SerialPort-1');
const m1 = new Motor();
const move = m1.outputStepSpeed();

setInterval(() => {
  port.dispatch([move]);
}, 3000);
