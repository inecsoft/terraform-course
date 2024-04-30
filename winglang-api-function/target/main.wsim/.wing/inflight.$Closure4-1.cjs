"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $apishortener_url, $expect_Util, $http_RequestRedirect, $http_Util, $std_Json }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $http_Util.post(String.raw({ raw: ["", "/short/a"] }, $apishortener_url), { body: "https://www.winglang.io" }));
      const resp = (await $http_Util.get(String.raw({ raw: ["", "/short/a"] }, $apishortener_url), { redirect: $http_RequestRedirect.MANUAL }));
      (await $expect_Util.equal(404, resp.status));
      console.log(String.raw({ raw: ["", ""] }, ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(resp.headers)));
      (await $expect_Util.equal("https://www.winglang.io", ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(resp.headers, "location")));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map