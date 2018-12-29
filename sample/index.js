const EV3 = require('../lib');

const brick = new EV3.Brick();

const port = process.argv[2] || '/dev/tty.EV3-SerialPort-1';

brick.connect(port).then(() => {
  const motor = new EV3.Output(EV3.Output.MOTOR_A);
  const speaker = new EV3.Speaker();
  const screen = new EV3.Screen();
  const sensor = new EV3.Input();

  brick.dispatch([
    motor.setPower(100),
  ]);

  // setInterval(() => {
  //   brick.dispatch([
  //     speaker.tone(1, 100, 50),
  //     screen.fillRect(0, 0, 0, 100, 100),
  //   ]);
  // }, 1000);

  setInterval(() => {
    brick.dispatch([sensor.listen()], (h) => {
      // four byte reserve global alloc
      h.writeUInt16LE(4, 5);
    }).then((data) => {
      console.log(data);
    });
  }, 500);
});
