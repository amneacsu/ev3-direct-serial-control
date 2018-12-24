import Comm from './comm';
import { tone } from './speaker';
import { outputStepSpeed, MOTOR_A, MOTOR_D } from './motor';

const port = new Comm('/dev/tty.EV3-SerialPort-1');

setInterval(() => {
  const t = tone(1, 200, 50);
  const x = outputStepSpeed(MOTOR_A, 50, 0, 200, 100, true);
  const y = outputStepSpeed(MOTOR_D, 50, 0, 200, 100, true);
  port.dispatch([t, x, y]);
}, 500);
