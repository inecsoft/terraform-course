"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const ui = $stdlib.ui;
const util = $stdlib.util;
const appApi = require("./preflight.api-2.cjs");
const appSim = require("./preflight.sim-3.cjs");
const appTfAws = require("./preflight.tfaws-4.cjs");
class App extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    const target = (util.Util.env("WING_TARGET"));
    if ($helpers.eq(target, "sim")) {
      this.inner = new appSim.AppSim(this, "AppSim", props);
    }
    else if ($helpers.eq(target, "tf-aws")) {
      this.inner = new appTfAws.AppTfAws(this, "AppTfAws", props);
    }
    else {
      throw new Error(String.raw({ raw: ["unknown platform ", ""] }, target));
    }
    this.url = (this.inner.getUrl());
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-5.cjs")({
            $__parent_this_1_url: ${$stdlib.core.liftObject(__parent_this_1.url)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [__parent_this_1.url, []],
          ],
          "$inflight_init": [
            [__parent_this_1.url, []],
          ],
        });
      }
    }
    this.node.root.new("@winglang/sdk.ui.Field", ui.Field, this, "Field", "url", new $Closure1(this, "$Closure1"), { link: true });
    if ($helpers.eq(target, "sim")) {
      this.node.root.new("@winglang/sdk.cloud.Endpoint", cloud.Endpoint, this, "Endpoint", this.url);
    }
    $helpers.nodeof(this).color = "sky";
  }
  addEnvironment(key, value) {
    (this.inner.addEnvironment(key, value));
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.App-5.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const AppClient = ${App._toInflightType()};
        const client = new AppClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return ({
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { App };
//# sourceMappingURL=preflight.lib-5.cjs.map