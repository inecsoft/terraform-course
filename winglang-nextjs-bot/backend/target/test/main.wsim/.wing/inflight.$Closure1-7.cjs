"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return ({"status": 200, "body": "Hello World! API"});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-7.cjs.map