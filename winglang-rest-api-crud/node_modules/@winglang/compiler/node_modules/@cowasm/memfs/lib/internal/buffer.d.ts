/// <reference types="node" />
import { Buffer } from "buffer";
declare const bufferAllocUnsafe: (size: number) => Buffer;
declare const bufferFrom: {
    (arrayBuffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, byteOffset?: number | undefined, length?: number | undefined): Buffer;
    (data: Uint8Array | readonly number[]): Buffer;
    (data: WithImplicitCoercion<string | Uint8Array | readonly number[]>): Buffer;
    (str: WithImplicitCoercion<string> | {
        [Symbol.toPrimitive](hint: "string"): string;
    }, encoding?: BufferEncoding | undefined): Buffer;
};
export { Buffer, bufferAllocUnsafe, bufferFrom };
