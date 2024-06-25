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

// target/test/main.wsim/.wing/inflight.$Closure6-1.cjs
var require_inflight_Closure6_1 = __commonJS({
  "target/test/main.wsim/.wing/inflight.$Closure6-1.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({ $Utils, $counter, $templates }) {
      class $Closure6 {
        static {
          __name(this, "$Closure6");
        }
        constructor({}) {
          const $obj = /* @__PURE__ */ __name((...args) => this.handle(...args), "$obj");
          Object.setPrototypeOf($obj, this);
          return $obj;
        }
        async handle(req) {
          const count = await $counter.inc();
          const rendered = await $Utils.render(await $templates.get("index.html"), count);
          return { "status": 200, "headers": { ["Content-Type"]: "text/html" }, "body": rendered };
        }
      }
      return $Closure6;
    };
  }
});

// node_modules/handlebars/dist/cjs/handlebars/utils.js
var require_utils = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/utils.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.extend = extend;
    exports2.indexOf = indexOf;
    exports2.escapeExpression = escapeExpression;
    exports2.isEmpty = isEmpty;
    exports2.createFrame = createFrame;
    exports2.blockParams = blockParams;
    exports2.appendContextPath = appendContextPath;
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    var badChars = /[&<>"'`=]/g;
    var possible = /[&<>"'`=]/;
    function escapeChar(chr) {
      return escape[chr];
    }
    __name(escapeChar, "escapeChar");
    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
    __name(extend, "extend");
    var toString = Object.prototype.toString;
    exports2.toString = toString;
    var isFunction = /* @__PURE__ */ __name(function isFunction2(value) {
      return typeof value === "function";
    }, "isFunction");
    if (isFunction(/x/)) {
      exports2.isFunction = isFunction = /* @__PURE__ */ __name(function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]";
      }, "isFunction");
    }
    exports2.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
    };
    exports2.isArray = isArray;
    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
    __name(indexOf, "indexOf");
    function escapeExpression(string) {
      if (typeof string !== "string") {
        if (string && string.toHTML) {
          return string.toHTML();
        } else if (string == null) {
          return "";
        } else if (!string) {
          return string + "";
        }
        string = "" + string;
      }
      if (!possible.test(string)) {
        return string;
      }
      return string.replace(badChars, escapeChar);
    }
    __name(escapeExpression, "escapeExpression");
    function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    __name(isEmpty, "isEmpty");
    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame;
    }
    __name(createFrame, "createFrame");
    function blockParams(params, ids) {
      params.path = ids;
      return params;
    }
    __name(blockParams, "blockParams");
    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id;
    }
    __name(appendContextPath, "appendContextPath");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/exception.js
var require_exception = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/exception.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
    function Exception(message, node) {
      var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column;
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }
      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;
          if (Object.defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, "endColumn", {
              value: endColumn,
              enumerable: true
            });
          } else {
            this.column = column;
            this.endColumn = endColumn;
          }
        }
      } catch (nop) {
      }
    }
    __name(Exception, "Exception");
    Exception.prototype = new Error();
    exports2["default"] = Exception;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js
var require_block_helper_missing = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    exports2["default"] = function(instance) {
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse = options.inverse, fn = options.fn;
        if (context === true) {
          return fn(this);
        } else if (context === false || context == null) {
          return inverse(this);
        } else if (_utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name];
            }
            return instance.helpers.each(context, options);
          } else {
            return inverse(this);
          }
        } else {
          if (options.data && options.ids) {
            var data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
            options = { data };
          }
          return fn(context, options);
        }
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/each.js
var require_each = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/each.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("each", function(context, options) {
        if (!options) {
          throw new _exception2["default"]("Must pass iterator to #each");
        }
        var fn = options.fn, inverse = options.inverse, i = 0, ret = "", data = void 0, contextPath = void 0;
        if (options.data && options.ids) {
          contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        if (options.data) {
          data = _utils.createFrame(options.data);
        }
        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;
            if (contextPath) {
              data.contextPath = contextPath + field;
            }
          }
          ret = ret + fn(context[field], {
            data,
            blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
          });
        }
        __name(execIteration, "execIteration");
        if (context && typeof context === "object") {
          if (_utils.isArray(context)) {
            for (var j = context.length; i < j; i++) {
              if (i in context) {
                execIteration(i, i, i === context.length - 1);
              }
            }
          } else if (typeof Symbol === "function" && context[Symbol.iterator]) {
            var newContext = [];
            var iterator = context[Symbol.iterator]();
            for (var it = iterator.next(); !it.done; it = iterator.next()) {
              newContext.push(it.value);
            }
            context = newContext;
            for (var j = context.length; i < j; i++) {
              execIteration(i, i, i === context.length - 1);
            }
          } else {
            (function() {
              var priorKey = void 0;
              Object.keys(context).forEach(function(key) {
                if (priorKey !== void 0) {
                  execIteration(priorKey, i - 1);
                }
                priorKey = key;
                i++;
              });
              if (priorKey !== void 0) {
                execIteration(priorKey, i - 1, true);
              }
            })();
          }
        }
        if (i === 0) {
          ret = inverse(this);
        }
        return ret;
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js
var require_helper_missing = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return void 0;
        } else {
          throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
        }
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/if.js
var require_if = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/if.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("if", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#if requires exactly one argument");
        }
        if (_utils.isFunction(conditional)) {
          conditional = conditional.call(this);
        }
        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#unless requires exactly one argument");
        }
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        });
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/log.js
var require_log = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/log.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    exports2["default"] = function(instance) {
      instance.registerHelper("log", function() {
        var args = [void 0], options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i]);
        }
        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level;
        } else if (options.data && options.data.level != null) {
          level = options.data.level;
        }
        args[0] = level;
        instance.log.apply(instance, args);
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js
var require_lookup = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    exports2["default"] = function(instance) {
      instance.registerHelper("lookup", function(obj, field, options) {
        if (!obj) {
          return obj;
        }
        return options.lookupProperty(obj, field);
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/with.js
var require_with = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/with.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports2["default"] = function(instance) {
      instance.registerHelper("with", function(context, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#with requires exactly one argument");
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        var fn = options.fn;
        if (!_utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
          }
          return fn(context, {
            data,
            blockParams: _utils.blockParams([context], [data && data.contextPath])
          });
        } else {
          return options.inverse(this);
        }
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers.js
var require_helpers2 = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.registerDefaultHelpers = registerDefaultHelpers;
    exports2.moveHelperToHooks = moveHelperToHooks;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _helpersBlockHelperMissing = require_block_helper_missing();
    var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
    var _helpersEach = require_each();
    var _helpersEach2 = _interopRequireDefault(_helpersEach);
    var _helpersHelperMissing = require_helper_missing();
    var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
    var _helpersIf = require_if();
    var _helpersIf2 = _interopRequireDefault(_helpersIf);
    var _helpersLog = require_log();
    var _helpersLog2 = _interopRequireDefault(_helpersLog);
    var _helpersLookup = require_lookup();
    var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
    var _helpersWith = require_with();
    var _helpersWith2 = _interopRequireDefault(_helpersWith);
    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2["default"](instance);
      _helpersEach2["default"](instance);
      _helpersHelperMissing2["default"](instance);
      _helpersIf2["default"](instance);
      _helpersLog2["default"](instance);
      _helpersLookup2["default"](instance);
      _helpersWith2["default"](instance);
    }
    __name(registerDefaultHelpers, "registerDefaultHelpers");
    function moveHelperToHooks(instance, helperName, keepHelper) {
      if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) {
          delete instance.helpers[helperName];
        }
      }
    }
    __name(moveHelperToHooks, "moveHelperToHooks");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js
var require_inline = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    exports2["default"] = function(instance) {
      instance.registerDecorator("inline", function(fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
          props.partials = {};
          ret = /* @__PURE__ */ __name(function(context, options2) {
            var original = container.partials;
            container.partials = _utils.extend({}, original, props.partials);
            var ret2 = fn(context, options2);
            container.partials = original;
            return ret2;
          }, "ret");
        }
        props.partials[options.args[0]] = options.fn;
        return ret;
      });
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/decorators.js
var require_decorators = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/decorators.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.registerDefaultDecorators = registerDefaultDecorators;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _decoratorsInline = require_inline();
    var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
    function registerDefaultDecorators(instance) {
      _decoratorsInline2["default"](instance);
    }
    __name(registerDefaultDecorators, "registerDefaultDecorators");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/logger.js
var require_logger = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/logger.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    var logger = {
      methodMap: ["debug", "info", "warn", "error"],
      level: "info",
      // Maps a given level value to the `methodMap` indexes above.
      lookupLevel: /* @__PURE__ */ __name(function lookupLevel(level) {
        if (typeof level === "string") {
          var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap;
          } else {
            level = parseInt(level, 10);
          }
        }
        return level;
      }, "lookupLevel"),
      // Can be overridden in the host environment
      log: /* @__PURE__ */ __name(function log(level) {
        level = logger.lookupLevel(level);
        if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            method = "log";
          }
          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key];
          }
          console[method].apply(console, message);
        }
      }, "log")
    };
    exports2["default"] = logger;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js
var require_create_new_lookup_object = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.createNewLookupObject = createNewLookupObject;
    var _utils = require_utils();
    function createNewLookupObject() {
      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }
      return _utils.extend.apply(void 0, [/* @__PURE__ */ Object.create(null)].concat(sources));
    }
    __name(createNewLookupObject, "createNewLookupObject");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js
var require_proto_access = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.createProtoAccessControl = createProtoAccessControl;
    exports2.resultIsAllowed = resultIsAllowed;
    exports2.resetLoggedProperties = resetLoggedProperties;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _createNewLookupObject = require_create_new_lookup_object();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var loggedProperties = /* @__PURE__ */ Object.create(null);
    function createProtoAccessControl(runtimeOptions) {
      var defaultMethodWhiteList = /* @__PURE__ */ Object.create(null);
      defaultMethodWhiteList["constructor"] = false;
      defaultMethodWhiteList["__defineGetter__"] = false;
      defaultMethodWhiteList["__defineSetter__"] = false;
      defaultMethodWhiteList["__lookupGetter__"] = false;
      var defaultPropertyWhiteList = /* @__PURE__ */ Object.create(null);
      defaultPropertyWhiteList["__proto__"] = false;
      return {
        properties: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
          defaultValue: runtimeOptions.allowProtoPropertiesByDefault
        },
        methods: {
          whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
          defaultValue: runtimeOptions.allowProtoMethodsByDefault
        }
      };
    }
    __name(createProtoAccessControl, "createProtoAccessControl");
    function resultIsAllowed(result, protoAccessControl, propertyName) {
      if (typeof result === "function") {
        return checkWhiteList(protoAccessControl.methods, propertyName);
      } else {
        return checkWhiteList(protoAccessControl.properties, propertyName);
      }
    }
    __name(resultIsAllowed, "resultIsAllowed");
    function checkWhiteList(protoAccessControlForType, propertyName) {
      if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
        return protoAccessControlForType.whitelist[propertyName] === true;
      }
      if (protoAccessControlForType.defaultValue !== void 0) {
        return protoAccessControlForType.defaultValue;
      }
      logUnexpecedPropertyAccessOnce(propertyName);
      return false;
    }
    __name(checkWhiteList, "checkWhiteList");
    function logUnexpecedPropertyAccessOnce(propertyName) {
      if (loggedProperties[propertyName] !== true) {
        loggedProperties[propertyName] = true;
        _logger2["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
      }
    }
    __name(logUnexpecedPropertyAccessOnce, "logUnexpecedPropertyAccessOnce");
    function resetLoggedProperties() {
      Object.keys(loggedProperties).forEach(function(propertyName) {
        delete loggedProperties[propertyName];
      });
    }
    __name(resetLoggedProperties, "resetLoggedProperties");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/base.js
var require_base = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/base.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.HandlebarsEnvironment = HandlebarsEnvironment;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _utils = require_utils();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _helpers = require_helpers2();
    var _decorators = require_decorators();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var _internalProtoAccess = require_proto_access();
    var VERSION = "4.7.8";
    exports2.VERSION = VERSION;
    var COMPILER_REVISION = 8;
    exports2.COMPILER_REVISION = COMPILER_REVISION;
    var LAST_COMPATIBLE_COMPILER_REVISION = 7;
    exports2.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      // 1.0.rc.2 is actually rev2 but doesn't report it
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0 <4.3.0",
      8: ">= 4.3.0"
    };
    exports2.REVISION_CHANGES = REVISION_CHANGES;
    var objectType = "[object Object]";
    function HandlebarsEnvironment(helpers, partials, decorators) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators || {};
      _helpers.registerDefaultHelpers(this);
      _decorators.registerDefaultDecorators(this);
    }
    __name(HandlebarsEnvironment, "HandlebarsEnvironment");
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: _logger2["default"],
      log: _logger2["default"].log,
      registerHelper: /* @__PURE__ */ __name(function registerHelper(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple helpers");
          }
          _utils.extend(this.helpers, name);
        } else {
          this.helpers[name] = fn;
        }
      }, "registerHelper"),
      unregisterHelper: /* @__PURE__ */ __name(function unregisterHelper(name) {
        delete this.helpers[name];
      }, "unregisterHelper"),
      registerPartial: /* @__PURE__ */ __name(function registerPartial(name, partial) {
        if (_utils.toString.call(name) === objectType) {
          _utils.extend(this.partials, name);
        } else {
          if (typeof partial === "undefined") {
            throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
          }
          this.partials[name] = partial;
        }
      }, "registerPartial"),
      unregisterPartial: /* @__PURE__ */ __name(function unregisterPartial(name) {
        delete this.partials[name];
      }, "unregisterPartial"),
      registerDecorator: /* @__PURE__ */ __name(function registerDecorator(name, fn) {
        if (_utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2["default"]("Arg not supported with multiple decorators");
          }
          _utils.extend(this.decorators, name);
        } else {
          this.decorators[name] = fn;
        }
      }, "registerDecorator"),
      unregisterDecorator: /* @__PURE__ */ __name(function unregisterDecorator(name) {
        delete this.decorators[name];
      }, "unregisterDecorator"),
      /**
       * Reset the memory of illegal property accesses that have already been logged.
       * @deprecated should only be used in handlebars test-cases
       */
      resetLoggedPropertyAccesses: /* @__PURE__ */ __name(function resetLoggedPropertyAccesses() {
        _internalProtoAccess.resetLoggedProperties();
      }, "resetLoggedPropertyAccesses")
    };
    var log = _logger2["default"].log;
    exports2.log = log;
    exports2.createFrame = _utils.createFrame;
    exports2.logger = _logger2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/safe-string.js
