"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $container }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      console.log("hello world");
      (await $container.put("hello.txt", "hello world"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map