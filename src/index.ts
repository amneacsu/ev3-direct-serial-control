import Comm from './comms';
import { start, stop, setPower, outputStepSpeed, MOTOR_A, MOTOR_D } from './comms/motor';

const ttyName = '/dev/tty.EV3-SerialPort-1';
console.log(`Connecting to ${ttyName}...`);
const port = new Comm(ttyName, () => {
  console.log('Connected!');

  // const x = start(MOTOR_A);
  // const y = setPower(MOTOR_A, 50);
  //
  // port.dispatch([x, y]);
  //
  // setTimeout(() => {
  //   const z = stop(MOTOR_A, true);
  //   port.dispatch([z]);
  // }, 2000);

  process.on('SIGINT', function() {
    const z = stop(MOTOR_A, true);
    port.dispatch([z]);

    console.log("Caught interrupt signal");

    process.exit();
  });

});

// setInterval(() => {
//   const t = tone(1, 200, 50);
//   const x = outputStepSpeed(MOTOR_A, 50, 0, 200, 100, true);
//   const y = outputStepSpeed(MOTOR_D, 50, 0, 200, 100, true);
//   port.dispatch([t, x, y]);
// }, 500);
