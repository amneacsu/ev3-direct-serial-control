const EV3 = require('./lib');

const port = process.argv[2] || '/dev/tty.EV3-SerialPort';

const brick = new EV3.Brick();

brick.connect(port).then(() => {
  const motor = new EV3.Output(brick, EV3.Output.MOTOR_A);
  const speaker = new EV3.Speaker(brick);
  const screen = new EV3.Screen(brick);
  const sensor = new EV3.Input(brick);

  const run = () => {
    speaker.tone(1, 100, 50).then(() => {
      brick.disconnect();
      process.exit();
    });
  };

  run();
});
