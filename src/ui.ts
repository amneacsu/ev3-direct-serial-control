import Message from './message';

const opUI_DRAW = 0x84;

const UI_DRAW_SUBCODE = {
  UPDATE: 0,
  CLEAN: 1,
  PIXEL: 2,
  LINE: 3,
  CIRCLE: 4,
  TEXT: 5,
  ICON: 6,
  PICTURE: 7,
  VALUE: 8,
  FILLRECT: 9,
  RECT: 10,
  NOTIFICATION: 11,
  QUESTION: 12,
  KEYBOARD: 13,
  BROWSE: 14,
  VERTBAR: 15,
  INVERSERECT: 16,
  SELECT_FONT: 17,
  TOPLINE: 18,
  FILLWINDOW: 19,
  SCROLL: 20,
  DOTLINE: 21,
  VIEW_VALUE: 22,
  VIEW_UNIT: 23,
  FILLCIRCLE: 24,
  STORE: 25,
  RESTORE: 26,
  ICON_QUESTION: 27,
  BMPFILE: 28,
  POPUP: 29,
  GRAPH_SETUP: 30,
  GRAPH_DRAW: 31,
  TEXTBOX: 32,
};

export const fillRect = (c: number, x: number, y: number, w: number, h: number) => {
  const message = new Message(opUI_DRAW);
  message.lc0(UI_DRAW_SUBCODE.FILLRECT);

  message.lc1(c);
  message.lc2(x);
  message.lc2(y);
  message.lc2(w);
  message.lc2(h);

  return message;
}

export const pixel = (c: number, x: number, y: number) => {
  const message = new Message(opUI_DRAW);
  message.lc0(UI_DRAW_SUBCODE.PIXEL);

  message.lc1(c);
  message.lc2(x);
  message.lc2(y);

  return message;
};

export const update = () => {
  const message = new Message(opUI_DRAW);
  message.lc0(UI_DRAW_SUBCODE.UPDATE);
  return message;
};
