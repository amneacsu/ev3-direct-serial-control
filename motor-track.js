const EV3 = require('./lib');
const readline = require('readline');

const port = process.argv[2] || '/dev/tty.EV3-SerialPort';

const brick = new EV3.Brick();

let target = 0;
const ratio = 72;

const clamp = (v, min, max) => {
  return Math.max(min,  Math.min(v, max));
};

brick.connect(port).then(() => {
  const motor = new EV3.Motor(brick, EV3.Motor.MOTOR_A);
  const speaker = new EV3.Speaker(brick);

  const track = () => {
    motor.readTachos().then(tachos => {
      console.log('Tachos: ', tachos);

      const marg = Math.abs((target * ratio) - tachos);

      if (marg < 4) {
        console.log('STOP');
        motor.stop();
      } else {
        motor.start();
        const polarity = (target * ratio) < tachos ? -1 : 1;
        const diff = Math.abs(target * ratio - tachos);
        // const power = Math.round(clamp(diff / ((target * ratio) / 100), 3, 100));

        // console.log('Power', power);
        console.log('Polarity', polarity);

        // motor.setPower(power);
        motor.setPolarity(polarity);
      }

      track();
    });
  };

  motor.start().then(() => {
    motor.setPower(5);
    track();
  });

  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.prompt();

  rl.on('line', function(line) {
    target = parseInt(line);
    console.log('set', target);
    rl.prompt();
  }).on('close', function() {
    motor.stop().then(() => {
      brick.disconnect();
      process.exit();
    });
  });

  process.on('SIGINT', function() {
    motor.stop().then(() => {
      brick.disconnect();
      process.exit();
    });
  });
});
