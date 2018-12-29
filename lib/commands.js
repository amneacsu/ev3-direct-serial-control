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
  lc0,
  lc1,
  lc2,
  commandReply,
  command,
};
