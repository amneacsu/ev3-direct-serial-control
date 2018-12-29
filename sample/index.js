const EV3 = require('../lib');

const brick = new EV3.Brick();

const port = process.argv[2] || '/dev/tty.EV3-SerialPort-1';

brick.connect(port).then(() => {
  const motor = new EV3.Output(EV3.Output.MOTOR_A);
  const speaker = new EV3.Speaker();
  const screen = new EV3.Screen();
  const sensor = new EV3.Input();

  const run = () => {
    brick.dispatch([
      speaker.tone(1, 100, 50),
    ]);
  };

  setInterval(run, 1000);
});
