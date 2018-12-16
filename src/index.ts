import Comm from './comm';
import { listen } from './sensor';

const port = new Comm('/dev/tty.EV3-SerialPort-1');

setInterval(() => {
  const act = listen();

  port.dispatch([act], (data) => {
    console.log(data);
  }, (h) => {
    // one byte reserve global alloc
    h.writeUInt16LE(4, 5);
  });
}, 1000);
