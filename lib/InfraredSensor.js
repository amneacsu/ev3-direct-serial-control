const { LCX, GVX } = require('./opcodes/macros');

const opInput_Device = 0x99;
const READY_SI = 0x1D;

class InfraredSensor {
  constructor(brick, nos = 0) {
    this.brick = brick;
    this.nos = nos;
  }

  readDistance() {
    return this.brick.dispatch([
      opInput_Device,
      READY_SI,
      LCX(0),                   // LAYER
      LCX(this.nos),            // NO
      LCX(33),                  // TYPE
      LCX(0),                   // MODE 0
      LCX(1),                   // VALUES
      GVX(0),                   // VALUE1
    ], 0, 4).then((resp) => {
      return resp.readFloatLE(0);
    });
  }
}

module.exports = InfraredSensor;
