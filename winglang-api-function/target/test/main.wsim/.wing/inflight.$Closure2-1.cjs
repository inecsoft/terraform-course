"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $s }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const alias = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "alias");
      {
        const $if_let_value = (await $s.get(alias));
        if ($if_let_value != undefined) {
          const target = $if_let_value;
          return ({"status": 307, "headers": ({"location": target})});
        }
        else {
          return ({"status": 404});
        }
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map