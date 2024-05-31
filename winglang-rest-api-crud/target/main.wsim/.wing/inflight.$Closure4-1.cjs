"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $tasks }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const id = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(request.vars, "id");
      (await $tasks.delete(id));
      return ({"status": 200, "headers": ({["Content-Type"]: "text/plain"}), "body": String.raw({ raw: ["Data for the id: ", " was deleted successfully"] }, id)});
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map