const Message = require('./message');

class Motor {
  outputStepSpeed() {
    const message = new Message();

    // opOUTPUT_STEP_SPEED
    message.lc0(0xAE);

    // (Data8) LAYER – Specify chain layer number, [0 - 3]
    message.lc0(0);

    // (Data8) NOS – Output bit field, [0x00 – 0x0F]
    message.lc0(0x03);

    // (Data8) SPEED – Power level, [-100 - 100]
    message.lc1(50);

    // (Data32) STEP1 – Tacho pulses during ramp up
    message.lc0(0);

    // (Data32) STEP2 – Tacho pulses during continues run
    message.lc2(900);

    // (Data32) STEP3 – Tacho pulses during ramp down
    message.lc2(180);

    // (Data8) BRAKE - Specify break level, [0: Float, 1: Break]
    message.lc0(1);

    return message.getData();
  }

  // listen() {
  //   const message = new Message();
  //
  //   // 99 opINPUT_DEVICE
  //   message.lc0(0x99);
  //
  //   // 1D READY_SI
  //   message.lc0(0x1D);
  //
  //   // 00 LAYER_0
  //   message.lc0(0);
  //
  //   // 00 SENSOR_PORT_1
  //   message.lc0(0);
  //
  //   // 00 DO_NOT_CHANGE_TYPE
  //   message.lc0(0);
  //
  //   // 02 MODE_2
  //   message.lc0(2);
  //
  //   // 01 ONE_DATA_SET
  //   message.lc0(1);
  //
  //   // 60 GLOBAL_VAR_INDEX0
  //   message.lc0(0x60);
  //
  //   const action = message.getData();
  //   return action;
  // }
}

module.exports = Motor;
