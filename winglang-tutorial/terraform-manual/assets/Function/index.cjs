"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

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

// target/main.tfaws/.wing/inflight.$Closure2-1.cjs
var require_inflight_Closure2_1 = __commonJS({
  "target/main.tfaws/.wing/inflight.$Closure2-1.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({ $q }) {
      class $Closure2 {
        static {
          __name(this, "$Closure2");
        }
        constructor({}) {
          const $obj = /* @__PURE__ */ __name((...args) => this.handle(...args), "$obj");
          Object.setPrototypeOf($obj, this);
          return $obj;
        }
        async handle(s) {
          await $q.push($helpers.unwrap(s));
          if ($helpers.eq(s, "")) {
            console.log("Function was invoked without a payload");
          } else {
            console.log(String.raw({ raw: ["Function was called with argument '", "'"] }, $helpers.unwrap(s)));
          }
        }
      }
      return $Closure2;
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/types/dist-cjs/index.js
var require_dist_cjs = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/types/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      AlgorithmId: () => AlgorithmId,
      EndpointURLScheme: () => EndpointURLScheme,
      FieldPosition: () => FieldPosition,
      HttpApiKeyAuthLocation: () => HttpApiKeyAuthLocation,
      HttpAuthLocation: () => HttpAuthLocation,
      IniSectionType: () => IniSectionType,
      RequestHandlerProtocol: () => RequestHandlerProtocol,
      SMITHY_CONTEXT_KEY: () => SMITHY_CONTEXT_KEY,
      getDefaultClientConfiguration: () => getDefaultClientConfiguration,
      resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var HttpAuthLocation = /* @__PURE__ */ ((HttpAuthLocation2) => {
      HttpAuthLocation2["HEADER"] = "header";
      HttpAuthLocation2["QUERY"] = "query";
      return HttpAuthLocation2;
    })(HttpAuthLocation || {});
    var HttpApiKeyAuthLocation = /* @__PURE__ */ ((HttpApiKeyAuthLocation2) => {
      HttpApiKeyAuthLocation2["HEADER"] = "header";
      HttpApiKeyAuthLocation2["QUERY"] = "query";
      return HttpApiKeyAuthLocation2;
    })(HttpApiKeyAuthLocation || {});
    var EndpointURLScheme = /* @__PURE__ */ ((EndpointURLScheme2) => {
      EndpointURLScheme2["HTTP"] = "http";
      EndpointURLScheme2["HTTPS"] = "https";
      return EndpointURLScheme2;
    })(EndpointURLScheme || {});
    var AlgorithmId = /* @__PURE__ */ ((AlgorithmId2) => {
      AlgorithmId2["MD5"] = "md5";
      AlgorithmId2["CRC32"] = "crc32";
      AlgorithmId2["CRC32C"] = "crc32c";
      AlgorithmId2["SHA1"] = "sha1";
      AlgorithmId2["SHA256"] = "sha256";
      return AlgorithmId2;
    })(AlgorithmId || {});
    var getChecksumConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      const checksumAlgorithms = [];
      if (runtimeConfig.sha256 !== void 0) {
        checksumAlgorithms.push({
          algorithmId: () => "sha256",
          checksumConstructor: () => runtimeConfig.sha256
        });
      }
      if (runtimeConfig.md5 != void 0) {
        checksumAlgorithms.push({
          algorithmId: () => "md5",
          checksumConstructor: () => runtimeConfig.md5
        });
      }
      return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm(algo) {
          this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
          return this._checksumAlgorithms;
        }
      };
    }, "getChecksumConfiguration");
    var resolveChecksumRuntimeConfig = /* @__PURE__ */ __name2((clientConfig) => {
      const runtimeConfig = {};
      clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
      });
      return runtimeConfig;
    }, "resolveChecksumRuntimeConfig");
    var getDefaultClientConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      return {
        ...getChecksumConfiguration(runtimeConfig)
      };
    }, "getDefaultClientConfiguration");
    var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name2((config) => {
      return {
        ...resolveChecksumRuntimeConfig(config)
      };
    }, "resolveDefaultRuntimeConfig");
    var FieldPosition = /* @__PURE__ */ ((FieldPosition2) => {
      FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
      FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
      return FieldPosition2;
    })(FieldPosition || {});
    var SMITHY_CONTEXT_KEY = "__smithy_context";
    var IniSectionType = /* @__PURE__ */ ((IniSectionType2) => {
      IniSectionType2["PROFILE"] = "profile";
      IniSectionType2["SSO_SESSION"] = "sso-session";
      IniSectionType2["SERVICES"] = "services";
      return IniSectionType2;
    })(IniSectionType || {});
    var RequestHandlerProtocol = /* @__PURE__ */ ((RequestHandlerProtocol2) => {
      RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
      RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
      RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
      return RequestHandlerProtocol2;
    })(RequestHandlerProtocol || {});
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/protocol-http/dist-cjs/index.js
var require_dist_cjs2 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/protocol-http/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      Field: () => Field,
      Fields: () => Fields,
      HttpRequest: () => HttpRequest,
      HttpResponse: () => HttpResponse,
      getHttpHandlerExtensionConfiguration: () => getHttpHandlerExtensionConfiguration,
      isValidHostname: () => isValidHostname,
      resolveHttpHandlerRuntimeConfig: () => resolveHttpHandlerRuntimeConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var getHttpHandlerExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      let httpHandler = runtimeConfig.httpHandler;
      return {
        setHttpHandler(handler) {
          httpHandler = handler;
        },
        httpHandler() {
          return httpHandler;
        },
        updateHttpClientConfig(key, value) {
          httpHandler.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs() {
          return httpHandler.httpHandlerConfigs();
        }
      };
    }, "getHttpHandlerExtensionConfiguration");
    var resolveHttpHandlerRuntimeConfig = /* @__PURE__ */ __name2((httpHandlerExtensionConfiguration) => {
      return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler()
      };
    }, "resolveHttpHandlerRuntimeConfig");
    var import_types = require_dist_cjs();
    var _Field = class _Field {
      static {
        __name(this, "_Field");
      }
      constructor({ name, kind = import_types.FieldPosition.HEADER, values = [] }) {
        this.name = name;
        this.kind = kind;
        this.values = values;
      }
      /**
       * Appends a value to the field.
       *
       * @param value The value to append.
       */
      add(value) {
        this.values.push(value);
      }
      /**
       * Overwrite existing field values.
       *
       * @param values The new field values.
       */
      set(values) {
        this.values = values;
      }
      /**
       * Remove all matching entries from list.
       *
       * @param value Value to remove.
       */
      remove(value) {
        this.values = this.values.filter((v) => v !== value);
      }
      /**
       * Get comma-delimited string.
       *
       * @returns String representation of {@link Field}.
       */
      toString() {
        return this.values.map((v) => v.includes(",") || v.includes(" ") ? `"${v}"` : v).join(", ");
      }
      /**
       * Get string values as a list
       *
       * @returns Values in {@link Field} as a list.
       */
      get() {
        return this.values;
      }
    };
    __name2(_Field, "Field");
    var Field = _Field;
    var _Fields = class _Fields {
      static {
        __name(this, "_Fields");
      }
      constructor({ fields = [], encoding = "utf-8" }) {
        this.entries = {};
        fields.forEach(this.setField.bind(this));
        this.encoding = encoding;
      }
      /**
       * Set entry for a {@link Field} name. The `name`
       * attribute will be used to key the collection.
       *
       * @param field The {@link Field} to set.
       */
      setField(field) {
        this.entries[field.name.toLowerCase()] = field;
      }
      /**
       *  Retrieve {@link Field} entry by name.
       *
       * @param name The name of the {@link Field} entry
       *  to retrieve
       * @returns The {@link Field} if it exists.
       */
      getField(name) {
        return this.entries[name.toLowerCase()];
      }
      /**
       * Delete entry from collection.
       *
       * @param name Name of the entry to delete.
       */
      removeField(name) {
        delete this.entries[name.toLowerCase()];
      }
      /**
       * Helper function for retrieving specific types of fields.
       * Used to grab all headers or all trailers.
       *
       * @param kind {@link FieldPosition} of entries to retrieve.
       * @returns The {@link Field} entries with the specified
       *  {@link FieldPosition}.
       */
      getByType(kind) {
        return Object.values(this.entries).filter((field) => field.kind === kind);
      }
    };
    __name2(_Fields, "Fields");
    var Fields = _Fields;
    var _HttpRequest = class _HttpRequest2 {
      static {
        __name(this, "_HttpRequest");
      }
      constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
        this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
      }
      static isInstance(request) {
        if (!request)
          return false;
        const req = request;
        return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
      }
      clone() {
        const cloned = new _HttpRequest2({
          ...this,
          headers: { ...this.headers }
        });
        if (cloned.query)
          cloned.query = cloneQuery(cloned.query);
        return cloned;
      }
    };
    __name2(_HttpRequest, "HttpRequest");
    var HttpRequest = _HttpRequest;
    function cloneQuery(query) {
      return Object.keys(query).reduce((carry, paramName) => {
        const param = query[paramName];
        return {
          ...carry,
          [paramName]: Array.isArray(param) ? [...param] : param
        };
      }, {});
    }
    __name(cloneQuery, "cloneQuery");
    __name2(cloneQuery, "cloneQuery");
    var _HttpResponse = class _HttpResponse {
      static {
        __name(this, "_HttpResponse");
      }
      constructor(options) {
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
      }
      static isInstance(response) {
        if (!response)
          return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
      }
    };
    __name2(_HttpResponse, "HttpResponse");
    var HttpResponse = _HttpResponse;
    function isValidHostname(hostname) {
      const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
      return hostPattern.test(hostname);
    }
    __name(isValidHostname, "isValidHostname");
    __name2(isValidHostname, "isValidHostname");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-host-header/dist-cjs/index.js
var require_dist_cjs3 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-host-header/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      getHostHeaderPlugin: () => getHostHeaderPlugin,
      hostHeaderMiddleware: () => hostHeaderMiddleware,
      hostHeaderMiddlewareOptions: () => hostHeaderMiddlewareOptions,
      resolveHostHeaderConfig: () => resolveHostHeaderConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_protocol_http = require_dist_cjs2();
    function resolveHostHeaderConfig(input) {
      return input;
    }
    __name(resolveHostHeaderConfig, "resolveHostHeaderConfig");
    __name2(resolveHostHeaderConfig, "resolveHostHeaderConfig");
    var hostHeaderMiddleware = /* @__PURE__ */ __name2((options) => (next) => async (args) => {
      if (!import_protocol_http.HttpRequest.isInstance(args.request))
        return next(args);
      const { request } = args;
      const { handlerProtocol = "" } = options.requestHandler.metadata || {};
      if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
        delete request.headers["host"];
        request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
      } else if (!request.headers["host"]) {
        let host = request.hostname;
        if (request.port != null)
          host += `:${request.port}`;
        request.headers["host"] = host;
      }
      return next(args);
    }, "hostHeaderMiddleware");
    var hostHeaderMiddlewareOptions = {
      name: "hostHeaderMiddleware",
      step: "build",
      priority: "low",
      tags: ["HOST"],
      override: true
    };
    var getHostHeaderPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
      }
    }), "getHostHeaderPlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-logger/dist-cjs/index.js
var require_dist_cjs4 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-logger/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      getLoggerPlugin: () => getLoggerPlugin,
      loggerMiddleware: () => loggerMiddleware,
      loggerMiddlewareOptions: () => loggerMiddlewareOptions
    });
    module2.exports = __toCommonJS2(src_exports);
    var loggerMiddleware = /* @__PURE__ */ __name2(() => (next, context) => async (args) => {
      var _a, _b;
      try {
        const response = await next(args);
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
        const { $metadata, ...outputWithoutMetadata } = response.output;
        (_a = logger == null ? void 0 : logger.info) == null ? void 0 : _a.call(logger, {
          clientName,
          commandName,
          input: inputFilterSensitiveLog(args.input),
          output: outputFilterSensitiveLog(outputWithoutMetadata),
          metadata: $metadata
        });
        return response;
      } catch (error) {
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, {
          clientName,
          commandName,
          input: inputFilterSensitiveLog(args.input),
          error,
          metadata: error.$metadata
        });
        throw error;
      }
    }, "loggerMiddleware");
    var loggerMiddlewareOptions = {
      name: "loggerMiddleware",
      tags: ["LOGGER"],
      step: "initialize",
      override: true
    };
    var getLoggerPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
      }
    }), "getLoggerPlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-recursion-detection/dist-cjs/index.js
var require_dist_cjs5 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-recursion-detection/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      addRecursionDetectionMiddlewareOptions: () => addRecursionDetectionMiddlewareOptions,
      getRecursionDetectionPlugin: () => getRecursionDetectionPlugin,
      recursionDetectionMiddleware: () => recursionDetectionMiddleware
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_protocol_http = require_dist_cjs2();
    var TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
    var ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
    var ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
    var recursionDetectionMiddleware = /* @__PURE__ */ __name2((options) => (next) => async (args) => {
      const { request } = args;
      if (!import_protocol_http.HttpRequest.isInstance(request) || options.runtime !== "node" || request.headers.hasOwnProperty(TRACE_ID_HEADER_NAME)) {
        return next(args);
      }
      const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
      const traceId = process.env[ENV_TRACE_ID];
      const nonEmptyString = /* @__PURE__ */ __name2((str) => typeof str === "string" && str.length > 0, "nonEmptyString");
      if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
        request.headers[TRACE_ID_HEADER_NAME] = traceId;
      }
      return next({
        ...args,
        request
      });
    }, "recursionDetectionMiddleware");
    var addRecursionDetectionMiddlewareOptions = {
      step: "build",
      tags: ["RECURSION_DETECTION"],
      name: "recursionDetectionMiddleware",
      override: true,
      priority: "low"
    };
    var getRecursionDetectionPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
      }
    }), "getRecursionDetectionPlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-stack/dist-cjs/index.js
var require_dist_cjs6 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-stack/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      constructStack: () => constructStack
    });
    module2.exports = __toCommonJS2(src_exports);
    var getAllAliases = /* @__PURE__ */ __name2((name, aliases) => {
      const _aliases = [];
      if (name) {
        _aliases.push(name);
      }
      if (aliases) {
        for (const alias of aliases) {
          _aliases.push(alias);
        }
      }
      return _aliases;
    }, "getAllAliases");
    var getMiddlewareNameWithAliases = /* @__PURE__ */ __name2((name, aliases) => {
      return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
    }, "getMiddlewareNameWithAliases");
    var constructStack = /* @__PURE__ */ __name2(() => {
      let absoluteEntries = [];
      let relativeEntries = [];
      let identifyOnResolve = false;
      const entriesNameSet = /* @__PURE__ */ new Set();
      const sort = /* @__PURE__ */ __name2((entries) => entries.sort(
        (a, b) => stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]
      ), "sort");
      const removeByName = /* @__PURE__ */ __name2((toRemove) => {
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name2((entry) => {
          const aliases = getAllAliases(entry.name, entry.aliases);
          if (aliases.includes(toRemove)) {
            isRemoved = true;
            for (const alias of aliases) {
              entriesNameSet.delete(alias);
            }
            return false;
          }
          return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
      }, "removeByName");
      const removeByReference = /* @__PURE__ */ __name2((toRemove) => {
        let isRemoved = false;
        const filterCb = /* @__PURE__ */ __name2((entry) => {
          if (entry.middleware === toRemove) {
            isRemoved = true;
            for (const alias of getAllAliases(entry.name, entry.aliases)) {
              entriesNameSet.delete(alias);
            }
            return false;
          }
          return true;
        }, "filterCb");
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
      }, "removeByReference");
      const cloneTo = /* @__PURE__ */ __name2((toStack) => {
        var _a;
        absoluteEntries.forEach((entry) => {
          toStack.add(entry.middleware, { ...entry });
        });
        relativeEntries.forEach((entry) => {
          toStack.addRelativeTo(entry.middleware, { ...entry });
        });
        (_a = toStack.identifyOnResolve) == null ? void 0 : _a.call(toStack, stack.identifyOnResolve());
        return toStack;
      }, "cloneTo");
      const expandRelativeMiddlewareList = /* @__PURE__ */ __name2((from) => {
        const expandedMiddlewareList = [];
        from.before.forEach((entry) => {
          if (entry.before.length === 0 && entry.after.length === 0) {
            expandedMiddlewareList.push(entry);
          } else {
            expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
          }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry) => {
          if (entry.before.length === 0 && entry.after.length === 0) {
            expandedMiddlewareList.push(entry);
          } else {
            expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
          }
        });
        return expandedMiddlewareList;
      }, "expandRelativeMiddlewareList");
      const getMiddlewareList = /* @__PURE__ */ __name2((debug = false) => {
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry) => {
          const normalizedEntry = {
            ...entry,
            before: [],
            after: []
          };
          for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
            normalizedEntriesNameMap[alias] = normalizedEntry;
          }
          normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry) => {
          const normalizedEntry = {
            ...entry,
            before: [],
            after: []
          };
          for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)) {
            normalizedEntriesNameMap[alias] = normalizedEntry;
          }
          normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry) => {
          if (entry.toMiddleware) {
            const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
            if (toMiddleware === void 0) {
              if (debug) {
                return;
              }
              throw new Error(
                `${entry.toMiddleware} is not found when adding ${getMiddlewareNameWithAliases(entry.name, entry.aliases)} middleware ${entry.relation} ${entry.toMiddleware}`
              );
            }
            if (entry.relation === "after") {
              toMiddleware.after.push(entry);
            }
            if (entry.relation === "before") {
              toMiddleware.before.push(entry);
            }
          }
        });
        const mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce(
          (wholeList, expandedMiddlewareList) => {
            wholeList.push(...expandedMiddlewareList);
            return wholeList;
          },
          []
        );
        return mainChain;
      }, "getMiddlewareList");
      const stack = {
        add: (middleware, options = {}) => {
          const { name, override, aliases: _aliases } = options;
          const entry = {
            step: "initialize",
            priority: "normal",
            middleware,
            ...options
          };
          const aliases = getAllAliases(name, _aliases);
          if (aliases.length > 0) {
            if (aliases.some((alias) => entriesNameSet.has(alias))) {
              if (!override)
                throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
              for (const alias of aliases) {
                const toOverrideIndex = absoluteEntries.findIndex(
                  (entry2) => {
                    var _a;
                    return entry2.name === alias || ((_a = entry2.aliases) == null ? void 0 : _a.some((a) => a === alias));
                  }
                );
                if (toOverrideIndex === -1) {
                  continue;
                }
                const toOverride = absoluteEntries[toOverrideIndex];
                if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                  throw new Error(
                    `"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ${toOverride.priority} priority in ${toOverride.step} step cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ${entry.priority} priority in ${entry.step} step.`
                  );
                }
                absoluteEntries.splice(toOverrideIndex, 1);
              }
            }
            for (const alias of aliases) {
              entriesNameSet.add(alias);
            }
          }
          absoluteEntries.push(entry);
        },
        addRelativeTo: (middleware, options) => {
          const { name, override, aliases: _aliases } = options;
          const entry = {
            middleware,
            ...options
          };
          const aliases = getAllAliases(name, _aliases);
          if (aliases.length > 0) {
            if (aliases.some((alias) => entriesNameSet.has(alias))) {
              if (!override)
                throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
              for (const alias of aliases) {
                const toOverrideIndex = relativeEntries.findIndex(
                  (entry2) => {
                    var _a;
                    return entry2.name === alias || ((_a = entry2.aliases) == null ? void 0 : _a.some((a) => a === alias));
                  }
                );
                if (toOverrideIndex === -1) {
                  continue;
                }
                const toOverride = relativeEntries[toOverrideIndex];
                if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                  throw new Error(
                    `"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} "${entry.toMiddleware}" middleware.`
                  );
                }
                relativeEntries.splice(toOverrideIndex, 1);
              }
            }
            for (const alias of aliases) {
              entriesNameSet.add(alias);
            }
          }
          relativeEntries.push(entry);
        },
        clone: () => cloneTo(constructStack()),
        use: (plugin) => {
          plugin.applyToStack(stack);
        },
        remove: (toRemove) => {
          if (typeof toRemove === "string")
            return removeByName(toRemove);
          else
            return removeByReference(toRemove);
        },
        removeByTag: (toRemove) => {
          let isRemoved = false;
          const filterCb = /* @__PURE__ */ __name2((entry) => {
            const { tags, name, aliases: _aliases } = entry;
            if (tags && tags.includes(toRemove)) {
              const aliases = getAllAliases(name, _aliases);
              for (const alias of aliases) {
                entriesNameSet.delete(alias);
              }
              isRemoved = true;
              return false;
            }
            return true;
          }, "filterCb");
          absoluteEntries = absoluteEntries.filter(filterCb);
          relativeEntries = relativeEntries.filter(filterCb);
          return isRemoved;
        },
        concat: (from) => {
          var _a;
          const cloned = cloneTo(constructStack());
          cloned.use(from);
          cloned.identifyOnResolve(
            identifyOnResolve || cloned.identifyOnResolve() || (((_a = from.identifyOnResolve) == null ? void 0 : _a.call(from)) ?? false)
          );
          return cloned;
        },
        applyToStack: cloneTo,
        identify: () => {
          return getMiddlewareList(true).map((mw) => {
            const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
            return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
          });
        },
        identifyOnResolve(toggle) {
          if (typeof toggle === "boolean")
            identifyOnResolve = toggle;
          return identifyOnResolve;
        },
        resolve: (handler, context) => {
          for (const middleware of getMiddlewareList().map((entry) => entry.middleware).reverse()) {
            handler = middleware(handler, context);
          }
          if (identifyOnResolve) {
            console.log(stack.identify());
          }
          return handler;
        }
      };
      return stack;
    }, "constructStack");
    var stepWeights = {
      initialize: 5,
      serialize: 4,
      build: 3,
      finalizeRequest: 2,
      deserialize: 1
    };
    var priorityWeights = {
      high: 3,
      normal: 2,
      low: 1
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  __name(__, "__");
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function")
      throw new TypeError("Function expected");
    return f;
  }
  __name(accept, "accept");
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn)
      context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access)
      context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done)
        throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0)
        continue;
      if (result === null || typeof result !== "object")
        throw new TypeError("Object expected");
      if (_ = accept(result.get))
        descriptor.get = _;
      if (_ = accept(result.set))
        descriptor.set = _;
      if (_ = accept(result.init))
        initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field")
        initializers.unshift(_);
      else
        descriptor[key] = _;
    }
  }
  if (target)
    Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol")
    name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  __name(verb, "verb");
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
  __name(step, "step");
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding2(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  __name(verb, "verb");
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  __name(resume, "resume");
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  __name(step, "step");
  function fulfill(value) {
    resume("next", value);
  }
  __name(fulfill, "fulfill");
  function reject(value) {
    resume("throw", value);
  }
  __name(reject, "reject");
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
  __name(settle, "settle");
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
  __name(verb, "verb");
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  __name(verb, "verb");
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
  __name(settle, "settle");
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod) {
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
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function")
      throw new TypeError("Object expected.");
    var dispose;
    if (async) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function")
      throw new TypeError("Object not disposable.");
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  __name(fail, "fail");
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async)
          return Promise.resolve(result).then(next, function(e) {
            fail(e);
            return next();
          });
      } catch (e) {
        fail(e);
      }
    }
    if (env.hasError)
      throw env.error;
  }
  __name(next, "next");
  return next();
}
var extendStatics, __assign, __createBinding2, __setModuleDefault2, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = /* @__PURE__ */ __name(function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    }, "extendStatics");
    __name(__extends, "__extends");
    __assign = /* @__PURE__ */ __name(function() {
      __assign = Object.assign || /* @__PURE__ */ __name(function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      }, "__assign");
      return __assign.apply(this, arguments);
    }, "__assign");
    __name(__rest, "__rest");
    __name(__decorate, "__decorate");
    __name(__param, "__param");
    __name(__esDecorate, "__esDecorate");
    __name(__runInitializers, "__runInitializers");
    __name(__propKey, "__propKey");
    __name(__setFunctionName, "__setFunctionName");
    __name(__metadata, "__metadata");
    __name(__awaiter, "__awaiter");
    __name(__generator, "__generator");
    __createBinding2 = Object.create ? function(o, m, k, k2) {
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
    };
    __name(__exportStar, "__exportStar");
    __name(__values, "__values");
    __name(__read, "__read");
    __name(__spread, "__spread");
    __name(__spreadArrays, "__spreadArrays");
    __name(__spreadArray, "__spreadArray");
    __name(__await, "__await");
    __name(__asyncGenerator, "__asyncGenerator");
    __name(__asyncDelegator, "__asyncDelegator");
    __name(__asyncValues, "__asyncValues");
    __name(__makeTemplateObject, "__makeTemplateObject");
    __setModuleDefault2 = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    };
    __name(__importStar2, "__importStar");
    __name(__importDefault, "__importDefault");
    __name(__classPrivateFieldGet, "__classPrivateFieldGet");
    __name(__classPrivateFieldSet, "__classPrivateFieldSet");
    __name(__classPrivateFieldIn, "__classPrivateFieldIn");
    __name(__addDisposableResource, "__addDisposableResource");
    _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    __name(__disposeResources, "__disposeResources");
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __metadata,
      __awaiter,
      __generator,
      __createBinding: __createBinding2,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar: __importStar2,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/is-array-buffer/dist-cjs/index.js
var require_dist_cjs7 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/is-array-buffer/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      isArrayBuffer: () => isArrayBuffer
    });
    module2.exports = __toCommonJS2(src_exports);
    var isArrayBuffer = /* @__PURE__ */ __name2((arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]", "isArrayBuffer");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-buffer-from/dist-cjs/index.js
var require_dist_cjs8 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-buffer-from/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      fromArrayBuffer: () => fromArrayBuffer,
      fromString: () => fromString
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_is_array_buffer = require_dist_cjs7();
    var import_buffer = require("buffer");
    var fromArrayBuffer = /* @__PURE__ */ __name2((input, offset = 0, length = input.byteLength - offset) => {
      if (!(0, import_is_array_buffer.isArrayBuffer)(input)) {
        throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
      }
      return import_buffer.Buffer.from(input, offset, length);
    }, "fromArrayBuffer");
    var fromString = /* @__PURE__ */ __name2((input, encoding) => {
      if (typeof input !== "string") {
        throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
      }
      return encoding ? import_buffer.Buffer.from(input, encoding) : import_buffer.Buffer.from(input);
    }, "fromString");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-base64/dist-cjs/fromBase64.js
var require_fromBase64 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-base64/dist-cjs/fromBase64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromBase64 = void 0;
    var util_buffer_from_1 = require_dist_cjs8();
    var BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
    var fromBase642 = /* @__PURE__ */ __name((input) => {
      if (input.length * 3 % 4 !== 0) {
        throw new TypeError(`Incorrect padding on base64 string.`);
      }
      if (!BASE64_REGEX.exec(input)) {
        throw new TypeError(`Invalid base64 string.`);
      }
      const buffer = (0, util_buffer_from_1.fromString)(input, "base64");
      return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }, "fromBase64");
    exports2.fromBase64 = fromBase642;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/fromUtf8.js
var require_fromUtf8 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/fromUtf8.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromUtf8 = void 0;
    var util_buffer_from_1 = require_dist_cjs8();
    var fromUtf8 = /* @__PURE__ */ __name((input) => {
      const buf = (0, util_buffer_from_1.fromString)(input, "utf8");
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }, "fromUtf8");
    exports2.fromUtf8 = fromUtf8;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/toUint8Array.js
var require_toUint8Array = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/toUint8Array.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toUint8Array = void 0;
    var fromUtf8_1 = require_fromUtf8();
    var toUint8Array = /* @__PURE__ */ __name((data) => {
      if (typeof data === "string") {
        return (0, fromUtf8_1.fromUtf8)(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    }, "toUint8Array");
    exports2.toUint8Array = toUint8Array;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/toUtf8.js
var require_toUtf8 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/toUtf8.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toUtf8 = void 0;
    var util_buffer_from_1 = require_dist_cjs8();
    var toUtf8 = /* @__PURE__ */ __name((input) => (0, util_buffer_from_1.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("utf8"), "toUtf8");
    exports2.toUtf8 = toUtf8;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/index.js
var require_dist_cjs9 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-utf8/dist-cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_fromUtf8(), exports2);
    tslib_1.__exportStar(require_toUint8Array(), exports2);
    tslib_1.__exportStar(require_toUtf8(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-base64/dist-cjs/toBase64.js
var require_toBase64 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-base64/dist-cjs/toBase64.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toBase64 = void 0;
    var util_buffer_from_1 = require_dist_cjs8();
    var util_utf8_1 = require_dist_cjs9();
    var toBase642 = /* @__PURE__ */ __name((_input) => {
      let input;
      if (typeof _input === "string") {
        input = (0, util_utf8_1.fromUtf8)(_input);
      } else {
        input = _input;
      }
      if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
      }
      return (0, util_buffer_from_1.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("base64");
    }, "toBase64");
    exports2.toBase64 = toBase642;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-base64/dist-cjs/index.js
var require_dist_cjs10 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-base64/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __reExport = /* @__PURE__ */ __name((target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default")), "__reExport");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    module2.exports = __toCommonJS2(src_exports);
    __reExport(src_exports, require_fromBase64(), module2.exports);
    __reExport(src_exports, require_toBase64(), module2.exports);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/blob/transforms.js
var require_transforms = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/blob/transforms.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.transformFromString = exports2.transformToString = void 0;
    var util_base64_1 = require_dist_cjs10();
    var util_utf8_1 = require_dist_cjs9();
    var Uint8ArrayBlobAdapter_1 = require_Uint8ArrayBlobAdapter();
    function transformToString(payload, encoding = "utf-8") {
      if (encoding === "base64") {
        return (0, util_base64_1.toBase64)(payload);
      }
      return (0, util_utf8_1.toUtf8)(payload);
    }
    __name(transformToString, "transformToString");
    exports2.transformToString = transformToString;
    function transformFromString(str, encoding) {
      if (encoding === "base64") {
        return Uint8ArrayBlobAdapter_1.Uint8ArrayBlobAdapter.mutate((0, util_base64_1.fromBase64)(str));
      }
      return Uint8ArrayBlobAdapter_1.Uint8ArrayBlobAdapter.mutate((0, util_utf8_1.fromUtf8)(str));
    }
    __name(transformFromString, "transformFromString");
    exports2.transformFromString = transformFromString;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/blob/Uint8ArrayBlobAdapter.js
var require_Uint8ArrayBlobAdapter = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/blob/Uint8ArrayBlobAdapter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Uint8ArrayBlobAdapter = void 0;
    var transforms_1 = require_transforms();
    var Uint8ArrayBlobAdapter = class _Uint8ArrayBlobAdapter extends Uint8Array {
      static {
        __name(this, "Uint8ArrayBlobAdapter");
      }
      static fromString(source, encoding = "utf-8") {
        switch (typeof source) {
          case "string":
            return (0, transforms_1.transformFromString)(source, encoding);
          default:
            throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
        }
      }
      static mutate(source) {
        Object.setPrototypeOf(source, _Uint8ArrayBlobAdapter.prototype);
        return source;
      }
      transformToString(encoding = "utf-8") {
        return (0, transforms_1.transformToString)(this, encoding);
      }
    };
    exports2.Uint8ArrayBlobAdapter = Uint8ArrayBlobAdapter;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/getAwsChunkedEncodingStream.js
var require_getAwsChunkedEncodingStream = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/getAwsChunkedEncodingStream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getAwsChunkedEncodingStream = void 0;
    var stream_1 = require("stream");
    var getAwsChunkedEncodingStream = /* @__PURE__ */ __name((readableStream, options) => {
      const { base64Encoder, bodyLengthChecker, checksumAlgorithmFn, checksumLocationName, streamHasher } = options;
      const checksumRequired = base64Encoder !== void 0 && checksumAlgorithmFn !== void 0 && checksumLocationName !== void 0 && streamHasher !== void 0;
      const digest = checksumRequired ? streamHasher(checksumAlgorithmFn, readableStream) : void 0;
      const awsChunkedEncodingStream = new stream_1.Readable({ read: () => {
      } });
      readableStream.on("data", (data) => {
        const length = bodyLengthChecker(data) || 0;
        awsChunkedEncodingStream.push(`${length.toString(16)}\r
`);
        awsChunkedEncodingStream.push(data);
        awsChunkedEncodingStream.push("\r\n");
      });
      readableStream.on("end", async () => {
        awsChunkedEncodingStream.push(`0\r
`);
        if (checksumRequired) {
          const checksum = base64Encoder(await digest);
          awsChunkedEncodingStream.push(`${checksumLocationName}:${checksum}\r
`);
          awsChunkedEncodingStream.push(`\r
`);
        }
        awsChunkedEncodingStream.push(null);
      });
      return awsChunkedEncodingStream;
    }, "getAwsChunkedEncodingStream");
    exports2.getAwsChunkedEncodingStream = getAwsChunkedEncodingStream;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-uri-escape/dist-cjs/index.js
var require_dist_cjs11 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-uri-escape/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      escapeUri: () => escapeUri,
      escapeUriPath: () => escapeUriPath
    });
    module2.exports = __toCommonJS2(src_exports);
    var escapeUri = /* @__PURE__ */ __name2((uri) => (
      // AWS percent-encodes some extra non-standard characters in a URI
      encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode)
    ), "escapeUri");
    var hexEncode = /* @__PURE__ */ __name2((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode");
    var escapeUriPath = /* @__PURE__ */ __name2((uri) => uri.split("/").map(escapeUri).join("/"), "escapeUriPath");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/querystring-builder/dist-cjs/index.js
var require_dist_cjs12 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/querystring-builder/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      buildQueryString: () => buildQueryString
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_util_uri_escape = require_dist_cjs11();
    function buildQueryString(query) {
      const parts = [];
      for (let key of Object.keys(query).sort()) {
        const value = query[key];
        key = (0, import_util_uri_escape.escapeUri)(key);
        if (Array.isArray(value)) {
          for (let i = 0, iLen = value.length; i < iLen; i++) {
            parts.push(`${key}=${(0, import_util_uri_escape.escapeUri)(value[i])}`);
          }
        } else {
          let qsEntry = key;
          if (value || typeof value === "string") {
            qsEntry += `=${(0, import_util_uri_escape.escapeUri)(value)}`;
          }
          parts.push(qsEntry);
        }
      }
      return parts.join("&");
    }
    __name(buildQueryString, "buildQueryString");
    __name2(buildQueryString, "buildQueryString");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/node-http-handler/dist-cjs/index.js
var require_dist_cjs13 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/node-http-handler/dist-cjs/index.js"(exports2, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      DEFAULT_REQUEST_TIMEOUT: () => DEFAULT_REQUEST_TIMEOUT,
      NodeHttp2Handler: () => NodeHttp2Handler,
      NodeHttpHandler: () => NodeHttpHandler,
      streamCollector: () => streamCollector
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_protocol_http = require_dist_cjs2();
    var import_querystring_builder = require_dist_cjs12();
    var import_http = require("http");
    var import_https = require("https");
    var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "EPIPE", "ETIMEDOUT"];
    var getTransformedHeaders = /* @__PURE__ */ __name2((headers) => {
      const transformedHeaders = {};
      for (const name of Object.keys(headers)) {
        const headerValues = headers[name];
        transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
      }
      return transformedHeaders;
    }, "getTransformedHeaders");
    var setConnectionTimeout = /* @__PURE__ */ __name2((request, reject, timeoutInMs = 0) => {
      if (!timeoutInMs) {
        return;
      }
      const timeoutId = setTimeout(() => {
        request.destroy();
        reject(
          Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
            name: "TimeoutError"
          })
        );
      }, timeoutInMs);
      request.on("socket", (socket) => {
        if (socket.connecting) {
          socket.on("connect", () => {
            clearTimeout(timeoutId);
          });
        } else {
          clearTimeout(timeoutId);
        }
      });
    }, "setConnectionTimeout");
    var setSocketKeepAlive = /* @__PURE__ */ __name2((request, { keepAlive, keepAliveMsecs }) => {
      if (keepAlive !== true) {
        return;
      }
      request.on("socket", (socket) => {
        socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
      });
    }, "setSocketKeepAlive");
    var setSocketTimeout = /* @__PURE__ */ __name2((request, reject, timeoutInMs = 0) => {
      request.setTimeout(timeoutInMs, () => {
        request.destroy();
        reject(Object.assign(new Error(`Connection timed out after ${timeoutInMs} ms`), { name: "TimeoutError" }));
      });
    }, "setSocketTimeout");
    var import_stream = require("stream");
    var MIN_WAIT_TIME = 1e3;
    async function writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME) {
      const headers = request.headers ?? {};
      const expect = headers["Expect"] || headers["expect"];
      let timeoutId = -1;
      let hasError = false;
      if (expect === "100-continue") {
        await Promise.race([
          new Promise((resolve) => {
            timeoutId = Number(setTimeout(resolve, Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
          }),
          new Promise((resolve) => {
            httpRequest.on("continue", () => {
              clearTimeout(timeoutId);
              resolve();
            });
            httpRequest.on("error", () => {
              hasError = true;
              clearTimeout(timeoutId);
              resolve();
            });
          })
        ]);
      }
      if (!hasError) {
        writeBody(httpRequest, request.body);
      }
    }
    __name(writeRequestBody, "writeRequestBody");
    __name2(writeRequestBody, "writeRequestBody");
    function writeBody(httpRequest, body) {
      if (body instanceof import_stream.Readable) {
        body.pipe(httpRequest);
        return;
      }
      if (body) {
        if (Buffer.isBuffer(body) || typeof body === "string") {
          httpRequest.end(body);
          return;
        }
        const uint8 = body;
        if (typeof uint8 === "object" && uint8.buffer && typeof uint8.byteOffset === "number" && typeof uint8.byteLength === "number") {
          httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
          return;
        }
        httpRequest.end(Buffer.from(body));
        return;
      }
      httpRequest.end();
    }
    __name(writeBody, "writeBody");
    __name2(writeBody, "writeBody");
    var DEFAULT_REQUEST_TIMEOUT = 0;
    var _NodeHttpHandler = class _NodeHttpHandler2 {
      static {
        __name(this, "_NodeHttpHandler");
      }
      constructor(options) {
        this.socketWarningTimestamp = 0;
        this.metadata = { handlerProtocol: "http/1.1" };
        this.configProvider = new Promise((resolve, reject) => {
          if (typeof options === "function") {
            options().then((_options) => {
              resolve(this.resolveDefaultConfig(_options));
            }).catch(reject);
          } else {
            resolve(this.resolveDefaultConfig(options));
          }
        });
      }
      /**
       * @returns the input if it is an HttpHandler of any class,
       * or instantiates a new instance of this handler.
       */
      static create(instanceOrOptions) {
        if (typeof (instanceOrOptions == null ? void 0 : instanceOrOptions.handle) === "function") {
          return instanceOrOptions;
        }
        return new _NodeHttpHandler2(instanceOrOptions);
      }
      /**
       * @internal
       *
       * @param agent - http(s) agent in use by the NodeHttpHandler instance.
       * @returns timestamp of last emitted warning.
       */
      static checkSocketUsage(agent, socketWarningTimestamp) {
        var _a, _b;
        const { sockets, requests, maxSockets } = agent;
        if (typeof maxSockets !== "number" || maxSockets === Infinity) {
          return socketWarningTimestamp;
        }
        const interval = 15e3;
        if (Date.now() - interval < socketWarningTimestamp) {
          return socketWarningTimestamp;
        }
        if (sockets && requests) {
          for (const origin in sockets) {
            const socketsInUse = ((_a = sockets[origin]) == null ? void 0 : _a.length) ?? 0;
            const requestsEnqueued = ((_b = requests[origin]) == null ? void 0 : _b.length) ?? 0;
            if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
              console.warn(
                "@smithy/node-http-handler:WARN",
                `socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.`,
                "See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html",
                "or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config."
              );
              return Date.now();
            }
          }
        }
        return socketWarningTimestamp;
      }
      resolveDefaultConfig(options) {
        const { requestTimeout, connectionTimeout, socketTimeout, httpAgent, httpsAgent } = options || {};
        const keepAlive = true;
        const maxSockets = 50;
        return {
          connectionTimeout,
          requestTimeout: requestTimeout ?? socketTimeout,
          httpAgent: (() => {
            if (httpAgent instanceof import_http.Agent || typeof (httpAgent == null ? void 0 : httpAgent.destroy) === "function") {
              return httpAgent;
            }
            return new import_http.Agent({ keepAlive, maxSockets, ...httpAgent });
          })(),
          httpsAgent: (() => {
            if (httpsAgent instanceof import_https.Agent || typeof (httpsAgent == null ? void 0 : httpsAgent.destroy) === "function") {
              return httpsAgent;
            }
            return new import_https.Agent({ keepAlive, maxSockets, ...httpsAgent });
          })()
        };
      }
      destroy() {
        var _a, _b, _c, _d;
        (_b = (_a = this.config) == null ? void 0 : _a.httpAgent) == null ? void 0 : _b.destroy();
        (_d = (_c = this.config) == null ? void 0 : _c.httpsAgent) == null ? void 0 : _d.destroy();
      }
      async handle(request, { abortSignal } = {}) {
        if (!this.config) {
          this.config = await this.configProvider;
        }
        let socketCheckTimeoutId;
        return new Promise((_resolve, _reject) => {
          let writeRequestBodyPromise = void 0;
          const resolve = /* @__PURE__ */ __name2(async (arg) => {
            await writeRequestBodyPromise;
            clearTimeout(socketCheckTimeoutId);
            _resolve(arg);
          }, "resolve");
          const reject = /* @__PURE__ */ __name2(async (arg) => {
            await writeRequestBodyPromise;
            _reject(arg);
          }, "reject");
          if (!this.config) {
            throw new Error("Node HTTP request handler config is not resolved");
          }
          if (abortSignal == null ? void 0 : abortSignal.aborted) {
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            reject(abortError);
            return;
          }
          const isSSL = request.protocol === "https:";
          const agent = isSSL ? this.config.httpsAgent : this.config.httpAgent;
          socketCheckTimeoutId = setTimeout(
            () => {
              this.socketWarningTimestamp = _NodeHttpHandler2.checkSocketUsage(agent, this.socketWarningTimestamp);
            },
            this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2e3) + (this.config.connectionTimeout ?? 1e3)
          );
          const queryString = (0, import_querystring_builder.buildQueryString)(request.query || {});
          let auth = void 0;
          if (request.username != null || request.password != null) {
            const username = request.username ?? "";
            const password = request.password ?? "";
            auth = `${username}:${password}`;
          }
          let path2 = request.path;
          if (queryString) {
            path2 += `?${queryString}`;
          }
          if (request.fragment) {
            path2 += `#${request.fragment}`;
          }
          const nodeHttpsOptions = {
            headers: request.headers,
            host: request.hostname,
            method: request.method,
            path: path2,
            port: request.port,
            agent,
            auth
          };
          const requestFunc = isSSL ? import_https.request : import_http.request;
          const req = requestFunc(nodeHttpsOptions, (res) => {
            const httpResponse = new import_protocol_http.HttpResponse({
              statusCode: res.statusCode || -1,
              reason: res.statusMessage,
              headers: getTransformedHeaders(res.headers),
              body: res
            });
            resolve({ response: httpResponse });
          });
          req.on("error", (err) => {
            if (NODEJS_TIMEOUT_ERROR_CODES.includes(err.code)) {
              reject(Object.assign(err, { name: "TimeoutError" }));
            } else {
              reject(err);
            }
          });
          setConnectionTimeout(req, reject, this.config.connectionTimeout);
          setSocketTimeout(req, reject, this.config.requestTimeout);
          if (abortSignal) {
            abortSignal.onabort = () => {
              req.abort();
              const abortError = new Error("Request aborted");
              abortError.name = "AbortError";
              reject(abortError);
            };
          }
          const httpAgent = nodeHttpsOptions.agent;
          if (typeof httpAgent === "object" && "keepAlive" in httpAgent) {
            setSocketKeepAlive(req, {
              // @ts-expect-error keepAlive is not public on httpAgent.
              keepAlive: httpAgent.keepAlive,
              // @ts-expect-error keepAliveMsecs is not public on httpAgent.
              keepAliveMsecs: httpAgent.keepAliveMsecs
            });
          }
          writeRequestBodyPromise = writeRequestBody(req, request, this.config.requestTimeout).catch(_reject);
        });
      }
      updateHttpClientConfig(key, value) {
        this.config = void 0;
        this.configProvider = this.configProvider.then((config) => {
          return {
            ...config,
            [key]: value
          };
        });
      }
      httpHandlerConfigs() {
        return this.config ?? {};
      }
    };
    __name2(_NodeHttpHandler, "NodeHttpHandler");
    var NodeHttpHandler = _NodeHttpHandler;
    var import_http22 = require("http2");
    var import_http2 = __toESM2(require("http2"));
    var _NodeHttp2ConnectionPool = class _NodeHttp2ConnectionPool {
      static {
        __name(this, "_NodeHttp2ConnectionPool");
      }
      constructor(sessions) {
        this.sessions = [];
        this.sessions = sessions ?? [];
      }
      poll() {
        if (this.sessions.length > 0) {
          return this.sessions.shift();
        }
      }
      offerLast(session) {
        this.sessions.push(session);
      }
      contains(session) {
        return this.sessions.includes(session);
      }
      remove(session) {
        this.sessions = this.sessions.filter((s) => s !== session);
      }
      [Symbol.iterator]() {
        return this.sessions[Symbol.iterator]();
      }
      destroy(connection) {
        for (const session of this.sessions) {
          if (session === connection) {
            if (!session.destroyed) {
              session.destroy();
            }
          }
        }
      }
    };
    __name2(_NodeHttp2ConnectionPool, "NodeHttp2ConnectionPool");
    var NodeHttp2ConnectionPool = _NodeHttp2ConnectionPool;
    var _NodeHttp2ConnectionManager = class _NodeHttp2ConnectionManager {
      static {
        __name(this, "_NodeHttp2ConnectionManager");
      }
      constructor(config) {
        this.sessionCache = /* @__PURE__ */ new Map();
        this.config = config;
        if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) {
          throw new RangeError("maxConcurrency must be greater than zero.");
        }
      }
      lease(requestContext, connectionConfiguration) {
        const url = this.getUrlString(requestContext);
        const existingPool = this.sessionCache.get(url);
        if (existingPool) {
          const existingSession = existingPool.poll();
          if (existingSession && !this.config.disableConcurrency) {
            return existingSession;
          }
        }
        const session = import_http2.default.connect(url);
        if (this.config.maxConcurrency) {
          session.settings({ maxConcurrentStreams: this.config.maxConcurrency }, (err) => {
            if (err) {
              throw new Error(
                "Fail to set maxConcurrentStreams to " + this.config.maxConcurrency + "when creating new session for " + requestContext.destination.toString()
              );
            }
          });
        }
        session.unref();
        const destroySessionCb = /* @__PURE__ */ __name2(() => {
          session.destroy();
          this.deleteSession(url, session);
        }, "destroySessionCb");
        session.on("goaway", destroySessionCb);
        session.on("error", destroySessionCb);
        session.on("frameError", destroySessionCb);
        session.on("close", () => this.deleteSession(url, session));
        if (connectionConfiguration.requestTimeout) {
          session.setTimeout(connectionConfiguration.requestTimeout, destroySessionCb);
        }
        const connectionPool = this.sessionCache.get(url) || new NodeHttp2ConnectionPool();
        connectionPool.offerLast(session);
        this.sessionCache.set(url, connectionPool);
        return session;
      }
      /**
       * Delete a session from the connection pool.
       * @param authority The authority of the session to delete.
       * @param session The session to delete.
       */
      deleteSession(authority, session) {
        const existingConnectionPool = this.sessionCache.get(authority);
        if (!existingConnectionPool) {
          return;
        }
        if (!existingConnectionPool.contains(session)) {
          return;
        }
        existingConnectionPool.remove(session);
        this.sessionCache.set(authority, existingConnectionPool);
      }
      release(requestContext, session) {
        var _a;
        const cacheKey = this.getUrlString(requestContext);
        (_a = this.sessionCache.get(cacheKey)) == null ? void 0 : _a.offerLast(session);
      }
      destroy() {
        for (const [key, connectionPool] of this.sessionCache) {
          for (const session of connectionPool) {
            if (!session.destroyed) {
              session.destroy();
            }
            connectionPool.remove(session);
          }
          this.sessionCache.delete(key);
        }
      }
      setMaxConcurrentStreams(maxConcurrentStreams) {
        if (this.config.maxConcurrency && this.config.maxConcurrency <= 0) {
          throw new RangeError("maxConcurrentStreams must be greater than zero.");
        }
        this.config.maxConcurrency = maxConcurrentStreams;
      }
      setDisableConcurrentStreams(disableConcurrentStreams) {
        this.config.disableConcurrency = disableConcurrentStreams;
      }
      getUrlString(request) {
        return request.destination.toString();
      }
    };
    __name2(_NodeHttp2ConnectionManager, "NodeHttp2ConnectionManager");
    var NodeHttp2ConnectionManager = _NodeHttp2ConnectionManager;
    var _NodeHttp2Handler = class _NodeHttp2Handler2 {
      static {
        __name(this, "_NodeHttp2Handler");
      }
      constructor(options) {
        this.metadata = { handlerProtocol: "h2" };
        this.connectionManager = new NodeHttp2ConnectionManager({});
        this.configProvider = new Promise((resolve, reject) => {
          if (typeof options === "function") {
            options().then((opts) => {
              resolve(opts || {});
            }).catch(reject);
          } else {
            resolve(options || {});
          }
        });
      }
      /**
       * @returns the input if it is an HttpHandler of any class,
       * or instantiates a new instance of this handler.
       */
      static create(instanceOrOptions) {
        if (typeof (instanceOrOptions == null ? void 0 : instanceOrOptions.handle) === "function") {
          return instanceOrOptions;
        }
        return new _NodeHttp2Handler2(instanceOrOptions);
      }
      destroy() {
        this.connectionManager.destroy();
      }
      async handle(request, { abortSignal } = {}) {
        if (!this.config) {
          this.config = await this.configProvider;
          this.connectionManager.setDisableConcurrentStreams(this.config.disableConcurrentStreams || false);
          if (this.config.maxConcurrentStreams) {
            this.connectionManager.setMaxConcurrentStreams(this.config.maxConcurrentStreams);
          }
        }
        const { requestTimeout, disableConcurrentStreams } = this.config;
        return new Promise((_resolve, _reject) => {
          var _a;
          let fulfilled = false;
          let writeRequestBodyPromise = void 0;
          const resolve = /* @__PURE__ */ __name2(async (arg) => {
            await writeRequestBodyPromise;
            _resolve(arg);
          }, "resolve");
          const reject = /* @__PURE__ */ __name2(async (arg) => {
            await writeRequestBodyPromise;
            _reject(arg);
          }, "reject");
          if (abortSignal == null ? void 0 : abortSignal.aborted) {
            fulfilled = true;
            const abortError = new Error("Request aborted");
            abortError.name = "AbortError";
            reject(abortError);
            return;
          }
          const { hostname, method, port, protocol, query } = request;
          let auth = "";
          if (request.username != null || request.password != null) {
            const username = request.username ?? "";
            const password = request.password ?? "";
            auth = `${username}:${password}@`;
          }
          const authority = `${protocol}//${auth}${hostname}${port ? `:${port}` : ""}`;
          const requestContext = { destination: new URL(authority) };
          const session = this.connectionManager.lease(requestContext, {
            requestTimeout: (_a = this.config) == null ? void 0 : _a.sessionTimeout,
            disableConcurrentStreams: disableConcurrentStreams || false
          });
          const rejectWithDestroy = /* @__PURE__ */ __name2((err) => {
            if (disableConcurrentStreams) {
              this.destroySession(session);
            }
            fulfilled = true;
            reject(err);
          }, "rejectWithDestroy");
          const queryString = (0, import_querystring_builder.buildQueryString)(query || {});
          let path2 = request.path;
          if (queryString) {
            path2 += `?${queryString}`;
          }
          if (request.fragment) {
            path2 += `#${request.fragment}`;
          }
          const req = session.request({
            ...request.headers,
            [import_http22.constants.HTTP2_HEADER_PATH]: path2,
            [import_http22.constants.HTTP2_HEADER_METHOD]: method
          });
          session.ref();
          req.on("response", (headers) => {
            const httpResponse = new import_protocol_http.HttpResponse({
              statusCode: headers[":status"] || -1,
              headers: getTransformedHeaders(headers),
              body: req
            });
            fulfilled = true;
            resolve({ response: httpResponse });
            if (disableConcurrentStreams) {
              session.close();
              this.connectionManager.deleteSession(authority, session);
            }
          });
          if (requestTimeout) {
            req.setTimeout(requestTimeout, () => {
              req.close();
              const timeoutError = new Error(`Stream timed out because of no activity for ${requestTimeout} ms`);
              timeoutError.name = "TimeoutError";
              rejectWithDestroy(timeoutError);
            });
          }
          if (abortSignal) {
            abortSignal.onabort = () => {
              req.close();
              const abortError = new Error("Request aborted");
              abortError.name = "AbortError";
              rejectWithDestroy(abortError);
            };
          }
          req.on("frameError", (type, code, id) => {
            rejectWithDestroy(new Error(`Frame type id ${type} in stream id ${id} has failed with code ${code}.`));
          });
          req.on("error", rejectWithDestroy);
          req.on("aborted", () => {
            rejectWithDestroy(
              new Error(`HTTP/2 stream is abnormally aborted in mid-communication with result code ${req.rstCode}.`)
            );
          });
          req.on("close", () => {
            session.unref();
            if (disableConcurrentStreams) {
              session.destroy();
            }
            if (!fulfilled) {
              rejectWithDestroy(new Error("Unexpected error: http2 request did not get a response"));
            }
          });
          writeRequestBodyPromise = writeRequestBody(req, request, requestTimeout);
        });
      }
      updateHttpClientConfig(key, value) {
        this.config = void 0;
        this.configProvider = this.configProvider.then((config) => {
          return {
            ...config,
            [key]: value
          };
        });
      }
      httpHandlerConfigs() {
        return this.config ?? {};
      }
      /**
       * Destroys a session.
       * @param session The session to destroy.
       */
      destroySession(session) {
        if (!session.destroyed) {
          session.destroy();
        }
      }
    };
    __name2(_NodeHttp2Handler, "NodeHttp2Handler");
    var NodeHttp2Handler = _NodeHttp2Handler;
    var _Collector = class _Collector extends import_stream.Writable {
      static {
        __name(this, "_Collector");
      }
      constructor() {
        super(...arguments);
        this.bufferedBytes = [];
      }
      _write(chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
      }
    };
    __name2(_Collector, "Collector");
    var Collector = _Collector;
    var streamCollector = /* @__PURE__ */ __name2((stream) => {
      if (isReadableStreamInstance(stream)) {
        return collectReadableStream(stream);
      }
      return new Promise((resolve, reject) => {
        const collector = new Collector();
        stream.pipe(collector);
        stream.on("error", (err) => {
          collector.end();
          reject(err);
        });
        collector.on("error", reject);
        collector.on("finish", function() {
          const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
          resolve(bytes);
        });
      });
    }, "streamCollector");
    var isReadableStreamInstance = /* @__PURE__ */ __name2((stream) => typeof ReadableStream === "function" && stream instanceof ReadableStream, "isReadableStreamInstance");
    async function collectReadableStream(stream) {
      const chunks = [];
      const reader = stream.getReader();
      let isDone = false;
      let length = 0;
      while (!isDone) {
        const { done, value } = await reader.read();
        if (value) {
          chunks.push(value);
          length += value.length;
        }
        isDone = done;
      }
      const collected = new Uint8Array(length);
      let offset = 0;
      for (const chunk of chunks) {
        collected.set(chunk, offset);
        offset += chunk.length;
      }
      return collected;
    }
    __name(collectReadableStream, "collectReadableStream");
    __name2(collectReadableStream, "collectReadableStream");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/sdk-stream-mixin.js
var require_sdk_stream_mixin = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/sdk-stream-mixin.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sdkStreamMixin = void 0;
    var node_http_handler_1 = require_dist_cjs13();
    var util_buffer_from_1 = require_dist_cjs8();
    var stream_1 = require("stream");
    var util_1 = require("util");
    var ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
    var sdkStreamMixin = /* @__PURE__ */ __name((stream) => {
      var _a, _b;
      if (!(stream instanceof stream_1.Readable)) {
        const name = ((_b = (_a = stream === null || stream === void 0 ? void 0 : stream.__proto__) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) || stream;
        throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
      }
      let transformed = false;
      const transformToByteArray = /* @__PURE__ */ __name(async () => {
        if (transformed) {
          throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await (0, node_http_handler_1.streamCollector)(stream);
      }, "transformToByteArray");
      return Object.assign(stream, {
        transformToByteArray,
        transformToString: async (encoding) => {
          const buf = await transformToByteArray();
          if (encoding === void 0 || Buffer.isEncoding(encoding)) {
            return (0, util_buffer_from_1.fromArrayBuffer)(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
          } else {
            const decoder = new util_1.TextDecoder(encoding);
            return decoder.decode(buf);
          }
        },
        transformToWebStream: () => {
          if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
          }
          if (stream.readableFlowing !== null) {
            throw new Error("The stream has been consumed by other callbacks.");
          }
          if (typeof stream_1.Readable.toWeb !== "function") {
            throw new Error("Readable.toWeb() is not supported. Please make sure you are using Node.js >= 17.0.0, or polyfill is available.");
          }
          transformed = true;
          return stream_1.Readable.toWeb(stream);
        }
      });
    }, "sdkStreamMixin");
    exports2.sdkStreamMixin = sdkStreamMixin;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/index.js
var require_dist_cjs14 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-stream/dist-cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_Uint8ArrayBlobAdapter(), exports2);
    tslib_1.__exportStar(require_getAwsChunkedEncodingStream(), exports2);
    tslib_1.__exportStar(require_sdk_stream_mixin(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/smithy-client/dist-cjs/index.js
var require_dist_cjs15 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/smithy-client/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      Client: () => Client,
      Command: () => Command,
      LazyJsonString: () => LazyJsonString,
      NoOpLogger: () => NoOpLogger,
      SENSITIVE_STRING: () => SENSITIVE_STRING,
      ServiceException: () => ServiceException,
      StringWrapper: () => StringWrapper,
      _json: () => _json,
      collectBody: () => collectBody,
      convertMap: () => convertMap,
      createAggregatedClient: () => createAggregatedClient,
      dateToUtcString: () => dateToUtcString,
      decorateServiceException: () => decorateServiceException,
      emitWarningIfUnsupportedVersion: () => emitWarningIfUnsupportedVersion,
      expectBoolean: () => expectBoolean,
      expectByte: () => expectByte,
      expectFloat32: () => expectFloat32,
      expectInt: () => expectInt,
      expectInt32: () => expectInt32,
      expectLong: () => expectLong,
      expectNonNull: () => expectNonNull,
      expectNumber: () => expectNumber,
      expectObject: () => expectObject,
      expectShort: () => expectShort,
      expectString: () => expectString,
      expectUnion: () => expectUnion,
      extendedEncodeURIComponent: () => extendedEncodeURIComponent,
      getArrayIfSingleItem: () => getArrayIfSingleItem,
      getDefaultClientConfiguration: () => getDefaultClientConfiguration,
      getDefaultExtensionConfiguration: () => getDefaultExtensionConfiguration,
      getValueFromTextNode: () => getValueFromTextNode,
      handleFloat: () => handleFloat,
      limitedParseDouble: () => limitedParseDouble,
      limitedParseFloat: () => limitedParseFloat,
      limitedParseFloat32: () => limitedParseFloat32,
      loadConfigsForDefaultMode: () => loadConfigsForDefaultMode,
      logger: () => logger,
      map: () => map,
      parseBoolean: () => parseBoolean,
      parseEpochTimestamp: () => parseEpochTimestamp,
      parseRfc3339DateTime: () => parseRfc3339DateTime,
      parseRfc3339DateTimeWithOffset: () => parseRfc3339DateTimeWithOffset,
      parseRfc7231DateTime: () => parseRfc7231DateTime,
      resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig,
      resolvedPath: () => resolvedPath,
      serializeFloat: () => serializeFloat,
      splitEvery: () => splitEvery,
      strictParseByte: () => strictParseByte,
      strictParseDouble: () => strictParseDouble,
      strictParseFloat: () => strictParseFloat,
      strictParseFloat32: () => strictParseFloat32,
      strictParseInt: () => strictParseInt,
      strictParseInt32: () => strictParseInt32,
      strictParseLong: () => strictParseLong,
      strictParseShort: () => strictParseShort,
      take: () => take,
      throwDefaultError: () => throwDefaultError,
      withBaseException: () => withBaseException
    });
    module2.exports = __toCommonJS2(src_exports);
    var _NoOpLogger = class _NoOpLogger {
      static {
        __name(this, "_NoOpLogger");
      }
      trace() {
      }
      debug() {
      }
      info() {
      }
      warn() {
      }
      error() {
      }
    };
    __name2(_NoOpLogger, "NoOpLogger");
    var NoOpLogger = _NoOpLogger;
    var import_middleware_stack = require_dist_cjs6();
    var _Client = class _Client {
      static {
        __name(this, "_Client");
      }
      constructor(config) {
        this.middlewareStack = (0, import_middleware_stack.constructStack)();
        this.config = config;
      }
      send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : void 0;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        if (callback) {
          handler(command).then(
            (result) => callback(null, result.output),
            (err) => callback(err)
          ).catch(
            // prevent any errors thrown in the callback from triggering an
            // unhandled promise rejection
            () => {
            }
          );
        } else {
          return handler(command).then((result) => result.output);
        }
      }
      destroy() {
        if (this.config.requestHandler.destroy)
          this.config.requestHandler.destroy();
      }
    };
    __name2(_Client, "Client");
    var Client = _Client;
    var import_util_stream = require_dist_cjs14();
    var collectBody = /* @__PURE__ */ __name2(async (streamBody = new Uint8Array(), context) => {
      if (streamBody instanceof Uint8Array) {
        return import_util_stream.Uint8ArrayBlobAdapter.mutate(streamBody);
      }
      if (!streamBody) {
        return import_util_stream.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
      }
      const fromContext = context.streamCollector(streamBody);
      return import_util_stream.Uint8ArrayBlobAdapter.mutate(await fromContext);
    }, "collectBody");
    var import_types = require_dist_cjs();
    var _Command = class _Command {
      static {
        __name(this, "_Command");
      }
      constructor() {
        this.middlewareStack = (0, import_middleware_stack.constructStack)();
      }
      /**
       * Factory for Command ClassBuilder.
       * @internal
       */
      static classBuilder() {
        return new ClassBuilder();
      }
      /**
       * @internal
       */
      resolveMiddlewareWithContext(clientStack, configuration, options, {
        middlewareFn,
        clientName,
        commandName,
        inputFilterSensitiveLog,
        outputFilterSensitiveLog,
        smithyContext,
        additionalContext,
        CommandCtor
      }) {
        for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)) {
          this.middlewareStack.use(mw);
        }
        const stack = clientStack.concat(this.middlewareStack);
        const { logger: logger2 } = configuration;
        const handlerExecutionContext = {
          logger: logger2,
          clientName,
          commandName,
          inputFilterSensitiveLog,
          outputFilterSensitiveLog,
          [import_types.SMITHY_CONTEXT_KEY]: {
            ...smithyContext
          },
          ...additionalContext
        };
        const { requestHandler } = configuration;
        return stack.resolve(
          (request) => requestHandler.handle(request.request, options || {}),
          handlerExecutionContext
        );
      }
    };
    __name2(_Command, "Command");
    var Command = _Command;
    var _ClassBuilder = class _ClassBuilder {
      static {
        __name(this, "_ClassBuilder");
      }
      constructor() {
        this._init = () => {
        };
        this._ep = {};
        this._middlewareFn = () => [];
        this._commandName = "";
        this._clientName = "";
        this._additionalContext = {};
        this._smithyContext = {};
        this._inputFilterSensitiveLog = (_) => _;
        this._outputFilterSensitiveLog = (_) => _;
        this._serializer = null;
        this._deserializer = null;
      }
      /**
       * Optional init callback.
       */
      init(cb) {
        this._init = cb;
      }
      /**
       * Set the endpoint parameter instructions.
       */
      ep(endpointParameterInstructions) {
        this._ep = endpointParameterInstructions;
        return this;
      }
      /**
       * Add any number of middleware.
       */
      m(middlewareSupplier) {
        this._middlewareFn = middlewareSupplier;
        return this;
      }
      /**
       * Set the initial handler execution context Smithy field.
       */
      s(service, operation, smithyContext = {}) {
        this._smithyContext = {
          service,
          operation,
          ...smithyContext
        };
        return this;
      }
      /**
       * Set the initial handler execution context.
       */
      c(additionalContext = {}) {
        this._additionalContext = additionalContext;
        return this;
      }
      /**
       * Set constant string identifiers for the operation.
       */
      n(clientName, commandName) {
        this._clientName = clientName;
        this._commandName = commandName;
        return this;
      }
      /**
       * Set the input and output sensistive log filters.
       */
      f(inputFilter = (_) => _, outputFilter = (_) => _) {
        this._inputFilterSensitiveLog = inputFilter;
        this._outputFilterSensitiveLog = outputFilter;
        return this;
      }
      /**
       * Sets the serializer.
       */
      ser(serializer) {
        this._serializer = serializer;
        return this;
      }
      /**
       * Sets the deserializer.
       */
      de(deserializer) {
        this._deserializer = deserializer;
        return this;
      }
      /**
       * @returns a Command class with the classBuilder properties.
       */
      build() {
        var _a;
        const closure = this;
        let CommandRef;
        return CommandRef = (_a = class extends Command {
          static {
            __name(this, "_a");
          }
          /**
           * @public
           */
          constructor(...[input]) {
            super();
            this.serialize = closure._serializer;
            this.deserialize = closure._deserializer;
            this.input = input ?? {};
            closure._init(this);
          }
          /**
           * @public
           */
          static getEndpointParameterInstructions() {
            return closure._ep;
          }
          /**
           * @internal
           */
          resolveMiddleware(stack, configuration, options) {
            return this.resolveMiddlewareWithContext(stack, configuration, options, {
              CommandCtor: CommandRef,
              middlewareFn: closure._middlewareFn,
              clientName: closure._clientName,
              commandName: closure._commandName,
              inputFilterSensitiveLog: closure._inputFilterSensitiveLog,
              outputFilterSensitiveLog: closure._outputFilterSensitiveLog,
              smithyContext: closure._smithyContext,
              additionalContext: closure._additionalContext
            });
          }
        }, __name2(_a, "CommandRef"), _a);
      }
    };
    __name2(_ClassBuilder, "ClassBuilder");
    var ClassBuilder = _ClassBuilder;
    var SENSITIVE_STRING = "***SensitiveInformation***";
    var createAggregatedClient = /* @__PURE__ */ __name2((commands, Client2) => {
      for (const command of Object.keys(commands)) {
        const CommandCtor = commands[command];
        const methodImpl = /* @__PURE__ */ __name2(async function(args, optionsOrCb, cb) {
          const command2 = new CommandCtor(args);
          if (typeof optionsOrCb === "function") {
            this.send(command2, optionsOrCb);
          } else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
              throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
            this.send(command2, optionsOrCb || {}, cb);
          } else {
            return this.send(command2, optionsOrCb);
          }
        }, "methodImpl");
        const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
        Client2.prototype[methodName] = methodImpl;
      }
    }, "createAggregatedClient");
    var parseBoolean = /* @__PURE__ */ __name2((value) => {
      switch (value) {
        case "true":
          return true;
        case "false":
          return false;
        default:
          throw new Error(`Unable to parse boolean value "${value}"`);
      }
    }, "parseBoolean");
    var expectBoolean = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value === "number") {
        if (value === 0 || value === 1) {
          logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (value === 0) {
          return false;
        }
        if (value === 1) {
          return true;
        }
      }
      if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
          logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (lower === "false") {
          return false;
        }
        if (lower === "true") {
          return true;
        }
      }
      if (typeof value === "boolean") {
        return value;
      }
      throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
    }, "expectBoolean");
    var expectNumber = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
          if (String(parsed) !== String(value)) {
            logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
          }
          return parsed;
        }
      }
      if (typeof value === "number") {
        return value;
      }
      throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
    }, "expectNumber");
    var MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
    var expectFloat32 = /* @__PURE__ */ __name2((value) => {
      const expected = expectNumber(value);
      if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
          throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
      }
      return expected;
    }, "expectFloat32");
    var expectLong = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
      }
      throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
    }, "expectLong");
    var expectInt = expectLong;
    var expectInt32 = /* @__PURE__ */ __name2((value) => expectSizedInt(value, 32), "expectInt32");
    var expectShort = /* @__PURE__ */ __name2((value) => expectSizedInt(value, 16), "expectShort");
    var expectByte = /* @__PURE__ */ __name2((value) => expectSizedInt(value, 8), "expectByte");
    var expectSizedInt = /* @__PURE__ */ __name2((value, size) => {
      const expected = expectLong(value);
      if (expected !== void 0 && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
      }
      return expected;
    }, "expectSizedInt");
    var castInt = /* @__PURE__ */ __name2((value, size) => {
      switch (size) {
        case 32:
          return Int32Array.of(value)[0];
        case 16:
          return Int16Array.of(value)[0];
        case 8:
          return Int8Array.of(value)[0];
      }
    }, "castInt");
    var expectNonNull = /* @__PURE__ */ __name2((value, location) => {
      if (value === null || value === void 0) {
        if (location) {
          throw new TypeError(`Expected a non-null value for ${location}`);
        }
        throw new TypeError("Expected a non-null value");
      }
      return value;
    }, "expectNonNull");
    var expectObject = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
      const receivedType = Array.isArray(value) ? "array" : typeof value;
      throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
    }, "expectObject");
    var expectString = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value === "string") {
        return value;
      }
      if (["boolean", "number", "bigint"].includes(typeof value)) {
        logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
        return String(value);
      }
      throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
    }, "expectString");
    var expectUnion = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      const asObject = expectObject(value);
      const setKeys = Object.entries(asObject).filter(([, v]) => v != null).map(([k]) => k);
      if (setKeys.length === 0) {
        throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
      }
      if (setKeys.length > 1) {
        throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
      }
      return asObject;
    }, "expectUnion");
    var strictParseDouble = /* @__PURE__ */ __name2((value) => {
      if (typeof value == "string") {
        return expectNumber(parseNumber(value));
      }
      return expectNumber(value);
    }, "strictParseDouble");
    var strictParseFloat = strictParseDouble;
    var strictParseFloat32 = /* @__PURE__ */ __name2((value) => {
      if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
      }
      return expectFloat32(value);
    }, "strictParseFloat32");
    var NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
    var parseNumber = /* @__PURE__ */ __name2((value) => {
      const matches = value.match(NUMBER_REGEX);
      if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
      }
      return parseFloat(value);
    }, "parseNumber");
    var limitedParseDouble = /* @__PURE__ */ __name2((value) => {
      if (typeof value == "string") {
        return parseFloatString(value);
      }
      return expectNumber(value);
    }, "limitedParseDouble");
    var handleFloat = limitedParseDouble;
    var limitedParseFloat = limitedParseDouble;
    var limitedParseFloat32 = /* @__PURE__ */ __name2((value) => {
      if (typeof value == "string") {
        return parseFloatString(value);
      }
      return expectFloat32(value);
    }, "limitedParseFloat32");
    var parseFloatString = /* @__PURE__ */ __name2((value) => {
      switch (value) {
        case "NaN":
          return NaN;
        case "Infinity":
          return Infinity;
        case "-Infinity":
          return -Infinity;
        default:
          throw new Error(`Unable to parse float value: ${value}`);
      }
    }, "parseFloatString");
    var strictParseLong = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return expectLong(parseNumber(value));
      }
      return expectLong(value);
    }, "strictParseLong");
    var strictParseInt = strictParseLong;
    var strictParseInt32 = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return expectInt32(parseNumber(value));
      }
      return expectInt32(value);
    }, "strictParseInt32");
    var strictParseShort = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return expectShort(parseNumber(value));
      }
      return expectShort(value);
    }, "strictParseShort");
    var strictParseByte = /* @__PURE__ */ __name2((value) => {
      if (typeof value === "string") {
        return expectByte(parseNumber(value));
      }
      return expectByte(value);
    }, "strictParseByte");
    var stackTraceWarning = /* @__PURE__ */ __name2((message) => {
      return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s) => !s.includes("stackTraceWarning")).join("\n");
    }, "stackTraceWarning");
    var logger = {
      warn: console.warn
    };
    var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function dateToUtcString(date) {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const dayOfWeek = date.getUTCDay();
      const dayOfMonthInt = date.getUTCDate();
      const hoursInt = date.getUTCHours();
      const minutesInt = date.getUTCMinutes();
      const secondsInt = date.getUTCSeconds();
      const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
      const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
      const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
      const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
      return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
    }
    __name(dateToUtcString, "dateToUtcString");
    __name2(dateToUtcString, "dateToUtcString");
    var RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
    var parseRfc3339DateTime = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
      }
      const match = RFC3339.exec(value);
      if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
      }
      const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
      const year = strictParseShort(stripLeadingZeroes(yearStr));
      const month = parseDateValue(monthStr, "month", 1, 12);
      const day = parseDateValue(dayStr, "day", 1, 31);
      return buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
    }, "parseRfc3339DateTime");
    var RFC3339_WITH_OFFSET = new RegExp(
      /^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/
    );
    var parseRfc3339DateTimeWithOffset = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
      }
      const match = RFC3339_WITH_OFFSET.exec(value);
      if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
      }
      const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
      const year = strictParseShort(stripLeadingZeroes(yearStr));
      const month = parseDateValue(monthStr, "month", 1, 12);
      const day = parseDateValue(dayStr, "day", 1, 31);
      const date = buildDate(year, month, day, { hours, minutes, seconds, fractionalMilliseconds });
      if (offsetStr.toUpperCase() != "Z") {
        date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
      }
      return date;
    }, "parseRfc3339DateTimeWithOffset");
    var IMF_FIXDATE = new RegExp(
      /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/
    );
    var RFC_850_DATE = new RegExp(
      /^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/
    );
    var ASC_TIME = new RegExp(
      /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/
    );
    var parseRfc7231DateTime = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
      }
      let match = IMF_FIXDATE.exec(value);
      if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate(
          strictParseShort(stripLeadingZeroes(yearStr)),
          parseMonthByShortName(monthStr),
          parseDateValue(dayStr, "day", 1, 31),
          { hours, minutes, seconds, fractionalMilliseconds }
        );
      }
      match = RFC_850_DATE.exec(value);
      if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(
          buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
          })
        );
      }
      match = ASC_TIME.exec(value);
      if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate(
          strictParseShort(stripLeadingZeroes(yearStr)),
          parseMonthByShortName(monthStr),
          parseDateValue(dayStr.trimLeft(), "day", 1, 31),
          { hours, minutes, seconds, fractionalMilliseconds }
        );
      }
      throw new TypeError("Invalid RFC-7231 date-time value");
    }, "parseRfc7231DateTime");
    var parseEpochTimestamp = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return void 0;
      }
      let valueAsDouble;
      if (typeof value === "number") {
        valueAsDouble = value;
      } else if (typeof value === "string") {
        valueAsDouble = strictParseDouble(value);
      } else {
        throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
      }
      if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
        throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
      }
      return new Date(Math.round(valueAsDouble * 1e3));
    }, "parseEpochTimestamp");
    var buildDate = /* @__PURE__ */ __name2((year, month, day, time) => {
      const adjustedMonth = month - 1;
      validateDayOfMonth(year, adjustedMonth, day);
      return new Date(
        Date.UTC(
          year,
          adjustedMonth,
          day,
          parseDateValue(time.hours, "hour", 0, 23),
          parseDateValue(time.minutes, "minute", 0, 59),
          // seconds can go up to 60 for leap seconds
          parseDateValue(time.seconds, "seconds", 0, 60),
          parseMilliseconds(time.fractionalMilliseconds)
        )
      );
    }, "buildDate");
    var parseTwoDigitYear = /* @__PURE__ */ __name2((value) => {
      const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
      const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
      if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
      }
      return valueInThisCentury;
    }, "parseTwoDigitYear");
    var FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
    var adjustRfc850Year = /* @__PURE__ */ __name2((input) => {
      if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(
          Date.UTC(
            input.getUTCFullYear() - 100,
            input.getUTCMonth(),
            input.getUTCDate(),
            input.getUTCHours(),
            input.getUTCMinutes(),
            input.getUTCSeconds(),
            input.getUTCMilliseconds()
          )
        );
      }
      return input;
    }, "adjustRfc850Year");
    var parseMonthByShortName = /* @__PURE__ */ __name2((value) => {
      const monthIdx = MONTHS.indexOf(value);
      if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
      }
      return monthIdx + 1;
    }, "parseMonthByShortName");
    var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var validateDayOfMonth = /* @__PURE__ */ __name2((year, month, day) => {
      let maxDays = DAYS_IN_MONTH[month];
      if (month === 1 && isLeapYear(year)) {
        maxDays = 29;
      }
      if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
      }
    }, "validateDayOfMonth");
    var isLeapYear = /* @__PURE__ */ __name2((year) => {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }, "isLeapYear");
    var parseDateValue = /* @__PURE__ */ __name2((value, type, lower, upper) => {
      const dateVal = strictParseByte(stripLeadingZeroes(value));
      if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
      }
      return dateVal;
    }, "parseDateValue");
    var parseMilliseconds = /* @__PURE__ */ __name2((value) => {
      if (value === null || value === void 0) {
        return 0;
      }
      return strictParseFloat32("0." + value) * 1e3;
    }, "parseMilliseconds");
    var parseOffsetToMilliseconds = /* @__PURE__ */ __name2((value) => {
      const directionStr = value[0];
      let direction = 1;
      if (directionStr == "+") {
        direction = 1;
      } else if (directionStr == "-") {
        direction = -1;
      } else {
        throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
      }
      const hour = Number(value.substring(1, 3));
      const minute = Number(value.substring(4, 6));
      return direction * (hour * 60 + minute) * 60 * 1e3;
    }, "parseOffsetToMilliseconds");
    var stripLeadingZeroes = /* @__PURE__ */ __name2((value) => {
      let idx = 0;
      while (idx < value.length - 1 && value.charAt(idx) === "0") {
        idx++;
      }
      if (idx === 0) {
        return value;
      }
      return value.slice(idx);
    }, "stripLeadingZeroes");
    var _ServiceException = class _ServiceException2 extends Error {
      static {
        __name(this, "_ServiceException");
      }
      constructor(options) {
        super(options.message);
        Object.setPrototypeOf(this, _ServiceException2.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
      }
    };
    __name2(_ServiceException, "ServiceException");
    var ServiceException = _ServiceException;
    var decorateServiceException = /* @__PURE__ */ __name2((exception, additions = {}) => {
      Object.entries(additions).filter(([, v]) => v !== void 0).forEach(([k, v]) => {
        if (exception[k] == void 0 || exception[k] === "") {
          exception[k] = v;
        }
      });
      const message = exception.message || exception.Message || "UnknownError";
      exception.message = message;
      delete exception.Message;
      return exception;
    }, "decorateServiceException");
    var throwDefaultError = /* @__PURE__ */ __name2(({ output, parsedBody, exceptionCtor, errorCode }) => {
      const $metadata = deserializeMetadata(output);
      const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : void 0;
      const response = new exceptionCtor({
        name: (parsedBody == null ? void 0 : parsedBody.code) || (parsedBody == null ? void 0 : parsedBody.Code) || errorCode || statusCode || "UnknownError",
        $fault: "client",
        $metadata
      });
      throw decorateServiceException(response, parsedBody);
    }, "throwDefaultError");
    var withBaseException = /* @__PURE__ */ __name2((ExceptionCtor) => {
      return ({ output, parsedBody, errorCode }) => {
        throwDefaultError({ output, parsedBody, exceptionCtor: ExceptionCtor, errorCode });
      };
    }, "withBaseException");
    var deserializeMetadata = /* @__PURE__ */ __name2((output) => ({
      httpStatusCode: output.statusCode,
      requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
      extendedRequestId: output.headers["x-amz-id-2"],
      cfId: output.headers["x-amz-cf-id"]
    }), "deserializeMetadata");
    var loadConfigsForDefaultMode = /* @__PURE__ */ __name2((mode) => {
      switch (mode) {
        case "standard":
          return {
            retryMode: "standard",
            connectionTimeout: 3100
          };
        case "in-region":
          return {
            retryMode: "standard",
            connectionTimeout: 1100
          };
        case "cross-region":
          return {
            retryMode: "standard",
            connectionTimeout: 3100
          };
        case "mobile":
          return {
            retryMode: "standard",
            connectionTimeout: 3e4
          };
        default:
          return {};
      }
    }, "loadConfigsForDefaultMode");
    var warningEmitted = false;
    var emitWarningIfUnsupportedVersion = /* @__PURE__ */ __name2((version2) => {
      if (version2 && !warningEmitted && parseInt(version2.substring(1, version2.indexOf("."))) < 16) {
        warningEmitted = true;
      }
    }, "emitWarningIfUnsupportedVersion");
    var getChecksumConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      const checksumAlgorithms = [];
      for (const id in import_types.AlgorithmId) {
        const algorithmId = import_types.AlgorithmId[id];
        if (runtimeConfig[algorithmId] === void 0) {
          continue;
        }
        checksumAlgorithms.push({
          algorithmId: () => algorithmId,
          checksumConstructor: () => runtimeConfig[algorithmId]
        });
      }
      return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm(algo) {
          this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
          return this._checksumAlgorithms;
        }
      };
    }, "getChecksumConfiguration");
    var resolveChecksumRuntimeConfig = /* @__PURE__ */ __name2((clientConfig) => {
      const runtimeConfig = {};
      clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
      });
      return runtimeConfig;
    }, "resolveChecksumRuntimeConfig");
    var getRetryConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      let _retryStrategy = runtimeConfig.retryStrategy;
      return {
        setRetryStrategy(retryStrategy) {
          _retryStrategy = retryStrategy;
        },
        retryStrategy() {
          return _retryStrategy;
        }
      };
    }, "getRetryConfiguration");
    var resolveRetryRuntimeConfig = /* @__PURE__ */ __name2((retryStrategyConfiguration) => {
      const runtimeConfig = {};
      runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
      return runtimeConfig;
    }, "resolveRetryRuntimeConfig");
    var getDefaultExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      return {
        ...getChecksumConfiguration(runtimeConfig),
        ...getRetryConfiguration(runtimeConfig)
      };
    }, "getDefaultExtensionConfiguration");
    var getDefaultClientConfiguration = getDefaultExtensionConfiguration;
    var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name2((config) => {
      return {
        ...resolveChecksumRuntimeConfig(config),
        ...resolveRetryRuntimeConfig(config)
      };
    }, "resolveDefaultRuntimeConfig");
    function extendedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
      });
    }
    __name(extendedEncodeURIComponent, "extendedEncodeURIComponent");
    __name2(extendedEncodeURIComponent, "extendedEncodeURIComponent");
    var getArrayIfSingleItem = /* @__PURE__ */ __name2((mayBeArray) => Array.isArray(mayBeArray) ? mayBeArray : [mayBeArray], "getArrayIfSingleItem");
    var getValueFromTextNode = /* @__PURE__ */ __name2((obj) => {
      const textNodeName = "#text";
      for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== void 0) {
          obj[key] = obj[key][textNodeName];
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          obj[key] = getValueFromTextNode(obj[key]);
        }
      }
      return obj;
    }, "getValueFromTextNode");
    var StringWrapper = /* @__PURE__ */ __name2(function() {
      const Class = Object.getPrototypeOf(this).constructor;
      const Constructor = Function.bind.apply(String, [null, ...arguments]);
      const instance = new Constructor();
      Object.setPrototypeOf(instance, Class.prototype);
      return instance;
    }, "StringWrapper");
    StringWrapper.prototype = Object.create(String.prototype, {
      constructor: {
        value: StringWrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    Object.setPrototypeOf(StringWrapper, String);
    var _LazyJsonString = class _LazyJsonString2 extends StringWrapper {
      static {
        __name(this, "_LazyJsonString");
      }
      deserializeJSON() {
        return JSON.parse(super.toString());
      }
      toJSON() {
        return super.toString();
      }
      static fromObject(object) {
        if (object instanceof _LazyJsonString2) {
          return object;
        } else if (object instanceof String || typeof object === "string") {
          return new _LazyJsonString2(object);
        }
        return new _LazyJsonString2(JSON.stringify(object));
      }
    };
    __name2(_LazyJsonString, "LazyJsonString");
    var LazyJsonString = _LazyJsonString;
    function map(arg0, arg1, arg2) {
      let target;
      let filter;
      let instructions;
      if (typeof arg1 === "undefined" && typeof arg2 === "undefined") {
        target = {};
        instructions = arg0;
      } else {
        target = arg0;
        if (typeof arg1 === "function") {
          filter = arg1;
          instructions = arg2;
          return mapWithFilter(target, filter, instructions);
        } else {
          instructions = arg1;
        }
      }
      for (const key of Object.keys(instructions)) {
        if (!Array.isArray(instructions[key])) {
          target[key] = instructions[key];
          continue;
        }
        applyInstruction(target, null, instructions, key);
      }
      return target;
    }
    __name(map, "map");
    __name2(map, "map");
    var convertMap = /* @__PURE__ */ __name2((target) => {
      const output = {};
      for (const [k, v] of Object.entries(target || {})) {
        output[k] = [, v];
      }
      return output;
    }, "convertMap");
    var take = /* @__PURE__ */ __name2((source, instructions) => {
      const out = {};
      for (const key in instructions) {
        applyInstruction(out, source, instructions, key);
      }
      return out;
    }, "take");
    var mapWithFilter = /* @__PURE__ */ __name2((target, filter, instructions) => {
      return map(
        target,
        Object.entries(instructions).reduce(
          (_instructions, [key, value]) => {
            if (Array.isArray(value)) {
              _instructions[key] = value;
            } else {
              if (typeof value === "function") {
                _instructions[key] = [filter, value()];
              } else {
                _instructions[key] = [filter, value];
              }
            }
            return _instructions;
          },
          {}
        )
      );
    }, "mapWithFilter");
    var applyInstruction = /* @__PURE__ */ __name2((target, source, instructions, targetKey) => {
      if (source !== null) {
        let instruction = instructions[targetKey];
        if (typeof instruction === "function") {
          instruction = [, instruction];
        }
        const [filter2 = nonNullish, valueFn = pass, sourceKey = targetKey] = instruction;
        if (typeof filter2 === "function" && filter2(source[sourceKey]) || typeof filter2 !== "function" && !!filter2) {
          target[targetKey] = valueFn(source[sourceKey]);
        }
        return;
      }
      let [filter, value] = instructions[targetKey];
      if (typeof value === "function") {
        let _value;
        const defaultFilterPassed = filter === void 0 && (_value = value()) != null;
        const customFilterPassed = typeof filter === "function" && !!filter(void 0) || typeof filter !== "function" && !!filter;
        if (defaultFilterPassed) {
          target[targetKey] = _value;
        } else if (customFilterPassed) {
          target[targetKey] = value();
        }
      } else {
        const defaultFilterPassed = filter === void 0 && value != null;
        const customFilterPassed = typeof filter === "function" && !!filter(value) || typeof filter !== "function" && !!filter;
        if (defaultFilterPassed || customFilterPassed) {
          target[targetKey] = value;
        }
      }
    }, "applyInstruction");
    var nonNullish = /* @__PURE__ */ __name2((_) => _ != null, "nonNullish");
    var pass = /* @__PURE__ */ __name2((_) => _, "pass");
    var resolvedPath = /* @__PURE__ */ __name2((resolvedPath2, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
      if (input != null && input[memberName] !== void 0) {
        const labelValue = labelValueProvider();
        if (labelValue.length <= 0) {
          throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
        }
        resolvedPath2 = resolvedPath2.replace(
          uriLabel,
          isGreedyLabel ? labelValue.split("/").map((segment) => extendedEncodeURIComponent(segment)).join("/") : extendedEncodeURIComponent(labelValue)
        );
      } else {
        throw new Error("No value provided for input HTTP label: " + memberName + ".");
      }
      return resolvedPath2;
    }, "resolvedPath");
    var serializeFloat = /* @__PURE__ */ __name2((value) => {
      if (value !== value) {
        return "NaN";
      }
      switch (value) {
        case Infinity:
          return "Infinity";
        case -Infinity:
          return "-Infinity";
        default:
          return value;
      }
    }, "serializeFloat");
    var _json = /* @__PURE__ */ __name2((obj) => {
      if (obj == null) {
        return {};
      }
      if (Array.isArray(obj)) {
        return obj.filter((_) => _ != null).map(_json);
      }
      if (typeof obj === "object") {
        const target = {};
        for (const key of Object.keys(obj)) {
          if (obj[key] == null) {
            continue;
          }
          target[key] = _json(obj[key]);
        }
        return target;
      }
      return obj;
    }, "_json");
    function splitEvery(value, delimiter, numDelimiters) {
      if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
        throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
      }
      const segments = value.split(delimiter);
      if (numDelimiters === 1) {
        return segments;
      }
      const compoundSegments = [];
      let currentSegment = "";
      for (let i = 0; i < segments.length; i++) {
        if (currentSegment === "") {
          currentSegment = segments[i];
        } else {
          currentSegment += delimiter + segments[i];
        }
        if ((i + 1) % numDelimiters === 0) {
          compoundSegments.push(currentSegment);
          currentSegment = "";
        }
      }
      if (currentSegment !== "") {
        compoundSegments.push(currentSegment);
      }
      return compoundSegments;
    }
    __name(splitEvery, "splitEvery");
    __name2(splitEvery, "splitEvery");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-hex-encoding/dist-cjs/index.js
var require_dist_cjs16 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-hex-encoding/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      fromHex: () => fromHex,
      toHex: () => toHex
    });
    module2.exports = __toCommonJS2(src_exports);
    var SHORT_TO_HEX = {};
    var HEX_TO_SHORT = {};
    for (let i = 0; i < 256; i++) {
      let encodedByte = i.toString(16).toLowerCase();
      if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
      }
      SHORT_TO_HEX[i] = encodedByte;
      HEX_TO_SHORT[encodedByte] = i;
    }
    function fromHex(encoded) {
      if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
      }
      const out = new Uint8Array(encoded.length / 2);
      for (let i = 0; i < encoded.length; i += 2) {
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
          out[i / 2] = HEX_TO_SHORT[encodedByte];
        } else {
          throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
      }
      return out;
    }
    __name(fromHex, "fromHex");
    __name2(fromHex, "fromHex");
    function toHex(bytes) {
      let out = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
      }
      return out;
    }
    __name(toHex, "toHex");
    __name2(toHex, "toHex");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-sdk-sqs/dist-cjs/index.js
var require_dist_cjs17 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-sdk-sqs/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      getQueueUrlPlugin: () => getQueueUrlPlugin,
      getReceiveMessagePlugin: () => getReceiveMessagePlugin,
      getSendMessageBatchPlugin: () => getSendMessageBatchPlugin,
      getSendMessagePlugin: () => getSendMessagePlugin,
      queueUrlMiddleware: () => queueUrlMiddleware,
      queueUrlMiddlewareOptions: () => queueUrlMiddlewareOptions,
      receiveMessageMiddleware: () => receiveMessageMiddleware,
      receiveMessageMiddlewareOptions: () => receiveMessageMiddlewareOptions,
      resolveQueueUrlConfig: () => resolveQueueUrlConfig,
      sendMessageBatchMiddleware: () => sendMessageBatchMiddleware,
      sendMessageBatchMiddlewareOptions: () => sendMessageBatchMiddlewareOptions,
      sendMessageMiddleware: () => sendMessageMiddleware,
      sendMessageMiddlewareOptions: () => sendMessageMiddlewareOptions
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_smithy_client = require_dist_cjs15();
    var resolveQueueUrlConfig = /* @__PURE__ */ __name2((config) => {
      return {
        ...config,
        useQueueUrlAsEndpoint: config.useQueueUrlAsEndpoint ?? true
      };
    }, "resolveQueueUrlConfig");
    function queueUrlMiddleware({ useQueueUrlAsEndpoint, endpoint }) {
      return (next, context) => {
        return async (args) => {
          var _a;
          const { input } = args;
          const resolvedEndpoint = context.endpointV2;
          if (!endpoint && input.QueueUrl && resolvedEndpoint && useQueueUrlAsEndpoint) {
            const logger = context.logger instanceof import_smithy_client.NoOpLogger || !((_a = context.logger) == null ? void 0 : _a.warn) ? console : context.logger;
            try {
              const queueUrl = new URL(input.QueueUrl);
              const queueUrlOrigin = new URL(queueUrl.origin);
              if (resolvedEndpoint.url.origin !== queueUrlOrigin.origin) {
                logger.warn(
                  `QueueUrl=${input.QueueUrl} differs from SQSClient resolved endpoint=${resolvedEndpoint.url.toString()}, using QueueUrl host as endpoint.
Set [endpoint=string] or [useQueueUrlAsEndpoint=false] on the SQSClient.`
                );
                resolvedEndpoint.url = queueUrlOrigin;
              }
            } catch (e) {
              logger.warn(e);
            }
          }
          return next(args);
        };
      };
    }
    __name(queueUrlMiddleware, "queueUrlMiddleware");
    __name2(queueUrlMiddleware, "queueUrlMiddleware");
    var queueUrlMiddlewareOptions = {
      name: "queueUrlMiddleware",
      relation: "after",
      toMiddleware: "endpointV2Middleware",
      override: true
    };
    var getQueueUrlPlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(queueUrlMiddleware(config), queueUrlMiddlewareOptions);
      }
    }), "getQueueUrlPlugin");
    var import_util_hex_encoding = require_dist_cjs16();
    var import_util_utf8 = require_dist_cjs9();
    function receiveMessageMiddleware(options) {
      return (next) => async (args) => {
        const resp = await next({ ...args });
        if (options.md5 === false) {
          return resp;
        }
        const output = resp.output;
        const messageIds = [];
        if (output.Messages !== void 0) {
          for (const message of output.Messages) {
            const md52 = message.MD5OfBody;
            const hash = new options.md5();
            hash.update((0, import_util_utf8.toUint8Array)(message.Body || ""));
            if (md52 !== (0, import_util_hex_encoding.toHex)(await hash.digest())) {
              messageIds.push(message.MessageId);
            }
          }
        }
        if (messageIds.length > 0) {
          throw new Error("Invalid MD5 checksum on messages: " + messageIds.join(", "));
        }
        return resp;
      };
    }
    __name(receiveMessageMiddleware, "receiveMessageMiddleware");
    __name2(receiveMessageMiddleware, "receiveMessageMiddleware");
    var receiveMessageMiddlewareOptions = {
      step: "initialize",
      tags: ["VALIDATE_BODY_MD5"],
      name: "receiveMessageMiddleware",
      override: true
    };
    var getReceiveMessagePlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: (clientStack) => {
        clientStack.add(receiveMessageMiddleware(config), receiveMessageMiddlewareOptions);
      }
    }), "getReceiveMessagePlugin");
    var import_util_utf82 = require_dist_cjs9();
    var sendMessageMiddleware = /* @__PURE__ */ __name2((options) => (next) => async (args) => {
      const resp = await next({ ...args });
      if (options.md5 === false) {
        return resp;
      }
      const output = resp.output;
      const hash = new options.md5();
      hash.update((0, import_util_utf82.toUint8Array)(args.input.MessageBody || ""));
      if (output.MD5OfMessageBody !== (0, import_util_hex_encoding.toHex)(await hash.digest())) {
        throw new Error("InvalidChecksumError");
      }
      return resp;
    }, "sendMessageMiddleware");
    var sendMessageMiddlewareOptions = {
      step: "initialize",
      tags: ["VALIDATE_BODY_MD5"],
      name: "sendMessageMiddleware",
      override: true
    };
    var getSendMessagePlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: (clientStack) => {
        clientStack.add(sendMessageMiddleware(config), sendMessageMiddlewareOptions);
      }
    }), "getSendMessagePlugin");
    var import_util_utf83 = require_dist_cjs9();
    var sendMessageBatchMiddleware = /* @__PURE__ */ __name2((options) => (next) => async (args) => {
      const resp = await next({ ...args });
      if (options.md5 === false) {
        return resp;
      }
      const output = resp.output;
      const messageIds = [];
      const entries = {};
      if (output.Successful !== void 0) {
        for (const entry of output.Successful) {
          if (entry.Id !== void 0) {
            entries[entry.Id] = entry;
          }
        }
      }
      for (const entry of args.input.Entries) {
        if (entries[entry.Id]) {
          const md52 = entries[entry.Id].MD5OfMessageBody;
          const hash = new options.md5();
          hash.update((0, import_util_utf83.toUint8Array)(entry.MessageBody || ""));
          if (md52 !== (0, import_util_hex_encoding.toHex)(await hash.digest())) {
            messageIds.push(entries[entry.Id].MessageId);
          }
        }
      }
      if (messageIds.length > 0) {
        throw new Error("Invalid MD5 checksum on messages: " + messageIds.join(", "));
      }
      return resp;
    }, "sendMessageBatchMiddleware");
    var sendMessageBatchMiddlewareOptions = {
      step: "initialize",
      tags: ["VALIDATE_BODY_MD5"],
      name: "sendMessageBatchMiddleware",
      override: true
    };
    var getSendMessageBatchPlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: (clientStack) => {
        clientStack.add(sendMessageBatchMiddleware(config), sendMessageBatchMiddlewareOptions);
      }
    }), "getSendMessageBatchPlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-endpoints/dist-cjs/index.js
var require_dist_cjs18 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-endpoints/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      EndpointError: () => EndpointError2,
      customEndpointFunctions: () => customEndpointFunctions,
      isIpAddress: () => isIpAddress2,
      isValidHostLabel: () => isValidHostLabel,
      resolveEndpoint: () => resolveEndpoint2
    });
    module2.exports = __toCommonJS2(src_exports);
    var IP_V4_REGEX = new RegExp(
      `^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`
    );
    var isIpAddress2 = /* @__PURE__ */ __name2((value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]"), "isIpAddress");
    var VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
    var isValidHostLabel = /* @__PURE__ */ __name2((value, allowSubDomains = false) => {
      if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
      }
      const labels = value.split(".");
      for (const label of labels) {
        if (!isValidHostLabel(label)) {
          return false;
        }
      }
      return true;
    }, "isValidHostLabel");
    var customEndpointFunctions = {};
    var debugId = "endpoints";
    function toDebugString(input) {
      if (typeof input !== "object" || input == null) {
        return input;
      }
      if ("ref" in input) {
        return `$${toDebugString(input.ref)}`;
      }
      if ("fn" in input) {
        return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
      }
      return JSON.stringify(input, null, 2);
    }
    __name(toDebugString, "toDebugString");
    __name2(toDebugString, "toDebugString");
    var _EndpointError = class _EndpointError extends Error {
      static {
        __name(this, "_EndpointError");
      }
      constructor(message) {
        super(message);
        this.name = "EndpointError";
      }
    };
    __name2(_EndpointError, "EndpointError");
    var EndpointError2 = _EndpointError;
    var booleanEquals = /* @__PURE__ */ __name2((value1, value2) => value1 === value2, "booleanEquals");
    var getAttrPathList = /* @__PURE__ */ __name2((path2) => {
      const parts = path2.split(".");
      const pathList = [];
      for (const part of parts) {
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
          if (part.indexOf("]") !== part.length - 1) {
            throw new EndpointError2(`Path: '${path2}' does not end with ']'`);
          }
          const arrayIndex = part.slice(squareBracketIndex + 1, -1);
          if (Number.isNaN(parseInt(arrayIndex))) {
            throw new EndpointError2(`Invalid array index: '${arrayIndex}' in path: '${path2}'`);
          }
          if (squareBracketIndex !== 0) {
            pathList.push(part.slice(0, squareBracketIndex));
          }
          pathList.push(arrayIndex);
        } else {
          pathList.push(part);
        }
      }
      return pathList;
    }, "getAttrPathList");
    var getAttr = /* @__PURE__ */ __name2((value, path2) => getAttrPathList(path2).reduce((acc, index) => {
      if (typeof acc !== "object") {
        throw new EndpointError2(`Index '${index}' in '${path2}' not found in '${JSON.stringify(value)}'`);
      } else if (Array.isArray(acc)) {
        return acc[parseInt(index)];
      }
      return acc[index];
    }, value), "getAttr");
    var isSet = /* @__PURE__ */ __name2((value) => value != null, "isSet");
    var not = /* @__PURE__ */ __name2((value) => !value, "not");
    var import_types3 = require_dist_cjs();
    var DEFAULT_PORTS = {
      [import_types3.EndpointURLScheme.HTTP]: 80,
      [import_types3.EndpointURLScheme.HTTPS]: 443
    };
    var parseURL = /* @__PURE__ */ __name2((value) => {
      const whatwgURL = (() => {
        try {
          if (value instanceof URL) {
            return value;
          }
          if (typeof value === "object" && "hostname" in value) {
            const { hostname: hostname2, port, protocol: protocol2 = "", path: path2 = "", query = {} } = value;
            const url = new URL(`${protocol2}//${hostname2}${port ? `:${port}` : ""}${path2}`);
            url.search = Object.entries(query).map(([k, v]) => `${k}=${v}`).join("&");
            return url;
          }
          return new URL(value);
        } catch (error) {
          return null;
        }
      })();
      if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
      }
      const urlString = whatwgURL.href;
      const { host, hostname, pathname, protocol, search } = whatwgURL;
      if (search) {
        return null;
      }
      const scheme = protocol.slice(0, -1);
      if (!Object.values(import_types3.EndpointURLScheme).includes(scheme)) {
        return null;
      }
      const isIp = isIpAddress2(hostname);
      const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
      const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
      return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp
      };
    }, "parseURL");
    var stringEquals = /* @__PURE__ */ __name2((value1, value2) => value1 === value2, "stringEquals");
    var substring = /* @__PURE__ */ __name2((input, start, stop, reverse) => {
      if (start >= stop || input.length < stop) {
        return null;
      }
      if (!reverse) {
        return input.substring(start, stop);
      }
      return input.substring(input.length - stop, input.length - start);
    }, "substring");
    var uriEncode = /* @__PURE__ */ __name2((value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`), "uriEncode");
    var endpointFunctions = {
      booleanEquals,
      getAttr,
      isSet,
      isValidHostLabel,
      not,
      parseURL,
      stringEquals,
      substring,
      uriEncode
    };
    var evaluateTemplate = /* @__PURE__ */ __name2((template, options) => {
      const evaluatedTemplateArr = [];
      const templateContext = {
        ...options.endpointParams,
        ...options.referenceRecord
      };
      let currentIndex = 0;
      while (currentIndex < template.length) {
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(currentIndex));
          break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex));
          break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
          currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
          const [refName, attrName] = parameterName.split("#");
          evaluatedTemplateArr.push(getAttr(templateContext[refName], attrName));
        } else {
          evaluatedTemplateArr.push(templateContext[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
      }
      return evaluatedTemplateArr.join("");
    }, "evaluateTemplate");
    var getReferenceValue = /* @__PURE__ */ __name2(({ ref }, options) => {
      const referenceRecord = {
        ...options.endpointParams,
        ...options.referenceRecord
      };
      return referenceRecord[ref];
    }, "getReferenceValue");
    var evaluateExpression = /* @__PURE__ */ __name2((obj, keyName, options) => {
      if (typeof obj === "string") {
        return evaluateTemplate(obj, options);
      } else if (obj["fn"]) {
        return callFunction(obj, options);
      } else if (obj["ref"]) {
        return getReferenceValue(obj, options);
      }
      throw new EndpointError2(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
    }, "evaluateExpression");
    var callFunction = /* @__PURE__ */ __name2(({ fn, argv }, options) => {
      const evaluatedArgs = argv.map(
        (arg) => ["boolean", "number"].includes(typeof arg) ? arg : evaluateExpression(arg, "arg", options)
      );
      const fnSegments = fn.split(".");
      if (fnSegments[0] in customEndpointFunctions && fnSegments[1] != null) {
        return customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
      }
      return endpointFunctions[fn](...evaluatedArgs);
    }, "callFunction");
    var evaluateCondition = /* @__PURE__ */ __name2(({ assign: assign2, ...fnArgs }, options) => {
      var _a, _b;
      if (assign2 && assign2 in options.referenceRecord) {
        throw new EndpointError2(`'${assign2}' is already defined in Reference Record.`);
      }
      const value = callFunction(fnArgs, options);
      (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} evaluateCondition: ${toDebugString(fnArgs)} = ${toDebugString(value)}`);
      return {
        result: value === "" ? true : !!value,
        ...assign2 != null && { toAssign: { name: assign2, value } }
      };
    }, "evaluateCondition");
    var evaluateConditions = /* @__PURE__ */ __name2((conditions = [], options) => {
      var _a, _b;
      const conditionsReferenceRecord = {};
      for (const condition of conditions) {
        const { result, toAssign } = evaluateCondition(condition, {
          ...options,
          referenceRecord: {
            ...options.referenceRecord,
            ...conditionsReferenceRecord
          }
        });
        if (!result) {
          return { result };
        }
        if (toAssign) {
          conditionsReferenceRecord[toAssign.name] = toAssign.value;
          (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} assign: ${toAssign.name} := ${toDebugString(toAssign.value)}`);
        }
      }
      return { result: true, referenceRecord: conditionsReferenceRecord };
    }, "evaluateConditions");
    var getEndpointHeaders = /* @__PURE__ */ __name2((headers, options) => Object.entries(headers).reduce(
      (acc, [headerKey, headerVal]) => ({
        ...acc,
        [headerKey]: headerVal.map((headerValEntry) => {
          const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
          if (typeof processedExpr !== "string") {
            throw new EndpointError2(`Header '${headerKey}' value '${processedExpr}' is not a string`);
          }
          return processedExpr;
        })
      }),
      {}
    ), "getEndpointHeaders");
    var getEndpointProperty = /* @__PURE__ */ __name2((property, options) => {
      if (Array.isArray(property)) {
        return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
      }
      switch (typeof property) {
        case "string":
          return evaluateTemplate(property, options);
        case "object":
          if (property === null) {
            throw new EndpointError2(`Unexpected endpoint property: ${property}`);
          }
          return getEndpointProperties(property, options);
        case "boolean":
          return property;
        default:
          throw new EndpointError2(`Unexpected endpoint property type: ${typeof property}`);
      }
    }, "getEndpointProperty");
    var getEndpointProperties = /* @__PURE__ */ __name2((properties, options) => Object.entries(properties).reduce(
      (acc, [propertyKey, propertyVal]) => ({
        ...acc,
        [propertyKey]: getEndpointProperty(propertyVal, options)
      }),
      {}
    ), "getEndpointProperties");
    var getEndpointUrl = /* @__PURE__ */ __name2((endpointUrl, options) => {
      const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
      if (typeof expression === "string") {
        try {
          return new URL(expression);
        } catch (error) {
          console.error(`Failed to construct URL with ${expression}`, error);
          throw error;
        }
      }
      throw new EndpointError2(`Endpoint URL must be a string, got ${typeof expression}`);
    }, "getEndpointUrl");
    var evaluateEndpointRule = /* @__PURE__ */ __name2((endpointRule, options) => {
      var _a, _b;
      const { conditions, endpoint } = endpointRule;
      const { result, referenceRecord } = evaluateConditions(conditions, options);
      if (!result) {
        return;
      }
      const endpointRuleOptions = {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord }
      };
      const { url, properties, headers } = endpoint;
      (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} Resolving endpoint from template: ${toDebugString(endpoint)}`);
      return {
        ...headers != void 0 && {
          headers: getEndpointHeaders(headers, endpointRuleOptions)
        },
        ...properties != void 0 && {
          properties: getEndpointProperties(properties, endpointRuleOptions)
        },
        url: getEndpointUrl(url, endpointRuleOptions)
      };
    }, "evaluateEndpointRule");
    var evaluateErrorRule = /* @__PURE__ */ __name2((errorRule, options) => {
      const { conditions, error } = errorRule;
      const { result, referenceRecord } = evaluateConditions(conditions, options);
      if (!result) {
        return;
      }
      throw new EndpointError2(
        evaluateExpression(error, "Error", {
          ...options,
          referenceRecord: { ...options.referenceRecord, ...referenceRecord }
        })
      );
    }, "evaluateErrorRule");
    var evaluateTreeRule = /* @__PURE__ */ __name2((treeRule, options) => {
      const { conditions, rules } = treeRule;
      const { result, referenceRecord } = evaluateConditions(conditions, options);
      if (!result) {
        return;
      }
      return evaluateRules(rules, {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord }
      });
    }, "evaluateTreeRule");
    var evaluateRules = /* @__PURE__ */ __name2((rules, options) => {
      for (const rule of rules) {
        if (rule.type === "endpoint") {
          const endpointOrUndefined = evaluateEndpointRule(rule, options);
          if (endpointOrUndefined) {
            return endpointOrUndefined;
          }
        } else if (rule.type === "error") {
          evaluateErrorRule(rule, options);
        } else if (rule.type === "tree") {
          const endpointOrUndefined = evaluateTreeRule(rule, options);
          if (endpointOrUndefined) {
            return endpointOrUndefined;
          }
        } else {
          throw new EndpointError2(`Unknown endpoint rule: ${rule}`);
        }
      }
      throw new EndpointError2(`Rules evaluation failed`);
    }, "evaluateRules");
    var resolveEndpoint2 = /* @__PURE__ */ __name2((ruleSetObject, options) => {
      var _a, _b, _c, _d, _e;
      const { endpointParams, logger } = options;
      const { parameters, rules } = ruleSetObject;
      (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} Initial EndpointParams: ${toDebugString(endpointParams)}`);
      const paramsWithDefault = Object.entries(parameters).filter(([, v]) => v.default != null).map(([k, v]) => [k, v.default]);
      if (paramsWithDefault.length > 0) {
        for (const [paramKey, paramDefaultValue] of paramsWithDefault) {
          endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
        }
      }
      const requiredParams = Object.entries(parameters).filter(([, v]) => v.required).map(([k]) => k);
      for (const requiredParam of requiredParams) {
        if (endpointParams[requiredParam] == null) {
          throw new EndpointError2(`Missing required parameter: '${requiredParam}'`);
        }
      }
      const endpoint = evaluateRules(rules, { endpointParams, logger, referenceRecord: {} });
      if ((_c = options.endpointParams) == null ? void 0 : _c.Endpoint) {
        try {
          const givenEndpoint = new URL(options.endpointParams.Endpoint);
          const { protocol, port } = givenEndpoint;
          endpoint.url.protocol = protocol;
          endpoint.url.port = port;
        } catch (e) {
        }
      }
      (_e = (_d = options.logger) == null ? void 0 : _d.debug) == null ? void 0 : _e.call(_d, `${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
      return endpoint;
    }, "resolveEndpoint");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/util-endpoints/dist-cjs/index.js
var require_dist_cjs19 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/util-endpoints/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      ConditionObject: () => import_util_endpoints.ConditionObject,
      DeprecatedObject: () => import_util_endpoints.DeprecatedObject,
      EndpointError: () => import_util_endpoints.EndpointError,
      EndpointObject: () => import_util_endpoints.EndpointObject,
      EndpointObjectHeaders: () => import_util_endpoints.EndpointObjectHeaders,
      EndpointObjectProperties: () => import_util_endpoints.EndpointObjectProperties,
      EndpointParams: () => import_util_endpoints.EndpointParams,
      EndpointResolverOptions: () => import_util_endpoints.EndpointResolverOptions,
      EndpointRuleObject: () => import_util_endpoints.EndpointRuleObject,
      ErrorRuleObject: () => import_util_endpoints.ErrorRuleObject,
      EvaluateOptions: () => import_util_endpoints.EvaluateOptions,
      Expression: () => import_util_endpoints.Expression,
      FunctionArgv: () => import_util_endpoints.FunctionArgv,
      FunctionObject: () => import_util_endpoints.FunctionObject,
      FunctionReturn: () => import_util_endpoints.FunctionReturn,
      ParameterObject: () => import_util_endpoints.ParameterObject,
      ReferenceObject: () => import_util_endpoints.ReferenceObject,
      ReferenceRecord: () => import_util_endpoints.ReferenceRecord,
      RuleSetObject: () => import_util_endpoints.RuleSetObject,
      RuleSetRules: () => import_util_endpoints.RuleSetRules,
      TreeRuleObject: () => import_util_endpoints.TreeRuleObject,
      awsEndpointFunctions: () => awsEndpointFunctions,
      getUserAgentPrefix: () => getUserAgentPrefix,
      isIpAddress: () => import_util_endpoints.isIpAddress,
      partition: () => partition,
      resolveEndpoint: () => import_util_endpoints.resolveEndpoint,
      setPartitionInfo: () => setPartitionInfo,
      useDefaultPartitionInfo: () => useDefaultPartitionInfo
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_util_endpoints = require_dist_cjs18();
    var isVirtualHostableS3Bucket = /* @__PURE__ */ __name2((value, allowSubDomains = false) => {
      if (allowSubDomains) {
        for (const label of value.split(".")) {
          if (!isVirtualHostableS3Bucket(label)) {
            return false;
          }
        }
        return true;
      }
      if (!(0, import_util_endpoints.isValidHostLabel)(value)) {
        return false;
      }
      if (value.length < 3 || value.length > 63) {
        return false;
      }
      if (value !== value.toLowerCase()) {
        return false;
      }
      if ((0, import_util_endpoints.isIpAddress)(value)) {
        return false;
      }
      return true;
    }, "isVirtualHostableS3Bucket");
    var parseArn = /* @__PURE__ */ __name2((value) => {
      const segments = value.split(":");
      if (segments.length < 6)
        return null;
      const [arn, partition2, service, region, accountId, ...resourceId] = segments;
      if (arn !== "arn" || partition2 === "" || service === "" || resourceId[0] === "")
        return null;
      return {
        partition: partition2,
        service,
        region,
        accountId,
        resourceId: resourceId[0].includes("/") ? resourceId[0].split("/") : resourceId
      };
    }, "parseArn");
    var partitions_default = {
      partitions: [{
        id: "aws",
        outputs: {
          dnsSuffix: "amazonaws.com",
          dualStackDnsSuffix: "api.aws",
          implicitGlobalRegion: "us-east-1",
          name: "aws",
          supportsDualStack: true,
          supportsFIPS: true
        },
        regionRegex: "^(us|eu|ap|sa|ca|me|af|il)\\-\\w+\\-\\d+$",
        regions: {
          "af-south-1": {
            description: "Africa (Cape Town)"
          },
          "ap-east-1": {
            description: "Asia Pacific (Hong Kong)"
          },
          "ap-northeast-1": {
            description: "Asia Pacific (Tokyo)"
          },
          "ap-northeast-2": {
            description: "Asia Pacific (Seoul)"
          },
          "ap-northeast-3": {
            description: "Asia Pacific (Osaka)"
          },
          "ap-south-1": {
            description: "Asia Pacific (Mumbai)"
          },
          "ap-south-2": {
            description: "Asia Pacific (Hyderabad)"
          },
          "ap-southeast-1": {
            description: "Asia Pacific (Singapore)"
          },
          "ap-southeast-2": {
            description: "Asia Pacific (Sydney)"
          },
          "ap-southeast-3": {
            description: "Asia Pacific (Jakarta)"
          },
          "ap-southeast-4": {
            description: "Asia Pacific (Melbourne)"
          },
          "aws-global": {
            description: "AWS Standard global region"
          },
          "ca-central-1": {
            description: "Canada (Central)"
          },
          "ca-west-1": {
            description: "Canada West (Calgary)"
          },
          "eu-central-1": {
            description: "Europe (Frankfurt)"
          },
          "eu-central-2": {
            description: "Europe (Zurich)"
          },
          "eu-north-1": {
            description: "Europe (Stockholm)"
          },
          "eu-south-1": {
            description: "Europe (Milan)"
          },
          "eu-south-2": {
            description: "Europe (Spain)"
          },
          "eu-west-1": {
            description: "Europe (Ireland)"
          },
          "eu-west-2": {
            description: "Europe (London)"
          },
          "eu-west-3": {
            description: "Europe (Paris)"
          },
          "il-central-1": {
            description: "Israel (Tel Aviv)"
          },
          "me-central-1": {
            description: "Middle East (UAE)"
          },
          "me-south-1": {
            description: "Middle East (Bahrain)"
          },
          "sa-east-1": {
            description: "South America (Sao Paulo)"
          },
          "us-east-1": {
            description: "US East (N. Virginia)"
          },
          "us-east-2": {
            description: "US East (Ohio)"
          },
          "us-west-1": {
            description: "US West (N. California)"
          },
          "us-west-2": {
            description: "US West (Oregon)"
          }
        }
      }, {
        id: "aws-cn",
        outputs: {
          dnsSuffix: "amazonaws.com.cn",
          dualStackDnsSuffix: "api.amazonwebservices.com.cn",
          implicitGlobalRegion: "cn-northwest-1",
          name: "aws-cn",
          supportsDualStack: true,
          supportsFIPS: true
        },
        regionRegex: "^cn\\-\\w+\\-\\d+$",
        regions: {
          "aws-cn-global": {
            description: "AWS China global region"
          },
          "cn-north-1": {
            description: "China (Beijing)"
          },
          "cn-northwest-1": {
            description: "China (Ningxia)"
          }
        }
      }, {
        id: "aws-us-gov",
        outputs: {
          dnsSuffix: "amazonaws.com",
          dualStackDnsSuffix: "api.aws",
          implicitGlobalRegion: "us-gov-west-1",
          name: "aws-us-gov",
          supportsDualStack: true,
          supportsFIPS: true
        },
        regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
        regions: {
          "aws-us-gov-global": {
            description: "AWS GovCloud (US) global region"
          },
          "us-gov-east-1": {
            description: "AWS GovCloud (US-East)"
          },
          "us-gov-west-1": {
            description: "AWS GovCloud (US-West)"
          }
        }
      }, {
        id: "aws-iso",
        outputs: {
          dnsSuffix: "c2s.ic.gov",
          dualStackDnsSuffix: "c2s.ic.gov",
          implicitGlobalRegion: "us-iso-east-1",
          name: "aws-iso",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-global": {
            description: "AWS ISO (US) global region"
          },
          "us-iso-east-1": {
            description: "US ISO East"
          },
          "us-iso-west-1": {
            description: "US ISO WEST"
          }
        }
      }, {
        id: "aws-iso-b",
        outputs: {
          dnsSuffix: "sc2s.sgov.gov",
          dualStackDnsSuffix: "sc2s.sgov.gov",
          implicitGlobalRegion: "us-isob-east-1",
          name: "aws-iso-b",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-b-global": {
            description: "AWS ISOB (US) global region"
          },
          "us-isob-east-1": {
            description: "US ISOB East (Ohio)"
          }
        }
      }, {
        id: "aws-iso-e",
        outputs: {
          dnsSuffix: "cloud.adc-e.uk",
          dualStackDnsSuffix: "cloud.adc-e.uk",
          implicitGlobalRegion: "eu-isoe-west-1",
          name: "aws-iso-e",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$",
        regions: {}
      }, {
        id: "aws-iso-f",
        outputs: {
          dnsSuffix: "csp.hci.ic.gov",
          dualStackDnsSuffix: "csp.hci.ic.gov",
          implicitGlobalRegion: "us-isof-south-1",
          name: "aws-iso-f",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^us\\-isof\\-\\w+\\-\\d+$",
        regions: {}
      }],
      version: "1.1"
    };
    var selectedPartitionsInfo = partitions_default;
    var selectedUserAgentPrefix = "";
    var partition = /* @__PURE__ */ __name2((value) => {
      const { partitions } = selectedPartitionsInfo;
      for (const partition2 of partitions) {
        const { regions, outputs } = partition2;
        for (const [region, regionData] of Object.entries(regions)) {
          if (region === value) {
            return {
              ...outputs,
              ...regionData
            };
          }
        }
      }
      for (const partition2 of partitions) {
        const { regionRegex, outputs } = partition2;
        if (new RegExp(regionRegex).test(value)) {
          return {
            ...outputs
          };
        }
      }
      const DEFAULT_PARTITION = partitions.find((partition2) => partition2.id === "aws");
      if (!DEFAULT_PARTITION) {
        throw new Error(
          "Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist."
        );
      }
      return {
        ...DEFAULT_PARTITION.outputs
      };
    }, "partition");
    var setPartitionInfo = /* @__PURE__ */ __name2((partitionsInfo, userAgentPrefix = "") => {
      selectedPartitionsInfo = partitionsInfo;
      selectedUserAgentPrefix = userAgentPrefix;
    }, "setPartitionInfo");
    var useDefaultPartitionInfo = /* @__PURE__ */ __name2(() => {
      setPartitionInfo(partitions_default, "");
    }, "useDefaultPartitionInfo");
    var getUserAgentPrefix = /* @__PURE__ */ __name2(() => selectedUserAgentPrefix, "getUserAgentPrefix");
    var awsEndpointFunctions = {
      isVirtualHostableS3Bucket,
      parseArn,
      partition
    };
    import_util_endpoints.customEndpointFunctions.aws = awsEndpointFunctions;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-user-agent/dist-cjs/index.js
var require_dist_cjs20 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/middleware-user-agent/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      getUserAgentMiddlewareOptions: () => getUserAgentMiddlewareOptions,
      getUserAgentPlugin: () => getUserAgentPlugin,
      resolveUserAgentConfig: () => resolveUserAgentConfig,
      userAgentMiddleware: () => userAgentMiddleware
    });
    module2.exports = __toCommonJS2(src_exports);
    function resolveUserAgentConfig(input) {
      return {
        ...input,
        customUserAgent: typeof input.customUserAgent === "string" ? [[input.customUserAgent]] : input.customUserAgent
      };
    }
    __name(resolveUserAgentConfig, "resolveUserAgentConfig");
    __name2(resolveUserAgentConfig, "resolveUserAgentConfig");
    var import_util_endpoints = require_dist_cjs19();
    var import_protocol_http = require_dist_cjs2();
    var USER_AGENT = "user-agent";
    var X_AMZ_USER_AGENT = "x-amz-user-agent";
    var SPACE = " ";
    var UA_NAME_SEPARATOR = "/";
    var UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
    var UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
    var UA_ESCAPE_CHAR = "-";
    var userAgentMiddleware = /* @__PURE__ */ __name2((options) => (next, context) => async (args) => {
      var _a, _b;
      const { request } = args;
      if (!import_protocol_http.HttpRequest.isInstance(request))
        return next(args);
      const { headers } = request;
      const userAgent = ((_a = context == null ? void 0 : context.userAgent) == null ? void 0 : _a.map(escapeUserAgent)) || [];
      const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
      const customUserAgent = ((_b = options == null ? void 0 : options.customUserAgent) == null ? void 0 : _b.map(escapeUserAgent)) || [];
      const prefix = (0, import_util_endpoints.getUserAgentPrefix)();
      const sdkUserAgentValue = (prefix ? [prefix] : []).concat([...defaultUserAgent, ...userAgent, ...customUserAgent]).join(SPACE);
      const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent
      ].join(SPACE);
      if (options.runtime !== "browser") {
        if (normalUAValue) {
          headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
        }
        headers[USER_AGENT] = sdkUserAgentValue;
      } else {
        headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
      }
      return next({
        ...args,
        request
      });
    }, "userAgentMiddleware");
    var escapeUserAgent = /* @__PURE__ */ __name2((userAgentPair) => {
      var _a;
      const name = userAgentPair[0].split(UA_NAME_SEPARATOR).map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR)).join(UA_NAME_SEPARATOR);
      const version2 = (_a = userAgentPair[1]) == null ? void 0 : _a.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
      const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
      const prefix = name.substring(0, prefixSeparatorIndex);
      let uaName = name.substring(prefixSeparatorIndex + 1);
      if (prefix === "api") {
        uaName = uaName.toLowerCase();
      }
      return [prefix, uaName, version2].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
        switch (index) {
          case 0:
            return item;
          case 1:
            return `${acc}/${item}`;
          default:
            return `${acc}#${item}`;
        }
      }, "");
    }, "escapeUserAgent");
    var getUserAgentMiddlewareOptions = {
      name: "getUserAgentMiddleware",
      step: "build",
      priority: "low",
      tags: ["SET_USER_AGENT", "USER_AGENT"],
      override: true
    };
    var getUserAgentPlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: (clientStack) => {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
      }
    }), "getUserAgentPlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-config-provider/dist-cjs/index.js
var require_dist_cjs21 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-config-provider/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      SelectorType: () => SelectorType,
      booleanSelector: () => booleanSelector,
      numberSelector: () => numberSelector
    });
    module2.exports = __toCommonJS2(src_exports);
    var booleanSelector = /* @__PURE__ */ __name2((obj, key, type) => {
      if (!(key in obj))
        return void 0;
      if (obj[key] === "true")
        return true;
      if (obj[key] === "false")
        return false;
      throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
    }, "booleanSelector");
    var numberSelector = /* @__PURE__ */ __name2((obj, key, type) => {
      if (!(key in obj))
        return void 0;
      const numberValue = parseInt(obj[key], 10);
      if (Number.isNaN(numberValue)) {
        throw new TypeError(`Cannot load ${type} '${key}'. Expected number, got '${obj[key]}'.`);
      }
      return numberValue;
    }, "numberSelector");
    var SelectorType = /* @__PURE__ */ ((SelectorType2) => {
      SelectorType2["ENV"] = "env";
      SelectorType2["CONFIG"] = "shared config entry";
      return SelectorType2;
    })(SelectorType || {});
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-middleware/dist-cjs/index.js
var require_dist_cjs22 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-middleware/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      getSmithyContext: () => getSmithyContext2,
      normalizeProvider: () => normalizeProvider
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_types = require_dist_cjs();
    var getSmithyContext2 = /* @__PURE__ */ __name2((context) => context[import_types.SMITHY_CONTEXT_KEY] || (context[import_types.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
    var normalizeProvider = /* @__PURE__ */ __name2((input) => {
      if (typeof input === "function")
        return input;
      const promisified = Promise.resolve(input);
      return () => promisified;
    }, "normalizeProvider");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/config-resolver/dist-cjs/index.js
var require_dist_cjs23 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/config-resolver/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      CONFIG_USE_DUALSTACK_ENDPOINT: () => CONFIG_USE_DUALSTACK_ENDPOINT,
      CONFIG_USE_FIPS_ENDPOINT: () => CONFIG_USE_FIPS_ENDPOINT,
      DEFAULT_USE_DUALSTACK_ENDPOINT: () => DEFAULT_USE_DUALSTACK_ENDPOINT,
      DEFAULT_USE_FIPS_ENDPOINT: () => DEFAULT_USE_FIPS_ENDPOINT,
      ENV_USE_DUALSTACK_ENDPOINT: () => ENV_USE_DUALSTACK_ENDPOINT,
      ENV_USE_FIPS_ENDPOINT: () => ENV_USE_FIPS_ENDPOINT,
      NODE_REGION_CONFIG_FILE_OPTIONS: () => NODE_REGION_CONFIG_FILE_OPTIONS,
      NODE_REGION_CONFIG_OPTIONS: () => NODE_REGION_CONFIG_OPTIONS,
      NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS: () => NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS,
      NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS: () => NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS,
      REGION_ENV_NAME: () => REGION_ENV_NAME,
      REGION_INI_NAME: () => REGION_INI_NAME,
      getRegionInfo: () => getRegionInfo,
      resolveCustomEndpointsConfig: () => resolveCustomEndpointsConfig,
      resolveEndpointsConfig: () => resolveEndpointsConfig,
      resolveRegionConfig: () => resolveRegionConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_util_config_provider = require_dist_cjs21();
    var ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
    var CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
    var DEFAULT_USE_DUALSTACK_ENDPOINT = false;
    var NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => (0, import_util_config_provider.booleanSelector)(env, ENV_USE_DUALSTACK_ENDPOINT, import_util_config_provider.SelectorType.ENV),
      configFileSelector: (profile) => (0, import_util_config_provider.booleanSelector)(profile, CONFIG_USE_DUALSTACK_ENDPOINT, import_util_config_provider.SelectorType.CONFIG),
      default: false
    };
    var ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
    var CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
    var DEFAULT_USE_FIPS_ENDPOINT = false;
    var NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => (0, import_util_config_provider.booleanSelector)(env, ENV_USE_FIPS_ENDPOINT, import_util_config_provider.SelectorType.ENV),
      configFileSelector: (profile) => (0, import_util_config_provider.booleanSelector)(profile, CONFIG_USE_FIPS_ENDPOINT, import_util_config_provider.SelectorType.CONFIG),
      default: false
    };
    var import_util_middleware = require_dist_cjs22();
    var resolveCustomEndpointsConfig = /* @__PURE__ */ __name2((input) => {
      const { endpoint, urlParser } = input;
      return {
        ...input,
        tls: input.tls ?? true,
        endpoint: (0, import_util_middleware.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint),
        isCustomEndpoint: true,
        useDualstackEndpoint: (0, import_util_middleware.normalizeProvider)(input.useDualstackEndpoint ?? false)
      };
    }, "resolveCustomEndpointsConfig");
    var getEndpointFromRegion = /* @__PURE__ */ __name2(async (input) => {
      const { tls = true } = input;
      const region = await input.region();
      const dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
      if (!dnsHostRegex.test(region)) {
        throw new Error("Invalid region in client config");
      }
      const useDualstackEndpoint = await input.useDualstackEndpoint();
      const useFipsEndpoint = await input.useFipsEndpoint();
      const { hostname } = await input.regionInfoProvider(region, { useDualstackEndpoint, useFipsEndpoint }) ?? {};
      if (!hostname) {
        throw new Error("Cannot resolve hostname from client config");
      }
      return input.urlParser(`${tls ? "https:" : "http:"}//${hostname}`);
    }, "getEndpointFromRegion");
    var resolveEndpointsConfig = /* @__PURE__ */ __name2((input) => {
      const useDualstackEndpoint = (0, import_util_middleware.normalizeProvider)(input.useDualstackEndpoint ?? false);
      const { endpoint, useFipsEndpoint, urlParser } = input;
      return {
        ...input,
        tls: input.tls ?? true,
        endpoint: endpoint ? (0, import_util_middleware.normalizeProvider)(typeof endpoint === "string" ? urlParser(endpoint) : endpoint) : () => getEndpointFromRegion({ ...input, useDualstackEndpoint, useFipsEndpoint }),
        isCustomEndpoint: !!endpoint,
        useDualstackEndpoint
      };
    }, "resolveEndpointsConfig");
    var REGION_ENV_NAME = "AWS_REGION";
    var REGION_INI_NAME = "region";
    var NODE_REGION_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => env[REGION_ENV_NAME],
      configFileSelector: (profile) => profile[REGION_INI_NAME],
      default: () => {
        throw new Error("Region is missing");
      }
    };
    var NODE_REGION_CONFIG_FILE_OPTIONS = {
      preferredFile: "credentials"
    };
    var isFipsRegion = /* @__PURE__ */ __name2((region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips")), "isFipsRegion");
    var getRealRegion = /* @__PURE__ */ __name2((region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region, "getRealRegion");
    var resolveRegionConfig = /* @__PURE__ */ __name2((input) => {
      const { region, useFipsEndpoint } = input;
      if (!region) {
        throw new Error("Region is missing");
      }
      return {
        ...input,
        region: async () => {
          if (typeof region === "string") {
            return getRealRegion(region);
          }
          const providedRegion = await region();
          return getRealRegion(providedRegion);
        },
        useFipsEndpoint: async () => {
          const providedRegion = typeof region === "string" ? region : await region();
          if (isFipsRegion(providedRegion)) {
            return true;
          }
          return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        }
      };
    }, "resolveRegionConfig");
    var getHostnameFromVariants = /* @__PURE__ */ __name2((variants = [], { useFipsEndpoint, useDualstackEndpoint }) => {
      var _a;
      return (_a = variants.find(
        ({ tags }) => useFipsEndpoint === tags.includes("fips") && useDualstackEndpoint === tags.includes("dualstack")
      )) == null ? void 0 : _a.hostname;
    }, "getHostnameFromVariants");
    var getResolvedHostname = /* @__PURE__ */ __name2((resolvedRegion, { regionHostname, partitionHostname }) => regionHostname ? regionHostname : partitionHostname ? partitionHostname.replace("{region}", resolvedRegion) : void 0, "getResolvedHostname");
    var getResolvedPartition = /* @__PURE__ */ __name2((region, { partitionHash }) => Object.keys(partitionHash || {}).find((key) => partitionHash[key].regions.includes(region)) ?? "aws", "getResolvedPartition");
    var getResolvedSigningRegion = /* @__PURE__ */ __name2((hostname, { signingRegion, regionRegex, useFipsEndpoint }) => {
      if (signingRegion) {
        return signingRegion;
      } else if (useFipsEndpoint) {
        const regionRegexJs = regionRegex.replace("\\\\", "\\").replace(/^\^/g, "\\.").replace(/\$$/g, "\\.");
        const regionRegexmatchArray = hostname.match(regionRegexJs);
        if (regionRegexmatchArray) {
          return regionRegexmatchArray[0].slice(1, -1);
        }
      }
    }, "getResolvedSigningRegion");
    var getRegionInfo = /* @__PURE__ */ __name2((region, {
      useFipsEndpoint = false,
      useDualstackEndpoint = false,
      signingService,
      regionHash,
      partitionHash
    }) => {
      var _a, _b, _c, _d, _e;
      const partition = getResolvedPartition(region, { partitionHash });
      const resolvedRegion = region in regionHash ? region : ((_a = partitionHash[partition]) == null ? void 0 : _a.endpoint) ?? region;
      const hostnameOptions = { useFipsEndpoint, useDualstackEndpoint };
      const regionHostname = getHostnameFromVariants((_b = regionHash[resolvedRegion]) == null ? void 0 : _b.variants, hostnameOptions);
      const partitionHostname = getHostnameFromVariants((_c = partitionHash[partition]) == null ? void 0 : _c.variants, hostnameOptions);
      const hostname = getResolvedHostname(resolvedRegion, { regionHostname, partitionHostname });
      if (hostname === void 0) {
        throw new Error(`Endpoint resolution failed for: ${{ resolvedRegion, useFipsEndpoint, useDualstackEndpoint }}`);
      }
      const signingRegion = getResolvedSigningRegion(hostname, {
        signingRegion: (_d = regionHash[resolvedRegion]) == null ? void 0 : _d.signingRegion,
        regionRegex: partitionHash[partition].regionRegex,
        useFipsEndpoint
      });
      return {
        partition,
        signingService,
        hostname,
        ...signingRegion && { signingRegion },
        ...((_e = regionHash[resolvedRegion]) == null ? void 0 : _e.signingService) && {
          signingService: regionHash[resolvedRegion].signingService
        }
      };
    }, "getRegionInfo");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/property-provider/dist-cjs/index.js
var require_dist_cjs24 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/property-provider/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      CredentialsProviderError: () => CredentialsProviderError,
      ProviderError: () => ProviderError,
      TokenProviderError: () => TokenProviderError,
      chain: () => chain,
      fromStatic: () => fromStatic,
      memoize: () => memoize
    });
    module2.exports = __toCommonJS2(src_exports);
    var _ProviderError = class _ProviderError2 extends Error {
      static {
        __name(this, "_ProviderError");
      }
      constructor(message, tryNextLink = true) {
        super(message);
        this.tryNextLink = tryNextLink;
        this.name = "ProviderError";
        Object.setPrototypeOf(this, _ProviderError2.prototype);
      }
      static from(error, tryNextLink = true) {
        return Object.assign(new this(error.message, tryNextLink), error);
      }
    };
    __name2(_ProviderError, "ProviderError");
    var ProviderError = _ProviderError;
    var _CredentialsProviderError = class _CredentialsProviderError2 extends ProviderError {
      static {
        __name(this, "_CredentialsProviderError");
      }
      constructor(message, tryNextLink = true) {
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "CredentialsProviderError";
        Object.setPrototypeOf(this, _CredentialsProviderError2.prototype);
      }
    };
    __name2(_CredentialsProviderError, "CredentialsProviderError");
    var CredentialsProviderError = _CredentialsProviderError;
    var _TokenProviderError = class _TokenProviderError2 extends ProviderError {
      static {
        __name(this, "_TokenProviderError");
      }
      constructor(message, tryNextLink = true) {
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "TokenProviderError";
        Object.setPrototypeOf(this, _TokenProviderError2.prototype);
      }
    };
    __name2(_TokenProviderError, "TokenProviderError");
    var TokenProviderError = _TokenProviderError;
    var chain = /* @__PURE__ */ __name2((...providers) => async () => {
      if (providers.length === 0) {
        throw new ProviderError("No providers in chain");
      }
      let lastProviderError;
      for (const provider of providers) {
        try {
          const credentials = await provider();
          return credentials;
        } catch (err) {
          lastProviderError = err;
          if (err == null ? void 0 : err.tryNextLink) {
            continue;
          }
          throw err;
        }
      }
      throw lastProviderError;
    }, "chain");
    var fromStatic = /* @__PURE__ */ __name2((staticValue) => () => Promise.resolve(staticValue), "fromStatic");
    var memoize = /* @__PURE__ */ __name2((provider, isExpired, requiresRefresh) => {
      let resolved;
      let pending;
      let hasResult;
      let isConstant = false;
      const coalesceProvider = /* @__PURE__ */ __name2(async () => {
        if (!pending) {
          pending = provider();
        }
        try {
          resolved = await pending;
          hasResult = true;
          isConstant = false;
        } finally {
          pending = void 0;
        }
        return resolved;
      }, "coalesceProvider");
      if (isExpired === void 0) {
        return async (options) => {
          if (!hasResult || (options == null ? void 0 : options.forceRefresh)) {
            resolved = await coalesceProvider();
          }
          return resolved;
        };
      }
      return async (options) => {
        if (!hasResult || (options == null ? void 0 : options.forceRefresh)) {
          resolved = await coalesceProvider();
        }
        if (isConstant) {
          return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
          isConstant = true;
          return resolved;
        }
        if (isExpired(resolved)) {
          await coalesceProvider();
          return resolved;
        }
        return resolved;
      };
    }, "memoize");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/getHomeDir.js
var require_getHomeDir = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/getHomeDir.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getHomeDir = void 0;
    var os_1 = require("os");
    var path_1 = require("path");
    var homeDirCache = {};
    var getHomeDirCacheKey = /* @__PURE__ */ __name(() => {
      if (process && process.geteuid) {
        return `${process.geteuid()}`;
      }
      return "DEFAULT";
    }, "getHomeDirCacheKey");
    var getHomeDir2 = /* @__PURE__ */ __name(() => {
      const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${path_1.sep}` } = process.env;
      if (HOME)
        return HOME;
      if (USERPROFILE)
        return USERPROFILE;
      if (HOMEPATH)
        return `${HOMEDRIVE}${HOMEPATH}`;
      const homeDirCacheKey = getHomeDirCacheKey();
      if (!homeDirCache[homeDirCacheKey])
        homeDirCache[homeDirCacheKey] = (0, os_1.homedir)();
      return homeDirCache[homeDirCacheKey];
    }, "getHomeDir");
    exports2.getHomeDir = getHomeDir2;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/getSSOTokenFilepath.js
var require_getSSOTokenFilepath = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/getSSOTokenFilepath.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSSOTokenFilepath = void 0;
    var crypto_1 = require("crypto");
    var path_1 = require("path");
    var getHomeDir_1 = require_getHomeDir();
    var getSSOTokenFilepath2 = /* @__PURE__ */ __name((id) => {
      const hasher = (0, crypto_1.createHash)("sha1");
      const cacheName = hasher.update(id).digest("hex");
      return (0, path_1.join)((0, getHomeDir_1.getHomeDir)(), ".aws", "sso", "cache", `${cacheName}.json`);
    }, "getSSOTokenFilepath");
    exports2.getSSOTokenFilepath = getSSOTokenFilepath2;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/getSSOTokenFromFile.js
var require_getSSOTokenFromFile = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/getSSOTokenFromFile.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSSOTokenFromFile = void 0;
    var fs_1 = require("fs");
    var getSSOTokenFilepath_1 = require_getSSOTokenFilepath();
    var { readFile } = fs_1.promises;
    var getSSOTokenFromFile2 = /* @__PURE__ */ __name(async (id) => {
      const ssoTokenFilepath = (0, getSSOTokenFilepath_1.getSSOTokenFilepath)(id);
      const ssoTokenText = await readFile(ssoTokenFilepath, "utf8");
      return JSON.parse(ssoTokenText);
    }, "getSSOTokenFromFile");
    exports2.getSSOTokenFromFile = getSSOTokenFromFile2;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/slurpFile.js
var require_slurpFile = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/slurpFile.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.slurpFile = void 0;
    var fs_1 = require("fs");
    var { readFile } = fs_1.promises;
    var filePromisesHash = {};
    var slurpFile = /* @__PURE__ */ __name((path2, options) => {
      if (!filePromisesHash[path2] || (options === null || options === void 0 ? void 0 : options.ignoreCache)) {
        filePromisesHash[path2] = readFile(path2, "utf8");
      }
      return filePromisesHash[path2];
    }, "slurpFile");
    exports2.slurpFile = slurpFile;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/index.js
var require_dist_cjs25 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/shared-ini-file-loader/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __reExport = /* @__PURE__ */ __name((target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default")), "__reExport");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      CONFIG_PREFIX_SEPARATOR: () => CONFIG_PREFIX_SEPARATOR,
      DEFAULT_PROFILE: () => DEFAULT_PROFILE,
      ENV_PROFILE: () => ENV_PROFILE,
      getProfileName: () => getProfileName,
      loadSharedConfigFiles: () => loadSharedConfigFiles,
      loadSsoSessionData: () => loadSsoSessionData,
      parseKnownFiles: () => parseKnownFiles
    });
    module2.exports = __toCommonJS2(src_exports);
    __reExport(src_exports, require_getHomeDir(), module2.exports);
    var ENV_PROFILE = "AWS_PROFILE";
    var DEFAULT_PROFILE = "default";
    var getProfileName = /* @__PURE__ */ __name2((init) => init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE, "getProfileName");
    __reExport(src_exports, require_getSSOTokenFilepath(), module2.exports);
    __reExport(src_exports, require_getSSOTokenFromFile(), module2.exports);
    var import_types = require_dist_cjs();
    var getConfigData = /* @__PURE__ */ __name2((data) => Object.entries(data).filter(([key]) => {
      const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
      if (indexOfSeparator === -1) {
        return false;
      }
      return Object.values(import_types.IniSectionType).includes(key.substring(0, indexOfSeparator));
    }).reduce(
      (acc, [key, value]) => {
        const indexOfSeparator = key.indexOf(CONFIG_PREFIX_SEPARATOR);
        const updatedKey = key.substring(0, indexOfSeparator) === import_types.IniSectionType.PROFILE ? key.substring(indexOfSeparator + 1) : key;
        acc[updatedKey] = value;
        return acc;
      },
      {
        // Populate default profile, if present.
        ...data.default && { default: data.default }
      }
    ), "getConfigData");
    var import_path = require("path");
    var import_getHomeDir = require_getHomeDir();
    var ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
    var getConfigFilepath = /* @__PURE__ */ __name2(() => process.env[ENV_CONFIG_PATH] || (0, import_path.join)((0, import_getHomeDir.getHomeDir)(), ".aws", "config"), "getConfigFilepath");
    var import_getHomeDir2 = require_getHomeDir();
    var ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
    var getCredentialsFilepath = /* @__PURE__ */ __name2(() => process.env[ENV_CREDENTIALS_PATH] || (0, import_path.join)((0, import_getHomeDir2.getHomeDir)(), ".aws", "credentials"), "getCredentialsFilepath");
    var prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
    var profileNameBlockList = ["__proto__", "profile __proto__"];
    var parseIni = /* @__PURE__ */ __name2((iniData) => {
      const map = {};
      let currentSection;
      let currentSubSection;
      for (const iniLine of iniData.split(/\r?\n/)) {
        const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
        const isSection = trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]";
        if (isSection) {
          currentSection = void 0;
          currentSubSection = void 0;
          const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
          const matches = prefixKeyRegex.exec(sectionName);
          if (matches) {
            const [, prefix, , name] = matches;
            if (Object.values(import_types.IniSectionType).includes(prefix)) {
              currentSection = [prefix, name].join(CONFIG_PREFIX_SEPARATOR);
            }
          } else {
            currentSection = sectionName;
          }
          if (profileNameBlockList.includes(sectionName)) {
            throw new Error(`Found invalid profile name "${sectionName}"`);
          }
        } else if (currentSection) {
          const indexOfEqualsSign = trimmedLine.indexOf("=");
          if (![0, -1].includes(indexOfEqualsSign)) {
            const [name, value] = [
              trimmedLine.substring(0, indexOfEqualsSign).trim(),
              trimmedLine.substring(indexOfEqualsSign + 1).trim()
            ];
            if (value === "") {
              currentSubSection = name;
            } else {
              if (currentSubSection && iniLine.trimStart() === iniLine) {
                currentSubSection = void 0;
              }
              map[currentSection] = map[currentSection] || {};
              const key = currentSubSection ? [currentSubSection, name].join(CONFIG_PREFIX_SEPARATOR) : name;
              map[currentSection][key] = value;
            }
          }
        }
      }
      return map;
    }, "parseIni");
    var import_slurpFile = require_slurpFile();
    var swallowError = /* @__PURE__ */ __name2(() => ({}), "swallowError");
    var CONFIG_PREFIX_SEPARATOR = ".";
    var loadSharedConfigFiles = /* @__PURE__ */ __name2(async (init = {}) => {
      const { filepath = getCredentialsFilepath(), configFilepath = getConfigFilepath() } = init;
      const parsedFiles = await Promise.all([
        (0, import_slurpFile.slurpFile)(configFilepath, {
          ignoreCache: init.ignoreCache
        }).then(parseIni).then(getConfigData).catch(swallowError),
        (0, import_slurpFile.slurpFile)(filepath, {
          ignoreCache: init.ignoreCache
        }).then(parseIni).catch(swallowError)
      ]);
      return {
        configFile: parsedFiles[0],
        credentialsFile: parsedFiles[1]
      };
    }, "loadSharedConfigFiles");
    var getSsoSessionData = /* @__PURE__ */ __name2((data) => Object.entries(data).filter(([key]) => key.startsWith(import_types.IniSectionType.SSO_SESSION + CONFIG_PREFIX_SEPARATOR)).reduce((acc, [key, value]) => ({ ...acc, [key.substring(key.indexOf(CONFIG_PREFIX_SEPARATOR) + 1)]: value }), {}), "getSsoSessionData");
    var import_slurpFile2 = require_slurpFile();
    var swallowError2 = /* @__PURE__ */ __name2(() => ({}), "swallowError");
    var loadSsoSessionData = /* @__PURE__ */ __name2(async (init = {}) => (0, import_slurpFile2.slurpFile)(init.configFilepath ?? getConfigFilepath()).then(parseIni).then(getSsoSessionData).catch(swallowError2), "loadSsoSessionData");
    var mergeConfigFiles = /* @__PURE__ */ __name2((...files) => {
      const merged = {};
      for (const file of files) {
        for (const [key, values] of Object.entries(file)) {
          if (merged[key] !== void 0) {
            Object.assign(merged[key], values);
          } else {
            merged[key] = values;
          }
        }
      }
      return merged;
    }, "mergeConfigFiles");
    var parseKnownFiles = /* @__PURE__ */ __name2(async (init) => {
      const parsedFiles = await loadSharedConfigFiles(init);
      return mergeConfigFiles(parsedFiles.configFile, parsedFiles.credentialsFile);
    }, "parseKnownFiles");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/node-config-provider/dist-cjs/index.js
var require_dist_cjs26 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/node-config-provider/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      loadConfig: () => loadConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_property_provider = require_dist_cjs24();
    var fromEnv = /* @__PURE__ */ __name2((envVarSelector) => async () => {
      try {
        const config = envVarSelector(process.env);
        if (config === void 0) {
          throw new Error();
        }
        return config;
      } catch (e) {
        throw new import_property_provider.CredentialsProviderError(
          e.message || `Cannot load config from environment variables with getter: ${envVarSelector}`
        );
      }
    }, "fromEnv");
    var import_shared_ini_file_loader = require_dist_cjs25();
    var fromSharedConfigFiles = /* @__PURE__ */ __name2((configSelector, { preferredFile = "config", ...init } = {}) => async () => {
      const profile = (0, import_shared_ini_file_loader.getProfileName)(init);
      const { configFile, credentialsFile } = await (0, import_shared_ini_file_loader.loadSharedConfigFiles)(init);
      const profileFromCredentials = credentialsFile[profile] || {};
      const profileFromConfig = configFile[profile] || {};
      const mergedProfile = preferredFile === "config" ? { ...profileFromCredentials, ...profileFromConfig } : { ...profileFromConfig, ...profileFromCredentials };
      try {
        const cfgFile = preferredFile === "config" ? configFile : credentialsFile;
        const configValue = configSelector(mergedProfile, cfgFile);
        if (configValue === void 0) {
          throw new Error();
        }
        return configValue;
      } catch (e) {
        throw new import_property_provider.CredentialsProviderError(
          e.message || `Cannot load config for profile ${profile} in SDK configuration files with getter: ${configSelector}`
        );
      }
    }, "fromSharedConfigFiles");
    var isFunction = /* @__PURE__ */ __name2((func) => typeof func === "function", "isFunction");
    var fromStatic = /* @__PURE__ */ __name2((defaultValue) => isFunction(defaultValue) ? async () => await defaultValue() : (0, import_property_provider.fromStatic)(defaultValue), "fromStatic");
    var loadConfig = /* @__PURE__ */ __name2(({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {}) => (0, import_property_provider.memoize)(
      (0, import_property_provider.chain)(
        fromEnv(environmentVariableSelector),
        fromSharedConfigFiles(configFileSelector, configuration),
        fromStatic(defaultValue)
      )
    ), "loadConfig");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-endpoint/dist-cjs/adaptors/getEndpointUrlConfig.js
var require_getEndpointUrlConfig = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-endpoint/dist-cjs/adaptors/getEndpointUrlConfig.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getEndpointUrlConfig = void 0;
    var shared_ini_file_loader_1 = require_dist_cjs25();
    var ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
    var CONFIG_ENDPOINT_URL = "endpoint_url";
    var getEndpointUrlConfig = /* @__PURE__ */ __name((serviceId) => ({
      environmentVariableSelector: (env) => {
        const serviceSuffixParts = serviceId.split(" ").map((w) => w.toUpperCase());
        const serviceEndpointUrl = env[[ENV_ENDPOINT_URL, ...serviceSuffixParts].join("_")];
        if (serviceEndpointUrl)
          return serviceEndpointUrl;
        const endpointUrl = env[ENV_ENDPOINT_URL];
        if (endpointUrl)
          return endpointUrl;
        return void 0;
      },
      configFileSelector: (profile, config) => {
        if (config && profile.services) {
          const servicesSection = config[["services", profile.services].join(shared_ini_file_loader_1.CONFIG_PREFIX_SEPARATOR)];
          if (servicesSection) {
            const servicePrefixParts = serviceId.split(" ").map((w) => w.toLowerCase());
            const endpointUrl2 = servicesSection[[servicePrefixParts.join("_"), CONFIG_ENDPOINT_URL].join(shared_ini_file_loader_1.CONFIG_PREFIX_SEPARATOR)];
            if (endpointUrl2)
              return endpointUrl2;
          }
        }
        const endpointUrl = profile[CONFIG_ENDPOINT_URL];
        if (endpointUrl)
          return endpointUrl;
        return void 0;
      },
      default: void 0
    }), "getEndpointUrlConfig");
    exports2.getEndpointUrlConfig = getEndpointUrlConfig;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-endpoint/dist-cjs/adaptors/getEndpointFromConfig.js
var require_getEndpointFromConfig = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-endpoint/dist-cjs/adaptors/getEndpointFromConfig.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getEndpointFromConfig = void 0;
    var node_config_provider_1 = require_dist_cjs26();
    var getEndpointUrlConfig_1 = require_getEndpointUrlConfig();
    var getEndpointFromConfig = /* @__PURE__ */ __name(async (serviceId) => (0, node_config_provider_1.loadConfig)((0, getEndpointUrlConfig_1.getEndpointUrlConfig)(serviceId))(), "getEndpointFromConfig");
    exports2.getEndpointFromConfig = getEndpointFromConfig;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/querystring-parser/dist-cjs/index.js
var require_dist_cjs27 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/querystring-parser/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      parseQueryString: () => parseQueryString
    });
    module2.exports = __toCommonJS2(src_exports);
    function parseQueryString(querystring) {
      const query = {};
      querystring = querystring.replace(/^\?/, "");
      if (querystring) {
        for (const pair of querystring.split("&")) {
          let [key, value = null] = pair.split("=");
          key = decodeURIComponent(key);
          if (value) {
            value = decodeURIComponent(value);
          }
          if (!(key in query)) {
            query[key] = value;
          } else if (Array.isArray(query[key])) {
            query[key].push(value);
          } else {
            query[key] = [query[key], value];
          }
        }
      }
      return query;
    }
    __name(parseQueryString, "parseQueryString");
    __name2(parseQueryString, "parseQueryString");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/url-parser/dist-cjs/index.js
var require_dist_cjs28 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/url-parser/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      parseUrl: () => parseUrl
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_querystring_parser = require_dist_cjs27();
    var parseUrl = /* @__PURE__ */ __name2((url) => {
      if (typeof url === "string") {
        return parseUrl(new URL(url));
      }
      const { hostname, pathname, port, protocol, search } = url;
      let query;
      if (search) {
        query = (0, import_querystring_parser.parseQueryString)(search);
      }
      return {
        hostname,
        port: port ? parseInt(port) : void 0,
        protocol,
        path: pathname,
        query
      };
    }, "parseUrl");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-serde/dist-cjs/index.js
var require_dist_cjs29 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-serde/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      deserializerMiddleware: () => deserializerMiddleware,
      deserializerMiddlewareOption: () => deserializerMiddlewareOption,
      getSerdePlugin: () => getSerdePlugin,
      serializerMiddleware: () => serializerMiddleware,
      serializerMiddlewareOption: () => serializerMiddlewareOption
    });
    module2.exports = __toCommonJS2(src_exports);
    var deserializerMiddleware = /* @__PURE__ */ __name2((options, deserializer) => (next) => async (args) => {
      const { response } = await next(args);
      try {
        const parsed = await deserializer(response, options);
        return {
          response,
          output: parsed
        };
      } catch (error) {
        Object.defineProperty(error, "$response", {
          value: response
        });
        if (!("$metadata" in error)) {
          const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
          error.message += "\n  " + hint;
          if (typeof error.$responseBodyText !== "undefined") {
            if (error.$response) {
              error.$response.body = error.$responseBodyText;
            }
          }
        }
        throw error;
      }
    }, "deserializerMiddleware");
    var serializerMiddleware = /* @__PURE__ */ __name2((options, serializer) => (next, context) => async (args) => {
      var _a;
      const endpoint = ((_a = context.endpointV2) == null ? void 0 : _a.url) && options.urlParser ? async () => options.urlParser(context.endpointV2.url) : options.endpoint;
      if (!endpoint) {
        throw new Error("No valid endpoint provider available.");
      }
      const request = await serializer(args.input, { ...options, endpoint });
      return next({
        ...args,
        request
      });
    }, "serializerMiddleware");
    var deserializerMiddlewareOption = {
      name: "deserializerMiddleware",
      step: "deserialize",
      tags: ["DESERIALIZER"],
      override: true
    };
    var serializerMiddlewareOption = {
      name: "serializerMiddleware",
      step: "serialize",
      tags: ["SERIALIZER"],
      override: true
    };
    function getSerdePlugin(config, serializer, deserializer) {
      return {
        applyToStack: (commandStack) => {
          commandStack.add(deserializerMiddleware(config, deserializer), deserializerMiddlewareOption);
          commandStack.add(serializerMiddleware(config, serializer), serializerMiddlewareOption);
        }
      };
    }
    __name(getSerdePlugin, "getSerdePlugin");
    __name2(getSerdePlugin, "getSerdePlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-endpoint/dist-cjs/index.js
var require_dist_cjs30 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-endpoint/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      endpointMiddleware: () => endpointMiddleware,
      endpointMiddlewareOptions: () => endpointMiddlewareOptions,
      getEndpointFromInstructions: () => getEndpointFromInstructions,
      getEndpointPlugin: () => getEndpointPlugin,
      resolveEndpointConfig: () => resolveEndpointConfig,
      resolveParams: () => resolveParams,
      toEndpointV1: () => toEndpointV1
    });
    module2.exports = __toCommonJS2(src_exports);
    var resolveParamsForS3 = /* @__PURE__ */ __name2(async (endpointParams) => {
      const bucket = (endpointParams == null ? void 0 : endpointParams.Bucket) || "";
      if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
      }
      if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
          throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
      } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
      }
      if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
      }
      return endpointParams;
    }, "resolveParamsForS3");
    var DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
    var IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
    var DOTS_PATTERN = /\.\./;
    var isDnsCompatibleBucketName = /* @__PURE__ */ __name2((bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName), "isDnsCompatibleBucketName");
    var isArnBucketName = /* @__PURE__ */ __name2((bucketName) => {
      const [arn, partition, service, , , bucket] = bucketName.split(":");
      const isArn = arn === "arn" && bucketName.split(":").length >= 6;
      const isValidArn = Boolean(isArn && partition && service && bucket);
      if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
      }
      return isValidArn;
    }, "isArnBucketName");
    var createConfigValueProvider = /* @__PURE__ */ __name2((configKey, canonicalEndpointParamKey, config) => {
      const configProvider = /* @__PURE__ */ __name2(async () => {
        const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        if (typeof configValue === "function") {
          return configValue();
        }
        return configValue;
      }, "configProvider");
      if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = (credentials == null ? void 0 : credentials.credentialScope) ?? (credentials == null ? void 0 : credentials.CredentialScope);
          return configValue;
        };
      }
      if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async () => {
          const endpoint = await configProvider();
          if (endpoint && typeof endpoint === "object") {
            if ("url" in endpoint) {
              return endpoint.url.href;
            }
            if ("hostname" in endpoint) {
              const { protocol, hostname, port, path: path2 } = endpoint;
              return `${protocol}//${hostname}${port ? ":" + port : ""}${path2}`;
            }
          }
          return endpoint;
        };
      }
      return configProvider;
    }, "createConfigValueProvider");
    var import_getEndpointFromConfig = require_getEndpointFromConfig();
    var import_url_parser = require_dist_cjs28();
    var toEndpointV1 = /* @__PURE__ */ __name2((endpoint) => {
      if (typeof endpoint === "object") {
        if ("url" in endpoint) {
          return (0, import_url_parser.parseUrl)(endpoint.url);
        }
        return endpoint;
      }
      return (0, import_url_parser.parseUrl)(endpoint);
    }, "toEndpointV1");
    var getEndpointFromInstructions = /* @__PURE__ */ __name2(async (commandInput, instructionsSupplier, clientConfig, context) => {
      if (!clientConfig.endpoint) {
        const endpointFromConfig = await (0, import_getEndpointFromConfig.getEndpointFromConfig)(clientConfig.serviceId || "");
        if (endpointFromConfig) {
          clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
        }
      }
      const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
      if (typeof clientConfig.endpointProvider !== "function") {
        throw new Error("config.endpointProvider is not set.");
      }
      const endpoint = clientConfig.endpointProvider(endpointParams, context);
      return endpoint;
    }, "getEndpointFromInstructions");
    var resolveParams = /* @__PURE__ */ __name2(async (commandInput, instructionsSupplier, clientConfig) => {
      var _a;
      const endpointParams = {};
      const instructions = ((_a = instructionsSupplier == null ? void 0 : instructionsSupplier.getEndpointParameterInstructions) == null ? void 0 : _a.call(instructionsSupplier)) || {};
      for (const [name, instruction] of Object.entries(instructions)) {
        switch (instruction.type) {
          case "staticContextParams":
            endpointParams[name] = instruction.value;
            break;
          case "contextParams":
            endpointParams[name] = commandInput[instruction.name];
            break;
          case "clientContextParams":
          case "builtInParams":
            endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig)();
            break;
          default:
            throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
      }
      if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
      }
      if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await resolveParamsForS3(endpointParams);
      }
      return endpointParams;
    }, "resolveParams");
    var import_util_middleware = require_dist_cjs22();
    var endpointMiddleware = /* @__PURE__ */ __name2(({
      config,
      instructions
    }) => {
      return (next, context) => async (args) => {
        var _a, _b, _c;
        const endpoint = await getEndpointFromInstructions(
          args.input,
          {
            getEndpointParameterInstructions() {
              return instructions;
            }
          },
          { ...config },
          context
        );
        context.endpointV2 = endpoint;
        context.authSchemes = (_a = endpoint.properties) == null ? void 0 : _a.authSchemes;
        const authScheme = (_b = context.authSchemes) == null ? void 0 : _b[0];
        if (authScheme) {
          context["signing_region"] = authScheme.signingRegion;
          context["signing_service"] = authScheme.signingName;
          const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
          const httpAuthOption = (_c = smithyContext == null ? void 0 : smithyContext.selectedHttpAuthScheme) == null ? void 0 : _c.httpAuthOption;
          if (httpAuthOption) {
            httpAuthOption.signingProperties = Object.assign(
              httpAuthOption.signingProperties || {},
              {
                signing_region: authScheme.signingRegion,
                signingRegion: authScheme.signingRegion,
                signing_service: authScheme.signingName,
                signingName: authScheme.signingName,
                signingRegionSet: authScheme.signingRegionSet
              },
              authScheme.properties
            );
          }
        }
        return next({
          ...args
        });
      };
    }, "endpointMiddleware");
    var import_middleware_serde = require_dist_cjs29();
    var endpointMiddlewareOptions = {
      step: "serialize",
      tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
      name: "endpointV2Middleware",
      override: true,
      relation: "before",
      toMiddleware: import_middleware_serde.serializerMiddlewareOption.name
    };
    var getEndpointPlugin = /* @__PURE__ */ __name2((config, instructions) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(
          endpointMiddleware({
            config,
            instructions
          }),
          endpointMiddlewareOptions
        );
      }
    }), "getEndpointPlugin");
    var resolveEndpointConfig = /* @__PURE__ */ __name2((input) => {
      const tls = input.tls ?? true;
      const { endpoint } = input;
      const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await (0, import_util_middleware.normalizeProvider)(endpoint)()) : void 0;
      const isCustomEndpoint = !!endpoint;
      return {
        ...input,
        endpoint: customEndpointProvider,
        tls,
        isCustomEndpoint,
        useDualstackEndpoint: (0, import_util_middleware.normalizeProvider)(input.useDualstackEndpoint ?? false),
        useFipsEndpoint: (0, import_util_middleware.normalizeProvider)(input.useFipsEndpoint ?? false)
      };
    }, "resolveEndpointConfig");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/rng.js
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
var import_crypto, rnds8Pool, poolPtr;
var init_rng = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto = __toESM(require("crypto"));
    rnds8Pool = new Uint8Array(256);
    poolPtr = rnds8Pool.length;
    __name(rng, "rng");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    __name(validate, "validate");
    validate_default = validate;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/stringify.js
function stringify(arr, offset = 0) {
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex, stringify_default;
var init_stringify = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    __name(stringify, "stringify");
    stringify_default = stringify;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    __name(v1, "v1");
    v1_default = v1;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    __name(parse, "parse");
    parse_default = parse;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  __name(generateUUID, "generateUUID");
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    __name(stringToBytes, "stringToBytes");
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    __name(v35_default, "default");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto2.default.createHash("md5").update(bytes).digest();
}
var import_crypto2, md5_default;
var init_md5 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/md5.js"() {
    import_crypto2 = __toESM(require("crypto"));
    __name(md5, "md5");
    md5_default = md5;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default;
var init_v4 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v4.js"() {
    init_rng();
    init_stringify();
    __name(v4, "v4");
    v4_default = v4;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto3.default.createHash("sha1").update(bytes).digest();
}
var import_crypto3, sha1_default;
var init_sha1 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/sha1.js"() {
    import_crypto3 = __toESM(require("crypto"));
    __name(sha1, "sha1");
    sha1_default = sha1;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    __name(version, "version");
    version_default = version;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/uuid/dist/esm-node/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/service-error-classification/dist-cjs/index.js
var require_dist_cjs31 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/service-error-classification/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      isClockSkewCorrectedError: () => isClockSkewCorrectedError,
      isClockSkewError: () => isClockSkewError,
      isRetryableByTrait: () => isRetryableByTrait,
      isServerError: () => isServerError,
      isThrottlingError: () => isThrottlingError,
      isTransientError: () => isTransientError
    });
    module2.exports = __toCommonJS2(src_exports);
    var CLOCK_SKEW_ERROR_CODES = [
      "AuthFailure",
      "InvalidSignatureException",
      "RequestExpired",
      "RequestInTheFuture",
      "RequestTimeTooSkewed",
      "SignatureDoesNotMatch"
    ];
    var THROTTLING_ERROR_CODES = [
      "BandwidthLimitExceeded",
      "EC2ThrottledException",
      "LimitExceededException",
      "PriorRequestNotComplete",
      "ProvisionedThroughputExceededException",
      "RequestLimitExceeded",
      "RequestThrottled",
      "RequestThrottledException",
      "SlowDown",
      "ThrottledException",
      "Throttling",
      "ThrottlingException",
      "TooManyRequestsException",
      "TransactionInProgressException"
      // DynamoDB
    ];
    var TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
    var TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
    var NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];
    var isRetryableByTrait = /* @__PURE__ */ __name2((error) => error.$retryable !== void 0, "isRetryableByTrait");
    var isClockSkewError = /* @__PURE__ */ __name2((error) => CLOCK_SKEW_ERROR_CODES.includes(error.name), "isClockSkewError");
    var isClockSkewCorrectedError = /* @__PURE__ */ __name2((error) => {
      var _a;
      return (_a = error.$metadata) == null ? void 0 : _a.clockSkewCorrected;
    }, "isClockSkewCorrectedError");
    var isThrottlingError = /* @__PURE__ */ __name2((error) => {
      var _a, _b;
      return ((_a = error.$metadata) == null ? void 0 : _a.httpStatusCode) === 429 || THROTTLING_ERROR_CODES.includes(error.name) || ((_b = error.$retryable) == null ? void 0 : _b.throttling) == true;
    }, "isThrottlingError");
    var isTransientError = /* @__PURE__ */ __name2((error) => {
      var _a;
      return isClockSkewCorrectedError(error) || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes((error == null ? void 0 : error.code) || "") || TRANSIENT_ERROR_STATUS_CODES.includes(((_a = error.$metadata) == null ? void 0 : _a.httpStatusCode) || 0);
    }, "isTransientError");
    var isServerError = /* @__PURE__ */ __name2((error) => {
      var _a;
      if (((_a = error.$metadata) == null ? void 0 : _a.httpStatusCode) !== void 0) {
        const statusCode = error.$metadata.httpStatusCode;
        if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
          return true;
        }
        return false;
      }
      return false;
    }, "isServerError");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-retry/dist-cjs/index.js
var require_dist_cjs32 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-retry/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      AdaptiveRetryStrategy: () => AdaptiveRetryStrategy,
      ConfiguredRetryStrategy: () => ConfiguredRetryStrategy,
      DEFAULT_MAX_ATTEMPTS: () => DEFAULT_MAX_ATTEMPTS,
      DEFAULT_RETRY_DELAY_BASE: () => DEFAULT_RETRY_DELAY_BASE,
      DEFAULT_RETRY_MODE: () => DEFAULT_RETRY_MODE,
      DefaultRateLimiter: () => DefaultRateLimiter,
      INITIAL_RETRY_TOKENS: () => INITIAL_RETRY_TOKENS,
      INVOCATION_ID_HEADER: () => INVOCATION_ID_HEADER,
      MAXIMUM_RETRY_DELAY: () => MAXIMUM_RETRY_DELAY,
      NO_RETRY_INCREMENT: () => NO_RETRY_INCREMENT,
      REQUEST_HEADER: () => REQUEST_HEADER,
      RETRY_COST: () => RETRY_COST,
      RETRY_MODES: () => RETRY_MODES,
      StandardRetryStrategy: () => StandardRetryStrategy,
      THROTTLING_RETRY_DELAY_BASE: () => THROTTLING_RETRY_DELAY_BASE,
      TIMEOUT_RETRY_COST: () => TIMEOUT_RETRY_COST
    });
    module2.exports = __toCommonJS2(src_exports);
    var RETRY_MODES = /* @__PURE__ */ ((RETRY_MODES2) => {
      RETRY_MODES2["STANDARD"] = "standard";
      RETRY_MODES2["ADAPTIVE"] = "adaptive";
      return RETRY_MODES2;
    })(RETRY_MODES || {});
    var DEFAULT_MAX_ATTEMPTS = 3;
    var DEFAULT_RETRY_MODE = "standard";
    var import_service_error_classification = require_dist_cjs31();
    var _DefaultRateLimiter = class _DefaultRateLimiter {
      static {
        __name(this, "_DefaultRateLimiter");
      }
      constructor(options) {
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = (options == null ? void 0 : options.beta) ?? 0.7;
        this.minCapacity = (options == null ? void 0 : options.minCapacity) ?? 1;
        this.minFillRate = (options == null ? void 0 : options.minFillRate) ?? 0.5;
        this.scaleConstant = (options == null ? void 0 : options.scaleConstant) ?? 0.4;
        this.smooth = (options == null ? void 0 : options.smooth) ?? 0.8;
        const currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
      }
      getCurrentTimeInSeconds() {
        return Date.now() / 1e3;
      }
      async getSendToken() {
        return this.acquireTokenBucket(1);
      }
      async acquireTokenBucket(amount) {
        if (!this.enabled) {
          return;
        }
        this.refillTokenBucket();
        if (amount > this.currentCapacity) {
          const delay = (amount - this.currentCapacity) / this.fillRate * 1e3;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        this.currentCapacity = this.currentCapacity - amount;
      }
      refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
          this.lastTimestamp = timestamp;
          return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
      }
      updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        if ((0, import_service_error_classification.isThrottlingError)(response)) {
          const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
          this.lastMaxRate = rateToUse;
          this.calculateTimeWindow();
          this.lastThrottleTime = this.getCurrentTimeInSeconds();
          calculatedRate = this.cubicThrottle(rateToUse);
          this.enableTokenBucket();
        } else {
          this.calculateTimeWindow();
          calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
      }
      calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
      }
      cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
      }
      cubicSuccess(timestamp) {
        return this.getPrecise(
          this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate
        );
      }
      enableTokenBucket() {
        this.enabled = true;
      }
      updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
      }
      updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
          const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
          this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
          this.requestCount = 0;
          this.lastTxRateBucket = timeBucket;
        }
      }
      getPrecise(num) {
        return parseFloat(num.toFixed(8));
      }
    };
    __name2(_DefaultRateLimiter, "DefaultRateLimiter");
    var DefaultRateLimiter = _DefaultRateLimiter;
    var DEFAULT_RETRY_DELAY_BASE = 100;
    var MAXIMUM_RETRY_DELAY = 20 * 1e3;
    var THROTTLING_RETRY_DELAY_BASE = 500;
    var INITIAL_RETRY_TOKENS = 500;
    var RETRY_COST = 5;
    var TIMEOUT_RETRY_COST = 10;
    var NO_RETRY_INCREMENT = 1;
    var INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
    var REQUEST_HEADER = "amz-sdk-request";
    var getDefaultRetryBackoffStrategy = /* @__PURE__ */ __name2(() => {
      let delayBase = DEFAULT_RETRY_DELAY_BASE;
      const computeNextBackoffDelay = /* @__PURE__ */ __name2((attempts) => {
        return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
      }, "computeNextBackoffDelay");
      const setDelayBase = /* @__PURE__ */ __name2((delay) => {
        delayBase = delay;
      }, "setDelayBase");
      return {
        computeNextBackoffDelay,
        setDelayBase
      };
    }, "getDefaultRetryBackoffStrategy");
    var createDefaultRetryToken = /* @__PURE__ */ __name2(({
      retryDelay,
      retryCount,
      retryCost
    }) => {
      const getRetryCount = /* @__PURE__ */ __name2(() => retryCount, "getRetryCount");
      const getRetryDelay = /* @__PURE__ */ __name2(() => Math.min(MAXIMUM_RETRY_DELAY, retryDelay), "getRetryDelay");
      const getRetryCost = /* @__PURE__ */ __name2(() => retryCost, "getRetryCost");
      return {
        getRetryCount,
        getRetryDelay,
        getRetryCost
      };
    }, "createDefaultRetryToken");
    var _StandardRetryStrategy = class _StandardRetryStrategy {
      static {
        __name(this, "_StandardRetryStrategy");
      }
      constructor(maxAttempts) {
        this.maxAttempts = maxAttempts;
        this.mode = "standard";
        this.capacity = INITIAL_RETRY_TOKENS;
        this.retryBackoffStrategy = getDefaultRetryBackoffStrategy();
        this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async acquireInitialRetryToken(retryTokenScope) {
        return createDefaultRetryToken({
          retryDelay: DEFAULT_RETRY_DELAY_BASE,
          retryCount: 0
        });
      }
      async refreshRetryTokenForRetry(token, errorInfo) {
        const maxAttempts = await this.getMaxAttempts();
        if (this.shouldRetry(token, errorInfo, maxAttempts)) {
          const errorType = errorInfo.errorType;
          this.retryBackoffStrategy.setDelayBase(
            errorType === "THROTTLING" ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE
          );
          const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
          const retryDelay = errorInfo.retryAfterHint ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType) : delayFromErrorType;
          const capacityCost = this.getCapacityCost(errorType);
          this.capacity -= capacityCost;
          return createDefaultRetryToken({
            retryDelay,
            retryCount: token.getRetryCount() + 1,
            retryCost: capacityCost
          });
        }
        throw new Error("No retry token available");
      }
      recordSuccess(token) {
        this.capacity = Math.max(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
      }
      /**
       * @returns the current available retry capacity.
       *
       * This number decreases when retries are executed and refills when requests or retries succeed.
       */
      getCapacity() {
        return this.capacity;
      }
      async getMaxAttempts() {
        try {
          return await this.maxAttemptsProvider();
        } catch (error) {
          console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
          return DEFAULT_MAX_ATTEMPTS;
        }
      }
      shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
        const attempts = tokenToRenew.getRetryCount() + 1;
        return attempts < maxAttempts && this.capacity >= this.getCapacityCost(errorInfo.errorType) && this.isRetryableError(errorInfo.errorType);
      }
      getCapacityCost(errorType) {
        return errorType === "TRANSIENT" ? TIMEOUT_RETRY_COST : RETRY_COST;
      }
      isRetryableError(errorType) {
        return errorType === "THROTTLING" || errorType === "TRANSIENT";
      }
    };
    __name2(_StandardRetryStrategy, "StandardRetryStrategy");
    var StandardRetryStrategy = _StandardRetryStrategy;
    var _AdaptiveRetryStrategy = class _AdaptiveRetryStrategy {
      static {
        __name(this, "_AdaptiveRetryStrategy");
      }
      constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = "adaptive";
        const { rateLimiter } = options ?? {};
        this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
        this.standardRetryStrategy = new StandardRetryStrategy(maxAttemptsProvider);
      }
      async acquireInitialRetryToken(retryTokenScope) {
        await this.rateLimiter.getSendToken();
        return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
      }
      async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        this.rateLimiter.updateClientSendingRate(errorInfo);
        return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
      }
      recordSuccess(token) {
        this.rateLimiter.updateClientSendingRate({});
        this.standardRetryStrategy.recordSuccess(token);
      }
    };
    __name2(_AdaptiveRetryStrategy, "AdaptiveRetryStrategy");
    var AdaptiveRetryStrategy = _AdaptiveRetryStrategy;
    var _ConfiguredRetryStrategy = class _ConfiguredRetryStrategy extends StandardRetryStrategy {
      static {
        __name(this, "_ConfiguredRetryStrategy");
      }
      /**
       * @param maxAttempts - the maximum number of retry attempts allowed.
       *                      e.g., if set to 3, then 4 total requests are possible.
       * @param computeNextBackoffDelay - a millisecond delay for each retry or a function that takes the retry attempt
       *                                  and returns the delay.
       *
       * @example exponential backoff.
       * ```js
       * new Client({
       *   retryStrategy: new ConfiguredRetryStrategy(3, (attempt) => attempt ** 2)
       * });
       * ```
       * @example constant delay.
       * ```js
       * new Client({
       *   retryStrategy: new ConfiguredRetryStrategy(3, 2000)
       * });
       * ```
       */
      constructor(maxAttempts, computeNextBackoffDelay = DEFAULT_RETRY_DELAY_BASE) {
        super(typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts);
        if (typeof computeNextBackoffDelay === "number") {
          this.computeNextBackoffDelay = () => computeNextBackoffDelay;
        } else {
          this.computeNextBackoffDelay = computeNextBackoffDelay;
        }
      }
      async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        const token = await super.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
        token.getRetryDelay = () => this.computeNextBackoffDelay(token.getRetryCount());
        return token;
      }
    };
    __name2(_ConfiguredRetryStrategy, "ConfiguredRetryStrategy");
    var ConfiguredRetryStrategy = _ConfiguredRetryStrategy;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-retry/dist-cjs/isStreamingPayload/isStreamingPayload.js
var require_isStreamingPayload = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-retry/dist-cjs/isStreamingPayload/isStreamingPayload.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isStreamingPayload = void 0;
    var stream_1 = require("stream");
    var isStreamingPayload = /* @__PURE__ */ __name((request) => (request === null || request === void 0 ? void 0 : request.body) instanceof stream_1.Readable || typeof ReadableStream !== "undefined" && (request === null || request === void 0 ? void 0 : request.body) instanceof ReadableStream, "isStreamingPayload");
    exports2.isStreamingPayload = isStreamingPayload;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-retry/dist-cjs/index.js
var require_dist_cjs33 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-retry/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      AdaptiveRetryStrategy: () => AdaptiveRetryStrategy,
      CONFIG_MAX_ATTEMPTS: () => CONFIG_MAX_ATTEMPTS,
      CONFIG_RETRY_MODE: () => CONFIG_RETRY_MODE,
      ENV_MAX_ATTEMPTS: () => ENV_MAX_ATTEMPTS,
      ENV_RETRY_MODE: () => ENV_RETRY_MODE,
      NODE_MAX_ATTEMPT_CONFIG_OPTIONS: () => NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
      NODE_RETRY_MODE_CONFIG_OPTIONS: () => NODE_RETRY_MODE_CONFIG_OPTIONS,
      StandardRetryStrategy: () => StandardRetryStrategy,
      defaultDelayDecider: () => defaultDelayDecider,
      defaultRetryDecider: () => defaultRetryDecider,
      getOmitRetryHeadersPlugin: () => getOmitRetryHeadersPlugin,
      getRetryAfterHint: () => getRetryAfterHint,
      getRetryPlugin: () => getRetryPlugin,
      omitRetryHeadersMiddleware: () => omitRetryHeadersMiddleware,
      omitRetryHeadersMiddlewareOptions: () => omitRetryHeadersMiddlewareOptions,
      resolveRetryConfig: () => resolveRetryConfig,
      retryMiddleware: () => retryMiddleware,
      retryMiddlewareOptions: () => retryMiddlewareOptions
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_protocol_http = require_dist_cjs2();
    var import_uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var import_util_retry = require_dist_cjs32();
    var getDefaultRetryQuota = /* @__PURE__ */ __name2((initialRetryTokens, options) => {
      const MAX_CAPACITY = initialRetryTokens;
      const noRetryIncrement = (options == null ? void 0 : options.noRetryIncrement) ?? import_util_retry.NO_RETRY_INCREMENT;
      const retryCost = (options == null ? void 0 : options.retryCost) ?? import_util_retry.RETRY_COST;
      const timeoutRetryCost = (options == null ? void 0 : options.timeoutRetryCost) ?? import_util_retry.TIMEOUT_RETRY_COST;
      let availableCapacity = initialRetryTokens;
      const getCapacityAmount = /* @__PURE__ */ __name2((error) => error.name === "TimeoutError" ? timeoutRetryCost : retryCost, "getCapacityAmount");
      const hasRetryTokens = /* @__PURE__ */ __name2((error) => getCapacityAmount(error) <= availableCapacity, "hasRetryTokens");
      const retrieveRetryTokens = /* @__PURE__ */ __name2((error) => {
        if (!hasRetryTokens(error)) {
          throw new Error("No retry token available");
        }
        const capacityAmount = getCapacityAmount(error);
        availableCapacity -= capacityAmount;
        return capacityAmount;
      }, "retrieveRetryTokens");
      const releaseRetryTokens = /* @__PURE__ */ __name2((capacityReleaseAmount) => {
        availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
        availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
      }, "releaseRetryTokens");
      return Object.freeze({
        hasRetryTokens,
        retrieveRetryTokens,
        releaseRetryTokens
      });
    }, "getDefaultRetryQuota");
    var defaultDelayDecider = /* @__PURE__ */ __name2((delayBase, attempts) => Math.floor(Math.min(import_util_retry.MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase)), "defaultDelayDecider");
    var import_service_error_classification = require_dist_cjs31();
    var defaultRetryDecider = /* @__PURE__ */ __name2((error) => {
      if (!error) {
        return false;
      }
      return (0, import_service_error_classification.isRetryableByTrait)(error) || (0, import_service_error_classification.isClockSkewError)(error) || (0, import_service_error_classification.isThrottlingError)(error) || (0, import_service_error_classification.isTransientError)(error);
    }, "defaultRetryDecider");
    var asSdkError = /* @__PURE__ */ __name2((error) => {
      if (error instanceof Error)
        return error;
      if (error instanceof Object)
        return Object.assign(new Error(), error);
      if (typeof error === "string")
        return new Error(error);
      return new Error(`AWS SDK error wrapper for ${error}`);
    }, "asSdkError");
    var _StandardRetryStrategy = class _StandardRetryStrategy {
      static {
        __name(this, "_StandardRetryStrategy");
      }
      constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = import_util_retry.RETRY_MODES.STANDARD;
        this.retryDecider = (options == null ? void 0 : options.retryDecider) ?? defaultRetryDecider;
        this.delayDecider = (options == null ? void 0 : options.delayDecider) ?? defaultDelayDecider;
        this.retryQuota = (options == null ? void 0 : options.retryQuota) ?? getDefaultRetryQuota(import_util_retry.INITIAL_RETRY_TOKENS);
      }
      shouldRetry(error, attempts, maxAttempts) {
        return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
      }
      async getMaxAttempts() {
        let maxAttempts;
        try {
          maxAttempts = await this.maxAttemptsProvider();
        } catch (error) {
          maxAttempts = import_util_retry.DEFAULT_MAX_ATTEMPTS;
        }
        return maxAttempts;
      }
      async retry(next, args, options) {
        let retryTokenAmount;
        let attempts = 0;
        let totalDelay = 0;
        const maxAttempts = await this.getMaxAttempts();
        const { request } = args;
        if (import_protocol_http.HttpRequest.isInstance(request)) {
          request.headers[import_util_retry.INVOCATION_ID_HEADER] = (0, import_uuid.v4)();
        }
        while (true) {
          try {
            if (import_protocol_http.HttpRequest.isInstance(request)) {
              request.headers[import_util_retry.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
            }
            if (options == null ? void 0 : options.beforeRequest) {
              await options.beforeRequest();
            }
            const { response, output } = await next(args);
            if (options == null ? void 0 : options.afterRequest) {
              options.afterRequest(response);
            }
            this.retryQuota.releaseRetryTokens(retryTokenAmount);
            output.$metadata.attempts = attempts + 1;
            output.$metadata.totalRetryDelay = totalDelay;
            return { response, output };
          } catch (e) {
            const err = asSdkError(e);
            attempts++;
            if (this.shouldRetry(err, attempts, maxAttempts)) {
              retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
              const delayFromDecider = this.delayDecider(
                (0, import_service_error_classification.isThrottlingError)(err) ? import_util_retry.THROTTLING_RETRY_DELAY_BASE : import_util_retry.DEFAULT_RETRY_DELAY_BASE,
                attempts
              );
              const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
              const delay = Math.max(delayFromResponse || 0, delayFromDecider);
              totalDelay += delay;
              await new Promise((resolve) => setTimeout(resolve, delay));
              continue;
            }
            if (!err.$metadata) {
              err.$metadata = {};
            }
            err.$metadata.attempts = attempts;
            err.$metadata.totalRetryDelay = totalDelay;
            throw err;
          }
        }
      }
    };
    __name2(_StandardRetryStrategy, "StandardRetryStrategy");
    var StandardRetryStrategy = _StandardRetryStrategy;
    var getDelayFromRetryAfterHeader = /* @__PURE__ */ __name2((response) => {
      if (!import_protocol_http.HttpResponse.isInstance(response))
        return;
      const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
      if (!retryAfterHeaderName)
        return;
      const retryAfter = response.headers[retryAfterHeaderName];
      const retryAfterSeconds = Number(retryAfter);
      if (!Number.isNaN(retryAfterSeconds))
        return retryAfterSeconds * 1e3;
      const retryAfterDate = new Date(retryAfter);
      return retryAfterDate.getTime() - Date.now();
    }, "getDelayFromRetryAfterHeader");
    var _AdaptiveRetryStrategy = class _AdaptiveRetryStrategy extends StandardRetryStrategy {
      static {
        __name(this, "_AdaptiveRetryStrategy");
      }
      constructor(maxAttemptsProvider, options) {
        const { rateLimiter, ...superOptions } = options ?? {};
        super(maxAttemptsProvider, superOptions);
        this.rateLimiter = rateLimiter ?? new import_util_retry.DefaultRateLimiter();
        this.mode = import_util_retry.RETRY_MODES.ADAPTIVE;
      }
      async retry(next, args) {
        return super.retry(next, args, {
          beforeRequest: async () => {
            return this.rateLimiter.getSendToken();
          },
          afterRequest: (response) => {
            this.rateLimiter.updateClientSendingRate(response);
          }
        });
      }
    };
    __name2(_AdaptiveRetryStrategy, "AdaptiveRetryStrategy");
    var AdaptiveRetryStrategy = _AdaptiveRetryStrategy;
    var import_util_middleware = require_dist_cjs22();
    var ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
    var CONFIG_MAX_ATTEMPTS = "max_attempts";
    var NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => {
        const value = env[ENV_MAX_ATTEMPTS];
        if (!value)
          return void 0;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
          throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
      },
      configFileSelector: (profile) => {
        const value = profile[CONFIG_MAX_ATTEMPTS];
        if (!value)
          return void 0;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
          throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
      },
      default: import_util_retry.DEFAULT_MAX_ATTEMPTS
    };
    var resolveRetryConfig = /* @__PURE__ */ __name2((input) => {
      const { retryStrategy } = input;
      const maxAttempts = (0, import_util_middleware.normalizeProvider)(input.maxAttempts ?? import_util_retry.DEFAULT_MAX_ATTEMPTS);
      return {
        ...input,
        maxAttempts,
        retryStrategy: async () => {
          if (retryStrategy) {
            return retryStrategy;
          }
          const retryMode = await (0, import_util_middleware.normalizeProvider)(input.retryMode)();
          if (retryMode === import_util_retry.RETRY_MODES.ADAPTIVE) {
            return new import_util_retry.AdaptiveRetryStrategy(maxAttempts);
          }
          return new import_util_retry.StandardRetryStrategy(maxAttempts);
        }
      };
    }, "resolveRetryConfig");
    var ENV_RETRY_MODE = "AWS_RETRY_MODE";
    var CONFIG_RETRY_MODE = "retry_mode";
    var NODE_RETRY_MODE_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
      configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
      default: import_util_retry.DEFAULT_RETRY_MODE
    };
    var omitRetryHeadersMiddleware = /* @__PURE__ */ __name2(() => (next) => async (args) => {
      const { request } = args;
      if (import_protocol_http.HttpRequest.isInstance(request)) {
        delete request.headers[import_util_retry.INVOCATION_ID_HEADER];
        delete request.headers[import_util_retry.REQUEST_HEADER];
      }
      return next(args);
    }, "omitRetryHeadersMiddleware");
    var omitRetryHeadersMiddlewareOptions = {
      name: "omitRetryHeadersMiddleware",
      tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
      relation: "before",
      toMiddleware: "awsAuthMiddleware",
      override: true
    };
    var getOmitRetryHeadersPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
      }
    }), "getOmitRetryHeadersPlugin");
    var import_smithy_client = require_dist_cjs15();
    var import_isStreamingPayload = require_isStreamingPayload();
    var retryMiddleware = /* @__PURE__ */ __name2((options) => (next, context) => async (args) => {
      var _a;
      let retryStrategy = await options.retryStrategy();
      const maxAttempts = await options.maxAttempts();
      if (isRetryStrategyV2(retryStrategy)) {
        retryStrategy = retryStrategy;
        let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
        let lastError = new Error();
        let attempts = 0;
        let totalRetryDelay = 0;
        const { request } = args;
        const isRequest = import_protocol_http.HttpRequest.isInstance(request);
        if (isRequest) {
          request.headers[import_util_retry.INVOCATION_ID_HEADER] = (0, import_uuid.v4)();
        }
        while (true) {
          try {
            if (isRequest) {
              request.headers[import_util_retry.REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
            }
            const { response, output } = await next(args);
            retryStrategy.recordSuccess(retryToken);
            output.$metadata.attempts = attempts + 1;
            output.$metadata.totalRetryDelay = totalRetryDelay;
            return { response, output };
          } catch (e) {
            const retryErrorInfo = getRetryErrorInfo(e);
            lastError = asSdkError(e);
            if (isRequest && (0, import_isStreamingPayload.isStreamingPayload)(request)) {
              (_a = context.logger instanceof import_smithy_client.NoOpLogger ? console : context.logger) == null ? void 0 : _a.warn(
                "An error was encountered in a non-retryable streaming request."
              );
              throw lastError;
            }
            try {
              retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
            } catch (refreshError) {
              if (!lastError.$metadata) {
                lastError.$metadata = {};
              }
              lastError.$metadata.attempts = attempts + 1;
              lastError.$metadata.totalRetryDelay = totalRetryDelay;
              throw lastError;
            }
            attempts = retryToken.getRetryCount();
            const delay = retryToken.getRetryDelay();
            totalRetryDelay += delay;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      } else {
        retryStrategy = retryStrategy;
        if (retryStrategy == null ? void 0 : retryStrategy.mode)
          context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
        return retryStrategy.retry(next, args);
      }
    }, "retryMiddleware");
    var isRetryStrategyV2 = /* @__PURE__ */ __name2((retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined", "isRetryStrategyV2");
    var getRetryErrorInfo = /* @__PURE__ */ __name2((error) => {
      const errorInfo = {
        error,
        errorType: getRetryErrorType(error)
      };
      const retryAfterHint = getRetryAfterHint(error.$response);
      if (retryAfterHint) {
        errorInfo.retryAfterHint = retryAfterHint;
      }
      return errorInfo;
    }, "getRetryErrorInfo");
    var getRetryErrorType = /* @__PURE__ */ __name2((error) => {
      if ((0, import_service_error_classification.isThrottlingError)(error))
        return "THROTTLING";
      if ((0, import_service_error_classification.isTransientError)(error))
        return "TRANSIENT";
      if ((0, import_service_error_classification.isServerError)(error))
        return "SERVER_ERROR";
      return "CLIENT_ERROR";
    }, "getRetryErrorType");
    var retryMiddlewareOptions = {
      name: "retryMiddleware",
      tags: ["RETRY"],
      step: "finalizeRequest",
      priority: "high",
      override: true
    };
    var getRetryPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
      }
    }), "getRetryPlugin");
    var getRetryAfterHint = /* @__PURE__ */ __name2((response) => {
      if (!import_protocol_http.HttpResponse.isInstance(response))
        return;
      const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
      if (!retryAfterHeaderName)
        return;
      const retryAfter = response.headers[retryAfterHeaderName];
      const retryAfterSeconds = Number(retryAfter);
      if (!Number.isNaN(retryAfterSeconds))
        return new Date(retryAfterSeconds * 1e3);
      const retryAfterDate = new Date(retryAfter);
      return retryAfterDate;
    }, "getRetryAfterHint");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/core/dist-cjs/index.js
var require_dist_cjs34 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/core/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      DefaultIdentityProviderConfig: () => DefaultIdentityProviderConfig,
      EXPIRATION_MS: () => EXPIRATION_MS,
      HttpApiKeyAuthSigner: () => HttpApiKeyAuthSigner,
      HttpBearerAuthSigner: () => HttpBearerAuthSigner,
      NoAuthSigner: () => NoAuthSigner,
      RequestBuilder: () => RequestBuilder,
      createIsIdentityExpiredFunction: () => createIsIdentityExpiredFunction,
      createPaginator: () => createPaginator,
      doesIdentityRequireRefresh: () => doesIdentityRequireRefresh,
      getHttpAuthSchemeEndpointRuleSetPlugin: () => getHttpAuthSchemeEndpointRuleSetPlugin,
      getHttpAuthSchemePlugin: () => getHttpAuthSchemePlugin,
      getHttpSigningPlugin: () => getHttpSigningPlugin,
      getSmithyContext: () => getSmithyContext3,
      httpAuthSchemeEndpointRuleSetMiddlewareOptions: () => httpAuthSchemeEndpointRuleSetMiddlewareOptions,
      httpAuthSchemeMiddleware: () => httpAuthSchemeMiddleware,
      httpAuthSchemeMiddlewareOptions: () => httpAuthSchemeMiddlewareOptions,
      httpSigningMiddleware: () => httpSigningMiddleware,
      httpSigningMiddlewareOptions: () => httpSigningMiddlewareOptions,
      isIdentityExpired: () => isIdentityExpired,
      memoizeIdentityProvider: () => memoizeIdentityProvider,
      normalizeProvider: () => normalizeProvider,
      requestBuilder: () => requestBuilder
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_util_middleware = require_dist_cjs22();
    function convertHttpAuthSchemesToMap(httpAuthSchemes) {
      const map = /* @__PURE__ */ new Map();
      for (const scheme of httpAuthSchemes) {
        map.set(scheme.schemeId, scheme);
      }
      return map;
    }
    __name(convertHttpAuthSchemesToMap, "convertHttpAuthSchemesToMap");
    __name2(convertHttpAuthSchemesToMap, "convertHttpAuthSchemesToMap");
    var httpAuthSchemeMiddleware = /* @__PURE__ */ __name2((config, mwOptions) => (next, context) => async (args) => {
      var _a;
      const options = config.httpAuthSchemeProvider(
        await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input)
      );
      const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
      const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
      const failureReasons = [];
      for (const option of options) {
        const scheme = authSchemes.get(option.schemeId);
        if (!scheme) {
          failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
          continue;
        }
        const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
        if (!identityProvider) {
          failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
          continue;
        }
        const { identityProperties = {}, signingProperties = {} } = ((_a = option.propertiesExtractor) == null ? void 0 : _a.call(option, config, context)) || {};
        option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
        option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
        smithyContext.selectedHttpAuthScheme = {
          httpAuthOption: option,
          identity: await identityProvider(option.identityProperties),
          signer: scheme.signer
        };
        break;
      }
      if (!smithyContext.selectedHttpAuthScheme) {
        throw new Error(failureReasons.join("\n"));
      }
      return next(args);
    }, "httpAuthSchemeMiddleware");
    var import_middleware_endpoint = require_dist_cjs30();
    var httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
      step: "serialize",
      tags: ["HTTP_AUTH_SCHEME"],
      name: "httpAuthSchemeMiddleware",
      override: true,
      relation: "before",
      toMiddleware: import_middleware_endpoint.endpointMiddlewareOptions.name
    };
    var getHttpAuthSchemeEndpointRuleSetPlugin = /* @__PURE__ */ __name2((config, {
      httpAuthSchemeParametersProvider,
      identityProviderConfigProvider
    }) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(
          httpAuthSchemeMiddleware(config, {
            httpAuthSchemeParametersProvider,
            identityProviderConfigProvider
          }),
          httpAuthSchemeEndpointRuleSetMiddlewareOptions
        );
      }
    }), "getHttpAuthSchemeEndpointRuleSetPlugin");
    var import_middleware_serde = require_dist_cjs29();
    var httpAuthSchemeMiddlewareOptions = {
      step: "serialize",
      tags: ["HTTP_AUTH_SCHEME"],
      name: "httpAuthSchemeMiddleware",
      override: true,
      relation: "before",
      toMiddleware: import_middleware_serde.serializerMiddlewareOption.name
    };
    var getHttpAuthSchemePlugin = /* @__PURE__ */ __name2((config, {
      httpAuthSchemeParametersProvider,
      identityProviderConfigProvider
    }) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(
          httpAuthSchemeMiddleware(config, {
            httpAuthSchemeParametersProvider,
            identityProviderConfigProvider
          }),
          httpAuthSchemeMiddlewareOptions
        );
      }
    }), "getHttpAuthSchemePlugin");
    var import_protocol_http = require_dist_cjs2();
    var defaultErrorHandler = /* @__PURE__ */ __name2((signingProperties) => (error) => {
      throw error;
    }, "defaultErrorHandler");
    var defaultSuccessHandler = /* @__PURE__ */ __name2((httpResponse, signingProperties) => {
    }, "defaultSuccessHandler");
    var httpSigningMiddleware = /* @__PURE__ */ __name2((config) => (next, context) => async (args) => {
      if (!import_protocol_http.HttpRequest.isInstance(args.request)) {
        return next(args);
      }
      const smithyContext = (0, import_util_middleware.getSmithyContext)(context);
      const scheme = smithyContext.selectedHttpAuthScheme;
      if (!scheme) {
        throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
      }
      const {
        httpAuthOption: { signingProperties = {} },
        identity,
        signer
      } = scheme;
      const output = await next({
        ...args,
        request: await signer.sign(args.request, identity, signingProperties)
      }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
      (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
      return output;
    }, "httpSigningMiddleware");
    var import_middleware_retry = require_dist_cjs33();
    var httpSigningMiddlewareOptions = {
      step: "finalizeRequest",
      tags: ["HTTP_SIGNING"],
      name: "httpSigningMiddleware",
      aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
      override: true,
      relation: "after",
      toMiddleware: import_middleware_retry.retryMiddlewareOptions.name
    };
    var getHttpSigningPlugin = /* @__PURE__ */ __name2((config) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(httpSigningMiddleware(config), httpSigningMiddlewareOptions);
      }
    }), "getHttpSigningPlugin");
    var _DefaultIdentityProviderConfig = class _DefaultIdentityProviderConfig {
      static {
        __name(this, "_DefaultIdentityProviderConfig");
      }
      /**
       * Creates an IdentityProviderConfig with a record of scheme IDs to identity providers.
       *
       * @param config scheme IDs and identity providers to configure
       */
      constructor(config) {
        this.authSchemes = /* @__PURE__ */ new Map();
        for (const [key, value] of Object.entries(config)) {
          if (value !== void 0) {
            this.authSchemes.set(key, value);
          }
        }
      }
      getIdentityProvider(schemeId) {
        return this.authSchemes.get(schemeId);
      }
    };
    __name2(_DefaultIdentityProviderConfig, "DefaultIdentityProviderConfig");
    var DefaultIdentityProviderConfig = _DefaultIdentityProviderConfig;
    var import_types = require_dist_cjs();
    var _HttpApiKeyAuthSigner = class _HttpApiKeyAuthSigner {
      static {
        __name(this, "_HttpApiKeyAuthSigner");
      }
      async sign(httpRequest, identity, signingProperties) {
        if (!signingProperties) {
          throw new Error(
            "request could not be signed with `apiKey` since the `name` and `in` signer properties are missing"
          );
        }
        if (!signingProperties.name) {
          throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
        }
        if (!signingProperties.in) {
          throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
        }
        if (!identity.apiKey) {
          throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
        }
        const clonedRequest = httpRequest.clone();
        if (signingProperties.in === import_types.HttpApiKeyAuthLocation.QUERY) {
          clonedRequest.query[signingProperties.name] = identity.apiKey;
        } else if (signingProperties.in === import_types.HttpApiKeyAuthLocation.HEADER) {
          clonedRequest.headers[signingProperties.name] = signingProperties.scheme ? `${signingProperties.scheme} ${identity.apiKey}` : identity.apiKey;
        } else {
          throw new Error(
            "request can only be signed with `apiKey` locations `query` or `header`, but found: `" + signingProperties.in + "`"
          );
        }
        return clonedRequest;
      }
    };
    __name2(_HttpApiKeyAuthSigner, "HttpApiKeyAuthSigner");
    var HttpApiKeyAuthSigner = _HttpApiKeyAuthSigner;
    var _HttpBearerAuthSigner = class _HttpBearerAuthSigner {
      static {
        __name(this, "_HttpBearerAuthSigner");
      }
      async sign(httpRequest, identity, signingProperties) {
        const clonedRequest = httpRequest.clone();
        if (!identity.token) {
          throw new Error("request could not be signed with `token` since the `token` is not defined");
        }
        clonedRequest.headers["Authorization"] = `Bearer ${identity.token}`;
        return clonedRequest;
      }
    };
    __name2(_HttpBearerAuthSigner, "HttpBearerAuthSigner");
    var HttpBearerAuthSigner = _HttpBearerAuthSigner;
    var _NoAuthSigner = class _NoAuthSigner {
      static {
        __name(this, "_NoAuthSigner");
      }
      async sign(httpRequest, identity, signingProperties) {
        return httpRequest;
      }
    };
    __name2(_NoAuthSigner, "NoAuthSigner");
    var NoAuthSigner = _NoAuthSigner;
    var createIsIdentityExpiredFunction = /* @__PURE__ */ __name2((expirationMs) => (identity) => doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs, "createIsIdentityExpiredFunction");
    var EXPIRATION_MS = 3e5;
    var isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
    var doesIdentityRequireRefresh = /* @__PURE__ */ __name2((identity) => identity.expiration !== void 0, "doesIdentityRequireRefresh");
    var memoizeIdentityProvider = /* @__PURE__ */ __name2((provider, isExpired, requiresRefresh) => {
      if (provider === void 0) {
        return void 0;
      }
      const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
      let resolved;
      let pending;
      let hasResult;
      let isConstant = false;
      const coalesceProvider = /* @__PURE__ */ __name2(async (options) => {
        if (!pending) {
          pending = normalizedProvider(options);
        }
        try {
          resolved = await pending;
          hasResult = true;
          isConstant = false;
        } finally {
          pending = void 0;
        }
        return resolved;
      }, "coalesceProvider");
      if (isExpired === void 0) {
        return async (options) => {
          if (!hasResult || (options == null ? void 0 : options.forceRefresh)) {
            resolved = await coalesceProvider(options);
          }
          return resolved;
        };
      }
      return async (options) => {
        if (!hasResult || (options == null ? void 0 : options.forceRefresh)) {
          resolved = await coalesceProvider(options);
        }
        if (isConstant) {
          return resolved;
        }
        if (!requiresRefresh(resolved)) {
          isConstant = true;
          return resolved;
        }
        if (isExpired(resolved)) {
          await coalesceProvider(options);
          return resolved;
        }
        return resolved;
      };
    }, "memoizeIdentityProvider");
    var getSmithyContext3 = /* @__PURE__ */ __name2((context) => context[import_types.SMITHY_CONTEXT_KEY] || (context[import_types.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
    var normalizeProvider = /* @__PURE__ */ __name2((input) => {
      if (typeof input === "function")
        return input;
      const promisified = Promise.resolve(input);
      return () => promisified;
    }, "normalizeProvider");
    var import_smithy_client = require_dist_cjs15();
    function requestBuilder(input, context) {
      return new RequestBuilder(input, context);
    }
    __name(requestBuilder, "requestBuilder");
    __name2(requestBuilder, "requestBuilder");
    var _RequestBuilder = class _RequestBuilder {
      static {
        __name(this, "_RequestBuilder");
      }
      constructor(input, context) {
        this.input = input;
        this.context = context;
        this.query = {};
        this.method = "";
        this.headers = {};
        this.path = "";
        this.body = null;
        this.hostname = "";
        this.resolvePathStack = [];
      }
      async build() {
        const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
        this.path = basePath;
        for (const resolvePath of this.resolvePathStack) {
          resolvePath(this.path);
        }
        return new import_protocol_http.HttpRequest({
          protocol,
          hostname: this.hostname || hostname,
          port,
          method: this.method,
          path: this.path,
          query: this.query,
          body: this.body,
          headers: this.headers
        });
      }
      /**
       * Brevity setter for "hostname".
       */
      hn(hostname) {
        this.hostname = hostname;
        return this;
      }
      /**
       * Brevity initial builder for "basepath".
       */
      bp(uriLabel) {
        this.resolvePathStack.push((basePath) => {
          this.path = `${(basePath == null ? void 0 : basePath.endsWith("/")) ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
        });
        return this;
      }
      /**
       * Brevity incremental builder for "path".
       */
      p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
        this.resolvePathStack.push((path2) => {
          this.path = (0, import_smithy_client.resolvedPath)(path2, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
        });
        return this;
      }
      /**
       * Brevity setter for "headers".
       */
      h(headers) {
        this.headers = headers;
        return this;
      }
      /**
       * Brevity setter for "query".
       */
      q(query) {
        this.query = query;
        return this;
      }
      /**
       * Brevity setter for "body".
       */
      b(body) {
        this.body = body;
        return this;
      }
      /**
       * Brevity setter for "method".
       */
      m(method) {
        this.method = method;
        return this;
      }
    };
    __name2(_RequestBuilder, "RequestBuilder");
    var RequestBuilder = _RequestBuilder;
    var makePagedClientRequest = /* @__PURE__ */ __name2(async (CommandCtor, client, input, ...args) => {
      return await client.send(new CommandCtor(input), ...args);
    }, "makePagedClientRequest");
    function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
      return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(async function* paginateOperation(config, input, ...additionalArguments) {
        let token = config.startingToken || void 0;
        let hasNext = true;
        let page;
        while (hasNext) {
          input[inputTokenName] = token;
          if (pageSizeTokenName) {
            input[pageSizeTokenName] = input[pageSizeTokenName] ?? config.pageSize;
          }
          if (config.client instanceof ClientCtor) {
            page = await makePagedClientRequest(CommandCtor, config.client, input, ...additionalArguments);
          } else {
            throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
          }
          yield page;
          const prevToken = token;
          token = get(page, outputTokenName);
          hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
        }
        return void 0;
      }, "paginateOperation"), "paginateOperation");
    }
    __name(createPaginator, "createPaginator");
    __name2(createPaginator, "createPaginator");
    var get = /* @__PURE__ */ __name2((fromObject, path2) => {
      let cursor = fromObject;
      const pathComponents = path2.split(".");
      for (const step of pathComponents) {
        if (!cursor || typeof cursor !== "object") {
          return void 0;
        }
        cursor = cursor[step];
      }
      return cursor;
    }, "get");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-content-length/dist-cjs/index.js
var require_dist_cjs35 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/middleware-content-length/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      contentLengthMiddleware: () => contentLengthMiddleware,
      contentLengthMiddlewareOptions: () => contentLengthMiddlewareOptions,
      getContentLengthPlugin: () => getContentLengthPlugin
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_protocol_http = require_dist_cjs2();
    var CONTENT_LENGTH_HEADER = "content-length";
    function contentLengthMiddleware(bodyLengthChecker) {
      return (next) => async (args) => {
        const request = args.request;
        if (import_protocol_http.HttpRequest.isInstance(request)) {
          const { body, headers } = request;
          if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) {
            try {
              const length = bodyLengthChecker(body);
              request.headers = {
                ...request.headers,
                [CONTENT_LENGTH_HEADER]: String(length)
              };
            } catch (error) {
            }
          }
        }
        return next({
          ...args,
          request
        });
      };
    }
    __name(contentLengthMiddleware, "contentLengthMiddleware");
    __name2(contentLengthMiddleware, "contentLengthMiddleware");
    var contentLengthMiddlewareOptions = {
      step: "build",
      tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
      name: "contentLengthMiddleware",
      override: true
    };
    var getContentLengthPlugin = /* @__PURE__ */ __name2((options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
      }
    }), "getContentLengthPlugin");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/submodules/client/index.js
var require_client = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/submodules/client/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var client_exports = {};
    __export2(client_exports, {
      emitWarningIfUnsupportedVersion: () => emitWarningIfUnsupportedVersion
    });
    module2.exports = __toCommonJS2(client_exports);
    var warningEmitted = false;
    var emitWarningIfUnsupportedVersion = /* @__PURE__ */ __name2((version2) => {
      if (version2 && !warningEmitted && parseInt(version2.substring(1, version2.indexOf("."))) < 16) {
        warningEmitted = true;
      }
    }, "emitWarningIfUnsupportedVersion");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/signature-v4/dist-cjs/index.js
var require_dist_cjs36 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/signature-v4/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      SignatureV4: () => SignatureV4,
      clearCredentialCache: () => clearCredentialCache,
      createScope: () => createScope,
      getCanonicalHeaders: () => getCanonicalHeaders,
      getCanonicalQuery: () => getCanonicalQuery,
      getPayloadHash: () => getPayloadHash,
      getSigningKey: () => getSigningKey,
      moveHeadersToQuery: () => moveHeadersToQuery,
      prepareRequest: () => prepareRequest
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_util_middleware = require_dist_cjs22();
    var import_util_utf84 = require_dist_cjs9();
    var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
    var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
    var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
    var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
    var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
    var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
    var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
    var AUTH_HEADER = "authorization";
    var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
    var DATE_HEADER = "date";
    var GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
    var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
    var SHA256_HEADER = "x-amz-content-sha256";
    var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
    var ALWAYS_UNSIGNABLE_HEADERS = {
      authorization: true,
      "cache-control": true,
      connection: true,
      expect: true,
      from: true,
      "keep-alive": true,
      "max-forwards": true,
      pragma: true,
      referer: true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true,
      "user-agent": true,
      "x-amzn-trace-id": true
    };
    var PROXY_HEADER_PATTERN = /^proxy-/;
    var SEC_HEADER_PATTERN = /^sec-/;
    var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
    var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
    var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
    var MAX_CACHE_SIZE = 50;
    var KEY_TYPE_IDENTIFIER = "aws4_request";
    var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
    var import_util_hex_encoding = require_dist_cjs16();
    var import_util_utf8 = require_dist_cjs9();
    var signingKeyCache = {};
    var cacheQueue = [];
    var createScope = /* @__PURE__ */ __name2((shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`, "createScope");
    var getSigningKey = /* @__PURE__ */ __name2(async (sha256Constructor, credentials, shortDate, region, service) => {
      const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
      const cacheKey = `${shortDate}:${region}:${service}:${(0, import_util_hex_encoding.toHex)(credsHash)}:${credentials.sessionToken}`;
      if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
      }
      cacheQueue.push(cacheKey);
      while (cacheQueue.length > MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
      }
      let key = `AWS4${credentials.secretAccessKey}`;
      for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
      }
      return signingKeyCache[cacheKey] = key;
    }, "getSigningKey");
    var clearCredentialCache = /* @__PURE__ */ __name2(() => {
      cacheQueue.length = 0;
      Object.keys(signingKeyCache).forEach((cacheKey) => {
        delete signingKeyCache[cacheKey];
      });
    }, "clearCredentialCache");
    var hmac = /* @__PURE__ */ __name2((ctor, secret, data) => {
      const hash = new ctor(secret);
      hash.update((0, import_util_utf8.toUint8Array)(data));
      return hash.digest();
    }, "hmac");
    var getCanonicalHeaders = /* @__PURE__ */ __name2(({ headers }, unsignableHeaders, signableHeaders) => {
      const canonical = {};
      for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == void 0) {
          continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || (unsignableHeaders == null ? void 0 : unsignableHeaders.has(canonicalHeaderName)) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
          if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
            continue;
          }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
      }
      return canonical;
    }, "getCanonicalHeaders");
    var import_util_uri_escape = require_dist_cjs11();
    var getCanonicalQuery = /* @__PURE__ */ __name2(({ query = {} }) => {
      const keys = [];
      const serialized = {};
      for (const key of Object.keys(query).sort()) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
          continue;
        }
        keys.push(key);
        const value = query[key];
        if (typeof value === "string") {
          serialized[key] = `${(0, import_util_uri_escape.escapeUri)(key)}=${(0, import_util_uri_escape.escapeUri)(value)}`;
        } else if (Array.isArray(value)) {
          serialized[key] = value.slice(0).reduce(
            (encoded, value2) => encoded.concat([`${(0, import_util_uri_escape.escapeUri)(key)}=${(0, import_util_uri_escape.escapeUri)(value2)}`]),
            []
          ).sort().join("&");
        }
      }
      return keys.map((key) => serialized[key]).filter((serialized2) => serialized2).join("&");
    }, "getCanonicalQuery");
    var import_is_array_buffer = require_dist_cjs7();
    var import_util_utf82 = require_dist_cjs9();
    var getPayloadHash = /* @__PURE__ */ __name2(async ({ headers, body }, hashConstructor) => {
      for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === SHA256_HEADER) {
          return headers[headerName];
        }
      }
      if (body == void 0) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      } else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, import_is_array_buffer.isArrayBuffer)(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update((0, import_util_utf82.toUint8Array)(body));
        return (0, import_util_hex_encoding.toHex)(await hashCtor.digest());
      }
      return UNSIGNED_PAYLOAD;
    }, "getPayloadHash");
    var import_util_utf83 = require_dist_cjs9();
    var _HeaderFormatter = class _HeaderFormatter {
      static {
        __name(this, "_HeaderFormatter");
      }
      format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
          const bytes = (0, import_util_utf83.fromUtf8)(headerName);
          chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
          out.set(chunk, position);
          position += chunk.byteLength;
        }
        return out;
      }
      formatHeaderValue(header) {
        switch (header.type) {
          case "boolean":
            return Uint8Array.from([
              header.value ? 0 : 1
              /* boolFalse */
            ]);
          case "byte":
            return Uint8Array.from([2, header.value]);
          case "short":
            const shortView = new DataView(new ArrayBuffer(3));
            shortView.setUint8(
              0,
              3
              /* short */
            );
            shortView.setInt16(1, header.value, false);
            return new Uint8Array(shortView.buffer);
          case "integer":
            const intView = new DataView(new ArrayBuffer(5));
            intView.setUint8(
              0,
              4
              /* integer */
            );
            intView.setInt32(1, header.value, false);
            return new Uint8Array(intView.buffer);
          case "long":
            const longBytes = new Uint8Array(9);
            longBytes[0] = 5;
            longBytes.set(header.value.bytes, 1);
            return longBytes;
          case "binary":
            const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
            binView.setUint8(
              0,
              6
              /* byteArray */
            );
            binView.setUint16(1, header.value.byteLength, false);
            const binBytes = new Uint8Array(binView.buffer);
            binBytes.set(header.value, 3);
            return binBytes;
          case "string":
            const utf8Bytes = (0, import_util_utf83.fromUtf8)(header.value);
            const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
            strView.setUint8(
              0,
              7
              /* string */
            );
            strView.setUint16(1, utf8Bytes.byteLength, false);
            const strBytes = new Uint8Array(strView.buffer);
            strBytes.set(utf8Bytes, 3);
            return strBytes;
          case "timestamp":
            const tsBytes = new Uint8Array(9);
            tsBytes[0] = 8;
            tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
            return tsBytes;
          case "uuid":
            if (!UUID_PATTERN.test(header.value)) {
              throw new Error(`Invalid UUID received: ${header.value}`);
            }
            const uuidBytes = new Uint8Array(17);
            uuidBytes[0] = 9;
            uuidBytes.set((0, import_util_hex_encoding.fromHex)(header.value.replace(/\-/g, "")), 1);
            return uuidBytes;
        }
      }
    };
    __name2(_HeaderFormatter, "HeaderFormatter");
    var HeaderFormatter = _HeaderFormatter;
    var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    var _Int64 = class _Int642 {
      static {
        __name(this, "_Int64");
      }
      constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
          throw new Error("Int64 buffers must be exactly 8 bytes");
        }
      }
      static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
          throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
          bytes[i] = remaining;
        }
        if (number < 0) {
          negate(bytes);
        }
        return new _Int642(bytes);
      }
      /**
       * Called implicitly by infix arithmetic operators.
       */
      valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 128;
        if (negative) {
          negate(bytes);
        }
        return parseInt((0, import_util_hex_encoding.toHex)(bytes), 16) * (negative ? -1 : 1);
      }
      toString() {
        return String(this.valueOf());
      }
    };
    __name2(_Int64, "Int64");
    var Int64 = _Int64;
    function negate(bytes) {
      for (let i = 0; i < 8; i++) {
        bytes[i] ^= 255;
      }
      for (let i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
          break;
      }
    }
    __name(negate, "negate");
    __name2(negate, "negate");
    var hasHeader = /* @__PURE__ */ __name2((soughtHeader, headers) => {
      soughtHeader = soughtHeader.toLowerCase();
      for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
          return true;
        }
      }
      return false;
    }, "hasHeader");
    var cloneRequest = /* @__PURE__ */ __name2(({ headers, query, ...rest }) => ({
      ...rest,
      headers: { ...headers },
      query: query ? cloneQuery(query) : void 0
    }), "cloneRequest");
    var cloneQuery = /* @__PURE__ */ __name2((query) => Object.keys(query).reduce((carry, paramName) => {
      const param = query[paramName];
      return {
        ...carry,
        [paramName]: Array.isArray(param) ? [...param] : param
      };
    }, {}), "cloneQuery");
    var moveHeadersToQuery = /* @__PURE__ */ __name2((request, options = {}) => {
      var _a;
      const { headers, query = {} } = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
      for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !((_a = options.unhoistableHeaders) == null ? void 0 : _a.has(lname))) {
          query[name] = headers[name];
          delete headers[name];
        }
      }
      return {
        ...request,
        headers,
        query
      };
    }, "moveHeadersToQuery");
    var prepareRequest = /* @__PURE__ */ __name2((request) => {
      request = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
      for (const headerName of Object.keys(request.headers)) {
        if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
          delete request.headers[headerName];
        }
      }
      return request;
    }, "prepareRequest");
    var iso8601 = /* @__PURE__ */ __name2((time) => toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601");
    var toDate = /* @__PURE__ */ __name2((time) => {
      if (typeof time === "number") {
        return new Date(time * 1e3);
      }
      if (typeof time === "string") {
        if (Number(time)) {
          return new Date(Number(time) * 1e3);
        }
        return new Date(time);
      }
      return time;
    }, "toDate");
    var _SignatureV4 = class _SignatureV4 {
      static {
        __name(this, "_SignatureV4");
      }
      constructor({
        applyChecksum,
        credentials,
        region,
        service,
        sha256,
        uriEscapePath = true
      }) {
        this.headerFormatter = new HeaderFormatter();
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0, import_util_middleware.normalizeProvider)(region);
        this.credentialProvider = (0, import_util_middleware.normalizeProvider)(credentials);
      }
      async presign(originalRequest, options = {}) {
        const {
          signingDate = /* @__PURE__ */ new Date(),
          expiresIn = 3600,
          unsignableHeaders,
          unhoistableHeaders,
          signableHeaders,
          signingRegion,
          signingService
        } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { longDate, shortDate } = formatDate(signingDate);
        if (expiresIn > MAX_PRESIGNED_TTL) {
          return Promise.reject(
            "Signature version 4 presigned URLs must have an expiration date less than one week in the future"
          );
        }
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders });
        if (credentials.sessionToken) {
          request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
        request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        request.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
        request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(
          longDate,
          scope,
          this.getSigningKey(credentials, region, shortDate, signingService),
          this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256))
        );
        return request;
      }
      async sign(toSign, options) {
        if (typeof toSign === "string") {
          return this.signString(toSign, options);
        } else if (toSign.headers && toSign.payload) {
          return this.signEvent(toSign, options);
        } else if (toSign.message) {
          return this.signMessage(toSign, options);
        } else {
          return this.signRequest(toSign, options);
        }
      }
      async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate, longDate } = formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0, import_util_hex_encoding.toHex)(await hash.digest());
        const stringToSign = [
          EVENT_ALGORITHM_IDENTIFIER,
          longDate,
          scope,
          priorSignature,
          hashedHeaders,
          hashedPayload
        ].join("\n");
        return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
      }
      async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService }) {
        const promise = this.signEvent(
          {
            headers: this.headerFormatter.format(signableMessage.message.headers),
            payload: signableMessage.message.body
          },
          {
            signingDate,
            signingRegion,
            signingService,
            priorSignature: signableMessage.priorSignature
          }
        );
        return promise.then((signature) => {
          return { message: signableMessage.message, signature };
        });
      }
      async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate } = formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update((0, import_util_utf84.toUint8Array)(stringToSign));
        return (0, import_util_hex_encoding.toHex)(await hash.digest());
      }
      async signRequest(requestToSign, {
        signingDate = /* @__PURE__ */ new Date(),
        signableHeaders,
        unsignableHeaders,
        signingRegion,
        signingService
      } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const request = prepareRequest(requestToSign);
        const { longDate, shortDate } = formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        request.headers[AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
          request.headers[TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await getPayloadHash(request, this.sha256);
        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
          request.headers[SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(
          longDate,
          scope,
          this.getSigningKey(credentials, region, shortDate, signingService),
          this.createCanonicalRequest(request, canonicalHeaders, payloadHash)
        );
        request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
        return request;
      }
      createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
      }
      async createStringToSign(longDate, credentialScope, canonicalRequest) {
        const hash = new this.sha256();
        hash.update((0, import_util_utf84.toUint8Array)(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${ALGORITHM_IDENTIFIER}
${longDate}
${credentialScope}
${(0, import_util_hex_encoding.toHex)(hashedRequest)}`;
      }
      getCanonicalPath({ path: path2 }) {
        if (this.uriEscapePath) {
          const normalizedPathSegments = [];
          for (const pathSegment of path2.split("/")) {
            if ((pathSegment == null ? void 0 : pathSegment.length) === 0)
              continue;
            if (pathSegment === ".")
              continue;
            if (pathSegment === "..") {
              normalizedPathSegments.pop();
            } else {
              normalizedPathSegments.push(pathSegment);
            }
          }
          const normalizedPath = `${(path2 == null ? void 0 : path2.startsWith("/")) ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && (path2 == null ? void 0 : path2.endsWith("/")) ? "/" : ""}`;
          const doubleEncoded = (0, import_util_uri_escape.escapeUri)(normalizedPath);
          return doubleEncoded.replace(/%2F/g, "/");
        }
        return path2;
      }
      async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest);
        const hash = new this.sha256(await keyPromise);
        hash.update((0, import_util_utf84.toUint8Array)(stringToSign));
        return (0, import_util_hex_encoding.toHex)(await hash.digest());
      }
      getSigningKey(credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
      }
      validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" || // @ts-expect-error: Property 'accessKeyId' does not exist on type 'object'.ts(2339)
        typeof credentials.accessKeyId !== "string" || // @ts-expect-error: Property 'secretAccessKey' does not exist on type 'object'.ts(2339)
        typeof credentials.secretAccessKey !== "string") {
          throw new Error("Resolved credential object is not valid");
        }
      }
    };
    __name2(_SignatureV4, "SignatureV4");
    var SignatureV4 = _SignatureV4;
    var formatDate = /* @__PURE__ */ __name2((now) => {
      const longDate = iso8601(now).replace(/[\-:]/g, "");
      return {
        longDate,
        shortDate: longDate.slice(0, 8)
      };
    }, "formatDate");
    var getCanonicalHeaderList = /* @__PURE__ */ __name2((headers) => Object.keys(headers).sort().join(";"), "getCanonicalHeaderList");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/submodules/httpAuthSchemes/index.js
var require_httpAuthSchemes = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/submodules/httpAuthSchemes/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var httpAuthSchemes_exports = {};
    __export2(httpAuthSchemes_exports, {
      AWSSDKSigV4Signer: () => AWSSDKSigV4Signer,
      AwsSdkSigV4Signer: () => AwsSdkSigV4Signer,
      resolveAWSSDKSigV4Config: () => resolveAWSSDKSigV4Config,
      resolveAwsSdkSigV4Config: () => resolveAwsSdkSigV4Config
    });
    module2.exports = __toCommonJS2(httpAuthSchemes_exports);
    var import_protocol_http2 = require_dist_cjs2();
    var import_protocol_http = require_dist_cjs2();
    var getDateHeader = /* @__PURE__ */ __name2((response) => {
      var _a, _b;
      return import_protocol_http.HttpResponse.isInstance(response) ? ((_a = response.headers) == null ? void 0 : _a.date) ?? ((_b = response.headers) == null ? void 0 : _b.Date) : void 0;
    }, "getDateHeader");
    var getSkewCorrectedDate = /* @__PURE__ */ __name2((systemClockOffset) => new Date(Date.now() + systemClockOffset), "getSkewCorrectedDate");
    var isClockSkewed = /* @__PURE__ */ __name2((clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 3e5, "isClockSkewed");
    var getUpdatedSystemClockOffset = /* @__PURE__ */ __name2((clockTime, currentSystemClockOffset) => {
      const clockTimeInMs = Date.parse(clockTime);
      if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
      }
      return currentSystemClockOffset;
    }, "getUpdatedSystemClockOffset");
    var throwSigningPropertyError = /* @__PURE__ */ __name2((name, property) => {
      if (!property) {
        throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
      }
      return property;
    }, "throwSigningPropertyError");
    var validateSigningProperties = /* @__PURE__ */ __name2(async (signingProperties) => {
      var _a, _b, _c;
      const context = throwSigningPropertyError(
        "context",
        signingProperties.context
      );
      const config = throwSigningPropertyError("config", signingProperties.config);
      const authScheme = (_c = (_b = (_a = context.endpointV2) == null ? void 0 : _a.properties) == null ? void 0 : _b.authSchemes) == null ? void 0 : _c[0];
      const signerFunction = throwSigningPropertyError(
        "signer",
        config.signer
      );
      const signer = await signerFunction(authScheme);
      const signingRegion = signingProperties == null ? void 0 : signingProperties.signingRegion;
      const signingName = signingProperties == null ? void 0 : signingProperties.signingName;
      return {
        config,
        signer,
        signingRegion,
        signingName
      };
    }, "validateSigningProperties");
    var _AwsSdkSigV4Signer = class _AwsSdkSigV4Signer {
      static {
        __name(this, "_AwsSdkSigV4Signer");
      }
      async sign(httpRequest, identity, signingProperties) {
        if (!import_protocol_http2.HttpRequest.isInstance(httpRequest)) {
          throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        }
        const { config, signer, signingRegion, signingName } = await validateSigningProperties(signingProperties);
        const signedRequest = await signer.sign(httpRequest, {
          signingDate: getSkewCorrectedDate(config.systemClockOffset),
          signingRegion,
          signingService: signingName
        });
        return signedRequest;
      }
      errorHandler(signingProperties) {
        return (error) => {
          const serverTime = error.ServerTime ?? getDateHeader(error.$response);
          if (serverTime) {
            const config = throwSigningPropertyError("config", signingProperties.config);
            const initialSystemClockOffset = config.systemClockOffset;
            config.systemClockOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
            const clockSkewCorrected = config.systemClockOffset !== initialSystemClockOffset;
            if (clockSkewCorrected && error.$metadata) {
              error.$metadata.clockSkewCorrected = true;
            }
          }
          throw error;
        };
      }
      successHandler(httpResponse, signingProperties) {
        const dateHeader = getDateHeader(httpResponse);
        if (dateHeader) {
          const config = throwSigningPropertyError("config", signingProperties.config);
          config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
        }
      }
    };
    __name2(_AwsSdkSigV4Signer, "AwsSdkSigV4Signer");
    var AwsSdkSigV4Signer = _AwsSdkSigV4Signer;
    var AWSSDKSigV4Signer = AwsSdkSigV4Signer;
    var import_core = require_dist_cjs34();
    var import_signature_v4 = require_dist_cjs36();
    var resolveAwsSdkSigV4Config = /* @__PURE__ */ __name2((config) => {
      let normalizedCreds;
      if (config.credentials) {
        normalizedCreds = (0, import_core.memoizeIdentityProvider)(config.credentials, import_core.isIdentityExpired, import_core.doesIdentityRequireRefresh);
      }
      if (!normalizedCreds) {
        if (config.credentialDefaultProvider) {
          normalizedCreds = (0, import_core.normalizeProvider)(
            config.credentialDefaultProvider(
              Object.assign({}, config, {
                parentClientConfig: config
              })
            )
          );
        } else {
          normalizedCreds = /* @__PURE__ */ __name2(async () => {
            throw new Error("`credentials` is missing");
          }, "normalizedCreds");
        }
      }
      const {
        // Default for signingEscapePath
        signingEscapePath = true,
        // Default for systemClockOffset
        systemClockOffset = config.systemClockOffset || 0,
        // No default for sha256 since it is platform dependent
        sha256
      } = config;
      let signer;
      if (config.signer) {
        signer = (0, import_core.normalizeProvider)(config.signer);
      } else if (config.regionInfoProvider) {
        signer = /* @__PURE__ */ __name2(() => (0, import_core.normalizeProvider)(config.region)().then(
          async (region) => [
            await config.regionInfoProvider(region, {
              useFipsEndpoint: await config.useFipsEndpoint(),
              useDualstackEndpoint: await config.useDualstackEndpoint()
            }) || {},
            region
          ]
        ).then(([regionInfo, region]) => {
          const { signingRegion, signingService } = regionInfo;
          config.signingRegion = config.signingRegion || signingRegion || region;
          config.signingName = config.signingName || signingService || config.serviceId;
          const params = {
            ...config,
            credentials: normalizedCreds,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath
          };
          const SignerCtor = config.signerConstructor || import_signature_v4.SignatureV4;
          return new SignerCtor(params);
        }), "signer");
      } else {
        signer = /* @__PURE__ */ __name2(async (authScheme) => {
          authScheme = Object.assign(
            {},
            {
              name: "sigv4",
              signingName: config.signingName || config.defaultSigningName,
              signingRegion: await (0, import_core.normalizeProvider)(config.region)(),
              properties: {}
            },
            authScheme
          );
          const signingRegion = authScheme.signingRegion;
          const signingService = authScheme.signingName;
          config.signingRegion = config.signingRegion || signingRegion;
          config.signingName = config.signingName || signingService || config.serviceId;
          const params = {
            ...config,
            credentials: normalizedCreds,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath
          };
          const SignerCtor = config.signerConstructor || import_signature_v4.SignatureV4;
          return new SignerCtor(params);
        }, "signer");
      }
      return {
        ...config,
        systemClockOffset,
        signingEscapePath,
        credentials: normalizedCreds,
        signer
      };
    }, "resolveAwsSdkSigV4Config");
    var resolveAWSSDKSigV4Config = resolveAwsSdkSigV4Config;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/util.js"(exports2) {
    "use strict";
    var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    var regexName = new RegExp("^" + nameRegexp + "$");
    var getAllMatches = /* @__PURE__ */ __name(function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    }, "getAllMatches");
    var isName = /* @__PURE__ */ __name(function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    }, "isName");
    exports2.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports2.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports2.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports2.getValue = function(v) {
      if (exports2.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports2.isName = isName;
    exports2.getAllMatches = getAllMatches;
    exports2.nameRegexp = nameRegexp;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/validator.js
var require_validator = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/validator.js"(exports2) {
    "use strict";
    var util = require_util();
    var defaultOptions = {
      allowBooleanAttributes: false,
      //A tag can have attributes without any value
      unpairedTags: []
    };
    exports2.validate = function(xmlData, options) {
      options = Object.assign({}, defaultOptions, options);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err)
            return i;
        } else if (xmlData[i] === "<") {
          let tagStartPos = i;
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "Invalid space after '<'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              const attrStrStart = i - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid = validateAttributeString(attrStr, options);
              if (isValid === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
              } else {
                const otg = tags.pop();
                if (tagName !== otg.tagName) {
                  let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                  return getErrorObject(
                    "InvalidTag",
                    "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                    getLineNumberForPosition(xmlData, tagStartPos)
                  );
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid = validateAttributeString(attrStr, options);
              if (isValid !== true) {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else if (options.unpairedTags.indexOf(tagName) !== -1) {
              } else {
                tags.push({ tagName, tagStartPos });
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err)
                    return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              } else {
                if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                  return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
                }
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (isWhiteSpace(xmlData[i])) {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length == 1) {
        return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
      }
      return true;
    };
    function isWhiteSpace(char) {
      return char === " " || char === "	" || char === "\n" || char === "\r";
    }
    __name(isWhiteSpace, "isWhiteSpace");
    function readPI(xmlData, i) {
      const start = i;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {
          const tagname = xmlData.substr(start, i - start);
          if (i > 5 && tagname === "xml") {
            return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
          } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
            i++;
            break;
          } else {
            continue;
          }
        }
      }
      return i;
    }
    __name(readPI, "readPI");
    function readCommentAndCDATA(xmlData, i) {
      if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
        for (i += 3; i < xmlData.length; i++) {
          if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
        let angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            angleBracketsCount++;
          } else if (xmlData[i] === ">") {
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          }
        }
      } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      }
      return i;
    }
    __name(readCommentAndCDATA, "readCommentAndCDATA");
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, i) {
      let attrStr = "";
      let startChar = "";
      let tagClosed = false;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
          if (startChar === "") {
            startChar = xmlData[i];
          } else if (startChar !== xmlData[i]) {
          } else {
            startChar = "";
          }
        } else if (xmlData[i] === ">") {
          if (startChar === "") {
            tagClosed = true;
            break;
          }
        }
        attrStr += xmlData[i];
      }
      if (startChar !== "") {
        return false;
      }
      return {
        value: attrStr,
        index: i,
        tagClosed
      };
    }
    __name(readAttributeStr, "readAttributeStr");
    var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function validateAttributeString(attrStr, options) {
      const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      const attrNames = {};
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1].length === 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
      }
      return true;
    }
    __name(validateAttributeString, "validateAttributeString");
    function validateNumberAmpersand(xmlData, i) {
      let re = /\d/;
      if (xmlData[i] === "x") {
        i++;
        re = /[\da-fA-F]/;
      }
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === ";")
          return i;
        if (!xmlData[i].match(re))
          break;
      }
      return -1;
    }
    __name(validateNumberAmpersand, "validateNumberAmpersand");
    function validateAmpersand(xmlData, i) {
      i++;
      if (xmlData[i] === ";")
        return -1;
      if (xmlData[i] === "#") {
        i++;
        return validateNumberAmpersand(xmlData, i);
      }
      let count = 0;
      for (; i < xmlData.length; i++, count++) {
        if (xmlData[i].match(/\w/) && count < 20)
          continue;
        if (xmlData[i] === ";")
          break;
        return -1;
      }
      return i;
    }
    __name(validateAmpersand, "validateAmpersand");
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code,
          msg: message,
          line: lineNumber.line || lineNumber,
          col: lineNumber.col
        }
      };
    }
    __name(getErrorObject, "getErrorObject");
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    __name(validateAttrName, "validateAttrName");
    function validateTagName(tagname) {
      return util.isName(tagname);
    }
    __name(validateTagName, "validateTagName");
    function getLineNumberForPosition(xmlData, index) {
      const lines = xmlData.substring(0, index).split(/\r?\n/);
      return {
        line: lines.length,
        // column number is last line's length + 1, because column numbering starts at 1:
        col: lines[lines.length - 1].length + 1
      };
    }
    __name(getLineNumberForPosition, "getLineNumberForPosition");
    function getPositionFromMatch(match) {
      return match.startIndex + match[1].length;
    }
    __name(getPositionFromMatch, "getPositionFromMatch");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var require_OptionsBuilder = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js"(exports2) {
    var defaultOptions = {
      preserveOrder: false,
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      removeNSPrefix: false,
      // remove NS from tag name or attribute name if true
      allowBooleanAttributes: false,
      //a tag can have attributes without any value
      //ignoreRootElement : false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      //Trim string values of tag and attributes
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
      },
      tagValueProcessor: function(tagName, val2) {
        return val2;
      },
      attributeValueProcessor: function(attrName, val2) {
        return val2;
      },
      stopNodes: [],
      //nested tags will not be parsed even for errors
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false,
      transformTagName: false,
      transformAttributeName: false,
      updateTag: function(tagName, jPath, attrs) {
        return tagName;
      }
      // skipEmptyListItem: false
    };
    var buildOptions = /* @__PURE__ */ __name(function(options) {
      return Object.assign({}, defaultOptions, options);
    }, "buildOptions");
    exports2.buildOptions = buildOptions;
    exports2.defaultOptions = defaultOptions;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var require_xmlNode = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js"(exports2, module2) {
    "use strict";
    var XmlNode = class {
      static {
        __name(this, "XmlNode");
      }
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[":@"] = {};
      }
      add(key, val2) {
        if (key === "__proto__")
          key = "#__proto__";
        this.child.push({ [key]: val2 });
      }
      addChild(node) {
        if (node.tagname === "__proto__")
          node.tagname = "#__proto__";
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
          this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
        } else {
          this.child.push({ [node.tagname]: node.child });
        }
      }
    };
    module2.exports = XmlNode;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var require_DocTypeReader = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js"(exports2, module2) {
    var util = require_util();
    function readDocType(xmlData, i) {
      const entities = {};
      if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for (; i < xmlData.length; i++) {
          if (xmlData[i] === "<" && !comment) {
            if (hasBody && isEntity(xmlData, i)) {
              i += 7;
              [entityName, val, i] = readEntityExp(xmlData, i + 1);
              if (val.indexOf("&") === -1)
                entities[validateEntityName(entityName)] = {
                  regx: RegExp(`&${entityName};`, "g"),
                  val
                };
            } else if (hasBody && isElement(xmlData, i))
              i += 8;
            else if (hasBody && isAttlist(xmlData, i))
              i += 8;
            else if (hasBody && isNotation(xmlData, i))
              i += 9;
            else if (isComment)
              comment = true;
            else
              throw new Error("Invalid DOCTYPE");
            angleBracketsCount++;
            exp = "";
          } else if (xmlData[i] === ">") {
            if (comment) {
              if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                comment = false;
                angleBracketsCount--;
              }
            } else {
              angleBracketsCount--;
            }
            if (angleBracketsCount === 0) {
              break;
            }
          } else if (xmlData[i] === "[") {
            hasBody = true;
          } else {
            exp += xmlData[i];
          }
        }
        if (angleBracketsCount !== 0) {
          throw new Error(`Unclosed DOCTYPE`);
        }
      } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return { entities, i };
    }
    __name(readDocType, "readDocType");
    function readEntityExp(xmlData, i) {
      let entityName2 = "";
      for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"'); i++) {
        entityName2 += xmlData[i];
      }
      entityName2 = entityName2.trim();
      if (entityName2.indexOf(" ") !== -1)
        throw new Error("External entites are not supported");
      const startChar = xmlData[i++];
      let val2 = "";
      for (; i < xmlData.length && xmlData[i] !== startChar; i++) {
        val2 += xmlData[i];
      }
      return [entityName2, val2, i];
    }
    __name(readEntityExp, "readEntityExp");
    function isComment(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-")
        return true;
      return false;
    }
    __name(isComment, "isComment");
    function isEntity(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y")
        return true;
      return false;
    }
    __name(isEntity, "isEntity");
    function isElement(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T")
        return true;
      return false;
    }
    __name(isElement, "isElement");
    function isAttlist(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T")
        return true;
      return false;
    }
    __name(isAttlist, "isAttlist");
    function isNotation(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N")
        return true;
      return false;
    }
    __name(isNotation, "isNotation");
    function validateEntityName(name) {
      if (util.isName(name))
        return name;
      else
        throw new Error(`Invalid entity name ${name}`);
    }
    __name(validateEntityName, "validateEntityName");
    module2.exports = readDocType;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/strnum/strnum.js
var require_strnum = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/strnum/strnum.js"(exports2, module2) {
    var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
    var numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
    if (!Number.parseInt && window.parseInt) {
      Number.parseInt = window.parseInt;
    }
    if (!Number.parseFloat && window.parseFloat) {
      Number.parseFloat = window.parseFloat;
    }
    var consider = {
      hex: true,
      leadingZeros: true,
      decimalPoint: ".",
      eNotation: true
      //skipLike: /regex/
    };
    function toNumber(str, options = {}) {
      options = Object.assign({}, consider, options);
      if (!str || typeof str !== "string")
        return str;
      let trimmedStr = str.trim();
      if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr))
        return str;
      else if (options.hex && hexRegex.test(trimmedStr)) {
        return Number.parseInt(trimmedStr, 16);
      } else {
        const match = numRegex.exec(trimmedStr);
        if (match) {
          const sign = match[1];
          const leadingZeros = match[2];
          let numTrimmedByZeros = trimZeros(match[3]);
          const eNotation = match[4] || match[6];
          if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".")
            return str;
          else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".")
            return str;
          else {
            const num = Number(trimmedStr);
            const numStr = "" + num;
            if (numStr.search(/[eE]/) !== -1) {
              if (options.eNotation)
                return num;
              else
                return str;
            } else if (eNotation) {
              if (options.eNotation)
                return num;
              else
                return str;
            } else if (trimmedStr.indexOf(".") !== -1) {
              if (numStr === "0" && numTrimmedByZeros === "")
                return num;
              else if (numStr === numTrimmedByZeros)
                return num;
              else if (sign && numStr === "-" + numTrimmedByZeros)
                return num;
              else
                return str;
            }
            if (leadingZeros) {
              if (numTrimmedByZeros === numStr)
                return num;
              else if (sign + numTrimmedByZeros === numStr)
                return num;
              else
                return str;
            }
            if (trimmedStr === numStr)
              return num;
            else if (trimmedStr === sign + numStr)
              return num;
            return str;
          }
        } else {
          return str;
        }
      }
    }
    __name(toNumber, "toNumber");
    function trimZeros(numStr) {
      if (numStr && numStr.indexOf(".") !== -1) {
        numStr = numStr.replace(/0+$/, "");
        if (numStr === ".")
          numStr = "0";
        else if (numStr[0] === ".")
          numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".")
          numStr = numStr.substr(0, numStr.length - 1);
        return numStr;
      }
      return numStr;
    }
    __name(trimZeros, "trimZeros");
    module2.exports = toNumber;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
var require_OrderedObjParser = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js"(exports2, module2) {
    "use strict";
    var util = require_util();
    var xmlNode = require_xmlNode();
    var readDocType = require_DocTypeReader();
    var toNumber = require_strnum();
    var regx = "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, util.nameRegexp);
    var OrderedObjParser = class {
      static {
        __name(this, "OrderedObjParser");
      }
      constructor(options) {
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
          "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
          "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
          "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
          "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
        };
        this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
        this.htmlEntities = {
          "space": { regex: /&(nbsp|#160);/g, val: " " },
          // "lt" : { regex: /&(lt|#60);/g, val: "<" },
          // "gt" : { regex: /&(gt|#62);/g, val: ">" },
          // "amp" : { regex: /&(amp|#38);/g, val: "&" },
          // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
          // "apos" : { regex: /&(apos|#39);/g, val: "'" },
          "cent": { regex: /&(cent|#162);/g, val: "\xA2" },
          "pound": { regex: /&(pound|#163);/g, val: "\xA3" },
          "yen": { regex: /&(yen|#165);/g, val: "\xA5" },
          "euro": { regex: /&(euro|#8364);/g, val: "\u20AC" },
          "copyright": { regex: /&(copy|#169);/g, val: "\xA9" },
          "reg": { regex: /&(reg|#174);/g, val: "\xAE" },
          "inr": { regex: /&(inr|#8377);/g, val: "\u20B9" }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
        this.addChild = addChild;
      }
    };
    function addExternalEntities(externalEntities) {
      const entKeys = Object.keys(externalEntities);
      for (let i = 0; i < entKeys.length; i++) {
        const ent = entKeys[i];
        this.lastEntities[ent] = {
          regex: new RegExp("&" + ent + ";", "g"),
          val: externalEntities[ent]
        };
      }
    }
    __name(addExternalEntities, "addExternalEntities");
    function parseTextData(val2, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
      if (val2 !== void 0) {
        if (this.options.trimValues && !dontTrim) {
          val2 = val2.trim();
        }
        if (val2.length > 0) {
          if (!escapeEntities)
            val2 = this.replaceEntitiesValue(val2);
          const newval = this.options.tagValueProcessor(tagName, val2, jPath, hasAttributes, isLeafNode);
          if (newval === null || newval === void 0) {
            return val2;
          } else if (typeof newval !== typeof val2 || newval !== val2) {
            return newval;
          } else if (this.options.trimValues) {
            return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
          } else {
            const trimmedVal = val2.trim();
            if (trimmedVal === val2) {
              return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
            } else {
              return val2;
            }
          }
        }
      }
    }
    __name(parseTextData, "parseTextData");
    function resolveNameSpace(tagname) {
      if (this.options.removeNSPrefix) {
        const tags = tagname.split(":");
        const prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
          return "";
        }
        if (tags.length === 2) {
          tagname = prefix + tags[1];
        }
      }
      return tagname;
    }
    __name(resolveNameSpace, "resolveNameSpace");
    var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    function buildAttributesMap(attrStr, jPath, tagName) {
      if (!this.options.ignoreAttributes && typeof attrStr === "string") {
        const matches = util.getAllMatches(attrStr, attrsRegx);
        const len = matches.length;
        const attrs = {};
        for (let i = 0; i < len; i++) {
          const attrName = this.resolveNameSpace(matches[i][1]);
          let oldVal = matches[i][4];
          let aName = this.options.attributeNamePrefix + attrName;
          if (attrName.length) {
            if (this.options.transformAttributeName) {
              aName = this.options.transformAttributeName(aName);
            }
            if (aName === "__proto__")
              aName = "#__proto__";
            if (oldVal !== void 0) {
              if (this.options.trimValues) {
                oldVal = oldVal.trim();
              }
              oldVal = this.replaceEntitiesValue(oldVal);
              const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
              if (newVal === null || newVal === void 0) {
                attrs[aName] = oldVal;
              } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
                attrs[aName] = newVal;
              } else {
                attrs[aName] = parseValue(
                  oldVal,
                  this.options.parseAttributeValue,
                  this.options.numberParseOptions
                );
              }
            } else if (this.options.allowBooleanAttributes) {
              attrs[aName] = true;
            }
          }
        }
        if (!Object.keys(attrs).length) {
          return;
        }
        if (this.options.attributesGroupName) {
          const attrCollection = {};
          attrCollection[this.options.attributesGroupName] = attrs;
          return attrCollection;
        }
        return attrs;
      }
    }
    __name(buildAttributesMap, "buildAttributesMap");
    var parseXml = /* @__PURE__ */ __name(function(xmlData) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      let jPath = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (this.options.removeNSPrefix) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode) {
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
            }
            const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
            if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
              throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
            }
            let propIndex = 0;
            if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
              propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
              this.tagsNodeStack.pop();
            } else {
              propIndex = jPath.lastIndexOf(".");
            }
            jPath = jPath.substring(0, propIndex);
            currentNode = this.tagsNodeStack.pop();
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            let tagData = readTagExp(xmlData, i, false, "?>");
            if (!tagData)
              throw new Error("Pi Tag is not closed.");
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {
            } else {
              const childNode = new xmlNode(tagData.tagName);
              childNode.add(this.options.textNodeName, "");
              if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
              }
              this.addChild(currentNode, childNode, jPath);
            }
            i = tagData.closeIndex + 1;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const comment = xmlData.substring(i + 4, endIndex - 2);
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
              currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
            }
            i = endIndex;
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const result = readDocType(xmlData, i);
            this.docTypeEntities = result.entities;
            i = result.i;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.cdataPropName) {
              currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
            } else {
              let val2 = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true);
              if (val2 == void 0)
                val2 = "";
              currentNode.add(this.options.textNodeName, val2);
            }
            i = closeIndex + 2;
          } else {
            let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
            let tagName = result.tagName;
            let tagExp = result.tagExp;
            let attrExpPresent = result.attrExpPresent;
            let closeIndex = result.closeIndex;
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
              }
            }
            const lastTag = currentNode;
            if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
              currentNode = this.tagsNodeStack.pop();
              jPath = jPath.substring(0, jPath.lastIndexOf("."));
            }
            if (tagName !== xmlObj.tagname) {
              jPath += jPath ? "." + tagName : tagName;
            }
            if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
              let tagContent = "";
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                i = result.closeIndex;
              } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                i = result.closeIndex;
              } else {
                const result2 = this.readStopNodeData(xmlData, tagName, closeIndex + 1);
                if (!result2)
                  throw new Error(`Unexpected end of ${tagName}`);
                i = result2.i;
                tagContent = result2.tagContent;
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              if (tagContent) {
                tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
              }
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
              childNode.add(this.options.textNodeName, tagContent);
              this.addChild(currentNode, childNode, jPath);
            } else {
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                if (this.options.transformTagName) {
                  tagName = this.options.transformTagName(tagName);
                }
                const childNode = new xmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                jPath = jPath.substr(0, jPath.lastIndexOf("."));
              } else {
                const childNode = new xmlNode(tagName);
                this.tagsNodeStack.push(currentNode);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                currentNode = childNode;
              }
              textData = "";
              i = closeIndex;
            }
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj.child;
    }, "parseXml");
    function addChild(currentNode, childNode, jPath) {
      const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
      if (result === false) {
      } else if (typeof result === "string") {
        childNode.tagname = result;
        currentNode.addChild(childNode);
      } else {
        currentNode.addChild(childNode);
      }
    }
    __name(addChild, "addChild");
    var replaceEntitiesValue = /* @__PURE__ */ __name(function(val2) {
      if (this.options.processEntities) {
        for (let entityName2 in this.docTypeEntities) {
          const entity = this.docTypeEntities[entityName2];
          val2 = val2.replace(entity.regx, entity.val);
        }
        for (let entityName2 in this.lastEntities) {
          const entity = this.lastEntities[entityName2];
          val2 = val2.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
          for (let entityName2 in this.htmlEntities) {
            const entity = this.htmlEntities[entityName2];
            val2 = val2.replace(entity.regex, entity.val);
          }
        }
        val2 = val2.replace(this.ampEntity.regex, this.ampEntity.val);
      }
      return val2;
    }, "replaceEntitiesValue");
    function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
      if (textData) {
        if (isLeafNode === void 0)
          isLeafNode = Object.keys(currentNode.child).length === 0;
        textData = this.parseTextData(
          textData,
          currentNode.tagname,
          jPath,
          false,
          currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
          isLeafNode
        );
        if (textData !== void 0 && textData !== "")
          currentNode.add(this.options.textNodeName, textData);
        textData = "";
      }
      return textData;
    }
    __name(saveTextToParentTag, "saveTextToParentTag");
    function isItStopNode(stopNodes, jPath, currentTagName) {
      const allNodesExp = "*." + currentTagName;
      for (const stopNodePath in stopNodes) {
        const stopNodeExp = stopNodes[stopNodePath];
        if (allNodesExp === stopNodeExp || jPath === stopNodeExp)
          return true;
      }
      return false;
    }
    __name(isItStopNode, "isItStopNode");
    function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
      let attrBoundary;
      let tagExp = "";
      for (let index = i; index < xmlData.length; index++) {
        let ch = xmlData[index];
        if (attrBoundary) {
          if (ch === attrBoundary)
            attrBoundary = "";
        } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
        } else if (ch === closingChar[0]) {
          if (closingChar[1]) {
            if (xmlData[index + 1] === closingChar[1]) {
              return {
                data: tagExp,
                index
              };
            }
          } else {
            return {
              data: tagExp,
              index
            };
          }
        } else if (ch === "	") {
          ch = " ";
        }
        tagExp += ch;
      }
    }
    __name(tagExpWithClosingIndex, "tagExpWithClosingIndex");
    function findClosingIndex(xmlData, str, i, errMsg) {
      const closingIndex = xmlData.indexOf(str, i);
      if (closingIndex === -1) {
        throw new Error(errMsg);
      } else {
        return closingIndex + str.length - 1;
      }
    }
    __name(findClosingIndex, "findClosingIndex");
    function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
      const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
      if (!result)
        return;
      let tagExp = result.data;
      const closeIndex = result.index;
      const separatorIndex = tagExp.search(/\s/);
      let tagName = tagExp;
      let attrExpPresent = true;
      if (separatorIndex !== -1) {
        tagName = tagExp.substr(0, separatorIndex).replace(/\s\s*$/, "");
        tagExp = tagExp.substr(separatorIndex + 1);
      }
      if (removeNSPrefix) {
        const colonIndex = tagName.indexOf(":");
        if (colonIndex !== -1) {
          tagName = tagName.substr(colonIndex + 1);
          attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
        }
      }
      return {
        tagName,
        tagExp,
        closeIndex,
        attrExpPresent
      };
    }
    __name(readTagExp, "readTagExp");
    function readStopNodeData(xmlData, tagName, i) {
      const startIndex = i;
      let openTagCount = 1;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
            let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
            if (closeTagName === tagName) {
              openTagCount--;
              if (openTagCount === 0) {
                return {
                  tagContent: xmlData.substring(startIndex, i),
                  i: closeIndex
                };
              }
            }
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
            i = closeIndex;
          } else {
            const tagData = readTagExp(xmlData, i, ">");
            if (tagData) {
              const openTagName = tagData && tagData.tagName;
              if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
                openTagCount++;
              }
              i = tagData.closeIndex;
            }
          }
        }
      }
    }
    __name(readStopNodeData, "readStopNodeData");
    function parseValue(val2, shouldParse, options) {
      if (shouldParse && typeof val2 === "string") {
        const newval = val2.trim();
        if (newval === "true")
          return true;
        else if (newval === "false")
          return false;
        else
          return toNumber(val2, options);
      } else {
        if (util.isExist(val2)) {
          return val2;
        } else {
          return "";
        }
      }
    }
    __name(parseValue, "parseValue");
    module2.exports = OrderedObjParser;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/node2json.js
var require_node2json = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/node2json.js"(exports2) {
    "use strict";
    function prettify(node, options) {
      return compress(node, options);
    }
    __name(prettify, "prettify");
    function compress(arr, options, jPath) {
      let text;
      const compressedObj = {};
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const property = propName(tagObj);
        let newJpath = "";
        if (jPath === void 0)
          newJpath = property;
        else
          newJpath = jPath + "." + property;
        if (property === options.textNodeName) {
          if (text === void 0)
            text = tagObj[property];
          else
            text += "" + tagObj[property];
        } else if (property === void 0) {
          continue;
        } else if (tagObj[property]) {
          let val2 = compress(tagObj[property], options, newJpath);
          const isLeaf = isLeafTag(val2, options);
          if (tagObj[":@"]) {
            assignAttributes(val2, tagObj[":@"], newJpath, options);
          } else if (Object.keys(val2).length === 1 && val2[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
            val2 = val2[options.textNodeName];
          } else if (Object.keys(val2).length === 0) {
            if (options.alwaysCreateTextNode)
              val2[options.textNodeName] = "";
            else
              val2 = "";
          }
          if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
            if (!Array.isArray(compressedObj[property])) {
              compressedObj[property] = [compressedObj[property]];
            }
            compressedObj[property].push(val2);
          } else {
            if (options.isArray(property, newJpath, isLeaf)) {
              compressedObj[property] = [val2];
            } else {
              compressedObj[property] = val2;
            }
          }
        }
      }
      if (typeof text === "string") {
        if (text.length > 0)
          compressedObj[options.textNodeName] = text;
      } else if (text !== void 0)
        compressedObj[options.textNodeName] = text;
      return compressedObj;
    }
    __name(compress, "compress");
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@")
          return key;
      }
    }
    __name(propName, "propName");
    function assignAttributes(obj, attrMap, jpath, options) {
      if (attrMap) {
        const keys = Object.keys(attrMap);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          const atrrName = keys[i];
          if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
            obj[atrrName] = [attrMap[atrrName]];
          } else {
            obj[atrrName] = attrMap[atrrName];
          }
        }
      }
    }
    __name(assignAttributes, "assignAttributes");
    function isLeafTag(obj, options) {
      const { textNodeName } = options;
      const propCount = Object.keys(obj).length;
      if (propCount === 0) {
        return true;
      }
      if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
        return true;
      }
      return false;
    }
    __name(isLeafTag, "isLeafTag");
    exports2.prettify = prettify;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var require_XMLParser = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js"(exports2, module2) {
    var { buildOptions } = require_OptionsBuilder();
    var OrderedObjParser = require_OrderedObjParser();
    var { prettify } = require_node2json();
    var validator = require_validator();
    var XMLParser = class {
      static {
        __name(this, "XMLParser");
      }
      constructor(options) {
        this.externalEntities = {};
        this.options = buildOptions(options);
      }
      /**
       * Parse XML dats to JS object 
       * @param {string|Buffer} xmlData 
       * @param {boolean|Object} validationOption 
       */
      parse(xmlData, validationOption) {
        if (typeof xmlData === "string") {
        } else if (xmlData.toString) {
          xmlData = xmlData.toString();
        } else {
          throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
          if (validationOption === true)
            validationOption = {};
          const result = validator.validate(xmlData, validationOption);
          if (result !== true) {
            throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
          }
        }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === void 0)
          return orderedResult;
        else
          return prettify(orderedResult, this.options);
      }
      /**
       * Add Entity which is not by default supported by this library
       * @param {string} key 
       * @param {string} value 
       */
      addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
          throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else if (value === "&") {
          throw new Error("An entity with value '&' is not permitted");
        } else {
          this.externalEntities[key] = value;
        }
      }
    };
    module2.exports = XMLParser;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js
var require_orderedJs2Xml = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js"(exports2, module2) {
    var EOL = "\n";
    function toXml(jArray, options) {
      let indentation = "";
      if (options.format && options.indentBy.length > 0) {
        indentation = EOL;
      }
      return arrToStr(jArray, options, "", indentation);
    }
    __name(toXml, "toXml");
    function arrToStr(arr, options, jPath, indentation) {
      let xmlStr = "";
      let isPreviousElementTag = false;
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const tagName = propName(tagObj);
        let newJPath = "";
        if (jPath.length === 0)
          newJPath = tagName;
        else
          newJPath = `${jPath}.${tagName}`;
        if (tagName === options.textNodeName) {
          let tagText = tagObj[tagName];
          if (!isStopNode(newJPath, options)) {
            tagText = options.tagValueProcessor(tagName, tagText);
            tagText = replaceEntitiesValue(tagText, options);
          }
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += tagText;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.cdataPropName) {
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.commentPropName) {
          xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
          isPreviousElementTag = true;
          continue;
        } else if (tagName[0] === "?") {
          const attStr2 = attr_to_str(tagObj[":@"], options);
          const tempInd = tagName === "?xml" ? "" : indentation;
          let piTextNodeName = tagObj[tagName][0][options.textNodeName];
          piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
          xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
          isPreviousElementTag = true;
          continue;
        }
        let newIdentation = indentation;
        if (newIdentation !== "") {
          newIdentation += options.indentBy;
        }
        const attStr = attr_to_str(tagObj[":@"], options);
        const tagStart = indentation + `<${tagName}${attStr}`;
        const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
        if (options.unpairedTags.indexOf(tagName) !== -1) {
          if (options.suppressUnpairedNode)
            xmlStr += tagStart + ">";
          else
            xmlStr += tagStart + "/>";
        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
          xmlStr += tagStart + "/>";
        } else if (tagValue && tagValue.endsWith(">")) {
          xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
        } else {
          xmlStr += tagStart + ">";
          if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
            xmlStr += indentation + options.indentBy + tagValue + indentation;
          } else {
            xmlStr += tagValue;
          }
          xmlStr += `</${tagName}>`;
        }
        isPreviousElementTag = true;
      }
      return xmlStr;
    }
    __name(arrToStr, "arrToStr");
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@")
          return key;
      }
    }
    __name(propName, "propName");
    function attr_to_str(attrMap, options) {
      let attrStr = "";
      if (attrMap && !options.ignoreAttributes) {
        for (let attr in attrMap) {
          let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
          attrVal = replaceEntitiesValue(attrVal, options);
          if (attrVal === true && options.suppressBooleanAttributes) {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
          } else {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
          }
        }
      }
      return attrStr;
    }
    __name(attr_to_str, "attr_to_str");
    function isStopNode(jPath, options) {
      jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
      let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
      for (let index in options.stopNodes) {
        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName)
          return true;
      }
      return false;
    }
    __name(isStopNode, "isStopNode");
    function replaceEntitiesValue(textValue, options) {
      if (textValue && textValue.length > 0 && options.processEntities) {
        for (let i = 0; i < options.entities.length; i++) {
          const entity = options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    }
    __name(replaceEntitiesValue, "replaceEntitiesValue");
    module2.exports = toXml;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
var require_json2xml = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js"(exports2, module2) {
    "use strict";
    var buildFromOrderedJs = require_orderedJs2Xml();
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataPropName: false,
      format: false,
      indentBy: "  ",
      suppressEmptyNode: false,
      suppressUnpairedNode: true,
      suppressBooleanAttributes: true,
      tagValueProcessor: function(key, a) {
        return a;
      },
      attributeValueProcessor: function(attrName, a) {
        return a;
      },
      preserveOrder: false,
      commentPropName: false,
      unpairedTags: [],
      entities: [
        { regex: new RegExp("&", "g"), val: "&amp;" },
        //it must be on top
        { regex: new RegExp(">", "g"), val: "&gt;" },
        { regex: new RegExp("<", "g"), val: "&lt;" },
        { regex: new RegExp("'", "g"), val: "&apos;" },
        { regex: new RegExp('"', "g"), val: "&quot;" }
      ],
      processEntities: true,
      stopNodes: [],
      // transformTagName: false,
      // transformAttributeName: false,
      oneListGroup: false
    };
    function Builder(options) {
      this.options = Object.assign({}, defaultOptions, options);
      if (this.options.ignoreAttributes || this.options.attributesGroupName) {
        this.isAttribute = function() {
          return false;
        };
      } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
      }
      this.processTextOrObjNode = processTextOrObjNode;
      if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
      } else {
        this.indentate = function() {
          return "";
        };
        this.tagEndChar = ">";
        this.newLine = "";
      }
    }
    __name(Builder, "Builder");
    Builder.prototype.build = function(jObj) {
      if (this.options.preserveOrder) {
        return buildFromOrderedJs(jObj, this.options);
      } else {
        if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
          jObj = {
            [this.options.arrayNodeName]: jObj
          };
        }
        return this.j2x(jObj, 0).val;
      }
    };
    Builder.prototype.j2x = function(jObj, level) {
      let attrStr = "";
      let val2 = "";
      for (let key in jObj) {
        if (typeof jObj[key] === "undefined") {
        } else if (jObj[key] === null) {
          if (key[0] === "?")
            val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          else
            val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
        } else if (jObj[key] instanceof Date) {
          val2 += this.buildTextValNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr) {
            attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
          } else {
            if (key === this.options.textNodeName) {
              let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
              val2 += this.replaceEntitiesValue(newval);
            } else {
              val2 += this.buildTextValNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          const arrLen = jObj[key].length;
          let listTagVal = "";
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined") {
            } else if (item === null) {
              if (key[0] === "?")
                val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
              else
                val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              if (this.options.oneListGroup) {
                listTagVal += this.j2x(item, level + 1).val;
              } else {
                listTagVal += this.processTextOrObjNode(item, key, level);
              }
            } else {
              listTagVal += this.buildTextValNode(item, key, "", level);
            }
          }
          if (this.options.oneListGroup) {
            listTagVal = this.buildObjectNode(listTagVal, key, "", level);
          }
          val2 += listTagVal;
        } else {
          if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
            }
          } else {
            val2 += this.processTextOrObjNode(jObj[key], key, level);
          }
        }
      }
      return { attrStr, val: val2 };
    };
    Builder.prototype.buildAttrPairStr = function(attrName, val2) {
      val2 = this.options.attributeValueProcessor(attrName, "" + val2);
      val2 = this.replaceEntitiesValue(val2);
      if (this.options.suppressBooleanAttributes && val2 === "true") {
        return " " + attrName;
      } else
        return " " + attrName + '="' + val2 + '"';
    };
    function processTextOrObjNode(object, key, level) {
      const result = this.j2x(object, level + 1);
      if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
        return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
      } else {
        return this.buildObjectNode(result.val, key, result.attrStr, level);
      }
    }
    __name(processTextOrObjNode, "processTextOrObjNode");
    Builder.prototype.buildObjectNode = function(val2, key, attrStr, level) {
      if (val2 === "") {
        if (key[0] === "?")
          return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        }
      } else {
        let tagEndExp = "</" + key + this.tagEndChar;
        let piClosingChar = "";
        if (key[0] === "?") {
          piClosingChar = "?";
          tagEndExp = "";
        }
        if (attrStr && val2.indexOf("<") === -1) {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val2 + tagEndExp;
        } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
          return this.indentate(level) + `<!--${val2}-->` + this.newLine;
        } else {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val2 + this.indentate(level) + tagEndExp;
        }
      }
    };
    Builder.prototype.closeTag = function(key) {
      let closeTag = "";
      if (this.options.unpairedTags.indexOf(key) !== -1) {
        if (!this.options.suppressUnpairedNode)
          closeTag = "/";
      } else if (this.options.suppressEmptyNode) {
        closeTag = "/";
      } else {
        closeTag = `></${key}`;
      }
      return closeTag;
    };
    Builder.prototype.buildTextValNode = function(val2, key, attrStr, level) {
      if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
        return this.indentate(level) + `<![CDATA[${val2}]]>` + this.newLine;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
        return this.indentate(level) + `<!--${val2}-->` + this.newLine;
      } else if (key[0] === "?") {
        return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      } else {
        let textValue = this.options.tagValueProcessor(key, val2);
        textValue = this.replaceEntitiesValue(textValue);
        if (textValue === "") {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        } else {
          return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
        }
      }
    };
    Builder.prototype.replaceEntitiesValue = function(textValue) {
      if (textValue && textValue.length > 0 && this.options.processEntities) {
        for (let i = 0; i < this.options.entities.length; i++) {
          const entity = this.options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    };
    function indentate(level) {
      return this.options.indentBy.repeat(level);
    }
    __name(indentate, "indentate");
    function isAttribute(name) {
      if (name.startsWith(this.options.attributeNamePrefix)) {
        return name.substr(this.attrPrefixLen);
      } else {
        return false;
      }
    }
    __name(isAttribute, "isAttribute");
    module2.exports = Builder;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/fxp.js
var require_fxp = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/fast-xml-parser/src/fxp.js"(exports2, module2) {
    "use strict";
    var validator = require_validator();
    var XMLParser = require_XMLParser();
    var XMLBuilder = require_json2xml();
    module2.exports = {
      XMLParser,
      XMLValidator: validator,
      XMLBuilder
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/submodules/protocols/index.js
var require_protocols = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/submodules/protocols/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var protocols_exports = {};
    __export2(protocols_exports, {
      _toBool: () => _toBool,
      _toNum: () => _toNum,
      _toStr: () => _toStr,
      awsExpectUnion: () => awsExpectUnion,
      loadRestJsonErrorCode: () => loadRestJsonErrorCode,
      loadRestXmlErrorCode: () => loadRestXmlErrorCode,
      parseJsonBody: () => parseJsonBody,
      parseJsonErrorBody: () => parseJsonErrorBody,
      parseXmlBody: () => parseXmlBody,
      parseXmlErrorBody: () => parseXmlErrorBody
    });
    module2.exports = __toCommonJS2(protocols_exports);
    var _toStr = /* @__PURE__ */ __name2((val2) => {
      if (val2 == null) {
        return val2;
      }
      if (typeof val2 === "number" || typeof val2 === "bigint") {
        const warning = new Error(`Received number ${val2} where a string was expected.`);
        warning.name = "Warning";
        console.warn(warning);
        return String(val2);
      }
      if (typeof val2 === "boolean") {
        const warning = new Error(`Received boolean ${val2} where a string was expected.`);
        warning.name = "Warning";
        console.warn(warning);
        return String(val2);
      }
      return val2;
    }, "_toStr");
    var _toBool = /* @__PURE__ */ __name2((val2) => {
      if (val2 == null) {
        return val2;
      }
      if (typeof val2 === "number") {
      }
      if (typeof val2 === "string") {
        const lowercase = val2.toLowerCase();
        if (val2 !== "" && lowercase !== "false" && lowercase !== "true") {
          const warning = new Error(`Received string "${val2}" where a boolean was expected.`);
          warning.name = "Warning";
          console.warn(warning);
        }
        return val2 !== "" && lowercase !== "false";
      }
      return val2;
    }, "_toBool");
    var _toNum = /* @__PURE__ */ __name2((val2) => {
      if (val2 == null) {
        return val2;
      }
      if (typeof val2 === "boolean") {
      }
      if (typeof val2 === "string") {
        const num = Number(val2);
        if (num.toString() !== val2) {
          const warning = new Error(`Received string "${val2}" where a number was expected.`);
          warning.name = "Warning";
          console.warn(warning);
          return val2;
        }
        return num;
      }
      return val2;
    }, "_toNum");
    var import_smithy_client = require_dist_cjs15();
    var awsExpectUnion = /* @__PURE__ */ __name2((value) => {
      if (value == null) {
        return void 0;
      }
      if (typeof value === "object" && "__type" in value) {
        delete value.__type;
      }
      return (0, import_smithy_client.expectUnion)(value);
    }, "awsExpectUnion");
    var import_smithy_client2 = require_dist_cjs15();
    var collectBodyString = /* @__PURE__ */ __name2((streamBody, context) => (0, import_smithy_client2.collectBody)(streamBody, context).then((body) => context.utf8Encoder(body)), "collectBodyString");
    var parseJsonBody = /* @__PURE__ */ __name2((streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
      if (encoded.length) {
        try {
          return JSON.parse(encoded);
        } catch (e) {
          if ((e == null ? void 0 : e.name) === "SyntaxError") {
            Object.defineProperty(e, "$responseBodyText", {
              value: encoded
            });
          }
          throw e;
        }
      }
      return {};
    }), "parseJsonBody");
    var parseJsonErrorBody = /* @__PURE__ */ __name2(async (errorBody, context) => {
      const value = await parseJsonBody(errorBody, context);
      value.message = value.message ?? value.Message;
      return value;
    }, "parseJsonErrorBody");
    var loadRestJsonErrorCode = /* @__PURE__ */ __name2((output, data) => {
      const findKey = /* @__PURE__ */ __name2((object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase()), "findKey");
      const sanitizeErrorCode = /* @__PURE__ */ __name2((rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
          cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
          cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
          cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
          cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
      }, "sanitizeErrorCode");
      const headerKey = findKey(output.headers, "x-amzn-errortype");
      if (headerKey !== void 0) {
        return sanitizeErrorCode(output.headers[headerKey]);
      }
      if (data.code !== void 0) {
        return sanitizeErrorCode(data.code);
      }
      if (data["__type"] !== void 0) {
        return sanitizeErrorCode(data["__type"]);
      }
    }, "loadRestJsonErrorCode");
    var import_smithy_client3 = require_dist_cjs15();
    var import_fast_xml_parser = require_fxp();
    var parseXmlBody = /* @__PURE__ */ __name2((streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
      if (encoded.length) {
        const parser = new import_fast_xml_parser.XMLParser({
          attributeNamePrefix: "",
          htmlEntities: true,
          ignoreAttributes: false,
          ignoreDeclaration: true,
          parseTagValue: false,
          trimValues: false,
          tagValueProcessor: (_, val2) => val2.trim() === "" && val2.includes("\n") ? "" : void 0
        });
        parser.addEntity("#xD", "\r");
        parser.addEntity("#10", "\n");
        let parsedObj;
        try {
          parsedObj = parser.parse(encoded, true);
        } catch (e) {
          if (e && typeof e === "object") {
            Object.defineProperty(e, "$responseBodyText", {
              value: encoded
            });
          }
          throw e;
        }
        const textNodeName = "#text";
        const key = Object.keys(parsedObj)[0];
        const parsedObjToReturn = parsedObj[key];
        if (parsedObjToReturn[textNodeName]) {
          parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
          delete parsedObjToReturn[textNodeName];
        }
        return (0, import_smithy_client3.getValueFromTextNode)(parsedObjToReturn);
      }
      return {};
    }), "parseXmlBody");
    var parseXmlErrorBody = /* @__PURE__ */ __name2(async (errorBody, context) => {
      const value = await parseXmlBody(errorBody, context);
      if (value.Error) {
        value.Error.message = value.Error.message ?? value.Error.Message;
      }
      return value;
    }, "parseXmlErrorBody");
    var loadRestXmlErrorCode = /* @__PURE__ */ __name2((output, data) => {
      var _a;
      if (((_a = data == null ? void 0 : data.Error) == null ? void 0 : _a.Code) !== void 0) {
        return data.Error.Code;
      }
      if ((data == null ? void 0 : data.Code) !== void 0) {
        return data.Code;
      }
      if (output.statusCode == 404) {
        return "NotFound";
      }
    }, "loadRestXmlErrorCode");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/index.js
var require_dist_cjs37 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/core/dist-cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_client(), exports2);
    tslib_1.__exportStar(require_httpAuthSchemes(), exports2);
    tslib_1.__exportStar(require_protocols(), exports2);
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/auth/httpAuthSchemeProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.resolveHttpAuthSchemeConfig = exports2.defaultSQSHttpAuthSchemeProvider = exports2.defaultSQSHttpAuthSchemeParametersProvider = void 0;
    var core_1 = require_dist_cjs37();
    var util_middleware_1 = require_dist_cjs22();
    var defaultSQSHttpAuthSchemeParametersProvider = /* @__PURE__ */ __name(async (config, context, input) => {
      return {
        operation: (0, util_middleware_1.getSmithyContext)(context).operation,
        region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
      };
    }, "defaultSQSHttpAuthSchemeParametersProvider");
    exports2.defaultSQSHttpAuthSchemeParametersProvider = defaultSQSHttpAuthSchemeParametersProvider;
    function createAwsAuthSigv4HttpAuthOption(authParameters) {
      return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
          name: "sqs",
          region: authParameters.region
        },
        propertiesExtractor: (config, context) => ({
          signingProperties: {
            config,
            context
          }
        })
      };
    }
    __name(createAwsAuthSigv4HttpAuthOption, "createAwsAuthSigv4HttpAuthOption");
    var defaultSQSHttpAuthSchemeProvider = /* @__PURE__ */ __name((authParameters) => {
      const options = [];
      switch (authParameters.operation) {
        default: {
          options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
      }
      return options;
    }, "defaultSQSHttpAuthSchemeProvider");
    exports2.defaultSQSHttpAuthSchemeProvider = defaultSQSHttpAuthSchemeProvider;
    var resolveHttpAuthSchemeConfig = /* @__PURE__ */ __name((config) => {
      const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
      return {
        ...config_0
      };
    }, "resolveHttpAuthSchemeConfig");
    exports2.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/package.json
var require_package = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/package.json"(exports2, module2) {
    module2.exports = {
      name: "@aws-sdk/client-sqs",
      description: "AWS SDK for JavaScript Sqs Client for Node.js, Browser and React Native",
      version: "3.577.0",
      scripts: {
        build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
        "build:cjs": "node ../../scripts/compilation/inline client-sqs",
        "build:es": "tsc -p tsconfig.es.json",
        "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
        "build:types": "tsc -p tsconfig.types.json",
        "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
        clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
        "extract:docs": "api-extractor run --local",
        "generate:client": "node ../../scripts/generate-clients/single-service --solo sqs"
      },
      main: "./dist-cjs/index.js",
      types: "./dist-types/index.d.ts",
      module: "./dist-es/index.js",
      sideEffects: false,
      dependencies: {
        "@aws-crypto/sha256-browser": "3.0.0",
        "@aws-crypto/sha256-js": "3.0.0",
        "@aws-sdk/client-sso-oidc": "3.577.0",
        "@aws-sdk/client-sts": "3.577.0",
        "@aws-sdk/core": "3.576.0",
        "@aws-sdk/credential-provider-node": "3.577.0",
        "@aws-sdk/middleware-host-header": "3.577.0",
        "@aws-sdk/middleware-logger": "3.577.0",
        "@aws-sdk/middleware-recursion-detection": "3.577.0",
        "@aws-sdk/middleware-sdk-sqs": "3.577.0",
        "@aws-sdk/middleware-user-agent": "3.577.0",
        "@aws-sdk/region-config-resolver": "3.577.0",
        "@aws-sdk/types": "3.577.0",
        "@aws-sdk/util-endpoints": "3.577.0",
        "@aws-sdk/util-user-agent-browser": "3.577.0",
        "@aws-sdk/util-user-agent-node": "3.577.0",
        "@smithy/config-resolver": "^3.0.0",
        "@smithy/core": "^2.0.0",
        "@smithy/fetch-http-handler": "^3.0.0",
        "@smithy/hash-node": "^3.0.0",
        "@smithy/invalid-dependency": "^3.0.0",
        "@smithy/md5-js": "^3.0.0",
        "@smithy/middleware-content-length": "^3.0.0",
        "@smithy/middleware-endpoint": "^3.0.0",
        "@smithy/middleware-retry": "^3.0.0",
        "@smithy/middleware-serde": "^3.0.0",
        "@smithy/middleware-stack": "^3.0.0",
        "@smithy/node-config-provider": "^3.0.0",
        "@smithy/node-http-handler": "^3.0.0",
        "@smithy/protocol-http": "^4.0.0",
        "@smithy/smithy-client": "^3.0.0",
        "@smithy/types": "^3.0.0",
        "@smithy/url-parser": "^3.0.0",
        "@smithy/util-base64": "^3.0.0",
        "@smithy/util-body-length-browser": "^3.0.0",
        "@smithy/util-body-length-node": "^3.0.0",
        "@smithy/util-defaults-mode-browser": "^3.0.0",
        "@smithy/util-defaults-mode-node": "^3.0.0",
        "@smithy/util-endpoints": "^2.0.0",
        "@smithy/util-middleware": "^3.0.0",
        "@smithy/util-retry": "^3.0.0",
        "@smithy/util-utf8": "^3.0.0",
        tslib: "^2.6.2"
      },
      devDependencies: {
        "@tsconfig/node16": "16.1.3",
        "@types/node": "^16.18.96",
        concurrently: "7.0.0",
        "downlevel-dts": "0.10.1",
        rimraf: "3.0.2",
        typescript: "~4.9.5"
      },
      engines: {
        node: ">=16.0.0"
      },
      typesVersions: {
        "<4.0": {
          "dist-types/*": [
            "dist-types/ts3.4/*"
          ]
        }
      },
      files: [
        "dist-*/**"
      ],
      author: {
        name: "AWS SDK for JavaScript Team",
        url: "https://aws.amazon.com/javascript/"
      },
      license: "Apache-2.0",
      browser: {
        "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
      },
      "react-native": {
        "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
      },
      homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-sqs",
      repository: {
        type: "git",
        url: "https://github.com/aws/aws-sdk-js-v3.git",
        directory: "clients/client-sqs"
      }
    };
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-env/dist-cjs/index.js
var require_dist_cjs38 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-env/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      ENV_CREDENTIAL_SCOPE: () => ENV_CREDENTIAL_SCOPE,
      ENV_EXPIRATION: () => ENV_EXPIRATION,
      ENV_KEY: () => ENV_KEY,
      ENV_SECRET: () => ENV_SECRET,
      ENV_SESSION: () => ENV_SESSION,
      fromEnv: () => fromEnv
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_property_provider = require_dist_cjs24();
    var ENV_KEY = "AWS_ACCESS_KEY_ID";
    var ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
    var ENV_SESSION = "AWS_SESSION_TOKEN";
    var ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
    var ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
    var fromEnv = /* @__PURE__ */ __name2((init) => async () => {
      var _a;
      (_a = init == null ? void 0 : init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-env", "fromEnv");
      const accessKeyId = process.env[ENV_KEY];
      const secretAccessKey = process.env[ENV_SECRET];
      const sessionToken = process.env[ENV_SESSION];
      const expiry = process.env[ENV_EXPIRATION];
      const credentialScope = process.env[ENV_CREDENTIAL_SCOPE];
      if (accessKeyId && secretAccessKey) {
        return {
          accessKeyId,
          secretAccessKey,
          ...sessionToken && { sessionToken },
          ...expiry && { expiration: new Date(expiry) },
          ...credentialScope && { credentialScope }
        };
      }
      throw new import_property_provider.CredentialsProviderError("Unable to find environment variable credentials.");
    }, "fromEnv");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/credential-provider-imds/dist-cjs/index.js
var require_dist_cjs39 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/credential-provider-imds/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      DEFAULT_MAX_RETRIES: () => DEFAULT_MAX_RETRIES,
      DEFAULT_TIMEOUT: () => DEFAULT_TIMEOUT,
      ENV_CMDS_AUTH_TOKEN: () => ENV_CMDS_AUTH_TOKEN,
      ENV_CMDS_FULL_URI: () => ENV_CMDS_FULL_URI,
      ENV_CMDS_RELATIVE_URI: () => ENV_CMDS_RELATIVE_URI,
      Endpoint: () => Endpoint,
      fromContainerMetadata: () => fromContainerMetadata,
      fromInstanceMetadata: () => fromInstanceMetadata,
      getInstanceMetadataEndpoint: () => getInstanceMetadataEndpoint,
      httpRequest: () => httpRequest,
      providerConfigFromInit: () => providerConfigFromInit
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_url = require("url");
    var import_property_provider = require_dist_cjs24();
    var import_buffer = require("buffer");
    var import_http = require("http");
    function httpRequest(options) {
      return new Promise((resolve, reject) => {
        var _a;
        const req = (0, import_http.request)({
          method: "GET",
          ...options,
          // Node.js http module doesn't accept hostname with square brackets
          // Refs: https://github.com/nodejs/node/issues/39738
          hostname: (_a = options.hostname) == null ? void 0 : _a.replace(/^\[(.+)\]$/, "$1")
        });
        req.on("error", (err) => {
          reject(Object.assign(new import_property_provider.ProviderError("Unable to connect to instance metadata service"), err));
          req.destroy();
        });
        req.on("timeout", () => {
          reject(new import_property_provider.ProviderError("TimeoutError from instance metadata service"));
          req.destroy();
        });
        req.on("response", (res) => {
          const { statusCode = 400 } = res;
          if (statusCode < 200 || 300 <= statusCode) {
            reject(
              Object.assign(new import_property_provider.ProviderError("Error response received from instance metadata service"), { statusCode })
            );
            req.destroy();
          }
          const chunks = [];
          res.on("data", (chunk) => {
            chunks.push(chunk);
          });
          res.on("end", () => {
            resolve(import_buffer.Buffer.concat(chunks));
            req.destroy();
          });
        });
        req.end();
      });
    }
    __name(httpRequest, "httpRequest");
    __name2(httpRequest, "httpRequest");
    var isImdsCredentials = /* @__PURE__ */ __name2((arg) => Boolean(arg) && typeof arg === "object" && typeof arg.AccessKeyId === "string" && typeof arg.SecretAccessKey === "string" && typeof arg.Token === "string" && typeof arg.Expiration === "string", "isImdsCredentials");
    var fromImdsCredentials = /* @__PURE__ */ __name2((creds) => ({
      accessKeyId: creds.AccessKeyId,
      secretAccessKey: creds.SecretAccessKey,
      sessionToken: creds.Token,
      expiration: new Date(creds.Expiration)
    }), "fromImdsCredentials");
    var DEFAULT_TIMEOUT = 1e3;
    var DEFAULT_MAX_RETRIES = 0;
    var providerConfigFromInit = /* @__PURE__ */ __name2(({
      maxRetries = DEFAULT_MAX_RETRIES,
      timeout = DEFAULT_TIMEOUT
    }) => ({ maxRetries, timeout }), "providerConfigFromInit");
    var retry = /* @__PURE__ */ __name2((toRetry, maxRetries) => {
      let promise = toRetry();
      for (let i = 0; i < maxRetries; i++) {
        promise = promise.catch(toRetry);
      }
      return promise;
    }, "retry");
    var ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
    var ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
    var ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
    var fromContainerMetadata = /* @__PURE__ */ __name2((init = {}) => {
      const { timeout, maxRetries } = providerConfigFromInit(init);
      return () => retry(async () => {
        const requestOptions = await getCmdsUri();
        const credsResponse = JSON.parse(await requestFromEcsImds(timeout, requestOptions));
        if (!isImdsCredentials(credsResponse)) {
          throw new import_property_provider.CredentialsProviderError("Invalid response received from instance metadata service.");
        }
        return fromImdsCredentials(credsResponse);
      }, maxRetries);
    }, "fromContainerMetadata");
    var requestFromEcsImds = /* @__PURE__ */ __name2(async (timeout, options) => {
      if (process.env[ENV_CMDS_AUTH_TOKEN]) {
        options.headers = {
          ...options.headers,
          Authorization: process.env[ENV_CMDS_AUTH_TOKEN]
        };
      }
      const buffer = await httpRequest({
        ...options,
        timeout
      });
      return buffer.toString();
    }, "requestFromEcsImds");
    var CMDS_IP = "169.254.170.2";
    var GREENGRASS_HOSTS = {
      localhost: true,
      "127.0.0.1": true
    };
    var GREENGRASS_PROTOCOLS = {
      "http:": true,
      "https:": true
    };
    var getCmdsUri = /* @__PURE__ */ __name2(async () => {
      if (process.env[ENV_CMDS_RELATIVE_URI]) {
        return {
          hostname: CMDS_IP,
          path: process.env[ENV_CMDS_RELATIVE_URI]
        };
      }
      if (process.env[ENV_CMDS_FULL_URI]) {
        const parsed = (0, import_url.parse)(process.env[ENV_CMDS_FULL_URI]);
        if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
          throw new import_property_provider.CredentialsProviderError(
            `${parsed.hostname} is not a valid container metadata service hostname`,
            false
          );
        }
        if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
          throw new import_property_provider.CredentialsProviderError(
            `${parsed.protocol} is not a valid container metadata service protocol`,
            false
          );
        }
        return {
          ...parsed,
          port: parsed.port ? parseInt(parsed.port, 10) : void 0
        };
      }
      throw new import_property_provider.CredentialsProviderError(
        `The container metadata credential provider cannot be used unless the ${ENV_CMDS_RELATIVE_URI} or ${ENV_CMDS_FULL_URI} environment variable is set`,
        false
      );
    }, "getCmdsUri");
    var _InstanceMetadataV1FallbackError = class _InstanceMetadataV1FallbackError2 extends import_property_provider.CredentialsProviderError {
      static {
        __name(this, "_InstanceMetadataV1FallbackError");
      }
      constructor(message, tryNextLink = true) {
        super(message, tryNextLink);
        this.tryNextLink = tryNextLink;
        this.name = "InstanceMetadataV1FallbackError";
        Object.setPrototypeOf(this, _InstanceMetadataV1FallbackError2.prototype);
      }
    };
    __name2(_InstanceMetadataV1FallbackError, "InstanceMetadataV1FallbackError");
    var InstanceMetadataV1FallbackError = _InstanceMetadataV1FallbackError;
    var import_node_config_provider = require_dist_cjs26();
    var import_url_parser = require_dist_cjs28();
    var Endpoint = /* @__PURE__ */ ((Endpoint2) => {
      Endpoint2["IPv4"] = "http://169.254.169.254";
      Endpoint2["IPv6"] = "http://[fd00:ec2::254]";
      return Endpoint2;
    })(Endpoint || {});
    var ENV_ENDPOINT_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT";
    var CONFIG_ENDPOINT_NAME = "ec2_metadata_service_endpoint";
    var ENDPOINT_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => env[ENV_ENDPOINT_NAME],
      configFileSelector: (profile) => profile[CONFIG_ENDPOINT_NAME],
      default: void 0
    };
    var EndpointMode = /* @__PURE__ */ ((EndpointMode2) => {
      EndpointMode2["IPv4"] = "IPv4";
      EndpointMode2["IPv6"] = "IPv6";
      return EndpointMode2;
    })(EndpointMode || {});
    var ENV_ENDPOINT_MODE_NAME = "AWS_EC2_METADATA_SERVICE_ENDPOINT_MODE";
    var CONFIG_ENDPOINT_MODE_NAME = "ec2_metadata_service_endpoint_mode";
    var ENDPOINT_MODE_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => env[ENV_ENDPOINT_MODE_NAME],
      configFileSelector: (profile) => profile[CONFIG_ENDPOINT_MODE_NAME],
      default: "IPv4"
      /* IPv4 */
    };
    var getInstanceMetadataEndpoint = /* @__PURE__ */ __name2(async () => (0, import_url_parser.parseUrl)(await getFromEndpointConfig() || await getFromEndpointModeConfig()), "getInstanceMetadataEndpoint");
    var getFromEndpointConfig = /* @__PURE__ */ __name2(async () => (0, import_node_config_provider.loadConfig)(ENDPOINT_CONFIG_OPTIONS)(), "getFromEndpointConfig");
    var getFromEndpointModeConfig = /* @__PURE__ */ __name2(async () => {
      const endpointMode = await (0, import_node_config_provider.loadConfig)(ENDPOINT_MODE_CONFIG_OPTIONS)();
      switch (endpointMode) {
        case "IPv4":
          return "http://169.254.169.254";
        case "IPv6":
          return "http://[fd00:ec2::254]";
        default:
          throw new Error(`Unsupported endpoint mode: ${endpointMode}. Select from ${Object.values(EndpointMode)}`);
      }
    }, "getFromEndpointModeConfig");
    var STATIC_STABILITY_REFRESH_INTERVAL_SECONDS = 5 * 60;
    var STATIC_STABILITY_REFRESH_INTERVAL_JITTER_WINDOW_SECONDS = 5 * 60;
    var STATIC_STABILITY_DOC_URL = "https://docs.aws.amazon.com/sdkref/latest/guide/feature-static-credentials.html";
    var getExtendedInstanceMetadataCredentials = /* @__PURE__ */ __name2((credentials, logger) => {
      const refreshInterval = STATIC_STABILITY_REFRESH_INTERVAL_SECONDS + Math.floor(Math.random() * STATIC_STABILITY_REFRESH_INTERVAL_JITTER_WINDOW_SECONDS);
      const newExpiration = new Date(Date.now() + refreshInterval * 1e3);
      logger.warn(
        `Attempting credential expiration extension due to a credential service availability issue. A refresh of these credentials will be attempted after ${new Date(newExpiration)}.
For more information, please visit: ` + STATIC_STABILITY_DOC_URL
      );
      const originalExpiration = credentials.originalExpiration ?? credentials.expiration;
      return {
        ...credentials,
        ...originalExpiration ? { originalExpiration } : {},
        expiration: newExpiration
      };
    }, "getExtendedInstanceMetadataCredentials");
    var staticStabilityProvider = /* @__PURE__ */ __name2((provider, options = {}) => {
      const logger = (options == null ? void 0 : options.logger) || console;
      let pastCredentials;
      return async () => {
        let credentials;
        try {
          credentials = await provider();
          if (credentials.expiration && credentials.expiration.getTime() < Date.now()) {
            credentials = getExtendedInstanceMetadataCredentials(credentials, logger);
          }
        } catch (e) {
          if (pastCredentials) {
            logger.warn("Credential renew failed: ", e);
            credentials = getExtendedInstanceMetadataCredentials(pastCredentials, logger);
          } else {
            throw e;
          }
        }
        pastCredentials = credentials;
        return credentials;
      };
    }, "staticStabilityProvider");
    var IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
    var IMDS_TOKEN_PATH = "/latest/api/token";
    var AWS_EC2_METADATA_V1_DISABLED = "AWS_EC2_METADATA_V1_DISABLED";
    var PROFILE_AWS_EC2_METADATA_V1_DISABLED = "ec2_metadata_v1_disabled";
    var X_AWS_EC2_METADATA_TOKEN = "x-aws-ec2-metadata-token";
    var fromInstanceMetadata = /* @__PURE__ */ __name2((init = {}) => staticStabilityProvider(getInstanceImdsProvider(init), { logger: init.logger }), "fromInstanceMetadata");
    var getInstanceImdsProvider = /* @__PURE__ */ __name2((init) => {
      let disableFetchToken = false;
      const { logger, profile } = init;
      const { timeout, maxRetries } = providerConfigFromInit(init);
      const getCredentials = /* @__PURE__ */ __name2(async (maxRetries2, options) => {
        var _a;
        const isImdsV1Fallback = disableFetchToken || ((_a = options.headers) == null ? void 0 : _a[X_AWS_EC2_METADATA_TOKEN]) == null;
        if (isImdsV1Fallback) {
          let fallbackBlockedFromProfile = false;
          let fallbackBlockedFromProcessEnv = false;
          const configValue = await (0, import_node_config_provider.loadConfig)(
            {
              environmentVariableSelector: (env) => {
                const envValue = env[AWS_EC2_METADATA_V1_DISABLED];
                fallbackBlockedFromProcessEnv = !!envValue && envValue !== "false";
                if (envValue === void 0) {
                  throw new import_property_provider.CredentialsProviderError(
                    `${AWS_EC2_METADATA_V1_DISABLED} not set in env, checking config file next.`
                  );
                }
                return fallbackBlockedFromProcessEnv;
              },
              configFileSelector: (profile2) => {
                const profileValue = profile2[PROFILE_AWS_EC2_METADATA_V1_DISABLED];
                fallbackBlockedFromProfile = !!profileValue && profileValue !== "false";
                return fallbackBlockedFromProfile;
              },
              default: false
            },
            {
              profile
            }
          )();
          if (init.ec2MetadataV1Disabled || configValue) {
            const causes = [];
            if (init.ec2MetadataV1Disabled)
              causes.push("credential provider initialization (runtime option ec2MetadataV1Disabled)");
            if (fallbackBlockedFromProfile)
              causes.push(`config file profile (${PROFILE_AWS_EC2_METADATA_V1_DISABLED})`);
            if (fallbackBlockedFromProcessEnv)
              causes.push(`process environment variable (${AWS_EC2_METADATA_V1_DISABLED})`);
            throw new InstanceMetadataV1FallbackError(
              `AWS EC2 Metadata v1 fallback has been blocked by AWS SDK configuration in the following: [${causes.join(
                ", "
              )}].`
            );
          }
        }
        const imdsProfile = (await retry(async () => {
          let profile2;
          try {
            profile2 = await getProfile(options);
          } catch (err) {
            if (err.statusCode === 401) {
              disableFetchToken = false;
            }
            throw err;
          }
          return profile2;
        }, maxRetries2)).trim();
        return retry(async () => {
          let creds;
          try {
            creds = await getCredentialsFromProfile(imdsProfile, options);
          } catch (err) {
            if (err.statusCode === 401) {
              disableFetchToken = false;
            }
            throw err;
          }
          return creds;
        }, maxRetries2);
      }, "getCredentials");
      return async () => {
        const endpoint = await getInstanceMetadataEndpoint();
        if (disableFetchToken) {
          logger == null ? void 0 : logger.debug("AWS SDK Instance Metadata", "using v1 fallback (no token fetch)");
          return getCredentials(maxRetries, { ...endpoint, timeout });
        } else {
          let token;
          try {
            token = (await getMetadataToken({ ...endpoint, timeout })).toString();
          } catch (error) {
            if ((error == null ? void 0 : error.statusCode) === 400) {
              throw Object.assign(error, {
                message: "EC2 Metadata token request returned error"
              });
            } else if (error.message === "TimeoutError" || [403, 404, 405].includes(error.statusCode)) {
              disableFetchToken = true;
            }
            logger == null ? void 0 : logger.debug("AWS SDK Instance Metadata", "using v1 fallback (initial)");
            return getCredentials(maxRetries, { ...endpoint, timeout });
          }
          return getCredentials(maxRetries, {
            ...endpoint,
            headers: {
              [X_AWS_EC2_METADATA_TOKEN]: token
            },
            timeout
          });
        }
      };
    }, "getInstanceImdsProvider");
    var getMetadataToken = /* @__PURE__ */ __name2(async (options) => httpRequest({
      ...options,
      path: IMDS_TOKEN_PATH,
      method: "PUT",
      headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": "21600"
      }
    }), "getMetadataToken");
    var getProfile = /* @__PURE__ */ __name2(async (options) => (await httpRequest({ ...options, path: IMDS_PATH })).toString(), "getProfile");
    var getCredentialsFromProfile = /* @__PURE__ */ __name2(async (profile, options) => {
      const credsResponse = JSON.parse(
        (await httpRequest({
          ...options,
          path: IMDS_PATH + profile
        })).toString()
      );
      if (!isImdsCredentials(credsResponse)) {
        throw new import_property_provider.CredentialsProviderError("Invalid response received from instance metadata service.");
      }
      return fromImdsCredentials(credsResponse);
    }, "getCredentialsFromProfile");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/checkUrl.js
var require_checkUrl = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/checkUrl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.checkUrl = void 0;
    var property_provider_1 = require_dist_cjs24();
    var ECS_CONTAINER_HOST = "169.254.170.2";
    var EKS_CONTAINER_HOST_IPv4 = "169.254.170.23";
    var EKS_CONTAINER_HOST_IPv6 = "[fd00:ec2::23]";
    var checkUrl = /* @__PURE__ */ __name((url) => {
      if (url.protocol === "https:") {
        return;
      }
      if (url.hostname === ECS_CONTAINER_HOST || url.hostname === EKS_CONTAINER_HOST_IPv4 || url.hostname === EKS_CONTAINER_HOST_IPv6) {
        return;
      }
      if (url.hostname.includes("[")) {
        if (url.hostname === "[::1]" || url.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]") {
          return;
        }
      } else {
        if (url.hostname === "localhost") {
          return;
        }
        const ipComponents = url.hostname.split(".");
        const inRange = /* @__PURE__ */ __name((component) => {
          const num = parseInt(component, 10);
          return 0 <= num && num <= 255;
        }, "inRange");
        if (ipComponents[0] === "127" && inRange(ipComponents[1]) && inRange(ipComponents[2]) && inRange(ipComponents[3]) && ipComponents.length === 4) {
          return;
        }
      }
      throw new property_provider_1.CredentialsProviderError(`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`);
    }, "checkUrl");
    exports2.checkUrl = checkUrl;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/requestHelpers.js
var require_requestHelpers = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/requestHelpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getCredentials = exports2.createGetRequest = void 0;
    var property_provider_1 = require_dist_cjs24();
    var protocol_http_1 = require_dist_cjs2();
    var smithy_client_1 = require_dist_cjs15();
    var util_stream_1 = require_dist_cjs14();
    function createGetRequest(url) {
      return new protocol_http_1.HttpRequest({
        protocol: url.protocol,
        hostname: url.hostname,
        port: Number(url.port),
        path: url.pathname,
        query: Array.from(url.searchParams.entries()).reduce((acc, [k, v]) => {
          acc[k] = v;
          return acc;
        }, {}),
        fragment: url.hash
      });
    }
    __name(createGetRequest, "createGetRequest");
    exports2.createGetRequest = createGetRequest;
    async function getCredentials(response) {
      const contentType = response?.headers["content-type"] ?? response?.headers["Content-Type"] ?? "";
      if (!contentType.includes("json")) {
        console.warn("HTTP credential provider response header content-type was not application/json. Observed: " + contentType + ".");
      }
      const stream = (0, util_stream_1.sdkStreamMixin)(response.body);
      const str = await stream.transformToString();
      if (response.statusCode === 200) {
        const parsed = JSON.parse(str);
        if (typeof parsed.AccessKeyId !== "string" || typeof parsed.SecretAccessKey !== "string" || typeof parsed.Token !== "string" || typeof parsed.Expiration !== "string") {
          throw new property_provider_1.CredentialsProviderError("HTTP credential provider response not of the required format, an object matching: { AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }");
        }
        return {
          accessKeyId: parsed.AccessKeyId,
          secretAccessKey: parsed.SecretAccessKey,
          sessionToken: parsed.Token,
          expiration: (0, smithy_client_1.parseRfc3339DateTime)(parsed.Expiration)
        };
      }
      if (response.statusCode >= 400 && response.statusCode < 500) {
        let parsedBody = {};
        try {
          parsedBody = JSON.parse(str);
        } catch (e) {
        }
        throw Object.assign(new property_provider_1.CredentialsProviderError(`Server responded with status: ${response.statusCode}`), {
          Code: parsedBody.Code,
          Message: parsedBody.Message
        });
      }
      throw new property_provider_1.CredentialsProviderError(`Server responded with status: ${response.statusCode}`);
    }
    __name(getCredentials, "getCredentials");
    exports2.getCredentials = getCredentials;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/retry-wrapper.js
var require_retry_wrapper = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/retry-wrapper.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.retryWrapper = void 0;
    var retryWrapper = /* @__PURE__ */ __name((toRetry, maxRetries, delayMs) => {
      return async () => {
        for (let i = 0; i < maxRetries; ++i) {
          try {
            return await toRetry();
          } catch (e) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
          }
        }
        return await toRetry();
      };
    }, "retryWrapper");
    exports2.retryWrapper = retryWrapper;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/fromHttp.js
var require_fromHttp = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/fromHttp/fromHttp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromHttp = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_http_handler_1 = require_dist_cjs13();
    var property_provider_1 = require_dist_cjs24();
    var promises_1 = tslib_1.__importDefault(require("fs/promises"));
    var checkUrl_1 = require_checkUrl();
    var requestHelpers_1 = require_requestHelpers();
    var retry_wrapper_1 = require_retry_wrapper();
    var AWS_CONTAINER_CREDENTIALS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
    var DEFAULT_LINK_LOCAL_HOST = "http://169.254.170.2";
    var AWS_CONTAINER_CREDENTIALS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
    var AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE";
    var AWS_CONTAINER_AUTHORIZATION_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
    var fromHttp = /* @__PURE__ */ __name((options) => {
      options.logger?.debug("@aws-sdk/credential-provider-http", "fromHttp");
      let host;
      const relative = options.awsContainerCredentialsRelativeUri ?? process.env[AWS_CONTAINER_CREDENTIALS_RELATIVE_URI];
      const full = options.awsContainerCredentialsFullUri ?? process.env[AWS_CONTAINER_CREDENTIALS_FULL_URI];
      const token = options.awsContainerAuthorizationToken ?? process.env[AWS_CONTAINER_AUTHORIZATION_TOKEN];
      const tokenFile = options.awsContainerAuthorizationTokenFile ?? process.env[AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE];
      if (relative && full) {
        console.warn("AWS SDK HTTP credentials provider:", "you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri.");
        console.warn("awsContainerCredentialsFullUri will take precedence.");
      }
      if (token && tokenFile) {
        console.warn("AWS SDK HTTP credentials provider:", "you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile.");
        console.warn("awsContainerAuthorizationToken will take precedence.");
      }
      if (full) {
        host = full;
      } else if (relative) {
        host = `${DEFAULT_LINK_LOCAL_HOST}${relative}`;
      } else {
        throw new property_provider_1.CredentialsProviderError(`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`);
      }
      const url = new URL(host);
      (0, checkUrl_1.checkUrl)(url);
      const requestHandler = new node_http_handler_1.NodeHttpHandler({
        requestTimeout: options.timeout ?? 1e3,
        connectionTimeout: options.timeout ?? 1e3
      });
      return (0, retry_wrapper_1.retryWrapper)(async () => {
        const request = (0, requestHelpers_1.createGetRequest)(url);
        if (token) {
          request.headers.Authorization = token;
        } else if (tokenFile) {
          request.headers.Authorization = (await promises_1.default.readFile(tokenFile)).toString();
        }
        try {
          const result = await requestHandler.handle(request);
          return (0, requestHelpers_1.getCredentials)(result.response);
        } catch (e) {
          throw new property_provider_1.CredentialsProviderError(String(e));
        }
      }, options.maxRetries ?? 3, options.timeout ?? 1e3);
    }, "fromHttp");
    exports2.fromHttp = fromHttp;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/index.js
var require_dist_cjs40 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-http/dist-cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromHttp = void 0;
    var fromHttp_1 = require_fromHttp();
    Object.defineProperty(exports2, "fromHttp", { enumerable: true, get: function() {
      return fromHttp_1.fromHttp;
    } });
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-node/dist-cjs/index.js
var require_dist_cjs41 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/credential-provider-node/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      credentialsTreatedAsExpired: () => credentialsTreatedAsExpired,
      credentialsWillNeedRefresh: () => credentialsWillNeedRefresh,
      defaultProvider: () => defaultProvider
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_credential_provider_env = require_dist_cjs38();
    var import_shared_ini_file_loader = require_dist_cjs25();
    var import_property_provider = require_dist_cjs24();
    var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
    var remoteProvider = /* @__PURE__ */ __name2(async (init) => {
      var _a, _b;
      const { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI, fromContainerMetadata, fromInstanceMetadata } = await Promise.resolve().then(() => __toESM2(require_dist_cjs39()));
      if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
        (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "remoteProvider::fromHttp/fromContainerMetadata");
        const { fromHttp } = await Promise.resolve().then(() => __toESM2(require_dist_cjs40()));
        return (0, import_property_provider.chain)(fromHttp(init), fromContainerMetadata(init));
      }
      if (process.env[ENV_IMDS_DISABLED]) {
        return async () => {
          throw new import_property_provider.CredentialsProviderError("EC2 Instance Metadata Service access disabled");
        };
      }
      (_b = init.logger) == null ? void 0 : _b.debug("@aws-sdk/credential-provider-node", "remoteProvider::fromInstanceMetadata");
      return fromInstanceMetadata(init);
    }, "remoteProvider");
    var defaultProvider = /* @__PURE__ */ __name2((init = {}) => (0, import_property_provider.memoize)(
      (0, import_property_provider.chain)(
        ...init.profile || process.env[import_shared_ini_file_loader.ENV_PROFILE] ? [] : [
          async () => {
            var _a;
            (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "defaultProvider::fromEnv");
            return (0, import_credential_provider_env.fromEnv)(init)();
          }
        ],
        async () => {
          var _a;
          (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "defaultProvider::fromSSO");
          const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
          if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
            throw new import_property_provider.CredentialsProviderError(
              "Skipping SSO provider in default chain (inputs do not include SSO fields)."
            );
          }
          const { fromSSO } = await Promise.resolve().then(() => __toESM2(require("@aws-sdk/credential-provider-sso")));
          return fromSSO(init)();
        },
        async () => {
          var _a;
          (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "defaultProvider::fromIni");
          const { fromIni } = await Promise.resolve().then(() => __toESM2(require("@aws-sdk/credential-provider-ini")));
          return fromIni(init)();
        },
        async () => {
          var _a;
          (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "defaultProvider::fromProcess");
          const { fromProcess } = await Promise.resolve().then(() => __toESM2(require("@aws-sdk/credential-provider-process")));
          return fromProcess(init)();
        },
        async () => {
          var _a;
          (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "defaultProvider::fromTokenFile");
          const { fromTokenFile } = await Promise.resolve().then(() => __toESM2(require("@aws-sdk/credential-provider-web-identity")));
          return fromTokenFile(init)();
        },
        async () => {
          var _a;
          (_a = init.logger) == null ? void 0 : _a.debug("@aws-sdk/credential-provider-node", "defaultProvider::remoteProvider");
          return (await remoteProvider(init))();
        },
        async () => {
          throw new import_property_provider.CredentialsProviderError("Could not load credentials from any providers", false);
        }
      ),
      credentialsTreatedAsExpired,
      credentialsWillNeedRefresh
    ), "defaultProvider");
    var credentialsWillNeedRefresh = /* @__PURE__ */ __name2((credentials) => (credentials == null ? void 0 : credentials.expiration) !== void 0, "credentialsWillNeedRefresh");
    var credentialsTreatedAsExpired = /* @__PURE__ */ __name2((credentials) => (credentials == null ? void 0 : credentials.expiration) !== void 0 && credentials.expiration.getTime() - Date.now() < 3e5, "credentialsTreatedAsExpired");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/util-user-agent-node/dist-cjs/index.js
var require_dist_cjs42 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/util-user-agent-node/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      UA_APP_ID_ENV_NAME: () => UA_APP_ID_ENV_NAME,
      UA_APP_ID_INI_NAME: () => UA_APP_ID_INI_NAME,
      crtAvailability: () => crtAvailability,
      defaultUserAgent: () => defaultUserAgent
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_node_config_provider = require_dist_cjs26();
    var import_os = require("os");
    var import_process = require("process");
    var crtAvailability = {
      isCrtAvailable: false
    };
    var isCrtAvailable = /* @__PURE__ */ __name2(() => {
      if (crtAvailability.isCrtAvailable) {
        return ["md/crt-avail"];
      }
      return null;
    }, "isCrtAvailable");
    var UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
    var UA_APP_ID_INI_NAME = "sdk-ua-app-id";
    var defaultUserAgent = /* @__PURE__ */ __name2(({ serviceId, clientVersion }) => {
      const sections = [
        // sdk-metadata
        ["aws-sdk-js", clientVersion],
        // ua-metadata
        ["ua", "2.0"],
        // os-metadata
        [`os/${(0, import_os.platform)()}`, (0, import_os.release)()],
        // language-metadata
        // ECMAScript edition doesn't matter in JS, so no version needed.
        ["lang/js"],
        ["md/nodejs", `${import_process.versions.node}`]
      ];
      const crtAvailable = isCrtAvailable();
      if (crtAvailable) {
        sections.push(crtAvailable);
      }
      if (serviceId) {
        sections.push([`api/${serviceId}`, clientVersion]);
      }
      if (import_process.env.AWS_EXECUTION_ENV) {
        sections.push([`exec-env/${import_process.env.AWS_EXECUTION_ENV}`]);
      }
      const appIdPromise = (0, import_node_config_provider.loadConfig)({
        environmentVariableSelector: (env2) => env2[UA_APP_ID_ENV_NAME],
        configFileSelector: (profile) => profile[UA_APP_ID_INI_NAME],
        default: void 0
      })();
      let resolvedUserAgent = void 0;
      return async () => {
        if (!resolvedUserAgent) {
          const appId = await appIdPromise;
          resolvedUserAgent = appId ? [...sections, [`app/${appId}`]] : [...sections];
        }
        return resolvedUserAgent;
      };
    }, "defaultUserAgent");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/hash-node/dist-cjs/index.js
var require_dist_cjs43 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/hash-node/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      Hash: () => Hash
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_util_buffer_from = require_dist_cjs8();
    var import_util_utf8 = require_dist_cjs9();
    var import_buffer = require("buffer");
    var import_crypto4 = require("crypto");
    var _Hash = class _Hash {
      static {
        __name(this, "_Hash");
      }
      constructor(algorithmIdentifier, secret) {
        this.algorithmIdentifier = algorithmIdentifier;
        this.secret = secret;
        this.reset();
      }
      update(toHash, encoding) {
        this.hash.update((0, import_util_utf8.toUint8Array)(castSourceData(toHash, encoding)));
      }
      digest() {
        return Promise.resolve(this.hash.digest());
      }
      reset() {
        this.hash = this.secret ? (0, import_crypto4.createHmac)(this.algorithmIdentifier, castSourceData(this.secret)) : (0, import_crypto4.createHash)(this.algorithmIdentifier);
      }
    };
    __name2(_Hash, "Hash");
    var Hash = _Hash;
    function castSourceData(toCast, encoding) {
      if (import_buffer.Buffer.isBuffer(toCast)) {
        return toCast;
      }
      if (typeof toCast === "string") {
        return (0, import_util_buffer_from.fromString)(toCast, encoding);
      }
      if (ArrayBuffer.isView(toCast)) {
        return (0, import_util_buffer_from.fromArrayBuffer)(toCast.buffer, toCast.byteOffset, toCast.byteLength);
      }
      return (0, import_util_buffer_from.fromArrayBuffer)(toCast);
    }
    __name(castSourceData, "castSourceData");
    __name2(castSourceData, "castSourceData");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-body-length-node/dist-cjs/index.js
var require_dist_cjs44 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-body-length-node/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      calculateBodyLength: () => calculateBodyLength
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_fs = require("fs");
    var calculateBodyLength = /* @__PURE__ */ __name2((body) => {
      if (!body) {
        return 0;
      }
      if (typeof body === "string") {
        return Buffer.byteLength(body);
      } else if (typeof body.byteLength === "number") {
        return body.byteLength;
      } else if (typeof body.size === "number") {
        return body.size;
      } else if (typeof body.start === "number" && typeof body.end === "number") {
        return body.end + 1 - body.start;
      } else if (typeof body.path === "string" || Buffer.isBuffer(body.path)) {
        return (0, import_fs.lstatSync)(body.path).size;
      } else if (typeof body.fd === "number") {
        return (0, import_fs.fstatSync)(body.fd).size;
      }
      throw new Error(`Body Length computation failed for ${body}`);
    }, "calculateBodyLength");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/endpoint/ruleset.js
var require_ruleset = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/endpoint/ruleset.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ruleSet = void 0;
    var u = "required";
    var v = "fn";
    var w = "argv";
    var x = "ref";
    var a = true;
    var b = "isSet";
    var c = "booleanEquals";
    var d = "error";
    var e = "endpoint";
    var f = "tree";
    var g = "PartitionResult";
    var h = "getAttr";
    var i = { [u]: false, "type": "String" };
    var j = { [u]: true, "default": false, "type": "Boolean" };
    var k = { [x]: "Endpoint" };
    var l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] };
    var m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] };
    var n = {};
    var o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] };
    var p = { [x]: g };
    var q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] };
    var r = [l];
    var s = [m];
    var t = [{ [x]: "Region" }];
    var _data = { version: "1.0", parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i }, rules: [{ conditions: [{ [v]: b, [w]: [k] }], rules: [{ conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: k, properties: n, headers: n }, type: e }], type: f }, { conditions: [{ [v]: b, [w]: t }], rules: [{ conditions: [{ [v]: "aws.partition", [w]: t, assign: g }], rules: [{ conditions: [l, m], rules: [{ conditions: [{ [v]: c, [w]: [a, o] }, q], rules: [{ endpoint: { url: "https://sqs-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: r, rules: [{ conditions: [{ [v]: c, [w]: [o, a] }], rules: [{ conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }], endpoint: { url: "https://sqs.{Region}.amazonaws.com", properties: n, headers: n }, type: e }, { endpoint: { url: "https://sqs-fips.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: s, rules: [{ conditions: [q], rules: [{ endpoint: { url: "https://sqs.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: n, headers: n }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://sqs.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
    exports2.ruleSet = _data;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/endpoint/endpointResolver.js
var require_endpointResolver = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/endpoint/endpointResolver.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultEndpointResolver = void 0;
    var util_endpoints_1 = require_dist_cjs19();
    var util_endpoints_2 = require_dist_cjs18();
    var ruleset_1 = require_ruleset();
    var defaultEndpointResolver = /* @__PURE__ */ __name((endpointParams, context = {}) => {
      return (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
        endpointParams,
        logger: context.logger
      });
    }, "defaultEndpointResolver");
    exports2.defaultEndpointResolver = defaultEndpointResolver;
    util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/runtimeConfig.shared.js
var require_runtimeConfig_shared = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/runtimeConfig.shared.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRuntimeConfig = void 0;
    var core_1 = require_dist_cjs37();
    var smithy_client_1 = require_dist_cjs15();
    var url_parser_1 = require_dist_cjs28();
    var util_base64_1 = require_dist_cjs10();
    var util_utf8_1 = require_dist_cjs9();
    var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
    var endpointResolver_1 = require_endpointResolver();
    var getRuntimeConfig = /* @__PURE__ */ __name((config) => {
      return {
        apiVersion: "2012-11-05",
        base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
        base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSQSHttpAuthSchemeProvider,
        httpAuthSchemes: config?.httpAuthSchemes ?? [
          {
            schemeId: "aws.auth#sigv4",
            identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
            signer: new core_1.AwsSdkSigV4Signer()
          }
        ],
        logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
        serviceId: config?.serviceId ?? "SQS",
        urlParser: config?.urlParser ?? url_parser_1.parseUrl,
        utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
      };
    }, "getRuntimeConfig");
    exports2.getRuntimeConfig = getRuntimeConfig;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-defaults-mode-node/dist-cjs/index.js
var require_dist_cjs45 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@smithy/util-defaults-mode-node/dist-cjs/index.js"(exports2, module2) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toESM2 = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    )), "__toESM");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      resolveDefaultsModeConfig: () => resolveDefaultsModeConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_config_resolver = require_dist_cjs23();
    var import_node_config_provider = require_dist_cjs26();
    var import_property_provider = require_dist_cjs24();
    var AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
    var AWS_REGION_ENV = "AWS_REGION";
    var AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
    var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
    var DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
    var IMDS_REGION_PATH = "/latest/meta-data/placement/region";
    var AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
    var AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
    var NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => {
        return env[AWS_DEFAULTS_MODE_ENV];
      },
      configFileSelector: (profile) => {
        return profile[AWS_DEFAULTS_MODE_CONFIG];
      },
      default: "legacy"
    };
    var resolveDefaultsModeConfig = /* @__PURE__ */ __name2(({
      region = (0, import_node_config_provider.loadConfig)(import_config_resolver.NODE_REGION_CONFIG_OPTIONS),
      defaultsMode = (0, import_node_config_provider.loadConfig)(NODE_DEFAULTS_MODE_CONFIG_OPTIONS)
    } = {}) => (0, import_property_provider.memoize)(async () => {
      const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
      switch (mode == null ? void 0 : mode.toLowerCase()) {
        case "auto":
          return resolveNodeDefaultsModeAuto(region);
        case "in-region":
        case "cross-region":
        case "mobile":
        case "standard":
        case "legacy":
          return Promise.resolve(mode == null ? void 0 : mode.toLocaleLowerCase());
        case void 0:
          return Promise.resolve("legacy");
        default:
          throw new Error(
            `Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`
          );
      }
    }), "resolveDefaultsModeConfig");
    var resolveNodeDefaultsModeAuto = /* @__PURE__ */ __name2(async (clientRegion) => {
      if (clientRegion) {
        const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
        const inferredRegion = await inferPhysicalRegion();
        if (!inferredRegion) {
          return "standard";
        }
        if (resolvedRegion === inferredRegion) {
          return "in-region";
        } else {
          return "cross-region";
        }
      }
      return "standard";
    }, "resolveNodeDefaultsModeAuto");
    var inferPhysicalRegion = /* @__PURE__ */ __name2(async () => {
      if (process.env[AWS_EXECUTION_ENV] && (process.env[AWS_REGION_ENV] || process.env[AWS_DEFAULT_REGION_ENV])) {
        return process.env[AWS_REGION_ENV] ?? process.env[AWS_DEFAULT_REGION_ENV];
      }
      if (!process.env[ENV_IMDS_DISABLED]) {
        try {
          const { getInstanceMetadataEndpoint, httpRequest } = await Promise.resolve().then(() => __toESM2(require_dist_cjs39()));
          const endpoint = await getInstanceMetadataEndpoint();
          return (await httpRequest({ ...endpoint, path: IMDS_REGION_PATH })).toString();
        } catch (e) {
        }
      }
    }, "inferPhysicalRegion");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/runtimeConfig.js
var require_runtimeConfig = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/runtimeConfig.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRuntimeConfig = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var package_json_1 = tslib_1.__importDefault(require_package());
    var core_1 = require_dist_cjs37();
    var credential_provider_node_1 = require_dist_cjs41();
    var util_user_agent_node_1 = require_dist_cjs42();
    var config_resolver_1 = require_dist_cjs23();
    var hash_node_1 = require_dist_cjs43();
    var middleware_retry_1 = require_dist_cjs33();
    var node_config_provider_1 = require_dist_cjs26();
    var node_http_handler_1 = require_dist_cjs13();
    var util_body_length_node_1 = require_dist_cjs44();
    var util_retry_1 = require_dist_cjs32();
    var runtimeConfig_shared_1 = require_runtimeConfig_shared();
    var smithy_client_1 = require_dist_cjs15();
    var util_defaults_mode_node_1 = require_dist_cjs45();
    var smithy_client_2 = require_dist_cjs15();
    var getRuntimeConfig = /* @__PURE__ */ __name((config) => {
      (0, smithy_client_2.emitWarningIfUnsupportedVersion)(process.version);
      const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
      const defaultConfigProvider = /* @__PURE__ */ __name(() => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode), "defaultConfigProvider");
      const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
      (0, core_1.emitWarningIfUnsupportedVersion)(process.version);
      return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
        credentialDefaultProvider: config?.credentialDefaultProvider ?? credential_provider_node_1.defaultProvider,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.defaultUserAgent)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
        maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS),
        md5: config?.md5 ?? hash_node_1.Hash.bind(null, "md5"),
        region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS),
        requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
          ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
          default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
        }),
        sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS)
      };
    }, "getRuntimeConfig");
    exports2.getRuntimeConfig = getRuntimeConfig;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/region-config-resolver/dist-cjs/index.js
var require_dist_cjs46 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/region-config-resolver/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      NODE_REGION_CONFIG_FILE_OPTIONS: () => NODE_REGION_CONFIG_FILE_OPTIONS,
      NODE_REGION_CONFIG_OPTIONS: () => NODE_REGION_CONFIG_OPTIONS,
      REGION_ENV_NAME: () => REGION_ENV_NAME,
      REGION_INI_NAME: () => REGION_INI_NAME,
      getAwsRegionExtensionConfiguration: () => getAwsRegionExtensionConfiguration,
      resolveAwsRegionExtensionConfiguration: () => resolveAwsRegionExtensionConfiguration,
      resolveRegionConfig: () => resolveRegionConfig
    });
    module2.exports = __toCommonJS2(src_exports);
    var getAwsRegionExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      let runtimeConfigRegion = /* @__PURE__ */ __name2(async () => {
        if (runtimeConfig.region === void 0) {
          throw new Error("Region is missing from runtimeConfig");
        }
        const region = runtimeConfig.region;
        if (typeof region === "string") {
          return region;
        }
        return region();
      }, "runtimeConfigRegion");
      return {
        setRegion(region) {
          runtimeConfigRegion = region;
        },
        region() {
          return runtimeConfigRegion;
        }
      };
    }, "getAwsRegionExtensionConfiguration");
    var resolveAwsRegionExtensionConfiguration = /* @__PURE__ */ __name2((awsRegionExtensionConfiguration) => {
      return {
        region: awsRegionExtensionConfiguration.region()
      };
    }, "resolveAwsRegionExtensionConfiguration");
    var REGION_ENV_NAME = "AWS_REGION";
    var REGION_INI_NAME = "region";
    var NODE_REGION_CONFIG_OPTIONS = {
      environmentVariableSelector: (env) => env[REGION_ENV_NAME],
      configFileSelector: (profile) => profile[REGION_INI_NAME],
      default: () => {
        throw new Error("Region is missing");
      }
    };
    var NODE_REGION_CONFIG_FILE_OPTIONS = {
      preferredFile: "credentials"
    };
    var isFipsRegion = /* @__PURE__ */ __name2((region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips")), "isFipsRegion");
    var getRealRegion = /* @__PURE__ */ __name2((region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region, "getRealRegion");
    var resolveRegionConfig = /* @__PURE__ */ __name2((input) => {
      const { region, useFipsEndpoint } = input;
      if (!region) {
        throw new Error("Region is missing");
      }
      return {
        ...input,
        region: async () => {
          if (typeof region === "string") {
            return getRealRegion(region);
          }
          const providedRegion = await region();
          return getRealRegion(providedRegion);
        },
        useFipsEndpoint: async () => {
          const providedRegion = typeof region === "string" ? region : await region();
          if (isFipsRegion(providedRegion)) {
            return true;
          }
          return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        }
      };
    }, "resolveRegionConfig");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/index.js
var require_dist_cjs47 = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/node_modules/@aws-sdk/client-sqs/dist-cjs/index.js"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
    var __export2 = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS2 = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var src_exports = {};
    __export2(src_exports, {
      AddPermissionCommand: () => AddPermissionCommand,
      BatchEntryIdsNotDistinct: () => BatchEntryIdsNotDistinct,
      BatchRequestTooLong: () => BatchRequestTooLong,
      CancelMessageMoveTaskCommand: () => CancelMessageMoveTaskCommand,
      ChangeMessageVisibilityBatchCommand: () => ChangeMessageVisibilityBatchCommand,
      ChangeMessageVisibilityCommand: () => ChangeMessageVisibilityCommand,
      CreateQueueCommand: () => CreateQueueCommand,
      DeleteMessageBatchCommand: () => DeleteMessageBatchCommand,
      DeleteMessageCommand: () => DeleteMessageCommand,
      DeleteQueueCommand: () => DeleteQueueCommand,
      EmptyBatchRequest: () => EmptyBatchRequest,
      GetQueueAttributesCommand: () => GetQueueAttributesCommand,
      GetQueueUrlCommand: () => GetQueueUrlCommand,
      InvalidAddress: () => InvalidAddress,
      InvalidAttributeName: () => InvalidAttributeName,
      InvalidAttributeValue: () => InvalidAttributeValue,
      InvalidBatchEntryId: () => InvalidBatchEntryId,
      InvalidIdFormat: () => InvalidIdFormat,
      InvalidMessageContents: () => InvalidMessageContents,
      InvalidSecurity: () => InvalidSecurity,
      KmsAccessDenied: () => KmsAccessDenied,
      KmsDisabled: () => KmsDisabled,
      KmsInvalidKeyUsage: () => KmsInvalidKeyUsage,
      KmsInvalidState: () => KmsInvalidState,
      KmsNotFound: () => KmsNotFound,
      KmsOptInRequired: () => KmsOptInRequired,
      KmsThrottled: () => KmsThrottled,
      ListDeadLetterSourceQueuesCommand: () => ListDeadLetterSourceQueuesCommand,
      ListMessageMoveTasksCommand: () => ListMessageMoveTasksCommand,
      ListQueueTagsCommand: () => ListQueueTagsCommand,
      ListQueuesCommand: () => ListQueuesCommand,
      MessageNotInflight: () => MessageNotInflight,
      MessageSystemAttributeName: () => MessageSystemAttributeName,
      MessageSystemAttributeNameForSends: () => MessageSystemAttributeNameForSends,
      OverLimit: () => OverLimit,
      PurgeQueueCommand: () => PurgeQueueCommand,
      PurgeQueueInProgress: () => PurgeQueueInProgress,
      QueueAttributeName: () => QueueAttributeName,
      QueueDeletedRecently: () => QueueDeletedRecently,
      QueueDoesNotExist: () => QueueDoesNotExist,
      QueueNameExists: () => QueueNameExists,
      ReceiptHandleIsInvalid: () => ReceiptHandleIsInvalid,
      ReceiveMessageCommand: () => ReceiveMessageCommand,
      RemovePermissionCommand: () => RemovePermissionCommand,
      RequestThrottled: () => RequestThrottled,
      ResourceNotFoundException: () => ResourceNotFoundException,
      SQS: () => SQS,
      SQSClient: () => SQSClient,
      SQSServiceException: () => SQSServiceException,
      SendMessageBatchCommand: () => SendMessageBatchCommand,
      SendMessageCommand: () => SendMessageCommand,
      SetQueueAttributesCommand: () => SetQueueAttributesCommand,
      StartMessageMoveTaskCommand: () => StartMessageMoveTaskCommand,
      TagQueueCommand: () => TagQueueCommand,
      TooManyEntriesInBatchRequest: () => TooManyEntriesInBatchRequest,
      UnsupportedOperation: () => UnsupportedOperation,
      UntagQueueCommand: () => UntagQueueCommand,
      __Client: () => import_smithy_client.Client,
      paginateListDeadLetterSourceQueues: () => paginateListDeadLetterSourceQueues,
      paginateListQueues: () => paginateListQueues
    });
    module2.exports = __toCommonJS2(src_exports);
    var import_middleware_host_header = require_dist_cjs3();
    var import_middleware_logger = require_dist_cjs4();
    var import_middleware_recursion_detection = require_dist_cjs5();
    var import_middleware_sdk_sqs = require_dist_cjs17();
    var import_middleware_user_agent = require_dist_cjs20();
    var import_config_resolver = require_dist_cjs23();
    var import_core = require_dist_cjs34();
    var import_middleware_content_length = require_dist_cjs35();
    var import_middleware_endpoint = require_dist_cjs30();
    var import_middleware_retry = require_dist_cjs33();
    var import_httpAuthSchemeProvider = require_httpAuthSchemeProvider();
    var resolveClientEndpointParameters = /* @__PURE__ */ __name2((options) => {
      return {
        ...options,
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "sqs"
      };
    }, "resolveClientEndpointParameters");
    var commonParams = {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
    };
    var import_runtimeConfig = require_runtimeConfig();
    var import_region_config_resolver = require_dist_cjs46();
    var import_protocol_http = require_dist_cjs2();
    var import_smithy_client = require_dist_cjs15();
    var getHttpAuthExtensionConfiguration = /* @__PURE__ */ __name2((runtimeConfig) => {
      const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
      let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
      let _credentials = runtimeConfig.credentials;
      return {
        setHttpAuthScheme(httpAuthScheme) {
          const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
          if (index === -1) {
            _httpAuthSchemes.push(httpAuthScheme);
          } else {
            _httpAuthSchemes.splice(index, 1, httpAuthScheme);
          }
        },
        httpAuthSchemes() {
          return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
          _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
          return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
          _credentials = credentials;
        },
        credentials() {
          return _credentials;
        }
      };
    }, "getHttpAuthExtensionConfiguration");
    var resolveHttpAuthRuntimeConfig = /* @__PURE__ */ __name2((config) => {
      return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
      };
    }, "resolveHttpAuthRuntimeConfig");
    var asPartial = /* @__PURE__ */ __name2((t) => t, "asPartial");
    var resolveRuntimeExtensions = /* @__PURE__ */ __name2((runtimeConfig, extensions) => {
      const extensionConfiguration = {
        ...asPartial((0, import_region_config_resolver.getAwsRegionExtensionConfiguration)(runtimeConfig)),
        ...asPartial((0, import_smithy_client.getDefaultExtensionConfiguration)(runtimeConfig)),
        ...asPartial((0, import_protocol_http.getHttpHandlerExtensionConfiguration)(runtimeConfig)),
        ...asPartial(getHttpAuthExtensionConfiguration(runtimeConfig))
      };
      extensions.forEach((extension) => extension.configure(extensionConfiguration));
      return {
        ...runtimeConfig,
        ...(0, import_region_config_resolver.resolveAwsRegionExtensionConfiguration)(extensionConfiguration),
        ...(0, import_smithy_client.resolveDefaultRuntimeConfig)(extensionConfiguration),
        ...(0, import_protocol_http.resolveHttpHandlerRuntimeConfig)(extensionConfiguration),
        ...resolveHttpAuthRuntimeConfig(extensionConfiguration)
      };
    }, "resolveRuntimeExtensions");
    var _SQSClient = class _SQSClient extends import_smithy_client.Client {
      static {
        __name(this, "_SQSClient");
      }
      constructor(...[configuration]) {
        const _config_0 = (0, import_runtimeConfig.getRuntimeConfig)(configuration || {});
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = (0, import_config_resolver.resolveRegionConfig)(_config_1);
        const _config_3 = (0, import_middleware_endpoint.resolveEndpointConfig)(_config_2);
        const _config_4 = (0, import_middleware_retry.resolveRetryConfig)(_config_3);
        const _config_5 = (0, import_middleware_host_header.resolveHostHeaderConfig)(_config_4);
        const _config_6 = (0, import_middleware_sdk_sqs.resolveQueueUrlConfig)(_config_5);
        const _config_7 = (0, import_middleware_user_agent.resolveUserAgentConfig)(_config_6);
        const _config_8 = (0, import_httpAuthSchemeProvider.resolveHttpAuthSchemeConfig)(_config_7);
        const _config_9 = resolveRuntimeExtensions(_config_8, (configuration == null ? void 0 : configuration.extensions) || []);
        super(_config_9);
        this.config = _config_9;
        this.middlewareStack.use((0, import_middleware_retry.getRetryPlugin)(this.config));
        this.middlewareStack.use((0, import_middleware_content_length.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0, import_middleware_host_header.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0, import_middleware_logger.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0, import_middleware_recursion_detection.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0, import_middleware_sdk_sqs.getQueueUrlPlugin)(this.config));
        this.middlewareStack.use((0, import_middleware_user_agent.getUserAgentPlugin)(this.config));
        this.middlewareStack.use(
          (0, import_core.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
            httpAuthSchemeParametersProvider: this.getDefaultHttpAuthSchemeParametersProvider(),
            identityProviderConfigProvider: this.getIdentityProviderConfigProvider()
          })
        );
        this.middlewareStack.use((0, import_core.getHttpSigningPlugin)(this.config));
      }
      /**
       * Destroy underlying resources, like sockets. It's usually not necessary to do this.
       * However in Node.js, it's best to explicitly shut down the client's agent when it is no longer needed.
       * Otherwise, sockets might stay open for quite a long time before the server terminates them.
       */
      destroy() {
        super.destroy();
      }
      getDefaultHttpAuthSchemeParametersProvider() {
        return import_httpAuthSchemeProvider.defaultSQSHttpAuthSchemeParametersProvider;
      }
      getIdentityProviderConfigProvider() {
        return async (config) => new import_core.DefaultIdentityProviderConfig({
          "aws.auth#sigv4": config.credentials
        });
      }
    };
    __name2(_SQSClient, "SQSClient");
    var SQSClient = _SQSClient;
    var import_middleware_serde = require_dist_cjs29();
    var import_types = require_dist_cjs();
    var import_core2 = require_dist_cjs37();
    var _SQSServiceException = class _SQSServiceException2 extends import_smithy_client.ServiceException {
      static {
        __name(this, "_SQSServiceException");
      }
      /**
       * @internal
       */
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, _SQSServiceException2.prototype);
      }
    };
    __name2(_SQSServiceException, "SQSServiceException");
    var SQSServiceException = _SQSServiceException;
    var _InvalidAddress = class _InvalidAddress2 extends SQSServiceException {
      static {
        __name(this, "_InvalidAddress");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidAddress",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidAddress";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidAddress2.prototype);
      }
    };
    __name2(_InvalidAddress, "InvalidAddress");
    var InvalidAddress = _InvalidAddress;
    var _InvalidSecurity = class _InvalidSecurity2 extends SQSServiceException {
      static {
        __name(this, "_InvalidSecurity");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidSecurity",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidSecurity";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidSecurity2.prototype);
      }
    };
    __name2(_InvalidSecurity, "InvalidSecurity");
    var InvalidSecurity = _InvalidSecurity;
    var _OverLimit = class _OverLimit2 extends SQSServiceException {
      static {
        __name(this, "_OverLimit");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "OverLimit",
          $fault: "client",
          ...opts
        });
        this.name = "OverLimit";
        this.$fault = "client";
        Object.setPrototypeOf(this, _OverLimit2.prototype);
      }
    };
    __name2(_OverLimit, "OverLimit");
    var OverLimit = _OverLimit;
    var _QueueDoesNotExist = class _QueueDoesNotExist2 extends SQSServiceException {
      static {
        __name(this, "_QueueDoesNotExist");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "QueueDoesNotExist",
          $fault: "client",
          ...opts
        });
        this.name = "QueueDoesNotExist";
        this.$fault = "client";
        Object.setPrototypeOf(this, _QueueDoesNotExist2.prototype);
      }
    };
    __name2(_QueueDoesNotExist, "QueueDoesNotExist");
    var QueueDoesNotExist = _QueueDoesNotExist;
    var _RequestThrottled = class _RequestThrottled2 extends SQSServiceException {
      static {
        __name(this, "_RequestThrottled");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "RequestThrottled",
          $fault: "client",
          ...opts
        });
        this.name = "RequestThrottled";
        this.$fault = "client";
        Object.setPrototypeOf(this, _RequestThrottled2.prototype);
      }
    };
    __name2(_RequestThrottled, "RequestThrottled");
    var RequestThrottled = _RequestThrottled;
    var _UnsupportedOperation = class _UnsupportedOperation2 extends SQSServiceException {
      static {
        __name(this, "_UnsupportedOperation");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "UnsupportedOperation",
          $fault: "client",
          ...opts
        });
        this.name = "UnsupportedOperation";
        this.$fault = "client";
        Object.setPrototypeOf(this, _UnsupportedOperation2.prototype);
      }
    };
    __name2(_UnsupportedOperation, "UnsupportedOperation");
    var UnsupportedOperation = _UnsupportedOperation;
    var _ResourceNotFoundException = class _ResourceNotFoundException2 extends SQSServiceException {
      static {
        __name(this, "_ResourceNotFoundException");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "ResourceNotFoundException",
          $fault: "client",
          ...opts
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, _ResourceNotFoundException2.prototype);
      }
    };
    __name2(_ResourceNotFoundException, "ResourceNotFoundException");
    var ResourceNotFoundException = _ResourceNotFoundException;
    var _MessageNotInflight = class _MessageNotInflight2 extends SQSServiceException {
      static {
        __name(this, "_MessageNotInflight");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "MessageNotInflight",
          $fault: "client",
          ...opts
        });
        this.name = "MessageNotInflight";
        this.$fault = "client";
        Object.setPrototypeOf(this, _MessageNotInflight2.prototype);
      }
    };
    __name2(_MessageNotInflight, "MessageNotInflight");
    var MessageNotInflight = _MessageNotInflight;
    var _ReceiptHandleIsInvalid = class _ReceiptHandleIsInvalid2 extends SQSServiceException {
      static {
        __name(this, "_ReceiptHandleIsInvalid");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "ReceiptHandleIsInvalid",
          $fault: "client",
          ...opts
        });
        this.name = "ReceiptHandleIsInvalid";
        this.$fault = "client";
        Object.setPrototypeOf(this, _ReceiptHandleIsInvalid2.prototype);
      }
    };
    __name2(_ReceiptHandleIsInvalid, "ReceiptHandleIsInvalid");
    var ReceiptHandleIsInvalid = _ReceiptHandleIsInvalid;
    var _BatchEntryIdsNotDistinct = class _BatchEntryIdsNotDistinct2 extends SQSServiceException {
      static {
        __name(this, "_BatchEntryIdsNotDistinct");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "BatchEntryIdsNotDistinct",
          $fault: "client",
          ...opts
        });
        this.name = "BatchEntryIdsNotDistinct";
        this.$fault = "client";
        Object.setPrototypeOf(this, _BatchEntryIdsNotDistinct2.prototype);
      }
    };
    __name2(_BatchEntryIdsNotDistinct, "BatchEntryIdsNotDistinct");
    var BatchEntryIdsNotDistinct = _BatchEntryIdsNotDistinct;
    var _EmptyBatchRequest = class _EmptyBatchRequest2 extends SQSServiceException {
      static {
        __name(this, "_EmptyBatchRequest");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "EmptyBatchRequest",
          $fault: "client",
          ...opts
        });
        this.name = "EmptyBatchRequest";
        this.$fault = "client";
        Object.setPrototypeOf(this, _EmptyBatchRequest2.prototype);
      }
    };
    __name2(_EmptyBatchRequest, "EmptyBatchRequest");
    var EmptyBatchRequest = _EmptyBatchRequest;
    var _InvalidBatchEntryId = class _InvalidBatchEntryId2 extends SQSServiceException {
      static {
        __name(this, "_InvalidBatchEntryId");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidBatchEntryId",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidBatchEntryId";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidBatchEntryId2.prototype);
      }
    };
    __name2(_InvalidBatchEntryId, "InvalidBatchEntryId");
    var InvalidBatchEntryId = _InvalidBatchEntryId;
    var _TooManyEntriesInBatchRequest = class _TooManyEntriesInBatchRequest2 extends SQSServiceException {
      static {
        __name(this, "_TooManyEntriesInBatchRequest");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "TooManyEntriesInBatchRequest",
          $fault: "client",
          ...opts
        });
        this.name = "TooManyEntriesInBatchRequest";
        this.$fault = "client";
        Object.setPrototypeOf(this, _TooManyEntriesInBatchRequest2.prototype);
      }
    };
    __name2(_TooManyEntriesInBatchRequest, "TooManyEntriesInBatchRequest");
    var TooManyEntriesInBatchRequest = _TooManyEntriesInBatchRequest;
    var QueueAttributeName = {
      All: "All",
      ApproximateNumberOfMessages: "ApproximateNumberOfMessages",
      ApproximateNumberOfMessagesDelayed: "ApproximateNumberOfMessagesDelayed",
      ApproximateNumberOfMessagesNotVisible: "ApproximateNumberOfMessagesNotVisible",
      ContentBasedDeduplication: "ContentBasedDeduplication",
      CreatedTimestamp: "CreatedTimestamp",
      DeduplicationScope: "DeduplicationScope",
      DelaySeconds: "DelaySeconds",
      FifoQueue: "FifoQueue",
      FifoThroughputLimit: "FifoThroughputLimit",
      KmsDataKeyReusePeriodSeconds: "KmsDataKeyReusePeriodSeconds",
      KmsMasterKeyId: "KmsMasterKeyId",
      LastModifiedTimestamp: "LastModifiedTimestamp",
      MaximumMessageSize: "MaximumMessageSize",
      MessageRetentionPeriod: "MessageRetentionPeriod",
      Policy: "Policy",
      QueueArn: "QueueArn",
      ReceiveMessageWaitTimeSeconds: "ReceiveMessageWaitTimeSeconds",
      RedriveAllowPolicy: "RedriveAllowPolicy",
      RedrivePolicy: "RedrivePolicy",
      SqsManagedSseEnabled: "SqsManagedSseEnabled",
      VisibilityTimeout: "VisibilityTimeout"
    };
    var _InvalidAttributeName = class _InvalidAttributeName2 extends SQSServiceException {
      static {
        __name(this, "_InvalidAttributeName");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidAttributeName",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidAttributeName";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidAttributeName2.prototype);
      }
    };
    __name2(_InvalidAttributeName, "InvalidAttributeName");
    var InvalidAttributeName = _InvalidAttributeName;
    var _InvalidAttributeValue = class _InvalidAttributeValue2 extends SQSServiceException {
      static {
        __name(this, "_InvalidAttributeValue");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidAttributeValue",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidAttributeValue";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidAttributeValue2.prototype);
      }
    };
    __name2(_InvalidAttributeValue, "InvalidAttributeValue");
    var InvalidAttributeValue = _InvalidAttributeValue;
    var _QueueDeletedRecently = class _QueueDeletedRecently2 extends SQSServiceException {
      static {
        __name(this, "_QueueDeletedRecently");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "QueueDeletedRecently",
          $fault: "client",
          ...opts
        });
        this.name = "QueueDeletedRecently";
        this.$fault = "client";
        Object.setPrototypeOf(this, _QueueDeletedRecently2.prototype);
      }
    };
    __name2(_QueueDeletedRecently, "QueueDeletedRecently");
    var QueueDeletedRecently = _QueueDeletedRecently;
    var _QueueNameExists = class _QueueNameExists2 extends SQSServiceException {
      static {
        __name(this, "_QueueNameExists");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "QueueNameExists",
          $fault: "client",
          ...opts
        });
        this.name = "QueueNameExists";
        this.$fault = "client";
        Object.setPrototypeOf(this, _QueueNameExists2.prototype);
      }
    };
    __name2(_QueueNameExists, "QueueNameExists");
    var QueueNameExists = _QueueNameExists;
    var _InvalidIdFormat = class _InvalidIdFormat2 extends SQSServiceException {
      static {
        __name(this, "_InvalidIdFormat");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidIdFormat",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidIdFormat";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidIdFormat2.prototype);
      }
    };
    __name2(_InvalidIdFormat, "InvalidIdFormat");
    var InvalidIdFormat = _InvalidIdFormat;
    var _PurgeQueueInProgress = class _PurgeQueueInProgress2 extends SQSServiceException {
      static {
        __name(this, "_PurgeQueueInProgress");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "PurgeQueueInProgress",
          $fault: "client",
          ...opts
        });
        this.name = "PurgeQueueInProgress";
        this.$fault = "client";
        Object.setPrototypeOf(this, _PurgeQueueInProgress2.prototype);
      }
    };
    __name2(_PurgeQueueInProgress, "PurgeQueueInProgress");
    var PurgeQueueInProgress = _PurgeQueueInProgress;
    var _KmsAccessDenied = class _KmsAccessDenied2 extends SQSServiceException {
      static {
        __name(this, "_KmsAccessDenied");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsAccessDenied",
          $fault: "client",
          ...opts
        });
        this.name = "KmsAccessDenied";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsAccessDenied2.prototype);
      }
    };
    __name2(_KmsAccessDenied, "KmsAccessDenied");
    var KmsAccessDenied = _KmsAccessDenied;
    var _KmsDisabled = class _KmsDisabled2 extends SQSServiceException {
      static {
        __name(this, "_KmsDisabled");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsDisabled",
          $fault: "client",
          ...opts
        });
        this.name = "KmsDisabled";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsDisabled2.prototype);
      }
    };
    __name2(_KmsDisabled, "KmsDisabled");
    var KmsDisabled = _KmsDisabled;
    var _KmsInvalidKeyUsage = class _KmsInvalidKeyUsage2 extends SQSServiceException {
      static {
        __name(this, "_KmsInvalidKeyUsage");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsInvalidKeyUsage",
          $fault: "client",
          ...opts
        });
        this.name = "KmsInvalidKeyUsage";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsInvalidKeyUsage2.prototype);
      }
    };
    __name2(_KmsInvalidKeyUsage, "KmsInvalidKeyUsage");
    var KmsInvalidKeyUsage = _KmsInvalidKeyUsage;
    var _KmsInvalidState = class _KmsInvalidState2 extends SQSServiceException {
      static {
        __name(this, "_KmsInvalidState");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsInvalidState",
          $fault: "client",
          ...opts
        });
        this.name = "KmsInvalidState";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsInvalidState2.prototype);
      }
    };
    __name2(_KmsInvalidState, "KmsInvalidState");
    var KmsInvalidState = _KmsInvalidState;
    var _KmsNotFound = class _KmsNotFound2 extends SQSServiceException {
      static {
        __name(this, "_KmsNotFound");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsNotFound",
          $fault: "client",
          ...opts
        });
        this.name = "KmsNotFound";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsNotFound2.prototype);
      }
    };
    __name2(_KmsNotFound, "KmsNotFound");
    var KmsNotFound = _KmsNotFound;
    var _KmsOptInRequired = class _KmsOptInRequired2 extends SQSServiceException {
      static {
        __name(this, "_KmsOptInRequired");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsOptInRequired",
          $fault: "client",
          ...opts
        });
        this.name = "KmsOptInRequired";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsOptInRequired2.prototype);
      }
    };
    __name2(_KmsOptInRequired, "KmsOptInRequired");
    var KmsOptInRequired = _KmsOptInRequired;
    var _KmsThrottled = class _KmsThrottled2 extends SQSServiceException {
      static {
        __name(this, "_KmsThrottled");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "KmsThrottled",
          $fault: "client",
          ...opts
        });
        this.name = "KmsThrottled";
        this.$fault = "client";
        Object.setPrototypeOf(this, _KmsThrottled2.prototype);
      }
    };
    __name2(_KmsThrottled, "KmsThrottled");
    var KmsThrottled = _KmsThrottled;
    var MessageSystemAttributeName = {
      AWSTraceHeader: "AWSTraceHeader",
      All: "All",
      ApproximateFirstReceiveTimestamp: "ApproximateFirstReceiveTimestamp",
      ApproximateReceiveCount: "ApproximateReceiveCount",
      DeadLetterQueueSourceArn: "DeadLetterQueueSourceArn",
      MessageDeduplicationId: "MessageDeduplicationId",
      MessageGroupId: "MessageGroupId",
      SenderId: "SenderId",
      SentTimestamp: "SentTimestamp",
      SequenceNumber: "SequenceNumber"
    };
    var _InvalidMessageContents = class _InvalidMessageContents2 extends SQSServiceException {
      static {
        __name(this, "_InvalidMessageContents");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "InvalidMessageContents",
          $fault: "client",
          ...opts
        });
        this.name = "InvalidMessageContents";
        this.$fault = "client";
        Object.setPrototypeOf(this, _InvalidMessageContents2.prototype);
      }
    };
    __name2(_InvalidMessageContents, "InvalidMessageContents");
    var InvalidMessageContents = _InvalidMessageContents;
    var MessageSystemAttributeNameForSends = {
      AWSTraceHeader: "AWSTraceHeader"
    };
    var _BatchRequestTooLong = class _BatchRequestTooLong2 extends SQSServiceException {
      static {
        __name(this, "_BatchRequestTooLong");
      }
      /**
       * @internal
       */
      constructor(opts) {
        super({
          name: "BatchRequestTooLong",
          $fault: "client",
          ...opts
        });
        this.name = "BatchRequestTooLong";
        this.$fault = "client";
        Object.setPrototypeOf(this, _BatchRequestTooLong2.prototype);
      }
    };
    __name2(_BatchRequestTooLong, "BatchRequestTooLong");
    var BatchRequestTooLong = _BatchRequestTooLong;
    var se_AddPermissionCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("AddPermission");
      let body;
      body = JSON.stringify(se_AddPermissionRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_AddPermissionCommand");
    var se_CancelMessageMoveTaskCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("CancelMessageMoveTask");
      let body;
      body = JSON.stringify(se_CancelMessageMoveTaskRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_CancelMessageMoveTaskCommand");
    var se_ChangeMessageVisibilityCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ChangeMessageVisibility");
      let body;
      body = JSON.stringify(se_ChangeMessageVisibilityRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ChangeMessageVisibilityCommand");
    var se_ChangeMessageVisibilityBatchCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ChangeMessageVisibilityBatch");
      let body;
      body = JSON.stringify(se_ChangeMessageVisibilityBatchRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ChangeMessageVisibilityBatchCommand");
    var se_CreateQueueCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("CreateQueue");
      let body;
      body = JSON.stringify(se_CreateQueueRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_CreateQueueCommand");
    var se_DeleteMessageCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("DeleteMessage");
      let body;
      body = JSON.stringify(se_DeleteMessageRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_DeleteMessageCommand");
    var se_DeleteMessageBatchCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("DeleteMessageBatch");
      let body;
      body = JSON.stringify(se_DeleteMessageBatchRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_DeleteMessageBatchCommand");
    var se_DeleteQueueCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("DeleteQueue");
      let body;
      body = JSON.stringify(se_DeleteQueueRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_DeleteQueueCommand");
    var se_GetQueueAttributesCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("GetQueueAttributes");
      let body;
      body = JSON.stringify(se_GetQueueAttributesRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_GetQueueAttributesCommand");
    var se_GetQueueUrlCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("GetQueueUrl");
      let body;
      body = JSON.stringify(se_GetQueueUrlRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_GetQueueUrlCommand");
    var se_ListDeadLetterSourceQueuesCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ListDeadLetterSourceQueues");
      let body;
      body = JSON.stringify(se_ListDeadLetterSourceQueuesRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ListDeadLetterSourceQueuesCommand");
    var se_ListMessageMoveTasksCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ListMessageMoveTasks");
      let body;
      body = JSON.stringify(se_ListMessageMoveTasksRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ListMessageMoveTasksCommand");
    var se_ListQueuesCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ListQueues");
      let body;
      body = JSON.stringify(se_ListQueuesRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ListQueuesCommand");
    var se_ListQueueTagsCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ListQueueTags");
      let body;
      body = JSON.stringify(se_ListQueueTagsRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ListQueueTagsCommand");
    var se_PurgeQueueCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("PurgeQueue");
      let body;
      body = JSON.stringify(se_PurgeQueueRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_PurgeQueueCommand");
    var se_ReceiveMessageCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("ReceiveMessage");
      let body;
      body = JSON.stringify(se_ReceiveMessageRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_ReceiveMessageCommand");
    var se_RemovePermissionCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("RemovePermission");
      let body;
      body = JSON.stringify(se_RemovePermissionRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_RemovePermissionCommand");
    var se_SendMessageCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("SendMessage");
      let body;
      body = JSON.stringify(se_SendMessageRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_SendMessageCommand");
    var se_SendMessageBatchCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("SendMessageBatch");
      let body;
      body = JSON.stringify(se_SendMessageBatchRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_SendMessageBatchCommand");
    var se_SetQueueAttributesCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("SetQueueAttributes");
      let body;
      body = JSON.stringify(se_SetQueueAttributesRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_SetQueueAttributesCommand");
    var se_StartMessageMoveTaskCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("StartMessageMoveTask");
      let body;
      body = JSON.stringify(se_StartMessageMoveTaskRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_StartMessageMoveTaskCommand");
    var se_TagQueueCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("TagQueue");
      let body;
      body = JSON.stringify(se_TagQueueRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_TagQueueCommand");
    var se_UntagQueueCommand = /* @__PURE__ */ __name2(async (input, context) => {
      const headers = sharedHeaders("UntagQueue");
      let body;
      body = JSON.stringify(se_UntagQueueRequest(input, context));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    }, "se_UntagQueueCommand");
    var de_AddPermissionCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_AddPermissionCommand");
    var de_CancelMessageMoveTaskCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_CancelMessageMoveTaskCommand");
    var de_ChangeMessageVisibilityCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_ChangeMessageVisibilityCommand");
    var de_ChangeMessageVisibilityBatchCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_ChangeMessageVisibilityBatchCommand");
    var de_CreateQueueCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_CreateQueueCommand");
    var de_DeleteMessageCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_DeleteMessageCommand");
    var de_DeleteMessageBatchCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_DeleteMessageBatchCommand");
    var de_DeleteQueueCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_DeleteQueueCommand");
    var de_GetQueueAttributesCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_GetQueueAttributesCommand");
    var de_GetQueueUrlCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_GetQueueUrlCommand");
    var de_ListDeadLetterSourceQueuesCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_ListDeadLetterSourceQueuesCommand");
    var de_ListMessageMoveTasksCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_ListMessageMoveTasksCommand");
    var de_ListQueuesCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_ListQueuesCommand");
    var de_ListQueueTagsCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_ListQueueTagsCommand");
    var de_PurgeQueueCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_PurgeQueueCommand");
    var de_ReceiveMessageCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = de_ReceiveMessageResult(data, context);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_ReceiveMessageCommand");
    var de_RemovePermissionCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_RemovePermissionCommand");
    var de_SendMessageCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_SendMessageCommand");
    var de_SendMessageBatchCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_SendMessageBatchCommand");
    var de_SetQueueAttributesCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_SetQueueAttributesCommand");
    var de_StartMessageMoveTaskCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await (0, import_core2.parseJsonBody)(output.body, context);
      let contents = {};
      contents = (0, import_smithy_client._json)(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    }, "de_StartMessageMoveTaskCommand");
    var de_TagQueueCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_TagQueueCommand");
    var de_UntagQueueCommand = /* @__PURE__ */ __name2(async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await (0, import_smithy_client.collectBody)(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    }, "de_UntagQueueCommand");
    var de_CommandError = /* @__PURE__ */ __name2(async (output, context) => {
      const parsedOutput = {
        ...output,
        body: await (0, import_core2.parseJsonErrorBody)(output.body, context)
      };
      populateBodyWithQueryCompatibility(parsedOutput, output.headers);
      const errorCode = (0, import_core2.loadRestJsonErrorCode)(output, parsedOutput.body);
      switch (errorCode) {
        case "InvalidAddress":
        case "com.amazonaws.sqs#InvalidAddress":
          throw await de_InvalidAddressRes(parsedOutput, context);
        case "InvalidSecurity":
        case "com.amazonaws.sqs#InvalidSecurity":
          throw await de_InvalidSecurityRes(parsedOutput, context);
        case "OverLimit":
        case "com.amazonaws.sqs#OverLimit":
          throw await de_OverLimitRes(parsedOutput, context);
        case "QueueDoesNotExist":
        case "com.amazonaws.sqs#QueueDoesNotExist":
          throw await de_QueueDoesNotExistRes(parsedOutput, context);
        case "RequestThrottled":
        case "com.amazonaws.sqs#RequestThrottled":
          throw await de_RequestThrottledRes(parsedOutput, context);
        case "UnsupportedOperation":
        case "com.amazonaws.sqs#UnsupportedOperation":
          throw await de_UnsupportedOperationRes(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.sqs#ResourceNotFoundException":
          throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "MessageNotInflight":
        case "com.amazonaws.sqs#MessageNotInflight":
          throw await de_MessageNotInflightRes(parsedOutput, context);
        case "ReceiptHandleIsInvalid":
        case "com.amazonaws.sqs#ReceiptHandleIsInvalid":
          throw await de_ReceiptHandleIsInvalidRes(parsedOutput, context);
        case "BatchEntryIdsNotDistinct":
        case "com.amazonaws.sqs#BatchEntryIdsNotDistinct":
          throw await de_BatchEntryIdsNotDistinctRes(parsedOutput, context);
        case "EmptyBatchRequest":
        case "com.amazonaws.sqs#EmptyBatchRequest":
          throw await de_EmptyBatchRequestRes(parsedOutput, context);
        case "InvalidBatchEntryId":
        case "com.amazonaws.sqs#InvalidBatchEntryId":
          throw await de_InvalidBatchEntryIdRes(parsedOutput, context);
        case "TooManyEntriesInBatchRequest":
        case "com.amazonaws.sqs#TooManyEntriesInBatchRequest":
          throw await de_TooManyEntriesInBatchRequestRes(parsedOutput, context);
        case "InvalidAttributeName":
        case "com.amazonaws.sqs#InvalidAttributeName":
          throw await de_InvalidAttributeNameRes(parsedOutput, context);
        case "InvalidAttributeValue":
        case "com.amazonaws.sqs#InvalidAttributeValue":
          throw await de_InvalidAttributeValueRes(parsedOutput, context);
        case "QueueDeletedRecently":
        case "com.amazonaws.sqs#QueueDeletedRecently":
          throw await de_QueueDeletedRecentlyRes(parsedOutput, context);
        case "QueueNameExists":
        case "com.amazonaws.sqs#QueueNameExists":
          throw await de_QueueNameExistsRes(parsedOutput, context);
        case "InvalidIdFormat":
        case "com.amazonaws.sqs#InvalidIdFormat":
          throw await de_InvalidIdFormatRes(parsedOutput, context);
        case "PurgeQueueInProgress":
        case "com.amazonaws.sqs#PurgeQueueInProgress":
          throw await de_PurgeQueueInProgressRes(parsedOutput, context);
        case "KmsAccessDenied":
        case "com.amazonaws.sqs#KmsAccessDenied":
          throw await de_KmsAccessDeniedRes(parsedOutput, context);
        case "KmsDisabled":
        case "com.amazonaws.sqs#KmsDisabled":
          throw await de_KmsDisabledRes(parsedOutput, context);
        case "KmsInvalidKeyUsage":
        case "com.amazonaws.sqs#KmsInvalidKeyUsage":
          throw await de_KmsInvalidKeyUsageRes(parsedOutput, context);
        case "KmsInvalidState":
        case "com.amazonaws.sqs#KmsInvalidState":
          throw await de_KmsInvalidStateRes(parsedOutput, context);
        case "KmsNotFound":
        case "com.amazonaws.sqs#KmsNotFound":
          throw await de_KmsNotFoundRes(parsedOutput, context);
        case "KmsOptInRequired":
        case "com.amazonaws.sqs#KmsOptInRequired":
          throw await de_KmsOptInRequiredRes(parsedOutput, context);
        case "KmsThrottled":
        case "com.amazonaws.sqs#KmsThrottled":
          throw await de_KmsThrottledRes(parsedOutput, context);
        case "InvalidMessageContents":
        case "com.amazonaws.sqs#InvalidMessageContents":
          throw await de_InvalidMessageContentsRes(parsedOutput, context);
        case "BatchRequestTooLong":
        case "com.amazonaws.sqs#BatchRequestTooLong":
          throw await de_BatchRequestTooLongRes(parsedOutput, context);
        default:
          const parsedBody = parsedOutput.body;
          return throwDefaultError({
            output,
            parsedBody,
            errorCode
          });
      }
    }, "de_CommandError");
    var de_BatchEntryIdsNotDistinctRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new BatchEntryIdsNotDistinct({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_BatchEntryIdsNotDistinctRes");
    var de_BatchRequestTooLongRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new BatchRequestTooLong({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_BatchRequestTooLongRes");
    var de_EmptyBatchRequestRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new EmptyBatchRequest({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_EmptyBatchRequestRes");
    var de_InvalidAddressRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidAddress({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidAddressRes");
    var de_InvalidAttributeNameRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidAttributeName({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidAttributeNameRes");
    var de_InvalidAttributeValueRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidAttributeValue({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidAttributeValueRes");
    var de_InvalidBatchEntryIdRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidBatchEntryId({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidBatchEntryIdRes");
    var de_InvalidIdFormatRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidIdFormat({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidIdFormatRes");
    var de_InvalidMessageContentsRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidMessageContents({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidMessageContentsRes");
    var de_InvalidSecurityRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new InvalidSecurity({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_InvalidSecurityRes");
    var de_KmsAccessDeniedRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsAccessDenied({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsAccessDeniedRes");
    var de_KmsDisabledRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsDisabled({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsDisabledRes");
    var de_KmsInvalidKeyUsageRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsInvalidKeyUsage({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsInvalidKeyUsageRes");
    var de_KmsInvalidStateRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsInvalidState({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsInvalidStateRes");
    var de_KmsNotFoundRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsNotFound({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsNotFoundRes");
    var de_KmsOptInRequiredRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsOptInRequired({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsOptInRequiredRes");
    var de_KmsThrottledRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new KmsThrottled({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_KmsThrottledRes");
    var de_MessageNotInflightRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new MessageNotInflight({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_MessageNotInflightRes");
    var de_OverLimitRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new OverLimit({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_OverLimitRes");
    var de_PurgeQueueInProgressRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new PurgeQueueInProgress({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_PurgeQueueInProgressRes");
    var de_QueueDeletedRecentlyRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new QueueDeletedRecently({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_QueueDeletedRecentlyRes");
    var de_QueueDoesNotExistRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new QueueDoesNotExist({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_QueueDoesNotExistRes");
    var de_QueueNameExistsRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new QueueNameExists({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_QueueNameExistsRes");
    var de_ReceiptHandleIsInvalidRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new ReceiptHandleIsInvalid({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_ReceiptHandleIsInvalidRes");
    var de_RequestThrottledRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new RequestThrottled({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_RequestThrottledRes");
    var de_ResourceNotFoundExceptionRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_ResourceNotFoundExceptionRes");
    var de_TooManyEntriesInBatchRequestRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new TooManyEntriesInBatchRequest({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_TooManyEntriesInBatchRequestRes");
    var de_UnsupportedOperationRes = /* @__PURE__ */ __name2(async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = (0, import_smithy_client._json)(body);
      const exception = new UnsupportedOperation({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return (0, import_smithy_client.decorateServiceException)(exception, body);
    }, "de_UnsupportedOperationRes");
    var se_ActionNameList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_ActionNameList");
    var se_AddPermissionRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        AWSAccountIds: (_) => se_AWSAccountIdList(_, context),
        Actions: (_) => se_ActionNameList(_, context),
        Label: import_core2._toStr,
        QueueUrl: import_core2._toStr
      });
    }, "se_AddPermissionRequest");
    var se_AttributeNameList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_AttributeNameList");
    var se_AWSAccountIdList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_AWSAccountIdList");
    var se_BinaryList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return context.base64Encoder(entry);
      });
    }, "se_BinaryList");
    var se_CancelMessageMoveTaskRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        TaskHandle: import_core2._toStr
      });
    }, "se_CancelMessageMoveTaskRequest");
    var se_ChangeMessageVisibilityBatchRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Entries: (_) => se_ChangeMessageVisibilityBatchRequestEntryList(_, context),
        QueueUrl: import_core2._toStr
      });
    }, "se_ChangeMessageVisibilityBatchRequest");
    var se_ChangeMessageVisibilityBatchRequestEntry = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Id: import_core2._toStr,
        ReceiptHandle: import_core2._toStr,
        VisibilityTimeout: import_core2._toNum
      });
    }, "se_ChangeMessageVisibilityBatchRequestEntry");
    var se_ChangeMessageVisibilityBatchRequestEntryList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return se_ChangeMessageVisibilityBatchRequestEntry(entry, context);
      });
    }, "se_ChangeMessageVisibilityBatchRequestEntryList");
    var se_ChangeMessageVisibilityRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr,
        ReceiptHandle: import_core2._toStr,
        VisibilityTimeout: import_core2._toNum
      });
    }, "se_ChangeMessageVisibilityRequest");
    var se_CreateQueueRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Attributes: (_) => se_QueueAttributeMap(_, context),
        QueueName: import_core2._toStr,
        tags: (_) => se_TagMap(_, context)
      });
    }, "se_CreateQueueRequest");
    var se_DeleteMessageBatchRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Entries: (_) => se_DeleteMessageBatchRequestEntryList(_, context),
        QueueUrl: import_core2._toStr
      });
    }, "se_DeleteMessageBatchRequest");
    var se_DeleteMessageBatchRequestEntry = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Id: import_core2._toStr,
        ReceiptHandle: import_core2._toStr
      });
    }, "se_DeleteMessageBatchRequestEntry");
    var se_DeleteMessageBatchRequestEntryList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return se_DeleteMessageBatchRequestEntry(entry, context);
      });
    }, "se_DeleteMessageBatchRequestEntryList");
    var se_DeleteMessageRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr,
        ReceiptHandle: import_core2._toStr
      });
    }, "se_DeleteMessageRequest");
    var se_DeleteQueueRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr
      });
    }, "se_DeleteQueueRequest");
    var se_GetQueueAttributesRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        AttributeNames: (_) => se_AttributeNameList(_, context),
        QueueUrl: import_core2._toStr
      });
    }, "se_GetQueueAttributesRequest");
    var se_GetQueueUrlRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueName: import_core2._toStr,
        QueueOwnerAWSAccountId: import_core2._toStr
      });
    }, "se_GetQueueUrlRequest");
    var se_ListDeadLetterSourceQueuesRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        MaxResults: import_core2._toNum,
        NextToken: import_core2._toStr,
        QueueUrl: import_core2._toStr
      });
    }, "se_ListDeadLetterSourceQueuesRequest");
    var se_ListMessageMoveTasksRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        MaxResults: import_core2._toNum,
        SourceArn: import_core2._toStr
      });
    }, "se_ListMessageMoveTasksRequest");
    var se_ListQueuesRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        MaxResults: import_core2._toNum,
        NextToken: import_core2._toStr,
        QueueNamePrefix: import_core2._toStr
      });
    }, "se_ListQueuesRequest");
    var se_ListQueueTagsRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr
      });
    }, "se_ListQueueTagsRequest");
    var se_MessageAttributeNameList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_MessageAttributeNameList");
    var se_MessageAttributeValue = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        BinaryListValues: (_) => se_BinaryList(_, context),
        BinaryValue: context.base64Encoder,
        DataType: import_core2._toStr,
        StringListValues: (_) => se_StringList(_, context),
        StringValue: import_core2._toStr
      });
    }, "se_MessageAttributeValue");
    var se_MessageBodyAttributeMap = /* @__PURE__ */ __name2((input, context) => {
      return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
          return acc;
        }
        acc[key] = se_MessageAttributeValue(value, context);
        return acc;
      }, {});
    }, "se_MessageBodyAttributeMap");
    var se_MessageBodySystemAttributeMap = /* @__PURE__ */ __name2((input, context) => {
      return Object.entries(input).reduce(
        (acc, [key, value]) => {
          if (value === null) {
            return acc;
          }
          acc[key] = se_MessageSystemAttributeValue(value, context);
          return acc;
        },
        {}
      );
    }, "se_MessageBodySystemAttributeMap");
    var se_MessageSystemAttributeList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_MessageSystemAttributeList");
    var se_MessageSystemAttributeValue = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        BinaryListValues: (_) => se_BinaryList(_, context),
        BinaryValue: context.base64Encoder,
        DataType: import_core2._toStr,
        StringListValues: (_) => se_StringList(_, context),
        StringValue: import_core2._toStr
      });
    }, "se_MessageSystemAttributeValue");
    var se_PurgeQueueRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr
      });
    }, "se_PurgeQueueRequest");
    var se_QueueAttributeMap = /* @__PURE__ */ __name2((input, context) => {
      return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
          return acc;
        }
        acc[key] = (0, import_core2._toStr)(value);
        return acc;
      }, {});
    }, "se_QueueAttributeMap");
    var se_ReceiveMessageRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        AttributeNames: (_) => se_AttributeNameList(_, context),
        MaxNumberOfMessages: import_core2._toNum,
        MessageAttributeNames: (_) => se_MessageAttributeNameList(_, context),
        MessageSystemAttributeNames: (_) => se_MessageSystemAttributeList(_, context),
        QueueUrl: import_core2._toStr,
        ReceiveRequestAttemptId: import_core2._toStr,
        VisibilityTimeout: import_core2._toNum,
        WaitTimeSeconds: import_core2._toNum
      });
    }, "se_ReceiveMessageRequest");
    var se_RemovePermissionRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Label: import_core2._toStr,
        QueueUrl: import_core2._toStr
      });
    }, "se_RemovePermissionRequest");
    var se_SendMessageBatchRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Entries: (_) => se_SendMessageBatchRequestEntryList(_, context),
        QueueUrl: import_core2._toStr
      });
    }, "se_SendMessageBatchRequest");
    var se_SendMessageBatchRequestEntry = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        DelaySeconds: import_core2._toNum,
        Id: import_core2._toStr,
        MessageAttributes: (_) => se_MessageBodyAttributeMap(_, context),
        MessageBody: import_core2._toStr,
        MessageDeduplicationId: import_core2._toStr,
        MessageGroupId: import_core2._toStr,
        MessageSystemAttributes: (_) => se_MessageBodySystemAttributeMap(_, context)
      });
    }, "se_SendMessageBatchRequestEntry");
    var se_SendMessageBatchRequestEntryList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return se_SendMessageBatchRequestEntry(entry, context);
      });
    }, "se_SendMessageBatchRequestEntryList");
    var se_SendMessageRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        DelaySeconds: import_core2._toNum,
        MessageAttributes: (_) => se_MessageBodyAttributeMap(_, context),
        MessageBody: import_core2._toStr,
        MessageDeduplicationId: import_core2._toStr,
        MessageGroupId: import_core2._toStr,
        MessageSystemAttributes: (_) => se_MessageBodySystemAttributeMap(_, context),
        QueueUrl: import_core2._toStr
      });
    }, "se_SendMessageRequest");
    var se_SetQueueAttributesRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        Attributes: (_) => se_QueueAttributeMap(_, context),
        QueueUrl: import_core2._toStr
      });
    }, "se_SetQueueAttributesRequest");
    var se_StartMessageMoveTaskRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        DestinationArn: import_core2._toStr,
        MaxNumberOfMessagesPerSecond: import_core2._toNum,
        SourceArn: import_core2._toStr
      });
    }, "se_StartMessageMoveTaskRequest");
    var se_StringList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_StringList");
    var se_TagKeyList = /* @__PURE__ */ __name2((input, context) => {
      return input.filter((e) => e != null).map((entry) => {
        return (0, import_core2._toStr)(entry);
      });
    }, "se_TagKeyList");
    var se_TagMap = /* @__PURE__ */ __name2((input, context) => {
      return Object.entries(input).reduce((acc, [key, value]) => {
        if (value === null) {
          return acc;
        }
        acc[key] = (0, import_core2._toStr)(value);
        return acc;
      }, {});
    }, "se_TagMap");
    var se_TagQueueRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr,
        Tags: (_) => se_TagMap(_, context)
      });
    }, "se_TagQueueRequest");
    var se_UntagQueueRequest = /* @__PURE__ */ __name2((input, context) => {
      return (0, import_smithy_client.take)(input, {
        QueueUrl: import_core2._toStr,
        TagKeys: (_) => se_TagKeyList(_, context)
      });
    }, "se_UntagQueueRequest");
    var de_BinaryList = /* @__PURE__ */ __name2((output, context) => {
      const retVal = (output || []).filter((e) => e != null).map((entry) => {
        return context.base64Decoder(entry);
      });
      return retVal;
    }, "de_BinaryList");
    var de_Message = /* @__PURE__ */ __name2((output, context) => {
      return (0, import_smithy_client.take)(output, {
        Attributes: import_smithy_client._json,
        Body: import_smithy_client.expectString,
        MD5OfBody: import_smithy_client.expectString,
        MD5OfMessageAttributes: import_smithy_client.expectString,
        MessageAttributes: (_) => de_MessageBodyAttributeMap(_, context),
        MessageId: import_smithy_client.expectString,
        ReceiptHandle: import_smithy_client.expectString
      });
    }, "de_Message");
    var de_MessageAttributeValue = /* @__PURE__ */ __name2((output, context) => {
      return (0, import_smithy_client.take)(output, {
        BinaryListValues: (_) => de_BinaryList(_, context),
        BinaryValue: context.base64Decoder,
        DataType: import_smithy_client.expectString,
        StringListValues: import_smithy_client._json,
        StringValue: import_smithy_client.expectString
      });
    }, "de_MessageAttributeValue");
    var de_MessageBodyAttributeMap = /* @__PURE__ */ __name2((output, context) => {
      return Object.entries(output).reduce((acc, [key, value]) => {
        if (value === null) {
          return acc;
        }
        acc[key] = de_MessageAttributeValue(value, context);
        return acc;
      }, {});
    }, "de_MessageBodyAttributeMap");
    var de_MessageList = /* @__PURE__ */ __name2((output, context) => {
      const retVal = (output || []).filter((e) => e != null).map((entry) => {
        return de_Message(entry, context);
      });
      return retVal;
    }, "de_MessageList");
    var de_ReceiveMessageResult = /* @__PURE__ */ __name2((output, context) => {
      return (0, import_smithy_client.take)(output, {
        Messages: (_) => de_MessageList(_, context)
      });
    }, "de_ReceiveMessageResult");
    var deserializeMetadata = /* @__PURE__ */ __name2((output) => ({
      httpStatusCode: output.statusCode,
      requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
      extendedRequestId: output.headers["x-amz-id-2"],
      cfId: output.headers["x-amz-cf-id"]
    }), "deserializeMetadata");
    var throwDefaultError = (0, import_smithy_client.withBaseException)(SQSServiceException);
    var buildHttpRpcRequest = /* @__PURE__ */ __name2(async (context, headers, path2, resolvedHostname, body) => {
      const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
      const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path2 : basePath + path2,
        headers
      };
      if (resolvedHostname !== void 0) {
        contents.hostname = resolvedHostname;
      }
      if (body !== void 0) {
        contents.body = body;
      }
      return new import_protocol_http.HttpRequest(contents);
    }, "buildHttpRpcRequest");
    function sharedHeaders(operation) {
      return {
        "content-type": "application/x-amz-json-1.0",
        "x-amz-target": `AmazonSQS.${operation}`
      };
    }
    __name(sharedHeaders, "sharedHeaders");
    __name2(sharedHeaders, "sharedHeaders");
    var populateBodyWithQueryCompatibility = /* @__PURE__ */ __name2((parsedOutput, headers) => {
      const queryErrorHeader = headers["x-amzn-query-error"];
      if (parsedOutput.body !== void 0 && queryErrorHeader != null) {
        const codeAndType = queryErrorHeader.split(";");
        parsedOutput.body.Code = codeAndType[0];
        parsedOutput.body.Type = codeAndType[1];
      }
    }, "populateBodyWithQueryCompatibility");
    var _AddPermissionCommand = class _AddPermissionCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "AddPermission", {}).n("SQSClient", "AddPermissionCommand").f(void 0, void 0).ser(se_AddPermissionCommand).de(de_AddPermissionCommand).build() {
      static {
        __name(this, "_AddPermissionCommand");
      }
    };
    __name2(_AddPermissionCommand, "AddPermissionCommand");
    var AddPermissionCommand = _AddPermissionCommand;
    var _CancelMessageMoveTaskCommand = class _CancelMessageMoveTaskCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "CancelMessageMoveTask", {}).n("SQSClient", "CancelMessageMoveTaskCommand").f(void 0, void 0).ser(se_CancelMessageMoveTaskCommand).de(de_CancelMessageMoveTaskCommand).build() {
      static {
        __name(this, "_CancelMessageMoveTaskCommand");
      }
    };
    __name2(_CancelMessageMoveTaskCommand, "CancelMessageMoveTaskCommand");
    var CancelMessageMoveTaskCommand = _CancelMessageMoveTaskCommand;
    var _ChangeMessageVisibilityBatchCommand = class _ChangeMessageVisibilityBatchCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "ChangeMessageVisibilityBatch", {}).n("SQSClient", "ChangeMessageVisibilityBatchCommand").f(void 0, void 0).ser(se_ChangeMessageVisibilityBatchCommand).de(de_ChangeMessageVisibilityBatchCommand).build() {
      static {
        __name(this, "_ChangeMessageVisibilityBatchCommand");
      }
    };
    __name2(_ChangeMessageVisibilityBatchCommand, "ChangeMessageVisibilityBatchCommand");
    var ChangeMessageVisibilityBatchCommand = _ChangeMessageVisibilityBatchCommand;
    var _ChangeMessageVisibilityCommand = class _ChangeMessageVisibilityCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "ChangeMessageVisibility", {}).n("SQSClient", "ChangeMessageVisibilityCommand").f(void 0, void 0).ser(se_ChangeMessageVisibilityCommand).de(de_ChangeMessageVisibilityCommand).build() {
      static {
        __name(this, "_ChangeMessageVisibilityCommand");
      }
    };
    __name2(_ChangeMessageVisibilityCommand, "ChangeMessageVisibilityCommand");
    var ChangeMessageVisibilityCommand = _ChangeMessageVisibilityCommand;
    var _CreateQueueCommand = class _CreateQueueCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "CreateQueue", {}).n("SQSClient", "CreateQueueCommand").f(void 0, void 0).ser(se_CreateQueueCommand).de(de_CreateQueueCommand).build() {
      static {
        __name(this, "_CreateQueueCommand");
      }
    };
    __name2(_CreateQueueCommand, "CreateQueueCommand");
    var CreateQueueCommand = _CreateQueueCommand;
    var _DeleteMessageBatchCommand = class _DeleteMessageBatchCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "DeleteMessageBatch", {}).n("SQSClient", "DeleteMessageBatchCommand").f(void 0, void 0).ser(se_DeleteMessageBatchCommand).de(de_DeleteMessageBatchCommand).build() {
      static {
        __name(this, "_DeleteMessageBatchCommand");
      }
    };
    __name2(_DeleteMessageBatchCommand, "DeleteMessageBatchCommand");
    var DeleteMessageBatchCommand = _DeleteMessageBatchCommand;
    var _DeleteMessageCommand = class _DeleteMessageCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "DeleteMessage", {}).n("SQSClient", "DeleteMessageCommand").f(void 0, void 0).ser(se_DeleteMessageCommand).de(de_DeleteMessageCommand).build() {
      static {
        __name(this, "_DeleteMessageCommand");
      }
    };
    __name2(_DeleteMessageCommand, "DeleteMessageCommand");
    var DeleteMessageCommand = _DeleteMessageCommand;
    var _DeleteQueueCommand = class _DeleteQueueCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "DeleteQueue", {}).n("SQSClient", "DeleteQueueCommand").f(void 0, void 0).ser(se_DeleteQueueCommand).de(de_DeleteQueueCommand).build() {
      static {
        __name(this, "_DeleteQueueCommand");
      }
    };
    __name2(_DeleteQueueCommand, "DeleteQueueCommand");
    var DeleteQueueCommand = _DeleteQueueCommand;
    var _GetQueueAttributesCommand = class _GetQueueAttributesCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "GetQueueAttributes", {}).n("SQSClient", "GetQueueAttributesCommand").f(void 0, void 0).ser(se_GetQueueAttributesCommand).de(de_GetQueueAttributesCommand).build() {
      static {
        __name(this, "_GetQueueAttributesCommand");
      }
    };
    __name2(_GetQueueAttributesCommand, "GetQueueAttributesCommand");
    var GetQueueAttributesCommand = _GetQueueAttributesCommand;
    var _GetQueueUrlCommand = class _GetQueueUrlCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "GetQueueUrl", {}).n("SQSClient", "GetQueueUrlCommand").f(void 0, void 0).ser(se_GetQueueUrlCommand).de(de_GetQueueUrlCommand).build() {
      static {
        __name(this, "_GetQueueUrlCommand");
      }
    };
    __name2(_GetQueueUrlCommand, "GetQueueUrlCommand");
    var GetQueueUrlCommand = _GetQueueUrlCommand;
    var _ListDeadLetterSourceQueuesCommand = class _ListDeadLetterSourceQueuesCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "ListDeadLetterSourceQueues", {}).n("SQSClient", "ListDeadLetterSourceQueuesCommand").f(void 0, void 0).ser(se_ListDeadLetterSourceQueuesCommand).de(de_ListDeadLetterSourceQueuesCommand).build() {
      static {
        __name(this, "_ListDeadLetterSourceQueuesCommand");
      }
    };
    __name2(_ListDeadLetterSourceQueuesCommand, "ListDeadLetterSourceQueuesCommand");
    var ListDeadLetterSourceQueuesCommand = _ListDeadLetterSourceQueuesCommand;
    var _ListMessageMoveTasksCommand = class _ListMessageMoveTasksCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "ListMessageMoveTasks", {}).n("SQSClient", "ListMessageMoveTasksCommand").f(void 0, void 0).ser(se_ListMessageMoveTasksCommand).de(de_ListMessageMoveTasksCommand).build() {
      static {
        __name(this, "_ListMessageMoveTasksCommand");
      }
    };
    __name2(_ListMessageMoveTasksCommand, "ListMessageMoveTasksCommand");
    var ListMessageMoveTasksCommand = _ListMessageMoveTasksCommand;
    var _ListQueuesCommand = class _ListQueuesCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "ListQueues", {}).n("SQSClient", "ListQueuesCommand").f(void 0, void 0).ser(se_ListQueuesCommand).de(de_ListQueuesCommand).build() {
      static {
        __name(this, "_ListQueuesCommand");
      }
    };
    __name2(_ListQueuesCommand, "ListQueuesCommand");
    var ListQueuesCommand = _ListQueuesCommand;
    var _ListQueueTagsCommand = class _ListQueueTagsCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "ListQueueTags", {}).n("SQSClient", "ListQueueTagsCommand").f(void 0, void 0).ser(se_ListQueueTagsCommand).de(de_ListQueueTagsCommand).build() {
      static {
        __name(this, "_ListQueueTagsCommand");
      }
    };
    __name2(_ListQueueTagsCommand, "ListQueueTagsCommand");
    var ListQueueTagsCommand = _ListQueueTagsCommand;
    var _PurgeQueueCommand = class _PurgeQueueCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "PurgeQueue", {}).n("SQSClient", "PurgeQueueCommand").f(void 0, void 0).ser(se_PurgeQueueCommand).de(de_PurgeQueueCommand).build() {
      static {
        __name(this, "_PurgeQueueCommand");
      }
    };
    __name2(_PurgeQueueCommand, "PurgeQueueCommand");
    var PurgeQueueCommand = _PurgeQueueCommand;
    var _ReceiveMessageCommand = class _ReceiveMessageCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()),
        (0, import_middleware_sdk_sqs.getReceiveMessagePlugin)(config)
      ];
    }).s("AmazonSQS", "ReceiveMessage", {}).n("SQSClient", "ReceiveMessageCommand").f(void 0, void 0).ser(se_ReceiveMessageCommand).de(de_ReceiveMessageCommand).build() {
      static {
        __name(this, "_ReceiveMessageCommand");
      }
    };
    __name2(_ReceiveMessageCommand, "ReceiveMessageCommand");
    var ReceiveMessageCommand = _ReceiveMessageCommand;
    var _RemovePermissionCommand = class _RemovePermissionCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "RemovePermission", {}).n("SQSClient", "RemovePermissionCommand").f(void 0, void 0).ser(se_RemovePermissionCommand).de(de_RemovePermissionCommand).build() {
      static {
        __name(this, "_RemovePermissionCommand");
      }
    };
    __name2(_RemovePermissionCommand, "RemovePermissionCommand");
    var RemovePermissionCommand = _RemovePermissionCommand;
    var _SendMessageBatchCommand = class _SendMessageBatchCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()),
        (0, import_middleware_sdk_sqs.getSendMessageBatchPlugin)(config)
      ];
    }).s("AmazonSQS", "SendMessageBatch", {}).n("SQSClient", "SendMessageBatchCommand").f(void 0, void 0).ser(se_SendMessageBatchCommand).de(de_SendMessageBatchCommand).build() {
      static {
        __name(this, "_SendMessageBatchCommand");
      }
    };
    __name2(_SendMessageBatchCommand, "SendMessageBatchCommand");
    var SendMessageBatchCommand = _SendMessageBatchCommand;
    var _SendMessageCommand = class _SendMessageCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions()),
        (0, import_middleware_sdk_sqs.getSendMessagePlugin)(config)
      ];
    }).s("AmazonSQS", "SendMessage", {}).n("SQSClient", "SendMessageCommand").f(void 0, void 0).ser(se_SendMessageCommand).de(de_SendMessageCommand).build() {
      static {
        __name(this, "_SendMessageCommand");
      }
    };
    __name2(_SendMessageCommand, "SendMessageCommand");
    var SendMessageCommand = _SendMessageCommand;
    var _SetQueueAttributesCommand = class _SetQueueAttributesCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "SetQueueAttributes", {}).n("SQSClient", "SetQueueAttributesCommand").f(void 0, void 0).ser(se_SetQueueAttributesCommand).de(de_SetQueueAttributesCommand).build() {
      static {
        __name(this, "_SetQueueAttributesCommand");
      }
    };
    __name2(_SetQueueAttributesCommand, "SetQueueAttributesCommand");
    var SetQueueAttributesCommand = _SetQueueAttributesCommand;
    var _StartMessageMoveTaskCommand = class _StartMessageMoveTaskCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "StartMessageMoveTask", {}).n("SQSClient", "StartMessageMoveTaskCommand").f(void 0, void 0).ser(se_StartMessageMoveTaskCommand).de(de_StartMessageMoveTaskCommand).build() {
      static {
        __name(this, "_StartMessageMoveTaskCommand");
      }
    };
    __name2(_StartMessageMoveTaskCommand, "StartMessageMoveTaskCommand");
    var StartMessageMoveTaskCommand = _StartMessageMoveTaskCommand;
    var _TagQueueCommand = class _TagQueueCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "TagQueue", {}).n("SQSClient", "TagQueueCommand").f(void 0, void 0).ser(se_TagQueueCommand).de(de_TagQueueCommand).build() {
      static {
        __name(this, "_TagQueueCommand");
      }
    };
    __name2(_TagQueueCommand, "TagQueueCommand");
    var TagQueueCommand = _TagQueueCommand;
    var _UntagQueueCommand = class _UntagQueueCommand extends import_smithy_client.Command.classBuilder().ep({
      ...commonParams
    }).m(function(Command, cs, config, o) {
      return [
        (0, import_middleware_serde.getSerdePlugin)(config, this.serialize, this.deserialize),
        (0, import_middleware_endpoint.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())
      ];
    }).s("AmazonSQS", "UntagQueue", {}).n("SQSClient", "UntagQueueCommand").f(void 0, void 0).ser(se_UntagQueueCommand).de(de_UntagQueueCommand).build() {
      static {
        __name(this, "_UntagQueueCommand");
      }
    };
    __name2(_UntagQueueCommand, "UntagQueueCommand");
    var UntagQueueCommand = _UntagQueueCommand;
    var commands = {
      AddPermissionCommand,
      CancelMessageMoveTaskCommand,
      ChangeMessageVisibilityCommand,
      ChangeMessageVisibilityBatchCommand,
      CreateQueueCommand,
      DeleteMessageCommand,
      DeleteMessageBatchCommand,
      DeleteQueueCommand,
      GetQueueAttributesCommand,
      GetQueueUrlCommand,
      ListDeadLetterSourceQueuesCommand,
      ListMessageMoveTasksCommand,
      ListQueuesCommand,
      ListQueueTagsCommand,
      PurgeQueueCommand,
      ReceiveMessageCommand,
      RemovePermissionCommand,
      SendMessageCommand,
      SendMessageBatchCommand,
      SetQueueAttributesCommand,
      StartMessageMoveTaskCommand,
      TagQueueCommand,
      UntagQueueCommand
    };
    var _SQS = class _SQS extends SQSClient {
      static {
        __name(this, "_SQS");
      }
    };
    __name2(_SQS, "SQS");
    var SQS = _SQS;
    (0, import_smithy_client.createAggregatedClient)(commands, SQS);
    var paginateListDeadLetterSourceQueues = (0, import_core.createPaginator)(SQSClient, ListDeadLetterSourceQueuesCommand, "NextToken", "NextToken", "MaxResults");
    var paginateListQueues = (0, import_core.createPaginator)(SQSClient, ListQueuesCommand, "NextToken", "NextToken", "MaxResults");
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/queue.inflight.js
var require_queue_inflight = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/queue.inflight.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.QueueClient = void 0;
    var client_sqs_1 = require_dist_cjs47();
    var QueueClient = class {
      static {
        __name(this, "QueueClient");
      }
      constructor(_queueUrlOrArn, client = new client_sqs_1.SQSClient({})) {
        this._queueUrlOrArn = _queueUrlOrArn;
        this.client = client;
      }
      async push(...messages) {
        if (messages.includes("")) {
          throw new Error("Empty messages are not allowed");
        }
        const messagePromises = messages.map(async (message) => {
          try {
            const command = new client_sqs_1.SendMessageCommand({
              QueueUrl: await this.queueUrl(),
              MessageBody: message
            });
            await this.client.send(command);
          } catch (e) {
            if (e instanceof client_sqs_1.InvalidMessageContents) {
              throw new Error(`The message contains characters outside the allowed set (message=${message}): ${e.stack})}`);
            }
            throw new Error(e.stack);
          }
        });
        await Promise.all(messagePromises);
      }
      async queueUrl() {
        if (!this._queueUrl) {
          if (this._queueUrlOrArn.startsWith("https://")) {
            this._queueUrl = this._queueUrlOrArn;
          } else {
            const arnParts = this._queueUrlOrArn.split(":");
            const queueName = arnParts[arnParts.length - 1].split("/").pop();
            if (!queueName) {
              throw new Error(`Unable to extract queue name from ARN: ${this._queueUrlOrArn}`);
            }
            const command = new client_sqs_1.GetQueueUrlCommand({ QueueName: queueName });
            const data = await this.client.send(command);
            if (!data.QueueUrl) {
              throw new Error(`Unable to resolve queue URL from SQS queue ARN: ${this._queueUrlOrArn}`);
            }
            this._queueUrl = data.QueueUrl;
          }
        }
        return this._queueUrl;
      }
      async purge() {
        const command = new client_sqs_1.PurgeQueueCommand({
          QueueUrl: await this.queueUrl()
        });
        await this.client.send(command);
      }
      async approxSize() {
        const command = new client_sqs_1.GetQueueAttributesCommand({
          QueueUrl: await this.queueUrl(),
          AttributeNames: ["ApproximateNumberOfMessages"]
        });
        const data = await this.client.send(command);
        return Number.parseInt(data.Attributes?.ApproximateNumberOfMessages ?? "0");
      }
      async pop() {
        const receiveCommand = new client_sqs_1.ReceiveMessageCommand({
          QueueUrl: await this.queueUrl(),
          MaxNumberOfMessages: 1
        });
        const data = await this.client.send(receiveCommand);
        if (!data.Messages || data.Messages.length === 0) {
          return void 0;
        }
        const message = data.Messages[0];
        if (message.ReceiptHandle) {
          const deleteCommand = new client_sqs_1.DeleteMessageCommand({
            QueueUrl: await this.queueUrl(),
            ReceiptHandle: message.ReceiptHandle
          });
          await this.client.send(deleteCommand);
        } else {
          console.warn(`No receipt handle found, message not deleted. Message: ${JSON.stringify(message)}`);
        }
        return message.Body;
      }
    };
    exports2.QueueClient = QueueClient;
  }
});

// target/main.tfaws/.wing/function_c852aba6.cjs
var $handler = void 0;
exports.handler = async function(event, context) {
  try {
    if (globalThis.$awsLambdaContext === void 0) {
      globalThis.$awsLambdaContext = context;
      $handler = $handler ?? await (async () => {
        const $Closure2Client = require_inflight_Closure2_1()({
          $q: new (require_queue_inflight()).QueueClient(process.env["QUEUE_URL_1cfcc997"])
        });
        const client = new $Closure2Client({});
        if (client.$inflight_init) {
          await client.$inflight_init();
        }
        return client;
      })();
    } else {
      throw new Error(
        "An AWS Lambda context object was already defined."
      );
    }
    return await $handler.handle(event === null ? void 0 : event);
  } finally {
    globalThis.$awsLambdaContext = void 0;
  }
};
//# sourceMappingURL=index.cjs.map
