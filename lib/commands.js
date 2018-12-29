const localConstantShort = (value) => {
  const arr = new ArrayBuffer(1);
  const view = new DataView(arr);

  if (value >= -32 && value < 0) {
    view.setInt8(0, 0x3F & (value + 64));
  } else if (value >= 0 && value < 32) {
    view.setInt8(0, value);
  }

  return view;
};

const localConstantLong = (value, byteLength) => {
  const arr = new ArrayBuffer(byteLength + 1);
  const view = new DataView(arr);

  if (byteLength === 1) {
    view.setUint8(0, 0x81);
    view.setInt8(1, value, true);
  } else if (byteLength === 2) {
    view.setUint8(0, 0x82);
    view.setInt16(1, value, true);
  } else if (byteLength === 4) {
    view.setUint8(0, 0x83);
    view.setInt32(1, value, true);
  }

  return view;
};

const localVariableShort = (value) => {
  const arr = new ArrayBuffer(1);
  const view = new DataView(arr);
  view.setInt8(0, 0x40 | value);
  return view;
};

const localVariableLong = (value, byteLength) => {
  const arr = new ArrayBuffer(byteLength + 1);
  const view = new DataView(arr);

  if (byteLength === 1) {
    view.setUint8(0, 0xC1);
    view.setUint8(1, value, true);
  } else if (byteLength === 2) {
    view.setUint8(0, 0xC2);
    view.setUint16(1, value, true);
  } else if (byteLength === 4) {
    view.setUint8(0, 0xC3);
    view.setUint32(1, value, true);
  }

  return view;
};

/**
 * create a LC0, LC1, LC2, LC4, dependent from the value
 */
const LCX = (value) => {
  if (value >= -32 && value < 32) {
    // LC0 positive - signed char
    return localConstantShort(value);
  } else if (value >= -127 && value <= 127) {
    // LC1 - LE signed char
    return localConstantLong(value, 1);
  } else if (value >= -32767 && value <= 32767) {
    // LC2 - LE signed short
    return localConstantLong(value, 2);
  } else {
    // LC4 - LE signed int
    return localConstantLong(value, 4);
  }

  throw new Error('Invalid byte length for LCX');
};

/**
 * create a LV0, LV1, LV2, LV4, dependent from the value
 */
const LVX = (value) => {
  if (value < 0) {
    throw Error('No negative values allowed');
  } else if (value < 32) {
    return localVariableShort(value);
  } else if (value < 256) {
    // LE signed char
    return localVariableLong(value, 1);
  } else if (value < 65536) {
    // LE signed short
    return localVariableLong(value, 2);
  } else {
    // LE signed int
    return localVariableLong(value, 4);
  }

  throw new Error('Invalid byte length for LVX');
};

/**
 * pack a string into a LCS
 */
const LCS = (str) => {
  const arr = new ArrayBuffer(str.length + 2);
  const view = new DataView(arr);

  for (let i = 0; i < str.length; i += 1) {
    view.setUint8(i + 1, str.charCodeAt(i));
  };

  view.setUint8(0, 0x84);
  view.setUint8(str.length + 1, 0x00);

  return view;
};

const DIRECT_COMMAND_REPLY = 0x00;
const DIRECT_COMMAND_NO_REPLY = 0x80;

const makePayload = (args) => {
  return Buffer.concat(args.map(arg => {
    return Buffer.from(typeof arg === 'number' ? [arg] : arg.buffer);
  }));
};

const command = (args) => {
  return {
    reply: false,
    payload: makePayload(args),
  }
};

const commandReply = (args) => {
  return {
    reply: true,
    payload: makePayload(args),
  }
};

module.exports = {
  LCX,
  LCS,
  LVX,
  commandReply,
  command,
};
