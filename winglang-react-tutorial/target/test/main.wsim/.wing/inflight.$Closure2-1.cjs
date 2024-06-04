"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url, $expect_Util, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = $api_url;
      const res = (await $http_Util.get(String.raw({ raw: ["", "/hello"] }, url)));
      (await $expect_Util.equal(res.status, 200));
      (await $expect_Util.equal(res.body, "React Wing Workshop"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map