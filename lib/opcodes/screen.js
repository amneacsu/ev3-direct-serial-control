const { LCX, LCS, GVX } = require('./macros');
const opcode = require('./opcode');

const opUI_DRAW = 0x84;
const opUI_Flush = 0x80;
const opUI_Read = 0x81;
const opUI_WRITE = 0x82;

const opUI_DRAWcmd = {
  UPDATE: 0x00,
  CLEAN: 0x01,
  PIXEL: 0x02,
  LINE: 0x03,
  CIRCLE: 0x04,
  TEXT: 0x05,
  ICON: 0x06,
  PICTURE: 0x07,
  VALUE: 0x08,
  FILLRECT: 0x09,
  RECT: 0x0A,
  NOTIFICATION: 0x0B,
  QUESTION: 0x0C,
  KEYBOARD: 0x0D,
  BROWSE: 0x0E,
  VERTBAR: 0x0F,
  INVERSERECT: 0x10,
  SELECT_FONT: 0x11,
  TOPLINE: 0x12,
  FILLWINDOW: 0x13,
  DOTLINE: 0x15,
  VIEW_VALUE: 0x16,
  VIEW_UNIT: 0x17,
  FILLCIRCLE: 0x18,
  STORE: 0x19,
  RESTORE: 0x1A,
  ICON_QUESTION: 0x1B,
  BMPFILE: 0x1C,
  GRAPH_SETUP: 0x1E,
  GRAPH_DRAW: 0x1F,
  TEXTBOX: 0x20,
};

const opUI_Read_cmd = {
  GET_VBATT: 0x01,
  GET_IBATT: 0x02,
  GET_OS_VERS: 0x03,
  GET_EVENT: 0x04,
  GET_TBATT: 0x05,
  GET_IMOTOR: 0x07,
  GET_STRING: 0x08,
  GET_HW_VERS: 0x09,
  GET_FW_VERS: 0x0A,
  GET_FW_BUILD: 0x0B,
  GET_OS_BUILD: 0x0C,
  GET_ADDRESS: 0x0D,
  GET_CODE: 0x0E,
  KEY: 0x0F,
  GET_SHUTDOWN: 0x10,
  GET_WARNING: 0x11,
  GET_LBATT: 0x12,
  TEXTBOX_READ: 0x15,
  GET_VERSION: 0x1A,
  GET_IP: 0x1B,
  GET_SDCARD:0x1D,
  GET_USBSTICK: 0x1E,
  GET_FW_BUILD: 0x1F,
};

module.exports = {
  update: opcode(
    opUI_DRAW,
    LCX(0x00),
  ),
  fillRect: opcode(
    opUI_DRAW,
    LCX(0x09),
    LCX, // color
    LCX, // x0
    LCX, // y0
    LCX, // x1
    LCX, // y1
  ),
  pixel: opcode(
    opUI_DRAW,
    LCX(0x02),
    LCX, // color
    LCX, // x0
    LCX, // y0
  ),
  circle: opcode(
    opUI_DRAW,
    LCX(0x04),
    LCX, // color
    LCX, // x0
    LCX, // y1
    LCX, // r
  ),
  getVBatt: opcode(
    opUI_Read,
    LCX(0x01),
  ),
  getOsVers: opcode(
    opUI_Read,
    LCX(0x03),
    LCX,
    GVX(0),
  ),
};
