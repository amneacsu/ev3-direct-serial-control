const Message = require('./message');

const fillRect = (c, x, y, w, h) => {
  const message = new Message();
  message.lc0(0x84); // opUI_DRAW
  message.lc0(0x09); // FILLRECT

  message.lc1(c);
  message.lc2(x);
  message.lc2(y);
  message.lc2(w);
  message.lc2(h);

  return message.getData();
}

const pixel = (c, x, y) => {
  const message = new Message();
  message.lc0(0x84); // opUI_DRAW
  message.lc0(0x02); // PIXEL

  message.lc1(c);
  message.lc2(x);
  message.lc2(y);

  return message.getData();
};

const update = () => {
  const message = new Message();
  message.lc0(0x84); // opUI_DRAW
  message.lc0(0x00); // UPDATE
  return message.getData();
};

module.exports = {
  fillRect,
  update,
  pixel,
};
