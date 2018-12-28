const Message = require('./Message');

const opOUTPUT_STOP = 0xA3;
const opOUTPUT_POWER = 0xA4;
const opOUTPUT_START = 0xA6;
const opOUTPUT_POLARITY = 0xA7;
const opOUTPUT_STEP_SPEED = 0xAE;
const opOUTPUT_TIME_SPEED = 0xAF;

class Input {
  constructor(nos = 0) {
    this.nos = nos;
  }

  setPower(power) {
    const message = new Message(opOUTPUT_POWER);
    message.lc0(0);
    message.lc0(this.nos);
    message.lc1(power);

    return message;
  };

  start() {
    const message = new Message(opOUTPUT_START);
    message.lc0(0);
    message.lc0(this.nos);

    return message;
  };

  stop(brake = false) {
    const message = new Message(opOUTPUT_STOP);
    message.lc0(0);
    message.lc0(this.nos);
    message.lc1(Number(brake));

    return message;
  };

  outputStepSpeed(
    power,
    step1,
    step2,
    step3,
    brake = true,
  ) {
    const message = new Message(opOUTPUT_STEP_SPEED);

    message.lc0(0); // LAYER = 0
    message.lc0(this.nos);
    message.lc1(power);
    message.lc0(step1);
    message.lc2(step2);
    message.lc2(step3);
    message.lc0(Number(brake));

    return message;
  }

  outputTimeSpeed(
    power,
    step1,
    step2,
    step3,
    brake = true,
  ) {
    const message = new Message(opOUTPUT_TIME_SPEED);

    message.lc0(0); // LAYER = 0
    message.lc0(this.nos);
    message.lc1(power);
    message.lc0(step1);
    message.lc2(step2);
    message.lc2(step3);
    message.lc0(Number(brake));

    return message;
  }

  setPolarity(polarity) {
    const message = new Message(opOUTPUT_POLARITY);

    message.lc0(0);
    message.lc0(this.nos);
    message.lc1(polarity);
    return message;
  };
}

Input.MOTOR_A = 0x01;
Input.MOTOR_B = 0x02
Input.MOTOR_C = 0x04
Input.MOTOR_D = 0x08

module.exports = Input;
