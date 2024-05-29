"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? ((await (async () => {
  const $func = async (ctx, event) => {
            await ctx.handler(event);
            return undefined;
        }
  const $ctx = {
  handler: (await (async () => {
  const $func = async (ctx, event) => {
            return ctx.handler(event, ctx.eventType);
        }
  const $ctx = {
  handler: 
          (await (async () => {
            const $Closure2Client = 
          require("/home/iarteaga/terraform-course/winglang-backup/target/main.wsim/.wing/inflight.$Closure2-1.cjs")({
            $backup: (function() {
  let handle = process.env.BUCKET_HANDLE_d3a9cd71;
  if (!handle) {
    throw new Error("Missing environment variable: BUCKET_HANDLE_d3a9cd71");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  const caller = process.env.WING_SIMULATOR_CALLER;
  if (!caller) {
    throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle, caller);
})(),
            $origin: (function() {
  let handle = process.env.BUCKET_HANDLE_4740611d;
  if (!handle) {
    throw new Error("Missing environment variable: BUCKET_HANDLE_4740611d");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  const caller = process.env.WING_SIMULATOR_CALLER;
  if (!caller) {
    throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
  }
  return require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle, caller);
})(),
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
  return await $handler.handle(event);
};