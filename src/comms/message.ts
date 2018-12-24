class Message {
  items: [Buffer?]

  constructor(opCode: number, subCode?: number) {
    this.items = [];

    if (opCode) {
      this.addItem(1, (b) => {
        b.writeUInt8(opCode, 0);
      });
    }

    if (subCode) {
      this.addItem(1, (b) => {
        b.writeUInt8(subCode, 0);
      });
    }
  }

  addItem(l: number, cb: (b: Buffer) => void) {
    const b = Buffer.alloc(l);
    cb(b);
    this.items.push(b);
  }

  getData() {
    return Buffer.concat(this.items);
  }

  lc0(byte: number) {
    this.addItem(1, (b) => {
      b.writeUInt8(byte, 0);
    });
  }

  lc1(byte: number) {
    this.addItem(2, (b) => {
      b.writeUInt8(0x81, 0);
      b.writeUInt8(byte, 1);
    });
  }

  lc2(bytes: number) {
    this.addItem(3, (b) => {
      b.writeUInt8(0x82, 0);
      b.writeUInt16LE(bytes, 1);
    });
  }
}

export default Message;
