const Comm = require('./comm');
const Sensor = require('./sensor');
const Motor = require('./motor');

const port = new Comm();
const s1 = new Sensor();
const m1 = new Motor();

const col = s1.listen();

const move = m1.outputStepSpeed();

setInterval(() => {
  port.dispatchNoReply([move]);
}, 3000);


// setInterval(() => {
//   port.dispatchReply([col], (h) => {
//     // one byte reserve global alloc
//     h.writeUInt16LE(4, 5);
//   });
// }, 1000);

// port.port.on('data', function(data) {
//   console.log(data);
//   // <Buffer 07 00 14 00 02 00 00 a0 40>
//
//   // Reply size, Little Endian
//   // 07:00
//   //
//   // Message counter, Little Endian. Equals the Direct Command
//   // 14:00
//   //
//   // Reply type. See defines above
//   // 02 DIRECT_REPLY
//   //
//   // System Command which this is reply to.
//   // 00
//   //
//   // System Reply Status – Error, info or success. See the definitions below:
//   // 00
//   //
//   // Further System Reply bytes depending of the the System Command and the System Reply Status
//   // a0:40
//
//   // Further System Reply bytes depending of the the System Command and the System Reply Status
//
// });
