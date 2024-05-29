"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/helpers.js
var require_helpers = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/helpers.js"(exports, module) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveDirname = exports.createExternRequire = exports.assign = exports.lookup = exports.unwrap = exports.normalPath = exports.nodeof = exports.range = exports.assert = exports.neq = exports.eq = void 0;
    var node_assert_1 = require("node:assert");
    var path = __importStar(require("node:path"));
    function eq(a, b) {
      try {
        (0, node_assert_1.deepStrictEqual)(a, b);
        return true;
      } catch {
        return false;
      }
    }
    __name(eq, "eq");
    exports.eq = eq;
    function neq(a, b) {
      try {
        (0, node_assert_1.notDeepStrictEqual)(a, b);
        return true;
      } catch {
        return false;
      }
    }
    __name(neq, "neq");
    exports.neq = neq;
    function assert(condition, message) {
      if (!condition) {
        throw new Error("assertion failed: " + message);
      }
    }
    __name(assert, "assert");
    exports.assert = assert;
    function range(start, end, inclusive) {
      function* iterator() {
        let i = start;
        let limit = inclusive ? end < start ? end - 1 : end + 1 : end;
        while (i < limit)
          yield i++;
        while (i > limit)
          yield i--;
      }
      __name(iterator, "iterator");
      return iterator();
    }
    __name(range, "range");
    exports.range = range;
    function nodeof(construct) {
      const Node = eval("require('./std/node').Node");
      return Node.of(construct);
    }
    __name(nodeof, "nodeof");
    exports.nodeof = nodeof;
    function normalPath(p) {
      return p.replace(/\\+/g, "/");
    }
    __name(normalPath, "normalPath");
    exports.normalPath = normalPath;
    function unwrap(value) {
      if (value != null) {
        return value;
      }
      throw new Error("Unexpected nil");
    }
    __name(unwrap, "unwrap");
    exports.unwrap = unwrap;
    function lookup(obj, index) {
      checkIndex(index);
      if (typeof index === "number") {
        index = checkArrayAccess(obj, index);
        return obj[index];
      }
      if (typeof obj !== "object") {
        throw new TypeError(`Lookup failed, value is not an object (found "${typeof obj}")`);
      }
      if (!(index in obj)) {
        throw new RangeError(`Key "${index}" not found`);
      }
      return obj[index];
    }
    __name(lookup, "lookup");
    exports.lookup = lookup;
    function assign(obj, index, kind, value) {
      checkIndex(index);
      if (typeof index === "number") {
        index = checkArrayAccess(obj, index);
      }
      if (typeof index === "string" && typeof obj !== "object") {
        throw new TypeError(`Assignment failed, value is not an object (found "${typeof obj}")`);
      }
      switch (kind) {
        case "=":
          obj[index] = value;
          break;
        case "+=":
          obj[index] += value;
          break;
        case "-=":
          obj[index] -= value;
          break;
        default:
          throw new Error(`Invalid assignment kind: ${kind}`);
      }
    }
    __name(assign, "assign");
    exports.assign = assign;
    function checkIndex(index) {
      if (typeof index !== "string" && typeof index !== "number") {
        throw new TypeError(`Index must be a string or number (found "${typeof index}")`);
      }
    }
    __name(checkIndex, "checkIndex");
    function checkArrayAccess(obj, index) {
      if (!Array.isArray(obj) && !Buffer.isBuffer(obj) && typeof obj !== "string") {
        throw new TypeError("Index is a number but collection is not an array or string");
      }
      if (index < 0 && index >= -obj.length) {
        index = obj.length + index;
      }
      if (index < 0 || index >= obj.length) {
        throw new RangeError(`Index ${index} out of bounds for array of length ${obj.length}`);
      }
      return index;
    }
    __name(checkArrayAccess, "checkArrayAccess");
    function createExternRequire(dirname) {
      return (externPath) => {
        const jiti = eval("require('jiti')");
        const esbuild = eval("require('esbuild')");
        const newRequire = jiti(dirname, {
          sourceMaps: true,
          interopDefault: true,
          transform(opts) {
            return esbuild.transformSync(opts.source, {
              format: "cjs",
              target: "node20",
              sourcemap: "inline",
              loader: opts.ts ? "ts" : "js"
            });
          }
        });
        return newRequire(externPath);
      };
    }
    __name(createExternRequire, "createExternRequire");
    exports.createExternRequire = createExternRequire;
    function resolveDirname(outdir, relativeSourceDir) {
      return normalPath(path.resolve(outdir, relativeSourceDir));
    }
    __name(resolveDirname, "resolveDirname");
    exports.resolveDirname = resolveDirname;
  }
});

// target/main.wsim/.wing/inflight.$Closure1-1.cjs
var require_inflight_Closure1_1 = __commonJS({
  "target/main.wsim/.wing/inflight.$Closure1-1.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({}) {
      class $Closure1 {
        static {
          __name(this, "$Closure1");
        }
        constructor({}) {
          const $obj = /* @__PURE__ */ __name((...args) => this.handle(...args), "$obj");
          Object.setPrototypeOf($obj, this);
          return $obj;
        }
        async handle() {
          return "hello, world";
        }
      }
      return $Closure1;
    };
  }
});

// target/main.wsim/.wing/function_c8e6b4af.sandbox.cjs
var $handler = void 0;
exports.handler = async function(event) {
  $handler = $handler ?? await (async () => {
    const $Closure1Client = require_inflight_Closure1_1()({});
    const client = new $Closure1Client({});
    if (client.$inflight_init) {
      await client.$inflight_init();
    }
    return client;
  })();
  return await $handler.handle(event);
};
process.on("uncaughtException", (reason) => {
  process.send({ type: "error", reason });
});
process.on("message", async (message) => {
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "ok", value });
});
//# sourceMappingURL=index.cjs.map
