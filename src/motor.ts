import Message from './message';

class Motor {
  outputStepSpeed() {
    const message = new Message();

    message.lc0(0xAE); // opOUTPUT_STEP_SPEED
    message.lc0(0); // LAYER = 0
    message.lc0(0x03); // NOS = MOTOR_A + MOTOR_B
    message.lc1(50); // SPEED = 50 – Power level, [-100 - 100]
    message.lc0(0); // STEP1
    message.lc2(900); // STEP2
    message.lc2(180); // STEP3
    message.lc0(1); // BRAKE

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

export default Motor;