var require_safe_string = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/safe-string.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function SafeString(string) {
      this.string = string;
    }
    __name(SafeString, "SafeString");
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string;
    };
    exports2["default"] = SafeString;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js
var require_wrapHelper = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.wrapHelper = wrapHelper;
    function wrapHelper(helper, transformOptionsFn) {
      if (typeof helper !== "function") {
        return helper;
      }
      var wrapper = /* @__PURE__ */ __name(function wrapper2() {
        var options = arguments[arguments.length - 1];
        arguments[arguments.length - 1] = transformOptionsFn(options);
        return helper.apply(this, arguments);
      }, "wrapper");
      return wrapper;
    }
    __name(wrapHelper, "wrapHelper");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/runtime.js
var require_runtime = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/runtime.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.checkRevision = checkRevision;
    exports2.template = template;
    exports2.wrapProgram = wrapProgram;
    exports2.resolvePartial = resolvePartial;
    exports2.invokePartial = invokePartial;
    exports2.noop = noop;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    __name(_interopRequireWildcard, "_interopRequireWildcard");
    var _utils = require_utils();
    var Utils = _interopRequireWildcard(_utils);
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _base = require_base();
    var _helpers = require_helpers2();
    var _internalWrapHelper = require_wrapHelper();
    var _internalProtoAccess = require_proto_access();
    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
      if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
        return;
      }
      if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
        var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
        throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
      } else {
        throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
      }
    }
    __name(checkRevision, "checkRevision");
    function template(templateSpec, env) {
      if (!env) {
        throw new _exception2["default"]("No environment passed to template");
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
      }
      templateSpec.main.decorator = templateSpec.main_d;
      env.VM.checkRevision(templateSpec.compiler);
      var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true;
          }
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);
        var extendedOptions = Utils.extend({}, options, {
          hooks: this.hooks,
          protoAccessControl: this.protoAccessControl
        });
        var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, extendedOptions);
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break;
              }
              lines[i] = options.indent + lines[i];
            }
            result = lines.join("\n");
          }
          return result;
        } else {
          throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
        }
      }
      __name(invokePartialWrapper, "invokePartialWrapper");
      var container = {
        strict: /* @__PURE__ */ __name(function strict(obj, name, loc) {
          if (!obj || !(name in obj)) {
            throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
              loc
            });
          }
          return container.lookupProperty(obj, name);
        }, "strict"),
        lookupProperty: /* @__PURE__ */ __name(function lookupProperty(parent, propertyName) {
          var result = parent[propertyName];
          if (result == null) {
            return result;
          }
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return result;
          }
          if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
            return result;
          }
          return void 0;
        }, "lookupProperty"),
        lookup: /* @__PURE__ */ __name(function lookup2(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            var result = depths[i] && container.lookupProperty(depths[i], name);
            if (result != null) {
              return depths[i][name];
            }
          }
        }, "lookup"),
        lambda: /* @__PURE__ */ __name(function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current;
        }, "lambda"),
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: /* @__PURE__ */ __name(function fn(i) {
          var ret2 = templateSpec[i];
          ret2.decorator = templateSpec[i + "_d"];
          return ret2;
        }, "fn"),
        programs: [],
        program: /* @__PURE__ */ __name(function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i], fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn);
          }
          return programWrapper;
        }, "program"),
        data: /* @__PURE__ */ __name(function data(value, depth) {
          while (value && depth--) {
            value = value._parent;
          }
          return value;
        }, "data"),
        mergeIfNeeded: /* @__PURE__ */ __name(function mergeIfNeeded(param, common) {
          var obj = param || common;
          if (param && common && param !== common) {
            obj = Utils.extend({}, common, param);
          }
          return obj;
        }, "mergeIfNeeded"),
        // An empty object to use as replacement for null-contexts
        nullContext: Object.seal({}),
        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };
      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data);
        }
        var depths = void 0, blockParams = templateSpec.useBlockParams ? [] : void 0;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
          } else {
            depths = [context];
          }
        }
        function main(context2) {
          return "" + templateSpec.main(container, context2, container.helpers, container.partials, data, blockParams, depths);
        }
        __name(main, "main");
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options);
      }
      __name(ret, "ret");
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
          wrapHelpersToPassLookupProperty(mergedHelpers, container);
          container.helpers = mergedHelpers;
          if (templateSpec.usePartial) {
            container.partials = container.mergeIfNeeded(options.partials, env.partials);
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = Utils.extend({}, env.decorators, options.decorators);
          }
          container.hooks = {};
          container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
          var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
          _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
          _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
        } else {
          container.protoAccessControl = options.protoAccessControl;
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators;
          container.hooks = options.hooks;
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2["default"]("must pass block params");
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2["default"]("must pass parent depths");
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
      };
      return ret;
    }
    __name(template, "template");
    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths);
        }
        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
      }
      __name(prog, "prog");
      prog = executeDecorators(fn, prog, container, depths, data, blockParams);
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog;
    }
    __name(wrapProgram, "wrapProgram");
    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === "@partial-block") {
          partial = options.data["partial-block"];
        } else {
          partial = options.partials[options.name];
        }
      } else if (!partial.call && !options.name) {
        options.name = partial;
        partial = options.partials[partial];
      }
      return partial;
    }
    __name(resolvePartial, "resolvePartial");
    function invokePartial(partial, context, options) {
      var currentPartialBlock = options.data && options.data["partial-block"];
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath;
      }
      var partialBlock = void 0;
      if (options.fn && options.fn !== noop) {
        (function() {
          options.data = _base.createFrame(options.data);
          var fn = options.fn;
          partialBlock = options.data["partial-block"] = /* @__PURE__ */ __name(function partialBlockWrapper(context2) {
            var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
            options2.data = _base.createFrame(options2.data);
            options2.data["partial-block"] = currentPartialBlock;
            return fn(context2, options2);
          }, "partialBlockWrapper");
          if (fn.partials) {
            options.partials = Utils.extend({}, options.partials, fn.partials);
          }
        })();
      }
      if (partial === void 0 && partialBlock) {
        partial = partialBlock;
      }
      if (partial === void 0) {
        throw new _exception2["default"]("The partial " + options.name + " could not be found");
      } else if (partial instanceof Function) {
        return partial(context, options);
      }
    }
    __name(invokePartial, "invokePartial");
    function noop() {
      return "";
    }
    __name(noop, "noop");
    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _base.createFrame(data) : {};
        data.root = context;
      }
      return data;
    }
    __name(initData, "initData");
    function executeDecorators(fn, prog, container, depths, data, blockParams) {
      if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props);
      }
      return prog;
    }
    __name(executeDecorators, "executeDecorators");
    function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
      Object.keys(mergedHelpers).forEach(function(helperName) {
        var helper = mergedHelpers[helperName];
        mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
      });
    }
    __name(wrapHelpersToPassLookupProperty, "wrapHelpersToPassLookupProperty");
    function passLookupPropertyOption(helper, container) {
      var lookupProperty = container.lookupProperty;
      return _internalWrapHelper.wrapHelper(helper, function(options) {
        return Utils.extend({ lookupProperty }, options);
      });
    }
    __name(passLookupPropertyOption, "passLookupPropertyOption");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/no-conflict.js
var require_no_conflict = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/no-conflict.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    exports2["default"] = function(Handlebars) {
      (function() {
        if (typeof globalThis === "object")
          return;
        Object.prototype.__defineGetter__("__magic__", function() {
          return this;
        });
        __magic__.globalThis = __magic__;
        delete Object.prototype.__magic__;
      })();
      var $Handlebars = globalThis.Handlebars;
      Handlebars.noConflict = function() {
        if (globalThis.Handlebars === Handlebars) {
          globalThis.Handlebars = $Handlebars;
        }
        return Handlebars;
      };
    };
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars.runtime.js
var require_handlebars_runtime = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars.runtime.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    __name(_interopRequireWildcard, "_interopRequireWildcard");
    var _handlebarsBase = require_base();
    var base = _interopRequireWildcard(_handlebarsBase);
    var _handlebarsSafeString = require_safe_string();
    var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
    var _handlebarsException = require_exception();
    var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
    var _handlebarsUtils = require_utils();
    var Utils = _interopRequireWildcard(_handlebarsUtils);
    var _handlebarsRuntime = require_runtime();
    var runtime = _interopRequireWildcard(_handlebarsRuntime);
    var _handlebarsNoConflict = require_no_conflict();
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    function create() {
      var hb = new base.HandlebarsEnvironment();
      Utils.extend(hb, base);
      hb.SafeString = _handlebarsSafeString2["default"];
      hb.Exception = _handlebarsException2["default"];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;
      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb);
      };
      return hb;
    }
    __name(create, "create");
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst["default"] = inst;
    exports2["default"] = inst;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/ast.js
var require_ast = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/ast.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var AST = {
      // Public API used to evaluate derived attributes regarding AST nodes
      helpers: {
        // a mustache is definitely a helper if:
        // * it is an eligible helper, and
        // * it has at least one parameter or hash segment
        helperExpression: /* @__PURE__ */ __name(function helperExpression(node) {
          return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
        }, "helperExpression"),
        scopedId: /* @__PURE__ */ __name(function scopedId(path2) {
          return /^\.|this\b/.test(path2.original);
        }, "scopedId"),
        // an ID is simple if it only has one part, and that part is not
        // `..` or `this`.
        simpleId: /* @__PURE__ */ __name(function simpleId(path2) {
          return path2.parts.length === 1 && !AST.helpers.scopedId(path2) && !path2.depth;
        }, "simpleId")
      }
    };
    exports2["default"] = AST;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/parser.js
