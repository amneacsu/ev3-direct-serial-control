import Message from './message';

const opINPUT_DEVICE = 0x99;

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

export const listen = () => {
  const message = new Message(opINPUT_DEVICE, INPUT_DEVICE_SUBCODE.READY_SI);

  // 00 LAYER_0
  message.lc0(0);

  // 00 SENSOR_PORT_1
  message.lc0(0);

  // 00 DO_NOT_CHANGE_TYPE
  message.lc0(0);

  // 02 MODE_2
  message.lc0(2);

  // 01 ONE_DATA_SET
  message.lc0(1);

  // 60 GLOBAL_VAR_INDEX0
  message.lc0(0x60);

  return message;
}
