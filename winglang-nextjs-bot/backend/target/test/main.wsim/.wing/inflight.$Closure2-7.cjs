"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $oai, $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const r = (await $oai.createCompletion("tell me a short joke"));
      console.log(String.raw({ raw: ["respose to the request: `$", "`"] }, r));
      (await $expect_Util.equal(r, ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"mock": ({"max_tokens": 2048, "model": "gpt-3.5-turbo", "messages": [({"role": "user", "content": "tell me a short joke"})]})}))));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-7.cjs.map