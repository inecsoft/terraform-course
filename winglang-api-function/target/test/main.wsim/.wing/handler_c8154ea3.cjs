"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure3Client = 
          require("/home/iarteaga/terraform-course/winglang-api-function/target/test/main.wsim/.wing/inflight.$Closure3-1.cjs")({
            $apishortener_url: process.env["WING_TOKEN_WSIM_ROOT_ENV0_API_ATTRS_URL"],
            $expect_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/expect/assert.js").Util,
            $http_RequestRedirect: {"MANUAL": "manual","FOLLOW": "follow","ERROR": "error",},
            $http_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
          })
        ;
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event);
};