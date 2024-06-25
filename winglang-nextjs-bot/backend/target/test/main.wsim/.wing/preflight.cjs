"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const ex = $stdlib.ex;
const cloud = $stdlib.cloud;
const expect = $stdlib.expect;
const http = $stdlib.http;
const react = require("./preflight.react-6.cjs");
const openai = require("./preflight.openai-8.cjs");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-7.cjs")({
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
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-7.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $oai: ${$stdlib.core.liftObject(oai)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [oai, ["createCompletion"]],
          ],
          "$inflight_init": [
            [oai, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-7.cjs")({
            $oai: ${$stdlib.core.liftObject(oai)},
            $secret: ${$stdlib.core.liftObject(secret)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [oai, ["createCompletion"]],
            [secret, ["value"]],
          ],
          "$inflight_init": [
            [oai, []],
            [secret, []],
          ],
        });
      }
    }
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api", { cors: true });
    (api.get("/", new $Closure1(this, "$Closure1")));
    const project = new react.App(this, "App", { projectPath: "../frontend" });
    const secret = this.node.root.new("@winglang/sdk.cloud.Secret", cloud.Secret, this, "Secret", { name: "open-ai-key" });
    const oai = new openai.OpenAI(this, "OpenAI", { apiKeySecret: secret });
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:create completion test", new $Closure2(this, "$Closure2"));
    (api.post("/api", new $Closure3(this, "$Closure3")));
    (project.addEnvironment("API_URL", api.url));
    (project.addEnvironment("api_url", api.url));
    (project.addEnvironment("TEXT", "Hello World!"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map