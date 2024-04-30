"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $apishortener_url, $expect_Util, $http_RequestRedirect, $http_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const resp = (await $http_Util.get(String.raw({ raw: ["", "/short/a"] }, $apishortener_url), { redirect: $http_RequestRedirect.MANUAL }));
      (await $expect_Util.equal(404, resp.status));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map