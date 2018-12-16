const Comm = require('./comm');
const  { pixel, fillRect, update } = require('./ui');

const port = new Comm();

const clear = fillRect(0, 0, 0, 178, 128);
const op_up = update();

const rand = (n) => ~~(Math.random() * n);

port.dispatch([clear, op_up]);

setInterval(() => {
  const x = rand(178);
  const y = rand(128);
  const rect = fillRect(1, x, y, 5, 5);


  // const rects = [];
  //
  // for (let i = 0; i < 50; i++) {
  //   const x = rand(178);
  //   const y = rand(128);
  //   rects.push(
  //     fillRect(1, x, y, 5, 5),
  //   );
  // }

  port.dispatch([clear, rects, op_up]);

  // const fill = fillRect(1, x, 0, 1, 128);
  // x += 1;
  //
  // port.dispatch([fill, update()], (e) => {
  //   console.log(e);
  // });
}, 5000);
