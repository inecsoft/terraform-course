"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $counter, $std_Json, $tasks }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const rows = (await $tasks.list());
      let result = [];
      const count = (await $counter.inc());
      for (const row of rows) {
        result.push(row);
      }
      console.log(((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(result));
      console.log($helpers.lookup(result, 0));
      return ({"status": 200, "headers": ({["Content-Type"]: "text/html"}), "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(result)});
    }
  }
  return $Closure9;
}
//# sourceMappingURL=inflight.$Closure9-1.cjs.map