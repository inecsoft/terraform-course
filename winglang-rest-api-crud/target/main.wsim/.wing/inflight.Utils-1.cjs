"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Utils {
    constructor({  }) {
    }
    static async render(template, value) {
      return (require("../../../utils.js")["render"])(template, value)
    }
    static async rendercrud(template, value) {
      return (require("../../../utils.js")["rendercrud"])(template, value)
    }
  }
  return Utils;
}
//# sourceMappingURL=inflight.Utils-1.cjs.map