var require_parser = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/parser.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var handlebars = function() {
      var parser = {
        trace: /* @__PURE__ */ __name(function trace() {
        }, "trace"),
        yy: {},
        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
        performAction: /* @__PURE__ */ __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return $$[$0 - 1];
              break;
            case 2:
              this.$ = yy.prepareProgram($$[$0]);
              break;
            case 3:
              this.$ = $$[$0];
              break;
            case 4:
              this.$ = $$[$0];
              break;
            case 5:
              this.$ = $$[$0];
              break;
            case 6:
              this.$ = $$[$0];
              break;
            case 7:
              this.$ = $$[$0];
              break;
            case 8:
              this.$ = $$[$0];
              break;
            case 9:
              this.$ = {
                type: "CommentStatement",
                value: yy.stripComment($$[$0]),
                strip: yy.stripFlags($$[$0], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 10:
              this.$ = {
                type: "ContentStatement",
                original: $$[$0],
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 11:
              this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 12:
              this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
              break;
            case 13:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
              break;
            case 14:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
              break;
            case 15:
              this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 16:
              this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 17:
              this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 18:
              this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
              break;
            case 19:
              var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
              program.chained = true;
              this.$ = { strip: $$[$0 - 2].strip, program, chain: true };
              break;
            case 20:
              this.$ = $$[$0];
              break;
            case 21:
              this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
              break;
            case 22:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 23:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 24:
              this.$ = {
                type: "PartialStatement",
                name: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                indent: "",
                strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 25:
              this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 26:
              this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
              break;
            case 27:
              this.$ = $$[$0];
              break;
            case 28:
              this.$ = $$[$0];
              break;
            case 29:
              this.$ = {
                type: "SubExpression",
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                loc: yy.locInfo(this._$)
              };
              break;
            case 30:
              this.$ = { type: "Hash", pairs: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 31:
              this.$ = { type: "HashPair", key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 32:
              this.$ = yy.id($$[$0 - 1]);
              break;
            case 33:
              this.$ = $$[$0];
              break;
            case 34:
              this.$ = $$[$0];
              break;
            case 35:
              this.$ = { type: "StringLiteral", value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 36:
              this.$ = { type: "NumberLiteral", value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
              break;
            case 37:
              this.$ = { type: "BooleanLiteral", value: $$[$0] === "true", original: $$[$0] === "true", loc: yy.locInfo(this._$) };
              break;
            case 38:
              this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: yy.locInfo(this._$) };
              break;
            case 39:
              this.$ = { type: "NullLiteral", original: null, value: null, loc: yy.locInfo(this._$) };
              break;
            case 40:
              this.$ = $$[$0];
              break;
            case 41:
              this.$ = $$[$0];
              break;
            case 42:
              this.$ = yy.preparePath(true, $$[$0], this._$);
              break;
            case 43:
              this.$ = yy.preparePath(false, $$[$0], this._$);
              break;
            case 44:
              $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });
              this.$ = $$[$0 - 2];
              break;
            case 45:
              this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
              break;
            case 46:
              this.$ = [];
              break;
            case 47:
              $$[$0 - 1].push($$[$0]);
              break;
            case 48:
              this.$ = [];
              break;
            case 49:
              $$[$0 - 1].push($$[$0]);
              break;
            case 50:
              this.$ = [];
              break;
            case 51:
              $$[$0 - 1].push($$[$0]);
              break;
            case 58:
              this.$ = [];
              break;
            case 59:
              $$[$0 - 1].push($$[$0]);
              break;
            case 64:
              this.$ = [];
              break;
            case 65:
              $$[$0 - 1].push($$[$0]);
              break;
            case 70:
              this.$ = [];
              break;
            case 71:
              $$[$0 - 1].push($$[$0]);
              break;
            case 78:
              this.$ = [];
              break;
            case 79:
              $$[$0 - 1].push($$[$0]);
              break;
            case 82:
              this.$ = [];
              break;
            case 83:
              $$[$0 - 1].push($$[$0]);
              break;
            case 86:
              this.$ = [];
              break;
            case 87:
              $$[$0 - 1].push($$[$0]);
              break;
            case 90:
              this.$ = [];
              break;
            case 91:
              $$[$0 - 1].push($$[$0]);
              break;
            case 94:
              this.$ = [];
              break;
            case 95:
              $$[$0 - 1].push($$[$0]);
              break;
            case 98:
              this.$ = [$$[$0]];
              break;
            case 99:
              $$[$0 - 1].push($$[$0]);
              break;
            case 100:
              this.$ = [$$[$0]];
              break;
            case 101:
              $$[$0 - 1].push($$[$0]);
              break;
          }
        }, "anonymous"),
        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
        parseError: /* @__PURE__ */ __name(function parseError(str, hash) {
          throw new Error(str);
        }, "parseError"),
        parse: /* @__PURE__ */ __name(function parse(input) {
          var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined")
            this.lexer.yylloc = {};
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);
          var ranges = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function")
            this.parseError = this.yy.parseError;
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          __name(popStack, "popStack");
          function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
              token = self.symbols_[token] || token;
            }
            return token;
          }
          __name(lex, "lex");
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                expected = [];
                for (p in table[state])
                  if (this.terminals_[p] && p > 2) {
                    expected.push("'" + this.terminals_[p] + "'");
                  }
                if (this.lexer.showPosition) {
                  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected });
              }
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                    recovering--;
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                if (typeof r !== "undefined") {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }, "parse")
      };
      var lexer = function() {
        var lexer2 = {
          EOF: 1,
          parseError: /* @__PURE__ */ __name(function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          }, "parseError"),
          setInput: /* @__PURE__ */ __name(function setInput(input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
            if (this.options.ranges)
              this.yylloc.range = [0, 0];
            this.offset = 0;
            return this;
          }, "setInput"),
          input: /* @__PURE__ */ __name(function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges)
              this.yylloc.range[1]++;
            this._input = this._input.slice(1);
            return ch;
          }, "input"),
          unput: /* @__PURE__ */ __name(function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1)
              this.yylineno -= lines.length - 1;
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            return this;
          }, "unput"),
          more: /* @__PURE__ */ __name(function more() {
            this._more = true;
            return this;
          }, "more"),
          less: /* @__PURE__ */ __name(function less(n) {
            this.unput(this.match.slice(n));
          }, "less"),
          pastInput: /* @__PURE__ */ __name(function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          }, "pastInput"),
          upcomingInput: /* @__PURE__ */ __name(function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          }, "upcomingInput"),
          showPosition: /* @__PURE__ */ __name(function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          }, "showPosition"),
          next: /* @__PURE__ */ __name(function next() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input)
              this.done = true;
            var token, match, tempMatch, index, col, lines;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex)
                  break;
              }
            }
            if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines)
                this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input)
                this.done = false;
              if (token)
                return token;
              else
                return;
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
            }
          }, "next"),
          lex: /* @__PURE__ */ __name(function lex() {
            var r = this.next();
            if (typeof r !== "undefined") {
              return r;
            } else {
              return this.lex();
            }
          }, "lex"),
          begin: /* @__PURE__ */ __name(function begin(condition) {
            this.conditionStack.push(condition);
          }, "begin"),
          popState: /* @__PURE__ */ __name(function popState() {
            return this.conditionStack.pop();
          }, "popState"),
          _currentRules: /* @__PURE__ */ __name(function _currentRules() {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          }, "_currentRules"),
          topState: /* @__PURE__ */ __name(function topState() {
            return this.conditionStack[this.conditionStack.length - 2];
          }, "topState"),
          pushState: /* @__PURE__ */ __name(function begin(condition) {
            this.begin(condition);
          }, "begin")
        };
        lexer2.options = {};
        lexer2.performAction = /* @__PURE__ */ __name(function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          function strip(start, end) {
            return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
          }
          __name(strip, "strip");
          var YYSTATE = YY_START;
          switch ($avoiding_name_collisions) {
            case 0:
              if (yy_.yytext.slice(-2) === "\\\\") {
                strip(0, 1);
                this.begin("mu");
              } else if (yy_.yytext.slice(-1) === "\\") {
                strip(0, 1);
                this.begin("emu");
              } else {
                this.begin("mu");
              }
              if (yy_.yytext)
                return 15;
              break;
            case 1:
              return 15;
              break;
            case 2:
              this.popState();
              return 15;
              break;
            case 3:
              this.begin("raw");
              return 15;
              break;
            case 4:
              this.popState();
              if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                return 15;
              } else {
                strip(5, 9);
                return "END_RAW_BLOCK";
              }
              break;
            case 5:
              return 15;
              break;
            case 6:
              this.popState();
              return 14;
              break;
            case 7:
              return 65;
              break;
            case 8:
              return 68;
              break;
            case 9:
              return 19;
              break;
            case 10:
              this.popState();
              this.begin("raw");
              return 23;
              break;
            case 11:
              return 55;
              break;
            case 12:
              return 60;
              break;
            case 13:
              return 29;
              break;
            case 14:
              return 47;
              break;
            case 15:
              this.popState();
              return 44;
              break;
            case 16:
              this.popState();
              return 44;
              break;
            case 17:
              return 34;
              break;
            case 18:
              return 39;
              break;
            case 19:
              return 51;
              break;
            case 20:
              return 48;
              break;
            case 21:
              this.unput(yy_.yytext);
              this.popState();
              this.begin("com");
              break;
            case 22:
              this.popState();
              return 14;
              break;
            case 23:
              return 48;
              break;
            case 24:
              return 73;
              break;
            case 25:
              return 72;
              break;
            case 26:
              return 72;
              break;
            case 27:
              return 87;
              break;
            case 28:
              break;
            case 29:
              this.popState();
              return 54;
              break;
            case 30:
              this.popState();
              return 33;
              break;
            case 31:
              yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
              return 80;
              break;
            case 32:
              yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
              return 80;
              break;
            case 33:
              return 85;
              break;
            case 34:
              return 82;
              break;
            case 35:
              return 82;
              break;
            case 36:
              return 83;
              break;
            case 37:
              return 84;
              break;
            case 38:
              return 81;
              break;
            case 39:
              return 75;
              break;
            case 40:
              return 77;
              break;
            case 41:
              return 72;
              break;
            case 42:
              yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
              return 72;
              break;
            case 43:
              return "INVALID";
              break;
            case 44:
              return 5;
              break;
          }
        }, "anonymous");
        lexer2.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
        lexer2.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
        return lexer2;
      }();
      parser.lexer = lexer;
      function Parser() {
        this.yy = {};
      }
      __name(Parser, "Parser");
      Parser.prototype = parser;
      parser.Parser = Parser;
      return new Parser();
    }();
    exports2["default"] = handlebars;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/visitor.js
var require_visitor = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/visitor.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    function Visitor() {
      this.parents = [];
    }
    __name(Visitor, "Visitor");
    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,
      // Visits a given value. If mutating, will replace the value if necessary.
      acceptKey: /* @__PURE__ */ __name(function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          if (value && !Visitor.prototype[value.type]) {
            throw new _exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
          }
          node[name] = value;
        }
      }, "acceptKey"),
      // Performs an accept operation with added sanity check to ensure
      // required keys are not removed.
      acceptRequired: /* @__PURE__ */ __name(function acceptRequired(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) {
          throw new _exception2["default"](node.type + " requires " + name);
        }
      }, "acceptRequired"),
      // Traverses a given array. If mutating, empty respnses will be removed
      // for child elements.
      acceptArray: /* @__PURE__ */ __name(function acceptArray(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);
          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--;
          }
        }
      }, "acceptArray"),
      accept: /* @__PURE__ */ __name(function accept(object) {
        if (!object) {
          return;
        }
        if (!this[object.type]) {
          throw new _exception2["default"]("Unknown type: " + object.type, object);
        }
        if (this.current) {
          this.parents.unshift(this.current);
        }
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) {
          return ret;
        } else if (ret !== false) {
          return object;
        }
      }, "accept"),
      Program: /* @__PURE__ */ __name(function Program(program) {
        this.acceptArray(program.body);
      }, "Program"),
      MustacheStatement: visitSubExpression,
      Decorator: visitSubExpression,
      BlockStatement: visitBlock,
      DecoratorBlock: visitBlock,
      PartialStatement: visitPartial,
      PartialBlockStatement: /* @__PURE__ */ __name(function PartialBlockStatement(partial) {
        visitPartial.call(this, partial);
        this.acceptKey(partial, "program");
      }, "PartialBlockStatement"),
      ContentStatement: /* @__PURE__ */ __name(function ContentStatement() {
      }, "ContentStatement"),
      CommentStatement: /* @__PURE__ */ __name(function CommentStatement() {
      }, "CommentStatement"),
      SubExpression: visitSubExpression,
      PathExpression: /* @__PURE__ */ __name(function PathExpression() {
      }, "PathExpression"),
      StringLiteral: /* @__PURE__ */ __name(function StringLiteral() {
      }, "StringLiteral"),
      NumberLiteral: /* @__PURE__ */ __name(function NumberLiteral() {
      }, "NumberLiteral"),
      BooleanLiteral: /* @__PURE__ */ __name(function BooleanLiteral() {
      }, "BooleanLiteral"),
      UndefinedLiteral: /* @__PURE__ */ __name(function UndefinedLiteral() {
      }, "UndefinedLiteral"),
      NullLiteral: /* @__PURE__ */ __name(function NullLiteral() {
      }, "NullLiteral"),
      Hash: /* @__PURE__ */ __name(function Hash(hash) {
        this.acceptArray(hash.pairs);
      }, "Hash"),
      HashPair: /* @__PURE__ */ __name(function HashPair(pair) {
        this.acceptRequired(pair, "value");
      }, "HashPair")
    };
    function visitSubExpression(mustache) {
      this.acceptRequired(mustache, "path");
      this.acceptArray(mustache.params);
      this.acceptKey(mustache, "hash");
    }
    __name(visitSubExpression, "visitSubExpression");
    function visitBlock(block) {
      visitSubExpression.call(this, block);
      this.acceptKey(block, "program");
      this.acceptKey(block, "inverse");
    }
    __name(visitBlock, "visitBlock");
    function visitPartial(partial) {
      this.acceptRequired(partial, "name");
      this.acceptArray(partial.params);
      this.acceptKey(partial, "hash");
    }
    __name(visitPartial, "visitPartial");
    exports2["default"] = Visitor;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/whitespace-control.js
var require_whitespace_control = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/whitespace-control.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _visitor = require_visitor();
    var _visitor2 = _interopRequireDefault(_visitor);
    function WhitespaceControl() {
      var options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
      this.options = options;
    }
    __name(WhitespaceControl, "WhitespaceControl");
    WhitespaceControl.prototype = new _visitor2["default"]();
    WhitespaceControl.prototype.Program = function(program) {
      var doStandalone = !this.options.ignoreStandalone;
      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;
      var body = program.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i], strip = this.accept(current);
        if (!strip) {
          continue;
        }
        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) {
          omitRight(body, i, true);
        }
        if (strip.open) {
          omitLeft(body, i, true);
        }
        if (doStandalone && inlineStandalone) {
          omitRight(body, i);
          if (omitLeft(body, i)) {
            if (current.type === "PartialStatement") {
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
            }
          }
        }
        if (doStandalone && openStandalone) {
          omitRight((current.program || current.inverse).body);
          omitLeft(body, i);
        }
        if (doStandalone && closeStandalone) {
          omitRight(body, i);
          omitLeft((current.inverse || current.program).body);
        }
      }
      return program;
    };
    WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
      this.accept(block.program);
      this.accept(block.inverse);
      var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
      if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
        }
      }
      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        // Determine the standalone candiacy. Basically flag our content as being possibly standalone
        // so our parent can determine if we actually are standalone
        openStandalone: isNextWhitespace(program.body),
        closeStandalone: isPrevWhitespace((firstInverse || program).body)
      };
      if (block.openStrip.close) {
        omitRight(program.body, null, true);
      }
      if (inverse) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) {
          omitLeft(program.body, null, true);
        }
        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true);
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true);
        }
        if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program.body);
          omitRight(firstInverse.body);
        }
      } else if (block.closeStrip.open) {
        omitLeft(program.body, null, true);
      }
      return strip;
    };
    WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
      return mustache.strip;
    };
    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      };
    };
    function isPrevWhitespace(body, i, isRoot) {
      if (i === void 0) {
        i = body.length;
      }
      var prev = body[i - 1], sibling = body[i - 2];
      if (!prev) {
        return isRoot;
      }
      if (prev.type === "ContentStatement") {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
      }
    }
    __name(isPrevWhitespace, "isPrevWhitespace");
    function isNextWhitespace(body, i, isRoot) {
      if (i === void 0) {
        i = -1;
      }
      var next = body[i + 1], sibling = body[i + 2];
      if (!next) {
        return isRoot;
      }
      if (next.type === "ContentStatement") {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
      }
    }
    __name(isNextWhitespace, "isNextWhitespace");
    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
      current.rightStripped = current.value !== original;
    }
    __name(omitRight, "omitRight");
    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
      current.leftStripped = current.value !== original;
      return current.leftStripped;
    }
    __name(omitLeft, "omitLeft");
    exports2["default"] = WhitespaceControl;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/helpers.js
