const assert = require('assert');

const { GVX } = require('../lib');

describe('GVX', () => {
  it('should return a valid GV0', () => {
    const value = 31;
    const result = GVX(value).getInt8() - 96;

    assert.equal(result, value);
  });

  it('should return a valid GV1', () => {
    const value = 255;
    const result = GVX(value).getUint8(1, true);

    assert.equal(result, value);
  });

  it('should return a valid GV2', () => {
    const value = 65535;
    const result = GVX(value).getUint16(1, true);

    assert.equal(result, value);
  });

  it('should return a valid GV4', () => {
    const value = 4294967295;
    const result = GVX(value).getUint32(1, true);

    assert.equal(result, value);
  });
});
