"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Shortener {
    constructor({ $this_mapping }) {
      this.$this_mapping = $this_mapping;
    }
    async create(alias, target) {
      (await this.$this_mapping.put(alias, target));
    }
    async get(alias) {
      if ((await this.$this_mapping.exists(alias))) {
        return (await this.$this_mapping.get(alias));
      }
      return undefined;
    }
  }
  return Shortener;
}
//# sourceMappingURL=inflight.Shortener-1.cjs.map