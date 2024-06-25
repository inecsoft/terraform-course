"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure8Client = 
          require("/home/iarteaga/terraform-course/winglang-rest-api-crud/target/test/main.wsim/.wing/inflight.$Closure8-1.cjs")({
            $apiUrl: process.env["WING_TOKEN_WSIM_ROOT_ENV1_API_ATTRS_URL"],
            $invokeAndAssert: 
          (await (async () => {
            const $Closure7Client = 
          require("/home/iarteaga/terraform-course/winglang-rest-api-crud/target/test/main.wsim/.wing/inflight.$Closure7-1.cjs")({
            $expect_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/expect/expect.js").Util,
            $http_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
          })
        ;
            const client = new $Closure7Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
          })
        ;
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event);
};