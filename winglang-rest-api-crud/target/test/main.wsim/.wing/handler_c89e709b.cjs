"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure5Client = 
          require("/home/iarteaga/terraform-course/winglang-rest-api-crud/target/test/main.wsim/.wing/inflight.$Closure5-1.cjs")({
            $expect_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/expect/expect.js").Util,
            $http_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
            $std_Json: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
            $url: process.env["WING_TOKEN_WSIM_ROOT_ENV0_API_ATTRS_URL_TASKS"],
          })
        ;
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event);
};