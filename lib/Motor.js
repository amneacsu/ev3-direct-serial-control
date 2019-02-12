const { LCX, GVX } = require('./opcodes/macros');

const opOUTPUT_STOP = 0xA3;
const opOUTPUT_POWER = 0xA4;
const opOUTPUT_START = 0xA6;
const opOutput_Polarity = 0xA7;
const opOutput_Read = 0xA8;
const opOUTPUT_STEP_SPEED = 0xAE;
const opOUTPUT_TIME_SPEED = 0xAF;
const opOutput_Get_Count = 0xB3;


const opInput_Device = 0x99;
const READY_RAW = 0x1C;
const READY_SI = 0x1D;

class Motor {
  constructor(brick, nos = 0) {
    this.brick = brick;
    this.nos = nos;
  }

  op(opCode, ...args) {
    return this.brick.dispatch([
      opCode,
      LCX(0),
      LCX(this.nos),
      ...args,
    ]);
  }

  readTachos() {
    return this.brick.dispatch([
      opInput_Device,
      READY_SI,
      LCX(0),                   // LAYER
      LCX(15 + this.nos),            // NO
      LCX(7),                   // TYPE
      LCX(0),                   // MODE 2 = speed, 1 =
      LCX(1),                   // VALUES
      GVX(0),                   // VALUE1
    ], 0, 4).then((resp) => {
      return resp.readFloatLE(0);
    });
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
      opOutput_Polarity,
      LCX(0),
      LCX(this.nos),
      LCX(polarity),
    ]);
  };
}

Motor.MOTOR_A = 0x01;
Motor.MOTOR_B = 0x02
Motor.MOTOR_C = 0x04
Motor.MOTOR_D = 0x08

module.exports = Motor;
