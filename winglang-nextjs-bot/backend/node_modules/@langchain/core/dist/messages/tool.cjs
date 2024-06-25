"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultToolCallParser = exports.ToolMessageChunk = exports.ToolMessage = void 0;
const base_js_1 = require("./base.cjs");
/**
 * Represents a tool message in a conversation.
 */
class ToolMessage extends base_js_1.BaseMessage {
    static lc_name() {
        return "ToolMessage";
    }
    get lc_aliases() {
        // exclude snake case conversion to pascal case
        return { tool_call_id: "tool_call_id" };
    }
    constructor(fields, tool_call_id, name) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, name, tool_call_id: tool_call_id };
        }
        super(fields);
        Object.defineProperty(this, "tool_call_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tool_call_id = fields.tool_call_id;
    }
    _getType() {
        return "tool";
    }
    static isInstance(message) {
        return message._getType() === "tool";
    }
}
exports.ToolMessage = ToolMessage;
/**
 * Represents a chunk of a tool message, which can be concatenated
 * with other tool message chunks.
 */
class ToolMessageChunk extends base_js_1.BaseMessageChunk {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "tool_call_id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tool_call_id = fields.tool_call_id;
    }
    static lc_name() {
        return "ToolMessageChunk";
    }
    _getType() {
        return "tool";
    }
    concat(chunk) {
        return new ToolMessageChunk({
            content: (0, base_js_1.mergeContent)(this.content, chunk.content),
            additional_kwargs: (0, base_js_1._mergeDicts)(this.additional_kwargs, chunk.additional_kwargs),
            response_metadata: (0, base_js_1._mergeDicts)(this.response_metadata, chunk.response_metadata),
            tool_call_id: this.tool_call_id,
        });
    }
}
exports.ToolMessageChunk = ToolMessageChunk;
function defaultToolCallParser(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
rawToolCalls) {
    const toolCalls = [];
    const invalidToolCalls = [];
    for (const toolCall of rawToolCalls) {
        if (!toolCall.function) {
            continue;
        }
        else {
            const functionName = toolCall.function.name;
            try {
                const functionArgs = JSON.parse(toolCall.function.arguments);
                const parsed = {
                    name: functionName || "",
                    args: functionArgs || {},
                    id: toolCall.id,
                };
                toolCalls.push(parsed);
            }
            catch (error) {
                invalidToolCalls.push({
                    name: functionName,
                    args: toolCall.function.arguments,
                    id: toolCall.id,
                    error: "Malformed args.",
                });
            }
        }
    }
    return [toolCalls, invalidToolCalls];
}
exports.defaultToolCallParser = defaultToolCallParser;
