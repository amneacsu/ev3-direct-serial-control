import Comm from './comm';
import Motor from './motor';

const port = new Comm();
const m1 = new Motor();

const move = m1.outputStepSpeed();

setInterval(() => {
  port.dispatch([move]);
}, 3000);
