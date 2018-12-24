import Message from './message';

const opOUTPUT_STEP_SPEED = 0xAE;
const opOUTPUT_TIME_SPEED = 0xAF;

export const MOTOR_A = 0x01;
export const MOTOR_B = 0x02;
export const MOTOR_C = 0x04;
export const MOTOR_D = 0x08;

export const outputStepSpeed = (
  motors: number,
  power: number,
  step1: number,
  step2: number,
  step3: number,
  brake: boolean = true,
) => {
  const message = new Message(opOUTPUT_STEP_SPEED);

  message.lc0(0); // LAYER = 0
  message.lc0(motors);
  message.lc1(power);
  message.lc0(step1);
  message.lc2(step2);
  message.lc2(step3);
  message.lc0(Number(brake));

  return message;
}

export const outputTimeSpeed = (
  motors: number,
  power: number,
  step1: number,
  step2: number,
  step3: number,
  brake: boolean = true,
) => {
  const message = new Message(opOUTPUT_TIME_SPEED);

  message.lc0(0); // LAYER = 0
  message.lc0(motors);
  message.lc1(power);
  message.lc0(step1);
  message.lc2(step2);
  message.lc2(step3);
  message.lc0(Number(brake));

  return message;
}
