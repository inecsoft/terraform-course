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
const util = $stdlib.util;
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $tasks: ${$stdlib.core.liftObject(tasks)},
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
            [tasks, ["list"]],
          ],
          "$inflight_init": [
            [tasks, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $counter: ${$stdlib.core.liftObject(counter)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $tasks: ${$stdlib.core.liftObject(tasks)},
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
            [counter, ["inc"]],
            [tasks, ["insert"]],
          ],
          "$inflight_init": [
            [counter, []],
            [tasks, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $tasks: ${$stdlib.core.liftObject(tasks)},
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
            [tasks, ["update"]],
          ],
          "$inflight_init": [
            [tasks, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
            $tasks: ${$stdlib.core.liftObject(tasks)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [tasks, ["delete"]],
          ],
          "$inflight_init": [
            [tasks, []],
          ],
        });
      }
    }
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $url: ${$stdlib.core.liftObject(url)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType()};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [url, []],
          ],
          "$inflight_init": [
            [url, []],
          ],
        });
      }
    }
    class Utils extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static readFile(filePath) {
        return ($extern("../../../utils.js")["readFile"])(filePath)
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Utils-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const UtilsClient = ${Utils._toInflightType()};
            const client = new UtilsClient({
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
      static get _liftTypeMap() {
        return ({
          "render": [
          ],
          "rendercrud": [
          ],
        });
      }
    }
    class $Closure6 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure6-1.cjs")({
            $Utils: ${$stdlib.core.liftObject(Utils)},
            $counter: ${$stdlib.core.liftObject(counter)},
            $templates: ${$stdlib.core.liftObject(templates)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType()};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [Utils, ["render"]],
            [counter, ["inc"]],
            [templates, ["get"]],
          ],
          "$inflight_init": [
            [Utils, []],
            [counter, []],
            [templates, []],
          ],
        });
      }
    }
    class $Closure7 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure7-1.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType()};
            const client = new $Closure7Client({
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
    class $Closure8 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure8-1.cjs")({
            $apiUrl: ${$stdlib.core.liftObject(apiUrl)},
            $invokeAndAssert: ${$stdlib.core.liftObject(invokeAndAssert)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType()};
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [apiUrl, []],
            [invokeAndAssert, ["handle"]],
          ],
          "$inflight_init": [
            [apiUrl, []],
            [invokeAndAssert, []],
          ],
        });
      }
    }
    class $Closure9 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure9-1.cjs")({
            $counter: ${$stdlib.core.liftObject(counter)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $tasks: ${$stdlib.core.liftObject(tasks)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure9Client = ${$Closure9._toInflightType()};
            const client = new $Closure9Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [counter, ["inc"]],
            [tasks, ["list"]],
          ],
          "$inflight_init": [
            [counter, []],
            [tasks, []],
          ],
        });
      }
    }
    const tasks = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", { name: "Tasks", columns: ({["id"]: ex.ColumnType.STRING, ["title"]: ex.ColumnType.STRING}), primaryKey: "id" });
    const counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api");
    const path = "/tasks";
    (api.get(path, new $Closure1(this, "$Closure1")));
    (api.post(path, new $Closure2(this, "$Closure2")));
    (api.put(String.raw({ raw: ["", "/:id"] }, path), new $Closure3(this, "$Closure3")));
    (api.delete(String.raw({ raw: ["", "/:id"] }, path), new $Closure4(this, "$Closure4")));
    const url = String.raw({ raw: ["", "", ""] }, api.url, path);
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:run simple crud scenario", new $Closure5(this, "$Closure5"));
    const templates = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    (templates.addObject("index.html", (Utils.readFile("./index.html"))));
    (api.get("/", new $Closure6(this, "$Closure6")));
    const apiUrl = api.url;
    const invokeAndAssert = new $Closure7(this, "$Closure7");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:renders the index page", new $Closure8(this, "$Closure8"));
    (templates.addObject("public/index.html", (Utils.readFile("./public/index.html"))));
    (api.get("/list", new $Closure9(this, "$Closure9")));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "main", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map