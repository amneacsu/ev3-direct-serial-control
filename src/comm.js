const SerialPort = require('serialport')

class Comm {
  constructor() {
    this.counter = 0;

    const port = new SerialPort('/dev/tty.EV3-SerialPort-1', {
      baudRate: 460800,
      // baudRate: 57600,
    });

    // Open errors will be emitted as an error event
    port.on('error', function(err) {
      console.log('Error: ', err.message)
    });

    this.port = port;
  }

  dispatchNoReply(cmds, cb) {
    this.dispatch(0x80, cmds, cb);
  }

  dispatchReply(cmds, cb) {
    this.dispatch(0x00, cmds, cb);
  }

  dispatch(t, cmds, cb) {
    this.counter += 1;

    const header = Buffer.alloc(7);
    header.writeUInt16LE(this.counter, 2);
    header.writeUInt8(t, 4); // direct command no reply

    const data = Buffer.concat([header, ...cmds]);
    data.writeUInt16LE(data.length - 2);

    cb(data);

    this.port.write(data, function(err) {
      if (err) {
        return console.error('Error on write: ', err.message)
      }

      // console.log(data)
    });
  }
}

module.exports = Comm;
