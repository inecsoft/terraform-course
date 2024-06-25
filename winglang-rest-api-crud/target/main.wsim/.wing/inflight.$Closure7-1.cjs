"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $http_Util }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(url, expected) {
      const response = (await $http_Util.get(url));
      (await $expect_Util.equal(response.status, 200));
      $helpers.assert($helpers.eq(response.body.includes(expected), true), "response.body?.contains(expected) == true");
    }
  }
  return $Closure7;
}
//# sourceMappingURL=inflight.$Closure7-1.cjs.map