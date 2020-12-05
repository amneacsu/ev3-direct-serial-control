const EV3 = require('./lib');

const port = process.argv[2] || '/dev/tty.EV3-SerialPort';

const brick = new EV3.Brick();

const speakerOpcodes = require('./lib/opcodes/speaker');
const screenOpcodes = require('./lib/opcodes/screen');

brick.connect(port).then(() => {
  const run = () => {
    // const x1 = screenOpcodes.fillRect(0, 0, 0, 178, 128);
    // const x2 = screenOpcodes.pixel(1, 120, 120);
    // const x3 = screenOpcodes.update();
    //
    // brick.dispatch([x1, x2, x3]);

    brick.dispatch([screenOpcodes.getOsVers(128)], 0, 128).then((data) => {
      console.log(data.toString());
    }, (er) => {
      console.error(er);
    });

    const beep = speakerOpcodes.tone(volume = 1, freq = 1, duration = 50);

    brick.dispatch([beep]);
  };

  run();
});
