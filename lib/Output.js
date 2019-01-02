const { LCX } = require('./commands');

const opOUTPUT_STOP = 0xA3;
const opOUTPUT_POWER = 0xA4;
const opOUTPUT_START = 0xA6;
const opOUTPUT_POLARITY = 0xA7;
const opOUTPUT_STEP_SPEED = 0xAE;
const opOUTPUT_TIME_SPEED = 0xAF;

class Output {
  constructor(brick, nos = 0) {
    this.brick = brick;
    this.nos = nos;
  }

  setPower(power) {
    return this.brick.dispatch([
      opOUTPUT_POWER,
      LCX(0),
      LCX(this.nos),
      LCX(power),
    ]);
  };

  start() {
    return this.brick.dispatch([
      opOUTPUT_START,
      LCX(0),
      LCX(this.nos),
    ]);
  };

  stop(brake = false) {
    return this.brick.dispatch([
      opOUTPUT_STOP,
      LCX(0),
      LCX(this.nos),
      LCX(Number(brake)),
    ]);
  };

  outputStepSpeed(
    power,
    step1,
    step2,
    step3,
    brake = true,
  ) {
    return this.brick.dispatch([
      opOUTPUT_STEP_SPEED,
      LCX(0),
      LCX(this.nos),
      LCX(power),
      LCX(step1),
      LCX(step2),
      LCX(step3),
      LCX(Number(brake)),
    ]);
  }

  outputTimeSpeed(
    power,
    step1,
    step2,
    step3,
    brake = true,
  ) {
    return this.brick.dispatch([
      opOUTPUT_TIME_SPEED,
      LCX(0),
      LCX(this.nos),
      LCX(power),
      LCX(step1),
      LCX(step2),
      LCX(step3),
      LCX(Number(brake)),
    ]);
  }

  setPolarity(polarity) {
    return this.brick.dispatch([
      opOUTPUT_TIME_SPEED,
      LCX(0),
      LCX(this.nos),
      LCX(polarity),
    ]);
  };
}

Output.MOTOR_A = 0x01;
Output.MOTOR_B = 0x02
Output.MOTOR_C = 0x04
Output.MOTOR_D = 0x08

module.exports = Output;
