import Comm from '../lib';
import { start, stop, setPower, outputStepSpeed, MOTOR_A, MOTOR_D } from '../lib/motor';

import Input from './input';
import Azimuth from './Azimuth';


const input = new Input();
const azimuth = new Azimuth();

const ttyName = '/dev/tty.EV3-SerialPort-1';
// const ttyName = '/dev/ttys001';
const port = new Comm(ttyName, () => {
  // port.dispatch([
  //   start(MOTOR_A),
  //   setPower(MOTOR_A, 50),
  // ]);
  //
  // setTimeout(() => {
  //   const z = stop(MOTOR_A, true);
  //   port.dispatch([z]);
  // }, 2000);

  input.onKey('x', () => {
    port.dispatch([stop(MOTOR_A, true)]).then(() => {
      process.exit(0);
    });
  });

  input.onKey('a', () => {
    port.dispatch(
      azimuth.nudge(-1),
    );
  });

  input.onKey('d', () => {
    port.dispatch(
      azimuth.nudge(1),
    );
  });

  let i = 0;

  const x = setInterval(() => {
    port.dispatch(
      azimuth.nudge(1),
    );
    i += 1;

    if (i === 180) {
      clearInterval(x);
    }
  }, 1000);

});

// setInterval(() => {
//   const t = tone(1, 200, 50);
//   const x = outputStepSpeed(MOTOR_A, 50, 0, 200, 100, true);
//   const y = outputStepSpeed(MOTOR_D, 50, 0, 200, 100, true);
//   port.dispatch([t, x, y]);
// }, 500);
