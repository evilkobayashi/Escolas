import { Readable } from "node:stream";

export const bufferToStream = (buffer: Buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
