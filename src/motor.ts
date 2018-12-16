import Message from './message';

export const outputStepSpeed = () => {
  const message = new Message();

  message.lc0(0xAE); // opOUTPUT_STEP_SPEED
  message.lc0(0); // LAYER = 0
  message.lc0(0x03); // NOS = MOTOR_A + MOTOR_B
  message.lc1(50); // SPEED = 50 – Power level, [-100 - 100]
  message.lc0(0); // STEP1
  message.lc2(900); // STEP2
  message.lc2(180); // STEP3
  message.lc0(1); // BRAKE

  return message;
}
