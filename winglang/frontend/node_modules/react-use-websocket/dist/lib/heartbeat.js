"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heartbeat = void 0;
var constants_1 = require("./constants");
function heartbeat(ws, options) {
    var _a = options || {}, _b = _a.interval, interval = _b === void 0 ? constants_1.DEFAULT_HEARTBEAT.interval : _b, _c = _a.timeout, timeout = _c === void 0 ? constants_1.DEFAULT_HEARTBEAT.timeout : _c, _d = _a.message, message = _d === void 0 ? constants_1.DEFAULT_HEARTBEAT.message : _d;
    var messageAccepted = false;
    var pingTimer = setInterval(function () {
        try {
            if (typeof message === 'function') {
                ws.send(message());
            }
            else {
                ws.send(message);
            }
        }
        catch (error) {
            // do nothing
        }
    }, interval);
    var timeoutTimer = setInterval(function () {
        if (!messageAccepted) {
            ws.close();
        }
        else {
            messageAccepted = false;
        }
    }, timeout);
    ws.addEventListener("close", function () {
        clearInterval(pingTimer);
        clearInterval(timeoutTimer);
    });
    return function () {
        messageAccepted = true;
    };
}
exports.heartbeat = heartbeat;
//# sourceMappingURL=heartbeat.js.map