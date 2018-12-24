import * as SerialPort from 'serialport';
import Message from './message';

type Listener = {
  counter: number,
  cb: (data: any) => void
};

class Comm {
  counter: number
  connection: SerialPort
  listeners: Listener[]

  constructor(port: string) {
    this.counter = 0;
    this.listeners = [];

    const connection = new SerialPort(port, {
      baudRate: 460800,
      // baudRate: 57600,
    });

    // Open errors will be emitted as an error event
    connection.on('error', function(err) {
      console.log('Error: ', err.message)
    });

    connection.on('data', (data: Buffer) => {
      const counter = data.readUInt16LE(2);

      const lis = this.listeners.find(l => l.counter === counter);

      if (lis) {
        console.log(lis);
      }
    });

    this.connection = connection;
  }

  addListener(counter: number, cb: any) {
    this.listeners.push({
      counter,
      cb,
    });
  }

  dispatch(cmds: Message[], cb?: (data: any) => void, alloc?: (data: Buffer) => void) {
    this.counter += 1;

    const header = Buffer.alloc(7);
    header.writeUInt16LE(this.counter, 2);

    if (!cb) {
      header.writeUInt8(0x80, 4); // direct command no reply
    }

    if (cb) {
      // this.addListener(this.counter, cb);
    }

    const cmdBuffers = cmds.map(cmd => cmd.getData());


    const data = Buffer.concat([header, ...cmdBuffers]);
    data.writeUInt16LE(data.length - 2, 0);

    if (alloc) {
      alloc(data);
    }

    this.connection.write(data, function(err) {
      if (err) {
        return console.error('Error on write: ', err.message)
      }
    });
  }
}

export default Comm;
