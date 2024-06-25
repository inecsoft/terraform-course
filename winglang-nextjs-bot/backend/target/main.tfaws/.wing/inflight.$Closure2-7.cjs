"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $oai, $secret }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const apiKey = (await $secret.value());
      const joke = (await $oai.createCompletion($helpers.unwrap(request.body)));
      console.log(joke);
      return ({"status": 200, "body": "Hello World! API on api/"});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-7.cjs.map