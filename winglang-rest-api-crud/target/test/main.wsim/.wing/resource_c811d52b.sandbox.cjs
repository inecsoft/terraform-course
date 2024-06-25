        "use strict";
        let $klass;
        exports.start = async function(statedir) {
          if ($klass) {
            throw Error('resource already started');
          }
          const attrs = {};
          const ctx = {};
          ctx.statedir = async () => statedir;
          ctx.resolveToken = async (name, value) => attrs[name] = value;
          ctx.log = async (message, level) => {
            if (!level) level = 'info';
            console.log(level + ':' + message);
          };
          const client = (await (async () => {
  const $func = async (ctx, simContext) => {
            // TODO: make CounterBackend liftable so we can add it to the list of captures
            const CounterBackend = 
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            require("@winglang/sdk/lib/target-sim/counter.inflight").CounterBackend;
            const backend = new CounterBackend(simContext, { initial: ctx.initial });
            await backend.onStart();
            return backend;
        }
  const $ctx = {
  initial: 0
  };
  let newFunction = async (...args) => {
    return $func($ctx, ...args);
  };
  newFunction.handle = newFunction;
  return newFunction;
}
)());
          const noop = { onStop: () => {} };
          const klass = (await client.handle(ctx)) ?? noop;
          ctx.resolveToken = () => {
            throw Error('cannot resolve attributes outside of onStop method');
          };
          $klass = klass;
          return attrs;
        };

        exports.call = async function(propName, ...args) {
          if (!$klass) {
            throw Error('Resource is not running (it may have crashed or stopped)');
          }
          if (propName === 'onStop') {
            throw Error('Cannot call "onStop"');
          }
          const prop = $klass[propName];
          if (!prop) {
            throw Error('Method or property "' + propName + '" not found');
          }
          if (typeof prop !== 'function') {
            if (args.length > 0) {
              throw Error('Property "' + propName + '" is not a function');
            }
            return prop;
          }
          return await prop.call($klass, ...args);
        };

        exports.stop = async function() {
          if (!$klass) {
            throw Error('Resource is not running (it may have crashed or stopped)');
          }
          await $klass.onStop();
          $klass = undefined;
        };
        
process.on("uncaughtException", (reason) => {
  process.send({ type: "error", reason });
});

process.on("message", async (message) => {
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "ok", value });
});
