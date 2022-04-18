const { Buffer } = require("buffer");

const buf = Buffer.allocUnsafe(2);

buf.writeInt8(-1, 0);
buf.writeUint8(23, 1);

console.log(buf);
