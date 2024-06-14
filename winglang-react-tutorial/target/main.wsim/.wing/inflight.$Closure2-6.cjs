"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $fs }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal([], (await $fs.listFolders())));
      (await $fs.createFolder("a"));
      (await $expect_Util.equal(["a"], (await $fs.listFolders())));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-6.cjs.map