var require_helpers3 = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/helpers.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.SourceLocation = SourceLocation;
    exports2.id = id;
    exports2.stripFlags = stripFlags;
    exports2.stripComment = stripComment;
    exports2.preparePath = preparePath;
    exports2.prepareMustache = prepareMustache;
    exports2.prepareRawBlock = prepareRawBlock;
    exports2.prepareBlock = prepareBlock;
    exports2.prepareProgram = prepareProgram;
    exports2.preparePartialBlock = preparePartialBlock;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    function validateClose(open, close) {
      close = close.path ? close.path.original : close;
      if (open.path.original !== close) {
        var errorNode = { loc: open.path.loc };
        throw new _exception2["default"](open.path.original + " doesn't match " + close, errorNode);
      }
    }
    __name(validateClose, "validateClose");
    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      };
    }
    __name(SourceLocation, "SourceLocation");
    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substring(1, token.length - 1);
      } else {
        return token;
      }
    }
    __name(id, "id");
    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
      };
    }
    __name(stripFlags, "stripFlags");
    function stripComment(comment) {
      return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
    }
    __name(stripComment, "stripComment");
    function preparePath(data, parts, loc) {
      loc = this.locInfo(loc);
      var original = data ? "@" : "", dig = [], depth = 0;
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part, isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
          if (dig.length > 0) {
            throw new _exception2["default"]("Invalid path: " + original, { loc });
          } else if (part === "..") {
            depth++;
          }
        } else {
          dig.push(part);
        }
      }
      return {
        type: "PathExpression",
        data,
        depth,
        parts: dig,
        original,
        loc
      };
    }
    __name(preparePath, "preparePath");
    function prepareMustache(path2, params, hash, open, strip, locInfo) {
      var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
      var decorator = /\*/.test(open);
      return {
        type: decorator ? "Decorator" : "MustacheStatement",
        path: path2,
        params,
        hash,
        escaped,
        strip,
        loc: this.locInfo(locInfo)
      };
    }
    __name(prepareMustache, "prepareMustache");
    function prepareRawBlock(openRawBlock, contents, close, locInfo) {
      validateClose(openRawBlock, close);
      locInfo = this.locInfo(locInfo);
      var program = {
        type: "Program",
        body: contents,
        strip: {},
        loc: locInfo
      };
      return {
        type: "BlockStatement",
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
      };
    }
    __name(prepareRawBlock, "prepareRawBlock");
    function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
      if (close && close.path) {
        validateClose(openBlock, close);
      }
      var decorator = /\*/.test(openBlock.open);
      program.blockParams = openBlock.blockParams;
      var inverse = void 0, inverseStrip = void 0;
      if (inverseAndProgram) {
        if (decorator) {
          throw new _exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram);
        }
        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip;
        }
        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program;
      }
      if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted;
      }
      return {
        type: decorator ? "DecoratorBlock" : "BlockStatement",
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program,
        inverse,
        openStrip: openBlock.strip,
        inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }
    __name(prepareBlock, "prepareBlock");
    function prepareProgram(statements, loc) {
      if (!loc && statements.length) {
        var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
        if (firstLoc && lastLoc) {
          loc = {
            source: firstLoc.source,
            start: {
              line: firstLoc.start.line,
              column: firstLoc.start.column
            },
            end: {
              line: lastLoc.end.line,
              column: lastLoc.end.column
            }
          };
        }
      }
      return {
        type: "Program",
        body: statements,
        strip: {},
        loc
      };
    }
    __name(prepareProgram, "prepareProgram");
    function preparePartialBlock(open, program, close, locInfo) {
      validateClose(open, close);
      return {
        type: "PartialBlockStatement",
        name: open.path,
        params: open.params,
        hash: open.hash,
        program,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }
    __name(preparePartialBlock, "preparePartialBlock");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/base.js
var require_base2 = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/base.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.parseWithoutProcessing = parseWithoutProcessing;
    exports2.parse = parse;
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    __name(_interopRequireWildcard, "_interopRequireWildcard");
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _parser = require_parser();
    var _parser2 = _interopRequireDefault(_parser);
    var _whitespaceControl = require_whitespace_control();
    var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
    var _helpers = require_helpers3();
    var Helpers = _interopRequireWildcard(_helpers);
    var _utils = require_utils();
    exports2.parser = _parser2["default"];
    var yy = {};
    _utils.extend(yy, Helpers);
    function parseWithoutProcessing(input, options) {
      if (input.type === "Program") {
        return input;
      }
      _parser2["default"].yy = yy;
      yy.locInfo = function(locInfo) {
        return new yy.SourceLocation(options && options.srcName, locInfo);
      };
      var ast = _parser2["default"].parse(input);
      return ast;
    }
    __name(parseWithoutProcessing, "parseWithoutProcessing");
    function parse(input, options) {
      var ast = parseWithoutProcessing(input, options);
      var strip = new _whitespaceControl2["default"](options);
      return strip.accept(ast);
    }
    __name(parse, "parse");
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/compiler.js
var require_compiler = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/compiler.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.Compiler = Compiler;
    exports2.precompile = precompile;
    exports2.compile = compile;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require_utils();
    var _ast = require_ast();
    var _ast2 = _interopRequireDefault(_ast);
    var slice = [].slice;
    function Compiler() {
    }
    __name(Compiler, "Compiler");
    Compiler.prototype = {
      compiler: Compiler,
      equals: /* @__PURE__ */ __name(function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) {
          return false;
        }
        for (var i = 0; i < len; i++) {
          var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
          if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
            return false;
          }
        }
        len = this.children.length;
        for (var i = 0; i < len; i++) {
          if (!this.children[i].equals(other.children[i])) {
            return false;
          }
        }
        return true;
      }, "equals"),
      guid: 0,
      compile: /* @__PURE__ */ __name(function compile2(program, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;
        options.blockParams = options.blockParams || [];
        options.knownHelpers = _utils.extend(/* @__PURE__ */ Object.create(null), {
          helperMissing: true,
          blockHelperMissing: true,
          each: true,
          "if": true,
          unless: true,
          "with": true,
          log: true,
          lookup: true
        }, options.knownHelpers);
        return this.accept(program);
      }, "compile"),
      compileProgram: /* @__PURE__ */ __name(function compileProgram(program) {
        var childCompiler = new this.compiler(), result = childCompiler.compile(program, this.options), guid = this.guid++;
        this.usePartial = this.usePartial || result.usePartial;
        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;
        return guid;
      }, "compileProgram"),
      accept: /* @__PURE__ */ __name(function accept(node) {
        if (!this[node.type]) {
          throw new _exception2["default"]("Unknown type: " + node.type, node);
        }
        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret;
      }, "accept"),
      Program: /* @__PURE__ */ __name(function Program(program) {
        this.options.blockParams.unshift(program.blockParams);
        var body = program.body, bodyLength = body.length;
        for (var i = 0; i < bodyLength; i++) {
          this.accept(body[i]);
        }
        this.options.blockParams.shift();
        this.isSimple = bodyLength === 1;
        this.blockParams = program.blockParams ? program.blockParams.length : 0;
        return this;
      }, "Program"),
      BlockStatement: /* @__PURE__ */ __name(function BlockStatement(block) {
        transformLiteralToPath(block);
        var program = block.program, inverse = block.inverse;
        program = program && this.compileProgram(program);
        inverse = inverse && this.compileProgram(inverse);
        var type = this.classifySexpr(block);
        if (type === "helper") {
          this.helperSexpr(block, program, inverse);
        } else if (type === "simple") {
          this.simpleSexpr(block);
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("blockValue", block.path.original);
        } else {
          this.ambiguousSexpr(block, program, inverse);
          this.opcode("pushProgram", program);
          this.opcode("pushProgram", inverse);
          this.opcode("emptyHash");
          this.opcode("ambiguousBlockValue");
        }
        this.opcode("append");
      }, "BlockStatement"),
      DecoratorBlock: /* @__PURE__ */ __name(function DecoratorBlock(decorator) {
        var program = decorator.program && this.compileProgram(decorator.program);
        var params = this.setupFullMustacheParams(decorator, program, void 0), path2 = decorator.path;
        this.useDecorators = true;
        this.opcode("registerDecorator", params.length, path2.original);
      }, "DecoratorBlock"),
      PartialStatement: /* @__PURE__ */ __name(function PartialStatement(partial) {
        this.usePartial = true;
        var program = partial.program;
        if (program) {
          program = this.compileProgram(partial.program);
        }
        var params = partial.params;
        if (params.length > 1) {
          throw new _exception2["default"]("Unsupported number of partial arguments: " + params.length, partial);
        } else if (!params.length) {
          if (this.options.explicitPartialContext) {
            this.opcode("pushLiteral", "undefined");
          } else {
            params.push({ type: "PathExpression", parts: [], depth: 0 });
          }
        }
        var partialName = partial.name.original, isDynamic = partial.name.type === "SubExpression";
        if (isDynamic) {
          this.accept(partial.name);
        }
        this.setupFullMustacheParams(partial, program, void 0, true);
        var indent = partial.indent || "";
        if (this.options.preventIndent && indent) {
          this.opcode("appendContent", indent);
          indent = "";
        }
        this.opcode("invokePartial", isDynamic, partialName, indent);
        this.opcode("append");
      }, "PartialStatement"),
      PartialBlockStatement: /* @__PURE__ */ __name(function PartialBlockStatement(partialBlock) {
        this.PartialStatement(partialBlock);
      }, "PartialBlockStatement"),
      MustacheStatement: /* @__PURE__ */ __name(function MustacheStatement(mustache) {
        this.SubExpression(mustache);
        if (mustache.escaped && !this.options.noEscape) {
          this.opcode("appendEscaped");
        } else {
          this.opcode("append");
        }
      }, "MustacheStatement"),
      Decorator: /* @__PURE__ */ __name(function Decorator(decorator) {
        this.DecoratorBlock(decorator);
      }, "Decorator"),
      ContentStatement: /* @__PURE__ */ __name(function ContentStatement(content) {
        if (content.value) {
          this.opcode("appendContent", content.value);
        }
      }, "ContentStatement"),
      CommentStatement: /* @__PURE__ */ __name(function CommentStatement() {
      }, "CommentStatement"),
      SubExpression: /* @__PURE__ */ __name(function SubExpression(sexpr) {
        transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);
        if (type === "simple") {
          this.simpleSexpr(sexpr);
        } else if (type === "helper") {
          this.helperSexpr(sexpr);
        } else {
          this.ambiguousSexpr(sexpr);
        }
      }, "SubExpression"),
      ambiguousSexpr: /* @__PURE__ */ __name(function ambiguousSexpr(sexpr, program, inverse) {
        var path2 = sexpr.path, name = path2.parts[0], isBlock = program != null || inverse != null;
        this.opcode("getContext", path2.depth);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        path2.strict = true;
        this.accept(path2);
        this.opcode("invokeAmbiguous", name, isBlock);
      }, "ambiguousSexpr"),
      simpleSexpr: /* @__PURE__ */ __name(function simpleSexpr(sexpr) {
        var path2 = sexpr.path;
        path2.strict = true;
        this.accept(path2);
        this.opcode("resolvePossibleLambda");
      }, "simpleSexpr"),
      helperSexpr: /* @__PURE__ */ __name(function helperSexpr(sexpr, program, inverse) {
        var params = this.setupFullMustacheParams(sexpr, program, inverse), path2 = sexpr.path, name = path2.parts[0];
        if (this.options.knownHelpers[name]) {
          this.opcode("invokeKnownHelper", params.length, name);
        } else if (this.options.knownHelpersOnly) {
          throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
        } else {
          path2.strict = true;
          path2.falsy = true;
          this.accept(path2);
          this.opcode("invokeHelper", params.length, path2.original, _ast2["default"].helpers.simpleId(path2));
        }
      }, "helperSexpr"),
      PathExpression: /* @__PURE__ */ __name(function PathExpression(path2) {
        this.addDepth(path2.depth);
        this.opcode("getContext", path2.depth);
        var name = path2.parts[0], scoped = _ast2["default"].helpers.scopedId(path2), blockParamId = !path2.depth && !scoped && this.blockParamIndex(name);
        if (blockParamId) {
          this.opcode("lookupBlockParam", blockParamId, path2.parts);
        } else if (!name) {
          this.opcode("pushContext");
        } else if (path2.data) {
          this.options.data = true;
          this.opcode("lookupData", path2.depth, path2.parts, path2.strict);
        } else {
          this.opcode("lookupOnContext", path2.parts, path2.falsy, path2.strict, scoped);
        }
      }, "PathExpression"),
      StringLiteral: /* @__PURE__ */ __name(function StringLiteral(string) {
        this.opcode("pushString", string.value);
      }, "StringLiteral"),
      NumberLiteral: /* @__PURE__ */ __name(function NumberLiteral(number) {
        this.opcode("pushLiteral", number.value);
      }, "NumberLiteral"),
      BooleanLiteral: /* @__PURE__ */ __name(function BooleanLiteral(bool) {
        this.opcode("pushLiteral", bool.value);
      }, "BooleanLiteral"),
      UndefinedLiteral: /* @__PURE__ */ __name(function UndefinedLiteral() {
        this.opcode("pushLiteral", "undefined");
      }, "UndefinedLiteral"),
      NullLiteral: /* @__PURE__ */ __name(function NullLiteral() {
        this.opcode("pushLiteral", "null");
      }, "NullLiteral"),
      Hash: /* @__PURE__ */ __name(function Hash(hash) {
        var pairs = hash.pairs, i = 0, l = pairs.length;
        this.opcode("pushHash");
        for (; i < l; i++) {
          this.pushParam(pairs[i].value);
        }
        while (i--) {
          this.opcode("assignToHash", pairs[i].key);
        }
        this.opcode("popHash");
      }, "Hash"),
      // HELPERS
      opcode: /* @__PURE__ */ __name(function opcode(name) {
        this.opcodes.push({
          opcode: name,
          args: slice.call(arguments, 1),
          loc: this.sourceNode[0].loc
        });
      }, "opcode"),
      addDepth: /* @__PURE__ */ __name(function addDepth(depth) {
        if (!depth) {
          return;
        }
        this.useDepths = true;
      }, "addDepth"),
      classifySexpr: /* @__PURE__ */ __name(function classifySexpr(sexpr) {
        var isSimple = _ast2["default"].helpers.simpleId(sexpr.path);
        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
        var isHelper = !isBlockParam && _ast2["default"].helpers.helperExpression(sexpr);
        var isEligible = !isBlockParam && (isHelper || isSimple);
        if (isEligible && !isHelper) {
          var _name = sexpr.path.parts[0], options = this.options;
          if (options.knownHelpers[_name]) {
            isHelper = true;
          } else if (options.knownHelpersOnly) {
            isEligible = false;
          }
        }
        if (isHelper) {
          return "helper";
        } else if (isEligible) {
          return "ambiguous";
        } else {
          return "simple";
        }
      }, "classifySexpr"),
      pushParams: /* @__PURE__ */ __name(function pushParams(params) {
        for (var i = 0, l = params.length; i < l; i++) {
          this.pushParam(params[i]);
        }
      }, "pushParams"),
      pushParam: /* @__PURE__ */ __name(function pushParam(val) {
        var value = val.value != null ? val.value : val.original || "";
        if (this.stringParams) {
          if (value.replace) {
            value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
          }
          if (val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode("getContext", val.depth || 0);
          this.opcode("pushStringParam", value, val.type);
          if (val.type === "SubExpression") {
            this.accept(val);
          }
        } else {
          if (this.trackIds) {
            var blockParamIndex = void 0;
            if (val.parts && !_ast2["default"].helpers.scopedId(val) && !val.depth) {
              blockParamIndex = this.blockParamIndex(val.parts[0]);
            }
            if (blockParamIndex) {
              var blockParamChild = val.parts.slice(1).join(".");
              this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild);
            } else {
              value = val.original || value;
              if (value.replace) {
                value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
              }
              this.opcode("pushId", val.type, value);
            }
          }
          this.accept(val);
        }
      }, "pushParam"),
      setupFullMustacheParams: /* @__PURE__ */ __name(function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);
        this.opcode("pushProgram", program);
        this.opcode("pushProgram", inverse);
        if (sexpr.hash) {
          this.accept(sexpr.hash);
        } else {
          this.opcode("emptyHash", omitEmpty);
        }
        return params;
      }, "setupFullMustacheParams"),
      blockParamIndex: /* @__PURE__ */ __name(function blockParamIndex(name) {
        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
          var blockParams = this.options.blockParams[depth], param = blockParams && _utils.indexOf(blockParams, name);
          if (blockParams && param >= 0) {
            return [depth, param];
          }
        }
      }, "blockParamIndex")
    };
    function precompile(input, options, env) {
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
      }
      options = options || {};
      if (!("data" in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }
      var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options);
      return new env.JavaScriptCompiler().compile(environment, options);
    }
    __name(precompile, "precompile");
    function compile(input, options, env) {
      if (options === void 0)
        options = {};
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
      }
      options = _utils.extend({}, options);
      if (!("data" in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }
      var compiled = void 0;
      function compileInput() {
        var ast = env.parse(input, options), environment = new env.Compiler().compile(ast, options), templateSpec = new env.JavaScriptCompiler().compile(environment, options, void 0, true);
        return env.template(templateSpec);
      }
      __name(compileInput, "compileInput");
      function ret(context, execOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled.call(this, context, execOptions);
      }
      __name(ret, "ret");
      ret._setup = function(setupOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._setup(setupOptions);
      };
      ret._child = function(i, data, blockParams, depths) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._child(i, data, blockParams, depths);
      };
      return ret;
    }
    __name(compile, "compile");
    function argEquals(a, b) {
      if (a === b) {
        return true;
      }
      if (_utils.isArray(a) && _utils.isArray(b) && a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
          if (!argEquals(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
    }
    __name(argEquals, "argEquals");
    function transformLiteralToPath(sexpr) {
      if (!sexpr.path.parts) {
        var literal = sexpr.path;
        sexpr.path = {
          type: "PathExpression",
          data: false,
          depth: 0,
          parts: [literal.original + ""],
          original: literal.original + "",
          loc: literal.loc
        };
      }
    }
    __name(transformLiteralToPath, "transformLiteralToPath");
  }
});

