import Message from './message';

export const fillRect = (c: number, x: number, y: number, w: number, h: number) => {
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

export const pixel = (c: number, x: number, y: number) => {
  const message = new Message();
  message.lc0(0x84); // opUI_DRAW
  message.lc0(0x02); // PIXEL

  message.lc1(c);
  message.lc2(x);
  message.lc2(y);

  return message.getData();
};

export const update = () => {
  const message = new Message();
  message.lc0(0x84); // opUI_DRAW
  message.lc0(0x00); // UPDATE
  return message.getData();
};
