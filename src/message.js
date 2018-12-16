class Message {
  constructor() {
    this.items = [];
  }

  addItem(l, cb) {
    const b = Buffer.alloc(l);
    cb(b);
    this.items.push(b);
  }

  getData() {
    return Buffer.concat(this.items);
  }

  lc0(byte) {
    this.addItem(1, (b) => {
      b.writeUInt8(byte);
    });
  }

  lc1(byte) {
    this.addItem(2, (b) => {
      b.writeUInt8(0x81);
      b.writeUInt8(byte, 1);
    });
  }

  lc2(bytes) {
    this.addItem(3, (b) => {
      b.writeUInt8(0x82);
      b.writeUInt16LE(bytes, 1);
    });
  }
}

module.exports = Message;
