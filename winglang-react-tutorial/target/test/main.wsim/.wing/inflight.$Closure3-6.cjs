"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $fs }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fs.createFolder("d1"));
      (await $fs.createFile("d1", "f1", "Hello Wing"));
      (await $expect_Util.equal(["f1"], (await $fs.listFiles("d1"))));
      (await $expect_Util.equal("Hello Wing", (await $fs.getFile("d1", "f1"))));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-6.cjs.map