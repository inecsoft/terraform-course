"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $origin }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $origin.put("file1.txt", "This should be a copied over to the backup"));
      (await $origin.put("file2.txt", "This should be a copied over to the backup"));
      (await $origin.put("logging.log", "This should be a copied over to the backup"));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map