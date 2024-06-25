"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $oai, $secret }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const apiKey = (await $secret.value());
      const response = (await $oai.createCompletion($helpers.unwrap(request.body)));
      console.log(response);
      return ({"status": 200, "body": response});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-7.cjs.map