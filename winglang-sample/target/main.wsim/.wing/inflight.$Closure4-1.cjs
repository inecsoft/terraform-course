"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $s }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const alias = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "alias");
      {
        const $if_let_value = req.body;
        if ($if_let_value != undefined) {
          const body = $if_let_value;
          (await $s.create(alias, body));
          return ({"status": 200});
        }
      }
      return ({"status": 504, "body": "No alias for (alias)"});
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map