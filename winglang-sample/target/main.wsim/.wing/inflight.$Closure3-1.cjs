"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $counter }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return ({"body": String.raw({ raw: ["", ""] }, (await $counter.peek()))});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map