"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $std_Json }) {
  class Sim {
    async createCompletion(req) {
      return ({"choices": [({"message": ({"content": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"mock": req}))})})]});
    }
  }
  return Sim;
}
//# sourceMappingURL=inflight.Sim-1.cjs.map