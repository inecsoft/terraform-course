"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $apiUrl, $invokeAndAssert }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $invokeAndAssert($apiUrl, "Hello, Wing 0"));
      (await $invokeAndAssert($apiUrl, "Hello, Wing 1"));
      (await $invokeAndAssert($apiUrl, "Hello, Wing 2"));
    }
  }
  return $Closure8;
}
//# sourceMappingURL=inflight.$Closure8-1.cjs.map