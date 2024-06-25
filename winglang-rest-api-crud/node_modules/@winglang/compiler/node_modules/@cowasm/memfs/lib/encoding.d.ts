/// <reference types="node" />
import { Buffer } from "./internal/buffer";
export declare type TDataOut = string | Buffer;
export declare type TEncodingExtended = BufferEncoding | "buffer";
export declare const ENCODING_UTF8: BufferEncoding;
export declare function assertEncoding(encoding: BufferEncoding | undefined): void;
export declare function strToEncoding(str: string, encoding?: TEncodingExtended): TDataOut;
