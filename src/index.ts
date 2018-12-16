import Comm from './comm';
import { outputStepSpeed } from './motor';
import { tone } from './speaker';

const port = new Comm('/dev/tty.EV3-SerialPort-1');
const move = outputStepSpeed();

const zz = tone(2, 1000, 1000);

setInterval(() => {
  port.dispatch([move, zz]);
}, 3000);
