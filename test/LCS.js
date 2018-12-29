const assert = require('assert');

const { LCS } = require('../lib');

describe('LCS', () => {
  it('should return a valid LCS', () => {
    const value = 'myEV3';
    const result = Buffer.from(LCS(value).buffer).slice(1, -1).toString();

    assert.equal(result, value);
  });
});
