"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const fs = $stdlib.fs;
const sim = $stdlib.sim;
const util = $stdlib.util;
const api = require("./preflight.api-2.cjs");
const utils = require("./preflight.utils-1.cjs");
class AppSim extends api.AppBase {
  constructor($scope, $id, props) {
    super($scope, $id, props);
    const state = this.node.root.new("@winglang/sdk.sim.State", sim.State, this, "State");
    this.url = (state.token("url"));
    const __parent_this_1 = this;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-3.cjs")({
            $____parent_this_1_props_useBuildCommand_____null_: ${$stdlib.core.liftObject(((__parent_this_1.props.useBuildCommand) != null))},
            $__parent_this_1_buildCommand: ${$stdlib.core.liftObject(__parent_this_1.buildCommand)},
            $__parent_this_1_buildDir: ${$stdlib.core.liftObject(__parent_this_1.buildDir)},
            $__parent_this_1_env: ${$stdlib.core.liftObject(__parent_this_1.env)},
            $__parent_this_1_path: ${$stdlib.core.liftObject(__parent_this_1.path)},
            $__parent_this_1_startCommand: ${$stdlib.core.liftObject(__parent_this_1.startCommand)},
            $fs_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(fs.Util, "@winglang/sdk/fs", "Util"))},
            $props_localPort: ${$stdlib.core.liftObject(props.localPort)},
            $state: ${$stdlib.core.liftObject(state)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
            $utils_Utils: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(utils.Utils, "", "Utils"))},
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
            [$stdlib.core.toLiftableModuleType(utils.Utils, "", "Utils"), [].concat(["serveStaticFiles"], ["exec"])],
            [((__parent_this_1.props.useBuildCommand) != null), []],
            [__parent_this_1.buildCommand, []],
            [__parent_this_1.buildDir, []],
            [__parent_this_1.env, ["copyMut"]],
            [__parent_this_1.path, []],
            [__parent_this_1.startCommand, []],
            [props.localPort, []],
            [state, ["set"]],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(utils.Utils, "", "Utils"), []],
            [((__parent_this_1.props.useBuildCommand) != null), []],
            [__parent_this_1.buildCommand, []],
            [__parent_this_1.buildDir, []],
            [__parent_this_1.env, []],
            [__parent_this_1.path, []],
            [__parent_this_1.startCommand, []],
            [props.localPort, []],
            [state, []],
          ],
        });
      }
    }
    const service = this.node.root.new("@winglang/sdk.cloud.Service", cloud.Service, this, "Service", new $Closure1(this, "$Closure1"));
    (service.addEnvironment("HOME", (util.Util.env("HOME"))));
    (service.addEnvironment("PATH", (util.Util.env("PATH"))));
    $helpers.nodeof(this).hidden = true;
  }
  getUrl() {
    return this.url;
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.AppSim-3.cjs")({
        $api_AppBase: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(api.AppBase, "", "AppBase"))},
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const AppSimClient = ${AppSim._toInflightType()};
        const client = new AppSimClient({
        });
        if (client.$inflight_init) { await client.$inflight_init(); }
        return client;
      })())
    `;
  }
  get _liftMap() {
    return $stdlib.core.mergeLiftDeps(super._liftMap, {
      "$inflight_init": [
      ],
    });
  }
}
module.exports = { AppSim };
//# sourceMappingURL=preflight.sim-3.cjs.map