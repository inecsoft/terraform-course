"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $Vite_sim, $cliFilename, $homeEnv, $openBrowser, $pathEnv, $props_generateTypeDefinitions, $props_publicEnv, $props_publicEnvName, $props_root, $props_typeDefinitionsFilename, $state }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const output = (await $Vite_sim.dev(({"root": $props_root, "publicEnv": ($props_publicEnv ?? ({})), "generateTypeDefinitions": ($props_generateTypeDefinitions ?? true), "publicEnvName": ($props_publicEnvName ?? "wing"), "typeDefinitionsFilename": ($props_typeDefinitionsFilename ?? ".winglibs/wing-env.d.ts"), "cliFilename": $cliFilename, "homeEnv": $homeEnv, "pathEnv": $pathEnv, "openBrowser": $openBrowser})));
      (await $state.set("url", (await output.url())));
      return (async () => {
        (await output.kill());
      });
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map