import * as SerialPort from 'serialport';

class Comm {
  counter: number
  connection: SerialPort

  constructor(port: string) {
    this.counter = 0;

    const connection = new SerialPort(port, {
      baudRate: 460800,
      // baudRate: 57600,
    });

    // Open errors will be emitted as an error event
    connection.on('error', function(err) {
      console.log('Error: ', err.message)
    });

    this.connection = connection;
  }

  dispatch(cmds: Buffer[], cb?: (data: any) => void) {
    this.counter += 1;

    const header = Buffer.alloc(7);
    header.writeUInt16LE(this.counter, 2);
    header.writeUInt8(0x80, 4); // direct command no reply

    const data = Buffer.concat([header, ...cmds]);
    data.writeUInt16LE(data.length - 2, 0);

    this.connection.write(data, function(err) {
      if (err) {
        return console.error('Error on write: ', err.message)
      }

      if (cb) {
        cb(data);
      }
    });
  }
}

export default Comm;
