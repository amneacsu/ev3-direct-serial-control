const bytesShortFormat = (value) => {
  const arr = new ArrayBuffer(1);
  const view = new DataView(arr);

  if (value >= -32 && value < 0) {
    view.setInt8(0, 0x3F & (value + 64));
  } else if (value >= 0 && value < 32) {
    view.setInt8(0, value);
  }

  return view;
};

const bytesLongFormat = (value, byteLength) => {
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

/**
 * create a LC0, LC1, LC2, LC4, dependent from the value
 */
const LCX = (value) => {
  if (value >= -32 && value < 32) {
    // LC0 positive - signed char
    return bytesShortFormat(value);
  } else if (value >= -127 && value <= 127) {
    // LC1 - LE signed char
    return bytesLongFormat(value, 1);
  } else if (value >= -32767 && value <= 32767) {
    // LC2 - LE signed short
    return bytesLongFormat(value, 2);
  } else {
    // LC4 - LE signed int
    return bytesLongFormat(value, 4);
  }

  throw new Error('Invalid byte length for LCX');
};

const lc0 = (byte) => {
  const b = Buffer.alloc(1);
  b.writeUInt8(byte, 0);
  return b;
};

const lc1 = (byte) => {
  const b = Buffer.alloc(2);
  b.writeUInt8(0x81, 0);
  b.writeUInt8(byte, 1);
  return b;
}

const lc2 = (bytes) => {
  const b = Buffer.alloc(3);
  b.writeUInt8(0x82, 0);
  b.writeUInt16LE(bytes, 1);
  return b;
}

const DIRECT_COMMAND_REPLY = 0x00;
const DIRECT_COMMAND_NO_REPLY = 0x80;

const command = (args) => {
  return {
    reply: true,
    payload: Buffer.concat(args),
  }
};

const commandReply = (args) => {
  return {
    reply: false,
    payload: Buffer.concat(args),
  }
};

module.exports = {
  LCX,
  lc0,
  lc1,
  lc2,
  commandReply,
  command,
};
