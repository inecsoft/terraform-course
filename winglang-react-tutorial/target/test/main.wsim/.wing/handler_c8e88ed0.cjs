"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure1Client = 
          require("/home/iarteaga/terraform-course/winglang-react-tutorial/target/test/main.wsim/.wing/inflight.$Closure1-5.cjs")({
            $__parent_this_1_url: process.env["WING_TOKEN_WSIM_ROOT_ENV0_APP_APPSIM_STATE_ATTRS_URL"],
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event);
};