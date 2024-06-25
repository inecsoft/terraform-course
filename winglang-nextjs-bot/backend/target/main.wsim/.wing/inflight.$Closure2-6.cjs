"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $secret }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const apiKey = (await $secret.value());
      return ({"status": 200, "body": "Hello World! API on api/"});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-6.cjs.map