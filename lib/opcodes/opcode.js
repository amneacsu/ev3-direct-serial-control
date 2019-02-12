module.exports = (...args) => {
  return (...vargs) => {
    let ix = 0;

    const byteCodes = args.map((arg, i) => {
      // skip arg counter for opcode and cmd
      ix += [Number, DataView].includes(arg.constructor) ? 1 : 0;

      switch (arg.constructor) {
        // opcode
        case Number: return [arg];

        // cmd
        case DataView: return arg.buffer;

        // argument
        case Function:
          const v = vargs[i - ix];

          if (v === undefined) {
            throw new Error('Not enough arguments for command.');
          }

          return arg(v).buffer;
      }
    });

    // glue
    return Buffer.concat(byteCodes.map(p => Buffer.from(p)));
  };
};