// node_modules/source-map/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/source-map/lib/base64.js"(exports2) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports2.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports2.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// node_modules/source-map/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "node_modules/source-map/lib/base64-vlq.js"(exports2) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    __name(toVLQSigned, "toVLQSigned");
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    __name(fromVLQSigned, "fromVLQSigned");
    exports2.encode = /* @__PURE__ */ __name(function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    }, "base64VLQ_encode");
    exports2.decode = /* @__PURE__ */ __name(function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    }, "base64VLQ_decode");
  }
});

// node_modules/source-map/lib/util.js
var require_util = __commonJS({
  "node_modules/source-map/lib/util.js"(exports2) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    __name(getArg, "getArg");
    exports2.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    __name(urlParse, "urlParse");
    exports2.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    __name(urlGenerate, "urlGenerate");
    exports2.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path2 = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path2 = url.path;
      }
      var isAbsolute = exports2.isAbsolute(path2);
      var parts = path2.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path2 = parts.join("/");
      if (path2 === "") {
        path2 = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path2;
        return urlGenerate(url);
      }
      return path2;
    }
    __name(normalize, "normalize");
    exports2.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    __name(join, "join");
    exports2.join = join;
    exports2.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    __name(relative, "relative");
    exports2.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    __name(identity, "identity");
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    __name(toSetString, "toSetString");
    exports2.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    __name(fromSetString, "fromSetString");
    exports2.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    __name(isProtoString, "isProtoString");
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    __name(compareByOriginalPositions, "compareByOriginalPositions");
    exports2.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    __name(compareByGeneratedPositionsDeflated, "compareByGeneratedPositionsDeflated");
    exports2.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    __name(strcmp, "strcmp");
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    __name(compareByGeneratedPositionsInflated, "compareByGeneratedPositionsInflated");
    exports2.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    __name(parseSourceMapInput, "parseSourceMapInput");
    exports2.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    __name(computeSourceURL, "computeSourceURL");
    exports2.computeSourceURL = computeSourceURL;
  }
});

// node_modules/source-map/lib/array-set.js
var require_array_set = __commonJS({
  "node_modules/source-map/lib/array-set.js"(exports2) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    __name(ArraySet, "ArraySet");
    ArraySet.fromArray = /* @__PURE__ */ __name(function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    }, "ArraySet_fromArray");
    ArraySet.prototype.size = /* @__PURE__ */ __name(function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    }, "ArraySet_size");
    ArraySet.prototype.add = /* @__PURE__ */ __name(function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    }, "ArraySet_add");
    ArraySet.prototype.has = /* @__PURE__ */ __name(function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    }, "ArraySet_has");
    ArraySet.prototype.indexOf = /* @__PURE__ */ __name(function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    }, "ArraySet_indexOf");
    ArraySet.prototype.at = /* @__PURE__ */ __name(function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    }, "ArraySet_at");
    ArraySet.prototype.toArray = /* @__PURE__ */ __name(function ArraySet_toArray() {
      return this._array.slice();
    }, "ArraySet_toArray");
    exports2.ArraySet = ArraySet;
  }
});

// node_modules/source-map/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "node_modules/source-map/lib/mapping-list.js"(exports2) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    __name(generatedPositionAfter, "generatedPositionAfter");
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    __name(MappingList, "MappingList");
    MappingList.prototype.unsortedForEach = /* @__PURE__ */ __name(function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    }, "MappingList_forEach");
    MappingList.prototype.add = /* @__PURE__ */ __name(function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    }, "MappingList_add");
    MappingList.prototype.toArray = /* @__PURE__ */ __name(function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    }, "MappingList_toArray");
    exports2.MappingList = MappingList;
  }
});

// node_modules/source-map/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "node_modules/source-map/lib/source-map-generator.js"(exports2) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    __name(SourceMapGenerator, "SourceMapGenerator");
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = /* @__PURE__ */ __name(function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    }, "SourceMapGenerator_fromSourceMap");
    SourceMapGenerator.prototype.addMapping = /* @__PURE__ */ __name(function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    }, "SourceMapGenerator_addMapping");
    SourceMapGenerator.prototype.setSourceContent = /* @__PURE__ */ __name(function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    }, "SourceMapGenerator_setSourceContent");
    SourceMapGenerator.prototype.applySourceMap = /* @__PURE__ */ __name(function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    }, "SourceMapGenerator_applySourceMap");
    SourceMapGenerator.prototype._validateMapping = /* @__PURE__ */ __name(function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    }, "SourceMapGenerator_validateMapping");
    SourceMapGenerator.prototype._serializeMappings = /* @__PURE__ */ __name(function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    }, "SourceMapGenerator_serializeMappings");
    SourceMapGenerator.prototype._generateSourcesContent = /* @__PURE__ */ __name(function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    }, "SourceMapGenerator_generateSourcesContent");
    SourceMapGenerator.prototype.toJSON = /* @__PURE__ */ __name(function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    }, "SourceMapGenerator_toJSON");
    SourceMapGenerator.prototype.toString = /* @__PURE__ */ __name(function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    }, "SourceMapGenerator_toString");
    exports2.SourceMapGenerator = SourceMapGenerator;
  }
});

// node_modules/source-map/lib/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/source-map/lib/binary-search.js"(exports2) {
    exports2.GREATEST_LOWER_BOUND = 1;
    exports2.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    __name(recursiveSearch, "recursiveSearch");
    exports2.search = /* @__PURE__ */ __name(function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports2.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    }, "search");
  }
});

// node_modules/source-map/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "node_modules/source-map/lib/quick-sort.js"(exports2) {
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }
    __name(swap, "swap");
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    __name(randomIntInRange, "randomIntInRange");
    function doQuickSort(ary, comparator, p, r) {
      if (p < r) {
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j = p; j < r; j++) {
          if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j);
          }
        }
        swap(ary, i + 1, j);
        var q = i + 1;
        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r);
      }
    }
    __name(doQuickSort, "doQuickSort");
    exports2.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };
  }
});

// node_modules/source-map/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "node_modules/source-map/lib/source-map-consumer.js"(exports2) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    __name(SourceMapConsumer, "SourceMapConsumer");
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = /* @__PURE__ */ __name(function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    }, "SourceMapConsumer_charIsMappingSeparator");
    SourceMapConsumer.prototype._parseMappings = /* @__PURE__ */ __name(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    }, "SourceMapConsumer_parseMappings");
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = /* @__PURE__ */ __name(function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    }, "SourceMapConsumer_eachMapping");
    SourceMapConsumer.prototype.allGeneratedPositionsFor = /* @__PURE__ */ __name(function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    }, "SourceMapConsumer_allGeneratedPositionsFor");
    exports2.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    __name(BasicSourceMapConsumer, "BasicSourceMapConsumer");
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = /* @__PURE__ */ __name(function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    }, "SourceMapConsumer_fromSourceMap");
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    __name(Mapping, "Mapping");
    BasicSourceMapConsumer.prototype._parseMappings = /* @__PURE__ */ __name(function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }
            if (segment.length === 2) {
              throw new Error("Found a source, but no line and column");
            }
            if (segment.length === 3) {
              throw new Error("Found a source and line, but no column");
            }
            cachedSegments[str] = segment;
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            originalMappings.push(mapping);
          }
        }
      }
      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;
      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    }, "SourceMapConsumer_parseMappings");
    BasicSourceMapConsumer.prototype._findMapping = /* @__PURE__ */ __name(function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    }, "SourceMapConsumer_findMapping");
    BasicSourceMapConsumer.prototype.computeColumnSpans = /* @__PURE__ */ __name(function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    }, "SourceMapConsumer_computeColumnSpans");
    BasicSourceMapConsumer.prototype.originalPositionFor = /* @__PURE__ */ __name(function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }, "SourceMapConsumer_originalPositionFor");
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = /* @__PURE__ */ __name(function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    }, "BasicSourceMapConsumer_hasContentsOfAllSources");
    BasicSourceMapConsumer.prototype.sourceContentFor = /* @__PURE__ */ __name(function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    }, "SourceMapConsumer_sourceContentFor");
    BasicSourceMapConsumer.prototype.generatedPositionFor = /* @__PURE__ */ __name(function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }, "SourceMapConsumer_generatedPositionFor");
    exports2.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    __name(IndexedSourceMapConsumer, "IndexedSourceMapConsumer");
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    }, "IndexedSourceMapConsumer_originalPositionFor");
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    }, "IndexedSourceMapConsumer_hasContentsOfAllSources");
    IndexedSourceMapConsumer.prototype.sourceContentFor = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    }, "IndexedSourceMapConsumer_sourceContentFor");
    IndexedSourceMapConsumer.prototype.generatedPositionFor = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    }, "IndexedSourceMapConsumer_generatedPositionFor");
    IndexedSourceMapConsumer.prototype._parseMappings = /* @__PURE__ */ __name(function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    }, "IndexedSourceMapConsumer_parseMappings");
    exports2.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// node_modules/source-map/lib/source-node.js
