"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? (
          (await (async () => {
            const $Closure1Client = 
          require("/home/iarteaga/terraform-course/winglang-sample/target/main.tfaws/.wing/inflight.$Closure1-1.cjs")({
            $container: new (require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/bucket.inflight")).BucketClient(process.env["BUCKET_NAME_1357ca3a"]),
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
  return await $handler.handle(event === null ? undefined : event);
};