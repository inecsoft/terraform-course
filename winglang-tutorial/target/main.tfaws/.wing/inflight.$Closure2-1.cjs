"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $q }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(s) {
      (await $q.push($helpers.unwrap(s)));
      if ($helpers.eq(s, "")) {
        console.log("Function was invoked without a payload");
      }
      else {
        console.log(String.raw({ raw: ["Function was called with argument '", "'"] }, $helpers.unwrap(s)));
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map