var require_source_node = __commonJS({
  "node_modules/source-map/lib/source-node.js"(exports2) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null)
        this.add(aChunks);
    }
    __name(SourceNode, "SourceNode");
    SourceNode.fromStringWithSourceMap = /* @__PURE__ */ __name(function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = /* @__PURE__ */ __name(function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
        __name(getNextLine, "getNextLine");
      }, "shiftNextLine");
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
      __name(addMappingWithCode, "addMappingWithCode");
    }, "SourceNode_fromStringWithSourceMap");
    SourceNode.prototype.add = /* @__PURE__ */ __name(function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    }, "SourceNode_add");
    SourceNode.prototype.prepend = /* @__PURE__ */ __name(function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    }, "SourceNode_prepend");
    SourceNode.prototype.walk = /* @__PURE__ */ __name(function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    }, "SourceNode_walk");
    SourceNode.prototype.join = /* @__PURE__ */ __name(function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    }, "SourceNode_join");
    SourceNode.prototype.replaceRight = /* @__PURE__ */ __name(function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    }, "SourceNode_replaceRight");
    SourceNode.prototype.setSourceContent = /* @__PURE__ */ __name(function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    }, "SourceNode_setSourceContent");
    SourceNode.prototype.walkSourceContents = /* @__PURE__ */ __name(function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    }, "SourceNode_walkSourceContents");
    SourceNode.prototype.toString = /* @__PURE__ */ __name(function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    }, "SourceNode_toString");
    SourceNode.prototype.toStringWithSourceMap = /* @__PURE__ */ __name(function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    }, "SourceNode_toStringWithSourceMap");
    exports2.SourceNode = SourceNode;
  }
});

// node_modules/source-map/source-map.js
var require_source_map = __commonJS({
  "node_modules/source-map/source-map.js"(exports2) {
    exports2.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports2.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports2.SourceNode = require_source_node().SourceNode;
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/code-gen.js
var require_code_gen = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/code-gen.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    var _utils = require_utils();
    var SourceNode = void 0;
    try {
      if (typeof define !== "function" || !define.amd) {
        SourceMap = require_source_map();
        SourceNode = SourceMap.SourceNode;
      }
    } catch (err) {
    }
    var SourceMap;
    if (!SourceNode) {
      SourceNode = /* @__PURE__ */ __name(function(line, column, srcFile, chunks) {
        this.src = "";
        if (chunks) {
          this.add(chunks);
        }
      }, "SourceNode");
      SourceNode.prototype = {
        add: /* @__PURE__ */ __name(function add(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("");
          }
          this.src += chunks;
        }, "add"),
        prepend: /* @__PURE__ */ __name(function prepend(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("");
          }
          this.src = chunks + this.src;
        }, "prepend"),
        toStringWithSourceMap: /* @__PURE__ */ __name(function toStringWithSourceMap() {
          return { code: this.toString() };
        }, "toStringWithSourceMap"),
        toString: /* @__PURE__ */ __name(function toString() {
          return this.src;
        }, "toString")
      };
    }
    function castChunk(chunk, codeGen, loc) {
      if (_utils.isArray(chunk)) {
        var ret = [];
        for (var i = 0, len = chunk.length; i < len; i++) {
          ret.push(codeGen.wrap(chunk[i], loc));
        }
        return ret;
      } else if (typeof chunk === "boolean" || typeof chunk === "number") {
        return chunk + "";
      }
      return chunk;
    }
    __name(castChunk, "castChunk");
    function CodeGen(srcFile) {
      this.srcFile = srcFile;
      this.source = [];
    }
    __name(CodeGen, "CodeGen");
    CodeGen.prototype = {
      isEmpty: /* @__PURE__ */ __name(function isEmpty() {
        return !this.source.length;
      }, "isEmpty"),
      prepend: /* @__PURE__ */ __name(function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc));
      }, "prepend"),
      push: /* @__PURE__ */ __name(function push(source, loc) {
        this.source.push(this.wrap(source, loc));
      }, "push"),
      merge: /* @__PURE__ */ __name(function merge() {
        var source = this.empty();
        this.each(function(line) {
          source.add(["  ", line, "\n"]);
        });
        return source;
      }, "merge"),
      each: /* @__PURE__ */ __name(function each(iter) {
        for (var i = 0, len = this.source.length; i < len; i++) {
          iter(this.source[i]);
        }
      }, "each"),
      empty: /* @__PURE__ */ __name(function empty() {
        var loc = this.currentLocation || { start: {} };
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
      }, "empty"),
      wrap: /* @__PURE__ */ __name(function wrap(chunk) {
        var loc = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1];
        if (chunk instanceof SourceNode) {
          return chunk;
        }
        chunk = castChunk(chunk, this, loc);
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
      }, "wrap"),
      functionCall: /* @__PURE__ */ __name(function functionCall(fn, type, params) {
        params = this.generateList(params);
        return this.wrap([fn, type ? "." + type + "(" : "(", params, ")"]);
      }, "functionCall"),
      quotedString: /* @__PURE__ */ __name(function quotedString(str) {
        return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
      }, "quotedString"),
      objectLiteral: /* @__PURE__ */ __name(function objectLiteral(obj) {
        var _this = this;
        var pairs = [];
        Object.keys(obj).forEach(function(key) {
          var value = castChunk(obj[key], _this);
          if (value !== "undefined") {
            pairs.push([_this.quotedString(key), ":", value]);
          }
        });
        var ret = this.generateList(pairs);
        ret.prepend("{");
        ret.add("}");
        return ret;
      }, "objectLiteral"),
      generateList: /* @__PURE__ */ __name(function generateList(entries) {
        var ret = this.empty();
        for (var i = 0, len = entries.length; i < len; i++) {
          if (i) {
            ret.add(",");
          }
          ret.add(castChunk(entries[i], this));
        }
        return ret;
      }, "generateList"),
      generateArray: /* @__PURE__ */ __name(function generateArray(entries) {
        var ret = this.generateList(entries);
        ret.prepend("[");
        ret.add("]");
        return ret;
      }, "generateArray")
    };
    exports2["default"] = CodeGen;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/javascript-compiler.js
