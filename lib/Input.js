const { command, lc0, lc1, lc2 } = require('./commands');

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
    return command([
      lc0(opOUTPUT_POWER),
      lc0(0),
      lc0(this.nos),
      lc1(power),
    ]);
  };

  start() {
    return command([
      lc0(opOUTPUT_START),
      lc0(0),
      lc0(this.nos),
    ]);
  };

  stop(brake = false) {
    return command([
      lc0(opOUTPUT_STOP),
      lc0(0),
      lc0(this.nos),
      lc1(Number(brake)),
    ]);
  };

  outputStepSpeed(
    power,
    step1,
    step2,
    step3,
    brake = true,
  ) {
    return command([
      lc0(opOUTPUT_STEP_SPEED),
      lc0(0),
      lc0(this.nos),
      lc1(power),
      lc0(step1),
      lc2(step2),
      lc2(step3),
      lc0(Number(brake)),
    ]);
  }

  outputTimeSpeed(
    power,
    step1,
    step2,
    step3,
    brake = true,
  ) {
    return command([
      lc0(opOUTPUT_TIME_SPEED),
      lc0(0),
      lc0(this.nos),
      lc1(power),
      lc0(step1),
      lc2(step2),
      lc2(step3),
      lc0(Number(brake)),
    ]);
  }

  setPolarity(polarity) {
    return command([
      lc0(opOUTPUT_TIME_SPEED),
      lc0(0),
      lc0(this.nos),
      lc1(polarity),
    ]);
  };
}

Input.MOTOR_A = 0x01;
Input.MOTOR_B = 0x02
Input.MOTOR_C = 0x04
Input.MOTOR_D = 0x08

module.exports = Input;
