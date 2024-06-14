"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure3Client = 
          require("/home/iarteaga/terraform-course/winglang-react-tutorial/target/test/main.wsim/.wing/inflight.$Closure3-6.cjs")({
            $expect_Util: require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/expect/expect.js").Util,
            $fs: 
          (await (async () => {
            const FlatFileSystemClient = 
          require("/home/iarteaga/terraform-course/winglang-react-tutorial/target/test/main.wsim/.wing/inflight.FlatFileSystem-6.cjs")({
          })
        ;
            const client = new FlatFileSystemClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
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