var require_javascript_compiler = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/javascript-compiler.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _base = require_base();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require_utils();
    var _codeGen = require_code_gen();
    var _codeGen2 = _interopRequireDefault(_codeGen);
    function Literal(value) {
      this.value = value;
    }
    __name(Literal, "Literal");
    function JavaScriptCompiler() {
    }
    __name(JavaScriptCompiler, "JavaScriptCompiler");
    JavaScriptCompiler.prototype = {
      // PUBLIC API: You can override these methods in a subclass to provide
      // alternative compiled forms for name lookup and buffering semantics
      nameLookup: /* @__PURE__ */ __name(function nameLookup(parent, name) {
        return this.internalNameLookup(parent, name);
      }, "nameLookup"),
      depthedLookup: /* @__PURE__ */ __name(function depthedLookup(name) {
        return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(name), ")"];
      }, "depthedLookup"),
      compilerInfo: /* @__PURE__ */ __name(function compilerInfo() {
        var revision = _base.COMPILER_REVISION, versions = _base.REVISION_CHANGES[revision];
        return [revision, versions];
      }, "compilerInfo"),
      appendToBuffer: /* @__PURE__ */ __name(function appendToBuffer(source, location, explicit) {
        if (!_utils.isArray(source)) {
          source = [source];
        }
        source = this.source.wrap(source, location);
        if (this.environment.isSimple) {
          return ["return ", source, ";"];
        } else if (explicit) {
          return ["buffer += ", source, ";"];
        } else {
          source.appendToBuffer = true;
          return source;
        }
      }, "appendToBuffer"),
      initializeBuffer: /* @__PURE__ */ __name(function initializeBuffer() {
        return this.quotedString("");
      }, "initializeBuffer"),
      // END PUBLIC API
      internalNameLookup: /* @__PURE__ */ __name(function internalNameLookup(parent, name) {
        this.lookupPropertyFunctionIsUsed = true;
        return ["lookupProperty(", parent, ",", JSON.stringify(name), ")"];
      }, "internalNameLookup"),
      lookupPropertyFunctionIsUsed: false,
      compile: /* @__PURE__ */ __name(function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;
        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
          decorators: [],
          programs: [],
          environments: []
        };
        this.preamble();
        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = { list: [] };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];
        this.compileChildren(environment, options);
        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
        var opcodes = environment.opcodes, opcode = void 0, firstLoc = void 0, i = void 0, l = void 0;
        for (i = 0, l = opcodes.length; i < l; i++) {
          opcode = opcodes[i];
          this.source.currentLocation = opcode.loc;
          firstLoc = firstLoc || opcode.loc;
          this[opcode.opcode].apply(this, opcode.args);
        }
        this.source.currentLocation = firstLoc;
        this.pushSource("");
        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
          throw new _exception2["default"]("Compile completed with content left on stack");
        }
        if (!this.decorators.isEmpty()) {
          this.useDecorators = true;
          this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n"]);
          this.decorators.push("return fn;");
          if (asObject) {
            this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]);
          } else {
            this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
            this.decorators.push("}\n");
            this.decorators = this.decorators.merge();
          }
        } else {
          this.decorators = void 0;
        }
        var fn = this.createFunctionContext(asObject);
        if (!this.isChild) {
          var ret = {
            compiler: this.compilerInfo(),
            main: fn
          };
          if (this.decorators) {
            ret.main_d = this.decorators;
            ret.useDecorators = true;
          }
          var _context = this.context;
          var programs = _context.programs;
          var decorators = _context.decorators;
          for (i = 0, l = programs.length; i < l; i++) {
            if (programs[i]) {
              ret[i] = programs[i];
              if (decorators[i]) {
                ret[i + "_d"] = decorators[i];
                ret.useDecorators = true;
              }
            }
          }
          if (this.environment.usePartial) {
            ret.usePartial = true;
          }
          if (this.options.data) {
            ret.useData = true;
          }
          if (this.useDepths) {
            ret.useDepths = true;
          }
          if (this.useBlockParams) {
            ret.useBlockParams = true;
          }
          if (this.options.compat) {
            ret.compat = true;
          }
          if (!asObject) {
            ret.compiler = JSON.stringify(ret.compiler);
            this.source.currentLocation = { start: { line: 1, column: 0 } };
            ret = this.objectLiteral(ret);
            if (options.srcName) {
              ret = ret.toStringWithSourceMap({ file: options.destName });
              ret.map = ret.map && ret.map.toString();
            } else {
              ret = ret.toString();
            }
          } else {
            ret.compilerOptions = this.options;
          }
          return ret;
        } else {
          return fn;
        }
      }, "compile"),
      preamble: /* @__PURE__ */ __name(function preamble() {
        this.lastContext = 0;
        this.source = new _codeGen2["default"](this.options.srcName);
        this.decorators = new _codeGen2["default"](this.options.srcName);
      }, "preamble"),
      createFunctionContext: /* @__PURE__ */ __name(function createFunctionContext(asObject) {
        var _this = this;
        var varDeclarations = "";
        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) {
          varDeclarations += ", " + locals.join(", ");
        }
        var aliasCount = 0;
        Object.keys(this.aliases).forEach(function(alias) {
          var node = _this.aliases[alias];
          if (node.children && node.referenceCount > 1) {
            varDeclarations += ", alias" + ++aliasCount + "=" + alias;
            node.children[0] = "alias" + aliasCount;
          }
        });
        if (this.lookupPropertyFunctionIsUsed) {
          varDeclarations += ", " + this.lookupPropertyFunctionVarDeclaration();
        }
        var params = ["container", "depth0", "helpers", "partials", "data"];
        if (this.useBlockParams || this.useDepths) {
          params.push("blockParams");
        }
        if (this.useDepths) {
          params.push("depths");
        }
        var source = this.mergeSource(varDeclarations);
        if (asObject) {
          params.push(source);
          return Function.apply(this, params);
        } else {
          return this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"]);
        }
      }, "createFunctionContext"),
      mergeSource: /* @__PURE__ */ __name(function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = void 0, sourceSeen = void 0, bufferStart = void 0, bufferEnd = void 0;
        this.source.each(function(line) {
          if (line.appendToBuffer) {
            if (bufferStart) {
              line.prepend("  + ");
            } else {
              bufferStart = line;
            }
            bufferEnd = line;
          } else {
            if (bufferStart) {
              if (!sourceSeen) {
                appendFirst = true;
              } else {
                bufferStart.prepend("buffer += ");
              }
              bufferEnd.add(";");
              bufferStart = bufferEnd = void 0;
            }
            sourceSeen = true;
            if (!isSimple) {
              appendOnly = false;
            }
          }
        });
        if (appendOnly) {
          if (bufferStart) {
            bufferStart.prepend("return ");
            bufferEnd.add(";");
          } else if (!sourceSeen) {
            this.source.push('return "";');
          }
        } else {
          varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
          if (bufferStart) {
            bufferStart.prepend("return buffer + ");
            bufferEnd.add(";");
          } else {
            this.source.push("return buffer;");
          }
        }
        if (varDeclarations) {
          this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"));
        }
        return this.source.merge();
      }, "mergeSource"),
      lookupPropertyFunctionVarDeclaration: /* @__PURE__ */ __name(function lookupPropertyFunctionVarDeclaration() {
        return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
      }, "lookupPropertyFunctionVarDeclaration"),
      // [blockValue]
      //
      // On stack, before: hash, inverse, program, value
      // On stack, after: return value of blockHelperMissing
      //
      // The purpose of this opcode is to take a block of the form
      // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
      // replace it on the stack with the result of properly
      // invoking blockHelperMissing.
      blockValue: /* @__PURE__ */ __name(function blockValue(name) {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
        this.setupHelperArgs(name, 0, params);
        var blockName = this.popStack();
        params.splice(1, 0, blockName);
        this.push(this.source.functionCall(blockHelperMissing, "call", params));
      }, "blockValue"),
      // [ambiguousBlockValue]
      //
      // On stack, before: hash, inverse, program, value
      // Compiler value, before: lastHelper=value of last found helper, if any
      // On stack, after, if no lastHelper: same as [blockValue]
      // On stack, after, if lastHelper: value
      ambiguousBlockValue: /* @__PURE__ */ __name(function ambiguousBlockValue() {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
        this.setupHelperArgs("", 0, params, true);
        this.flushInline();
        var current = this.topStack();
        params.splice(1, 0, current);
        this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}"]);
      }, "ambiguousBlockValue"),
      // [appendContent]
      //
      // On stack, before: ...
      // On stack, after: ...
      //
      // Appends the string value of `content` to the current buffer
      appendContent: /* @__PURE__ */ __name(function appendContent(content) {
        if (this.pendingContent) {
          content = this.pendingContent + content;
        } else {
          this.pendingLocation = this.source.currentLocation;
        }
        this.pendingContent = content;
      }, "appendContent"),
      // [append]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Coerces `value` to a String and appends it to the current buffer.
      //
      // If `value` is truthy, or 0, it is coerced into a string and appended
      // Otherwise, the empty string is appended
      append: /* @__PURE__ */ __name(function append() {
        if (this.isInline()) {
          this.replaceStack(function(current) {
            return [" != null ? ", current, ' : ""'];
          });
          this.pushSource(this.appendToBuffer(this.popStack()));
        } else {
          var local = this.popStack();
          this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, void 0, true), " }"]);
          if (this.environment.isSimple) {
            this.pushSource(["else { ", this.appendToBuffer("''", void 0, true), " }"]);
          }
        }
      }, "append"),
      // [appendEscaped]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Escape `value` and append it to the buffer
      appendEscaped: /* @__PURE__ */ __name(function appendEscaped() {
        this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
      }, "appendEscaped"),
      // [getContext]
      //
      // On stack, before: ...
      // On stack, after: ...
      // Compiler value, after: lastContext=depth
      //
      // Set the value of the `lastContext` compiler value to the depth
      getContext: /* @__PURE__ */ __name(function getContext(depth) {
        this.lastContext = depth;
      }, "getContext"),
      // [pushContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext, ...
      //
      // Pushes the value of the current context onto the stack.
      pushContext: /* @__PURE__ */ __name(function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext));
      }, "pushContext"),
      // [lookupOnContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext[name], ...
      //
      // Looks up the value of `name` on the current context and pushes
      // it onto the stack.
      lookupOnContext: /* @__PURE__ */ __name(function lookupOnContext(parts, falsy, strict, scoped) {
        var i = 0;
        if (!scoped && this.options.compat && !this.lastContext) {
          this.push(this.depthedLookup(parts[i++]));
        } else {
          this.pushContext();
        }
        this.resolvePath("context", parts, i, falsy, strict);
      }, "lookupOnContext"),
      // [lookupBlockParam]
      //
      // On stack, before: ...
      // On stack, after: blockParam[name], ...
      //
      // Looks up the value of `parts` on the given block param and pushes
      // it onto the stack.
      lookupBlockParam: /* @__PURE__ */ __name(function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;
        this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]);
        this.resolvePath("context", parts, 1);
      }, "lookupBlockParam"),
      // [lookupData]
      //
      // On stack, before: ...
      // On stack, after: data, ...
      //
      // Push the data lookup operator
      lookupData: /* @__PURE__ */ __name(function lookupData(depth, parts, strict) {
        if (!depth) {
          this.pushStackLiteral("data");
        } else {
          this.pushStackLiteral("container.data(data, " + depth + ")");
        }
        this.resolvePath("data", parts, 0, true, strict);
      }, "lookupData"),
      resolvePath: /* @__PURE__ */ __name(function resolvePath(type, parts, i, falsy, strict) {
        var _this2 = this;
        if (this.options.strict || this.options.assumeObjects) {
          this.push(strictLookup(this.options.strict && strict, this, parts, i, type));
          return;
        }
        var len = parts.length;
        for (; i < len; i++) {
          this.replaceStack(function(current) {
            var lookup2 = _this2.nameLookup(current, parts[i], type);
            if (!falsy) {
              return [" != null ? ", lookup2, " : ", current];
            } else {
              return [" && ", lookup2];
            }
          });
        }
      }, "resolvePath"),
      // [resolvePossibleLambda]
      //
      // On stack, before: value, ...
      // On stack, after: resolved value, ...
      //
      // If the `value` is a lambda, replace it on the stack by
      // the return value of the lambda
      resolvePossibleLambda: /* @__PURE__ */ __name(function resolvePossibleLambda() {
        this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
      }, "resolvePossibleLambda"),
      // [pushStringParam]
      //
      // On stack, before: ...
      // On stack, after: string, currentContext, ...
      //
      // This opcode is designed for use in string mode, which
      // provides the string value of a parameter along with its
      // depth rather than resolving it immediately.
      pushStringParam: /* @__PURE__ */ __name(function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);
        if (type !== "SubExpression") {
          if (typeof string === "string") {
            this.pushString(string);
          } else {
            this.pushStackLiteral(string);
          }
        }
      }, "pushStringParam"),
      emptyHash: /* @__PURE__ */ __name(function emptyHash(omitEmpty) {
        if (this.trackIds) {
          this.push("{}");
        }
        if (this.stringParams) {
          this.push("{}");
          this.push("{}");
        }
        this.pushStackLiteral(omitEmpty ? "undefined" : "{}");
      }, "emptyHash"),
      pushHash: /* @__PURE__ */ __name(function pushHash() {
        if (this.hash) {
          this.hashes.push(this.hash);
        }
        this.hash = { values: {}, types: [], contexts: [], ids: [] };
      }, "pushHash"),
      popHash: /* @__PURE__ */ __name(function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) {
          this.push(this.objectLiteral(hash.ids));
        }
        if (this.stringParams) {
          this.push(this.objectLiteral(hash.contexts));
          this.push(this.objectLiteral(hash.types));
        }
        this.push(this.objectLiteral(hash.values));
      }, "popHash"),
      // [pushString]
      //
      // On stack, before: ...
      // On stack, after: quotedString(string), ...
      //
      // Push a quoted version of `string` onto the stack
      pushString: /* @__PURE__ */ __name(function pushString(string) {
        this.pushStackLiteral(this.quotedString(string));
      }, "pushString"),
      // [pushLiteral]
      //
      // On stack, before: ...
      // On stack, after: value, ...
      //
      // Pushes a value onto the stack. This operation prevents
      // the compiler from creating a temporary variable to hold
      // it.
      pushLiteral: /* @__PURE__ */ __name(function pushLiteral(value) {
        this.pushStackLiteral(value);
      }, "pushLiteral"),
      // [pushProgram]
      //
      // On stack, before: ...
      // On stack, after: program(guid), ...
      //
      // Push a program expression onto the stack. This takes
      // a compile-time guid and converts it into a runtime-accessible
      // expression.
      pushProgram: /* @__PURE__ */ __name(function pushProgram(guid) {
        if (guid != null) {
          this.pushStackLiteral(this.programExpression(guid));
        } else {
          this.pushStackLiteral(null);
        }
      }, "pushProgram"),
      // [registerDecorator]
      //
      // On stack, before: hash, program, params..., ...
      // On stack, after: ...
      //
      // Pops off the decorator's parameters, invokes the decorator,
      // and inserts the decorator into the decorators list.
      registerDecorator: /* @__PURE__ */ __name(function registerDecorator(paramSize, name) {
        var foundDecorator = this.nameLookup("decorators", name, "decorator"), options = this.setupHelperArgs(name, paramSize);
        this.decorators.push(["fn = ", this.decorators.functionCall(foundDecorator, "", ["fn", "props", "container", options]), " || fn;"]);
      }, "registerDecorator"),
      // [invokeHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // Pops off the helper's parameters, invokes the helper,
      // and pushes the helper's return value onto the stack.
      //
      // If the helper is not found, `helperMissing` is called.
      invokeHelper: /* @__PURE__ */ __name(function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name);
        var possibleFunctionCalls = [];
        if (isSimple) {
          possibleFunctionCalls.push(helper.name);
        }
        possibleFunctionCalls.push(nonHelper);
        if (!this.options.strict) {
          possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"));
        }
        var functionLookupCode = ["(", this.itemsSeparatedBy(possibleFunctionCalls, "||"), ")"];
        var functionCall = this.source.functionCall(functionLookupCode, "call", helper.callParams);
        this.push(functionCall);
      }, "invokeHelper"),
      itemsSeparatedBy: /* @__PURE__ */ __name(function itemsSeparatedBy(items, separator) {
        var result = [];
        result.push(items[0]);
        for (var i = 1; i < items.length; i++) {
          result.push(separator, items[i]);
        }
        return result;
      }, "itemsSeparatedBy"),
      // [invokeKnownHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // This operation is used when the helper is known to exist,
      // so a `helperMissing` fallback is not required.
      invokeKnownHelper: /* @__PURE__ */ __name(function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, "call", helper.callParams));
      }, "invokeKnownHelper"),
      // [invokeAmbiguous]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of disambiguation
      //
      // This operation is used when an expression like `{{foo}}`
      // is provided, but we don't know at compile-time whether it
      // is a helper or a path.
      //
      // This operation emits more code than the other options,
      // and can be avoided by passing the `knownHelpers` and
      // `knownHelpersOnly` flags at compile-time.
      invokeAmbiguous: /* @__PURE__ */ __name(function invokeAmbiguous(name, helperCall) {
        this.useRegister("helper");
        var nonHelper = this.popStack();
        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);
        var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
        var lookup2 = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
        if (!this.options.strict) {
          lookup2[0] = "(helper = ";
          lookup2.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
        }
        this.push(["(", lookup2, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"]);
      }, "invokeAmbiguous"),
      // [invokePartial]
      //
      // On stack, before: context, ...
      // On stack after: result of partial invocation
      //
      // This operation pops off a context, invokes a partial with that context,
      // and pushes the result of the invocation back.
      invokePartial: /* @__PURE__ */ __name(function invokePartial(isDynamic, name, indent) {
        var params = [], options = this.setupParams(name, 1, params);
        if (isDynamic) {
          name = this.popStack();
          delete options.name;
        }
        if (indent) {
          options.indent = JSON.stringify(indent);
        }
        options.helpers = "helpers";
        options.partials = "partials";
        options.decorators = "container.decorators";
        if (!isDynamic) {
          params.unshift(this.nameLookup("partials", name, "partial"));
        } else {
          params.unshift(name);
        }
        if (this.options.compat) {
          options.depths = "depths";
        }
        options = this.objectLiteral(options);
        params.push(options);
        this.push(this.source.functionCall("container.invokePartial", "", params));
      }, "invokePartial"),
      // [assignToHash]
      //
      // On stack, before: value, ..., hash, ...
      // On stack, after: ..., hash, ...
      //
      // Pops a value off the stack and assigns it to the current hash
      assignToHash: /* @__PURE__ */ __name(function assignToHash(key) {
        var value = this.popStack(), context = void 0, type = void 0, id = void 0;
        if (this.trackIds) {
          id = this.popStack();
        }
        if (this.stringParams) {
          type = this.popStack();
          context = this.popStack();
        }
        var hash = this.hash;
        if (context) {
          hash.contexts[key] = context;
        }
        if (type) {
          hash.types[key] = type;
        }
        if (id) {
          hash.ids[key] = id;
        }
        hash.values[key] = value;
      }, "assignToHash"),
      pushId: /* @__PURE__ */ __name(function pushId(type, name, child) {
        if (type === "BlockParam") {
          this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""));
        } else if (type === "PathExpression") {
          this.pushString(name);
        } else if (type === "SubExpression") {
          this.pushStackLiteral("true");
        } else {
          this.pushStackLiteral("null");
        }
      }, "pushId"),
      // HELPERS
      compiler: JavaScriptCompiler,
      compileChildren: /* @__PURE__ */ __name(function compileChildren(environment, options) {
        var children = environment.children, child = void 0, compiler = void 0;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          compiler = new this.compiler();
          var existing = this.matchExistingProgram(child);
          if (existing == null) {
            this.context.programs.push("");
            var index = this.context.programs.length;
            child.index = index;
            child.name = "program" + index;
            this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
            this.context.decorators[index] = compiler.decorators;
            this.context.environments[index] = child;
            this.useDepths = this.useDepths || compiler.useDepths;
            this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
            child.useDepths = this.useDepths;
            child.useBlockParams = this.useBlockParams;
          } else {
            child.index = existing.index;
            child.name = "program" + existing.index;
            this.useDepths = this.useDepths || existing.useDepths;
            this.useBlockParams = this.useBlockParams || existing.useBlockParams;
          }
        }
      }, "compileChildren"),
      matchExistingProgram: /* @__PURE__ */ __name(function matchExistingProgram(child) {
        for (var i = 0, len = this.context.environments.length; i < len; i++) {
          var environment = this.context.environments[i];
          if (environment && environment.equals(child)) {
            return environment;
          }
        }
      }, "matchExistingProgram"),
      programExpression: /* @__PURE__ */ __name(function programExpression(guid) {
        var child = this.environment.children[guid], programParams = [child.index, "data", child.blockParams];
        if (this.useBlockParams || this.useDepths) {
          programParams.push("blockParams");
        }
        if (this.useDepths) {
          programParams.push("depths");
        }
        return "container.program(" + programParams.join(", ") + ")";
      }, "programExpression"),
      useRegister: /* @__PURE__ */ __name(function useRegister(name) {
        if (!this.registers[name]) {
          this.registers[name] = true;
          this.registers.list.push(name);
        }
      }, "useRegister"),
      push: /* @__PURE__ */ __name(function push(expr) {
        if (!(expr instanceof Literal)) {
          expr = this.source.wrap(expr);
        }
        this.inlineStack.push(expr);
        return expr;
      }, "push"),
      pushStackLiteral: /* @__PURE__ */ __name(function pushStackLiteral(item) {
        this.push(new Literal(item));
      }, "pushStackLiteral"),
      pushSource: /* @__PURE__ */ __name(function pushSource(source) {
        if (this.pendingContent) {
          this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = void 0;
        }
        if (source) {
          this.source.push(source);
        }
      }, "pushSource"),
      replaceStack: /* @__PURE__ */ __name(function replaceStack(callback) {
        var prefix = ["("], stack = void 0, createdStack = void 0, usedLiteral = void 0;
        if (!this.isInline()) {
          throw new _exception2["default"]("replaceStack on non-inline");
        }
        var top = this.popStack(true);
        if (top instanceof Literal) {
          stack = [top.value];
          prefix = ["(", stack];
          usedLiteral = true;
        } else {
          createdStack = true;
          var _name = this.incrStack();
          prefix = ["((", this.push(_name), " = ", top, ")"];
          stack = this.topStack();
        }
        var item = callback.call(this, stack);
        if (!usedLiteral) {
          this.popStack();
        }
        if (createdStack) {
          this.stackSlot--;
        }
        this.push(prefix.concat(item, ")"));
      }, "replaceStack"),
      incrStack: /* @__PURE__ */ __name(function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) {
          this.stackVars.push("stack" + this.stackSlot);
        }
        return this.topStackName();
      }, "incrStack"),
      topStackName: /* @__PURE__ */ __name(function topStackName() {
        return "stack" + this.stackSlot;
      }, "topStackName"),
      flushInline: /* @__PURE__ */ __name(function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            var stack = this.incrStack();
            this.pushSource([stack, " = ", entry, ";"]);
            this.compileStack.push(stack);
          }
        }
      }, "flushInline"),
      isInline: /* @__PURE__ */ __name(function isInline() {
        return this.inlineStack.length;
      }, "isInline"),
      popStack: /* @__PURE__ */ __name(function popStack(wrapped) {
        var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
        if (!wrapped && item instanceof Literal) {
          return item.value;
        } else {
          if (!inline) {
            if (!this.stackSlot) {
              throw new _exception2["default"]("Invalid stack pop");
            }
            this.stackSlot--;
          }
          return item;
        }
      }, "popStack"),
      topStack: /* @__PURE__ */ __name(function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
        if (item instanceof Literal) {
          return item.value;
        } else {
          return item;
        }
      }, "topStack"),
      contextName: /* @__PURE__ */ __name(function contextName(context) {
        if (this.useDepths && context) {
          return "depths[" + context + "]";
        } else {
          return "depth" + context;
        }
      }, "contextName"),
      quotedString: /* @__PURE__ */ __name(function quotedString(str) {
        return this.source.quotedString(str);
      }, "quotedString"),
      objectLiteral: /* @__PURE__ */ __name(function objectLiteral(obj) {
        return this.source.objectLiteral(obj);
      }, "objectLiteral"),
      aliasable: /* @__PURE__ */ __name(function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
          ret.referenceCount++;
          return ret;
        }
        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;
        return ret;
      }, "aliasable"),
      setupHelper: /* @__PURE__ */ __name(function setupHelper(paramSize, name, blockHelper) {
        var params = [], paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup("helpers", name, "helper"), callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
        return {
          params,
          paramsInit,
          name: foundHelper,
          callParams: [callContext].concat(params)
        };
      }, "setupHelper"),
      setupParams: /* @__PURE__ */ __name(function setupParams(helper, paramSize, params) {
        var options = {}, contexts = [], types = [], ids = [], objectArgs = !params, param = void 0;
        if (objectArgs) {
          params = [];
        }
        options.name = this.quotedString(helper);
        options.hash = this.popStack();
        if (this.trackIds) {
          options.hashIds = this.popStack();
        }
        if (this.stringParams) {
          options.hashTypes = this.popStack();
          options.hashContexts = this.popStack();
        }
        var inverse = this.popStack(), program = this.popStack();
        if (program || inverse) {
          options.fn = program || "container.noop";
          options.inverse = inverse || "container.noop";
        }
        var i = paramSize;
        while (i--) {
          param = this.popStack();
          params[i] = param;
          if (this.trackIds) {
            ids[i] = this.popStack();
          }
          if (this.stringParams) {
            types[i] = this.popStack();
            contexts[i] = this.popStack();
          }
        }
        if (objectArgs) {
          options.args = this.source.generateArray(params);
        }
        if (this.trackIds) {
          options.ids = this.source.generateArray(ids);
        }
        if (this.stringParams) {
          options.types = this.source.generateArray(types);
          options.contexts = this.source.generateArray(contexts);
        }
        if (this.options.data) {
          options.data = "data";
        }
        if (this.useBlockParams) {
          options.blockParams = "blockParams";
        }
        return options;
      }, "setupParams"),
      setupHelperArgs: /* @__PURE__ */ __name(function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params);
        options.loc = JSON.stringify(this.source.currentLocation);
        options = this.objectLiteral(options);
        if (useRegister) {
          this.useRegister("options");
          params.push("options");
          return ["options=", options];
        } else if (params) {
          params.push(options);
          return "";
        } else {
          return options;
        }
      }, "setupHelperArgs")
    };
    (function() {
      var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" ");
      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
      for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true;
      }
    })();
    JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
      return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
    };
    function strictLookup(requireTerminal, compiler, parts, i, type) {
      var stack = compiler.popStack(), len = parts.length;
      if (requireTerminal) {
        len--;
      }
      for (; i < len; i++) {
        stack = compiler.nameLookup(stack, parts[i], type);
      }
      if (requireTerminal) {
        return [compiler.aliasable("container.strict"), "(", stack, ", ", compiler.quotedString(parts[i]), ", ", JSON.stringify(compiler.source.currentLocation), " )"];
      } else {
        return stack;
      }
    }
    __name(strictLookup, "strictLookup");
    exports2["default"] = JavaScriptCompiler;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars.js
