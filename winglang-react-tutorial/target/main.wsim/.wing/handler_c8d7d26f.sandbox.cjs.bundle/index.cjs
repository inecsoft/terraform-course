"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/util/equality.js
var require_equality = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/util/equality.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deepStrictEqual = void 0;
    var types_1 = require("util/types");
    var kNoIterator = 0;
    var kIsArray = 1;
    var kIsSet = 2;
    var kIsMap = 3;
    function deepStrictEqual(val1, val2, memos) {
      if (val1 === val2) {
        if (val1 !== 0)
          return true;
        return Object.is(val1, val2);
      }
      if (typeof val1 !== "object") {
        return typeof val1 === "number" && Number.isNaN(val1) && Number.isNaN(val2);
      }
      if (typeof val2 !== "object" || val1 === null || val2 === null) {
        return false;
      }
      if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
        return false;
      }
      const val1Tag = val1.toString();
      const val2Tag = val2.toString();
      if (val1Tag !== val2Tag) {
        return false;
      }
      if (Array.isArray(val1)) {
        if (!Array.isArray(val2) || val1.length !== val2.length) {
          return false;
        }
        const keys1 = getOwnNonIndexProperties(val1);
        const keys2 = getOwnNonIndexProperties(val2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, memos, kIsArray, keys1);
      } else if (val1Tag === "[object Object]") {
        return keyCheck(val1, val2, memos, kNoIterator);
      } else if ((0, types_1.isDate)(val1)) {
        if (!(0, types_1.isDate)(val2) || val1.getTime() !== val2.getTime()) {
          return false;
        }
      } else if ((0, types_1.isRegExp)(val1)) {
        if (!(0, types_1.isRegExp)(val2) || !areSimilarRegExps(val1, val2)) {
          return false;
        }
      } else if ((0, types_1.isNativeError)(val1) || val1 instanceof Error) {
        if (!(0, types_1.isNativeError)(val2) && !(val2 instanceof Error) || val1.message !== val2.message || val1.name !== val2.name) {
          return false;
        }
      } else if ((0, types_1.isArrayBufferView)(val1)) {
        if (!areSimilarTypedArrays(val1, val2)) {
          return false;
        }
        if (!areSimilarTypedArrays(val1, val2) && !(0, types_1.isFloat32Array)(val1) && !(0, types_1.isFloat64Array)(val1)) {
          return false;
        }
        const keys1 = getOwnNonIndexProperties(val1);
        const keys2 = getOwnNonIndexProperties(val2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        return keyCheck(val1, val2, memos, kNoIterator, keys1);
      } else if ((0, types_1.isSet)(val1)) {
        if (!(0, types_1.isSet)(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, memos, kIsSet);
      } else if ((0, types_1.isMap)(val1)) {
        if (!(0, types_1.isMap)(val2) || val1.size !== val2.size) {
          return false;
        }
        return keyCheck(val1, val2, memos, kIsMap);
      } else if ((0, types_1.isAnyArrayBuffer)(val1)) {
        if (!(0, types_1.isAnyArrayBuffer)(val2) || !areEqualArrayBuffers(val1, val2)) {
          return false;
        }
      } else if ((0, types_1.isBoxedPrimitive)(val1)) {
        if (!isEqualBoxedPrimitive(val1, val2)) {
          return false;
        }
      } else if (Array.isArray(val2) || (0, types_1.isArrayBufferView)(val2) || (0, types_1.isSet)(val2) || (0, types_1.isMap)(val2) || (0, types_1.isDate)(val2) || (0, types_1.isRegExp)(val2) || (0, types_1.isAnyArrayBuffer)(val2) || (0, types_1.isBoxedPrimitive)(val2) || (0, types_1.isNativeError)(val2) || val2 instanceof Error) {
        return false;
      }
      return keyCheck(val1, val2, memos, kNoIterator);
    }
    __name(deepStrictEqual, "deepStrictEqual");
    exports2.deepStrictEqual = deepStrictEqual;
    function keyCheck(val1, val2, memos, iterationType, aKeys) {
      if (arguments.length === 4) {
        aKeys = Object.keys(val1);
        const bKeys = Object.keys(val2);
        if (aKeys.length !== bKeys.length) {
          return false;
        }
      }
      let i = 0;
      for (; i < aKeys.length; i++) {
        if (!val2.propertyIsEnumerable(aKeys[i])) {
          return false;
        }
      }
      if (arguments.length === 4) {
        const symbolKeysA = Object.getOwnPropertySymbols(val1);
        if (symbolKeysA.length !== 0) {
          let count = 0;
          for (i = 0; i < symbolKeysA.length; i++) {
            const key = symbolKeysA[i];
            if (val1.propertyIsEnumerable(key)) {
              if (!val2.propertyIsEnumerable(val2, key)) {
                return false;
              }
              aKeys.push(aKeys, key);
              count++;
            } else if (val2.propertyIsEnumerable(val2, key)) {
              return false;
            }
          }
          const symbolKeysB = Object.getOwnPropertySymbols(val2);
          if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
            return false;
          }
        } else {
          const symbolKeysB = Object.getOwnPropertySymbols(val2);
          if (symbolKeysB.length !== 0 && getEnumerables(val2, symbolKeysB).length !== 0) {
            return false;
          }
        }
      }
      if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
        return true;
      }
      if (memos === void 0) {
        memos = {
          val1: /* @__PURE__ */ new Map(),
          val2: /* @__PURE__ */ new Map(),
          position: 0
        };
      } else {
        const val2MemoA = memos.val1.get(val1);
        if (val2MemoA !== void 0) {
          const val2MemoB = memos.val2.get(val2);
          if (val2MemoB !== void 0) {
            return val2MemoA === val2MemoB;
          }
        }
        memos.position++;
      }
      memos.val1.set(val1, memos.position);
      memos.val2.set(val2, memos.position);
      const areEq = objEquiv(val1, val2, aKeys, memos, iterationType);
      memos.val1.delete(val1);
      memos.val2.delete(val2);
      return areEq;
    }
    __name(keyCheck, "keyCheck");
    function objEquiv(a, b, keys, memos, iterationType) {
      let i = 0;
      if (iterationType === kIsSet) {
        if (!setEquiv(a, b, memos)) {
          return false;
        }
      } else if (iterationType === kIsMap) {
        if (!mapEquiv(a, b, memos)) {
          return false;
        }
      } else if (iterationType === kIsArray) {
        for (; i < a.length; i++) {
          if (a.hasOwnProperty(i)) {
            if (!b.hasOwnProperty(i) || !deepStrictEqual(a[i], b[i], memos)) {
              return false;
            }
          } else if (b.hasOwnProperty(i)) {
            return false;
          } else {
            const keysA = Object.keys(a);
            for (; i < keysA.length; i++) {
              const key = keysA[i];
              if (!b.hasOwnProperty(key) || !deepStrictEqual(a[key], b[key], memos)) {
                return false;
              }
            }
            if (keysA.length !== Object.keys(b).length) {
              return false;
            }
            return true;
          }
        }
      }
      for (i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!deepStrictEqual(a[key], b[key], memos)) {
          return false;
        }
      }
      return true;
    }
    __name(objEquiv, "objEquiv");
    function setEquiv(a, b, memo) {
      let set = null;
      for (const val of a) {
        if (typeof val === "object" && val !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(val);
        } else if (!b.has(val)) {
          return false;
        }
      }
      if (set !== null) {
        for (const val of b) {
          if (typeof val === "object" && val !== null) {
            if (!setHasEqualElement(set, val, memo))
              return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    __name(setEquiv, "setEquiv");
    function setHasEqualElement(set, val1, memo) {
      for (const val2 of set) {
        if (deepStrictEqual(val1, val2, memo)) {
          set.delete(val2);
          return true;
        }
      }
      return false;
    }
    __name(setHasEqualElement, "setHasEqualElement");
    function mapEquiv(a, b, memo) {
      let set = null;
      for (const { 0: key, 1: item1 } of a) {
        if (typeof key === "object" && key !== null) {
          if (set === null) {
            set = /* @__PURE__ */ new Set();
          }
          set.add(key);
        } else {
          const item2 = b.get(key);
          if (item2 === void 0 && !b.has(key) || !deepStrictEqual(item1, item2, memo)) {
            return false;
          }
        }
      }
      if (set !== null) {
        for (const { 0: key, 1: item } of b) {
          if (typeof key === "object" && key !== null) {
            if (!mapHasEqualEntry(set, a, key, item, memo))
              return false;
          }
        }
        return set.size === 0;
      }
      return true;
    }
    __name(mapEquiv, "mapEquiv");
    function mapHasEqualEntry(set, map, key1, item1, memo) {
      for (const key2 of set) {
        if (deepStrictEqual(key1, key2, memo) && deepStrictEqual(item1, map.get(key2), memo)) {
          set.delete(key2);
          return true;
        }
      }
      return false;
    }
    __name(mapHasEqualEntry, "mapHasEqualEntry");
    function isEqualBoxedPrimitive(val1, val2) {
      if ((0, types_1.isNumberObject)(val1)) {
        return (0, types_1.isNumberObject)(val2) && Object.is(val1.valueOf(), val2.valueOf());
      }
      if ((0, types_1.isStringObject)(val1)) {
        return (0, types_1.isStringObject)(val2) && val1.valueOf() === val2.valueOf();
      }
      if ((0, types_1.isBooleanObject)(val1)) {
        return (0, types_1.isBooleanObject)(val2) && val1.valueOf() === val2.valueOf();
      }
      if ((0, types_1.isSymbolObject)(val1)) {
        return (0, types_1.isSymbolObject)(val2) && val1.valueOf() === val2.valueOf();
      }
      throw new Error(`Unknown boxed type ${val1}`);
    }
    __name(isEqualBoxedPrimitive, "isEqualBoxedPrimitive");
    function areEqualArrayBuffers(buf1, buf2) {
      return buf1.byteLength === buf2.byteLength && Buffer.compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
    }
    __name(areEqualArrayBuffers, "areEqualArrayBuffers");
    function areSimilarTypedArrays(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return Buffer.compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
    }
    __name(areSimilarTypedArrays, "areSimilarTypedArrays");
    function isNonIndex(key) {
      if (key.length === 0 || key.length > 10)
        return true;
      for (var i = 0; i < key.length; i++) {
        var code = key.charCodeAt(i);
        if (code < 48 || code > 57)
          return true;
      }
      return key.length === 10 && key >= Math.pow(2, 32);
    }
    __name(isNonIndex, "isNonIndex");
    var getOwnNonIndexProperties = /* @__PURE__ */ __name((val1) => {
      if (!val1?.getOwnPropertySymbols) {
        return [];
      }
      return Object.keys(val1).filter(isNonIndex).concat(val1?.getOwnPropertySymbols(val1).filter(Object.prototype.propertyIsEnumerable.bind(val1))) ?? [];
    }, "getOwnNonIndexProperties");
    function getEnumerables(val, keys) {
      return keys.filter((k) => val.propertyIsEnumerable(k));
    }
    __name(getEnumerables, "getEnumerables");
    function areSimilarRegExps(a, b) {
      return a.source === b.source && a.flags === b.flags && a.lastIndex === b.lastIndex;
    }
    __name(areSimilarRegExps, "areSimilarRegExps");
  }
});

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
    var equality_1 = require_equality();
    function eq(a, b) {
      try {
        return (0, equality_1.deepStrictEqual)(a, b);
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

// target/main.wsim/.wing/inflight.$Closure1-5.cjs
var require_inflight_Closure1_5 = __commonJS({
  "target/main.wsim/.wing/inflight.$Closure1-5.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({ $__parent_this_1_url }) {
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
          return $__parent_this_1_url;
        }
      }
      return $Closure1;
    };
  }
});

// target/main.wsim/.wing/handler_c8d7d26f.sandbox.cjs
var $handler = void 0;
exports.handler = async function(event) {
  $handler = $handler ?? await (async () => {
    const $Closure1Client = require_inflight_Closure1_5()({
      $__parent_this_1_url: process.env["WING_TOKEN_WSIM_ROOT_DEFAULT_APP_APPSIM_STATE_ATTRS_URL"]
    });
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
