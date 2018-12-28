import {
  setPolarity,
  outputStepSpeed,
  MOTOR_A,
} from '../lib/motor';

export default class Azimuth {
  value: number

  constructor() {
    this.value = 0;
  }

  nudge(a: number) {
    // 72 turns - full 360
    return [
      setPolarity(MOTOR_A, a),
      outputStepSpeed(MOTOR_A, 20, 0, 36, 36, true),
    ];
  }
}
