"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $std_Json, $tasks }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const rows = (await $tasks.list());
      let result = [];
      for (const row of rows) {
        result.push(row);
      }
      return ({"status": 200, "headers": ({["Content-Type"]: "application/json"}), "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(result)});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map