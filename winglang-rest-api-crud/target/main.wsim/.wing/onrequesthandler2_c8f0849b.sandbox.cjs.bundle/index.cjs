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

// target/main.wsim/.wing/inflight.$Closure3-1.cjs
var require_inflight_Closure3_1 = __commonJS({
  "target/main.wsim/.wing/inflight.$Closure3-1.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({ $std_Json, $tasks }) {
      class $Closure3 {
        static {
          __name(this, "$Closure3");
        }
        constructor({}) {
          const $obj = /* @__PURE__ */ __name((...args) => this.handle(...args), "$obj");
          Object.setPrototypeOf($obj, this);
          return $obj;
        }
        async handle(request) {
          const id = ((obj, key) => {
            if (!(key in obj))
              throw new Error(`Map does not contain key: "${key}"`);
            return obj[key];
          })(request.vars, "id");
          {
            const $if_let_value = ((args) => {
              try {
                return args === void 0 ? void 0 : JSON.parse(args);
              } catch (err) {
                return void 0;
              }
            })(request.body);
            if ($if_let_value != void 0) {
              const task = $if_let_value;
              const record = { "id": id, "title": ((arg) => {
                if (typeof arg !== "string") {
                  throw new Error("unable to parse " + typeof arg + " " + arg + " as a string");
                }
                ;
                return JSON.parse(JSON.stringify(arg));
              })(((obj, args) => {
                if (obj[args] === void 0)
                  throw new Error(`Json property "${args}" does not exist`);
                return obj[args];
              })(task, "title")) };
              await $tasks.update(id, record);
              return { "status": 200, "headers": { ["Content-Type"]: "application/json" }, "body": ((json, opts) => {
                return JSON.stringify(json, null, opts?.indent);
              })(record) };
            } else {
              return { "status": 400, "headers": { ["Content-Type"]: "text/plain" }, "body": "Bad Request at api put" };
            }
          }
        }
      }
      return $Closure3;
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/dependency.js
var require_dependency = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/dependency.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Dependable = exports2.DependencyGroup = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var DependencyGroup = class {
      static {
        __name(this, "DependencyGroup");
      }
      constructor(...deps) {
        this._deps = new Array();
        const self = this;
        Dependable.implement(this, {
          get dependencyRoots() {
            const result = new Array();
            for (const d of self._deps) {
              result.push(...Dependable.of(d).dependencyRoots);
            }
            return result;
          }
        });
        this.add(...deps);
      }
      /**
       * Add a construct to the dependency roots
       */
      add(...scopes) {
        this._deps.push(...scopes);
      }
    };
    _a = JSII_RTTI_SYMBOL_1;
    DependencyGroup[_a] = { fqn: "constructs.DependencyGroup", version: "10.3.0" };
    exports2.DependencyGroup = DependencyGroup;
    var DEPENDABLE_SYMBOL = Symbol.for("@aws-cdk/core.DependableTrait");
    var Dependable = class {
      static {
        __name(this, "Dependable");
      }
      /**
       * Turn any object into an IDependable.
       */
      static implement(instance, trait) {
        instance[DEPENDABLE_SYMBOL] = trait;
      }
      /**
       * Return the matching Dependable for the given class instance.
       */
      static of(instance) {
        const ret = instance[DEPENDABLE_SYMBOL];
        if (!ret) {
          throw new Error(`${instance} does not implement IDependable. Use "Dependable.implement()" to implement`);
        }
        return ret;
      }
      /**
       * Return the matching Dependable for the given class instance.
       * @deprecated use `of`
       */
      static get(instance) {
        return this.of(instance);
      }
    };
    _b = JSII_RTTI_SYMBOL_1;
    Dependable[_b] = { fqn: "constructs.Dependable", version: "10.3.0" };
    exports2.Dependable = Dependable;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/private/stack-trace.js
var require_stack_trace = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/private/stack-trace.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.captureStackTrace = void 0;
    function captureStackTrace(below) {
      below = below || captureStackTrace;
      const object = { stack: "" };
      const previousLimit = Error.stackTraceLimit;
      try {
        Error.stackTraceLimit = Number.MAX_SAFE_INTEGER;
        Error.captureStackTrace(object, below);
      } finally {
        Error.stackTraceLimit = previousLimit;
      }
      if (!object.stack) {
        return [];
      }
      return object.stack.split("\n").slice(1).map((s) => s.replace(/^\s*at\s+/, ""));
    }
    __name(captureStackTrace, "captureStackTrace");
    exports2.captureStackTrace = captureStackTrace;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/private/uniqueid.js
var require_uniqueid = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/private/uniqueid.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addressOf = void 0;
    var crypto = require("crypto");
    var HIDDEN_ID = "Default";
    function addressOf(components) {
      const hash = crypto.createHash("sha1");
      for (const c of components) {
        if (c === HIDDEN_ID) {
          continue;
        }
        hash.update(c);
        hash.update("\n");
      }
      return "c8" + hash.digest("hex");
    }
    __name(addressOf, "addressOf");
    exports2.addressOf = addressOf;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/construct.js
var require_construct = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/construct.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConstructOrder = exports2.Construct = exports2.Node = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var dependency_1 = require_dependency();
    var stack_trace_1 = require_stack_trace();
    var uniqueid_1 = require_uniqueid();
    var CONSTRUCT_SYM = Symbol.for("constructs.Construct");
    var Node2 = class _Node {
      static {
        __name(this, "Node");
      }
      /**
       * Returns the node associated with a construct.
       * @param construct the construct
       *
       * @deprecated use `construct.node` instead
       */
      static of(construct2) {
        return construct2.node;
      }
      constructor(host, scope, id) {
        this.host = host;
        this._locked = false;
        this._children = {};
        this._context = {};
        this._metadata = new Array();
        this._dependencies = /* @__PURE__ */ new Set();
        this._validations = new Array();
        id = id ?? "";
        this.id = sanitizeId(id);
        this.scope = scope;
        if (scope && !this.id) {
          throw new Error("Only root constructs may have an empty ID");
        }
        scope?.node.addChild(host, this.id);
      }
      /**
       * The full, absolute path of this construct in the tree.
       *
       * Components are separated by '/'.
       */
      get path() {
        const components = [];
        for (const scope of this.scopes) {
          if (scope.node.id) {
            components.push(scope.node.id);
          }
        }
        return components.join(_Node.PATH_SEP);
      }
      /**
       * Returns an opaque tree-unique address for this construct.
       *
       * Addresses are 42 characters hexadecimal strings. They begin with "c8"
       * followed by 40 lowercase hexadecimal characters (0-9a-f).
       *
       * Addresses are calculated using a SHA-1 of the components of the construct
       * path.
       *
       * To enable refactorings of construct trees, constructs with the ID `Default`
       * will be excluded from the calculation. In those cases constructs in the
       * same tree may have the same addreess.
       *
       * @example c83a2846e506bcc5f10682b564084bca2d275709ee
       */
      get addr() {
        if (!this._addr) {
          this._addr = (0, uniqueid_1.addressOf)(this.scopes.map((c) => c.node.id));
        }
        return this._addr;
      }
      /**
       * Return a direct child by id, or undefined
       *
       * @param id Identifier of direct child
       * @returns the child if found, or undefined
       */
      tryFindChild(id) {
        return this._children[sanitizeId(id)];
      }
      /**
       * Return a direct child by id
       *
       * Throws an error if the child is not found.
       *
       * @param id Identifier of direct child
       * @returns Child with the given id.
       */
      findChild(id) {
        const ret = this.tryFindChild(id);
        if (!ret) {
          throw new Error(`No child with id: '${id}'`);
        }
        return ret;
      }
      /**
       * Returns the child construct that has the id `Default` or `Resource"`.
       * This is usually the construct that provides the bulk of the underlying functionality.
       * Useful for modifications of the underlying construct that are not available at the higher levels.
       *
       * @throws if there is more than one child
       * @returns a construct or undefined if there is no default child
       */
      get defaultChild() {
        if (this._defaultChild !== void 0) {
          return this._defaultChild;
        }
        const resourceChild = this.tryFindChild("Resource");
        const defaultChild = this.tryFindChild("Default");
        if (resourceChild && defaultChild) {
          throw new Error(`Cannot determine default child for ${this.path}. There is both a child with id "Resource" and id "Default"`);
        }
        return defaultChild || resourceChild;
      }
      /**
       * Override the defaultChild property.
       *
       * This should only be used in the cases where the correct
       * default child is not named 'Resource' or 'Default' as it
       * should be.
       *
       * If you set this to undefined, the default behavior of finding
       * the child named 'Resource' or 'Default' will be used.
       */
      set defaultChild(value) {
        this._defaultChild = value;
      }
      /**
       * All direct children of this construct.
       */
      get children() {
        return Object.values(this._children);
      }
      /**
       * Return this construct and all of its children in the given order
       */
      findAll(order = ConstructOrder.PREORDER) {
        const ret = new Array();
        visit(this.host);
        return ret;
        function visit(c) {
          if (order === ConstructOrder.PREORDER) {
            ret.push(c);
          }
          for (const child of c.node.children) {
            visit(child);
          }
          if (order === ConstructOrder.POSTORDER) {
            ret.push(c);
          }
        }
        __name(visit, "visit");
      }
      /**
       * This can be used to set contextual values.
       * Context must be set before any children are added, since children may consult context info during construction.
       * If the key already exists, it will be overridden.
       * @param key The context key
       * @param value The context value
       */
      setContext(key, value) {
        if (this.children.length > 0) {
          const names = this.children.map((c) => c.node.id);
          throw new Error("Cannot set context after children have been added: " + names.join(","));
        }
        this._context[key] = value;
      }
      /**
       * Retrieves a value from tree context if present. Otherwise, would throw an error.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or throws error if there is no context value for this key
       */
      getContext(key) {
        const value = this._context[key];
        if (value !== void 0) {
          return value;
        }
        if (value === void 0 && !this.scope?.node) {
          throw new Error(`No context value present for ${key} key`);
        }
        return this.scope && this.scope.node.getContext(key);
      }
      /**
       * Retrieves the all context of a node from tree context.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param defaults Any keys to override the retrieved context
       * @returns The context object or an empty object if there is discovered context
       */
      getAllContext(defaults) {
        if (typeof defaults === "undefined") {
          defaults = {};
        }
        if (this.scope === void 0) {
          return defaults;
        }
        const value = { ...this._context, ...defaults };
        return this.scope && this.scope.node.getAllContext(value);
      }
      /**
       * Retrieves a value from tree context.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or `undefined` if there is no context value for this key.
       */
      tryGetContext(key) {
        const value = this._context[key];
        if (value !== void 0) {
          return value;
        }
        return this.scope && this.scope.node.tryGetContext(key);
      }
      /**
       * An immutable array of metadata objects associated with this construct.
       * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
       */
      get metadata() {
        return [...this._metadata];
      }
      /**
       * Adds a metadata entry to this construct.
       * Entries are arbitrary values and will also include a stack trace to allow tracing back to
       * the code location for when the entry was added. It can be used, for example, to include source
       * mapping in CloudFormation templates to improve diagnostics.
       *
       * @param type a string denoting the type of metadata
       * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
       * @param options options
       */
      addMetadata(type, data, options = {}) {
        if (data == null) {
          return;
        }
        const shouldTrace = options.stackTrace ?? false;
        const trace = shouldTrace ? (0, stack_trace_1.captureStackTrace)(options.traceFromFunction ?? this.addMetadata) : void 0;
        this._metadata.push({ type, data, trace });
      }
      /**
       * All parent scopes of this construct.
       *
       * @returns a list of parent scopes. The last element in the list will always
       * be the current construct and the first element will be the root of the
       * tree.
       */
      get scopes() {
        const ret = new Array();
        let curr = this.host;
        while (curr) {
          ret.unshift(curr);
          curr = curr.node.scope;
        }
        return ret;
      }
      /**
       * Returns the root of the construct tree.
       * @returns The root of the construct tree.
       */
      get root() {
        return this.scopes[0];
      }
      /**
       * Returns true if this construct or the scopes in which it is defined are
       * locked.
       */
      get locked() {
        if (this._locked) {
          return true;
        }
        if (this.scope && this.scope.node.locked) {
          return true;
        }
        return false;
      }
      /**
       * Add an ordering dependency on another construct.
       *
       * An `IDependable`
       */
      addDependency(...deps) {
        for (const d of deps) {
          this._dependencies.add(d);
        }
      }
      /**
       * Return all dependencies registered on this node (non-recursive).
       */
      get dependencies() {
        const result = new Array();
        for (const dep of this._dependencies) {
          for (const root of dependency_1.Dependable.of(dep).dependencyRoots) {
            result.push(root);
          }
        }
        return result;
      }
      /**
       * Remove the child with the given name, if present.
       *
       * @returns Whether a child with the given name was deleted.
       * @experimental
       */
      tryRemoveChild(childName) {
        if (!(childName in this._children)) {
          return false;
        }
        delete this._children[childName];
        return true;
      }
      /**
       * Adds a validation to this construct.
       *
       * When `node.validate()` is called, the `validate()` method will be called on
       * all validations and all errors will be returned.
       *
       * @param validation The validation object
       */
      addValidation(validation) {
        this._validations.push(validation);
      }
      /**
       * Validates this construct.
       *
       * Invokes the `validate()` method on all validations added through
       * `addValidation()`.
       *
       * @returns an array of validation error messages associated with this
       * construct.
       */
      validate() {
        const deprecated = ["validate", "onValidate", "synthesize", "onSynthesize", "prepare", "onPrepare"];
        for (const method of deprecated) {
          if (typeof this.host[method] === "function") {
            throw new Error(`the construct "${this.path}" has a "${method}()" method which is no longer supported. Use "construct.node.addValidation()" to add validations to a construct`);
          }
        }
        const errors = new Array();
        for (const v of this._validations) {
          errors.push(...v.validate());
        }
        return errors;
      }
      /**
       * Locks this construct from allowing more children to be added. After this
       * call, no more children can be added to this construct or to any children.
       */
      lock() {
        this._locked = true;
      }
      /**
       * Adds a child construct to this node.
       *
       * @param child The child construct
       * @param childName The type name of the child construct.
       * @returns The resolved path part name of the child
       */
      addChild(child, childName) {
        if (this.locked) {
          if (!this.path) {
            throw new Error("Cannot add children during synthesis");
          }
          throw new Error(`Cannot add children to "${this.path}" during synthesis`);
        }
        if (this._children[childName]) {
          const name = this.id ?? "";
          const typeName = this.host.constructor.name;
          throw new Error(`There is already a Construct with name '${childName}' in ${typeName}${name.length > 0 ? " [" + name + "]" : ""}`);
        }
        this._children[childName] = child;
      }
    };
    _a = JSII_RTTI_SYMBOL_1;
    Node2[_a] = { fqn: "constructs.Node", version: "10.3.0" };
    Node2.PATH_SEP = "/";
    exports2.Node = Node2;
    var Construct = class {
      static {
        __name(this, "Construct");
      }
      /**
       * Checks if `x` is a construct.
       *
       * Use this method instead of `instanceof` to properly detect `Construct`
       * instances, even when the construct library is symlinked.
       *
       * Explanation: in JavaScript, multiple copies of the `constructs` library on
       * disk are seen as independent, completely different libraries. As a
       * consequence, the class `Construct` in each copy of the `constructs` library
       * is seen as a different class, and an instance of one class will not test as
       * `instanceof` the other class. `npm install` will not create installations
       * like this, but users may manually symlink construct libraries together or
       * use a monorepo tool: in those cases, multiple copies of the `constructs`
       * library can be accidentally installed, and `instanceof` will behave
       * unpredictably. It is safest to avoid using `instanceof`, and using
       * this type-testing method instead.
       *
       * @returns true if `x` is an object created from a class which extends `Construct`.
       * @param x Any object
       */
      static isConstruct(x) {
        return x && typeof x === "object" && x[CONSTRUCT_SYM];
      }
      /**
       * Creates a new construct node.
       *
       * @param scope The scope in which to define this construct
       * @param id The scoped construct ID. Must be unique amongst siblings. If
       * the ID includes a path separator (`/`), then it will be replaced by double
       * dash `--`.
       */
      constructor(scope, id) {
        this.node = new Node2(this, scope, id);
        dependency_1.Dependable.implement(this, {
          dependencyRoots: [this]
        });
      }
      /**
       * Returns a string representation of this construct.
       */
      toString() {
        return this.node.path || "<root>";
      }
    };
    _b = JSII_RTTI_SYMBOL_1;
    Construct[_b] = { fqn: "constructs.Construct", version: "10.3.0" };
    exports2.Construct = Construct;
    var ConstructOrder;
    (function(ConstructOrder2) {
      ConstructOrder2[ConstructOrder2["PREORDER"] = 0] = "PREORDER";
      ConstructOrder2[ConstructOrder2["POSTORDER"] = 1] = "POSTORDER";
    })(ConstructOrder = exports2.ConstructOrder || (exports2.ConstructOrder = {}));
    var PATH_SEP_REGEX = new RegExp(`${Node2.PATH_SEP}`, "g");
    function sanitizeId(id) {
      return id.replace(PATH_SEP_REGEX, "--");
    }
    __name(sanitizeId, "sanitizeId");
    Object.defineProperty(Construct.prototype, CONSTRUCT_SYM, {
      value: true,
      enumerable: false,
      writable: false
    });
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/metadata.js
var require_metadata = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/metadata.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/index.js
var require_lib = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/constructs/lib/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_construct(), exports2);
    __exportStar(require_metadata(), exports2);
    __exportStar(require_dependency(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/errors.js
var require_errors = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractMemberError = exports2.NotImplementedError = void 0;
    var NotImplementedError = class extends Error {
      static {
        __name(this, "NotImplementedError");
      }
      constructor(message, options) {
        super(`${message}${options?.issue ? `
For more information see: ${options.issue}.
Contributions welcome \u2764\uFE0F` : ""}`);
        this.name = "NotImplementedError";
        this.resource = options?.resource;
        this.operation = options?.operation;
      }
    };
    exports2.NotImplementedError = NotImplementedError;
    var AbstractMemberError = class extends Error {
      static {
        __name(this, "AbstractMemberError");
      }
      constructor() {
        super("This member is abstract and must be implemented in a subclass.");
      }
    };
    exports2.AbstractMemberError = AbstractMemberError;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/package.json
var require_package = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/package.json"(exports2, module2) {
    module2.exports = {
      name: "@winglang/sdk",
      repository: {
        type: "git",
        url: "https://github.com/winglang/wing.git",
        directory: "libs/wingsdk"
      },
      author: {
        name: "Wing Cloud",
        email: "ping@wing.cloud",
        organization: true
      },
      peerDependencies: {
        constructs: "^10.3"
      },
      dependencies: {
        "@aws-sdk/client-cloudwatch-logs": "3.577.0",
        "@aws-sdk/client-dynamodb": "3.577.0",
        "@aws-sdk/client-elasticache": "3.577.0",
        "@aws-sdk/client-lambda": "3.577.0",
        "@aws-sdk/client-s3": "3.577.0",
        "@aws-sdk/client-secrets-manager": "3.577.0",
        "@aws-sdk/client-sns": "3.577.0",
        "@aws-sdk/client-sqs": "3.577.0",
        "@aws-sdk/s3-request-presigner": "3.577.0",
        "@aws-sdk/types": "3.449.0",
        "@aws-sdk/util-dynamodb": "3.577.0",
        "@azure/core-paging": "^1.5.0",
        "@azure/data-tables": "13.2.2",
        "@azure/identity": "4.0.1",
        "@azure/storage-blob": "12.14.0",
        "@google-cloud/datastore": "8.4.0",
        "@google-cloud/storage": "6.9.5",
        "@smithy/util-stream": "2.0.17",
        "@smithy/util-utf8": "2.0.0",
        "@types/aws-lambda": "^8.10.119",
        "@winglang/wingtunnels": "0.75.4",
        ajv: "^8.12.0",
        cdktf: "0.20.3",
        constructs: "^10.3",
        "cron-parser": "^4.9.0",
        "cron-validator": "^1.3.1",
        express: "^4.19.2",
        glob: "^8.1.0",
        "google-auth-library": "^8.9.0",
        ioredis: "^5.3.2",
        jiti: "^1.21.0",
        mime: "^3.0.0",
        "mime-types": "^2.1.35",
        nanoid: "^3.3.6",
        protobufjs: "7.2.5",
        "safe-stable-stringify": "^2.4.3",
        stacktracey: "^2.1.8",
        toml: "^3.0.0",
        ulid: "^2.3.0",
        uuid: "^8.3.2",
        vlq: "^2.0.4",
        yaml: "^2.3.2"
      },
      bundledDependencies: [
        "@aws-sdk/client-cloudwatch-logs",
        "@aws-sdk/client-dynamodb",
        "@aws-sdk/client-elasticache",
        "@aws-sdk/client-lambda",
        "@aws-sdk/client-s3",
        "@aws-sdk/client-secrets-manager",
        "@aws-sdk/client-sns",
        "@aws-sdk/client-sqs",
        "@aws-sdk/s3-request-presigner",
        "@aws-sdk/types",
        "@aws-sdk/util-dynamodb",
        "@azure/core-paging",
        "@azure/data-tables",
        "@azure/identity",
        "@azure/storage-blob",
        "@google-cloud/datastore",
        "@google-cloud/storage",
        "@smithy/util-stream",
        "@smithy/util-utf8",
        "@types/aws-lambda",
        "@winglang/wingtunnels",
        "ajv",
        "cdktf",
        "cron-parser",
        "cron-validator",
        "express",
        "glob",
        "google-auth-library",
        "ioredis",
        "jiti",
        "mime",
        "mime-types",
        "nanoid",
        "protobufjs",
        "safe-stable-stringify",
        "stacktracey",
        "toml",
        "ulid",
        "uuid",
        "vlq",
        "yaml"
      ],
      engines: {
        node: ">= 20.0.0"
      },
      main: "lib/index.js",
      license: "MIT",
      version: "0.75.4",
      types: "lib/index.d.ts",
      stability: "experimental",
      jsii: {
        outdir: "dist",
        targets: {},
        tsc: {
          outDir: "lib",
          rootDir: "src"
        }
      },
      optionalDependencies: {
        esbuild: "^0.19.12"
      },
      files: [
        "lib",
        ".jsii",
        "API.md",
        "patches"
      ],
      "//": '~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".',
      scripts: {
        "api-check": "pnpm exec projen api-check",
        "api-check:watch": "pnpm exec projen api-check:watch",
        build: "pnpm exec projen build",
        bump: "pnpm exec projen bump",
        clobber: "pnpm exec projen clobber",
        compat: "pnpm exec projen compat",
        compile: "pnpm exec projen compile",
        default: "pnpm exec projen default",
        docgen: "pnpm exec projen docgen",
        eject: "pnpm exec projen eject",
        eslint: "pnpm exec projen eslint",
        package: "pnpm exec projen package",
        "package-all": "pnpm exec projen package-all",
        "package:js": "pnpm exec projen package:js",
        "post-compile": "pnpm exec projen post-compile",
        "pre-compile": "pnpm exec projen pre-compile",
        release: "pnpm exec projen release",
        test: "pnpm exec projen test",
        "test:watch": "pnpm exec projen test:watch",
        unbump: "pnpm exec projen unbump",
        watch: "pnpm exec projen watch",
        projen: "pnpm exec projen"
      }
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/constants.js
var require_constants = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fqnForType = exports2.SDK_PACKAGE_NAME = exports2.SDK_VERSION = void 0;
    var PKG = require_package();
    exports2.SDK_VERSION = PKG.version;
    exports2.SDK_PACKAGE_NAME = PKG.name;
    if (!exports2.SDK_VERSION) {
      throw new Error("SDK_VERSION is not defined");
    }
    if (!exports2.SDK_PACKAGE_NAME) {
      throw new Error("SDK_PACKAGE_NAME is not defined");
    }
    function fqnForType(type) {
      return `${exports2.SDK_PACKAGE_NAME}.${type}`;
    }
    __name(fqnForType, "fqnForType");
    exports2.fqnForType = fqnForType;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/codegen/code.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.regexpCode = exports2.getEsmExportName = exports2.getProperty = exports2.safeStringify = exports2.stringify = exports2.strConcat = exports2.addCodeArg = exports2.str = exports2._ = exports2.nil = exports2._Code = exports2.Name = exports2.IDENTIFIER = exports2._CodeOrName = void 0;
    var _CodeOrName = class {
      static {
        __name(this, "_CodeOrName");
      }
    };
    exports2._CodeOrName = _CodeOrName;
    exports2.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      static {
        __name(this, "Name");
      }
      constructor(s) {
        super();
        if (!exports2.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports2.Name = Name;
    var _Code = class extends _CodeOrName {
      static {
        __name(this, "_Code");
      }
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports2._Code = _Code;
    exports2.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    __name(_, "_");
    exports2._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    __name(str, "str");
    exports2.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    __name(addCodeArg, "addCodeArg");
    exports2.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    __name(optimize, "optimize");
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    __name(mergeExprItems, "mergeExprItems");
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    __name(strConcat, "strConcat");
    exports2.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    __name(interpolate, "interpolate");
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    __name(stringify, "stringify");
    exports2.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    __name(safeStringify, "safeStringify");
    exports2.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports2.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    __name(getProperty, "getProperty");
    exports2.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports2.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    __name(getEsmExportName, "getEsmExportName");
    exports2.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    __name(regexpCode, "regexpCode");
    exports2.regexpCode = regexpCode;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/codegen/scope.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValueScope = exports2.ValueScopeName = exports2.Scope = exports2.varKinds = exports2.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      static {
        __name(this, "ValueError");
      }
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState = exports2.UsedValueState || (exports2.UsedValueState = {}));
    exports2.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      static {
        __name(this, "Scope");
      }
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports2.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      static {
        __name(this, "ValueScopeName");
      }
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports2.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      static {
        __name(this, "ValueScope");
      }
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports2.varKinds.var : exports2.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports2.ValueScope = ValueScope;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/codegen/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.or = exports2.and = exports2.not = exports2.CodeGen = exports2.operators = exports2.varKinds = exports2.ValueScopeName = exports2.ValueScope = exports2.Scope = exports2.Name = exports2.regexpCode = exports2.stringify = exports2.getProperty = exports2.nil = exports2.strConcat = exports2.str = exports2._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports2, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports2, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports2, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports2, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports2, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports2, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports2, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports2.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node2 = class {
      static {
        __name(this, "Node");
      }
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node2 {
      static {
        __name(this, "Def");
      }
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node2 {
      static {
        __name(this, "Assign");
      }
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      static {
        __name(this, "AssignOp");
      }
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node2 {
      static {
        __name(this, "Label");
      }
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node2 {
      static {
        __name(this, "Break");
      }
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node2 {
      static {
        __name(this, "Throw");
      }
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node2 {
      static {
        __name(this, "AnyCode");
      }
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node2 {
      static {
        __name(this, "ParentNode");
      }
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      static {
        __name(this, "BlockNode");
      }
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
      static {
        __name(this, "Root");
      }
    };
    var Else = class extends BlockNode {
      static {
        __name(this, "Else");
      }
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      static {
        __name(this, "If");
      }
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof _If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
      static {
        __name(this, "For");
      }
    };
    For.kind = "for";
    var ForLoop = class extends For {
      static {
        __name(this, "ForLoop");
      }
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      static {
        __name(this, "ForRange");
      }
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      static {
        __name(this, "ForIter");
      }
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      static {
        __name(this, "Func");
      }
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      static {
        __name(this, "Return");
      }
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      static {
        __name(this, "Try");
      }
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      static {
        __name(this, "Catch");
      }
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      static {
        __name(this, "Finally");
      }
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      static {
        __name(this, "CodeGen");
      }
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports2.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports2.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    __name(addNames, "addNames");
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    __name(addExprNames, "addExprNames");
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      __name(replaceName, "replaceName");
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
      __name(canOptimize, "canOptimize");
    }
    __name(optimizeExpr, "optimizeExpr");
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    __name(subtractNames, "subtractNames");
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    __name(not, "not");
    exports2.not = not;
    var andCode = mappend(exports2.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    __name(and, "and");
    exports2.and = and;
    var orCode = mappend(exports2.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    __name(or, "or");
    exports2.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    __name(mappend, "mappend");
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
    __name(par, "par");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkStrictMode = exports2.getErrorPath = exports2.Type = exports2.useFunc = exports2.setEvaluated = exports2.evaluatedPropsToName = exports2.mergeEvaluated = exports2.eachItem = exports2.unescapeJsonPointer = exports2.escapeJsonPointer = exports2.escapeFragment = exports2.unescapeFragment = exports2.schemaRefOrVal = exports2.schemaHasRulesButRef = exports2.schemaHasRules = exports2.checkUnknownRules = exports2.alwaysValidSchema = exports2.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    __name(toHash, "toHash");
    exports2.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    __name(alwaysValidSchema, "alwaysValidSchema");
    exports2.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    __name(checkUnknownRules, "checkUnknownRules");
    exports2.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    __name(schemaHasRules, "schemaHasRules");
    exports2.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    __name(schemaHasRulesButRef, "schemaHasRulesButRef");
    exports2.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    __name(schemaRefOrVal, "schemaRefOrVal");
    exports2.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    __name(unescapeFragment, "unescapeFragment");
    exports2.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    __name(escapeFragment, "escapeFragment");
    exports2.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    __name(escapeJsonPointer, "escapeJsonPointer");
    exports2.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    __name(unescapeJsonPointer, "unescapeJsonPointer");
    exports2.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    __name(eachItem, "eachItem");
    exports2.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    __name(makeMergeEvaluated, "makeMergeEvaluated");
    exports2.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    __name(evaluatedPropsToName, "evaluatedPropsToName");
    exports2.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    __name(setEvaluated, "setEvaluated");
    exports2.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    __name(useFunc, "useFunc");
    exports2.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type = exports2.Type || (exports2.Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    __name(getErrorPath, "getErrorPath");
    exports2.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    __name(checkStrictMode, "checkStrictMode");
    exports2.checkStrictMode = checkStrictMode;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/names.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      errors: new codegen_1.Name("errors"),
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports2.default = names;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/errors.js
var require_errors2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.extendErrors = exports2.resetErrorsCount = exports2.reportExtraError = exports2.reportError = exports2.keyword$DataError = exports2.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports2.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports2.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports2.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    __name(reportError, "reportError");
    exports2.reportError = reportError;
    function reportExtraError(cxt, error = exports2.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    __name(reportExtraError, "reportExtraError");
    exports2.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    __name(resetErrorsCount, "resetErrorsCount");
    exports2.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    __name(extendErrors, "extendErrors");
    exports2.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    __name(addError, "addError");
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    __name(returnErrors, "returnErrors");
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    __name(errorObjectCode, "errorObjectCode");
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    __name(errorObject, "errorObject");
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    __name(errorInstancePath, "errorInstancePath");
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    __name(errorSchemaPath, "errorSchemaPath");
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
    __name(extraErrorProps, "extraErrorProps");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.boolOrEmptySchema = exports2.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    __name(topBoolOrEmptySchema, "topBoolOrEmptySchema");
    exports2.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    __name(boolOrEmptySchema, "boolOrEmptySchema");
    exports2.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
    __name(falseSchemaError, "falseSchemaError");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/rules.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRules = exports2.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    __name(isJSONType, "isJSONType");
    exports2.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    __name(getRules, "getRules");
    exports2.getRules = getRules;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/applicability.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shouldUseRule = exports2.shouldUseGroup = exports2.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self }, type) {
      const group = self.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    __name(schemaHasRulesForType, "schemaHasRulesForType");
    exports2.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    __name(shouldUseGroup, "shouldUseGroup");
    exports2.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    __name(shouldUseRule, "shouldUseRule");
    exports2.shouldUseRule = shouldUseRule;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/dataType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reportTypeError = exports2.checkDataTypes = exports2.checkDataType = exports2.coerceAndCheckDataType = exports2.getJSONTypes = exports2.getSchemaTypes = exports2.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType = exports2.DataType || (exports2.DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    __name(getSchemaTypes, "getSchemaTypes");
    exports2.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    __name(getJSONTypes, "getJSONTypes");
    exports2.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    __name(coerceAndCheckDataType, "coerceAndCheckDataType");
    exports2.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    __name(coerceToTypes, "coerceToTypes");
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
      __name(coerceSpecificType, "coerceSpecificType");
    }
    __name(coerceData, "coerceData");
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    __name(assignParentData, "assignParentData");
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
      __name(numCond, "numCond");
    }
    __name(checkDataType, "checkDataType");
    exports2.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    __name(checkDataTypes, "checkDataTypes");
    exports2.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    __name(reportTypeError, "reportTypeError");
    exports2.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
    __name(getTypeErrorContext, "getTypeErrorContext");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/defaults.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    __name(assignDefaults, "assignDefaults");
    exports2.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
    __name(assignDefault, "assignDefault");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/code.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateUnion = exports2.validateArray = exports2.usePattern = exports2.callValidateCode = exports2.schemaProperties = exports2.allSchemaProperties = exports2.noPropertyInData = exports2.propertyInData = exports2.isOwnProperty = exports2.hasPropFunc = exports2.reportMissingProp = exports2.checkMissingProp = exports2.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    __name(checkReportMissingProp, "checkReportMissingProp");
    exports2.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    __name(checkMissingProp, "checkMissingProp");
    exports2.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    __name(reportMissingProp, "reportMissingProp");
    exports2.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    __name(hasPropFunc, "hasPropFunc");
    exports2.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    __name(isOwnProperty, "isOwnProperty");
    exports2.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    __name(propertyInData, "propertyInData");
    exports2.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    __name(noPropertyInData, "noPropertyInData");
    exports2.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    __name(allSchemaProperties, "allSchemaProperties");
    exports2.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    __name(schemaProperties, "schemaProperties");
    exports2.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    __name(callValidateCode, "callValidateCode");
    exports2.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    __name(usePattern, "usePattern");
    exports2.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
      __name(validateItems, "validateItems");
    }
    __name(validateArray, "validateArray");
    exports2.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    __name(validateUnion, "validateUnion");
    exports2.validateUnion = validateUnion;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/keyword.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateKeywordUsage = exports2.validSchemaType = exports2.funcKeywordCode = exports2.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors2();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    __name(macroKeywordCode, "macroKeywordCode");
    exports2.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      __name(validateKeyword, "validateKeyword");
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      __name(validateAsync, "validateAsync");
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      __name(validateSync, "validateSync");
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      __name(assignValid, "assignValid");
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
      __name(reportErrs, "reportErrs");
    }
    __name(funcKeywordCode, "funcKeywordCode");
    exports2.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    __name(modifyData, "modifyData");
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    __name(addErrs, "addErrs");
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    __name(checkAsyncKeyword, "checkAsyncKeyword");
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    __name(useKeyword, "useKeyword");
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    __name(validSchemaType, "validSchemaType");
    exports2.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    __name(validateKeywordUsage, "validateKeywordUsage");
    exports2.validateKeywordUsage = validateKeywordUsage;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/subschema.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.extendSubschemaMode = exports2.extendSubschemaData = exports2.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    __name(getSubschema, "getSubschema");
    exports2.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
      __name(dataContextProps, "dataContextProps");
    }
    __name(extendSubschemaData, "extendSubschemaData");
    exports2.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    __name(extendSubschemaMode, "extendSubschemaMode");
    exports2.extendSubschemaMode = extendSubschemaMode;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-deep-equal/index.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ __name(function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }, "equal");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/json-schema-traverse/index.js"(exports2, module2) {
    "use strict";
    var traverse = module2.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    __name(_traverse, "_traverse");
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    __name(escapeJsonPtr, "escapeJsonPtr");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/resolve.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSchemaRefs = exports2.resolveUrl = exports2.normalizeId = exports2._getFullPath = exports2.getFullPath = exports2.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    __name(inlineRef, "inlineRef");
    exports2.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    __name(hasRef, "hasRef");
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    __name(countKeys, "countKeys");
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    __name(getFullPath, "getFullPath");
    exports2.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    __name(_getFullPath, "_getFullPath");
    exports2._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    __name(normalizeId, "normalizeId");
    exports2.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    __name(resolveUrl, "resolveUrl");
    exports2.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let baseId2 = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          baseId2 = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = baseId2;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(baseId2 ? _resolve(baseId2, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        __name(addRef, "addRef");
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
        __name(addAnchor, "addAnchor");
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      __name(checkAmbiguosRef, "checkAmbiguosRef");
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
      __name(ambiguos, "ambiguos");
    }
    __name(getSchemaRefs, "getSchemaRefs");
    exports2.getSchemaRefs = getSchemaRefs;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/validate/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getData = exports2.KeywordCxt = exports2.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors2();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    __name(validateFunctionCode, "validateFunctionCode");
    exports2.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    __name(validateFunction, "validateFunction");
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    __name(destructureValCxt, "destructureValCxt");
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    __name(destructureValCxtES5, "destructureValCxtES5");
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    __name(topSchemaObjCode, "topSchemaObjCode");
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    __name(resetEvaluated, "resetEvaluated");
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    __name(funcSourceUrl, "funcSourceUrl");
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    __name(subschemaCode, "subschemaCode");
    function schemaCxtHasRules({ schema, self }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self.RULES.all[key])
          return true;
      return false;
    }
    __name(schemaCxtHasRules, "schemaCxtHasRules");
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    __name(isSchemaObj, "isSchemaObj");
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    __name(subSchemaObjCode, "subSchemaObjCode");
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    __name(checkKeywords, "checkKeywords");
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    __name(typeAndKeywords, "typeAndKeywords");
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    __name(checkRefsAndKeywords, "checkRefsAndKeywords");
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    __name(checkNoDefault, "checkNoDefault");
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    __name(updateContext, "updateContext");
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    __name(checkAsyncSchema, "checkAsyncSchema");
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    __name(commentKeyword, "commentKeyword");
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    __name(returnResults, "returnResults");
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    __name(assignEvaluated, "assignEvaluated");
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self } = it;
      const { RULES } = self;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
      __name(groupKeywords, "groupKeywords");
    }
    __name(schemaKeywords, "schemaKeywords");
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    __name(iterateKeywords, "iterateKeywords");
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    __name(checkStrictTypes, "checkStrictTypes");
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    __name(checkContextTypes, "checkContextTypes");
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    __name(checkMultipleTypes, "checkMultipleTypes");
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    __name(checkKeywordTypes, "checkKeywordTypes");
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    __name(hasApplicableType, "hasApplicableType");
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    __name(includesType, "includesType");
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    __name(narrowSchemaTypes, "narrowSchemaTypes");
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    __name(strictTypesError, "strictTypesError");
    var KeywordCxt = class {
      static {
        __name(this, "KeywordCxt");
      }
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign2) {
        if (assign2)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        __name(wrong$DataType, "wrong$DataType");
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
        __name(invalid$DataSchema, "invalid$DataSchema");
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports2.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    __name(keywordCode, "keywordCode");
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
      __name(errorMsg, "errorMsg");
    }
    __name(getData, "getData");
    exports2.getData = getData;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/validation_error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ValidationError = class extends Error {
      static {
        __name(this, "ValidationError");
      }
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports2.default = ValidationError;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/ref_error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      static {
        __name(this, "MissingRefError");
      }
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports2.default = MissingRefError;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/compile/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveSchema = exports2.getCompilingSchema = exports2.resolveRef = exports2.compileSchema = exports2.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var SchemaEnv = class {
      static {
        __name(this, "SchemaEnv");
      }
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports2.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    __name(compileSchema, "compileSchema");
    exports2.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema)
          _sch = new SchemaEnv({ schema, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    __name(resolveRef, "resolveRef");
    exports2.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    __name(inlineOrCompile, "inlineOrCompile");
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    __name(getCompilingSchema, "getCompilingSchema");
    exports2.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    __name(sameSchemaEnv, "sameSchemaEnv");
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    __name(resolve, "resolve");
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    __name(resolveSchema, "resolveSchema");
    exports2.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
          return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env = env || new SchemaEnv({ schema, schemaId, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
    __name(getJsonPointer, "getJsonPointer");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/refs/data.json"(exports2, module2) {
    module2.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uri-js/dist/es5/uri.all.js
var require_uri_all = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uri-js/dist/es5/uri.all.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.URI = global.URI || {});
    })(exports2, function(exports3) {
      "use strict";
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      __name(merge, "merge");
      function subexp(str) {
        return "(?:" + str + ")";
      }
      __name(subexp, "subexp");
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      __name(typeOf, "typeOf");
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      __name(toUpperCase, "toUpperCase");
      function toArray(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      __name(toArray, "toArray");
      function assign2(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      __name(assign2, "assign");
      function buildExps(isIRI2) {
        var ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI2 ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$), DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+"), IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$), IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + ZONEID$), IPVFUTURE$ = subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*"), HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")|" + REG_NAME$), PORT$ = subexp(DIGIT$$ + "*"), AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"), PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = subexp(PCHAR$ + "*"), SEGMENT_NZ$ = subexp(PCHAR$ + "+"), SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$), PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      __name(buildExps, "buildExps");
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = /* @__PURE__ */ function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        __name(sliceIterator, "sliceIterator");
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = /* @__PURE__ */ __name(function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      }, "toConsumableArray");
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type) {
        throw new RangeError(errors[type]);
      }
      __name(error$1, "error$1");
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      __name(map, "map");
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      __name(mapDomain, "mapDomain");
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      __name(ucs2decode, "ucs2decode");
      var ucs2encode = /* @__PURE__ */ __name(function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      }, "ucs2encode");
      var basicToDigit = /* @__PURE__ */ __name(function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      }, "basicToDigit");
      var digitToBasic = /* @__PURE__ */ __name(function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      }, "digitToBasic");
      var adapt = /* @__PURE__ */ __name(function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      }, "adapt");
      var decode = /* @__PURE__ */ __name(function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      }, "decode");
      var encode = /* @__PURE__ */ __name(function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      }, "encode");
      var toUnicode = /* @__PURE__ */ __name(function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      }, "toUnicode");
      var toASCII = /* @__PURE__ */ __name(function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      }, "toASCII");
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      __name(pctEncChar, "pctEncChar");
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      __name(pctDecChars, "pctDecChars");
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        __name(decodeUnreserved2, "decodeUnreserved");
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      __name(_normalizeComponentEncoding, "_normalizeComponentEncoding");
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      __name(_stripLeadingZeros, "_stripLeadingZeros");
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      __name(_normalizeIPv4, "_normalizeIPv4");
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      __name(_normalizeIPv6, "_normalizeIPv6");
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      __name(parse, "parse");
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      __name(_recomposeAuthority, "_recomposeAuthority");
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      __name(removeDotSegments, "removeDotSegments");
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) {
          } else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      __name(serialize, "serialize");
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      __name(resolveComponents, "resolveComponents");
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign2({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      __name(resolve, "resolve");
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      __name(normalize, "normalize");
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      __name(equal, "equal");
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      __name(escapeComponent, "escapeComponent");
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      __name(unescapeComponent, "unescapeComponent");
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: /* @__PURE__ */ __name(function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        }, "parse"),
        serialize: /* @__PURE__ */ __name(function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }, "serialize")
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      __name(isSecure, "isSecure");
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: /* @__PURE__ */ __name(function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        }, "parse"),
        serialize: /* @__PURE__ */ __name(function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path2 = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path2 && path2 !== "/" ? path2 : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }, "serialize")
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var isIRI = true;
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      __name(decodeUnreserved, "decodeUnreserved");
      var handler$4 = {
        scheme: "mailto",
        parse: /* @__PURE__ */ __name(function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        }, "parse$$1"),
        serialize: /* @__PURE__ */ __name(function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }, "serialize$$1")
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: /* @__PURE__ */ __name(function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        }, "parse$$1"),
        serialize: /* @__PURE__ */ __name(function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }, "serialize$$1")
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: /* @__PURE__ */ __name(function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        }, "parse"),
        serialize: /* @__PURE__ */ __name(function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }, "serialize")
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports3.SCHEMES = SCHEMES;
      exports3.pctEncChar = pctEncChar;
      exports3.pctDecChars = pctDecChars;
      exports3.parse = parse;
      exports3.removeDotSegments = removeDotSegments;
      exports3.serialize = serialize;
      exports3.resolveComponents = resolveComponents;
      exports3.resolve = resolve;
      exports3.normalize = normalize;
      exports3.equal = equal;
      exports3.escapeComponent = escapeComponent;
      exports3.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/uri.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var uri = require_uri_all();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports2.default = uri;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CodeGen = exports2.Name = exports2.nil = exports2.stringify = exports2.str = exports2._ = exports2.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports2, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports2, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = /* @__PURE__ */ __name((str, flags) => new RegExp(str, flags), "defaultRegExp");
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    __name(requiredOptions, "requiredOptions");
    var Ajv = class {
      static {
        __name(this, "Ajv");
      }
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        __name(runCompileAsync, "runCompileAsync");
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        __name(loadMetaSchema, "loadMetaSchema");
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        __name(_compileAsync, "_compileAsync");
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        __name(checkLoaded, "checkLoaded");
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        __name(loadMissingSchema, "loadMissingSchema");
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
        __name(_loadSchema, "_loadSchema");
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id = schema[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    exports2.default = Ajv;
    Ajv.ValidationError = validation_error_1.default;
    Ajv.MissingRefError = ref_error_1.default;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    __name(checkOptions, "checkOptions");
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    __name(getSchEnv, "getSchEnv");
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    __name(addInitialSchemas, "addInitialSchemas");
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    __name(addInitialFormats, "addInitialFormats");
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    __name(addInitialKeywords, "addInitialKeywords");
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    __name(getMetaSchemaOptions, "getMetaSchemaOptions");
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    __name(getLogger, "getLogger");
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    __name(checkKeyword, "checkKeyword");
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    __name(addRule, "addRule");
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    __name(addBeforeRule, "addBeforeRule");
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    __name(keywordMetaschema, "keywordMetaschema");
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
    __name(schemaOrData, "schemaOrData");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/core/id.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/core/ref.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.callRef = exports2.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        __name(callRootRef, "callRootRef");
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        __name(callValidate, "callValidate");
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
        __name(inlineRefSchema, "inlineRefSchema");
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    __name(getValidate, "getValidate");
    exports2.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      __name(callAsyncRef, "callAsyncRef");
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      __name(callSyncRef, "callSyncRef");
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      __name(addErrorsFrom, "addErrorsFrom");
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
      __name(addEvaluatedFrom, "addEvaluatedFrom");
    }
    __name(callRef, "callRef");
    exports2.callRef = callRef;
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/core/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports2.default = core;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/ucs2length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    __name(ucs2length, "ucs2length");
    exports2.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/required.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        __name(allErrorsMode, "allErrorsMode");
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        __name(exitOnErrorMode, "exitOnErrorMode");
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        __name(loopAllRequired, "loopAllRequired");
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
        __name(loopUntilMissing, "loopUntilMissing");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/runtime/equal.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports2.default = equal;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        __name(validateUniqueItems, "validateUniqueItems");
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        __name(canOptimize, "canOptimize");
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        __name(loopN, "loopN");
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
        __name(loopN2, "loopN2");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/const.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = /* @__PURE__ */ __name(() => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default), "getEql");
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        __name(loopEnum, "loopEnum");
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
        __name(equalCode, "equalCode");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/validation/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports2.default = validation;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
      __name(validateItems, "validateItems");
    }
    __name(validateAdditionalItems, "validateAdditionalItems");
    exports2.validateAdditionalItems = validateAdditionalItems;
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
      __name(checkStrictTuple, "checkStrictTuple");
    }
    __name(validateTuple, "validateTuple");
    exports2.validateTuple = validateTuple;
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        __name(validateItemsWithCount, "validateItemsWithCount");
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        __name(validateItems, "validateItems");
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
        __name(checkLimits, "checkLimits");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateSchemaDeps = exports2.validatePropertyDeps = exports2.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports2.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports2.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    __name(splitDependencies, "splitDependencies");
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    __name(validatePropertyDeps, "validatePropertyDeps");
    exports2.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    __name(validateSchemaDeps, "validateSchemaDeps");
    exports2.validateSchemaDeps = validateSchemaDeps;
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        __name(checkAdditionalProperties, "checkAdditionalProperties");
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        __name(isAdditional, "isAdditional");
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        __name(deleteAdditional, "deleteAdditional");
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        __name(additionalPropertyCode, "additionalPropertyCode");
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
        __name(applyAdditionalSchema, "applyAdditionalSchema");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        __name(hasDefault, "hasDefault");
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
        __name(applyPropertySchema, "applyPropertySchema");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        __name(validatePatternProperties, "validatePatternProperties");
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        __name(checkMatchingProperties, "checkMatchingProperties");
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
        __name(validateProperties, "validateProperties");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
        __name(validateOneOf, "validateOneOf");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        __name(validateIf, "validateIf");
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
        __name(validateClause, "validateClause");
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    __name(hasSchema, "hasSchema");
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    __name(getApplicator, "getApplicator");
    exports2.default = getApplicator;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/format/format.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          __name(unknownFmt, "unknownFmt");
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
          __name(invalidFmt, "invalidFmt");
        }
        __name(validate$DataFormat, "validate$DataFormat");
        function validateFormat() {
          const formatDef = self.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
            __name(unknownMsg, "unknownMsg");
          }
          __name(unknownFormat, "unknownFormat");
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          __name(getFormat, "getFormat");
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
          __name(validCondition, "validCondition");
        }
        __name(validateFormat, "validateFormat");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/format/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports2.default = format;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/metadata.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.contentVocabulary = exports2.metadataVocabulary = void 0;
    exports2.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports2.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/draft7.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata2();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports2.default = draft7Vocabularies;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError = exports2.DiscrError || (exports2.DiscrError = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        __name(validateMapping, "validateMapping");
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        __name(applyTagSchema, "applyTagSchema");
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          __name(hasRequired, "hasRequired");
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          __name(addMappings, "addMappings");
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
          __name(addMapping, "addMapping");
        }
        __name(getMapping, "getMapping");
      }
    };
    exports2.default = def;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports2, module2) {
    module2.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/ajv/dist/ajv.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MissingRefError = exports2.ValidationError = exports2.CodeGen = exports2.Name = exports2.nil = exports2.stringify = exports2.str = exports2._ = exports2.KeywordCxt = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv = class extends core_1.default {
      static {
        __name(this, "Ajv");
      }
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    module2.exports = exports2 = Ajv;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = Ajv;
    var validate_1 = require_validate();
    Object.defineProperty(exports2, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports2, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports2, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports2, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports2, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports2, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports2, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports2, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/toml/lib/parser.js
var require_parser = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/toml/lib/parser.js"(exports2, module2) {
    module2.exports = function() {
      function peg$subclass(child, parent) {
        function ctor() {
          this.constructor = child;
        }
        __name(ctor, "ctor");
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
      }
      __name(peg$subclass, "peg$subclass");
      function SyntaxError(message, expected, found, offset, line, column) {
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.offset = offset;
        this.line = line;
        this.column = column;
        this.name = "SyntaxError";
      }
      __name(SyntaxError, "SyntaxError");
      peg$subclass(SyntaxError, Error);
      function parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {}, peg$FAILED = {}, peg$startRuleFunctions = { start: peg$parsestart }, peg$startRuleFunction = peg$parsestart, peg$c0 = [], peg$c1 = /* @__PURE__ */ __name(function() {
          return nodes;
        }, "peg$c1"), peg$c2 = peg$FAILED, peg$c3 = "#", peg$c4 = { type: "literal", value: "#", description: '"#"' }, peg$c5 = void 0, peg$c6 = { type: "any", description: "any character" }, peg$c7 = "[", peg$c8 = { type: "literal", value: "[", description: '"["' }, peg$c9 = "]", peg$c10 = { type: "literal", value: "]", description: '"]"' }, peg$c11 = /* @__PURE__ */ __name(function(name) {
          addNode(node("ObjectPath", name, line, column));
        }, "peg$c11"), peg$c12 = /* @__PURE__ */ __name(function(name) {
          addNode(node("ArrayPath", name, line, column));
        }, "peg$c12"), peg$c13 = /* @__PURE__ */ __name(function(parts, name) {
          return parts.concat(name);
        }, "peg$c13"), peg$c14 = /* @__PURE__ */ __name(function(name) {
          return [name];
        }, "peg$c14"), peg$c15 = /* @__PURE__ */ __name(function(name) {
          return name;
        }, "peg$c15"), peg$c16 = ".", peg$c17 = { type: "literal", value: ".", description: '"."' }, peg$c18 = "=", peg$c19 = { type: "literal", value: "=", description: '"="' }, peg$c20 = /* @__PURE__ */ __name(function(key, value) {
          addNode(node("Assign", value, line, column, key));
        }, "peg$c20"), peg$c21 = /* @__PURE__ */ __name(function(chars) {
          return chars.join("");
        }, "peg$c21"), peg$c22 = /* @__PURE__ */ __name(function(node2) {
          return node2.value;
        }, "peg$c22"), peg$c23 = '"""', peg$c24 = { type: "literal", value: '"""', description: '"\\"\\"\\""' }, peg$c25 = null, peg$c26 = /* @__PURE__ */ __name(function(chars) {
          return node("String", chars.join(""), line, column);
        }, "peg$c26"), peg$c27 = '"', peg$c28 = { type: "literal", value: '"', description: '"\\""' }, peg$c29 = "'''", peg$c30 = { type: "literal", value: "'''", description: `"'''"` }, peg$c31 = "'", peg$c32 = { type: "literal", value: "'", description: `"'"` }, peg$c33 = /* @__PURE__ */ __name(function(char) {
          return char;
        }, "peg$c33"), peg$c34 = /* @__PURE__ */ __name(function(char) {
          return char;
        }, "peg$c34"), peg$c35 = "\\", peg$c36 = { type: "literal", value: "\\", description: '"\\\\"' }, peg$c37 = /* @__PURE__ */ __name(function() {
          return "";
        }, "peg$c37"), peg$c38 = "e", peg$c39 = { type: "literal", value: "e", description: '"e"' }, peg$c40 = "E", peg$c41 = { type: "literal", value: "E", description: '"E"' }, peg$c42 = /* @__PURE__ */ __name(function(left, right) {
          return node("Float", parseFloat(left + "e" + right), line, column);
        }, "peg$c42"), peg$c43 = /* @__PURE__ */ __name(function(text2) {
          return node("Float", parseFloat(text2), line, column);
        }, "peg$c43"), peg$c44 = "+", peg$c45 = { type: "literal", value: "+", description: '"+"' }, peg$c46 = /* @__PURE__ */ __name(function(digits) {
          return digits.join("");
        }, "peg$c46"), peg$c47 = "-", peg$c48 = { type: "literal", value: "-", description: '"-"' }, peg$c49 = /* @__PURE__ */ __name(function(digits) {
          return "-" + digits.join("");
        }, "peg$c49"), peg$c50 = /* @__PURE__ */ __name(function(text2) {
          return node("Integer", parseInt(text2, 10), line, column);
        }, "peg$c50"), peg$c51 = "true", peg$c52 = { type: "literal", value: "true", description: '"true"' }, peg$c53 = /* @__PURE__ */ __name(function() {
          return node("Boolean", true, line, column);
        }, "peg$c53"), peg$c54 = "false", peg$c55 = { type: "literal", value: "false", description: '"false"' }, peg$c56 = /* @__PURE__ */ __name(function() {
          return node("Boolean", false, line, column);
        }, "peg$c56"), peg$c57 = /* @__PURE__ */ __name(function() {
          return node("Array", [], line, column);
        }, "peg$c57"), peg$c58 = /* @__PURE__ */ __name(function(value) {
          return node("Array", value ? [value] : [], line, column);
        }, "peg$c58"), peg$c59 = /* @__PURE__ */ __name(function(values) {
          return node("Array", values, line, column);
        }, "peg$c59"), peg$c60 = /* @__PURE__ */ __name(function(values, value) {
          return node("Array", values.concat(value), line, column);
        }, "peg$c60"), peg$c61 = /* @__PURE__ */ __name(function(value) {
          return value;
        }, "peg$c61"), peg$c62 = ",", peg$c63 = { type: "literal", value: ",", description: '","' }, peg$c64 = "{", peg$c65 = { type: "literal", value: "{", description: '"{"' }, peg$c66 = "}", peg$c67 = { type: "literal", value: "}", description: '"}"' }, peg$c68 = /* @__PURE__ */ __name(function(values) {
          return node("InlineTable", values, line, column);
        }, "peg$c68"), peg$c69 = /* @__PURE__ */ __name(function(key, value) {
          return node("InlineTableValue", value, line, column, key);
        }, "peg$c69"), peg$c70 = /* @__PURE__ */ __name(function(digits) {
          return "." + digits;
        }, "peg$c70"), peg$c71 = /* @__PURE__ */ __name(function(date) {
          return date.join("");
        }, "peg$c71"), peg$c72 = ":", peg$c73 = { type: "literal", value: ":", description: '":"' }, peg$c74 = /* @__PURE__ */ __name(function(time) {
          return time.join("");
        }, "peg$c74"), peg$c75 = "T", peg$c76 = { type: "literal", value: "T", description: '"T"' }, peg$c77 = "Z", peg$c78 = { type: "literal", value: "Z", description: '"Z"' }, peg$c79 = /* @__PURE__ */ __name(function(date, time) {
          return node("Date", /* @__PURE__ */ new Date(date + "T" + time + "Z"), line, column);
        }, "peg$c79"), peg$c80 = /* @__PURE__ */ __name(function(date, time) {
          return node("Date", /* @__PURE__ */ new Date(date + "T" + time), line, column);
        }, "peg$c80"), peg$c81 = /^[ \t]/, peg$c82 = { type: "class", value: "[ \\t]", description: "[ \\t]" }, peg$c83 = "\n", peg$c84 = { type: "literal", value: "\n", description: '"\\n"' }, peg$c85 = "\r", peg$c86 = { type: "literal", value: "\r", description: '"\\r"' }, peg$c87 = /^[0-9a-f]/i, peg$c88 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" }, peg$c89 = /^[0-9]/, peg$c90 = { type: "class", value: "[0-9]", description: "[0-9]" }, peg$c91 = "_", peg$c92 = { type: "literal", value: "_", description: '"_"' }, peg$c93 = /* @__PURE__ */ __name(function() {
          return "";
        }, "peg$c93"), peg$c94 = /^[A-Za-z0-9_\-]/, peg$c95 = { type: "class", value: "[A-Za-z0-9_\\-]", description: "[A-Za-z0-9_\\-]" }, peg$c96 = /* @__PURE__ */ __name(function(d) {
          return d.join("");
        }, "peg$c96"), peg$c97 = '\\"', peg$c98 = { type: "literal", value: '\\"', description: '"\\\\\\""' }, peg$c99 = /* @__PURE__ */ __name(function() {
          return '"';
        }, "peg$c99"), peg$c100 = "\\\\", peg$c101 = { type: "literal", value: "\\\\", description: '"\\\\\\\\"' }, peg$c102 = /* @__PURE__ */ __name(function() {
          return "\\";
        }, "peg$c102"), peg$c103 = "\\b", peg$c104 = { type: "literal", value: "\\b", description: '"\\\\b"' }, peg$c105 = /* @__PURE__ */ __name(function() {
          return "\b";
        }, "peg$c105"), peg$c106 = "\\t", peg$c107 = { type: "literal", value: "\\t", description: '"\\\\t"' }, peg$c108 = /* @__PURE__ */ __name(function() {
          return "	";
        }, "peg$c108"), peg$c109 = "\\n", peg$c110 = { type: "literal", value: "\\n", description: '"\\\\n"' }, peg$c111 = /* @__PURE__ */ __name(function() {
          return "\n";
        }, "peg$c111"), peg$c112 = "\\f", peg$c113 = { type: "literal", value: "\\f", description: '"\\\\f"' }, peg$c114 = /* @__PURE__ */ __name(function() {
          return "\f";
        }, "peg$c114"), peg$c115 = "\\r", peg$c116 = { type: "literal", value: "\\r", description: '"\\\\r"' }, peg$c117 = /* @__PURE__ */ __name(function() {
          return "\r";
        }, "peg$c117"), peg$c118 = "\\U", peg$c119 = { type: "literal", value: "\\U", description: '"\\\\U"' }, peg$c120 = /* @__PURE__ */ __name(function(digits) {
          return convertCodePoint(digits.join(""));
        }, "peg$c120"), peg$c121 = "\\u", peg$c122 = { type: "literal", value: "\\u", description: '"\\\\u"' }, peg$currPos = 0, peg$reportedPos = 0, peg$cachedPos = 0, peg$cachedPosDetails = { line: 1, column: 1, seenCR: false }, peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$cache = {}, peg$result;
        if ("startRule" in options) {
          if (!(options.startRule in peg$startRuleFunctions)) {
            throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
          }
          peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
        }
        function text() {
          return input.substring(peg$reportedPos, peg$currPos);
        }
        __name(text, "text");
        function offset() {
          return peg$reportedPos;
        }
        __name(offset, "offset");
        function line() {
          return peg$computePosDetails(peg$reportedPos).line;
        }
        __name(line, "line");
        function column() {
          return peg$computePosDetails(peg$reportedPos).column;
        }
        __name(column, "column");
        function expected(description) {
          throw peg$buildException(
            null,
            [{ type: "other", description }],
            peg$reportedPos
          );
        }
        __name(expected, "expected");
        function error(message) {
          throw peg$buildException(message, null, peg$reportedPos);
        }
        __name(error, "error");
        function peg$computePosDetails(pos) {
          function advance(details, startPos, endPos) {
            var p, ch;
            for (p = startPos; p < endPos; p++) {
              ch = input.charAt(p);
              if (ch === "\n") {
                if (!details.seenCR) {
                  details.line++;
                }
                details.column = 1;
                details.seenCR = false;
              } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                details.line++;
                details.column = 1;
                details.seenCR = true;
              } else {
                details.column++;
                details.seenCR = false;
              }
            }
          }
          __name(advance, "advance");
          if (peg$cachedPos !== pos) {
            if (peg$cachedPos > pos) {
              peg$cachedPos = 0;
              peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
            }
            advance(peg$cachedPosDetails, peg$cachedPos, pos);
            peg$cachedPos = pos;
          }
          return peg$cachedPosDetails;
        }
        __name(peg$computePosDetails, "peg$computePosDetails");
        function peg$fail(expected2) {
          if (peg$currPos < peg$maxFailPos) {
            return;
          }
          if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
          }
          peg$maxFailExpected.push(expected2);
        }
        __name(peg$fail, "peg$fail");
        function peg$buildException(message, expected2, pos) {
          function cleanupExpected(expected3) {
            var i = 1;
            expected3.sort(function(a, b) {
              if (a.description < b.description) {
                return -1;
              } else if (a.description > b.description) {
                return 1;
              } else {
                return 0;
              }
            });
            while (i < expected3.length) {
              if (expected3[i - 1] === expected3[i]) {
                expected3.splice(i, 1);
              } else {
                i++;
              }
            }
          }
          __name(cleanupExpected, "cleanupExpected");
          function buildMessage(expected3, found2) {
            function stringEscape(s) {
              function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
              }
              __name(hex, "hex");
              return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) {
                return "\\x0" + hex(ch);
              }).replace(/[\x10-\x1F\x80-\xFF]/g, function(ch) {
                return "\\x" + hex(ch);
              }).replace(/[\u0180-\u0FFF]/g, function(ch) {
                return "\\u0" + hex(ch);
              }).replace(/[\u1080-\uFFFF]/g, function(ch) {
                return "\\u" + hex(ch);
              });
            }
            __name(stringEscape, "stringEscape");
            var expectedDescs = new Array(expected3.length), expectedDesc, foundDesc, i;
            for (i = 0; i < expected3.length; i++) {
              expectedDescs[i] = expected3[i].description;
            }
            expectedDesc = expected3.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected3.length - 1] : expectedDescs[0];
            foundDesc = found2 ? '"' + stringEscape(found2) + '"' : "end of input";
            return "Expected " + expectedDesc + " but " + foundDesc + " found.";
          }
          __name(buildMessage, "buildMessage");
          var posDetails = peg$computePosDetails(pos), found = pos < input.length ? input.charAt(pos) : null;
          if (expected2 !== null) {
            cleanupExpected(expected2);
          }
          return new SyntaxError(
            message !== null ? message : buildMessage(expected2, found),
            expected2,
            found,
            pos,
            posDetails.line,
            posDetails.column
          );
        }
        __name(peg$buildException, "peg$buildException");
        function peg$parsestart() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 0, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseline();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseline();
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c1();
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsestart, "peg$parsestart");
        function peg$parseline() {
          var s0, s1, s2, s3, s4, s5, s6;
          var key = peg$currPos * 49 + 1, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseexpression();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parsecomment();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parsecomment();
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseNL();
                  if (s6 !== peg$FAILED) {
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseNL();
                    }
                  } else {
                    s5 = peg$c2;
                  }
                  if (s5 === peg$FAILED) {
                    s5 = peg$parseEOF();
                  }
                  if (s5 !== peg$FAILED) {
                    s1 = [s1, s2, s3, s4, s5];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            if (s2 !== peg$FAILED) {
              while (s2 !== peg$FAILED) {
                s1.push(s2);
                s2 = peg$parseS();
              }
            } else {
              s1 = peg$c2;
            }
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseNL();
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$parseNL();
                }
              } else {
                s2 = peg$c2;
              }
              if (s2 === peg$FAILED) {
                s2 = peg$parseEOF();
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$parseNL();
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseline, "peg$parseline");
        function peg$parseexpression() {
          var s0;
          var key = peg$currPos * 49 + 2, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parsecomment();
          if (s0 === peg$FAILED) {
            s0 = peg$parsepath();
            if (s0 === peg$FAILED) {
              s0 = peg$parsetablearray();
              if (s0 === peg$FAILED) {
                s0 = peg$parseassignment();
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseexpression, "peg$parseexpression");
        function peg$parsecomment() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 3, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 35) {
            s1 = peg$c3;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseNL();
            if (s5 === peg$FAILED) {
              s5 = peg$parseEOF();
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = peg$c5;
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$currPos;
              peg$silentFails++;
              s5 = peg$parseNL();
              if (s5 === peg$FAILED) {
                s5 = peg$parseEOF();
              }
              peg$silentFails--;
              if (s5 === peg$FAILED) {
                s4 = peg$c5;
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
              if (s4 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s5 !== peg$FAILED) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c2;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsecomment, "peg$parsecomment");
        function peg$parsepath() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 4, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseS();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseS();
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsetable_key();
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseS();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parseS();
                }
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s5 = peg$c9;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c10);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c11(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsepath, "peg$parsepath");
        function peg$parsetablearray() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
          var key = peg$currPos * 49 + 5, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 91) {
              s2 = peg$c7;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parsetable_key();
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseS();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseS();
                  }
                  if (s5 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                      s6 = peg$c9;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }
                    if (s6 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s7 = peg$c9;
                        peg$currPos++;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c12(s4);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsetablearray, "peg$parsetablearray");
        function peg$parsetable_key() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 6, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsedot_ended_table_key_part();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parsedot_ended_table_key_part();
            }
          } else {
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsetable_key_part();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c13(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsetable_key_part();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c14(s1);
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsetable_key, "peg$parsetable_key");
        function peg$parsetable_key_part() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 7, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsekey();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c15(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseS();
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsequoted_key();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseS();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseS();
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c15(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsetable_key_part, "peg$parsetable_key_part");
        function peg$parsedot_ended_table_key_part() {
          var s0, s1, s2, s3, s4, s5, s6;
          var key = peg$currPos * 49 + 8, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsekey();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c16;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseS();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseS();
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c15(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseS();
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsequoted_key();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseS();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseS();
                }
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 46) {
                    s4 = peg$c16;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c17);
                    }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parseS();
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseS();
                    }
                    if (s5 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c15(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsedot_ended_table_key_part, "peg$parsedot_ended_table_key_part");
        function peg$parseassignment() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 9, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsekey();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseS();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseS();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 61) {
                s3 = peg$c18;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c19);
                }
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseS();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parseS();
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsevalue();
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c20(s1, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsequoted_key();
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseS();
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseS();
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 61) {
                  s3 = peg$c18;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                  }
                }
                if (s3 !== peg$FAILED) {
                  s4 = [];
                  s5 = peg$parseS();
                  while (s5 !== peg$FAILED) {
                    s4.push(s5);
                    s5 = peg$parseS();
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsevalue();
                    if (s5 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c20(s1, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseassignment, "peg$parseassignment");
        function peg$parsekey() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 10, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseASCII_BASIC();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseASCII_BASIC();
            }
          } else {
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsekey, "peg$parsekey");
        function peg$parsequoted_key() {
          var s0, s1;
          var key = peg$currPos * 49 + 11, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsedouble_quoted_single_line_string();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c22(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsesingle_quoted_single_line_string();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s1);
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsequoted_key, "peg$parsequoted_key");
        function peg$parsevalue() {
          var s0;
          var key = peg$currPos * 49 + 12, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parsestring();
          if (s0 === peg$FAILED) {
            s0 = peg$parsedatetime();
            if (s0 === peg$FAILED) {
              s0 = peg$parsefloat();
              if (s0 === peg$FAILED) {
                s0 = peg$parseinteger();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseboolean();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsearray();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseinline_table();
                    }
                  }
                }
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsevalue, "peg$parsevalue");
        function peg$parsestring() {
          var s0;
          var key = peg$currPos * 49 + 13, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parsedouble_quoted_multiline_string();
          if (s0 === peg$FAILED) {
            s0 = peg$parsedouble_quoted_single_line_string();
            if (s0 === peg$FAILED) {
              s0 = peg$parsesingle_quoted_multiline_string();
              if (s0 === peg$FAILED) {
                s0 = peg$parsesingle_quoted_single_line_string();
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsestring, "peg$parsestring");
        function peg$parsedouble_quoted_multiline_string() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 14, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c23) {
            s1 = peg$c23;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c24);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNL();
            if (s2 === peg$FAILED) {
              s2 = peg$c25;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsemultiline_string_char();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsemultiline_string_char();
              }
              if (s3 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c23) {
                  s4 = peg$c23;
                  peg$currPos += 3;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c24);
                  }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c26(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsedouble_quoted_multiline_string, "peg$parsedouble_quoted_multiline_string");
        function peg$parsedouble_quoted_single_line_string() {
          var s0, s1, s2, s3;
          var key = peg$currPos * 49 + 15, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c27;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c28);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsestring_char();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsestring_char();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 34) {
                s3 = peg$c27;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c28);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c26(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsedouble_quoted_single_line_string, "peg$parsedouble_quoted_single_line_string");
        function peg$parsesingle_quoted_multiline_string() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 16, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 3) === peg$c29) {
            s1 = peg$c29;
            peg$currPos += 3;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNL();
            if (s2 === peg$FAILED) {
              s2 = peg$c25;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsemultiline_literal_char();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsemultiline_literal_char();
              }
              if (s3 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c29) {
                  s4 = peg$c29;
                  peg$currPos += 3;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c30);
                  }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c26(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsesingle_quoted_multiline_string, "peg$parsesingle_quoted_multiline_string");
        function peg$parsesingle_quoted_single_line_string() {
          var s0, s1, s2, s3;
          var key = peg$currPos * 49 + 17, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c31;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c32);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseliteral_char();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseliteral_char();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c31;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c32);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c26(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsesingle_quoted_single_line_string, "peg$parsesingle_quoted_single_line_string");
        function peg$parsestring_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 18, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseESCAPED();
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 34) {
              s2 = peg$c27;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c28);
              }
            }
            peg$silentFails--;
            if (s2 === peg$FAILED) {
              s1 = peg$c5;
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
            if (s1 !== peg$FAILED) {
              if (input.length > peg$currPos) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c33(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsestring_char, "peg$parsestring_char");
        function peg$parseliteral_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 19, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 39) {
            s2 = peg$c31;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c32);
            }
          }
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = peg$c5;
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c6);
              }
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c33(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseliteral_char, "peg$parseliteral_char");
        function peg$parsemultiline_string_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 20, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseESCAPED();
          if (s0 === peg$FAILED) {
            s0 = peg$parsemultiline_string_delim();
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              if (input.substr(peg$currPos, 3) === peg$c23) {
                s2 = peg$c23;
                peg$currPos += 3;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c24);
                }
              }
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = peg$c5;
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
              if (s1 !== peg$FAILED) {
                if (input.length > peg$currPos) {
                  s2 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s2 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c34(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsemultiline_string_char, "peg$parsemultiline_string_char");
        function peg$parsemultiline_string_delim() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 21, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c35;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c36);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNL();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseNLS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseNLS();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c37();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsemultiline_string_delim, "peg$parsemultiline_string_delim");
        function peg$parsemultiline_literal_char() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 22, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          if (input.substr(peg$currPos, 3) === peg$c29) {
            s2 = peg$c29;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c30);
            }
          }
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = peg$c5;
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            if (input.length > peg$currPos) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c6);
              }
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c33(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsemultiline_literal_char, "peg$parsemultiline_literal_char");
        function peg$parsefloat() {
          var s0, s1, s2, s3;
          var key = peg$currPos * 49 + 23, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsefloat_text();
          if (s1 === peg$FAILED) {
            s1 = peg$parseinteger_text();
          }
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 101) {
              s2 = peg$c38;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c39);
              }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 69) {
                s2 = peg$c40;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c41);
                }
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseinteger_text();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c42(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsefloat_text();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c43(s1);
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsefloat, "peg$parsefloat");
        function peg$parsefloat_text() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 24, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c44;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }
          if (s1 === peg$FAILED) {
            s1 = peg$c25;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseDIGITS();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c16;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGITS();
                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c46(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
              s1 = peg$c47;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseDIGITS();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c16;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseDIGITS();
                  if (s5 !== peg$FAILED) {
                    s3 = [s3, s4, s5];
                    s2 = s3;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c49(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsefloat_text, "peg$parsefloat_text");
        function peg$parseinteger() {
          var s0, s1;
          var key = peg$currPos * 49 + 25, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parseinteger_text();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c50(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseinteger, "peg$parseinteger");
        function peg$parseinteger_text() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 26, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c44;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }
          if (s1 === peg$FAILED) {
            s1 = peg$c25;
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseDIGIT_OR_UNDER();
              }
            } else {
              s2 = peg$c2;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$currPos;
              peg$silentFails++;
              if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c16;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
              peg$silentFails--;
              if (s4 === peg$FAILED) {
                s3 = peg$c5;
              } else {
                peg$currPos = s3;
                s3 = peg$c2;
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c46(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 45) {
              s1 = peg$c47;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseDIGIT_OR_UNDER();
              if (s3 !== peg$FAILED) {
                while (s3 !== peg$FAILED) {
                  s2.push(s3);
                  s3 = peg$parseDIGIT_OR_UNDER();
                }
              } else {
                s2 = peg$c2;
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$currPos;
                peg$silentFails++;
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c16;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c17);
                  }
                }
                peg$silentFails--;
                if (s4 === peg$FAILED) {
                  s3 = peg$c5;
                } else {
                  peg$currPos = s3;
                  s3 = peg$c2;
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c49(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseinteger_text, "peg$parseinteger_text");
        function peg$parseboolean() {
          var s0, s1;
          var key = peg$currPos * 49 + 27, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c51) {
            s1 = peg$c51;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c52);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c53();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 5) === peg$c54) {
              s1 = peg$c54;
              peg$currPos += 5;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c55);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c56();
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseboolean, "peg$parseboolean");
        function peg$parsearray() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 28, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c7;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsearray_sep();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsearray_sep();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 93) {
                s3 = peg$c9;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c10);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c57();
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 91) {
              s1 = peg$c7;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsearray_value();
              if (s2 === peg$FAILED) {
                s2 = peg$c25;
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 93) {
                  s3 = peg$c9;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c10);
                  }
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c58(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 91) {
                s1 = peg$c7;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = [];
                s3 = peg$parsearray_value_list();
                if (s3 !== peg$FAILED) {
                  while (s3 !== peg$FAILED) {
                    s2.push(s3);
                    s3 = peg$parsearray_value_list();
                  }
                } else {
                  s2 = peg$c2;
                }
                if (s2 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s3 = peg$c9;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c10);
                    }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c59(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 91) {
                  s1 = peg$c7;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = [];
                  s3 = peg$parsearray_value_list();
                  if (s3 !== peg$FAILED) {
                    while (s3 !== peg$FAILED) {
                      s2.push(s3);
                      s3 = peg$parsearray_value_list();
                    }
                  } else {
                    s2 = peg$c2;
                  }
                  if (s2 !== peg$FAILED) {
                    s3 = peg$parsearray_value();
                    if (s3 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s4 = peg$c9;
                        peg$currPos++;
                      } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }
                      if (s4 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c60(s2, s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsearray, "peg$parsearray");
        function peg$parsearray_value() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 29, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsearray_sep();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsearray_sep();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsevalue();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsearray_sep();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsearray_sep();
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c61(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsearray_value, "peg$parsearray_value");
        function peg$parsearray_value_list() {
          var s0, s1, s2, s3, s4, s5, s6;
          var key = peg$currPos * 49 + 30, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsearray_sep();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsearray_sep();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsevalue();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parsearray_sep();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parsearray_sep();
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s4 = peg$c62;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c63);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parsearray_sep();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parsearray_sep();
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c61(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsearray_value_list, "peg$parsearray_value_list");
        function peg$parsearray_sep() {
          var s0;
          var key = peg$currPos * 49 + 31, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseS();
          if (s0 === peg$FAILED) {
            s0 = peg$parseNL();
            if (s0 === peg$FAILED) {
              s0 = peg$parsecomment();
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsearray_sep, "peg$parsearray_sep");
        function peg$parseinline_table() {
          var s0, s1, s2, s3, s4, s5;
          var key = peg$currPos * 49 + 32, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c64;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c65);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseS();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseS();
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseinline_table_assignment();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseinline_table_assignment();
              }
              if (s3 !== peg$FAILED) {
                s4 = [];
                s5 = peg$parseS();
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = peg$parseS();
                }
                if (s4 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s5 = peg$c66;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c67);
                    }
                  }
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c68(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseinline_table, "peg$parseinline_table");
        function peg$parseinline_table_assignment() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          var key = peg$currPos * 49 + 33, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseS();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseS();
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsekey();
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseS();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseS();
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 61) {
                  s4 = peg$c18;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c19);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = [];
                  s6 = peg$parseS();
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseS();
                  }
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsevalue();
                    if (s6 !== peg$FAILED) {
                      s7 = [];
                      s8 = peg$parseS();
                      while (s8 !== peg$FAILED) {
                        s7.push(s8);
                        s8 = peg$parseS();
                      }
                      if (s7 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 44) {
                          s8 = peg$c62;
                          peg$currPos++;
                        } else {
                          s8 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c63);
                          }
                        }
                        if (s8 !== peg$FAILED) {
                          s9 = [];
                          s10 = peg$parseS();
                          while (s10 !== peg$FAILED) {
                            s9.push(s10);
                            s10 = peg$parseS();
                          }
                          if (s9 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c69(s2, s6);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$c2;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$c2;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = [];
            s2 = peg$parseS();
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseS();
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsekey();
              if (s2 !== peg$FAILED) {
                s3 = [];
                s4 = peg$parseS();
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  s4 = peg$parseS();
                }
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 61) {
                    s4 = peg$c18;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c19);
                    }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = [];
                    s6 = peg$parseS();
                    while (s6 !== peg$FAILED) {
                      s5.push(s6);
                      s6 = peg$parseS();
                    }
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsevalue();
                      if (s6 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c69(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c2;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c2;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c2;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseinline_table_assignment, "peg$parseinline_table_assignment");
        function peg$parsesecfragment() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 34, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c16;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseDIGITS();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c70(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsesecfragment, "peg$parsesecfragment");
        function peg$parsedate() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
          var key = peg$currPos * 49 + 35, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseDIGIT_OR_UNDER();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGIT_OR_UNDER();
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 45) {
                    s6 = peg$c47;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c48);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseDIGIT_OR_UNDER();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDIGIT_OR_UNDER();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 45) {
                          s9 = peg$c47;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c48);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parseDIGIT_OR_UNDER();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parseDIGIT_OR_UNDER();
                            if (s11 !== peg$FAILED) {
                              s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10, s11];
                              s1 = s2;
                            } else {
                              peg$currPos = s1;
                              s1 = peg$c2;
                            }
                          } else {
                            peg$currPos = s1;
                            s1 = peg$c2;
                          }
                        } else {
                          peg$currPos = s1;
                          s1 = peg$c2;
                        }
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c71(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsedate, "peg$parsedate");
        function peg$parsetime() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          var key = peg$currPos * 49 + 36, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s4 = peg$c72;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c73);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGIT_OR_UNDER();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseDIGIT_OR_UNDER();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                      s7 = peg$c72;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c73);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDIGIT_OR_UNDER();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseDIGIT_OR_UNDER();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsesecfragment();
                          if (s10 === peg$FAILED) {
                            s10 = peg$c25;
                          }
                          if (s10 !== peg$FAILED) {
                            s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10];
                            s1 = s2;
                          } else {
                            peg$currPos = s1;
                            s1 = peg$c2;
                          }
                        } else {
                          peg$currPos = s1;
                          s1 = peg$c2;
                        }
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c74(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsetime, "peg$parsetime");
        function peg$parsetime_with_offset() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16;
          var key = peg$currPos * 49 + 37, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIGIT_OR_UNDER();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 58) {
                s4 = peg$c72;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c73);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseDIGIT_OR_UNDER();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseDIGIT_OR_UNDER();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                      s7 = peg$c72;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c73);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDIGIT_OR_UNDER();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseDIGIT_OR_UNDER();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsesecfragment();
                          if (s10 === peg$FAILED) {
                            s10 = peg$c25;
                          }
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 45) {
                              s11 = peg$c47;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c48);
                              }
                            }
                            if (s11 === peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 43) {
                                s11 = peg$c44;
                                peg$currPos++;
                              } else {
                                s11 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c45);
                                }
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parseDIGIT_OR_UNDER();
                              if (s12 !== peg$FAILED) {
                                s13 = peg$parseDIGIT_OR_UNDER();
                                if (s13 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 58) {
                                    s14 = peg$c72;
                                    peg$currPos++;
                                  } else {
                                    s14 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c73);
                                    }
                                  }
                                  if (s14 !== peg$FAILED) {
                                    s15 = peg$parseDIGIT_OR_UNDER();
                                    if (s15 !== peg$FAILED) {
                                      s16 = peg$parseDIGIT_OR_UNDER();
                                      if (s16 !== peg$FAILED) {
                                        s2 = [s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16];
                                        s1 = s2;
                                      } else {
                                        peg$currPos = s1;
                                        s1 = peg$c2;
                                      }
                                    } else {
                                      peg$currPos = s1;
                                      s1 = peg$c2;
                                    }
                                  } else {
                                    peg$currPos = s1;
                                    s1 = peg$c2;
                                  }
                                } else {
                                  peg$currPos = s1;
                                  s1 = peg$c2;
                                }
                              } else {
                                peg$currPos = s1;
                                s1 = peg$c2;
                              }
                            } else {
                              peg$currPos = s1;
                              s1 = peg$c2;
                            }
                          } else {
                            peg$currPos = s1;
                            s1 = peg$c2;
                          }
                        } else {
                          peg$currPos = s1;
                          s1 = peg$c2;
                        }
                      } else {
                        peg$currPos = s1;
                        s1 = peg$c2;
                      }
                    } else {
                      peg$currPos = s1;
                      s1 = peg$c2;
                    }
                  } else {
                    peg$currPos = s1;
                    s1 = peg$c2;
                  }
                } else {
                  peg$currPos = s1;
                  s1 = peg$c2;
                }
              } else {
                peg$currPos = s1;
                s1 = peg$c2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c74(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsetime_with_offset, "peg$parsetime_with_offset");
        function peg$parsedatetime() {
          var s0, s1, s2, s3, s4;
          var key = peg$currPos * 49 + 38, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = peg$parsedate();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 84) {
              s2 = peg$c75;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c76);
              }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsetime();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 90) {
                  s4 = peg$c77;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c78);
                  }
                }
                if (s4 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c79(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsedate();
            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 84) {
                s2 = peg$c75;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c76);
                }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parsetime_with_offset();
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c80(s1, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parsedatetime, "peg$parsedatetime");
        function peg$parseS() {
          var s0;
          var key = peg$currPos * 49 + 39, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c81.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c82);
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseS, "peg$parseS");
        function peg$parseNL() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 40, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (input.charCodeAt(peg$currPos) === 10) {
            s0 = peg$c83;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c84);
            }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 13) {
              s1 = peg$c85;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c86);
              }
            }
            if (s1 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c83;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c84);
                }
              }
              if (s2 !== peg$FAILED) {
                s1 = [s1, s2];
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseNL, "peg$parseNL");
        function peg$parseNLS() {
          var s0;
          var key = peg$currPos * 49 + 41, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$parseNL();
          if (s0 === peg$FAILED) {
            s0 = peg$parseS();
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseNLS, "peg$parseNLS");
        function peg$parseEOF() {
          var s0, s1;
          var key = peg$currPos * 49 + 42, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          peg$silentFails++;
          if (input.length > peg$currPos) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c6);
            }
          }
          peg$silentFails--;
          if (s1 === peg$FAILED) {
            s0 = peg$c5;
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseEOF, "peg$parseEOF");
        function peg$parseHEX() {
          var s0;
          var key = peg$currPos * 49 + 43, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c87.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c88);
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseHEX, "peg$parseHEX");
        function peg$parseDIGIT_OR_UNDER() {
          var s0, s1;
          var key = peg$currPos * 49 + 44, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c89.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c90);
            }
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 95) {
              s1 = peg$c91;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c92);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c93();
            }
            s0 = s1;
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseDIGIT_OR_UNDER, "peg$parseDIGIT_OR_UNDER");
        function peg$parseASCII_BASIC() {
          var s0;
          var key = peg$currPos * 49 + 45, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          if (peg$c94.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c95);
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseASCII_BASIC, "peg$parseASCII_BASIC");
        function peg$parseDIGITS() {
          var s0, s1, s2;
          var key = peg$currPos * 49 + 46, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parseDIGIT_OR_UNDER();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parseDIGIT_OR_UNDER();
            }
          } else {
            s1 = peg$c2;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c96(s1);
          }
          s0 = s1;
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseDIGITS, "peg$parseDIGITS");
        function peg$parseESCAPED() {
          var s0, s1;
          var key = peg$currPos * 49 + 47, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c97) {
            s1 = peg$c97;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c98);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c99();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c100) {
              s1 = peg$c100;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c101);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c102();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c103) {
                s1 = peg$c103;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c104);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c105();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c106) {
                  s1 = peg$c106;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c107);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c108();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 2) === peg$c109) {
                    s1 = peg$c109;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c110);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c111();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 2) === peg$c112) {
                      s1 = peg$c112;
                      peg$currPos += 2;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c113);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c114();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.substr(peg$currPos, 2) === peg$c115) {
                        s1 = peg$c115;
                        peg$currPos += 2;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c116);
                        }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c117();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseESCAPED_UNICODE();
                      }
                    }
                  }
                }
              }
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseESCAPED, "peg$parseESCAPED");
        function peg$parseESCAPED_UNICODE() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
          var key = peg$currPos * 49 + 48, cached = peg$cache[key];
          if (cached) {
            peg$currPos = cached.nextPos;
            return cached.result;
          }
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c118) {
            s1 = peg$c118;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c119);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$parseHEX();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseHEX();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseHEX();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseHEX();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseHEX();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseHEX();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseHEX();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parseHEX();
                          if (s10 !== peg$FAILED) {
                            s3 = [s3, s4, s5, s6, s7, s8, s9, s10];
                            s2 = s3;
                          } else {
                            peg$currPos = s2;
                            s2 = peg$c2;
                          }
                        } else {
                          peg$currPos = s2;
                          s2 = peg$c2;
                        }
                      } else {
                        peg$currPos = s2;
                        s2 = peg$c2;
                      }
                    } else {
                      peg$currPos = s2;
                      s2 = peg$c2;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c120(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c121) {
              s1 = peg$c121;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c122);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseHEX();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseHEX();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseHEX();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parseHEX();
                    if (s6 !== peg$FAILED) {
                      s3 = [s3, s4, s5, s6];
                      s2 = s3;
                    } else {
                      peg$currPos = s2;
                      s2 = peg$c2;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c120(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          }
          peg$cache[key] = { nextPos: peg$currPos, result: s0 };
          return s0;
        }
        __name(peg$parseESCAPED_UNICODE, "peg$parseESCAPED_UNICODE");
        var nodes = [];
        function genError(err, line2, col) {
          var ex = new Error(err);
          ex.line = line2;
          ex.column = col;
          throw ex;
        }
        __name(genError, "genError");
        function addNode(node2) {
          nodes.push(node2);
        }
        __name(addNode, "addNode");
        function node(type, value, line2, column2, key) {
          var obj = { type, value, line: line2(), column: column2() };
          if (key)
            obj.key = key;
          return obj;
        }
        __name(node, "node");
        function convertCodePoint(str, line2, col) {
          var num = parseInt("0x" + str);
          if (!isFinite(num) || Math.floor(num) != num || num < 0 || num > 1114111 || num > 55295 && num < 57344) {
            genError("Invalid Unicode escape code: " + str, line2, col);
          } else {
            return fromCodePoint(num);
          }
        }
        __name(convertCodePoint, "convertCodePoint");
        function fromCodePoint() {
          var MAX_SIZE = 16384;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return "";
          }
          var result = "";
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              highSurrogate = (codePoint >> 10) + 55296;
              lowSurrogate = codePoint % 1024 + 56320;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += String.fromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        }
        __name(fromCodePoint, "fromCodePoint");
        peg$result = peg$startRuleFunction();
        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
        } else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail({ type: "end", description: "end of input" });
          }
          throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
        }
      }
      __name(parse, "parse");
      return {
        SyntaxError,
        parse
      };
    }();
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/toml/lib/compiler.js
var require_compiler = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/toml/lib/compiler.js"(exports2, module2) {
    "use strict";
    function compile(nodes) {
      var assignedPaths = [];
      var valueAssignments = [];
      var currentPath = "";
      var data = /* @__PURE__ */ Object.create(null);
      var context = data;
      var arrayMode = false;
      return reduce(nodes);
      function reduce(nodes2) {
        var node;
        for (var i = 0; i < nodes2.length; i++) {
          node = nodes2[i];
          switch (node.type) {
            case "Assign":
              assign2(node);
              break;
            case "ObjectPath":
              setPath(node);
              break;
            case "ArrayPath":
              addTableArray(node);
              break;
          }
        }
        return data;
      }
      __name(reduce, "reduce");
      function genError(err, line, col) {
        var ex = new Error(err);
        ex.line = line;
        ex.column = col;
        throw ex;
      }
      __name(genError, "genError");
      function assign2(node) {
        var key = node.key;
        var value = node.value;
        var line = node.line;
        var column = node.column;
        var fullPath;
        if (currentPath) {
          fullPath = currentPath + "." + key;
        } else {
          fullPath = key;
        }
        if (typeof context[key] !== "undefined") {
          genError("Cannot redefine existing key '" + fullPath + "'.", line, column);
        }
        context[key] = reduceValueNode(value);
        if (!pathAssigned(fullPath)) {
          assignedPaths.push(fullPath);
          valueAssignments.push(fullPath);
        }
      }
      __name(assign2, "assign");
      function pathAssigned(path2) {
        return assignedPaths.indexOf(path2) !== -1;
      }
      __name(pathAssigned, "pathAssigned");
      function reduceValueNode(node) {
        if (node.type === "Array") {
          return reduceArrayWithTypeChecking(node.value);
        } else if (node.type === "InlineTable") {
          return reduceInlineTableNode(node.value);
        } else {
          return node.value;
        }
      }
      __name(reduceValueNode, "reduceValueNode");
      function reduceInlineTableNode(values) {
        var obj = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < values.length; i++) {
          var val = values[i];
          if (val.value.type === "InlineTable") {
            obj[val.key] = reduceInlineTableNode(val.value.value);
          } else if (val.type === "InlineTableValue") {
            obj[val.key] = reduceValueNode(val.value);
          }
        }
        return obj;
      }
      __name(reduceInlineTableNode, "reduceInlineTableNode");
      function setPath(node) {
        var path2 = node.value;
        var quotedPath = path2.map(quoteDottedString).join(".");
        var line = node.line;
        var column = node.column;
        if (pathAssigned(quotedPath)) {
          genError("Cannot redefine existing key '" + path2 + "'.", line, column);
        }
        assignedPaths.push(quotedPath);
        context = deepRef(data, path2, /* @__PURE__ */ Object.create(null), line, column);
        currentPath = path2;
      }
      __name(setPath, "setPath");
      function addTableArray(node) {
        var path2 = node.value;
        var quotedPath = path2.map(quoteDottedString).join(".");
        var line = node.line;
        var column = node.column;
        if (!pathAssigned(quotedPath)) {
          assignedPaths.push(quotedPath);
        }
        assignedPaths = assignedPaths.filter(function(p) {
          return p.indexOf(quotedPath) !== 0;
        });
        assignedPaths.push(quotedPath);
        context = deepRef(data, path2, [], line, column);
        currentPath = quotedPath;
        if (context instanceof Array) {
          var newObj = /* @__PURE__ */ Object.create(null);
          context.push(newObj);
          context = newObj;
        } else {
          genError("Cannot redefine existing key '" + path2 + "'.", line, column);
        }
      }
      __name(addTableArray, "addTableArray");
      function deepRef(start, keys, value, line, column) {
        var traversed = [];
        var traversedPath = "";
        var path2 = keys.join(".");
        var ctx = start;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          traversed.push(key);
          traversedPath = traversed.join(".");
          if (typeof ctx[key] === "undefined") {
            if (i === keys.length - 1) {
              ctx[key] = value;
            } else {
              ctx[key] = /* @__PURE__ */ Object.create(null);
            }
          } else if (i !== keys.length - 1 && valueAssignments.indexOf(traversedPath) > -1) {
            genError("Cannot redefine existing key '" + traversedPath + "'.", line, column);
          }
          ctx = ctx[key];
          if (ctx instanceof Array && ctx.length && i < keys.length - 1) {
            ctx = ctx[ctx.length - 1];
          }
        }
        return ctx;
      }
      __name(deepRef, "deepRef");
      function reduceArrayWithTypeChecking(array) {
        var firstType = null;
        for (var i = 0; i < array.length; i++) {
          var node = array[i];
          if (firstType === null) {
            firstType = node.type;
          } else {
            if (node.type !== firstType) {
              genError("Cannot add value of type " + node.type + " to array of type " + firstType + ".", node.line, node.column);
            }
          }
        }
        return array.map(reduceValueNode);
      }
      __name(reduceArrayWithTypeChecking, "reduceArrayWithTypeChecking");
      function quoteDottedString(str) {
        if (str.indexOf(".") > -1) {
          return '"' + str + '"';
        } else {
          return str;
        }
      }
      __name(quoteDottedString, "quoteDottedString");
    }
    __name(compile, "compile");
    module2.exports = {
      compile
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/toml/index.js
var require_toml = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/toml/index.js"(exports2, module2) {
    var parser = require_parser();
    var compiler = require_compiler();
    module2.exports = {
      parse: function(input) {
        var nodes = parser.parse(input.toString());
        return compiler.compile(nodes);
      }
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/identity.js"(exports2) {
    "use strict";
    var ALIAS = Symbol.for("yaml.alias");
    var DOC = Symbol.for("yaml.document");
    var MAP = Symbol.for("yaml.map");
    var PAIR = Symbol.for("yaml.pair");
    var SCALAR = Symbol.for("yaml.scalar");
    var SEQ = Symbol.for("yaml.seq");
    var NODE_TYPE = Symbol.for("yaml.node.type");
    var isAlias = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS, "isAlias");
    var isDocument = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC, "isDocument");
    var isMap = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP, "isMap");
    var isPair = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR, "isPair");
    var isScalar = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR, "isScalar");
    var isSeq = /* @__PURE__ */ __name((node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ, "isSeq");
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    __name(isCollection, "isCollection");
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    __name(isNode, "isNode");
    var hasAnchor = /* @__PURE__ */ __name((node) => (isScalar(node) || isCollection(node)) && !!node.anchor, "hasAnchor");
    exports2.ALIAS = ALIAS;
    exports2.DOC = DOC;
    exports2.MAP = MAP;
    exports2.NODE_TYPE = NODE_TYPE;
    exports2.PAIR = PAIR;
    exports2.SCALAR = SCALAR;
    exports2.SEQ = SEQ;
    exports2.hasAnchor = hasAnchor;
    exports2.isAlias = isAlias;
    exports2.isCollection = isCollection;
    exports2.isDocument = isDocument;
    exports2.isMap = isMap;
    exports2.isNode = isNode;
    exports2.isPair = isPair;
    exports2.isScalar = isScalar;
    exports2.isSeq = isSeq;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/visit.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    __name(visit, "visit");
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path2) {
      const ctrl = callVisitor(key, node, visitor, path2);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visit_(key, ctrl, visitor, path2);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path2);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          const ck = visit_("key", node.key, visitor, path2);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path2);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    __name(visit_, "visit_");
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    __name(visitAsync, "visitAsync");
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path2) {
      const ctrl = await callVisitor(key, node, visitor, path2);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visitAsync_(key, ctrl, visitor, path2);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path2);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path2);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path2);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    __name(visitAsync_, "visitAsync_");
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    __name(initVisitor, "initVisitor");
    function callVisitor(key, node, visitor, path2) {
      if (typeof visitor === "function")
        return visitor(key, node, path2);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path2);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path2);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path2);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path2);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path2);
      return void 0;
    }
    __name(callVisitor, "callVisitor");
    function replaceNode(key, path2, node) {
      const parent = path2[path2.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    __name(replaceNode, "replaceNode");
    exports2.visit = visit;
    exports2.visitAsync = visitAsync;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/directives.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = /* @__PURE__ */ __name((tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]), "escapeTagName");
    var Directives = class _Directives {
      static {
        __name(this, "Directives");
      }
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix)
          return prefix + decodeURIComponent(suffix);
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports2.Directives = Directives;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/anchors.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    __name(anchorIsValid, "anchorIsValid");
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    __name(anchorNames, "anchorNames");
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    __name(findNewAnchor, "findNewAnchor");
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          if (!prevAnchors)
            prevAnchors = anchorNames(doc);
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    __name(createNodeAnchors, "createNodeAnchors");
    exports2.anchorIsValid = anchorIsValid;
    exports2.anchorNames = anchorNames;
    exports2.createNodeAnchors = createNodeAnchors;
    exports2.findNewAnchor = findNewAnchor;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/applyReviver.js"(exports2) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    __name(applyReviver, "applyReviver");
    exports2.applyReviver = applyReviver;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/toJS.js"(exports2) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    __name(toJS, "toJS");
    exports2.toJS = toJS;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Node.js"(exports2) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      static {
        __name(this, "NodeBase");
      }
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports2.NodeBase = NodeBase;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Alias.js"(exports2) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node2 = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node2.NodeBase {
      static {
        __name(this, "Alias");
      }
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc) {
        let found = void 0;
        visit.visit(doc, {
          Node: (_key, node) => {
            if (node === this)
              return visit.visit.BREAK;
            if (node.anchor === this.source)
              found = node;
          }
        });
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data = anchors2.get(source);
        if (!data) {
          toJS.toJS(source, null, ctx);
          data = anchors2.get(source);
        }
        if (!data || data.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    __name(getAliasCount, "getAliasCount");
    exports2.Alias = Alias;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Scalar.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Node2 = require_Node();
    var toJS = require_toJS();
    var isScalarValue = /* @__PURE__ */ __name((value) => !value || typeof value !== "function" && typeof value !== "object", "isScalarValue");
    var Scalar = class extends Node2.NodeBase {
      static {
        __name(this, "Scalar");
      }
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports2.Scalar = Scalar;
    exports2.isScalarValue = isScalarValue;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/createNode.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    __name(findTagObject, "findTagObject");
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          if (!ref.anchor)
            ref.anchor = onAnchor(value);
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    __name(createNode, "createNode");
    exports2.createNode = createNode;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Collection.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node2 = require_Node();
    function collectionFromPath(schema, path2, value) {
      let v = value;
      for (let i = path2.length - 1; i >= 0; --i) {
        const k = path2[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    __name(collectionFromPath, "collectionFromPath");
    var isEmptyPath = /* @__PURE__ */ __name((path2) => path2 == null || typeof path2 === "object" && !!path2[Symbol.iterator]().next().done, "isEmptyPath");
    var Collection = class extends Node2.NodeBase {
      static {
        __name(this, "Collection");
      }
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path2, value) {
        if (isEmptyPath(path2))
          this.add(value);
        else {
          const [key, ...rest] = path2;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path2) {
        const [key, ...rest] = path2;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path2, keepScalar) {
        const [key, ...rest] = path2;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path2) {
        const [key, ...rest] = path2;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path2, value) {
        const [key, ...rest] = path2;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    Collection.maxFlowStringSingleLineLength = 60;
    exports2.Collection = Collection;
    exports2.collectionFromPath = collectionFromPath;
    exports2.isEmptyPath = isEmptyPath;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyComment.js"(exports2) {
    "use strict";
    var stringifyComment = /* @__PURE__ */ __name((str) => str.replace(/^(?!$)(?: $)?/gm, "#"), "stringifyComment");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    __name(indentComment, "indentComment");
    var lineComment = /* @__PURE__ */ __name((str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment, "lineComment");
    exports2.indentComment = indentComment;
    exports2.lineComment = lineComment;
    exports2.stringifyComment = stringifyComment;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/foldFlowLines.js"(exports2) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i);
          end = i + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    __name(foldFlowLines, "foldFlowLines");
    function consumeMoreIndentedLines(text, i) {
      let ch = text[i + 1];
      while (ch === " " || ch === "	") {
        do {
          ch = text[i += 1];
        } while (ch && ch !== "\n");
        ch = text[i + 1];
      }
      return i;
    }
    __name(consumeMoreIndentedLines, "consumeMoreIndentedLines");
    exports2.FOLD_BLOCK = FOLD_BLOCK;
    exports2.FOLD_FLOW = FOLD_FLOW;
    exports2.FOLD_QUOTED = FOLD_QUOTED;
    exports2.foldFlowLines = foldFlowLines;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyString.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = /* @__PURE__ */ __name((ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    }), "getFoldOptions");
    var containsDocumentMarker = /* @__PURE__ */ __name((str) => /^(%|---|\.\.\.)/m.test(str), "containsDocumentMarker");
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    __name(lineLengthOverLimit, "lineLengthOverLimit");
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    __name(doubleQuotedString, "doubleQuotedString");
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    __name(singleQuotedString, "singleQuotedString");
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    __name(quotedString, "quotedString");
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (literal ? "|" : ">") + (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}
${indent}${start}${value}${end}`;
      }
      value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      const body = foldFlowLines.foldFlowLines(`${start}${value}${end}`, indent, foldFlowLines.FOLD_BLOCK, getFoldOptions(ctx, true));
      return `${header}
${indent}${body}`;
    }
    __name(blockString, "blockString");
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = /* @__PURE__ */ __name((tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str), "test");
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    __name(plainString, "plainString");
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = /* @__PURE__ */ __name((_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      }, "_stringify");
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    __name(stringifyString, "stringifyString");
    exports2.stringifyString = stringifyString;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringify.js"(exports2) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    __name(createStringifyContext, "createStringifyContext");
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        const match = tags.filter((t) => t.identify?.(obj));
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj?.constructor?.name ?? typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    __name(getTagObject, "getTagObject");
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    __name(stringifyProps, "stringifyProps");
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      if (!tagObj)
        tagObj = getTagObject(ctx.doc.schema.tags, node);
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    __name(stringify, "stringify");
    exports2.createStringifyContext = createStringifyContext;
    exports2.stringify = stringify;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyPair.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key)) {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n")
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    __name(stringifyPair, "stringifyPair");
    exports2.stringifyPair = stringifyPair;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/log.js"(exports2) {
    "use strict";
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    __name(debug, "debug");
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof process !== "undefined" && process.emitWarning)
          process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    __name(warn, "warn");
    exports2.debug = debug;
    exports2.warn = warn;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports2) {
    "use strict";
    var log = require_log();
    var stringify = require_stringify();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var MERGE_KEY = "<<";
    function addPairToJSMap(ctx, map, { key, value }) {
      if (ctx?.doc.schema.merge && isMergeKey(key)) {
        value = identity.isAlias(value) ? value.resolve(ctx.doc) : value;
        if (identity.isSeq(value))
          for (const it of value.items)
            mergeToJSMap(ctx, map, it);
        else if (Array.isArray(value))
          for (const it of value)
            mergeToJSMap(ctx, map, it);
        else
          mergeToJSMap(ctx, map, value);
      } else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    __name(addPairToJSMap, "addPairToJSMap");
    var isMergeKey = /* @__PURE__ */ __name((key) => key === MERGE_KEY || identity.isScalar(key) && key.value === MERGE_KEY && (!key.type || key.type === Scalar.Scalar.PLAIN), "isMergeKey");
    function mergeToJSMap(ctx, map, value) {
      const source = ctx && identity.isAlias(value) ? value.resolve(ctx.doc) : value;
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    __name(mergeToJSMap, "mergeToJSMap");
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    __name(stringifyKey, "stringifyKey");
    exports2.addPairToJSMap = addPairToJSMap;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/Pair.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    __name(createPair, "createPair");
    var Pair = class _Pair {
      static {
        __name(this, "Pair");
      }
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports2.Pair = Pair;
    exports2.createPair = createPair;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyCollection.js"(exports2) {
    "use strict";
    var Collection = require_Collection();
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    __name(stringifyCollection, "stringifyCollection");
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    __name(stringifyBlockCollection, "stringifyBlockCollection");
    function stringifyFlowCollection({ comment, items }, ctx, { flowChars, itemIndent, onComment }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment2 = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment2 = ik.comment;
          }
        }
        if (comment2)
          reqNewline = true;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null);
        if (i < items.length - 1)
          str2 += ",";
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (!reqNewline && (lines.length > linesAtValue || str2.includes("\n")))
          reqNewline = true;
        lines.push(str2);
        linesAtValue = lines.length;
      }
      let str;
      const { start, end } = flowChars;
      if (lines.length === 0) {
        str = start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = len > Collection.Collection.maxFlowStringSingleLineLength;
        }
        if (reqNewline) {
          str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          str += `
${indent}${end}`;
        } else {
          str = `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
      if (comment) {
        str += stringifyComment.lineComment(str, indent, commentString(comment));
        if (onComment)
          onComment();
      }
      return str;
    }
    __name(stringifyFlowCollection, "stringifyFlowCollection");
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    __name(addCommentBefore, "addCommentBefore");
    exports2.stringifyCollection = stringifyCollection;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/YAMLMap.js"(exports2) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    __name(findPair, "findPair");
    var YAMLMap = class extends Collection.Collection {
      static {
        __name(this, "YAMLMap");
      }
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = /* @__PURE__ */ __name((key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        }, "add");
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports2.YAMLMap = YAMLMap;
    exports2.findPair = findPair;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/map.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports2.map = map;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/nodes/YAMLSeq.js"(exports2) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static {
        __name(this, "YAMLSeq");
      }
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    __name(asItemIndex, "asItemIndex");
    exports2.YAMLSeq = YAMLSeq;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/seq.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports2.seq = seq;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/string.js"(exports2) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports2.string = string;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/common/null.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports2.nullTag = nullTag;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/bool.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports2.boolTag = boolTag;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyNumber.js"(exports2) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    __name(stringifyNumber, "stringifyNumber");
    exports2.stringifyNumber = stringifyNumber;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/float.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports2.float = float;
    exports2.floatExp = floatExp;
    exports2.floatNaN = floatNaN;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/int.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = /* @__PURE__ */ __name((value) => typeof value === "bigint" || Number.isInteger(value), "intIdentify");
    var intResolve = /* @__PURE__ */ __name((str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix), "intResolve");
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    __name(intStringify, "intStringify");
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports2.int = int;
    exports2.intHex = intHex;
    exports2.intOct = intOct;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/core/schema.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports2.schema = schema;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/json/schema.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    __name(intIdentify, "intIdentify");
    var stringifyJSON = /* @__PURE__ */ __name(({ value }) => JSON.stringify(value), "stringifyJSON");
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true|false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports2.schema = schema;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        const buf = value;
        let str;
        if (typeof Buffer === "function") {
          str = buf instanceof Buffer ? buf.toString("base64") : Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type)
          type = Scalar.Scalar.BLOCK_LITERAL;
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports2.binary = binary;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    __name(resolvePairs, "resolvePairs");
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    __name(createPairs, "createPairs");
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports2.createPairs = createPairs;
    exports2.pairs = pairs;
    exports2.resolvePairs = resolvePairs;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      static {
        __name(this, "YAMLOMap");
      }
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports2.YAMLOMap = YAMLOMap;
    exports2.omap = omap;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    __name(boolStringify, "boolStringify");
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports2.falseTag = falseTag;
    exports2.trueTag = trueTag;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports2.float = float;
    exports2.floatExp = floatExp;
    exports2.floatNaN = floatNaN;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = /* @__PURE__ */ __name((value) => typeof value === "bigint" || Number.isInteger(value), "intIdentify");
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    __name(intResolve, "intResolve");
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    __name(intStringify, "intStringify");
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports2.int = int;
    exports2.intBin = intBin;
    exports2.intHex = intHex;
    exports2.intOct = intOct;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      static {
        __name(this, "YAMLSet");
      }
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports2.YAMLSet = YAMLSet;
    exports2.set = set;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports2) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = /* @__PURE__ */ __name((n) => asBigInt ? BigInt(n) : Number(n), "num");
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    __name(parseSexagesimal, "parseSexagesimal");
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = /* @__PURE__ */ __name((n) => n, "num");
      if (typeof value === "bigint")
        num = /* @__PURE__ */ __name((n) => BigInt(n), "num");
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    __name(stringifySexagesimal, "stringifySexagesimal");
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
    };
    exports2.floatTime = floatTime;
    exports2.intTime = intTime;
    exports2.timestamp = timestamp;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports2.schema = schema;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/tags.js"(exports2) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName) {
      let tags = schemas.get(schemaName);
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      return tags.map((tag) => {
        if (typeof tag !== "string")
          return tag;
        const tagObj = tagsByName[tag];
        if (tagObj)
          return tagObj;
        const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
      });
    }
    __name(getTags, "getTags");
    exports2.coreKnownTags = coreKnownTags;
    exports2.getTags = getTags;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/schema/Schema.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = /* @__PURE__ */ __name((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0, "sortMapEntriesByKey");
    var Schema = class _Schema {
      static {
        __name(this, "Schema");
      }
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.merge = !!merge;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports2.Schema = Schema;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/stringify/stringifyDocument.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    __name(stringifyDocument, "stringifyDocument");
    exports2.stringifyDocument = stringifyDocument;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/doc/Document.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      static {
        __name(this, "Document");
      }
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path2, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path2, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = /* @__PURE__ */ __name((v) => typeof v === "number" || v instanceof String || v instanceof Number, "keyToStr");
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path2) {
        if (Collection.isEmptyPath(path2)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path2) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path2, keepScalar) {
        if (Collection.isEmptyPath(path2))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path2, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path2) {
        if (Collection.isEmptyPath(path2))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path2) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path2, value) {
        if (Collection.isEmptyPath(path2)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path2), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path2, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { merge: true, resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { merge: false, resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    __name(assertCollection, "assertCollection");
    exports2.Document = Document;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/errors.js
var require_errors3 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/errors.js"(exports2) {
    "use strict";
    var YAMLError = class extends Error {
      static {
        __name(this, "YAMLError");
      }
      constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      static {
        __name(this, "YAMLParseError");
      }
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      static {
        __name(this, "YAMLWarning");
      }
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = /* @__PURE__ */ __name((src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    }, "prettifyError");
    exports2.YAMLError = YAMLError;
    exports2.YAMLParseError = YAMLParseError;
    exports2.YAMLWarning = YAMLWarning;
    exports2.prettifyError = prettifyError;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-props.js"(exports2) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let hasNewlineAfterProp = false;
      let reqSpace = false;
      let anchor = null;
      let tag = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        switch (token.type) {
          case "space":
            if (!flow && atNewline && indicator !== "doc-start" && token.source[0] === "	")
              onError(token, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              hasNewlineAfterProp = true;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = false;
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== ""))
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        hasNewlineAfterProp,
        anchor,
        tag,
        end,
        start: start ?? end
      };
    }
    __name(resolveProps, "resolveProps");
    exports2.resolveProps = resolveProps;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-contains-newline.js"(exports2) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    __name(containsNewline, "containsNewline");
    exports2.containsNewline = containsNewline;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports2) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    __name(flowIndentCheck, "flowIndentCheck");
    exports2.flowIndentCheck = flowIndentCheck;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-map-includes.js"(exports2) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value && !(a.value === "<<" && ctx.schema.merge);
      return items.some((pair) => isEqual(pair.key, search));
    }
    __name(mapIncludes, "mapIncludes");
    exports2.mapIncludes = mapIncludes;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-block-map.js"(exports2) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.hasNewlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    __name(resolveBlockMap, "resolveBlockMap");
    exports2.resolveBlockMap = resolveBlockMap;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-block-seq.js"(exports2) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value && value.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    __name(resolveBlockSeq, "resolveBlockSeq");
    exports2.resolveBlockSeq = resolveBlockSeq;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-end.js"(exports2) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    __name(resolveEnd, "resolveEnd");
    exports2.resolveEnd = resolveEnd;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = /* @__PURE__ */ __name((token) => token && (token.type === "block-map" || token.type === "block-seq"), "isBlock");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop:
              for (const st of start) {
                switch (st.type) {
                  case "comma":
                  case "space":
                    break;
                  case "comment":
                    prevItemComment = st.source.substring(1);
                    break loop;
                  default:
                    break loop;
                }
              }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source && value.source[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce && ce.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    __name(resolveFlowCollection, "resolveFlowCollection");
    exports2.resolveFlowCollection = resolveFlowCollection;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-collection.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    __name(resolveCollection, "resolveCollection");
    function composeCollection(CN, ctx, token, tagToken, onError) {
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq" || !expType) {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt && kt.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt?.collection) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    __name(composeCollection, "composeCollection");
    exports2.composeCollection = composeCollection;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(scalar, strict, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    __name(resolveBlockScalar, "resolveBlockScalar");
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    __name(parseBlockScalarHeader, "parseBlockScalarHeader");
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    __name(splitLines, "splitLines");
    exports2.resolveBlockScalar = resolveBlockScalar;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports2) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = /* @__PURE__ */ __name((rel, code, msg) => onError(offset + rel, code, msg), "_onError");
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    __name(resolveFlowScalar, "resolveFlowScalar");
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    __name(plainValue, "plainValue");
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    __name(singleQuotedValue, "singleQuotedValue");
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch (_) {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    __name(foldLines, "foldLines");
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = { x: 2, u: 4, U: 8 }[next];
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    __name(doubleQuotedValue, "doubleQuotedValue");
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    __name(foldNewline, "foldNewline");
    var escapeCodes = {
      "0": "\0",
      a: "\x07",
      b: "\b",
      e: "\x1B",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	",
      v: "\v",
      N: "\x85",
      _: "\xA0",
      L: "\u2028",
      P: "\u2029",
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      if (isNaN(code)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
      return String.fromCodePoint(code);
    }
    __name(parseCharCode, "parseCharCode");
    exports2.resolveFlowScalar = resolveFlowScalar;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-scalar.js"(exports2) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range: range2 } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(token, ctx.options.strict, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      const tag = tagToken && tagName ? findScalarTagByName(ctx.schema, value, tagName, tagToken, onError) : token.type === "scalar" ? findScalarTagByTest(ctx, value, token, onError) : ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range2;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    __name(composeScalar, "composeScalar");
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    __name(findScalarTagByName, "findScalarTagByName");
    function findScalarTagByTest({ directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => tag2.default && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    __name(findScalarTagByTest, "findScalarTagByTest");
    exports2.composeScalar = composeScalar;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports2) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        if (pos === null)
          pos = before.length;
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    __name(emptyScalarPosition, "emptyScalarPosition");
    exports2.emptyScalarPosition = emptyScalarPosition;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-node.js"(exports2) {
    "use strict";
    var Alias = require_Alias();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          node = composeCollection.composeCollection(CN, ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
          isSrcToken = false;
        }
      }
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    __name(composeNode, "composeNode");
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    __name(composeEmptyNode, "composeEmptyNode");
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    __name(composeAlias, "composeAlias");
    exports2.composeEmptyNode = composeEmptyNode;
    exports2.composeNode = composeNode;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/compose-doc.js"(exports2) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    __name(composeDoc, "composeDoc");
    exports2.composeDoc = composeDoc;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/compose/composer.js"(exports2) {
    "use strict";
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors3();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    __name(getErrorPos, "getErrorPos");
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    __name(parsePrelude, "parsePrelude");
    var Composer = class {
      static {
        __name(this, "Composer");
      }
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          Array.prototype.push.apply(doc.errors, this.errors);
          Array.prototype.push.apply(doc.warnings, this.warnings);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports2.Composer = Composer;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst-scalar.js"(exports2) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors3();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = /* @__PURE__ */ __name((pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        }, "_onError");
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar(token, strict, _onError);
        }
      }
      return null;
    }
    __name(resolveAsScalar, "resolveAsScalar");
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    __name(createScalarToken, "createScalarToken");
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    __name(setScalarValue, "setScalarValue");
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    __name(setBlockScalarValue, "setBlockScalarValue");
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    __name(addEndtoBlockProps, "addEndtoBlockProps");
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    __name(setFlowScalarValue, "setFlowScalarValue");
    exports2.createScalarToken = createScalarToken;
    exports2.resolveAsScalar = resolveAsScalar;
    exports2.setScalarValue = setScalarValue;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst-stringify.js"(exports2) {
    "use strict";
    var stringify = /* @__PURE__ */ __name((cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst), "stringify");
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    __name(stringifyToken, "stringifyToken");
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    __name(stringifyItem, "stringifyItem");
    exports2.stringify = stringify;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst-visit.js"(exports2) {
    "use strict";
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    __name(visit, "visit");
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path2) => {
      let item = cst;
      for (const [field, index] of path2) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path2) => {
      const parent = visit.itemAtPath(cst, path2.slice(0, -1));
      const field = path2[path2.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path2, item, visitor) {
      let ctrl = visitor(item, path2);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path2.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path2);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path2) : ctrl;
    }
    __name(_visit, "_visit");
    exports2.visit = visit;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/cst.js"(exports2) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = /* @__PURE__ */ __name((token) => !!token && "items" in token, "isCollection");
    var isScalar = /* @__PURE__ */ __name((token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar"), "isScalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    __name(prettyToken, "prettyToken");
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    __name(tokenType, "tokenType");
    exports2.createScalarToken = cstScalar.createScalarToken;
    exports2.resolveAsScalar = cstScalar.resolveAsScalar;
    exports2.setScalarValue = cstScalar.setScalarValue;
    exports2.stringify = cstStringify.stringify;
    exports2.visit = cstVisit.visit;
    exports2.BOM = BOM;
    exports2.DOCUMENT = DOCUMENT;
    exports2.FLOW_END = FLOW_END;
    exports2.SCALAR = SCALAR;
    exports2.isCollection = isCollection;
    exports2.isScalar = isScalar;
    exports2.prettyToken = prettyToken;
    exports2.tokenType = tokenType;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/lexer.js"(exports2) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    __name(isEmpty, "isEmpty");
    var hexDigits = "0123456789ABCDEFabcdef".split("");
    var tagChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split("");
    var invalidFlowScalarChars = ",[]{}".split("");
    var invalidAnchorChars = " ,[]{}\n\r	".split("");
    var isNotAnchorChar = /* @__PURE__ */ __name((ch) => !ch || invalidAnchorChars.includes(ch), "isNotAnchorChar");
    var Lexer = class {
      static {
        __name(this, "Lexer");
      }
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          const cs = line.indexOf("#");
          if (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	")
              dirEnd = cs - 1;
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if (s === "---" && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return "doc";
          } else if (s === "..." && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            return "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return yield* this.parseBlockStart();
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop:
          for (let i = this.pos; ch = this.buffer[i]; ++i) {
            switch (ch) {
              case " ":
                indent += 1;
                break;
              case "\n":
                nl = i;
                indent = 0;
                break;
              case "\r": {
                const next = this.buffer[i + 1];
                if (!next && !this.atEnd)
                  return this.setNext("block-scalar");
                if (next === "\n")
                  break;
              }
              default:
                break loop;
            }
          }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else
            this.indentNext += this.blockScalarIndent;
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        if (!this.blockScalarKeep) {
          do {
            let i = nl - 1;
            let ch2 = this.buffer[i];
            if (ch2 === "\r")
              ch2 = this.buffer[--i];
            const lastChar = i;
            while (ch2 === " " || ch2 === "	")
              ch2 = this.buffer[--i];
            if (ch2 === "\n" && i >= this.pos && i + 1 + indent > lastChar)
              nl = i;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && next === ",")
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && invalidFlowScalarChars.includes(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && invalidFlowScalarChars.includes(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        switch (this.charAt(0)) {
          case "!":
            return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "&":
            return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "-":
          case "?":
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && invalidFlowScalarChars.includes(ch1)) {
              if (!inFlow)
                this.indentNext = this.indentValue + 1;
              else if (this.flowKey)
                this.flowKey = false;
              return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
            }
          }
        }
        return 0;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.includes(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.includes(this.buffer[i + 1]) && hexDigits.includes(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports2.Lexer = Lexer;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/line-counter.js"(exports2) {
    "use strict";
    var LineCounter = class {
      static {
        __name(this, "LineCounter");
      }
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports2.LineCounter = LineCounter;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/parser.js
var require_parser2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/parse/parser.js"(exports2) {
    "use strict";
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    __name(includesToken, "includesToken");
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    __name(findNonEmptyIndex, "findNonEmptyIndex");
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    __name(isFlowToken, "isFlowToken");
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        default:
          return [];
      }
    }
    __name(getPrevProps, "getPrevProps");
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop:
        while (--i >= 0) {
          switch (prev[i].type) {
            case "doc-start":
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
            case "newline":
              break loop;
          }
        }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    __name(getFirstKeyStartProps, "getFirstKeyStartProps");
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                Array.prototype.push.apply(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              Array.prototype.push.apply(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    __name(fixFlowSeqItems, "fixFlowSeqItems");
    var Parser = class {
      static {
        __name(this, "Parser");
      }
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !includesToken(it.start, "explicit-key-ind");
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atNextItem = !this.onKeyLine && this.indent === map.indent && it.sep;
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !includesToken(it.start, "explicit-key-ind")) {
                it.start.push(this.sourceToken);
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken] }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (includesToken(it.start, "explicit-key-ind")) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key, delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (atNextItem && bv.type !== "block-seq" && includesToken(it.start, "explicit-key-ind")) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top && top.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports2.Parser = Parser;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/public-api.js"(exports2) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors3();
    var log = require_log();
    var lineCounter = require_line_counter();
    var parser = require_parser2();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    __name(parseOptions, "parseOptions");
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    __name(parseAllDocuments, "parseAllDocuments");
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    __name(parseDocument, "parseDocument");
    function parse(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    __name(parse, "parse");
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      return new Document.Document(value, _replacer, options).toString(options);
    }
    __name(stringify, "stringify");
    exports2.parse = parse;
    exports2.parseAllDocuments = parseAllDocuments;
    exports2.parseDocument = parseDocument;
    exports2.stringify = stringify;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/yaml/dist/index.js"(exports2) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors3();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser2();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports2.Composer = composer.Composer;
    exports2.Document = Document.Document;
    exports2.Schema = Schema.Schema;
    exports2.YAMLError = errors.YAMLError;
    exports2.YAMLParseError = errors.YAMLParseError;
    exports2.YAMLWarning = errors.YAMLWarning;
    exports2.Alias = Alias.Alias;
    exports2.isAlias = identity.isAlias;
    exports2.isCollection = identity.isCollection;
    exports2.isDocument = identity.isDocument;
    exports2.isMap = identity.isMap;
    exports2.isNode = identity.isNode;
    exports2.isPair = identity.isPair;
    exports2.isScalar = identity.isScalar;
    exports2.isSeq = identity.isSeq;
    exports2.Pair = Pair.Pair;
    exports2.Scalar = Scalar.Scalar;
    exports2.YAMLMap = YAMLMap.YAMLMap;
    exports2.YAMLSeq = YAMLSeq.YAMLSeq;
    exports2.CST = cst;
    exports2.Lexer = lexer.Lexer;
    exports2.LineCounter = lineCounter.LineCounter;
    exports2.Parser = parser.Parser;
    exports2.parse = publicApi.parse;
    exports2.parseAllDocuments = publicApi.parseAllDocuments;
    exports2.parseDocument = publicApi.parseDocument;
    exports2.stringify = publicApi.stringify;
    exports2.visit = visit.visit;
    exports2.visitAsync = visit.visitAsync;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/util.js
var require_util2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/util.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.scanDirForPlatformFile = exports2.loadPlatformSpecificValues = exports2.filterParametersBySchema = exports2.extractFieldsFromSchema = exports2.parseValuesObjectFromString = void 0;
    var fs_1 = require("fs");
    var path2 = __importStar2(require("path"));
    var toml = __importStar2(require_toml());
    var yaml = __importStar2(require_dist());
    function parseValuesObjectFromString(values) {
      const result = {};
      const valuesList = values.split(",");
      valuesList.forEach((v) => {
        const [paramPath, value] = v.split("=");
        const pathParts = paramPath.split("/");
        let tempObject = result;
        pathParts.forEach((part, index) => {
          if (index === pathParts.length - 1) {
            tempObject[part] = value;
          } else {
            if (!tempObject[part])
              tempObject[part] = {};
            tempObject = tempObject[part];
          }
        });
      });
      return result;
    }
    __name(parseValuesObjectFromString, "parseValuesObjectFromString");
    exports2.parseValuesObjectFromString = parseValuesObjectFromString;
    function extractFieldsFromSchema(schema) {
      const fields = /* @__PURE__ */ new Set();
      if (schema.properties) {
        for (const key of Object.keys(schema.properties)) {
          fields.add(key);
        }
      }
      return fields;
    }
    __name(extractFieldsFromSchema, "extractFieldsFromSchema");
    exports2.extractFieldsFromSchema = extractFieldsFromSchema;
    function filterParametersBySchema(fields, parameters) {
      const filtered = {};
      for (const field of fields) {
        if (parameters.hasOwnProperty(field)) {
          filtered[field] = parameters[field];
        }
      }
      return filtered;
    }
    __name(filterParametersBySchema, "filterParametersBySchema");
    exports2.filterParametersBySchema = filterParametersBySchema;
    function loadPlatformSpecificValues() {
      const cliValues = parseValuesObjectFromString(process.env.WING_VALUES ?? "");
      if (process.env.WING_VALUES_FILE === void 0 || process.env.WING_VALUES_FILE === "") {
        return cliValues;
      }
      const file = path2.isAbsolute(process.env.WING_VALUES_FILE) ? process.env.WING_VALUES_FILE : path2.join(process.cwd(), process.env.WING_VALUES_FILE);
      if (!(0, fs_1.existsSync)(file)) {
        return cliValues;
      }
      const data = (0, fs_1.readFileSync)(file, "utf-8");
      const fileExtension = path2.extname(file);
      const fileValues = (() => {
        switch (fileExtension) {
          case ".yaml":
          case ".yml":
            return yaml.parse(data);
          case ".json":
            return JSON.parse(data);
          case ".toml":
            return toml.parse(data);
          default:
            throw new Error(`Unsupported file extension: ${fileExtension} (expected .yml, .json, or .toml)`);
        }
      })();
      return { ...fileValues, ...cliValues };
    }
    __name(loadPlatformSpecificValues, "loadPlatformSpecificValues");
    exports2.loadPlatformSpecificValues = loadPlatformSpecificValues;
    function scanDirForPlatformFile(dir) {
      const result = [];
      if (!(0, fs_1.existsSync)(dir)) {
        return result;
      }
      const files = (0, fs_1.readdirSync)(dir);
      for (const file of files) {
        if (file === "wplatform.js" || file.endsWith(".wplatform.js")) {
          result.push(path2.join(dir, file));
        }
      }
      return result;
    }
    __name(scanDirForPlatformFile, "scanDirForPlatformFile");
    exports2.scanDirForPlatformFile = scanDirForPlatformFile;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/array.js
var require_array = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/array.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MutArray = exports2.Array = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var core_1 = require_core3();
    var Array2 = class {
      static {
        __name(this, "Array");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * The length of the array
       * @returns the length of the array
       */
      get length() {
        throw new Error("Abstract");
      }
      /**
       * Get the value at the given index
       * @macro ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })($self$, $args$)
       * @param index index of the value to get
       * @returns the value at the given index
       */
      at(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Get the value at the given index, returning nil if the index is out of bounds.
       *
       * @macro $self$.at($args$)
       *
       * @param index index of the value to get
       * @returns the value at the given index, or undefined if the index is out of bounds
       */
      tryAt(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Merge arr to the end of this array
       * @param arr array to merge
       *
       * @returns a new ImmutableArray with the values of this array followed by the values of arr
       */
      concat(arr) {
        arr;
        throw new Error("Abstract");
      }
      /**
       * Checks if this array includes searchElement.
       *
       * @macro $self$.includes($args$)
       *
       * @param searchElement to search for.
       * @returns true if this array includes searchElement.
       */
      contains(searchElement) {
        searchElement;
        throw new Error("Macro");
      }
      /**
       * Create a mutable shallow copy of this array
       *
       * @macro [...($self$)]
       *
       * @returns a MutableArray with the same values as this array
       */
      copyMut() {
        throw new Error("Macro");
      }
      /**
       * Returns the index of the first occurrence of searchElement found.
       *
       * @macro $self$.indexOf($args$)
       *
       * @param searchElement to search for.
       * @returns the index of the first occurrence of searchElement found, or -1 if not found.
       */
      indexOf(searchElement) {
        searchElement;
        throw new Error("Macro");
      }
      /**
       * Returns a new string containing the concatenated values in this array,
       * separated by commas or a specified separator string. If the array has only
       * one item, then that item will be returned without using the separator.
       *
       * @returns a string containing the concatenated values in this array,
       * separated by commas or a specified separator string.
       */
      join(separator) {
        separator;
        throw new Error("Abstract");
      }
      /**
       * Returns the index of the last occurrence of searchElement found.
       *
       * @macro $self$.lastIndexOf($args$)
       *
       * @param searchElement to search for.
       * @returns the index of the last occurrence of searchElement found, or -1 if not found.
       */
      lastIndexOf(searchElement) {
        searchElement;
        throw new Error("Macro");
      }
      /**
       * Returns a shallow copy of a portion of the array.
       *
       * @macro $self$.slice($args$)
       *
       * @param start the beginning index of the slice, inclusive.
       * @param end the ending index of the slice, exclusive.
       * @returns a new array containing the sliced elements.
       */
      slice(start, end) {
        start;
        end;
        throw new Error("Macro");
      }
    };
    exports2.Array = Array2;
    _a = JSII_RTTI_SYMBOL_1;
    Array2[_a] = { fqn: "@winglang/sdk.std.Array", version: "0.0.0" };
    var MutArray = class {
      static {
        __name(this, "MutArray");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * The length of the array
       * @returns the length of the array
       */
      get length() {
        throw new Error("Abstract");
      }
      /**
       * Get the value at the given index
       * @macro ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })($self$, $args$)
       * @param index index of the value to get
       * @returns the value at the given index
       */
      at(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Merge arr to the end of this array
       * @param arr array to merge
       *
       * @returns a new MutableArray with the values of this array followed by the values of arr
       */
      concat(arr) {
        arr;
        throw new Error("Abstract");
      }
      /**
       * Checks if this array includes searchElement.
       *
       * @macro $self$.includes($args$)
       *
       * @param searchElement to search for.
       * @returns true if this array includes searchElement.
       */
      contains(searchElement) {
        searchElement;
        throw new Error("Macro");
      }
      /**
       * Create an immutable shallow copy of this array
       *
       * @macro [...($self$)]
       *
       * @returns an ImmutableArray with the same values as this array
       */
      copy() {
        throw new Error("Macro");
      }
      /**
       * Returns the index of the first occurrence of searchElement found.
       *
       * @macro $self$.indexOf($args$)
       *
       * @param searchElement to search for.
       * @returns the index of the first occurrence of searchElement found, or -1 if not found.
       */
      indexOf(searchElement) {
        searchElement;
        throw new Error("Macro");
      }
      /**
       * Returns a new string containing the concatenated values in this array,
       * separated by commas or a specified separator string. If the array has only
       * one item, then that item will be returned without using the separator.
       *
       * @returns a string containing the concatenated values in this array,
       * separated by commas or a specified separator string.
       */
      join(separator) {
        separator;
        throw new Error("Abstract");
      }
      /**
       * Returns the index of the last occurrence of searchElement found.
       *
       * @macro $self$.lastIndexOf($args$)
       *
       * @param searchElement to search for.
       * @returns the index of the last occurrence of searchElement found, or -1 if not found.
       */
      lastIndexOf(searchElement) {
        searchElement;
        throw new Error("Macro");
      }
      /**
       * Add values to end of array
       *
       * @macro $self$.push($args$)
       *
       * @param values values to add
       */
      push(...values) {
        values;
        throw new Error("Macro");
      }
      /**
       * Remove value from end of array
       * @returns the value removed
       */
      pop() {
        throw new Error("Abstract");
      }
      /**
       * Removes value from the given index of an array
       *
       * @macro ((obj, args) => { if (args[0] < 0 || args[0] >= $self$.length) throw new Error("Index out of bounds"); return obj.splice(args[0], 1)[0]; })($self$, [$args$])
       *
       * @param index the index to remove the value at
       * @returns the value removed
       * @throws index out of bounds error if the given index does not exist for the array
       */
      popAt(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Sets a new value at the given index of an array
       *
       * @macro ((obj, args) => { if (args[0] < 0 || args[0] >= $self$.length) throw new Error("Index out of bounds"); obj[args[0]] = args[1]; })($self$, [$args$])
       *
       * @param index the index to set the value at
       * @param value the value to set at the given index
       * @throws index out of bounds error if the given index does not exist for the array
       */
      set(index, value) {
        index;
        value;
        throw new Error("Macro");
      }
      /**
       * Inserts a new value at the given index of an array
       *
       * @macro ((obj, args) => { if (args[0] < 0 || args[0] > $self$.length) throw new Error("Index out of bounds"); obj.splice(args[0], 0, args[1]); })($self$, [$args$])
       *
       * @param index the index to insert the value at
       * @param value the value to insert at the given index
       * @throws index out of bounds error if the given index isn't valid
       */
      insert(index, value) {
        index;
        value;
        throw new Error("Macro");
      }
      /**
       * Removes first occurrence of a given value in an array
       *
       * @macro ((obj, args) => { if (obj.indexOf(args[0]) !== -1) { obj.splice(obj.indexOf(args[0]), 1); return true; } return false; })($self$, [$args$])
       *
       * @param value the value to remove
       * @returns true if value was removed
       */
      removeFirst(value) {
        value;
        throw new Error("Macro");
      }
      /**
       * Returns a shallow copy of a portion of the array.
       *
       * @macro $self$.slice($args$)
       *
       * @param start the beginning index of the slice, inclusive.
       * @param end the ending index of the slice, exclusive.
       * @returns a new array containing the sliced elements.
       */
      slice(start, end) {
        start;
        end;
        throw new Error("Macro");
      }
    };
    exports2.MutArray = MutArray;
    _b = JSII_RTTI_SYMBOL_1;
    MutArray[_b] = { fqn: "@winglang/sdk.std.MutArray", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js
var require_json_schema = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json_schema.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.JsonSchema = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var ajv_1 = __importDefault(require_ajv());
    var core_1 = require_core3();
    var util_1 = require_util2();
    var JsonSchema = class _JsonSchema {
      static {
        __name(this, "JsonSchema");
      }
      /**
       * @internal
       */
      static _toInflightType(schema) {
        return core_1.InflightClient.forType(__filename, `${this.name}._createJsonSchema(${JSON.stringify(schema)})`);
      }
      /**
       * Static method for creating a StructSchema used for lifting a struct to an inflight type
       *
       * @internal
       */
      static _createJsonSchema(schema) {
        return new _JsonSchema(schema);
      }
      constructor(schema) {
        this._rawSchema = schema;
        this.validator = new ajv_1.default({ allErrors: true, allowUnionTypes: true });
      }
      /**
       * Attempt to validate a json object against the schema
       *
       * @param obj the Json object to validate
       * @throws an error if the json object is not valid
       */
      validate(obj, options) {
        if (options?.unsafe) {
          return;
        }
        const validator = this.validator.compile(this._rawSchema);
        const valid = validator(obj);
        if (!valid) {
          const schemaId = this._rawSchema.$id.replace("/", "");
          throw new Error(`unable to parse ${schemaId}:
- ${validator.errors?.map((error) => schemaId + error.instancePath + " " + error.message).join("\n- ")}`);
        }
      }
      /**
       * Retrieve the json schema as a string
       *
       * @returns the schema as a string
       */
      asStr() {
        return JSON.stringify(this._rawSchema);
      }
      /** @internal */
      _fromJson(obj, validateOptions) {
        this.validate(obj, validateOptions);
        const fields = (0, util_1.extractFieldsFromSchema)(this._rawSchema);
        const filteredParameters = (0, util_1.filterParametersBySchema)(fields, obj);
        return filteredParameters;
      }
      /** @internal */
      _tryFromJson(obj) {
        try {
          return this._fromJson(obj);
        } catch {
          return void 0;
        }
      }
      /** @internal */
      _tryParseJson(json) {
        try {
          return this._fromJson(JSON.parse(json));
        } catch {
          return void 0;
        }
      }
      /** @internal */
      _toInflightType() {
        return _JsonSchema._toInflightType(this._rawSchema);
      }
    };
    exports2.JsonSchema = JsonSchema;
    _a = JSII_RTTI_SYMBOL_1;
    JsonSchema[_a] = { fqn: "@winglang/sdk.std.JsonSchema", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/bool.js
var require_bool3 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/bool.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Boolean = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var json_schema_1 = require_json_schema();
    var core_1 = require_core3();
    var Boolean2 = class {
      static {
        __name(this, "Boolean");
      }
      /**
       * Parse a boolean from Json.
       *
       * @param json to parse boolean from.
       * @returns a boolean.
       */
      static fromJson(json, options) {
        const schema = json_schema_1.JsonSchema._createJsonSchema({
          $id: "bool",
          type: "boolean"
        });
        schema.validate(json, options);
        return json;
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
    };
    exports2.Boolean = Boolean2;
    _a = JSII_RTTI_SYMBOL_1;
    Boolean2[_a] = { fqn: "@winglang/sdk.std.Boolean", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/tokens.js
var require_tokens = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/tokens.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getTokenResolver = exports2.registerTokenResolver = exports2.tokenEnvName = void 0;
    var _resolvers = [];
    function tokenEnvName(value) {
      return `WING_TOKEN_${value.replace(/([^a-zA-Z0-9]+)/g, "_").replace(/_+$/, "").replace(/^_+/, "").toUpperCase()}`;
    }
    __name(tokenEnvName, "tokenEnvName");
    exports2.tokenEnvName = tokenEnvName;
    function registerTokenResolver(resolver) {
      _resolvers.push(resolver);
    }
    __name(registerTokenResolver, "registerTokenResolver");
    exports2.registerTokenResolver = registerTokenResolver;
    function getTokenResolver(value) {
      return _resolvers.find((r) => r.isToken(value));
    }
    __name(getTokenResolver, "getTokenResolver");
    exports2.getTokenResolver = getTokenResolver;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/lifting.js
var require_lifting = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/lifting.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Lifting = exports2.collectLifts = exports2.mergeLiftDeps = exports2.liftObject = exports2.toLiftableModuleType = exports2.INFLIGHT_INIT_METHOD_NAME = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constructs_1 = require_lib();
    var errors_1 = require_errors();
    var tokens_1 = require_tokens();
    exports2.INFLIGHT_INIT_METHOD_NAME = "$inflight_init";
    var INFLIGHT_CLOSURE_HANDLE_METHOD = "handle";
    var INFLIGHT_CLOSURE_TYPE_PREFIX = "$Closure";
    function toLiftableModuleType(type, moduleSpec, path2) {
      if (typeof type?._toInflightType === "function" || type?.constructor?.name === "Object") {
        return type;
      } else {
        return {
          _toInflightType: () => `require("${moduleSpec}").${path2}`
        };
      }
    }
    __name(toLiftableModuleType, "toLiftableModuleType");
    exports2.toLiftableModuleType = toLiftableModuleType;
    function liftObject(obj) {
      if (obj == null) {
        return JSON.stringify(obj);
      }
      const tokenResolver = (0, tokens_1.getTokenResolver)(obj);
      if (tokenResolver) {
        return tokenResolver.lift(obj);
      }
      if (typeof obj?._toInflightType === "function") {
        return obj._toInflightType();
      }
      switch (typeof obj) {
        case "string":
        case "boolean":
        case "number":
          return JSON.stringify(obj);
        case "object":
          if (Array.isArray(obj)) {
            return `[${obj.map((o) => liftObject(o)).join(",")}]`;
          }
          if (obj instanceof Set) {
            return `new Set(${liftObject(Array.from(obj))})`;
          }
          if (obj instanceof Map) {
            return `new Map(${liftObject(Array.from(obj))})`;
          }
          if (typeof obj._toInflight === "function") {
            return obj._toInflight();
          }
          if (obj.constructor.name === "Object") {
            const lines = [];
            lines.push("{");
            for (const [k, v] of Object.entries(obj)) {
              lines.push(`"${k.replace(/"/g, '\\"')}": ${liftObject(v)},`);
            }
            lines.push("}");
            return lines.join("");
          }
          break;
      }
      throw new Error(`Unable to lift object of type ${obj?.constructor?.name}`);
    }
    __name(liftObject, "liftObject");
    exports2.liftObject = liftObject;
    function mergeLiftDeps(matrix1 = {}, matrix2 = {}) {
      const result = {};
      for (const [op, deps] of Object.entries(matrix1)) {
        result[op] = /* @__PURE__ */ new Map();
        for (const [obj, objDeps] of deps) {
          result[op].set(obj, new Set(objDeps));
        }
      }
      for (const [op, deps] of Object.entries(matrix2)) {
        const resultDeps = result[op] ?? /* @__PURE__ */ new Map();
        for (const [obj, objDeps] of deps) {
          const resultObjDeps = resultDeps.get(obj) ?? /* @__PURE__ */ new Set();
          for (const dep of objDeps) {
            resultObjDeps.add(dep);
          }
          resultDeps.set(obj, resultObjDeps);
        }
        result[op] = resultDeps;
      }
      return result;
    }
    __name(mergeLiftDeps, "mergeLiftDeps");
    exports2.mergeLiftDeps = mergeLiftDeps;
    function parseMatrix(data) {
      const result = {};
      for (const [op, pairs] of Object.entries(data)) {
        result[op] = /* @__PURE__ */ new Map();
        for (const [obj, objDeps] of pairs) {
          if (!result[op].has(obj)) {
            result[op].set(obj, /* @__PURE__ */ new Set());
          }
          const depSet = result[op].get(obj);
          for (const dep of objDeps) {
            depSet.add(dep);
          }
        }
      }
      return result;
    }
    __name(parseMatrix, "parseMatrix");
    function collectLifts(initialObj, initialOps) {
      if (initialOps.includes(exports2.INFLIGHT_INIT_METHOD_NAME)) {
        throw new Error(`The operation ${exports2.INFLIGHT_INIT_METHOD_NAME} is implicit and should not be requested explicitly.`);
      }
      const explored = /* @__PURE__ */ new Map();
      const queue = new Array([initialObj, [...initialOps]]);
      const matrixCache = /* @__PURE__ */ new Map();
      while (queue.length > 0) {
        let [obj, ops] = queue.shift();
        let newObj = false;
        if (!explored.has(obj)) {
          explored.set(obj, /* @__PURE__ */ new Set());
          newObj = true;
        }
        let existingOps = explored.get(obj);
        ops = ops.filter((op) => !existingOps.has(op));
        if (ops.length === 0 && !newObj) {
          continue;
        }
        for (const op of ops) {
          existingOps.add(op);
        }
        let matrix;
        if (matrixCache.has(obj)) {
          matrix = matrixCache.get(obj);
        } else if (typeof obj === "object" && obj._liftMap !== void 0) {
          matrix = parseMatrix(obj._liftMap ?? {});
          matrixCache.set(obj, matrix);
        } else if (typeof obj === "function" && typeof obj._liftTypeMap !== void 0) {
          matrix = parseMatrix(obj._liftTypeMap ?? {});
          matrixCache.set(obj, matrix);
        } else {
          let items_to_explore = [];
          if (Array.isArray(obj)) {
            items_to_explore = obj;
          } else if (obj instanceof Set) {
            items_to_explore = obj;
          } else if (obj instanceof Map) {
            items_to_explore = obj.values();
          } else if (typeof obj === "object" && obj.constructor.name === "Object") {
            items_to_explore = Object.values(obj);
          }
          for (const item of items_to_explore) {
            if (!explored.has(item)) {
              let item_ops = [];
              if (isInflightClosureObject(item)) {
                item_ops.push(INFLIGHT_CLOSURE_HANDLE_METHOD);
              }
              queue.push([item, item_ops]);
            }
          }
          continue;
        }
        for (const op of [...ops, exports2.INFLIGHT_INIT_METHOD_NAME]) {
          const objDeps = matrix[op];
          if (op === exports2.INFLIGHT_INIT_METHOD_NAME && !objDeps) {
            continue;
          }
          if (!objDeps) {
            if (constructs_1.Construct.isConstruct(obj)) {
              throw new errors_1.NotImplementedError(`Resource ${obj.node.path} does not support inflight operation ${op}.
It might not be implemented yet.`, { resource: obj.constructor.name, operation: op });
            } else {
              throw new Error(`Unknown operation ${op} requested for object ${obj} (${obj.constructor.name})`);
            }
          }
          for (const [depObj, depOps] of objDeps.entries()) {
            if (depOps.has(exports2.INFLIGHT_INIT_METHOD_NAME)) {
              throw new Error(`The operation ${exports2.INFLIGHT_INIT_METHOD_NAME} is implicit and should not be requested explicitly.`);
            }
            queue.push([depObj, [...depOps]]);
          }
        }
      }
      return explored;
    }
    __name(collectLifts, "collectLifts");
    exports2.collectLifts = collectLifts;
    function isInflightClosureObject(item) {
      return typeof item === "object" && typeof item.constructor === "function" && typeof item.constructor.name === "string" && item.constructor.name.startsWith(INFLIGHT_CLOSURE_TYPE_PREFIX) && item._liftMap !== void 0 && item._liftMap[INFLIGHT_CLOSURE_HANDLE_METHOD] !== void 0;
    }
    __name(isInflightClosureObject, "isInflightClosureObject");
    var Lifting = class {
      static {
        __name(this, "Lifting");
      }
      /**
       * Perform the full lifting process on an object.
       *
       * Use this instead of calling `onLift` since it will also lift all of the
       * object's dependencies, and it will ensure that the onLift methods of
       * all objects are all called at most once.
       */
      static lift(obj, host, ops) {
        const lifts = collectLifts(obj, ops);
        for (const [liftedObj, liftedOps] of lifts) {
          const tokens = (0, tokens_1.getTokenResolver)(liftedObj);
          if (tokens) {
            tokens.onLiftValue(host, liftedObj);
            continue;
          }
          if (typeof liftedObj === "object" && typeof liftedObj.onLift === "function") {
            liftedObj.onLift(host, [...liftedOps]);
            continue;
          }
          if (typeof liftedObj === "function" && typeof liftedObj.onLiftType === "function") {
            liftedObj.onLiftType(host, [...liftedOps]);
            continue;
          }
        }
      }
    };
    exports2.Lifting = Lifting;
    _a = JSII_RTTI_SYMBOL_1;
    Lifting[_a] = { fqn: "@winglang/sdk.core.Lifting", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/types.js
var require_types2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SECRET_SYMBOL = exports2.INFLIGHT_SYMBOL = exports2.Construct = void 0;
    var constructs_1 = require_lib();
    Object.defineProperty(exports2, "Construct", { enumerable: true, get: function() {
      return constructs_1.Construct;
    } });
    exports2.INFLIGHT_SYMBOL = Symbol("@winglang/sdk.inflight");
    exports2.SECRET_SYMBOL = Symbol("@winglang/sdk.cloud.Secret");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared/misc.js
var require_misc = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared/misc.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPath = exports2.shell = exports2.runCommand = exports2.normalPath = exports2.readJsonSync = void 0;
    var child_process_1 = require("child_process");
    var fs_1 = require("fs");
    var util_1 = require("util");
    var execPromise = (0, util_1.promisify)(child_process_1.exec);
    var execFilePromise = (0, util_1.promisify)(child_process_1.execFile);
    function readJsonSync(file) {
      return JSON.parse((0, fs_1.readFileSync)(file, "utf-8"));
    }
    __name(readJsonSync, "readJsonSync");
    exports2.readJsonSync = readJsonSync;
    function normalPath2(path2) {
      if (process.platform === "win32") {
        return path2.replace(/\\+/g, "/");
      } else {
        return path2;
      }
    }
    __name(normalPath2, "normalPath");
    exports2.normalPath = normalPath2;
    async function runCommand(cmd, args, options) {
      const { stdout } = await execFilePromise(cmd, args, options);
      return stdout;
    }
    __name(runCommand, "runCommand");
    exports2.runCommand = runCommand;
    async function shell(cmd, args, options) {
      const { stdout } = await execPromise(cmd + " " + args.join(" "), options);
      return stdout;
    }
    __name(shell, "shell");
    exports2.shell = shell;
    function isPath(s) {
      s = normalPath2(s);
      return s.startsWith("./") || s.startsWith("../") || s.startsWith("/");
    }
    __name(isPath, "isPath");
    exports2.isPath = isPath;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/inflight.js
var require_inflight = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/inflight.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.importInflight = exports2.inflight = exports2.lift = exports2.InflightClient = exports2.closureId = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var path_1 = require("path");
    var lifting_1 = require_lifting();
    var types_1 = require_types2();
    var misc_1 = require_misc();
    var closureCount = 0;
    function closureId() {
      return closureCount++;
    }
    __name(closureId, "closureId");
    exports2.closureId = closureId;
    var InflightClient = class {
      static {
        __name(this, "InflightClient");
      }
      /**
       * Returns code for creating an inflight client.
       */
      static for(dirname2, filename, clientClass, args) {
        const inflightDir = dirname2;
        const inflightFile = (0, path_1.basename)(filename).split(".")[0] + ".inflight";
        return `new (require("${(0, misc_1.normalPath)(`${inflightDir}/${inflightFile}`)}")).${clientClass}(${args.join(", ")})`;
      }
      /**
       * Returns code for implementing `_toInflightType()`.
       */
      static forType(filename, clientClass) {
        return `require("${(0, misc_1.normalPath)(filename)}").${clientClass}`;
      }
      constructor() {
      }
    };
    exports2.InflightClient = InflightClient;
    _a = JSII_RTTI_SYMBOL_1;
    InflightClient[_a] = { fqn: "@winglang/sdk.core.InflightClient", version: "0.0.0" };
    function lift(captures) {
      return new Lifter().lift(captures);
    }
    __name(lift, "lift");
    exports2.lift = lift;
    function inflight(fn) {
      return new Lifter().inflight(fn);
    }
    __name(inflight, "inflight");
    exports2.inflight = inflight;
    function importInflight(inflightText, lifts) {
      const newLifts = {};
      const newGrants = {};
      for (const liftAnnotation of lifts ?? []) {
        if (liftAnnotation.alias === void 0) {
          throw new Error("The alias field is required for all lifts");
        }
        newLifts[liftAnnotation.alias] = liftAnnotation.obj;
        if (liftAnnotation.ops) {
          newGrants[liftAnnotation.alias] = liftAnnotation.ops;
        }
      }
      return lift(newLifts).grant(newGrants).inflight(inflightText);
    }
    __name(importInflight, "importInflight");
    exports2.importInflight = importInflight;
    var Lifter = class _Lifter {
      static {
        __name(this, "Lifter");
      }
      constructor(lifts = {}, grants = {}) {
        this.lifts = lifts;
        this.grants = grants;
      }
      /**
       * Add additional liftable objects to the scope of the inflight function.
       * Any existing liftable objects with the same name will be overwritten.
       *
       * Conventionally, this is used by passing in a `const` object to bind it with the same name
       *
       * ```ts
       * const bucket = new cloud.Bucket(app, "Bucket");
       * const number = 5;
       *
       * lift({ bucket, number })
       *   .inflight(({ bucket, number }) => { ... }))
       * ```
       *
       * However, the name is not required to match the variable in the current scope.
       *
       * This is especially useful/necessary when lifting data via a reference or some other expression
       *
       * ```ts
       * const bucket = new cloud.Bucket(app, "Bucket");
       *
       * lift({ bkt: bucket, sum: 2 + 2, field: bucket.field })
       *   .inflight(({ bkt, sum, field }) => { ... }))
       * ```
       */
      lift(captures) {
        return new _Lifter({
          ...this.lifts,
          ...captures
        }, this.grants);
      }
      /**
       * Grant permissions for lifted resources.
       *
       * By default, all all possible methods are granted to lifted resources.
       * This function restricts those:
       *
       * ```ts
       * const bucket = new cloud.Bucket(app, "Bucket");
       *
       * lift({ bucket })
       *   .grant({ bucket: ["get"] })
       *   .inflight(({ bucket }) => {
       *     await bucket.get("key");
       *     await bucket.set("key", "value"); // Error: set is not granted
       *   });
       * ```
       *
       * fields are always accessible, even if not granted.
       */
      grant(grants) {
        return new _Lifter(this.lifts, {
          ...this.grants,
          ...grants
        });
      }
      /**
       * Create an inflight function with the available lifted data.
       *
       * This function must not reference any variables outside of its scope.
       * If needed, use `lift` again to bind variables to the scope of the function.
       * Bound variables will be available as properties on the `ctx` object passed as the first argument to the function.
       *
       * Built-in NodeJS globals are available, such as `console` and `process`.
       * @wing inflight
       */
      inflight(fn) {
        const _liftMap = { handle: [] };
        for (const [key, obj] of Object.entries(this.lifts)) {
          const knownOps = this.grants[key] ?? Object.keys(obj._liftMap ?? {}).filter(
            (x) => x !== lifting_1.INFLIGHT_INIT_METHOD_NAME
            // filter "$inflight_init"
          );
          _liftMap.handle.push([obj, knownOps]);
        }
        return {
          _id: closureId(),
          _toInflight: () => {
            const serializedFunction = fn.toString();
            return `(await (async () => {
  const $func = ${serializedFunction}
  const $ctx = {
  ${Object.entries(this.lifts).map(([name, liftable]) => `${name}: ${(0, lifting_1.liftObject)(liftable)}`).join(",\n")}
  };
  let newFunction = async (...args) => {
    return $func($ctx, ...args);
  };
  newFunction.handle = newFunction;
  return newFunction;
}
)())`;
          },
          _liftMap,
          // @ts-expect-error This function's type doesn't actually match, but it will just throw anyways
          [types_1.INFLIGHT_SYMBOL]: () => {
            throw new Error("This is a inflight function and can only be invoked while inflight");
          }
        };
      }
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/datetime.js
var require_datetime = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/datetime.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Datetime = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var inflight_1 = require_inflight();
    var misc_1 = require_misc();
    var Datetime = class _Datetime {
      static {
        __name(this, "Datetime");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return inflight_1.InflightClient.forType(__filename, this.name);
      }
      /**
       * Create a Datetime from UTC timezone
       *
       * @returns a new `Datetime` from current time in UTC timezone
       */
      static utcNow() {
        return new _Datetime();
      }
      /**
       * Create a Datetime from local system timezone
       *
       * @returns a new `Datetime` from current time in system timezone
       */
      static systemNow() {
        const date = /* @__PURE__ */ new Date();
        date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1e3);
        return new _Datetime(date, date.getTimezoneOffset());
      }
      /**
       * Create a Datetime from an ISO-8601 string
       *
       * @returns a new `Datetime` in UTC timezone
       * @param iso ISO-8601 string
       */
      static fromIso(iso) {
        return new _Datetime(new Date(iso));
      }
      /**
       * Create a Datetime from a JavaScript Date object.
       *
       * @param date The JavaScript Date object.
       * @returns a new `Datetime` instance.
       */
      static fromDate(date) {
        return this.fromIso(date.toISOString());
      }
      /**
       * Create a Datetime from Datetime components
       *
       * @param c DatetimeComponents
       * @returns a new `Datetime`
       */
      static fromComponents(c) {
        const date = new Date(Date.UTC(c.year, c.month, c.day, c.hour, c.min, c.sec, c.ms));
        return new _Datetime(date, c.tz);
      }
      constructor(date = /* @__PURE__ */ new Date(), timezoneOffset = 0) {
        this._timezoneOffset = 0;
        this._date = date;
        this._timezoneOffset = timezoneOffset;
      }
      /** @internal */
      _toInflight() {
        return `(require("${(0, misc_1.normalPath)(__filename)}").Datetime.fromIso("${this.toIso()}"))`;
      }
      /**
       * Return a timestamp of non-leap year seconds since epoch
       *
       * @returns a number representing the current timestamp in seconds
       */
      get timestamp() {
        return this.timestampMs / 1e3;
      }
      /**
       * Return a timestamp of non-leap year milliseconds since epoch
       *
       * @returns a number representing the current timestamp in milliseconds
       */
      get timestampMs() {
        return this._date.valueOf() + this._timezoneOffset * 60 * 1e3;
      }
      /**
       * Returns the hour of the local machine time or in utc
       *
       * @returns a number representing the datetime's hour
       */
      get hours() {
        return this._date.getUTCHours();
      }
      /**
       * Returns the minute of the local machine time or in utc
       *
       * @returns a number representing the datetime's minute
       */
      get min() {
        return this._date.getUTCMinutes();
      }
      /**
       * Returns the seconds of the local machine time or in utc
       *
       * @returns a number representing the datetime's seconds
       */
      get sec() {
        return this._date.getUTCSeconds();
      }
      /**
       * Returns the milliseconds of the local machine time or in utc
       *  *
       * @returns a number representing the datetime's milliseconds
       */
      get ms() {
        return this._date.getUTCMilliseconds();
      }
      /**
       * Returns the day of month in the local machine time or in utc (1 - 31)
       *
       * @returns a number representing the datetime's day of month
       */
      get dayOfMonth() {
        return this._date.getUTCDate();
      }
      /**
       * Returns the day in month of the local machine time or in utc (0 - 6)
       *
       * @returns a number representing the datetime's day of week
       */
      get dayOfWeek() {
        return this._date.getUTCDay();
      }
      /**
       * Returns the month of the local machine time or in utc (0 - 11)
       *
       * @returns a number representing the datetime's month
       */
      get month() {
        return this._date.getUTCMonth();
      }
      /**
       * Returns the year of the local machine time or in utc
       *
       * @returns a number representing the datetime's year
       */
      get year() {
        return this._date.getUTCFullYear();
      }
      /**
       * Returns the offset in minutes from UTC
       *
       * @returns a number representing the datetime's offset in minutes from UTC
       */
      get timezone() {
        return this._timezoneOffset;
      }
      /**
       * Returns a Datetime represents the same date in utc
       *
       * @returns a datetime representing the datetime's date in UTC
       */
      toUtc() {
        return new _Datetime(new Date(this.timestampMs));
      }
      /**
       * Returns ISO-8601 string
       *
       * @returns a ISO-8601 string representation of the datetime
       */
      toIso() {
        return new Date(this.timestampMs).toISOString();
      }
    };
    exports2.Datetime = Datetime;
    _a = JSII_RTTI_SYMBOL_1;
    Datetime[_a] = { fqn: "@winglang/sdk.std.Datetime", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/duration.js
var require_duration = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/duration.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Duration = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var core_1 = require_core3();
    var misc_1 = require_misc();
    var Duration = class _Duration {
      static {
        __name(this, "Duration");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      /**
       * Create a Duration representing an amount of years
       *
       * @param amount the amount of Years the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Years.
       */
      static fromYears(amount) {
        return new _Duration(amount * 60 * 60 * 24 * 365);
      }
      /**
       * Create a Duration representing an amount of months
       *
       * @param amount the amount of Months the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Months.
       */
      static fromMonths(amount) {
        return new _Duration(amount * 60 * 60 * 24 * 365 / 12);
      }
      /**
       * Create a Duration representing an amount of days
       *
       * @param amount the amount of Days the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Days.
       */
      static fromDays(amount) {
        return new _Duration(amount * 60 * 60 * 24);
      }
      /**
       * Create a Duration representing an amount of hours
       *
       * @param amount the amount of Hours the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Hours.
       */
      static fromHours(amount) {
        return new _Duration(amount * 60 * 60);
      }
      /**
       * Create a Duration representing an amount of minutes
       *
       * @param amount the amount of Minutes the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Minutes.
       */
      static fromMinutes(amount) {
        return new _Duration(amount * 60);
      }
      /**
       * Create a Duration representing an amount of seconds
       *
       * @param amount the amount of Seconds the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Seconds.
       */
      static fromSeconds(amount) {
        return new _Duration(amount);
      }
      /**
       * Create a Duration representing an amount of milliseconds
       *
       * @param amount the amount of Milliseconds the `Duration` will represent.
       * @returns a new `Duration` representing `amount` Milliseconds.
       */
      static fromMilliseconds(amount) {
        return new _Duration(amount / 1e3);
      }
      constructor(seconds) {
        this.seconds = seconds;
      }
      /**
       * Return the total number of milliseconds in this Duration
       *
       * @returns the value of this `Duration` expressed in Milliseconds.
       */
      get milliseconds() {
        return this.seconds * 1e3;
      }
      /**
       * Return the total number of minutes in this Duration
       *
       * @returns the value of this `Duration` expressed in Minutes.
       */
      get minutes() {
        return this.seconds / 60;
      }
      /**
       * Return the total number of hours in this Duration
       *
       * @returns the value of this `Duration` expressed in Hours.
       */
      get hours() {
        return this.minutes / 60;
      }
      /**
       * Return the total number of days in this Duration
       *
       * @returns the value of this `Duration` expressed in Days.
       */
      get days() {
        return this.hours / 24;
      }
      /**
       * Return the total number of months in this Duration
       *
       * @returns the value of this `Duration` expressed in Months.
       */
      get months() {
        return this.years * 12;
      }
      /**
       * Return the total number of years in this Duration
       *
       * @returns the value of this `Duration` expressed in Years.
       */
      get years() {
        return this.days / 365;
      }
      /** @internal */
      _toInflight() {
        return `(new (require("${(0, misc_1.normalPath)(__filename)}").Duration)(${this.seconds}))`;
      }
    };
    exports2.Duration = Duration;
    _a = JSII_RTTI_SYMBOL_1;
    Duration[_a] = { fqn: "@winglang/sdk.std.Duration", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/generics.js
var require_generics = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/generics.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.T1 = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var T1 = class {
      static {
        __name(this, "T1");
      }
    };
    exports2.T1 = T1;
    _a = JSII_RTTI_SYMBOL_1;
    T1[_a] = { fqn: "@winglang/sdk.std.T1", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/map.js
var require_map2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/map.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MutMap = exports2.Map = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var core_1 = require_core3();
    var Map2 = class {
      static {
        __name(this, "Map");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * Returns the number of elements in the map.
       *
       * TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658
       * @macro Object.keys($self$).length
       *
       * @returns The number of elements in map
       */
      size() {
        throw new Error("Macro");
      }
      /**
       * Returns a specified element from the map.
       *
       * If the value that is associated to the provided key is an object, then you will get a reference
       * to that object and any change made to that object will effectively modify it inside the map.
       *
       * @macro ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })($self$, $args$)
       *
       * @param key The key of the element to return.
       * @returns The element associated with the specified key, or throw an error if the key can't be found
       */
      get(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Optionally returns a specified element from the map.
       *
       * @macro ($self$)[$args$]
       *
       * @param key The key of the element to return.
       * @returns The element associated with the specified key, or undefined if the key can't be found
       */
      tryGet(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Returns a boolean indicating whether an element with the specified key exists or not.
       *
       * @macro ($args$ in ($self$))
       *
       * @param key The key of the element to test for presence
       * @returns true if an element with the specified key exists in the map; otherwise false.
       */
      has(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Create a mutable shallow copy of this map
       *
       * @macro {...($self$)}
       *
       * @returns a MutableMap with the same values as this map
       */
      copyMut() {
        throw new Error("Macro");
      }
      /**
       * Returns the keys of this map
       *
       * @macro Object.keys($self$)
       *
       * @returns an array containing the keys of this map
       */
      keys() {
        throw new Error("Macro");
      }
      /**
       * Returns the values of this map
       *
       * @macro Object.values($self$)
       *
       * @returns an array of type T containing the values of this map
       */
      values() {
        throw new Error("Macro");
      }
      /**
       * Returns the entries from the map.
       *
       * @macro Object.entries($self$).map(([key, value]) => ({ key, value }))
       *
       * @returns the entries as Array<ArrayEntry>
       */
      entries() {
        throw new Error("Macro");
      }
    };
    exports2.Map = Map2;
    _a = JSII_RTTI_SYMBOL_1;
    Map2[_a] = { fqn: "@winglang/sdk.std.Map", version: "0.0.0" };
    var MutMap = class {
      static {
        __name(this, "MutMap");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * Returns the number of elements in the map.
       *
       * TODO: For now this has to be a method rather than a getter as macros only work on methods https://github.com/winglang/wing/issues/1658
       * @macro Object.keys($self$).length
       *
       * @returns The number of elements in map
       */
      size() {
        throw new Error("Macro");
      }
      /**
       * Removes all elements
       *
       * @macro ((map) => { for(const k in map){delete map[k]}; })($self$)
       */
      clear() {
        throw new Error("Macro");
      }
      /**
       * Create an immutable shallow copy of this map
       *
       * @macro ({...($self$)})
       *
       * @returns an ImmutableMap with the same values as this map
       */
      copy() {
        throw new Error("Macro");
      }
      /**
       * Removes the specified element from a map.
       *
       * @macro (delete ($self$)[$args$])
       *
       * @param key The key
       * @returns true if the given key is no longer present
       */
      delete(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Returns a specified element from the map.
       *
       * If the value that is associated to the provided key is an object, then you will get a reference
       * to that object and any change made to that object will effectively modify it inside the map.
       *
       * @macro ((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })($self$, $args$)
       *
       * @param key The key of the element to return.
       * @returns The element associated with the specified key, or throw an error if the key can't be found
       */
      get(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Optionally returns a specified element from the map.
       *
       * @macro ($self$)[$args$]
       *
       * @param key The key of the element to return.
       * @returns The element associated with the specified key, or undefined if the key can't be found
       */
      tryGet(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Returns a boolean indicating whether an element with the specified key exists or not.
       *
       * @macro ($args$ in ($self$))
       *
       * @param key The key of the element to test for presence
       * @returns true if an element with the specified key exists in the map; otherwise false.
       */
      has(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Adds or updates an entry in a Map object with a specified key and a value.
       *
       * TODO: revisit this macro after we support indexed args https://github.com/winglang/wing/issues/1659
       * @macro ((obj, args) => { obj[args[0]] = args[1]; })($self$, [$args$])
       *
       * @param key The key of the element to add
       * @param value The value of the element to add
       */
      set(key, value) {
        key;
        value;
        throw new Error("Macro");
      }
      /**
       * Returns the keys of this map
       *
       * @macro Object.keys($self$)
       *
       * @returns an array containing the keys of this map
       */
      keys() {
        throw new Error("Macro");
      }
      /**
       * Returns the values of this map
       *
       * @macro Object.values($self$)
       *
       * @returns an array containing of type T the values of this map
       */
      values() {
        throw new Error("Macro");
      }
      /**
       * Returns the entries from the map.
       *
       * @macro Object.entries($self$).map(([key, value]) => ({ key, value }))
       *
       * @returns the entries as Array<ArrayEntry>
       */
      entries() {
        throw new Error("Macro");
      }
    };
    exports2.MutMap = MutMap;
    _b = JSII_RTTI_SYMBOL_1;
    MutMap[_b] = { fqn: "@winglang/sdk.std.MutMap", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/connections.js
var require_connections = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/connections.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Connections = exports2.CONNECTIONS_FILE_PATH = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var fs = __importStar2(require("fs"));
    var path2 = __importStar2(require("path"));
    var CONNECTIONS_SYMBOL = Symbol.for("@winglang/sdk.core.Connections");
    exports2.CONNECTIONS_FILE_PATH = "connections.json";
    var Connections = class _Connections {
      static {
        __name(this, "Connections");
      }
      /**
       * Return the matching Connections of the given construct tree.
       */
      static of(construct2) {
        let connections = construct2.node.root[CONNECTIONS_SYMBOL];
        if (!connections) {
          connections = new _Connections();
          construct2.node.root[CONNECTIONS_SYMBOL] = connections;
        }
        return connections;
      }
      constructor() {
        this._connections = [];
      }
      /**
       * Adds a connection between two constructs. A connection is a piece of
       * metadata describing how one construct is related to another construct.
       */
      add(props) {
        const connection = props;
        if (this._connections.some((c) => c.source === connection.source && c.sourceOp === connection.sourceOp && c.target === connection.target && c.targetOp === connection.targetOp && c.name === connection.name)) {
          return;
        }
        this._connections.push(connection);
      }
      /**
       * Synthesize `connections.json` to the given directory.
       */
      synth(outdir) {
        const connections = this._connections.map((c) => ({
          source: c.source.node.path,
          sourceOp: c.sourceOp,
          target: c.target.node.path,
          targetOp: c.targetOp,
          name: c.name
        }));
        const tree = {
          version: "connections-0.1",
          connections
        };
        fs.writeFileSync(path2.join(outdir, exports2.CONNECTIONS_FILE_PATH), JSON.stringify(tree, void 0, 2), { encoding: "utf8" });
      }
    };
    exports2.Connections = Connections;
    _a = JSII_RTTI_SYMBOL_1;
    Connections[_a] = { fqn: "@winglang/sdk.core.Connections", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/node.js
var require_node = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/node.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Node = exports2.SDK_SOURCE_MODULE = exports2.CONNECTIONS_FILE_PATH = exports2.APP_SYMBOL = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constructs_1 = require_lib();
    var connections_1 = require_connections();
    var NODE_SYMBOL = Symbol.for("@winglang/sdk.std.Node");
    exports2.APP_SYMBOL = Symbol.for("@winglang/sdk.std.Node/app");
    var ROOT_SYMBOL = Symbol.for("@winglang/sdk.std.Node/root");
    exports2.CONNECTIONS_FILE_PATH = "connections.json";
    exports2.SDK_SOURCE_MODULE = "@winglang/sdk";
    var Node2 = class _Node {
      static {
        __name(this, "Node");
      }
      /**
       * Marks a type as the root of the tree.
       * @param rootConstructor
       * @internal
       */
      static _markRoot(rootConstructor) {
        rootConstructor[ROOT_SYMBOL] = true;
      }
      /**
       * Return the internal construct node.
       */
      static of(construct2) {
        let node = construct2[NODE_SYMBOL];
        if (!node) {
          node = new _Node(construct2);
          construct2[NODE_SYMBOL] = node;
        }
        return node;
      }
      constructor(construct2) {
        this.construct = construct2;
        this._constructsNode = construct2.node;
        this._connections = connections_1.Connections.of(construct2);
      }
      /**
       * Adds a connection between two constructs. A connection is a piece of
       * metadata describing how one construct is related to another construct.
       */
      addConnection(props) {
        this._connections.add({
          source: props.source ?? this.construct,
          ...props
        });
      }
      // ---- constructs 10.x APIs ----
      // https://github.com/aws/constructs/blob/10.x/src/construct.ts
      /**
       * Returns the scope in which this construct is defined.
       *
       * The value is `undefined` at the root of the construct scope tree.
       */
      get scope() {
        return this._constructsNode.scope;
      }
      /**
       * The id of this construct within the current scope.
       *
       * This is a a scope-unique id. To obtain an app-unique id for this construct, use `addr`.
       */
      get id() {
        return this._constructsNode.id;
      }
      /**
       * The full, absolute path of this construct in the tree.
       *
       * Components are separated by '/'.
       */
      get path() {
        return this._constructsNode.path;
      }
      /**
       * Returns an opaque tree-unique address for this construct.
       *
       * Addresses are 42 characters hexadecimal strings. They begin with "c8"
       * followed by 40 lowercase hexadecimal characters (0-9a-f).
       *
       * Addresses are calculated using a SHA-1 of the components of the construct
       * path.
       *
       * To enable refactorings of construct trees, constructs with the ID `Default`
       * will be excluded from the calculation. In those cases constructs in the
       * same tree may have the same addreess.
       *
       * @example c83a2846e506bcc5f10682b564084bca2d275709ee
       */
      get addr() {
        return this._constructsNode.addr;
      }
      /**
       * Return a direct child by id, or undefined
       *
       * @param id Identifier of direct child
       * @returns the child if found, or undefined
       */
      tryFindChild(id) {
        return this._constructsNode.tryFindChild(id);
      }
      /**
       * Return a direct child by id
       *
       * Throws an error if the child is not found.
       *
       * @param id Identifier of direct child
       * @returns Child with the given id.
       */
      findChild(id) {
        return this._constructsNode.findChild(id);
      }
      /**
       * Returns the child construct that has the id `Default` or `Resource"`.
       * This is usually the construct that provides the bulk of the underlying functionality.
       * Useful for modifications of the underlying construct that are not available at the higher levels.
       *
       * @throws if there is more than one child
       * @returns a construct or undefined if there is no default child
       */
      get defaultChild() {
        return this._constructsNode.defaultChild;
      }
      /**
       * Override the defaultChild property.
       *
       * This should only be used in the cases where the correct
       * default child is not named 'Resource' or 'Default' as it
       * should be.
       *
       * If you set this to undefined, the default behavior of finding
       * the child named 'Resource' or 'Default' will be used.
       */
      set defaultChild(value) {
        this._constructsNode.defaultChild = value;
      }
      /**
       * All direct children of this construct.
       */
      get children() {
        return this._constructsNode.children;
      }
      /**
       * Return this construct and all of its children in the given order
       */
      findAll(order = constructs_1.ConstructOrder.PREORDER) {
        return this._constructsNode.findAll(order);
      }
      /**
       * This can be used to set contextual values.
       * Context must be set before any children are added, since children may consult context info during construction.
       * If the key already exists, it will be overridden.
       * @param key The context key
       * @param value The context value
       */
      setContext(key, value) {
        this._constructsNode.setContext(key, value);
      }
      /**
       * Retrieves a value from tree context if present. Otherwise, would throw an error.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or throws error if there is no context value for this key
       */
      getContext(key) {
        return this._constructsNode.getContext(key);
      }
      /**
       * Retrieves a value from tree context.
       *
       * Context is usually initialized at the root, but can be overridden at any point in the tree.
       *
       * @param key The context key
       * @returns The context value or `undefined` if there is no context value for this key.
       */
      tryGetContext(key) {
        return this._constructsNode.tryGetContext(key);
      }
      /**
       * An immutable array of metadata objects associated with this construct.
       * This can be used, for example, to implement support for deprecation notices, source mapping, etc.
       */
      get metadata() {
        return this._constructsNode.metadata;
      }
      /**
       * Adds a metadata entry to this construct.
       * Entries are arbitrary values and will also include a stack trace to allow tracing back to
       * the code location for when the entry was added. It can be used, for example, to include source
       * mapping in CloudFormation templates to improve diagnostics.
       *
       * @param type a string denoting the type of metadata
       * @param data the value of the metadata (can be a Token). If null/undefined, metadata will not be added.
       * @param options options
       */
      addMetadata(type, data, options = {}) {
        this._constructsNode.addMetadata(type, data, options);
      }
      /**
       * All parent scopes of this construct.
       *
       * @returns a list of parent scopes. The last element in the list will always
       * be the current construct and the first element will be the root of the
       * tree.
       */
      get scopes() {
        return this._constructsNode.scopes;
      }
      /**
       * Returns the root of the construct tree (the `cloud.App` object).
       *
       * Similar to `app`.
       *
       * @returns The root of the construct tree.
       */
      get root() {
        if (!this._root) {
          this._root = this.findRoot(this.construct);
        }
        return this._root;
      }
      /**
       * Returns the root of the construct tree (the `cloud.App` object).
       *
       * Similar to `root`.
       *
       * @returns The root of the construct tree.
       */
      get app() {
        if (!this._app) {
          this._app = this.findApp(this.construct);
        }
        return this._app;
      }
      /**
       * Returns true if this construct or the scopes in which it is defined are
       * locked.
       */
      get locked() {
        return this._constructsNode.locked;
      }
      /**
       * Add an ordering dependency on another construct.
       *
       * An `IDependable`
       */
      addDependency(...deps) {
        this._constructsNode.addDependency(...deps);
      }
      /**
       * Return all dependencies registered on this node (non-recursive).
       */
      get dependencies() {
        return this._constructsNode.dependencies;
      }
      /**
       * Remove the child with the given name, if present.
       *
       * @returns Whether a child with the given name was deleted.
       * @experimental
       */
      tryRemoveChild(childName) {
        return this._constructsNode.tryRemoveChild(childName);
      }
      /**
       * Adds a validation to this construct.
       *
       * When `node.validate()` is called, the `validate()` method will be called on
       * all validations and all errors will be returned.
       *
       * @param validation The validation object
       */
      addValidation(validation) {
        this._constructsNode.addValidation(validation);
      }
      /**
       * Validates this construct.
       *
       * Invokes the `validate()` method on all validations added through
       * `addValidation()`.
       *
       * @returns an array of validation error messages associated with this
       * construct.
       */
      validate() {
        return this._constructsNode.validate();
      }
      /**
       * Locks this construct from allowing more children to be added. After this
       * call, no more children can be added to this construct or to any children.
       */
      lock() {
        this._constructsNode.lock();
      }
      /**
       * Returns the root app.
       */
      findApp(scope) {
        if (isApp(scope)) {
          return scope;
        }
        if (!scope.node.scope) {
          throw new Error("Cannot find root app");
        }
        return this.findApp(scope.node.scope);
      }
      findRoot(scope) {
        if (isRoot(scope)) {
          return scope;
        }
        if (!scope.node.scope) {
          throw new Error("Cannot find root construct");
        }
        return this.findRoot(scope.node.scope);
      }
    };
    exports2.Node = Node2;
    _a = JSII_RTTI_SYMBOL_1;
    Node2[_a] = { fqn: "@winglang/sdk.std.Node", version: "0.0.0" };
    function isApp(x) {
      return x && x[exports2.APP_SYMBOL];
    }
    __name(isApp, "isApp");
    function isRoot(x) {
      return x && x.constructor && x.constructor[ROOT_SYMBOL];
    }
    __name(isRoot, "isRoot");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js
var require_number = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/number.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Number = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var json_schema_1 = require_json_schema();
    var core_1 = require_core3();
    var Number2 = class {
      static {
        __name(this, "Number");
      }
      /**
       * Parse a number from Json.
       *
       * @param json to parse number from.
       * @returns a number.
       */
      static fromJson(json, options) {
        const schema = json_schema_1.JsonSchema._createJsonSchema({
          $id: "num",
          type: "number"
        });
        schema.validate(json, options);
        return json;
      }
      /**
       * Parse a number from string.
       *
       * @macro ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })($args$)
       *
       * @param str to parse number from.
       * @returns a number.
       */
      static fromStr(str) {
        str;
        throw new Error("Macro");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
    };
    exports2.Number = Number2;
    _a = JSII_RTTI_SYMBOL_1;
    Number2[_a] = { fqn: "@winglang/sdk.std.Number", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/regex.js
var require_regex = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/regex.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Regex = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var core_1 = require_core3();
    var misc_1 = require_misc();
    var Regex = class _Regex {
      static {
        __name(this, "Regex");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      /**
       * Compiles the provided regex pattern into a `Regex` object.
       * @param pattern The regex pattern to compile.
       * @returns A new `Regex` object representing the compiled pattern.
       */
      static compile(pattern) {
        return new _Regex(pattern);
      }
      /**
       * Constructs a new `Regex` object with the specified pattern.
       * @param pattern The regular expression pattern.
       */
      constructor(pattern) {
        this._regex = new RegExp(pattern);
      }
      /** @internal */
      _toInflight() {
        return `(new (require("${(0, misc_1.normalPath)(__filename)}").Regex)(${this._regex}))`;
      }
      /**
       * Checks if the regular expression matches the provided text.
       * @param text The text to check against.
       * @returns `true` if there is a match, otherwise `false`.
       */
      test(text) {
        return this._regex.test(text);
      }
      /**
       * Finds the first occurrence of the pattern within the text.
       * @param text The text to search within.
       * @returns The first match if found, otherwise `undefined`.
       */
      find(text) {
        const result = text.match(this._regex);
        return result ? result[0] : void 0;
      }
      /**
       * Finds the start and end index of the first match within the text.
       * @param text The text to search within.
       * @returns An array containing the start and end index of the match if found, otherwise `undefined`.
       */
      findIndex(text) {
        const result = this._regex.exec(text);
        return result ? [result.index, result.index + result[0].length] : void 0;
      }
      /**
       * Finds the first match and its submatches.
       * @param text The text to search within.
       * @returns An array containing the match and all submatches.
       */
      findSubmatch(text) {
        const result = text.match(this._regex);
        if (result) {
          return [result[0], ...result.slice(1)];
        }
        return void 0;
      }
      /**
       * Finds the start and end index of the match and all submatches.
       * @param text The text to search within.
       * @returns An array containing arrays of start and end indices for the match and all submatches.
       */
      findSubmatchIndex(text) {
        const result = this._regex.exec(text);
        if (!result) {
          return void 0;
        }
        const indices = [[result.index, result.index + result[0].length]];
        result.slice(1).forEach((submatch) => {
          const start = text.indexOf(submatch, indices[indices.length - 1][0]);
          const end = start + submatch.length;
          indices.push([start, end]);
        });
        return indices;
      }
      /**
       * Finds all non-overlapping occurrences of the pattern within the text.
       * Returns an empty array if no matches are found.
       * @param text The text to search within.
       * @returns An array containing all matches found.
       */
      findAll(text) {
        const globalRegex = this.getGlobalRegex();
        return [...text.matchAll(globalRegex)].map((match) => match[0]);
      }
      /**
       * Finds the start and end index of all matches within the text.
       * Indices are zero-based.
       * @param text The text to search within.
       * @returns An array containing arrays of start and end indices for each match found.
       */
      findAllIndex(text) {
        const matches = [];
        const globalRegex = this.getGlobalRegex();
        for (const match of text.matchAll(globalRegex)) {
          if (match.index !== void 0) {
            matches.push([match.index, match.index + match[0].length]);
          }
        }
        return matches;
      }
      /**
       * Replaces all occurrences of the match with a replacement string.
       * @param text The text to search and replace within.
       * @param replacement The replacement string.
       * @returns The resulting text after all replacements.
       */
      replaceAll(text, replacement) {
        const globalRegex = this.getGlobalRegex();
        return text.replace(globalRegex, replacement);
      }
      /**
       * Helper method to get the global version of a regex.
       * @returns The current regex if it's already global, otherwise a new global regex.
       */
      getGlobalRegex() {
        return this._regex.global ? this._regex : new RegExp(this._regex, "g");
      }
    };
    exports2.Regex = Regex;
    _a = JSII_RTTI_SYMBOL_1;
    Regex[_a] = { fqn: "@winglang/sdk.std.Regex", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/resource.js
var require_resource = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/resource.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AutoIdResource = exports2.Resource = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constructs_1 = require_lib();
    var core_1 = require_core3();
    var errors_1 = require_errors();
    var std_1 = require_std();
    function hasLiftMap(x) {
      return x != null && typeof x._liftMap === "object";
    }
    __name(hasLiftMap, "hasLiftMap");
    var Resource = class extends constructs_1.Construct {
      static {
        __name(this, "Resource");
      }
      /**
       * A hook called by the Wing compiler once for each inflight host that needs to
       * use this type inflight. The list of requested inflight methods
       * needed by the inflight host are given by `ops`.
       *
       * This method is commonly used for adding permissions, environment variables, or
       * other capabilities to the inflight host.
       */
      static onLiftType(host, ops) {
        host;
        ops;
      }
      /**
       * Generates an asynchronous JavaScript statement which can be used to create an inflight client
       * for a resource.
       *
       * NOTE: This statement must be executed within an async context.
       */
      static toInflight(obj) {
        return obj._toInflight();
      }
      /**
       * Create an instance of this resource with the current App factory.
       * This is commonly used in the constructor of a pseudo-abstract resource class before the super() call.
       *
       * @example
       * ```ts
       * export class MyResource extends Resource {
       *   constructor(scope: Construct, id: string, props: MyResourceProps) {
       *     if (new.target === MyResource) {
       *      return MyResource._newFromFactory(MYRESOURCE_FQN, scope, id, props);
       *     }
       *     super(scope, id);
       *     // ...
       *  ```
       *
       * @internal
       */
      static _newFromFactory(fqn, scope, id, ...props) {
        return core_1.App.of(scope).newAbstract(fqn, scope, id, ...props);
      }
      /**
       * Return a code snippet that can be used to reference this resource inflight.
       *
       * @internal
       * @abstract
       */
      _toInflight() {
        throw new errors_1.AbstractMemberError();
      }
      /**
       * A hook called by the Wing compiler once for each inflight host that needs to
       * use this resource inflight.
       *
       * You can override this method to perform additional logic like granting
       * IAM permissions to the host based on what methods are being called. But
       * you must call `super.bind(host, ops)` to ensure that the resource is
       * actually bound.
       */
      onLift(host, ops) {
        host;
        ops;
      }
      /**
       * A hook for performing operations after the tree of resources has been
       * created, but before they are synthesized.
       *
       * Currently used for binding resources to hosts.
       *
       * @internal
       */
      _preSynthesize() {
        if (hasLiftMap(this) && !(this instanceof AutoIdResource)) {
          addConnectionsFromLiftMap(this, this._liftMap);
        }
      }
    };
    exports2.Resource = Resource;
    _a = JSII_RTTI_SYMBOL_1;
    Resource[_a] = { fqn: "@winglang/sdk.std.Resource", version: "0.0.0" };
    function addConnectionsFromLiftMap(construct2, liftData, baseOp) {
      for (const [op, liftEntries] of Object.entries(liftData)) {
        for (const [dep, depOps] of liftEntries) {
          if (constructs_1.Construct.isConstruct(dep) && !(dep instanceof AutoIdResource)) {
            for (const depOp of depOps) {
              std_1.Node.of(construct2).addConnection({
                source: construct2,
                sourceOp: baseOp ?? op,
                target: dep,
                targetOp: depOp,
                name: "call"
              });
            }
          } else if (hasLiftMap(dep)) {
            addConnectionsFromLiftMap(construct2, dep._liftMap, baseOp ?? op);
          }
        }
      }
    }
    __name(addConnectionsFromLiftMap, "addConnectionsFromLiftMap");
    var AutoIdResource = class extends Resource {
      static {
        __name(this, "AutoIdResource");
      }
      constructor(scope, idPrefix = "") {
        const id = core_1.App.of(scope).makeId(scope, idPrefix ? `${idPrefix}_` : "");
        super(scope, id);
      }
    };
    exports2.AutoIdResource = AutoIdResource;
    _b = JSII_RTTI_SYMBOL_1;
    AutoIdResource[_b] = { fqn: "@winglang/sdk.std.AutoIdResource", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/set.js
var require_set2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/set.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MutSet = exports2.Set = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var core_1 = require_core3();
    var Set2 = class {
      static {
        __name(this, "Set");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * The length of the set
       * @returns the length of the set
       */
      get size() {
        throw new Error("Abstract");
      }
      /**
       * Returns a boolean indicating whether an element with the specified value exists in the set.
       * @param value The value to test for presence in the Set object.
       * @returns `true` if an element with the specified value exists in the set; otherwise `false`.
       */
      has(value) {
        value;
        throw new Error("Abstract");
      }
      /**
       * Create a mutable shallow copy of this set
       *
       * @macro new Set($self$)
       *
       * @returns a MutableSet with the same values as this set
       */
      copyMut() {
        throw new Error("Macro");
      }
      /**
       * Create an immutable array shallow copy of this set
       *
       * @macro [...($self$)]
       *
       * @returns an ImmutableArray with the same values as this set
       */
      toArray() {
        throw new Error("Macro");
      }
    };
    exports2.Set = Set2;
    _a = JSII_RTTI_SYMBOL_1;
    Set2[_a] = { fqn: "@winglang/sdk.std.Set", version: "0.0.0" };
    var MutSet = class {
      static {
        __name(this, "MutSet");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * The length of the set
       * @returns the length of the set
       */
      get size() {
        throw new Error("Abstract");
      }
      /**
       * Add value to set
       * @param value value to add
       * @returns true if the value was added, false if it was already in the set
       */
      add(value) {
        value;
        throw new Error("Abstract");
      }
      /**
       * The clear() method removes all elements from a set.
       */
      clear() {
        throw new Error("Abstract");
      }
      /**
       * Create an immutable shallow copy of this set
       *
       * @macro new Set($self$)
       *
       * @returns an ImmutableSet with the same values as this set
       */
      copy() {
        throw new Error("Macro");
      }
      /**
       * Removes a specified value from a set, if it is in the set.
       * @param value The value to remove from the set.
       * @returns Returns `true` if `value` was already in the set; otherwise `false`.
       */
      delete(value) {
        value;
        throw new Error("Abstract");
      }
      /**
       * Returns a boolean indicating whether an element with the specified value exists in the set.
       * @param value The value to test for presence in the Set object.
       * @returns `true` if an element with the specified value exists in the set; otherwise `false`.
       */
      has(value) {
        value;
        throw new Error("Abstract");
      }
      /**
       * Create an immutable array shallow copy of this set
       *
       * @macro [...($self$)]
       *
       * @returns an ImmutableArray with the same values as this set
       */
      toArray() {
        throw new Error("Macro");
      }
    };
    exports2.MutSet = MutSet;
    _b = JSII_RTTI_SYMBOL_1;
    MutSet[_b] = { fqn: "@winglang/sdk.std.MutSet", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/string.js
var require_string2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/string.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.String = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var json_schema_1 = require_json_schema();
    var core_1 = require_core3();
    var String2 = class {
      static {
        __name(this, "String");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      /**
       * Parse string from Json.
       *
       * @param json to create string from.
       * @returns a string.
       */
      static fromJson(json, options) {
        const schema = json_schema_1.JsonSchema._createJsonSchema({
          $id: "string",
          type: "string"
        });
        schema.validate(json, options);
        return json;
      }
      constructor() {
      }
      /**
       * The length of the string.
       */
      get length() {
        throw new Error("Abstract");
      }
      /**
       * Returns the character at the specified index.
       *
       * @macro ((args) => { if ($args$ >= $self$.length || $args$ + $self$.length < 0) {throw new Error("index out of bounds")}; return $self$.at($args$) })($args$)
       *
       * @param index position of the character.
       * @returns string at the specified index.
       */
      at(index) {
        index;
        throw new Error("Abstract");
      }
      /**
       * Combines the text of two (or more) strings and returns a new string.
       *
       * @param strN one or more strings to concatenate to this string.
       * @returns a new combined string.
       */
      concat(strN) {
        strN;
        throw new Error("Abstract");
      }
      /**
       * Checks if string includes substring.
       *
       * @macro $self$.includes($args$)
       *
       * @param searchString substring to search for.
       * @returns true if string includes substring.
       */
      contains(searchString) {
        searchString;
        throw new Error("Macro");
      }
      /**
       * Does this string end with the given searchString?
       *
       * @macro $self$.endsWith($args$)
       *
       * @param searchString substring to search for.
       * @returns true if string ends with searchString.
       */
      endsWith(searchString) {
        searchString;
        throw new Error("Abstract");
      }
      /**
       * Returns the index of the first occurrence of searchString found.
       *
       * @macro $self$.indexOf($args$)
       *
       * @param searchString substring to search for.
       * @returns the index of the first occurrence of searchString found, or -1 if not found.
       */
      indexOf(searchString) {
        searchString;
        throw new Error("Macro");
      }
      /**
       * Returns this string in lower case.
       *
       * @macro $self$.toLocaleLowerCase()
       *
       * @returns a new lower case string.
       */
      lowercase() {
        throw new Error("Macro");
      }
      /**
       * Splits string by separator.
       *
       * @param separator separator to split by.
       * @returns array of strings.
       */
      split(separator) {
        separator;
        throw new Error("Abstract");
      }
      /**
       * Does this string start with the given searchString?
       *
       * @macro $self$.startsWith($args$)
       *
       * @param searchString substring to search for.
       * @returns true if string starts with searchString.
       */
      startsWith(searchString) {
        searchString;
        throw new Error("Abstract");
      }
      /**
       * Returns a string between indexStart, indexEnd.
       *
       * @param indexStart index of the character we slice at.
       * @param indexEnd optional - index of the character we end slicing at.
       * @returns the string contained from indexStart to indexEnd.
       */
      substring(indexStart, indexEnd) {
        indexStart;
        indexEnd;
        throw new Error("Abstract");
      }
      /**
       * Replaces the first occurence of a substring within a string.
       *
       * @macro $self$.replace($args$)
       *
       * @param searchString The substring to search for.
       * @param replaceString The replacement substring.
       * @returns The modified string after replacement.
       */
      replace(searchString, replaceString) {
        searchString;
        replaceString;
        throw new Error("Abstract");
      }
      /**
       * Replaces all occurrences of a substring within a string.
       *
       * @macro $self$.replaceAll($args$)
       *
       * @param searchString The substring to search for.
       * @param replaceString The replacement substring.
       * @returns The modified string after replacement.
       */
      replaceAll(searchString, replaceString) {
        searchString;
        replaceString;
        throw new Error("Abstract");
      }
      /**
       * Removes white spaces from start and end of this string.
       *
       * @returns a new string with white spaces removed from start and end.
       */
      trim() {
        throw new Error("Abstract");
      }
      /**
       * Returns this string in upper case.
       *
       * @macro $self$.toLocaleUpperCase()
       *
       * @returns a new upper case string.
       */
      uppercase() {
        throw new Error("Macro");
      }
    };
    exports2.String = String2;
    _a = JSII_RTTI_SYMBOL_1;
    String2[_a] = { fqn: "@winglang/sdk.std.String", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/struct.js
var require_struct = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/struct.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Struct = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var json_schema_1 = require_json_schema();
    var core_1 = require_core3();
    var Struct = class {
      static {
        __name(this, "Struct");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      /**
       * Converts a Json to a Struct
       *
       * @macro $self$._fromJson($args$)
       */
      static fromJson(json, options) {
        json;
        options;
        throw new Error("Macro");
      }
      /**
       * Converts a Json to a Struct, returning nil if the Json is not valid
       *
       * @macro $self$._tryFromJson($args$)
       */
      static tryFromJson(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Parse a Json string into a Struct
       *
       * @macro $self$._fromJson(JSON.parse($args$))
       */
      static parseJson(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Parse a Json string into a Struct, returning nil if the Json is not valid
       *
       * @macro $self$._tryParseJson($args$)
       */
      static tryParseJson(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Retrieve the schema for this struct
       * @macro $self$
       */
      static schema() {
        throw new Error("Macro");
      }
      /**
       * Create an instance of a StructSchema from a JsonSchema
       *
       * @internal
       */
      static _createJsonSchema(schema) {
        return new json_schema_1.JsonSchema(schema);
      }
      constructor() {
      }
    };
    exports2.Struct = Struct;
    _a = JSII_RTTI_SYMBOL_1;
    Struct[_a] = { fqn: "@winglang/sdk.std.Struct", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/test.js
var require_test = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/test.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Test = exports2.TEST_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var core_1 = require_core3();
    var std_1 = require_std();
    exports2.TEST_FQN = (0, constants_1.fqnForType)("std.Test");
    var Test = class extends std_1.Resource {
      static {
        __name(this, "Test");
      }
      constructor(scope, id, inflight, props = {}) {
        super(scope, id);
        std_1.Node.of(this).title = "Test";
        std_1.Node.of(this).description = "A cloud unit test.";
        this._fn = core_1.App.of(this)?._testRunner?._addTestFunction(this, "Handler", inflight, props);
        if (!this._fn) {
          std_1.Node.of(this).hidden = true;
        }
      }
      /** @internal */
      get _liftMap() {
        return {};
      }
      /** @internal */
      _toInflight() {
        throw new Error("unimplemented");
      }
    };
    exports2.Test = Test;
    _a = JSII_RTTI_SYMBOL_1;
    Test[_a] = { fqn: "@winglang/sdk.std.Test", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/api.js
var require_api = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/api.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sanitizeParamLikeObject = exports2.parseHttpMethod = exports2.DEFAULT_RESPONSE_STATUS = exports2.HttpMethod = exports2.ApiInflightMethods = exports2.Api = exports2.API_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.API_FQN = (0, constants_1.fqnForType)("cloud.Api");
    var Api = class _Api extends std_1.Resource {
      static {
        __name(this, "Api");
      }
      /**
       * Converts input path to a valid OpenAPI path (replaces `:` based path params with `{}`)
       * @param path The path to convert (assumes path is valid)
       * @returns OpenAPI path
       */
      static renderOpenApiPath(path2) {
        return path2.replace(/\/:([A-Za-z0-9_-]+)/g, "/{$1}");
      }
      /**
       * Generates an object containing default CORS response headers and OPTIONS response headers.
       * @param corsOptions The CORS options to generate the headers from.
       * @returns An object containing default CORS response headers and OPTIONS response headers.
       */
      static renderCorsHeaders(corsOptions) {
        if (corsOptions == void 0) {
          return;
        }
        const { allowOrigin = "*", allowHeaders = [], allowMethods = [], exposeHeaders = [], allowCredentials = false, maxAge = std_1.Duration.fromMinutes(5) } = corsOptions;
        const defaultHeaders = {
          "Access-Control-Allow-Origin": allowOrigin || "*",
          "Access-Control-Expose-Headers": exposeHeaders.join(",") || "",
          "Access-Control-Allow-Credentials": allowCredentials ? "true" : "false"
        };
        const optionsHeaders = {
          "Access-Control-Allow-Origin": allowOrigin || "*",
          "Access-Control-Allow-Headers": allowHeaders.join(",") || "",
          "Access-Control-Allow-Methods": allowMethods.join(",") || "",
          "Access-Control-Max-Age": maxAge.seconds.toString()
        };
        return {
          defaultResponse: defaultHeaders,
          optionsResponse: optionsHeaders
        };
      }
      /**
       * The base URL of the API endpoint.
       */
      get url() {
        return this._endpoint.url;
      }
      /**
       * The Endpoint of the API.
       * @abstract
       * @internal
       */
      get _endpoint() {
        throw new errors_1.AbstractMemberError();
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Api) {
          return std_1.Resource._newFromFactory(exports2.API_FQN, scope, id, props);
        }
        super(scope, id);
        this.apiSpec = {
          paths: {}
        };
        this.corsDefaultValues = {
          allowOrigin: "*",
          allowMethods: [
            HttpMethod.GET,
            HttpMethod.POST,
            HttpMethod.PUT,
            HttpMethod.DELETE,
            HttpMethod.HEAD,
            HttpMethod.OPTIONS
          ],
          allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
          exposeHeaders: [],
          allowCredentials: false,
          maxAge: std_1.Duration.fromMinutes(5)
        };
        this.corsOptions = props.cors ? this._cors(props.corsOptions) : void 0;
        std_1.Node.of(this).title = "Api";
        std_1.Node.of(this).description = "A REST API endpoint";
      }
      /**
       * Add a inflight handler to the api for GET requests on the given path.
       * @param path The path to handle GET requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      get(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for POST requests on the given path.
       * @param path The path to handle POST requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      post(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for PUT requests on the given path.
       * @param path The path to handle PUT requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      put(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for DELETE requests on the given path.
       * @param path The path to handle DELETE requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      delete(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for PATCH requests on the given path.
       * @param path The path to handle PATCH requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      patch(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for OPTIONS requests on the given path.
       * @param path The path to handle OPTIONS requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      options(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for HEAD requests on the given path.
       * @param path The path to handle HEAD requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      head(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a inflight handler to the api for CONNECT requests on the given path.
       * @param path The path to handle CONNECT requests for.
       * @param inflight The function to handle the request.
       * @param props Options for the route.
       * @abstract
       */
      connect(path2, inflight, props) {
        path2;
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Validating path:
       * if has `:` prefix - the part following that prefix is only letter, digit or _, not empty and placed before and after "/"
       * @param path
       * @throws if the path is invalid
       * @internal
       */
      _validatePath(path2) {
        if (!/^((\/\:[a-zA-Z0-9_\-]+|\/[a-zA-Z0-9_\-\.]*)*(?:\?[^#]*)?)?$/g.test(path2)) {
          throw new Error(`Invalid path ${path2}. Url parts can only contain alpha-numeric chars, "-", "_" and ".". Params can only contain alpha-numeric chars and "_".`);
        }
      }
      /**
       * Returns CORS configuration. If props are provided, they will have precedence over defaults.
       * @param props
       * @returns ApiCorsOptions
       * @internal
       */
      _cors(props) {
        return {
          ...this.corsDefaultValues,
          ...props
        };
      }
      /**
       * Checks if two given paths are siblings.
       * @param pathA
       * @param pathB
       * @returns A boolean value indicating if provided paths are siblings.
       * @internal
       */
      _arePathsSiblings(pathA, pathB) {
        const partsA = pathA.split("/");
        const partsB = pathB.split("/");
        let shorter = partsA.length < partsB.length ? partsA : partsB;
        for (let i = 0; i < shorter.length; i++) {
          const partA = partsA[i];
          const partB = partsB[i];
          if ((!partA.match(/^:.+?$/) || !partB.match(/^:.+?$/)) && partA[i] !== partB[i]) {
            return false;
          }
          if (partA.match(/^:.+?$/) && partB.match(/^:.+?$/) && partA[i] !== partB[i]) {
            return true;
          }
        }
        return false;
      }
      /**
       * Checks if two given paths are ambiguous.
       * @param pathA
       * @param pathB
       * @returns A boolean value indicating if provided paths are ambiguous.
       * @internal
       */
      _arePathsAmbiguous(pathA, pathB) {
        const partsA = pathA.split("/");
        const partsB = pathB.split("/");
        if (partsA.length !== partsB.length) {
          return false;
        }
        for (let i = 0; i < partsA.length; i++) {
          const partA = partsA[i];
          const partB = partsB[i];
          if (partA !== partB && !partA.match(/^:.+?$/) && !partB.match(/^:.+?$/)) {
            return false;
          }
        }
        return true;
      }
      /**
       * Checks if provided path and method are ambigous with paths and methods already defined in the api spec.
       * @param path Path to be checked
       * @param method HTTP method
       * @returns A boolean value indicating if provided path and method are ambiguous.
       * @internal
       */
      _findAmbiguousPath(path2, method) {
        const existingPaths = Object.keys(this.apiSpec.paths);
        return existingPaths.find((existingPath) => !!this.apiSpec.paths[existingPath][method.toLowerCase()] && this._arePathsAmbiguous(existingPath, path2));
      }
      /**
       * Checks if provided path is a sibling of paths already defined in the api spec- i.e "/:username" and "/:id".
       * @param path Path to be checked
       * @returns A boolean value indicating if provided path has a sibling.
       * @internal
       */
      _findSiblingPath(path2) {
        const existingPaths = Object.keys(this.apiSpec.paths);
        return existingPaths.find((existingPath) => this._arePathsSiblings(existingPath, path2));
      }
      /**
       * Generates the OpenAPI schema for CORS headers based on the provided CORS options.
       * @param corsOptions The CORS options to generate the schema from.
       * @returns An object representing the OpenAPI schema for CORS headers.
       */
      _corsOpenApiSchema(corsOptions) {
        const corsHeaders = {};
        if (corsOptions) {
          const corsHeaderSchema = {
            schema: {
              type: "string"
            }
          };
          corsHeaders["Access-Control-Allow-Origin"] = corsHeaderSchema;
          corsHeaders["Access-Control-Allow-Methods"] = corsHeaderSchema;
          corsHeaders["Access-Control-Allow-Headers"] = corsHeaderSchema;
          corsHeaders["Access-Control-Max-Age"] = corsHeaderSchema;
        }
        return corsHeaders;
      }
      /**
       * Add a route to the api spec.
       * @param path The path to add.
       * @param method The method to add.
       * @param apiSpecExtension The extension to add to the api spec for this route and method.
       *
       * @internal
       * */
      _addToSpec(path2, method, apiSpecExtension, corsOptions) {
        if (this.apiSpec.paths[path2]?.[method.toLowerCase()]) {
          throw new Error(`Endpoint for path '${path2}' and method '${method}' already exists`);
        }
        const ambiguousPath = this._findAmbiguousPath(path2, method);
        if (!!ambiguousPath) {
          throw new Error(`Endpoint for path '${path2}' and method '${method}' is ambiguous - it conflicts with existing endpoint for path '${ambiguousPath}'`);
        }
        const siblingPath = this._findSiblingPath(path2);
        if (!!siblingPath) {
          throw new Error(`Endpoint for path '${path2}' and method '${method}' conflicts with existing sibling endpoint for path '${siblingPath}'- try to match the parameter names to avoid this error.`);
        }
        const operationId = `${method.toLowerCase()}${path2 === "/" ? "" : path2.replace("/", "-")}`;
        const pathParams = path2.match(/:([A-Za-z0-9_-]+)/g);
        const pathParameters = [];
        if (pathParams) {
          pathParams.forEach((param) => {
            const paramName = param.replace(":", "");
            pathParameters.push({
              name: paramName,
              in: "path",
              required: true,
              schema: {
                type: "string"
              }
            });
          });
        }
        const corsOpenApiSchema = this._corsOpenApiSchema(corsOptions);
        const methodSpec = {
          [method.toLowerCase()]: {
            operationId,
            responses: {
              "200": {
                description: "200 response",
                content: {},
                ...Object.keys(corsOpenApiSchema).length > 0 ? { headers: corsOpenApiSchema } : {}
              }
            },
            parameters: pathParameters,
            ...apiSpecExtension
          }
        };
        this.apiSpec.paths[path2] = {
          ...this.apiSpec.paths[path2],
          ...methodSpec
        };
      }
      /**
       * Return the OpenAPI spec for this Api.
       * @internal */
      _getOpenApiSpec() {
        let paths = {};
        Object.keys(this.apiSpec.paths).forEach((key) => {
          paths[_Api.renderOpenApiPath(key)] = this.apiSpec.paths[key];
        });
        return {
          ...this.apiSpec,
          openapi: "3.0.3",
          paths
        };
      }
    };
    exports2.Api = Api;
    _a = JSII_RTTI_SYMBOL_1;
    Api[_a] = { fqn: "@winglang/sdk.cloud.Api", version: "0.0.0" };
    var ApiInflightMethods;
    (function(ApiInflightMethods2) {
      ApiInflightMethods2["REQUEST"] = "request";
    })(ApiInflightMethods || (exports2.ApiInflightMethods = ApiInflightMethods = {}));
    var HttpMethod;
    (function(HttpMethod2) {
      HttpMethod2["GET"] = "GET";
      HttpMethod2["HEAD"] = "HEAD";
      HttpMethod2["POST"] = "POST";
      HttpMethod2["PUT"] = "PUT";
      HttpMethod2["DELETE"] = "DELETE";
      HttpMethod2["CONNECT"] = "CONNECT";
      HttpMethod2["OPTIONS"] = "OPTIONS";
      HttpMethod2["PATCH"] = "PATCH";
    })(HttpMethod || (exports2.HttpMethod = HttpMethod = {}));
    exports2.DEFAULT_RESPONSE_STATUS = 200;
    function parseHttpMethod(method) {
      switch (method) {
        case "GET":
          return HttpMethod.GET;
        case "POST":
          return HttpMethod.POST;
        case "PUT":
          return HttpMethod.PUT;
        case "HEAD":
          return HttpMethod.HEAD;
        case "DELETE":
          return HttpMethod.DELETE;
        case "CONNECT":
          return HttpMethod.CONNECT;
        case "OPTIONS":
          return HttpMethod.OPTIONS;
        case "PATCH":
          return HttpMethod.PATCH;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
    }
    __name(parseHttpMethod, "parseHttpMethod");
    exports2.parseHttpMethod = parseHttpMethod;
    function sanitizeParamLikeObject(obj) {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (Array.isArray(value)) {
          newObj[key] = value.join(",");
        } else if (typeof value === "string") {
          newObj[key] = value;
        }
      });
      return newObj;
    }
    __name(sanitizeParamLikeObject, "sanitizeParamLikeObject");
    exports2.sanitizeParamLikeObject = sanitizeParamLikeObject;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/topic.js
var require_topic = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/topic.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TopicInflightMethods = exports2.Topic = exports2.TOPIC_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.TOPIC_FQN = (0, constants_1.fqnForType)("cloud.Topic");
    var Topic = class _Topic extends std_1.Resource {
      static {
        __name(this, "Topic");
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Topic) {
          return std_1.Resource._newFromFactory(exports2.TOPIC_FQN, scope, id, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Topic";
        std_1.Node.of(this).description = "A pub/sub notification topic";
        props;
      }
      /**
       * Run an inflight whenever an message is published to the topic.
       * @abstract
       */
      onMessage(inflight, props) {
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Subscribing queue to the topic
       * @abstract
       */
      subscribeQueue(queue, props) {
        queue;
        props;
        throw new errors_1.AbstractMemberError();
      }
    };
    exports2.Topic = Topic;
    _a = JSII_RTTI_SYMBOL_1;
    Topic[_a] = { fqn: "@winglang/sdk.cloud.Topic", version: "0.0.0" };
    var TopicInflightMethods;
    (function(TopicInflightMethods2) {
      TopicInflightMethods2["PUBLISH"] = "publish";
    })(TopicInflightMethods || (exports2.TopicInflightMethods = TopicInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/bucket.js
var require_bucket = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/bucket.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BucketInflightMethods = exports2.BucketEventType = exports2.BucketSignedUrlAction = exports2.Bucket = exports2.BUCKET_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var fs = __importStar2(require("fs"));
    var path_1 = require("path");
    var topic_1 = require_topic();
    var constants_1 = require_constants();
    var core_1 = require_core3();
    var errors_1 = require_errors();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.BUCKET_FQN = (0, constants_1.fqnForType)("cloud.Bucket");
    var Bucket = class _Bucket extends std_1.Resource {
      static {
        __name(this, "Bucket");
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Bucket) {
          return std_1.Resource._newFromFactory(exports2.BUCKET_FQN, scope, id, props);
        }
        super(scope, id);
        this._topics = /* @__PURE__ */ new Map();
        std_1.Node.of(this).title = "Bucket";
        std_1.Node.of(this).description = "A cloud object store";
      }
      /**
       * Add a file to the bucket that is uploaded when the app is deployed.
       *
       * TODO: In the future this will support uploading any `Blob` type or
       * referencing a file from the local filesystem.
       * @abstract
       */
      addObject(key, body) {
        key;
        body;
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a file to the bucket from system folder
       *
       * @param {string} key - The key or name to associate with the file.
       * @param {string} path - The path to the file on the local system.
       * @param {BufferEncoding} encoding - The encoding to use when reading the file. Defaults to "utf-8".
       */
      addFile(key, path2, encoding = "utf-8") {
        const app = core_1.App.of(this);
        const data = fs.readFileSync((0, path_1.isAbsolute)(path2) ? path2 : (0, path_1.resolve)(app.entrypointDir, path2), { encoding });
        this.addObject(key, data);
      }
      /**
       * Creates a topic for subscribing to notification events
       * @param actionType
       * @returns the created topic
       */
      createTopic(actionType) {
        const topic = new topic_1.Topic(this, actionType);
        this.node.addDependency(topic);
        return topic;
      }
      /**
       * Gets topic form the topics map, or creates if not exists
       * @param actionType
       */
      getTopic(actionType) {
        if (!this._topics.has(actionType)) {
          this._topics.set(actionType, this.createTopic(actionType));
        }
        return this._topics.get(actionType);
      }
      /**
       * Creates an inflight handler from inflight code
       * @param eventType
       * @param inflight
       */
      createTopicHandler(eventType, inflight) {
        eventType;
        inflight;
        throw new Error("Method not implemented.");
      }
      /**
       * Creates a bucket event notifier
       * @param eventNames the events to subscribe the inflight function to
       * @param inflight the code to run upon event
       * @param opts
       */
      createBucketEvent(eventNames, inflight, opts) {
        opts;
        if (eventNames.includes(BucketEventType.CREATE)) {
          const topic = this.getTopic(BucketEventType.CREATE).onMessage(this.createTopicHandler(BucketEventType.CREATE, inflight));
          for (const op of [
            BucketInflightMethods.PUT,
            BucketInflightMethods.PUT_JSON
          ]) {
            std_1.Node.of(this).addConnection({
              source: this,
              sourceOp: op,
              target: topic,
              targetOp: topic_1.TopicInflightMethods.PUBLISH,
              name: BucketEventType.CREATE
            });
          }
        }
        if (eventNames.includes(BucketEventType.UPDATE)) {
          const topic = this.getTopic(BucketEventType.UPDATE).onMessage(this.createTopicHandler(BucketEventType.UPDATE, inflight));
          for (const op of [
            BucketInflightMethods.PUT,
            BucketInflightMethods.PUT_JSON
          ]) {
            std_1.Node.of(this).addConnection({
              source: this,
              sourceOp: op,
              target: topic,
              targetOp: topic_1.TopicInflightMethods.PUBLISH,
              name: BucketEventType.UPDATE
            });
          }
        }
        if (eventNames.includes(BucketEventType.DELETE)) {
          const topic = this.getTopic(BucketEventType.DELETE).onMessage(this.createTopicHandler(BucketEventType.DELETE, inflight));
          for (const op of [
            BucketInflightMethods.DELETE,
            BucketInflightMethods.TRY_DELETE
          ]) {
            std_1.Node.of(this).addConnection({
              source: this,
              sourceOp: op,
              target: topic,
              targetOp: topic_1.TopicInflightMethods.PUBLISH,
              name: BucketEventType.DELETE
            });
          }
        }
      }
      /**
       * Run an inflight whenever a file is uploaded to the bucket.
       */
      onCreate(fn, opts) {
        if (opts) {
          console.warn("bucket.onCreate does not support options yet");
        }
        this.createBucketEvent([BucketEventType.CREATE], fn, opts);
      }
      /**
       * Run an inflight whenever a file is deleted from the bucket.
       */
      onDelete(fn, opts) {
        if (opts) {
          console.warn("bucket.onDelete does not support options yet");
        }
        this.createBucketEvent([BucketEventType.DELETE], fn, opts);
      }
      /**
       * Run an inflight whenever a file is updated in the bucket.
       */
      onUpdate(fn, opts) {
        if (opts) {
          console.warn("bucket.onUpdate does not support options yet");
        }
        this.createBucketEvent([BucketEventType.UPDATE], fn, opts);
      }
      /**
       * Run an inflight whenever a file is uploaded, modified, or deleted from the bucket.
       */
      onEvent(fn, opts) {
        if (opts) {
          console.warn("bucket.onEvent does not support options yet");
        }
        this.createBucketEvent([BucketEventType.CREATE, BucketEventType.UPDATE, BucketEventType.DELETE], fn, opts);
      }
    };
    exports2.Bucket = Bucket;
    _a = JSII_RTTI_SYMBOL_1;
    Bucket[_a] = { fqn: "@winglang/sdk.cloud.Bucket", version: "0.0.0" };
    var BucketSignedUrlAction;
    (function(BucketSignedUrlAction2) {
      BucketSignedUrlAction2["DOWNLOAD"] = "DOWNLOAD";
      BucketSignedUrlAction2["UPLOAD"] = "UPLOAD";
    })(BucketSignedUrlAction || (exports2.BucketSignedUrlAction = BucketSignedUrlAction = {}));
    var BucketEventType;
    (function(BucketEventType2) {
      BucketEventType2["CREATE"] = "OnCreate";
      BucketEventType2["DELETE"] = "OnDelete";
      BucketEventType2["UPDATE"] = "OnUpdate";
    })(BucketEventType || (exports2.BucketEventType = BucketEventType = {}));
    var BucketInflightMethods;
    (function(BucketInflightMethods2) {
      BucketInflightMethods2["PUT"] = "put";
      BucketInflightMethods2["GET"] = "get";
      BucketInflightMethods2["LIST"] = "list";
      BucketInflightMethods2["DELETE"] = "delete";
      BucketInflightMethods2["PUT_JSON"] = "putJson";
      BucketInflightMethods2["GET_JSON"] = "getJson";
      BucketInflightMethods2["PUBLIC_URL"] = "publicUrl";
      BucketInflightMethods2["EXISTS"] = "exists";
      BucketInflightMethods2["TRY_GET"] = "tryGet";
      BucketInflightMethods2["TRY_GET_JSON"] = "tryGetJson";
      BucketInflightMethods2["TRY_DELETE"] = "tryDelete";
      BucketInflightMethods2["SIGNED_URL"] = "signedUrl";
      BucketInflightMethods2["METADATA"] = "metadata";
      BucketInflightMethods2["COPY"] = "copy";
      BucketInflightMethods2["RENAME"] = "rename";
    })(BucketInflightMethods || (exports2.BucketInflightMethods = BucketInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/counter.js
var require_counter = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/counter.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CounterInflightMethods = exports2.Counter = exports2.COUNTER_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.COUNTER_FQN = (0, constants_1.fqnForType)("cloud.Counter");
    var Counter = class _Counter extends std_1.Resource {
      static {
        __name(this, "Counter");
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Counter) {
          return std_1.Resource._newFromFactory(exports2.COUNTER_FQN, scope, id, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Counter";
        std_1.Node.of(this).description = "A distributed atomic counter";
        this.initial = props.initial ?? 0;
      }
    };
    exports2.Counter = Counter;
    _a = JSII_RTTI_SYMBOL_1;
    Counter[_a] = { fqn: "@winglang/sdk.cloud.Counter", version: "0.0.0" };
    var CounterInflightMethods;
    (function(CounterInflightMethods2) {
      CounterInflightMethods2["INC"] = "inc";
      CounterInflightMethods2["DEC"] = "dec";
      CounterInflightMethods2["PEEK"] = "peek";
      CounterInflightMethods2["SET"] = "set";
    })(CounterInflightMethods || (exports2.CounterInflightMethods = CounterInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/domain.js
var require_domain = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/domain.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Domain = exports2.DOMAIN_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var std_1 = require_std();
    exports2.DOMAIN_FQN = (0, constants_1.fqnForType)("cloud.Domain");
    var Domain = class _Domain extends std_1.Resource {
      static {
        __name(this, "Domain");
      }
      constructor(scope, id, props) {
        if (new.target === _Domain) {
          return std_1.Resource._newFromFactory(exports2.DOMAIN_FQN, scope, id, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Domain";
        std_1.Node.of(this).description = "A cloud domain";
        this._domain = props.domainName;
      }
      /**
       * The domain name.
       */
      get domainName() {
        return this._domain;
      }
    };
    exports2.Domain = Domain;
    _a = JSII_RTTI_SYMBOL_1;
    Domain[_a] = { fqn: "@winglang/sdk.cloud.Domain", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/endpoint.js
var require_endpoint = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/endpoint.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Endpoint = exports2.ENDPOINT_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var std_1 = require_std();
    exports2.ENDPOINT_FQN = (0, constants_1.fqnForType)("cloud.Endpoint");
    var Endpoint = class _Endpoint extends std_1.Resource {
      static {
        __name(this, "Endpoint");
      }
      /**
       * The endpoint url.
       * @param url
       */
      constructor(scope, id, url, props) {
        if (new.target === _Endpoint) {
          return std_1.Resource._newFromFactory(exports2.ENDPOINT_FQN, scope, id, url, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Endpoint";
        std_1.Node.of(this).description = props?.label ?? "A cloud endpoint";
        this._url = url;
        this._label = props?.label;
        this._browserSupport = props?.browserSupport;
      }
      /**
       * The endpoint url.
       */
      get url() {
        return this._url;
      }
      /**
       * The endpoint label.
       */
      get label() {
        return this._label;
      }
      /**
       * The endpoint browser support.
       */
      get browserSupport() {
        return this._browserSupport;
      }
    };
    exports2.Endpoint = Endpoint;
    _a = JSII_RTTI_SYMBOL_1;
    Endpoint[_a] = { fqn: "@winglang/sdk.cloud.Endpoint", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared/resource-names.js
var require_resource_names = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared/resource-names.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ResourceNames = exports2.CaseConventions = void 0;
    var CaseConventions;
    (function(CaseConventions2) {
      CaseConventions2["LOWERCASE"] = "lowercase";
      CaseConventions2["UPPERCASE"] = "uppercase";
    })(CaseConventions || (exports2.CaseConventions = CaseConventions = {}));
    var ResourceNames = class {
      static {
        __name(this, "ResourceNames");
      }
      static generateName(resource, props) {
        const sep = props.sep ?? "-";
        const maxLen = props.maxLen;
        if (maxLen && maxLen < 8) {
          throw new Error("maxLen must be at least 8");
        }
        let name = resource.node.id;
        name = applyCaseConversion(name, props.case);
        if (props.prefix) {
          name = `${props.prefix}${name}`;
        }
        let includeHash = props.includeHash ?? true;
        let hash = includeHash ? sep + resource.node.addr.substring(0, 8) : "";
        let suffix = props.suffix ?? "";
        name = name.replace(props.disallowedRegex, sep);
        if (maxLen) {
          name = name.substring(0, maxLen - hash.length - suffix.length);
        }
        name = `${name}${hash}${suffix}`;
        name = applyCaseConversion(name, props.case);
        return name;
      }
    };
    exports2.ResourceNames = ResourceNames;
    function applyCaseConversion(name, caseConventions) {
      if (caseConventions === CaseConventions.LOWERCASE) {
        return name.toLocaleLowerCase();
      }
      if (caseConventions === CaseConventions.UPPERCASE) {
        return name.toLocaleUpperCase();
      }
      return name;
    }
    __name(applyCaseConversion, "applyCaseConversion");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/function.js
var require_function = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/function.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FunctionInflightMethods = exports2.Function = exports2.FUNCTION_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var fs_1 = require("fs");
    var path_1 = require("path");
    var constants_1 = require_constants();
    var core_1 = require_core3();
    var types_1 = require_types2();
    var resource_names_1 = require_resource_names();
    var std_1 = require_std();
    exports2.FUNCTION_FQN = (0, constants_1.fqnForType)("cloud.Function");
    var Function2 = class _Function extends std_1.Resource {
      static {
        __name(this, "Function");
      }
      constructor(scope, id, handler, props = {}) {
        if (new.target === _Function) {
          return std_1.Resource._newFromFactory(exports2.FUNCTION_FQN, scope, id, handler, props);
        }
        super(scope, id);
        this._env = {};
        std_1.Node.of(this).title = "Function";
        std_1.Node.of(this).description = "A cloud function (FaaS)";
        for (const [key, value] of Object.entries(props.env ?? {})) {
          this.addEnvironment(key, value);
        }
        this.handler = handler;
        const assetName = resource_names_1.ResourceNames.generateName(this, {
          // Avoid characters that may cause path issues
          disallowedRegex: /[><:"/\\|?*\s]/g,
          case: resource_names_1.CaseConventions.LOWERCASE,
          sep: "_"
        });
        const workdir = core_1.App.of(this).workdir;
        (0, fs_1.mkdirSync)(workdir, { recursive: true });
        const entrypoint = (0, path_1.join)(workdir, `${assetName}.cjs`);
        this.entrypoint = entrypoint;
        if (process.env.WING_TARGET) {
          this.addEnvironment("WING_TARGET", process.env.WING_TARGET);
        }
        if (props.concurrency !== void 0 && props.concurrency <= 0) {
          throw new Error("concurrency option on cloud.Function must be a positive integer");
        }
      }
      /** @internal */
      _preSynthesize() {
        super._preSynthesize();
        const lines = this._getCodeLines(this.handler);
        (0, fs_1.writeFileSync)(this.entrypoint, lines.join("\n"));
        core_1.Lifting.lift(this.handler, this, ["handle"]);
      }
      /**
       * @internal
       * @param handler IFunctionHandler
       * @returns the function code lines as strings
       */
      _getCodeLines(handler) {
        const inflightClient = handler._toInflight();
        const lines = new Array();
        const client = "$handler";
        lines.push('"use strict";');
        lines.push(`var ${client} = undefined;`);
        lines.push("exports.handler = async function(event) {");
        lines.push(`  ${client} = ${client} ?? (${inflightClient});`);
        lines.push(`  return await ${client}.handle(event);`);
        lines.push("};");
        return lines;
      }
      /**
       * Add an environment variable to the function.
       */
      addEnvironment(name, value) {
        if (this._env[name] !== void 0 && this._env[name] !== value) {
          throw new Error(`Environment variable "${name}" already set with a different value.`);
        }
        this._env[name] = value;
      }
      /**
       * Returns the set of environment variables for this function.
       */
      get env() {
        return { ...this._env };
      }
    };
    exports2.Function = Function2;
    _a = JSII_RTTI_SYMBOL_1;
    Function2[_a] = { fqn: "@winglang/sdk.cloud.Function", version: "0.0.0" };
    var FunctionInflightMethods;
    (function(FunctionInflightMethods2) {
      FunctionInflightMethods2["INVOKE"] = "invoke";
      FunctionInflightMethods2["INVOKE_ASYNC"] = "invokeAsync";
    })(FunctionInflightMethods || (exports2.FunctionInflightMethods = FunctionInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/on-deploy.js
var require_on_deploy = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/on-deploy.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OnDeploy = exports2.ON_DEPLOY_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.ON_DEPLOY_FQN = (0, constants_1.fqnForType)("cloud.OnDeploy");
    var OnDeploy = class _OnDeploy extends std_1.Resource {
      static {
        __name(this, "OnDeploy");
      }
      constructor(scope, id, handler, props = {}) {
        if (new.target === _OnDeploy) {
          return std_1.Resource._newFromFactory(exports2.ON_DEPLOY_FQN, scope, id, handler, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "OnDeploy";
        std_1.Node.of(this).description = "Run code during the app's deployment.";
        handler;
        props;
      }
    };
    exports2.OnDeploy = OnDeploy;
    _a = JSII_RTTI_SYMBOL_1;
    OnDeploy[_a] = { fqn: "@winglang/sdk.cloud.OnDeploy", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/queue.js
var require_queue = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/queue.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.QueueInflightMethods = exports2.Queue = exports2.DEFAULT_DELIVERY_ATTEMPTS = exports2.QUEUE_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.QUEUE_FQN = (0, constants_1.fqnForType)("cloud.Queue");
    exports2.DEFAULT_DELIVERY_ATTEMPTS = 1;
    var Queue = class _Queue extends std_1.Resource {
      static {
        __name(this, "Queue");
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Queue) {
          return std_1.Resource._newFromFactory(exports2.QUEUE_FQN, scope, id, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Queue";
        std_1.Node.of(this).description = "A distributed message queue";
        props;
      }
      /**
       * Create a function to consume messages from this queue.
       * @abstract
       */
      setConsumer(handler, props) {
        handler;
        props;
        throw new errors_1.AbstractMemberError();
      }
    };
    exports2.Queue = Queue;
    _a = JSII_RTTI_SYMBOL_1;
    Queue[_a] = { fqn: "@winglang/sdk.cloud.Queue", version: "0.0.0" };
    var QueueInflightMethods;
    (function(QueueInflightMethods2) {
      QueueInflightMethods2["PUSH"] = "push";
      QueueInflightMethods2["PURGE"] = "purge";
      QueueInflightMethods2["APPROX_SIZE"] = "approxSize";
      QueueInflightMethods2["POP"] = "pop";
    })(QueueInflightMethods || (exports2.QueueInflightMethods = QueueInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/cron-validator/lib/index.js
var require_lib2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/cron-validator/lib/index.js"(exports2) {
    "use strict";
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isValidCron = void 0;
    var safeParseInt = /* @__PURE__ */ __name(function(value) {
      if (/^\d+$/.test(value)) {
        return Number(value);
      } else {
        return NaN;
      }
    }, "safeParseInt");
    var isWildcard = /* @__PURE__ */ __name(function(value) {
      return value === "*";
    }, "isWildcard");
    var isQuestionMark = /* @__PURE__ */ __name(function(value) {
      return value === "?";
    }, "isQuestionMark");
    var isInRange = /* @__PURE__ */ __name(function(value, start, stop) {
      return value >= start && value <= stop;
    }, "isInRange");
    var isValidRange = /* @__PURE__ */ __name(function(value, start, stop) {
      var sides = value.split("-");
      switch (sides.length) {
        case 1:
          return isWildcard(value) || isInRange(safeParseInt(value), start, stop);
        case 2:
          var _a = sides.map(function(side) {
            return safeParseInt(side);
          }), small = _a[0], big = _a[1];
          return small <= big && isInRange(small, start, stop) && isInRange(big, start, stop);
        default:
          return false;
      }
    }, "isValidRange");
    var isValidStep = /* @__PURE__ */ __name(function(value) {
      return value === void 0 || value.search(/[^\d]/) === -1 && safeParseInt(value) > 0;
    }, "isValidStep");
    var validateForRange = /* @__PURE__ */ __name(function(value, start, stop) {
      if (value.search(/[^\d-,\/*]/) !== -1) {
        return false;
      }
      var list = value.split(",");
      return list.every(function(condition) {
        var splits = condition.split("/");
        if (condition.trim().endsWith("/")) {
          return false;
        }
        if (splits.length > 2) {
          return false;
        }
        var left = splits[0], right = splits[1];
        return isValidRange(left, start, stop) && isValidStep(right);
      });
    }, "validateForRange");
    var hasValidSeconds = /* @__PURE__ */ __name(function(seconds) {
      return validateForRange(seconds, 0, 59);
    }, "hasValidSeconds");
    var hasValidMinutes = /* @__PURE__ */ __name(function(minutes) {
      return validateForRange(minutes, 0, 59);
    }, "hasValidMinutes");
    var hasValidHours = /* @__PURE__ */ __name(function(hours) {
      return validateForRange(hours, 0, 23);
    }, "hasValidHours");
    var hasValidDays = /* @__PURE__ */ __name(function(days, allowBlankDay) {
      return allowBlankDay && isQuestionMark(days) || validateForRange(days, 1, 31);
    }, "hasValidDays");
    var monthAlias = {
      jan: "1",
      feb: "2",
      mar: "3",
      apr: "4",
      may: "5",
      jun: "6",
      jul: "7",
      aug: "8",
      sep: "9",
      oct: "10",
      nov: "11",
      dec: "12"
    };
    var hasValidMonths = /* @__PURE__ */ __name(function(months, alias) {
      if (months.search(/\/[a-zA-Z]/) !== -1) {
        return false;
      }
      if (alias) {
        var remappedMonths = months.toLowerCase().replace(/[a-z]{3}/g, function(match) {
          return monthAlias[match] === void 0 ? match : monthAlias[match];
        });
        return validateForRange(remappedMonths, 1, 12);
      }
      return validateForRange(months, 1, 12);
    }, "hasValidMonths");
    var weekdaysAlias = {
      sun: "0",
      mon: "1",
      tue: "2",
      wed: "3",
      thu: "4",
      fri: "5",
      sat: "6"
    };
    var hasValidWeekdays = /* @__PURE__ */ __name(function(weekdays, alias, allowBlankDay, allowSevenAsSunday) {
      if (allowBlankDay && isQuestionMark(weekdays)) {
        return true;
      } else if (!allowBlankDay && isQuestionMark(weekdays)) {
        return false;
      }
      if (weekdays.search(/\/[a-zA-Z]/) !== -1) {
        return false;
      }
      if (alias) {
        var remappedWeekdays = weekdays.toLowerCase().replace(/[a-z]{3}/g, function(match) {
          return weekdaysAlias[match] === void 0 ? match : weekdaysAlias[match];
        });
        return validateForRange(remappedWeekdays, 0, allowSevenAsSunday ? 7 : 6);
      }
      return validateForRange(weekdays, 0, allowSevenAsSunday ? 7 : 6);
    }, "hasValidWeekdays");
    var hasCompatibleDayFormat = /* @__PURE__ */ __name(function(days, weekdays, allowBlankDay) {
      return !(allowBlankDay && isQuestionMark(days) && isQuestionMark(weekdays));
    }, "hasCompatibleDayFormat");
    var split = /* @__PURE__ */ __name(function(cron) {
      return cron.trim().split(/\s+/);
    }, "split");
    var defaultOptions = {
      alias: false,
      seconds: false,
      allowBlankDay: false,
      allowSevenAsSunday: false
    };
    exports2.isValidCron = function(cron, options) {
      options = __assign(__assign({}, defaultOptions), options);
      var splits = split(cron);
      if (splits.length > (options.seconds ? 6 : 5) || splits.length < 5) {
        return false;
      }
      var checks = [];
      if (splits.length === 6) {
        var seconds = splits.shift();
        if (seconds) {
          checks.push(hasValidSeconds(seconds));
        }
      }
      var minutes = splits[0], hours = splits[1], days = splits[2], months = splits[3], weekdays = splits[4];
      checks.push(hasValidMinutes(minutes));
      checks.push(hasValidHours(hours));
      checks.push(hasValidDays(days, options.allowBlankDay));
      checks.push(hasValidMonths(months, options.alias));
      checks.push(hasValidWeekdays(weekdays, options.alias, options.allowBlankDay, options.allowSevenAsSunday));
      checks.push(hasCompatibleDayFormat(days, weekdays, options.allowBlankDay));
      return checks.every(Boolean);
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/schedule.js
var require_schedule = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/schedule.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ScheduleInflightMethods = exports2.Schedule = exports2.SCHEDULE_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var cron_validator_1 = require_lib2();
    var constants_1 = require_constants();
    var errors_1 = require_errors();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.SCHEDULE_FQN = (0, constants_1.fqnForType)("cloud.Schedule");
    var Schedule = class _Schedule extends std_1.Resource {
      static {
        __name(this, "Schedule");
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Schedule) {
          return std_1.Resource._newFromFactory(exports2.SCHEDULE_FQN, scope, id, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Schedule";
        std_1.Node.of(this).description = "A cloud schedule to trigger events at regular intervals";
        const { cron, rate } = props;
        if (rate && cron) {
          throw new Error("rate and cron cannot be configured simultaneously.");
        }
        if (!rate && !cron) {
          throw new Error("rate or cron need to be filled.");
        }
        if (rate && rate.seconds < 60) {
          throw new Error("rate can not be set to less than 1 minute.");
        }
        if (cron && !(0, cron_validator_1.isValidCron)(cron, {
          alias: true,
          allowSevenAsSunday: true,
          allowBlankDay: false,
          seconds: false
        })) {
          throw new Error("cron string must be in UNIX cron format");
        }
      }
      /**
       * Create a function that runs when receiving the scheduled event.
       * @abstract
       */
      onTick(inflight, props) {
        inflight;
        props;
        throw new errors_1.AbstractMemberError();
      }
    };
    exports2.Schedule = Schedule;
    _a = JSII_RTTI_SYMBOL_1;
    Schedule[_a] = { fqn: "@winglang/sdk.cloud.Schedule", version: "0.0.0" };
    var ScheduleInflightMethods;
    (function(ScheduleInflightMethods2) {
      ScheduleInflightMethods2["TICK"] = "tick";
    })(ScheduleInflightMethods || (exports2.ScheduleInflightMethods = ScheduleInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/secret.js
var require_secret = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/secret.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SecretInflightMethods = exports2.Secret = exports2.SECRET_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constants_1 = require_constants();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.SECRET_FQN = (0, constants_1.fqnForType)("cloud.Secret");
    var Secret = class _Secret extends std_1.Resource {
      static {
        __name(this, "Secret");
      }
      constructor(scope, id, props = {}) {
        if (new.target === _Secret) {
          return std_1.Resource._newFromFactory(exports2.SECRET_FQN, scope, id, props);
        }
        super(scope, id);
        this[_b] = true;
        std_1.Node.of(this).title = "Secret";
        std_1.Node.of(this).description = "A cloud secret";
        this._name = props.name;
      }
      /** Get secret name */
      get name() {
        return this._name;
      }
    };
    exports2.Secret = Secret;
    _a = JSII_RTTI_SYMBOL_1, _b = types_1.SECRET_SYMBOL;
    Secret[_a] = { fqn: "@winglang/sdk.cloud.Secret", version: "0.0.0" };
    var SecretInflightMethods;
    (function(SecretInflightMethods2) {
      SecretInflightMethods2["VALUE"] = "value";
      SecretInflightMethods2["VALUE_JSON"] = "valueJson";
    })(SecretInflightMethods || (exports2.SecretInflightMethods = SecretInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/service.js
var require_service = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/service.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ServiceInflightMethods = exports2.Service = exports2.SERVICE_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var fs_1 = require("fs");
    var path_1 = require("path");
    var constants_1 = require_constants();
    var core_1 = require_core3();
    var types_1 = require_types2();
    var resource_names_1 = require_resource_names();
    var std_1 = require_std();
    exports2.SERVICE_FQN = (0, constants_1.fqnForType)("cloud.Service");
    var Service = class _Service extends std_1.Resource {
      static {
        __name(this, "Service");
      }
      constructor(scope, id, handler, props = {}) {
        if (new.target === _Service) {
          return std_1.Resource._newFromFactory(exports2.SERVICE_FQN, scope, id, handler, props);
        }
        super(scope, id);
        this._env = {};
        for (const [key, value] of Object.entries(props.env ?? {})) {
          this.addEnvironment(key, value);
        }
        std_1.Node.of(this).title = "Service";
        std_1.Node.of(this).description = "A cloud service";
        const assetName = resource_names_1.ResourceNames.generateName(this, {
          disallowedRegex: /[><:"/\\|?*\s]/g,
          // avoid characters that may cause path issues
          case: resource_names_1.CaseConventions.LOWERCASE,
          sep: "_"
        });
        const workdir = core_1.App.of(this).workdir;
        (0, fs_1.mkdirSync)(workdir, { recursive: true });
        const entrypoint = (0, path_1.join)(workdir, `${assetName}.cjs`);
        this.entrypoint = entrypoint;
        if (process.env.WING_TARGET) {
          this.addEnvironment("WING_TARGET", process.env.WING_TARGET);
        }
        this.handler = handler;
      }
      /** @internal */
      _preSynthesize() {
        super._preSynthesize();
        const inflightClient = this.handler._toInflight();
        const code = `      "use strict";
      let $stop;
      exports.start = async function() {
        if ($stop) {
          throw Error('service already started');
        }
        const client = await ${inflightClient};
        const noop = () => {};
        $stop = (await client.handle()) ?? noop;
      };

      exports.stop = async function() {
        if (!$stop) {
          throw Error('service not started');
        }
        await $stop();
        $stop = undefined;
      };
      `;
        (0, fs_1.writeFileSync)(this.entrypoint, code);
        core_1.Lifting.lift(this.handler, this, ["handle"]);
      }
      /**
       * Add an environment variable to the function.
       */
      addEnvironment(name, value) {
        if (this._env[name] !== void 0 && this._env[name] !== value) {
          throw new Error(`Environment variable "${name}" already set with a different value.`);
        }
        this._env[name] = value;
      }
      /**
       * Returns the set of environment variables for this function.
       */
      get env() {
        return { ...this._env };
      }
    };
    exports2.Service = Service;
    _a = JSII_RTTI_SYMBOL_1;
    Service[_a] = { fqn: "@winglang/sdk.cloud.Service", version: "0.0.0" };
    var ServiceInflightMethods;
    (function(ServiceInflightMethods2) {
      ServiceInflightMethods2["START"] = "start";
      ServiceInflightMethods2["STOP"] = "stop";
      ServiceInflightMethods2["STARTED"] = "started";
    })(ServiceInflightMethods || (exports2.ServiceInflightMethods = ServiceInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/website.js
var require_website = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/website.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Website = exports2.WEBSITE_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var path_1 = require("path");
    var constants_1 = require_constants();
    var core_1 = require_core3();
    var errors_1 = require_errors();
    var types_1 = require_types2();
    var std_1 = require_std();
    exports2.WEBSITE_FQN = (0, constants_1.fqnForType)("cloud.Website");
    var Website = class _Website extends std_1.Resource {
      static {
        __name(this, "Website");
      }
      constructor(scope, id, props) {
        if (new.target === _Website) {
          return std_1.Resource._newFromFactory(exports2.WEBSITE_FQN, scope, id, props);
        }
        super(scope, id);
        std_1.Node.of(this).title = "Website";
        std_1.Node.of(this).description = "A static website";
        this._path = (0, path_1.isAbsolute)(props.path) ? props.path : (0, path_1.resolve)(core_1.App.of(scope).entrypointDir, props.path);
        this._domain = props.domain;
      }
      /**
       * Absolute local path to the website's static files.
       */
      get path() {
        return this._path;
      }
      /**
       * The website's url.
       */
      get url() {
        return this._endpoint.url;
      }
      /**
       * The Endpoint of the Website.
       * @abstract
       * @internal
       */
      get _endpoint() {
        throw new errors_1.AbstractMemberError();
      }
      /**
       * Add a JSON file with custom values during the website's deployment.
       * If the path conflicts with file path from the website's static assets, an error will be thrown.
       * @param path the file path it will be uploaded as
       * @param data the data to write to the file
       */
      addJson(path2, data) {
        if (!path2.endsWith(".json")) {
          throw new Error(`key must have a .json suffix. (current: "${path2.split(".").pop()}")`);
        }
        return this.addFile(path2, JSON.stringify(data), {
          contentType: "application/json"
        });
      }
      /**
       * Add a file to the website during deployment.
       * If the path conflicts with file path from the website's static assets, an error will be thrown.
       * @param path the file path it will be uploaded as
       * @param data the data to write to the file
       * @param options configure the file's options
       * @abstract
       */
      addFile(path2, data, options) {
        path2;
        data;
        options;
        throw new errors_1.AbstractMemberError();
      }
    };
    exports2.Website = Website;
    _a = JSII_RTTI_SYMBOL_1;
    Website[_a] = { fqn: "@winglang/sdk.cloud.Website", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/index.js
var require_cloud = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/cloud/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_api(), exports2);
    __exportStar(require_bucket(), exports2);
    __exportStar(require_counter(), exports2);
    __exportStar(require_domain(), exports2);
    __exportStar(require_endpoint(), exports2);
    __exportStar(require_function(), exports2);
    __exportStar(require_on_deploy(), exports2);
    __exportStar(require_queue(), exports2);
    __exportStar(require_schedule(), exports2);
    __exportStar(require_secret(), exports2);
    __exportStar(require_service(), exports2);
    __exportStar(require_topic(), exports2);
    __exportStar(require_website(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/test-runner.js
var require_test_runner = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/test-runner.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TestRunnerInflightMethods = exports2.TraceType = exports2.LogLevel = exports2.TestRunner = exports2.TEST_RUNNER_FQN = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var resource_1 = require_resource();
    var test_1 = require_test();
    var cloud_1 = require_cloud();
    var constants_1 = require_constants();
    var std_1 = require_std();
    exports2.TEST_RUNNER_FQN = (0, constants_1.fqnForType)("std.TestRunner");
    var TestRunner = class _TestRunner extends resource_1.Resource {
      static {
        __name(this, "TestRunner");
      }
      /**
       * Instantiate one or more copies of a tree inside of an app based
       * on how many isolated environments are needed for testing.
       * @internal
       */
      static _createTree(app, Root) {
        if (app.isTestEnvironment) {
          app._testRunner = new _TestRunner(app, "cloud.TestRunner");
        }
        if (Root) {
          std_1.Node._markRoot(Root);
          if (app.isTestEnvironment) {
            new Root(app, "env0");
            const tests = app._testRunner.findTests();
            for (let i = 1; i < tests.length; i++) {
              new Root(app, "env" + i);
            }
          } else {
            new Root(app, "Default");
          }
        }
      }
      constructor(scope, id, props = {}) {
        if (new.target === _TestRunner) {
          return resource_1.Resource._newFromFactory(exports2.TEST_RUNNER_FQN, scope, id, props);
        }
        super(scope, id);
        this._synthedEnvs = /* @__PURE__ */ new Set();
        this._synthedTests = /* @__PURE__ */ new Set();
        std_1.Node.of(this).hidden = true;
        std_1.Node.of(this).title = "TestRunner";
        std_1.Node.of(this).description = "A suite of APIs for running tests and collecting results.";
        props;
      }
      /** @internal */
      _addTestFunction(scope, id, inflight, props) {
        const testEnv = scope.node.path.match(/env[0-9]+/)?.at(0);
        const testPath = scope.node.path.match(/env[\d]+\/.+/)?.at(0).replace(`${testEnv}/`, "") + "/" + id;
        if (!this._synthedEnvs.has(testEnv) && !this._synthedTests.has(testPath)) {
          this._synthedEnvs.add(testEnv);
          this._synthedTests.add(testPath);
          return new cloud_1.Function(scope, id, inflight, props);
        }
        return void 0;
      }
      /** @internal */
      get _liftMap() {
        return {
          [TestRunnerInflightMethods.LIST_TESTS]: [],
          [TestRunnerInflightMethods.RUN_TEST]: []
        };
      }
      /**
       * Find all tests in the construct tree.
       * @returns A list of tests.
       */
      findTests() {
        const isTest = /* @__PURE__ */ __name((fn) => {
          return fn instanceof test_1.Test;
        }, "isTest");
        return this.node.root.node.findAll().filter(isTest);
      }
    };
    exports2.TestRunner = TestRunner;
    _a = JSII_RTTI_SYMBOL_1;
    TestRunner[_a] = { fqn: "@winglang/sdk.std.TestRunner", version: "0.0.0" };
    var LogLevel;
    (function(LogLevel2) {
      LogLevel2["VERBOSE"] = "verbose";
      LogLevel2["INFO"] = "info";
      LogLevel2["WARNING"] = "warning";
      LogLevel2["ERROR"] = "error";
    })(LogLevel || (exports2.LogLevel = LogLevel = {}));
    var TraceType;
    (function(TraceType2) {
      TraceType2["SIMULATOR"] = "simulator";
      TraceType2["RESOURCE"] = "resource";
      TraceType2["LOG"] = "log";
    })(TraceType || (exports2.TraceType = TraceType = {}));
    var TestRunnerInflightMethods;
    (function(TestRunnerInflightMethods2) {
      TestRunnerInflightMethods2["RUN_TEST"] = "runTest";
      TestRunnerInflightMethods2["LIST_TESTS"] = "listTests";
    })(TestRunnerInflightMethods || (exports2.TestRunnerInflightMethods = TestRunnerInflightMethods = {}));
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/index.js
var require_std = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_array(), exports2);
    __exportStar(require_bool3(), exports2);
    __exportStar(require_datetime(), exports2);
    __exportStar(require_duration(), exports2);
    __exportStar(require_generics(), exports2);
    __exportStar(require_json(), exports2);
    __exportStar(require_json_schema(), exports2);
    __exportStar(require_map2(), exports2);
    __exportStar(require_node(), exports2);
    __exportStar(require_number(), exports2);
    __exportStar(require_regex(), exports2);
    __exportStar(require_resource(), exports2);
    __exportStar(require_set2(), exports2);
    __exportStar(require_string2(), exports2);
    __exportStar(require_struct(), exports2);
    __exportStar(require_test(), exports2);
    __exportStar(require_test_runner(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/parameter-registrar.js
var require_parameter_registrar = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/parameter-registrar.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveValueFromPath = exports2.ParameterRegistrar = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var ajv_1 = __importDefault(require_ajv());
    var constructs_1 = require_lib();
    var util_1 = require_util2();
    var std_1 = require_std();
    var ParameterRegistrar = class extends constructs_1.Construct {
      static {
        __name(this, "ParameterRegistrar");
      }
      constructor(scope, id) {
        super(scope, id);
        this.parameterValueByPath = {};
        this.parameterSchemas = [];
        this._rawParameters = (0, util_1.loadPlatformSpecificValues)();
        std_1.Node.of(this).hidden = true;
      }
      /**
       * Retrieve a parameter value by its path
       *
       * @param path the path of the parameter
       * @returns the value of the parameter
       */
      value(path2) {
        if (this.parameterValueByPath[path2] === void 0) {
          this.parameterValueByPath[path2] = resolveValueFromPath(this._rawParameters, path2);
        }
        return this.parameterValueByPath[path2];
      }
      /**
       * Read parameters
       *
       * @param options options for reading parameters
       * @returns the schema as a string
       */
      read(options) {
        if (options?.schema) {
          this.addSchema(options.schema);
          const fields = (0, util_1.extractFieldsFromSchema)(options.schema._rawSchema ? options.schema._rawSchema : options.schema);
          return (0, util_1.filterParametersBySchema)(fields, this._rawParameters);
        }
        return this._rawParameters;
      }
      /**
       * Add parameter schema to registrar
       *
       * @param schema schema to add to the registrar
       */
      addSchema(schema) {
        const schemaToAdd = schema._rawSchema ? schema._rawSchema : schema;
        if (!this.parameterSchemas.includes(schemaToAdd)) {
          this.parameterSchemas.push(schemaToAdd);
        }
      }
      /**
       * Helper method to add a parameter schema at a given path.
       * This method will nest the schema under the given path, making it easier to nest schemas.
       *
       * @param schema the schema to add
       * @param path the path to nest the schema under
       * @param recursiveRequire whether or not to require all the nested properties
       */
      addSchemaAtPath(schema, path2, recursiveRequire = false) {
        this.addSchema(this._nestSchemaUnderPath(schema, path2, recursiveRequire));
      }
      /**
       * This is a helper method to nest a schema under a path.
       *
       * I.E. if you have a json schema that looks like this:
       * { type: "object", properties: { foo: { type: "string" } } }
       *
       * And we want to nest it under the path "bar/baz", then this method will return:
       * { type: "object", properties: { bar: { type: "object", properties: { baz: { type: "object", properties: { foo: { type: "string" } } } } } } }
       *
       * making it easier to nest schemas under paths, without writing out the object boilerplate.
       *
       * @internal
       */
      _nestSchemaUnderPath(schema, path2, recursiveRequire = false) {
        const parts = path2.split("/");
        if (parts.length === 0 || path2 === "") {
          return schema;
        }
        const currentKey = parts[0];
        return {
          type: "object",
          properties: {
            // recurse for the next part of the path
            [currentKey]: this._nestSchemaUnderPath(schema, parts.slice(1).join("/"), recursiveRequire)
          },
          required: recursiveRequire ? [currentKey] : []
        };
      }
      /**
       * @internal
       */
      _preSynthesize() {
        if (this.parameterSchemas.length === 0) {
          return;
        }
        const platformParameterSchema = {
          allOf: [...this.parameterSchemas]
        };
        const ajv = new ajv_1.default({ allErrors: true });
        const validator = ajv.compile(platformParameterSchema);
        const valid = validator(this._rawParameters);
        if (!valid) {
          throw new Error(`Parameter validation errors:
- ${validator.errors?.map((error) => error.message).join("\n- ")}

(hint: make sure to use --values to provide the required parameters file)
        `);
        }
      }
    };
    exports2.ParameterRegistrar = ParameterRegistrar;
    _a = JSII_RTTI_SYMBOL_1;
    ParameterRegistrar[_a] = { fqn: "@winglang/sdk.platform.ParameterRegistrar", version: "0.0.0" };
    function resolveValueFromPath(rawParameters, path2) {
      if (!rawParameters) {
        return void 0;
      }
      const pathParts = path2.split("/");
      if (pathParts.length === 1) {
        return rawParameters[pathParts[0]];
      }
      const nextPath = pathParts.slice(1).join("/");
      return resolveValueFromPath(rawParameters[pathParts[0]], nextPath);
    }
    __name(resolveValueFromPath, "resolveValueFromPath");
    exports2.resolveValueFromPath = resolveValueFromPath;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/platform.js
var require_platform = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/platform.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/platform-manager.js
var require_platform_manager = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/platform-manager.js"(exports2, module2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2._loadCustomPlatform = exports2.PlatformManager = exports2.SECRETS_FILE_NAME = void 0;
    var fs_1 = require("fs");
    var path_1 = require("path");
    var process_1 = require("process");
    var vm = __importStar2(require("vm"));
    var util_1 = require_util2();
    var types_1 = require_types2();
    var BUILTIN_PLATFORMS = ["tf-aws", "tf-azure", "tf-gcp", "sim"];
    exports2.SECRETS_FILE_NAME = "secrets.json";
    var PlatformManager = class {
      static {
        __name(this, "PlatformManager");
      }
      constructor(options) {
        this.platformInstances = [];
        this.platformPaths = options.platformPaths ?? [];
        this.retrieveImplicitPlatforms();
        this.createPlatformInstances();
      }
      /**
       * Retrieve all implicit platform declarations.
       *
       * These are platforms that are not explicitly declared in the cli options
       * but are implicitly available to the app.
       *
       * We look for platforms in the following locations:
       * - The source directory
       * - Any imported namespaces (provided by the wingc compiler output)
       *
       * To determine if a directory contains a platform, we check if it contains a file ending in "wplatform.js"
       * TODO: Support platforms defined in Wing (platform.w) https://github.com/winglang/wing/issues/4937
       */
      retrieveImplicitPlatforms() {
        const importedNamespaces = process.env.WING_IMPORTED_NAMESPACES?.split(";");
        const sourceDir = process.env.WING_SOURCE_DIR;
        if (sourceDir) {
          const sourceDirPlatformFile = (0, util_1.scanDirForPlatformFile)(sourceDir);
          if (sourceDirPlatformFile) {
            this.platformPaths.push(...sourceDirPlatformFile);
          }
        }
        if (importedNamespaces) {
          importedNamespaces.forEach((namespaceDir) => {
            const namespaceDirPlatformFile = (0, util_1.scanDirForPlatformFile)(namespaceDir);
            if (namespaceDirPlatformFile) {
              this.platformPaths.push(...namespaceDirPlatformFile);
            }
          });
        }
      }
      loadPlatformPath(platformPath) {
        const platformName = (0, path_1.basename)(platformPath);
        const isBuiltin = BUILTIN_PLATFORMS.includes(platformName);
        const pathToRead = isBuiltin ? (0, path_1.join)(__dirname, `../target-${platformName}/platform`) : (0, path_1.join)(platformPath);
        this.platformInstances.push(isBuiltin ? this.loadBuiltinPlatform(pathToRead) : _loadCustomPlatform(pathToRead));
      }
      /**
       * Builtin platforms are loaded from the SDK
       *
       * @param builtinPlatformPath path to a builtin platform
       */
      loadBuiltinPlatform(builtinPlatformPath) {
        const loadedPlatform = require(builtinPlatformPath);
        if (!loadedPlatform || !loadedPlatform.Platform) {
          console.error(`Failed to load platform from ${builtinPlatformPath}`);
          return;
        }
        return new loadedPlatform.Platform();
      }
      createPlatformInstances() {
        this.platformInstances = [];
        this.platformPaths.forEach((platformPath) => {
          this.loadPlatformPath(platformPath);
        });
      }
      // This method is called from preflight.cjs in order to return an App instance
      // that can be synthesized
      createApp(appProps) {
        this.createPlatformInstances();
        let appCall = this.platformInstances[0].newApp;
        if (!appCall) {
          throw new Error(`No newApp method found on platform: ${this.platformPaths[0]} (Hint: The first platform provided must have a newApp method)`);
        }
        let hooks = collectHooks(this.platformInstances);
        const app = appCall({
          ...appProps,
          synthHooks: hooks.synthHooks,
          newInstanceOverrides: hooks.newInstanceOverrides
        });
        let secretNames = [];
        for (const c of app.node.findAll()) {
          if (c[types_1.SECRET_SYMBOL]) {
            const secret = c;
            secretNames.push(secret.name);
          }
        }
        if (secretNames.length > 0) {
          (0, fs_1.writeFileSync)((0, path_1.join)(app.outdir, exports2.SECRETS_FILE_NAME), JSON.stringify(secretNames));
        }
        let registrar = app.parameters;
        hooks.parameterSchemas.forEach((schema) => {
          registrar.addSchema(schema);
        });
        return app;
      }
      async storeSecrets(secrets) {
        const hooks = collectHooks(this.platformInstances);
        if (!hooks.storeSecretsHook) {
          throw new Error(`Cannot find a platform or platform extension that supports storing secrets`);
        }
        await hooks.storeSecretsHook(secrets);
      }
    };
    exports2.PlatformManager = PlatformManager;
    function _loadCustomPlatform(customPlatformPath) {
      const isScoped = customPlatformPath.startsWith("@");
      const platformBaseDir = isScoped ? (0, path_1.dirname)((0, path_1.dirname)(customPlatformPath)) : (0, path_1.dirname)(customPlatformPath);
      const platformDir = (0, path_1.join)(platformBaseDir, "node_modules");
      const fullCustomPlatformPath = customPlatformPath.endsWith(".js") ? customPlatformPath : isScoped ? (0, path_1.join)(platformDir, `${customPlatformPath}/lib/index.js`) : `${customPlatformPath}/index.js`;
      const customPlatformBaseDir = customPlatformPath.endsWith(".js") ? (0, path_1.dirname)(customPlatformPath) : customPlatformPath;
      const cwdNodeModules = (0, path_1.join)((0, process_1.cwd)(), "node_modules");
      const customPlatformLib = (0, path_1.join)(cwdNodeModules, customPlatformPath, "lib");
      const resolvablePaths = [
        ...module2.paths,
        customPlatformBaseDir,
        platformDir,
        cwdNodeModules,
        customPlatformLib
      ];
      const requireResolve = /* @__PURE__ */ __name((path2) => {
        return require.resolve(path2, {
          paths: resolvablePaths
        });
      }, "requireResolve");
      const platformRequire = /* @__PURE__ */ __name((path2) => {
        return require(requireResolve(path2));
      }, "platformRequire");
      platformRequire.resolve = requireResolve;
      const platformModule = {
        exports: {}
      };
      const context = vm.createContext({
        require: platformRequire,
        console,
        exports: platformModule.exports,
        module: platformModule,
        process,
        __dirname: customPlatformPath
      });
      try {
        const platformCode = (0, fs_1.readFileSync)(fullCustomPlatformPath, "utf-8");
        const script = new vm.Script(platformCode);
        script.runInContext(context);
        return new platformModule.exports.Platform();
      } catch (error) {
        if (process.env.DEBUG) {
          console.error(error);
        }
        const hint = customPlatformPath.includes(".") ? "Ensure the path to the platform is correct" : `Ensure you have installed the platform provider by running 'npm install ${customPlatformPath}'`;
        console.error(`An error occurred while loading the custom platform: ${customPlatformPath}

(hint: ${hint})`);
      }
    }
    __name(_loadCustomPlatform, "_loadCustomPlatform");
    exports2._loadCustomPlatform = _loadCustomPlatform;
    function collectHooks(platformInstances) {
      let result = {
        synthHooks: {
          preSynthesize: [],
          postSynthesize: [],
          validate: []
        },
        newInstanceOverrides: [],
        parameterSchemas: [],
        storeSecretsHook: void 0
      };
      platformInstances.forEach((instance) => {
        if (instance.parameters) {
          result.parameterSchemas.push(instance.parameters);
        }
        if (instance.preSynth) {
          result.synthHooks.preSynthesize.push(instance.preSynth.bind(instance));
        }
        if (instance.postSynth) {
          result.synthHooks.postSynthesize.push(instance.postSynth.bind(instance));
        }
        if (instance.validate) {
          result.synthHooks.validate.push(instance.validate.bind(instance));
        }
        if (instance.newInstance) {
          result.newInstanceOverrides.push(instance.newInstance.bind(instance));
        }
        if (instance.storeSecrets) {
          result.storeSecretsHook = instance.storeSecrets.bind(instance);
        }
      });
      return result;
    }
    __name(collectHooks, "collectHooks");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/index.js
var require_platform2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/platform/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_parameter_registrar(), exports2);
    __exportStar(require_platform(), exports2);
    __exportStar(require_platform_manager(), exports2);
    __exportStar(require_util2(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/app.js
var require_app = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/app.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.preSynthesizeAllConstructs = exports2.App = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constructs_1 = require_lib();
    var errors_1 = require_errors();
    var constants_1 = require_constants();
    var platform_1 = require_platform2();
    var node_1 = require_node();
    var App = class extends constructs_1.Construct {
      static {
        __name(this, "App");
      }
      /**
       * Returns the root app.
       */
      static of(scope) {
        return node_1.Node.of(scope).app;
      }
      constructor(scope, id, props) {
        super(scope, id);
        this[_b] = true;
        this._idCounters = {};
        if (!props.entrypointDir) {
          throw new Error("Missing environment variable: WING_SOURCE_DIR");
        }
        if (!props.rootConstruct) {
          node_1.Node._markRoot(this.constructor);
        }
        this.entrypointDir = props.entrypointDir;
        this._newInstanceOverrides = props.newInstanceOverrides ?? [];
        this._synthHooks = props.synthHooks;
        this.isTestEnvironment = props.isTestEnvironment ?? false;
      }
      /**
       * The ".wing" directory, which is where the compiler emits its output. We are taking an implicit
       * assumption here that it is always set to be `$outdir/.wing` which is currently hard coded into
       * the `cli/compile.ts` file.
       */
      get workdir() {
        return `${this.outdir}/.wing`;
      }
      /**
       * The parameter registrar for the app, can be used to find and register
       * parameter values that were provided to the wing application.
       */
      get parameters() {
        if (!this._parameters) {
          this._parameters = new platform_1.ParameterRegistrar(this, "ParameterRegistrar");
        }
        return this._parameters;
      }
      /**
       * Creates a new object of the given FQN.
       * @param fqn the fqn of the class to instantiate
       * @param ctor the constructor of the class to instantiate (undefined for abstract classes)
       * @param scope the scope of the resource
       * @param id the id of the resource
       * @param args the arguments to pass to the resource
       * @returns the new instance
       * @throws if the FQN is not supported
       */
      new(fqn, ctor, scope, id, ...args) {
        const instance = this.tryNew(fqn, scope, id, ...args);
        if (instance) {
          return instance;
        }
        return new ctor(scope, id, ...args);
      }
      /**
       * Creates a new object of the given abstract class FQN.
       */
      newAbstract(fqn, scope, id, ...args) {
        const instance = this.tryNew(fqn, scope, id, ...args);
        if (!instance) {
          const typeName = fqn.replace(`${constants_1.SDK_PACKAGE_NAME}.`, "");
          const typeNameParts = typeName.split(".");
          throw new errors_1.NotImplementedError(`Resource "${fqn}" is not yet implemented for "${this._target}" target. Please refer to the roadmap https://github.com/orgs/winglang/projects/3/views/1?filterQuery=${typeName}`, { resource: typeNameParts[typeNameParts.length - 1] });
        }
        return instance;
      }
      makeId(scope, prefix = "") {
        const key = `${scope.node.addr}|${prefix}`;
        this._idCounters[key] = this._idCounters[key] ?? 0;
        return `${prefix}${this._idCounters[key]++}`;
      }
      /**
       * Can be overridden by derived classes to inject dependencies.
       *
       * @param fqn The fully qualified name of the class we want the type for (jsii).
       *
       * @returns The dependency injected specific target type for the given FQN, or undefined if not found.
       */
      typeForFqn(fqn) {
        fqn;
        return void 0;
      }
      /**
       * Can be overridden by derived classes to inject dependencies.
       *
       * @param fqn The fully qualified name of the class to instantiate (jsii).
       * @param scope The construct scope.
       * @param id The construct id.
       * @param args The arguments to pass to the constructor.
       */
      tryNew(fqn, scope, id, ...args) {
        for (const override of this._newInstanceOverrides) {
          const instance = override(fqn, scope, id, ...args);
          if (instance) {
            return instance;
          }
        }
        const type = this.typeForFqn(fqn);
        if (!type) {
          return void 0;
        }
        return new type(scope, id, ...args);
      }
    };
    exports2.App = App;
    _a = JSII_RTTI_SYMBOL_1, _b = node_1.APP_SYMBOL;
    App[_a] = { fqn: "@winglang/sdk.core.App", version: "0.0.0" };
    function preSynthesizeAllConstructs(app) {
      for (const c of app.node.findAll()) {
        if (typeof c._preSynthesize === "function") {
          c._preSynthesize();
        }
      }
    }
    __name(preSynthesizeAllConstructs, "preSynthesizeAllConstructs");
    exports2.preSynthesizeAllConstructs = preSynthesizeAllConstructs;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/attributes.js
var require_attributes = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/attributes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WING_ATTRIBUTE_RESOURCE_CONNECTIONS = void 0;
    exports2.WING_ATTRIBUTE_RESOURCE_CONNECTIONS = "wing:resource:connections";
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/dependency.js
var require_dependency2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/dependency.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DependencyVertex = exports2.DependencyGraph = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var constructs_1 = require_lib();
    var DependencyGraph = class {
      static {
        __name(this, "DependencyGraph");
      }
      constructor(node) {
        this._fosterParent = new DependencyVertex();
        const nodes = {};
        function putVertex(construct2) {
          nodes[constructs_1.Node.of(construct2).path] = new DependencyVertex(construct2);
        }
        __name(putVertex, "putVertex");
        function getVertex(construct2) {
          return nodes[constructs_1.Node.of(construct2).path];
        }
        __name(getVertex, "getVertex");
        for (const n of node.findAll()) {
          putVertex(n);
        }
        const deps = [];
        for (const child of node.findAll()) {
          for (const dep of child.node.dependencies) {
            deps.push({ source: child, target: dep });
          }
        }
        for (const dep of deps) {
          if (!getVertex(dep.target)) {
            continue;
          }
          const sourceDepNode = getVertex(dep.source);
          const targetDepNode = getVertex(dep.target);
          sourceDepNode.addChild(targetDepNode);
        }
        for (const n of Object.values(nodes)) {
          if (n.inbound.length === 0) {
            this._fosterParent.addChild(n);
          }
        }
      }
      /**
       * Returns the root of the graph.
       *
       * Note that this vertex will always have `null` as its `.value` since it is an artifical root
       * that binds all the connected spaces of the graph.
       */
      get root() {
        return this._fosterParent;
      }
      /**
       * Returns a topologically sorted array of the constructs in the sub-graph.
       */
      topology() {
        return this._fosterParent.topology();
      }
    };
    exports2.DependencyGraph = DependencyGraph;
    _a = JSII_RTTI_SYMBOL_1;
    DependencyGraph[_a] = { fqn: "@winglang/sdk.core.DependencyGraph", version: "0.0.0" };
    var DependencyVertex = class {
      static {
        __name(this, "DependencyVertex");
      }
      constructor(value = void 0) {
        this._children = /* @__PURE__ */ new Set();
        this._parents = /* @__PURE__ */ new Set();
        this._value = value;
      }
      /**
       * Returns the IConstruct this graph vertex represents.
       *
       * `null` in case this is the root of the graph.
       */
      get value() {
        return this._value;
      }
      /**
       * Returns the children of the vertex (i.e dependencies)
       */
      get outbound() {
        return Array.from(this._children);
      }
      /**
       * Returns the parents of the vertex (i.e dependants)
       */
      get inbound() {
        return Array.from(this._parents);
      }
      /**
       * Returns a topologically sorted array of the constructs in the sub-graph.
       */
      topology() {
        const found = /* @__PURE__ */ new Set();
        const topology = [];
        function visit(n) {
          for (const c of n.outbound) {
            visit(c);
          }
          if (!found.has(n)) {
            topology.push(n);
            found.add(n);
          }
        }
        __name(visit, "visit");
        visit(this);
        return topology.filter((d) => d.value).map((d) => d.value);
      }
      /**
       * Adds a vertex as a dependency of the current node.
       * Also updates the parents of `dep`, so that it contains this node as a parent.
       *
       * This operation will fail in case it creates a cycle in the graph.
       *
       * @param dep The dependency
       */
      addChild(dep) {
        const cycle = dep.findRoute(this);
        if (cycle.length !== 0) {
          cycle.push(dep);
          throw new Error(`Dependency cycle detected: ${cycle.filter((d) => d.value).map((d) => constructs_1.Node.of(d.value).path).join(" => ")}`);
        }
        this._children.add(dep);
        dep.addParent(this);
      }
      addParent(dep) {
        this._parents.add(dep);
      }
      findRoute(dst) {
        const route = [];
        visit(this);
        return route;
        function visit(n) {
          route.push(n);
          let found = false;
          for (const c of n.outbound) {
            if (c === dst) {
              route.push(c);
              return true;
            }
            found = visit(c);
          }
          if (!found) {
            route.pop();
          }
          return found;
        }
        __name(visit, "visit");
      }
    };
    exports2.DependencyVertex = DependencyVertex;
    _b = JSII_RTTI_SYMBOL_1;
    DependencyVertex[_b] = { fqn: "@winglang/sdk.core.DependencyVertex", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/ui/base.js
var require_base = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/ui/base.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VisualComponent = exports2.VISUAL_COMPONENT_SYMBOL = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var node_1 = require_node();
    var resource_1 = require_resource();
    exports2.VISUAL_COMPONENT_SYMBOL = Symbol.for("@winglang/sdk.ui.VisualComponent");
    var VisualComponent = class extends resource_1.Resource {
      static {
        __name(this, "VisualComponent");
      }
      /**
       * Returns whether the given construct is a visual component.
       */
      static isVisualComponent(c) {
        return c[exports2.VISUAL_COMPONENT_SYMBOL] !== void 0;
      }
      constructor(scope, id) {
        super(scope, id);
        node_1.Node.of(this).hidden = true;
        Object.defineProperty(this, exports2.VISUAL_COMPONENT_SYMBOL, {
          value: this,
          enumerable: false,
          writable: false
        });
      }
    };
    exports2.VisualComponent = VisualComponent;
    _a = JSII_RTTI_SYMBOL_1;
    VisualComponent[_a] = { fqn: "@winglang/sdk.ui.VisualComponent", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/ui/colors.js
var require_colors = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/ui/colors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isOfTypeColors = void 0;
    var isOfTypeColors = /* @__PURE__ */ __name((keyInput) => {
      return [
        "orange",
        "sky",
        "emerald",
        "lime",
        "pink",
        "amber",
        "cyan",
        "purple",
        "red",
        "violet",
        "slate"
      ].includes(keyInput || "");
    }, "isOfTypeColors");
    exports2.isOfTypeColors = isOfTypeColors;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/tree.js
var require_tree = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/tree.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.synthesizeTree = exports2.TREE_FILE_PATH = void 0;
    var fs = __importStar2(require("fs"));
    var path2 = __importStar2(require("path"));
    var std_1 = require_std();
    var base_1 = require_base();
    var colors_1 = require_colors();
    exports2.TREE_FILE_PATH = "tree.json";
    var JSII_RUNTIME_SYMBOL = Symbol.for("jsii.rtti");
    function constructInfoFromConstruct(construct2) {
      const jsiiRuntimeInfo = Object.getPrototypeOf(construct2).constructor[JSII_RUNTIME_SYMBOL];
      if (typeof jsiiRuntimeInfo === "object" && jsiiRuntimeInfo !== null && typeof jsiiRuntimeInfo.fqn === "string" && typeof jsiiRuntimeInfo.version === "string") {
        return { fqn: jsiiRuntimeInfo.fqn, version: jsiiRuntimeInfo.version };
      }
      return void 0;
    }
    __name(constructInfoFromConstruct, "constructInfoFromConstruct");
    function synthesizeTree(app, outdir) {
      const visit = /* @__PURE__ */ __name((construct2) => {
        const children = construct2.node.children.map((c) => visit(c));
        const childrenMap = children.filter((child) => child !== void 0).reduce((map, child) => Object.assign(map, { [child.id]: child }), {});
        const node = {
          id: construct2.node.id || "App",
          path: construct2.node.path,
          children: Object.keys(childrenMap).length === 0 ? void 0 : childrenMap,
          constructInfo: constructInfoFromConstruct(construct2),
          display: synthDisplay(construct2)
        };
        return node;
      }, "visit");
      const tree = {
        version: "tree-0.1",
        tree: visit(app.node.root)
      };
      fs.writeFileSync(path2.join(outdir, exports2.TREE_FILE_PATH), JSON.stringify(tree, void 0, 2), { encoding: "utf8" });
    }
    __name(synthesizeTree, "synthesizeTree");
    exports2.synthesizeTree = synthesizeTree;
    function synthDisplay(construct2) {
      const display = std_1.Node.of(construct2);
      const ui = [];
      for (const child of construct2.node.children) {
        if (base_1.VisualComponent.isVisualComponent(child) && child._newParent === void 0) {
          ui.push(child._toUIComponent());
        }
      }
      if (display.description || display.title || display.hidden || ui || display.color || display.icon || display.expanded) {
        return {
          title: display.title,
          description: display.description,
          hidden: display.hidden,
          sourceModule: display.sourceModule,
          ui: ui.length > 0 ? ui : void 0,
          color: (0, colors_1.isOfTypeColors)(display.color) ? display.color : void 0,
          icon: display.icon,
          expanded: display.expanded
        };
      }
      return;
    }
    __name(synthDisplay, "synthDisplay");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/index.js
var require_core3 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/index.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding2(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_app(), exports2);
    __exportStar(require_attributes(), exports2);
    __exportStar(require_connections(), exports2);
    __exportStar(require_dependency2(), exports2);
    __exportStar(require_inflight(), exports2);
    __exportStar(require_lifting(), exports2);
    __exportStar(require_tree(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js
var require_json = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MutJson = exports2.Json = void 0;
    var JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
    var core_1 = require_core3();
    var Json = class {
      static {
        __name(this, "Json");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      /**
       * Returns the keys from the Json.
       *
       * @macro Object.keys($args$)
       *
       * @param json map to get the keys from
       * @returns the keys as Array<String>
       */
      static keys(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Returns the values from the Json.
       *
       * @macro Object.values($args$)
       *
       * @param json map to get the values from
       * @returns the values as Array<Json>
       */
      static values(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Returns the entries from the Json.
       *
       * @param json map to get the entries from
       * @returns the entries as Array<JsonEntry>
       */
      static entries(json) {
        return Object.entries(json).map(([key, value]) => ({ key, value }));
      }
      /**
       * Deletes a key in a given Json
       *
       * @macro ((json, key) => { delete json[key]; })($args$)
       *
       * @param json to delete key from
       * @param key the key to delete
       */
      static delete(json, key) {
        json;
        key;
        throw new Error("Macro");
      }
      /**
       * Formats Json as string
       *
       * @macro ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })($args$)
       *
       * @param json to format as string
       * @returns string representation of the Json
       */
      static stringify(json, options) {
        json;
        options;
        throw new Error("Macro");
      }
      /**
       * Creates an immutable deep copy of the Json.
       *
       * @macro JSON.parse(JSON.stringify($args$))
       *
       * @param json to copy
       * @returns the immutable copy of the Json
       */
      static deepCopy(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Creates a mutable deep copy of the Json.
       *
       * @macro JSON.parse(JSON.stringify($args$))
       *
       * @param json to copy
       * @returns the mutable copy of the Json
       */
      static deepCopyMut(json) {
        json;
        throw new Error("Macro");
      }
      /**
       * Parse a string into a Json
       *
       * @macro JSON.parse($args$)
       *
       * @param str to parse as Json
       * @returns Json representation of the string
       */
      static parse(str) {
        str;
        throw new Error("Macro");
      }
      /**
       * Try to parse a string into a Json
       *
       * @macro ((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })($args$)
       *
       * @param str to parse as Json
       * @returns Json representation of the string or undefined if string is not parsable
       */
      static tryParse(str) {
        str;
        throw new Error("Macro");
      }
      constructor() {
      }
      /**
       * Checks if a Json object has a given key
       *
       * @macro ((obj, key) => { return obj.hasOwnProperty(key); })($self$,$args$)
       *
       * @param key The key to check
       * @returns Boolean value corresponding to whether the key exists
       */
      has(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Returns the value associated with the specified Json key
       *
       * @macro ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })($self$, $args$)
       *
       * @param key The key of the Json property
       * @returns The value associated with the specified Json key
       * @throws Json property does not exist if the given key is not part of an existing property
       */
      get(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Returns a specified element at a given index from Json Array
       *
       * @macro ((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })($self$, $args$)
       *
       * @param index The index of the element in the Json Array to return
       * @returns The element at given index in Json Array
       * @throws index out of bounds error if the given index does not exist for the Json Array
       */
      getAt(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Optionally returns an specified element from the Json.
       *
       * @macro ($self$)?.[$args$]
       *
       * @param key The key of the element to return
       * @returns The element associated with the specified key, or undefined if the key can't be found
       */
      tryGet(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Optionally returns a specified element at a given index from Json Array
       *
       * @macro ($self$)?.[$args$]
       *
       * @param index The index of the element in the Json Array to return
       * @returns The element at given index in Json Array, or undefined if index is not valid
       */
      tryGetAt(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Convert Json element to string if possible.
       *
       * @macro ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })($self$)
       *
       * @returns a string.
       */
      asStr() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to string if possible.
       *
       * @macro ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
       *
       * @returns a string.
       */
      tryAsStr() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to number if possible.
       *
       * @macro ((arg) => { if (typeof arg !== "number") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a number")}; return JSON.parse(JSON.stringify(arg)) })($self$)
       *
       * @returns a number.
       */
      asNum() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to number if possible.
       *
       * @macro ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
       *
       * @returns a number.
       */
      tryAsNum() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to boolean if possible.
       *
       * @macro ((arg) => { if (typeof arg !== "boolean") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a boolean")}; return JSON.parse(JSON.stringify(arg)) })($self$)
       *
       * @returns a boolean.
       */
      asBool() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to boolean if possible.
       *
       * @macro ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
       *
       * @returns a boolean.
       */
      tryAsBool() {
        throw new Error("Macro");
      }
    };
    exports2.Json = Json;
    _a = JSII_RTTI_SYMBOL_1;
    Json[_a] = { fqn: "@winglang/sdk.std.Json", version: "0.0.0" };
    var MutJson = class {
      static {
        __name(this, "MutJson");
      }
      /**
       * @internal
       */
      static _toInflightType() {
        return core_1.InflightClient.forType(__filename, this.name);
      }
      constructor() {
      }
      /**
       * Returns the value associated with the specified Json key
       *
       * @macro ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })($self$, $args$)
       *
       * @param key The key of the Json property
       * @returns The value associated with the specified Json key
       * @throws Json property does not exist if the given key is not part of an existing property
       */
      get(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Returns a specified element at a given index from MutJson Array
       *
       * @macro ((obj, args) => { if (obj[args] === undefined) throw new Error("Index out of bounds"); return obj[args] })($self$, $args$)
       *
       * @param index The index of the element in the MutJson Array to return
       * @returns The element at given index in MutJson Array
       * @throws index out of bounds error if the given index does not exist for the MutJson Array
       */
      getAt(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Adds or updates an element in MutJson with a specific key and value
       *
       * @macro ((obj, key, value) => { obj[key] = value; })($self$, $args$)
       *
       * @param key The key of the element to add
       * @param value The value of the element to add
       */
      set(key, value) {
        key;
        value;
        throw new Error("Macro");
      }
      /**
       * Set element in MutJson Array with a specific key and value
       *
       * @macro ((obj, idx, value) => { obj[idx] = value; })($self$, $args$)
       *
       * @param value The value of the element to set
       */
      setAt(index, value) {
        index;
        value;
        throw new Error("Macro");
      }
      /**
       * Optionally returns an specified element from the Json.
       *
       * @macro ($self$)?.[$args$]
       *
       * @param key The key of the element to return
       * @returns The element associated with the specified key, or undefined if the key can't be found
       */
      tryGet(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Optionally returns a specified element at a given index from Json Array
       *
       * @macro ($self$)?.[$args$]
       *
       * @param index The index of the element in the Json Array to return
       * @returns The element at given index in Json Array, or undefined if index is not valid
       */
      tryGetAt(index) {
        index;
        throw new Error("Macro");
      }
      /**
       * Convert Json element to string if possible.
       *
       * @macro ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })($self$)
       *
       * @returns a string.
       */
      asStr() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to string if possible.
       *
       * @macro ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
       *
       * @returns a string.
       */
      tryAsStr() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to number if possible.
       *
       * @macro ((arg) => { if (typeof arg !== "number") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a number")}; return JSON.parse(JSON.stringify(arg)) })($self$)
       *
       * @returns a number.
       */
      asNum() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to number if possible.
       *
       * @macro ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
       *
       * @returns a number.
       */
      tryAsNum() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to boolean if possible.
       *
       * @macro ((arg) => { if (typeof arg !== "boolean") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a boolean")}; return JSON.parse(JSON.stringify(arg)) })($self$)
       *
       * @returns a boolean.
       */
      asBool() {
        throw new Error("Macro");
      }
      /**
       * Convert Json element to boolean if possible.
       *
       * @macro ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
       *
       * @returns a boolean.
       */
      tryAsBool() {
        throw new Error("Macro");
      }
      /**
       * Removes the specified element from a map.
       *
       * @macro (delete ($self$)[$args$])
       *
       * @param key The key
       * @returns true if the given key is no longer present
       */
      delete(key) {
        key;
        throw new Error("Macro");
      }
      /**
       * Checks if a Json object has a given key
       *
       * @macro ((obj, key) => { return obj.hasOwnProperty(key); })($self$,$args$)
       *
       * @param key The key to check
       * @returns Boolean value corresponding to whether the key exists
       */
      has(key) {
        key;
        throw new Error("Macro");
      }
    };
    exports2.MutJson = MutJson;
    _b = JSII_RTTI_SYMBOL_1;
    MutJson[_b] = { fqn: "@winglang/sdk.std.MutJson", version: "0.0.0" };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/simulator/serialization.js
var require_serialization = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/simulator/serialization.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deserialize = exports2.serialize = void 0;
    var datetime_1 = require_datetime();
    function serialize(input) {
      return JSON.stringify(input, (_key, value) => {
        if (value instanceof datetime_1.Datetime) {
          return {
            $kind: "datetime",
            day: value.dayOfMonth,
            hour: value.hours,
            min: value.min,
            month: value.month,
            sec: value.sec,
            year: value.year,
            ms: value.ms,
            tz: value.timezone
          };
        }
        return value;
      });
    }
    __name(serialize, "serialize");
    exports2.serialize = serialize;
    function deserialize(input) {
      return JSON.parse(input, (_key, value) => {
        if (value === null) {
          return void 0;
        }
        if (value.$kind === "datetime") {
          return datetime_1.Datetime.fromComponents({
            day: value.day,
            hour: value.hour,
            min: value.min,
            month: value.month,
            sec: value.sec,
            year: value.year,
            ms: value.ms,
            tz: value.tz
          });
        }
        return value;
      });
    }
    __name(deserialize, "deserialize");
    exports2.deserialize = deserialize;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/simulator/client.js
var require_client = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/simulator/client.js"(exports2) {
    "use strict";
    var __createBinding2 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault2 = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar2 = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding2(result, mod, k);
      }
      __setModuleDefault2(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeSimulatorClient = void 0;
    var http = __importStar2(require("http"));
    var serialization_1 = require_serialization();
    function makeHttpRequest(options) {
      return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            resolve(data);
          });
        });
        req.on("error", (e) => {
          reject(e);
        });
        if (options.body !== void 0) {
          req.write(options.body);
        }
        req.end();
      });
    }
    __name(makeHttpRequest, "makeHttpRequest");
    function makeSimulatorClient(url, handle, caller) {
      let proxy;
      let hasThenMethod = true;
      const get = /* @__PURE__ */ __name((_target, method, _receiver) => {
        if (method === "then" && !hasThenMethod) {
          return void 0;
        }
        return async function(...args) {
          const body = { caller, handle, method, args };
          const parsedUrl = new URL(url);
          const resp = await makeHttpRequest({
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: "/v1/call",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
          let parsed = (0, serialization_1.deserialize)(resp);
          if (parsed.error) {
            if (method === "then" && parsed.error?.message?.startsWith('Method "then" not found on resource')) {
              hasThenMethod = false;
              return args[0](proxy);
            }
            let err = new Error();
            err.message = parsed.error?.message;
            err.name = parsed.error?.name;
            if (parsed.error?.stack) {
              err.stack = `${parsed.error.stack}
${err.stack}`;
            }
            throw err;
          }
          return parsed.result;
        };
      }, "get");
      proxy = new Proxy({}, { get });
      return proxy;
    }
    __name(makeSimulatorClient, "makeSimulatorClient");
    exports2.makeSimulatorClient = makeSimulatorClient;
  }
});

// target/main.wsim/.wing/onrequesthandler2_c8f0849b.sandbox.cjs
var $handler = void 0;
exports.handler = async function(event) {
  $handler = $handler ?? await (async () => {
    const $func = /* @__PURE__ */ __name(async (ctx, event2) => {
      if (!event2) {
        throw new Error("invalid API request event");
      }
      let req = JSON.parse(event2);
      const response = await ctx.handler(req);
      if (!response) {
        return void 0;
      } else {
        return JSON.stringify(response);
      }
    }, "$func");
    const $ctx = {
      handler: await (async () => {
        const $Closure3Client = require_inflight_Closure3_1()({
          $std_Json: require_json().Json,
          $tasks: function() {
            let handle = process.env.TABLE_HANDLE_3ff47b20;
            if (!handle) {
              throw new Error("Missing environment variable: TABLE_HANDLE_3ff47b20");
            }
            const simulatorUrl = process.env.WING_SIMULATOR_URL;
            if (!simulatorUrl) {
              throw new Error("Missing environment variable: WING_SIMULATOR_URL");
            }
            const caller = process.env.WING_SIMULATOR_CALLER;
            if (!caller) {
              throw new Error("Missing environment variable: WING_SIMULATOR_CALLER");
            }
            return require_client().makeSimulatorClient(simulatorUrl, handle, caller);
          }()
        });
        const client = new $Closure3Client({});
        if (client.$inflight_init) {
          await client.$inflight_init();
        }
        return client;
      })()
    };
    let newFunction = /* @__PURE__ */ __name(async (...args) => {
      return $func($ctx, ...args);
    }, "newFunction");
    newFunction.handle = newFunction;
    return newFunction;
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
/*! Bundled license information:

uri-js/dist/es5/uri.all.js:
  (** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js *)
*/
//# sourceMappingURL=index.cjs.map