var require_handlebars = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars.js"(exports2, module2) {
    "use strict";
    exports2.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _handlebarsRuntime = require_handlebars_runtime();
    var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
    var _handlebarsCompilerAst = require_ast();
    var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
    var _handlebarsCompilerBase = require_base2();
    var _handlebarsCompilerCompiler = require_compiler();
    var _handlebarsCompilerJavascriptCompiler = require_javascript_compiler();
    var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
    var _handlebarsCompilerVisitor = require_visitor();
    var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
    var _handlebarsNoConflict = require_no_conflict();
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    var _create = _handlebarsRuntime2["default"].create;
    function create() {
      var hb = _create();
      hb.compile = function(input, options) {
        return _handlebarsCompilerCompiler.compile(input, options, hb);
      };
      hb.precompile = function(input, options) {
        return _handlebarsCompilerCompiler.precompile(input, options, hb);
      };
      hb.AST = _handlebarsCompilerAst2["default"];
      hb.Compiler = _handlebarsCompilerCompiler.Compiler;
      hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
      hb.Parser = _handlebarsCompilerBase.parser;
      hb.parse = _handlebarsCompilerBase.parse;
      hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;
      return hb;
    }
    __name(create, "create");
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst.Visitor = _handlebarsCompilerVisitor2["default"];
    inst["default"] = inst;
    exports2["default"] = inst;
    module2.exports = exports2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/printer.js
var require_printer = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/printer.js"(exports2) {
    "use strict";
    exports2.__esModule = true;
    exports2.print = print;
    exports2.PrintVisitor = PrintVisitor;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    var _visitor = require_visitor();
    var _visitor2 = _interopRequireDefault(_visitor);
    function print(ast) {
      return new PrintVisitor().accept(ast);
    }
    __name(print, "print");
    function PrintVisitor() {
      this.padding = 0;
    }
    __name(PrintVisitor, "PrintVisitor");
    PrintVisitor.prototype = new _visitor2["default"]();
    PrintVisitor.prototype.pad = function(string) {
      var out = "";
      for (var i = 0, l = this.padding; i < l; i++) {
        out += "  ";
      }
      out += string + "\n";
      return out;
    };
    PrintVisitor.prototype.Program = function(program) {
      var out = "", body = program.body, i = void 0, l = void 0;
      if (program.blockParams) {
        var blockParams = "BLOCK PARAMS: [";
        for (i = 0, l = program.blockParams.length; i < l; i++) {
          blockParams += " " + program.blockParams[i];
        }
        blockParams += " ]";
        out += this.pad(blockParams);
      }
      for (i = 0, l = body.length; i < l; i++) {
        out += this.accept(body[i]);
      }
      this.padding--;
      return out;
    };
    PrintVisitor.prototype.MustacheStatement = function(mustache) {
      return this.pad("{{ " + this.SubExpression(mustache) + " }}");
    };
    PrintVisitor.prototype.Decorator = function(mustache) {
      return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}");
    };
    PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function(block) {
      var out = "";
      out += this.pad((block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:");
      this.padding++;
      out += this.pad(this.SubExpression(block));
      if (block.program) {
        out += this.pad("PROGRAM:");
        this.padding++;
        out += this.accept(block.program);
        this.padding--;
      }
      if (block.inverse) {
        if (block.program) {
          this.padding++;
        }
        out += this.pad("{{^}}");
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) {
          this.padding--;
        }
      }
      this.padding--;
      return out;
    };
    PrintVisitor.prototype.PartialStatement = function(partial) {
      var content = "PARTIAL:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash);
      }
      return this.pad("{{> " + content + " }}");
    };
    PrintVisitor.prototype.PartialBlockStatement = function(partial) {
      var content = "PARTIAL BLOCK:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash);
      }
      content += " " + this.pad("PROGRAM:");
      this.padding++;
      content += this.accept(partial.program);
      this.padding--;
      return this.pad("{{> " + content + " }}");
    };
    PrintVisitor.prototype.ContentStatement = function(content) {
      return this.pad("CONTENT[ '" + content.value + "' ]");
    };
    PrintVisitor.prototype.CommentStatement = function(comment) {
      return this.pad("{{! '" + comment.value + "' }}");
    };
    PrintVisitor.prototype.SubExpression = function(sexpr) {
      var params = sexpr.params, paramStrings = [], hash = void 0;
      for (var i = 0, l = params.length; i < l; i++) {
        paramStrings.push(this.accept(params[i]));
      }
      params = "[" + paramStrings.join(", ") + "]";
      hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";
      return this.accept(sexpr.path) + " " + params + hash;
    };
    PrintVisitor.prototype.PathExpression = function(id) {
      var path2 = id.parts.join("/");
      return (id.data ? "@" : "") + "PATH:" + path2;
    };
    PrintVisitor.prototype.StringLiteral = function(string) {
      return '"' + string.value + '"';
    };
    PrintVisitor.prototype.NumberLiteral = function(number) {
      return "NUMBER{" + number.value + "}";
    };
    PrintVisitor.prototype.BooleanLiteral = function(bool) {
      return "BOOLEAN{" + bool.value + "}";
    };
    PrintVisitor.prototype.UndefinedLiteral = function() {
      return "UNDEFINED";
    };
    PrintVisitor.prototype.NullLiteral = function() {
      return "NULL";
    };
    PrintVisitor.prototype.Hash = function(hash) {
      var pairs = hash.pairs, joinedPairs = [];
      for (var i = 0, l = pairs.length; i < l; i++) {
        joinedPairs.push(this.accept(pairs[i]));
      }
      return "HASH{" + joinedPairs.join(", ") + "}";
    };
    PrintVisitor.prototype.HashPair = function(pair) {
      return pair.key + "=" + this.accept(pair.value);
    };
  }
});

// node_modules/handlebars/lib/index.js
var require_lib = __commonJS({
  "node_modules/handlebars/lib/index.js"(exports2, module2) {
    var handlebars = require_handlebars()["default"];
    var printer = require_printer();
    handlebars.PrintVisitor = printer.PrintVisitor;
    handlebars.print = printer.print;
    module2.exports = handlebars;
    function extension(module3, filename) {
      var fs = require("fs");
      var templateString = fs.readFileSync(filename, "utf8");
      module3.exports = handlebars.compile(templateString);
    }
    __name(extension, "extension");
    if (typeof require !== "undefined" && require.extensions) {
      require.extensions[".handlebars"] = extension;
      require.extensions[".hbs"] = extension;
    }
  }
});

// utils.js
var require_utils2 = __commonJS({
  "utils.js"(exports2, module2) {
    var fs = require("fs");
    var path2 = require("path");
    var Handlebars = require_lib();
    var readFile = /* @__PURE__ */ __name(function(filePath) {
      const resolvedFilePath = path2.join(process.cwd(), filePath);
      return fs.readFileSync(resolvedFilePath, "utf-8");
    }, "readFile");
    var render = /* @__PURE__ */ __name(function(template, count) {
      const compiled = Handlebars.compile(template);
      return compiled({ count });
    }, "render");
    module2.exports = {
      readFile,
      render
    };
  }
});

// target/test/main.wsim/.wing/inflight.Utils-1.cjs
var require_inflight_Utils_1 = __commonJS({
  "target/test/main.wsim/.wing/inflight.Utils-1.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({}) {
      class Utils {
        static {
          __name(this, "Utils");
        }
        constructor({}) {
        }
        static async render(template, value) {
          return require_utils2()["render"](template, value);
        }
        static async rendercrud(template, value) {
          return require_utils2()["rendercrud"](template, value);
        }
      }
      return Utils;
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
var require_lib2 = __commonJS({
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
    var constructs_1 = require_lib2();
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
var require_types = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/core/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SECRET_SYMBOL = exports2.INFLIGHT_SYMBOL = exports2.Construct = void 0;
    var constructs_1 = require_lib2();
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
    var types_1 = require_types();
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

// target/test/main.wsim/.wing/onrequesthandler4_c8510dab.sandbox.cjs
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
        const $Closure6Client = require_inflight_Closure6_1()({
          $Utils: require_inflight_Utils_1()({}),
          $counter: function() {
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
            const backend = require_client().makeSimulatorClient(simulatorUrl, handle, caller);
            const client2 = new Proxy(backend, {
              get: function(target, prop, receiver) {
                return async function(...args) {
                  return backend.call(prop, args);
                };
              }
            });
            return client2;
          }(),
          $templates: function() {
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
            return require_client().makeSimulatorClient(simulatorUrl, handle, caller);
          }()
        });
        const client = new $Closure6Client({});
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
//# sourceMappingURL=index.cjs.map
