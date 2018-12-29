const assert = require('assert');

const { LCX } = require('../lib');

describe('LCX', () => {
  it('should return a valid LC0 - negative', () => {
    const value = -32;
    const result = LCX(value).getInt8() - 64;

    assert.equal(result, value);
  });

  it('should return a valid LC0 - positive', () => {
    const value = 31;
    const result = LCX(value).getInt8();

    assert.equal(result, value);
  });

  it('should return a valid LC1', () => {
    const value = -127;
    const result = LCX(value).getInt8(1, true);

    assert.equal(result, value);
  });

  it('should return a valid LC2', () => {
    const value = -32767;
    const result = LCX(value).getInt16(1, true);

    assert.equal(result, value);
  });

  it('should return a valid LC4', () => {
    const value = 2147483647;
    const result = LCX(value).getInt32(1, true);

    assert.equal(result, value);
  });
});
