"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $backup, $origin }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(file) {
      if ((!file.endsWith(".log"))) {
        const data = (await $origin.get(file));
        (await $backup.put(file, data));
        console.log(String.raw({ raw: ["adding $", " into copies"] }, file));
      }
      else {
        console.log(String.raw({ raw: ["skipping log file:$", ""] }, file));
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map