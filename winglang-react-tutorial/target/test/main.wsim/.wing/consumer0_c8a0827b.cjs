"use strict";
var $handler = undefined;
exports.handler = async function(event) {
  $handler = $handler ?? ((await (async () => {
  const $func = async (ctx, event) => {
            const batchItemFailures = [];
            let parsed = JSON.parse(event ?? "{}");
            if (!parsed.messages)
                throw new Error('No "messages" field in event.');
            for (const $message of parsed.messages) {
                try {
                    await ctx.handler($message.payload);
                }
                catch (error) {
                    // TODO: an error from user code is getting dropped - bad! https://github.com/winglang/wing/issues/6445
                    batchItemFailures.push($message);
                }
            }
            return batchItemFailures.length > 0
                ? JSON.stringify(batchItemFailures)
                : undefined;
        }
  const $ctx = {
  handler: 
          (await (async () => {
            const $Closure1Client = 
          require("/home/iarteaga/terraform-course/winglang-react-tutorial/target/test/main.wsim/.wing/inflight.$Closure1-1.cjs")({
            $bucket: (function() {
  let handle = process.env.BUCKET_HANDLE_a107cec5;
  if (!handle) {
    throw new Error("Missing environment variable: BUCKET_HANDLE_a107cec5");
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
            $counter: (function() {
  let handle = process.env.COUNTER_HANDLE_f9685446;
  if (!handle) {
    throw new Error("Missing environment variable: COUNTER_HANDLE_f9685446");
  }
  const simulatorUrl = process.env.WING_SIMULATOR_URL;
  if (!simulatorUrl) {
    throw new Error("Missing environment variable: WING_SIMULATOR_URL");
  }
  const caller = process.env.WING_SIMULATOR_CALLER;
  if (!caller) {
    throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
  }
  const backend = require("@winglang/sdk/lib/simulator/client").makeSimulatorClient(simulatorUrl, handle, caller);
  const client = new Proxy(backend, {
    get: function(target, prop, receiver) {
      return async function(...args) {
        return backend.call(prop, args);
      };
    },
  });
  return client;
})(),
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        
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