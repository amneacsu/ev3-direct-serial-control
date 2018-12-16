import Message from './message';

export const listen = () => {
  const message = new Message();

  // 99 opINPUT_DEVICE
  message.lc0(0x99);

  // 1D READY_SI
  message.lc0(0x1D);

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
