const SerialPort = require('serialport')
const port = new SerialPort('/dev/tty.EV3-SerialPort-1', {
  baudRate: 57600,
});

// console.log(port);

// var five = require("johnny-five");
// var board = new five.Board({
//   port: port,
// });

// const msg = '';
// const data = Buffer.from(msg, 'hex');
// console.log(data);
//
// console.log(data.length);

port.on("open", function () {
  console.log('open');

  // Play a 1Kz tone at level 2 for 1 sec.
  // const msg = '0F0000008000009401810282E80382E803';

  // draw a pixel
  // const msg = '0F0000008000008402810182A00082A000';

  // set brick name to myEV3
  // const msg = '0E002A00000000D408846D7945563300';

  // clear screen
  const msg = '170000008000008409810082000082000082B2008280008400';
            // 170000008000008409810082000082000082B2008280008400
  const data = Buffer.from(msg, 'hex');
  port.write(data, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')
  });
});

// port.on('data', function(data) {
//   console.log(data);
// });
