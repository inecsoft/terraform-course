"use strict";
var $handler = undefined;
exports.handler = async function(event, context) {
  try {
    if (globalThis.$awsLambdaContext === undefined) {
      globalThis.$awsLambdaContext = context;
      $handler = $handler ?? ((await (async () => {
  const $func = async (ctx, event) => {
            for (const record of event.Records ?? []) {
                await ctx.handler(record.Sns.Message);
                return undefined;
            }
        }
  const $ctx = {
  handler: (await (async () => {
  const $func = async (ctx, event) => {
            try {
                const message = JSON.parse(event);
                if (message?.Event === "s3:TestEvent") {
                    // aws sends a test event to the topic before of the actual one, we're ignoring it for now
                    return;
                }
                return await ctx.handler(message.Records[0].s3.object.key, ctx.eventType);
            }
            catch (error) {
                console.warn("Error parsing the notification event message: ", error);
                console.warn("Event: ", event);
            }
        }
  const $ctx = {
  handler: 
          (await (async () => {
            const $Closure2Client = 
          require("/home/iarteaga/terraform-course/winglang-backup/target/main.tfaws/.wing/inflight.$Closure2-1.cjs")({
            $backup: new (require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/bucket.inflight")).BucketClient(process.env["BUCKET_NAME_94e6cce2"]),
            $origin: new (require("/home/iarteaga/.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/bucket.inflight")).BucketClient(process.env["BUCKET_NAME_ac1e5b01"]),
          })
        ;
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
eventType: "onCreate"
  };
  let newFunction = async (...args) => {
    return $func($ctx, ...args);
  };
  newFunction.handle = newFunction;
  return newFunction;
}
)())
  };
  let newFunction = async (...args) => {
    return $func($ctx, ...args);
  };
  newFunction.handle = newFunction;
  return newFunction;
}
)()));
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