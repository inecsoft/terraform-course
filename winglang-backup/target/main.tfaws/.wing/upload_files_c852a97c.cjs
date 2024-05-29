"use strict";
var $handler = undefined;
exports.handler = async function(event, context) {
  try {
    if (globalThis.$awsLambdaContext === undefined) {
      globalThis.$awsLambdaContext = context;
      $handler = $handler ?? (
          (await (async () => {
            const $Closure1Client = 
          require("/home/iarteaga/terraform-course/winglang-backup/target/main.tfaws/.wing/inflight.$Closure1-1.cjs")({
            $origin: new (require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/bucket.inflight")).BucketClient(process.env["BUCKET_NAME_ac1e5b01"]),
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        );
    } else {
      throw new Error(
        'An AWS Lambda context object was already defined.'
      );
    }
    return await $handler.handle(event === null ? undefined : event);
  } finally {
    globalThis.$awsLambdaContext = undefined;
  }
};