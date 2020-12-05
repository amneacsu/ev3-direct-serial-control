const SerialPort = require('virtual-serialport');

const EV3 = require('./lib');
const speakerOpcodes = require('./lib/opcodes/speaker');
const screenOpcodes = require('./lib/opcodes/screen');

const run = (conn) => {
  const brick = new EV3.Brick();
  brick.connect(conn);

  brick.dispatch([screenOpcodes.getOsVers(128)], 0, 128).then((data) => {
    console.log(data.toString());

    const beep = speakerOpcodes.tone(volume = 1, freq = 1, duration = 50);
    brick.dispatch([beep]);
    brick.disconnect();
  }, (er) => {
    console.error(er);
  });
};

const port = process.argv[2] || '/dev/tty.EV3-SerialPort';
const connection = new SerialPort(port, {});
console.log(`Connecting to ${port}...`);
connection.on('error', (err) => console.log('Error: ', err.message));
connection.on('open', () => run(connection));
