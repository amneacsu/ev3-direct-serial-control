import Comm from '../lib';
import { tone } from '../lib/speaker';

const port = new Comm('/dev/tty.EV3-SerialPort-1', () => {
  setInterval(() => {
    port.dispatch([
      tone(1, 200, 50),
    ]);
  }, 1000);
});
