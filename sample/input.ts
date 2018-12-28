import * as readline from 'readline';

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

export default class Input {
  listeners: [any?]

  constructor() {
    this.listeners = [];

    process.stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } else {
        this.listeners.forEach(listener => {
          if (str === listener.s) {
            listener.cb();
          }
        });
      }
    });
  }

  onKey(s: string, cb: () => void) {
    this.listeners.push({ s, cb });
  }
}
