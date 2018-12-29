const SerialPort = require('serialport');

const DIRECT_REPLY = 0x02;
const DIRECT_REPLY_ERROR = 0x04;

class Brick {
  constructor() {
    this.counter = 0;
    this.listeners = [];
  }

  connect(port) {
    console.log(`Connecting to ${port}...`);

    const connection = new SerialPort(port, {
      // baudRate: 460800,
      // baudRate: 57600,
    });

    // Open errors will be emitted as an error event
    connection.on('error', function(err) {
      console.log('Error: ', err.message)
    });

    connection.on('data', (data) => {
      console.log('RX', data);
      // const size = data.readUInt16LE(0);
      // const counter = data.readUInt16LE(2);
      // const type = data.readUInt8(4);
      //
      // const response = data.slice(5);
      //
      // const listener = this.listeners.find(l => l.counter === counter);
      //
      // if (listener) {
      //   if (type === DIRECT_REPLY_ERROR) {
      //     listener.reject(response);
      //   } else {
      //     listener.resolve(response);
      //   }
      // }
    });

    this.connection = connection;

    return new Promise((resolve, reject) => {
      connection.on('open', () => {
        console.log('Connected!');
        resolve();
      });
    });
  }

  addListener(counter, resolve, reject) {
    this.listeners.push({
      counter,
      resolve,
      reject,
    });
  }

  dispatch(cmds, alloc) {
    this.counter += 1;

    const header = Buffer.alloc(7);
    header.writeUInt16LE(this.counter, 2);

    if (!alloc) {
      header.writeUInt8(0x80, 4); // direct command no reply
    }

    const cmdBuffers = cmds.map(cmd => cmd.payload);
    const data = Buffer.concat([header, ...cmdBuffers]);

    // write packet length
    data.writeUInt16LE(data.length - 2, 0);
    console.log('TX', data);

    if (alloc) {
      // allocate vars
      alloc(data);

      return new Promise((resolve, reject) => {
        this.addListener(this.counter, resolve, reject);

        this.connection.write(data, function(err) {
          if (err) {
            reject(err);
          }
        });
      });
    }

    return new Promise((resolve, reject) => {
      this.connection.write(data, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Brick;
