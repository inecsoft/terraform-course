"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Utils, $counter, $templates }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const count = (await $counter.inc());
      const rendered = (await $Utils.render((await $templates.get("index.html")), count));
      return ({"status": 200, "headers": ({["Content-Type"]: "text/html"}), "body": rendered});
    }
  }
  return $Closure6;
}
//# sourceMappingURL=inflight.$Closure6-1.cjs.map