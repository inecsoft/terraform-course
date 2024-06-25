"use strict";
const $stdlib = require('@winglang/sdk');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const cloud = $stdlib.cloud;
const fs = $stdlib.fs;
const utils = require("./preflight.utils-1.cjs");
class AppBase extends $stdlib.std.Resource {
  constructor($scope, $id, props) {
    super($scope, $id);
    this.path = (fs.Util.absolute($helpers.nodeof(this).app.entrypointDir, props.projectPath));
    if ((!(fs.Util.exists(this.path)))) {
      throw new Error(String.raw({ raw: ["", " not exists"] }, this.path));
    }
    this.props = props;
    this.env = ({});
    this.buildDir = (fs.Util.join(this.path, (this.props.buildDir ?? "./build")));
    this.startCommand = (this.props.startCommand ?? "npm run start");
    this.buildCommand = (this.props.buildCommand ?? "npm run build");
  }
  addEnvironment(key, value) {
    ((obj, args) => { obj[args[0]] = args[1]; })(this.env, [key, value]);
  }
  static _toInflightType() {
    return `
      require("${$helpers.normalPath(__dirname)}/inflight.AppBase-2.cjs")({
      })
    `;
  }
  _toInflight() {
    return `
      (await (async () => {
        const AppBaseClient = ${AppBase._toInflightType()};
        const client = new AppBaseClient({
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
module.exports = { AppBase };
//# sourceMappingURL=preflight.api-2.cjs.map