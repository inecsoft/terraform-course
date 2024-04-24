"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetGlobalState = exports.assertIsWebSocket = void 0;
var globals_1 = require("./globals");
var manage_subscribers_1 = require("./manage-subscribers");
function assertIsWebSocket(webSocketInstance, skip) {
    if (!skip && webSocketInstance instanceof WebSocket === false)
        throw new Error('');
}
exports.assertIsWebSocket = assertIsWebSocket;
;
function resetGlobalState(url) {
    (0, manage_subscribers_1.resetSubscribers)(url);
    (0, globals_1.resetWebSockets)(url);
}
exports.resetGlobalState = resetGlobalState;
;
//# sourceMappingURL=util.js.map