const assert = require('assert');

const { LVX } = require('../lib');

describe('LVX', () => {
  it('should return a valid LV0', () => {
    const value = 31;
    const result = LVX(value).getInt8() - 64;

    assert.equal(result, value);
  });

  it('should return a valid LV1', () => {
    const value = 255;
    const result = LVX(value).getUint8(1, true);

    assert.equal(result, value);
  });

  it('should return a valid LV2', () => {
    const value = 65535;
    const result = LVX(value).getUint16(1, true);

    assert.equal(result, value);
  });

  it('should return a valid LV4', () => {
    const value = 4294967295;
    const result = LVX(value).getUint32(1, true);

    assert.equal(result, value);
  });
});
