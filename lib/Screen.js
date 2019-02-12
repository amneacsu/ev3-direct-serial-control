const { LCX } = require('./opcodes/macros');

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

class Screen {
  constructor(brick) {
    this.brick = brick;
  }

  fillRect(c, x, y, w, h) {
    return this.brick.dispatch([
      opUI_DRAW,
      LCX(UI_DRAW_SUBCODE.FILLRECT),
      LCX(c),
      LCX(x),
      LCX(y),
      LCX(w),
      LCX(h),
    ]);
  }

  pixel(c, x, y) {
    return this.brick.dispatch([
      opUI_DRAW,
      LCX(UI_DRAW_SUBCODE.PIXEL),
      LCX(c),
      LCX(x),
      LCX(y),
    ]);
  }

  update() {
    return this.brick.dispatch([
      opUI_DRAW,
      LCX(UI_DRAW_SUBCODE.UPDATE),
    ]);
  }
}

module.exports = Screen;
