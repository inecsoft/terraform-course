"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBaseMessageChunk = exports.isBaseMessage = exports.BaseMessageChunk = exports._mergeLists = exports._mergeDicts = exports.isOpenAIToolCallArray = exports.BaseMessage = exports.mergeContent = void 0;
const serializable_js_1 = require("../load/serializable.cjs");
function mergeContent(firstContent, secondContent) {
    // If first content is a string
    if (typeof firstContent === "string") {
        if (typeof secondContent === "string") {
            return firstContent + secondContent;
        }
        else {
            return [{ type: "text", text: firstContent }, ...secondContent];
        }
        // If both are arrays
    }
    else if (Array.isArray(secondContent)) {
        return [...firstContent, ...secondContent];
        // If the first content is a list and second is a string
    }
    else {
        // Otherwise, add the second content as a new element of the list
        return [...firstContent, { type: "text", text: secondContent }];
    }
}
exports.mergeContent = mergeContent;
/**
 * Base class for all types of messages in a conversation. It includes
 * properties like `content`, `name`, and `additional_kwargs`. It also
 * includes methods like `toDict()` and `_getType()`.
 */
class BaseMessage extends serializable_js_1.Serializable {
    get lc_aliases() {
        // exclude snake case conversion to pascal case
        return {
            additional_kwargs: "additional_kwargs",
            response_metadata: "response_metadata",
        };
    }
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */
    get text() {
        return typeof this.content === "string" ? this.content : "";
    }
    constructor(fields, 
    /** @deprecated */
    kwargs) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = {
                content: fields,
                additional_kwargs: kwargs,
                response_metadata: {},
            };
        }
        // Make sure the default value for additional_kwargs is passed into super() for serialization
        if (!fields.additional_kwargs) {
            // eslint-disable-next-line no-param-reassign
            fields.additional_kwargs = {};
        }
        if (!fields.response_metadata) {
            // eslint-disable-next-line no-param-reassign
            fields.response_metadata = {};
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain_core", "messages"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** The content of the message. */
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Additional keyword arguments */
        Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Response metadata. For example: response headers, logprobs, token counts. */
        Object.defineProperty(this, "response_metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.content = fields.content;
        this.additional_kwargs = fields.additional_kwargs;
        this.response_metadata = fields.response_metadata;
    }
    toDict() {
        return {
            type: this._getType(),
            data: this.toJSON()
                .kwargs,
        };
    }
}
exports.BaseMessage = BaseMessage;
function isOpenAIToolCallArray(value) {
    return (Array.isArray(value) &&
        value.every((v) => typeof v.index === "number"));
}
exports.isOpenAIToolCallArray = isOpenAIToolCallArray;
function _mergeDicts(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
left, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
right
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    const merged = { ...left };
    for (const [key, value] of Object.entries(right)) {
        if (merged[key] == null) {
            merged[key] = value;
        }
        else if (value == null) {
            continue;
        }
        else if (typeof merged[key] !== typeof value ||
            Array.isArray(merged[key]) !== Array.isArray(value)) {
            throw new Error(`field[${key}] already exists in the message chunk, but with a different type.`);
        }
        else if (typeof merged[key] === "string") {
            merged[key] = merged[key] + value;
        }
        else if (!Array.isArray(merged[key]) && typeof merged[key] === "object") {
            merged[key] = _mergeDicts(merged[key], value);
        }
        else if (Array.isArray(merged[key])) {
            merged[key] = _mergeLists(merged[key], value);
        }
        else if (merged[key] === value) {
            continue;
        }
        else {
            console.warn(`field[${key}] already exists in this message chunk and value has unsupported type.`);
        }
    }
    return merged;
}
exports._mergeDicts = _mergeDicts;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _mergeLists(left, right) {
    if (left === undefined && right === undefined) {
        return undefined;
    }
    else if (left === undefined || right === undefined) {
        return left || right;
    }
    else {
        const merged = [...left];
        for (const item of right) {
            if (typeof item === "object" &&
                "index" in item &&
                typeof item.index === "number") {
                const toMerge = merged.findIndex((leftItem) => leftItem.index === item.index);
                if (toMerge !== -1) {
                    merged[toMerge] = _mergeDicts(merged[toMerge], item);
                }
                else {
                    merged.push(item);
                }
            }
            else {
                merged.push(item);
            }
        }
        return merged;
    }
}
exports._mergeLists = _mergeLists;
/**
 * Represents a chunk of a message, which can be concatenated with other
 * message chunks. It includes a method `_merge_kwargs_dict()` for merging
 * additional keyword arguments from another `BaseMessageChunk` into this
 * one. It also overrides the `__add__()` method to support concatenation
 * of `BaseMessageChunk` instances.
 */
class BaseMessageChunk extends BaseMessage {
}
exports.BaseMessageChunk = BaseMessageChunk;
function isBaseMessage(messageLike) {
    return typeof messageLike?._getType === "function";
}
exports.isBaseMessage = isBaseMessage;
function isBaseMessageChunk(messageLike) {
    return (isBaseMessage(messageLike) &&
        typeof messageLike.concat === "function");
}
exports.isBaseMessageChunk = isBaseMessageChunk;
