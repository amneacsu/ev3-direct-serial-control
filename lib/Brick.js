const DIRECT_REPLY = 0x02;
const DIRECT_REPLY_ERROR = 0x04;

class Brick {
  constructor() {
    this.counter = 0;
    this.listeners = [];
  }

  connect(connection) {
    // Open errors will be emitted as an error event
    connection.on('error', function(err) {
      console.log('Error: ', err.message)
    });

    connection.on('data', (data) => {
      console.log('RX', data);
      const size = data.readUInt16LE(0);
      const counter = data.readUInt16LE(2);
      const type = data.readUInt8(4);
      const listener = this.listeners.find(l => l.counter === counter);

      if (listener) {
        const response = data.slice(5);

        if (type === DIRECT_REPLY_ERROR) {
          listener.reject(response);
        } else {
          listener.resolve(response);
        }
      }
    });

    this.connection = connection;
  }

  disconnect() {
    this.connection.close();
  }

  addListener(counter, resolve, reject) {
    this.listeners.push({
      counter,
      resolve,
      reject,
    });
  }

  dispatch(cmds, localMem, globalMem) {
    this.counter += 1;

    const header = Buffer.alloc(7);
    header.writeUInt16LE(this.counter, 2);

    if (!localMem && !globalMem) {
      header.writeUInt8(0x80, 4); // direct command no reply
    } else {
      header.writeUInt16LE(localMem * 1024 + globalMem, 5);
    }

    const data = Buffer.concat([header, ...cmds]);

    // write packet length
    data.writeUInt16LE(data.length - 2, 0);

    return new Promise((resolve, reject) => {
      console.log('TX', data);
      this.connection.write(data, err => {
        if (localMem || globalMem) {
          this.addListener(this.counter, resolve, reject);
        } else {
          resolve();
        }

        if (err) {
          reject(err);
        }
      });
    });
  }
}

module.exports = Brick;
