const { command, LCX, GVX } = require('./commands');

const opINPUT_READ = 0x9A;
const opInput_Device = 0x99;
const opINPUT_READSI = 0x9D;

const INPUT_DEVICE_SUBCODE = {
  INSERT_TYPE: 1,
  GET_FORMAT: 2,
  CAL_MINMAX: 3,
  CAL_DEFAULT: 4,
  GET_TYPEMODE: 5,
  GET_SYMBOL: 6,
  CAL_MIN: 7,
  CAL_MAX: 8,
  SETUP: 9,
  CLR_ALL: 10,
  GET_RAW: 11,
  GET_CONNECTION: 12,
  STOP_ALL: 13,
  SET_TYPEMODE: 14,
  READY_IIC: 15,
  GET_NAME: 21,
  GET_MODENAME: 22,
  SET_RAW: 23,
  GET_FIGURES: 24,
  GET_CHANGES: 25,
  CLR_CHANGES: 26,
  READY_PCT: 27,
  READY_RAW: 28,
  READY_SI: 29,
  GET_MINMAX: 30,
  GET_BUMPS: 31,
};

class Input {
  listen() {
    return command([
      opInput_Device,
      LCX(INPUT_DEVICE_SUBCODE.READY_SI),

      // 00 LAYER_0
      LCX(0),

      // 00 SENSOR_PORT_1
      LCX(0),

      // 00 DO_NOT_CHANGE_TYPE
      LCX(0),

      // 02 MODE_2
      LCX(2),

      // 01 ONE_DATA_SET
      LCX(1),

      // 60 GLOBAL_VAR_INDEX0
      LCX(0x60),
    ]);
  }

  getTypeMode(nos) {
    return command([
      opInput_Device,
      INPUT_DEVICE_SUBCODE.GET_TYPEMODE,
      LCX(0),                   // LAYER
      LCX(nos),                 // NOS
      GVX(0),                   // TYPE
      GVX(1),                   // MODE
    ]);
  }
}

module.exports = Input;
