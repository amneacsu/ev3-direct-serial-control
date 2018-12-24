import Comm from './comms';
import { start, stop, setPower, outputStepSpeed, MOTOR_A, MOTOR_D } from './comms/motor';

import Input from './input';

const input = new Input();

// const ttyName = '/dev/tty.EV3-SerialPort-1';
const ttyName = '/dev/ttys001';
const port = new Comm(ttyName, () => {
  port.dispatch([
    start(MOTOR_A),
    setPower(MOTOR_A, 50),
  ]);

  setTimeout(() => {
    const z = stop(MOTOR_A, true);
    port.dispatch([z]);
  }, 2000);

  input.onKey('x', () => {
    port.dispatch([stop(MOTOR_A, true)]).then(() => {
      process.exit(0);
    });
  });

});

// setInterval(() => {
//   const t = tone(1, 200, 50);
//   const x = outputStepSpeed(MOTOR_A, 50, 0, 200, 100, true);
//   const y = outputStepSpeed(MOTOR_D, 50, 0, 200, 100, true);
//   port.dispatch([t, x, y]);
// }, 500);
