"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-sim/api.onrequest.inflight.js
var require_api_onrequest_inflight = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-sim/api.onrequest.inflight.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ApiOnRequestHandlerClient = void 0;
    var ApiOnRequestHandlerClient = class {
      static {
        __name(this, "ApiOnRequestHandlerClient");
      }
      constructor({ handler }) {
        this.handler = handler;
      }
      async handle(event) {
        if (!event) {
          throw new Error("invalid API request event");
        }
        let req = JSON.parse(event);
        const response = await this.handler.handle(req);
        if (!response) {
          return void 0;
        } else {
          return JSON.stringify(response);
        }
      }
    };
    exports2.ApiOnRequestHandlerClient = ApiOnRequestHandlerClient;
  }
});

// ../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/helpers.js
var require_helpers = __commonJS({
  "../../.nvm/versions/node/v20.11.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/helpers.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createExternRequire = exports.assign = exports.lookup = exports.unwrap = exports.normalPath = exports.nodeof = exports.range = exports.assert = exports.neq = exports.eq = void 0;
    var node_assert_1 = require("node:assert");
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
    function normalPath(path) {
      return path.replace(/\\+/g, "/");
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
  }
});

// target/test/main.wsim/.wing/inflight.$Closure3-1.cjs
var require_inflight_Closure3_1 = __commonJS({
  "target/test/main.wsim/.wing/inflight.$Closure3-1.cjs"(exports2, module2) {
    "use strict";
    var $helpers = require_helpers();
    module2.exports = function({ $counter }) {
      class $Closure3 {
        static {
          __name(this, "$Closure3");
        }
        constructor({}) {
          const $obj = /* @__PURE__ */ __name((...args) => this.handle(...args), "$obj");
          Object.setPrototypeOf($obj, this);
          return $obj;
        }
        async handle() {
          return { "body": String.raw({ raw: ["", ""] }, await $counter.peek()) };
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
          __createBinding(exports3, m, p);
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
    var constructs_1 = require_lib();
    var errors_1 = require_errors();
    var tokens_1 = require_tokens();
    exports2.INFLIGHT_INIT_METHOD_NAME = "$inflight_init";
    var INFLIGHT_CLOSURE_HANDLE_METHOD = "handle";
    var INFLIGHT_CLOSURE_TYPE_PREFIX = "$Closure";
    function toLiftableModuleType(type, moduleSpec, path) {
      if (typeof type?._toInflightType === "function" || type?.constructor?.name === "Object") {
        return type;
      } else {
        return {
          _toInflightType: () => `require("${moduleSpec}").${path}`
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
    function mergeLiftDeps(matrix1, matrix2) {
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
        } else if (typeof obj === "object" && typeof obj._supportedOps === "function") {
          matrix = {};
          for (const op of obj._supportedOps()) {
            matrix[op] = /* @__PURE__ */ new Map();
          }
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
    function normalPath2(path) {
      if (process.platform === "win32") {
        return path.replace(/\\+/g, "/");
      } else {
        return path;
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
      return s.startsWith("./") || s.startsWith("/");
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
    exports2.inflight = exports2.lift = exports2.InflightClient = exports2.closureId = void 0;
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
       */
      inflight(fn) {
        const _liftMap = { handle: [], $inflight_init: [] };
        for (const [key, obj] of Object.entries(this.lifts)) {
          let knownOps = this.grants[key];
          if (knownOps === void 0 && typeof obj?._supportedOps === "function") {
            knownOps = obj._supportedOps();
          }
          _liftMap.handle.push([obj, knownOps ?? []]);
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
          _supportedOps: () => [],
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
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
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
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
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.makeSimulatorClient = void 0;
    var http = __importStar(require("http"));
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
            if (method === "then" && parsed.error?.message?.startsWith("Method then not found on resource")) {
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

// target/test/main.wsim/.wing/onrequesthandler1_c8966d94.sandbox.cjs
var $handler = void 0;
exports.handler = async function(event) {
  $handler = $handler ?? new (require_api_onrequest_inflight()).ApiOnRequestHandlerClient({
    handler: await (async () => {
      const $Closure3Client = require_inflight_Closure3_1()({
        $counter: function() {
          let handle = process.env.COUNTER_HANDLE_591cd131;
          if (!handle) {
            throw new Error("Missing environment variable: COUNTER_HANDLE_591cd131");
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
    })(),
    args: {}
  });
  return await $handler.handle(event);
};
process.setUncaughtExceptionCaptureCallback((reason) => {
  process.send({ type: "reject", reason });
});
process.on("message", async (message) => {
  const { fn, args } = message;
  const value = await exports[fn](...args);
  process.send({ type: "resolve", value });
});
//# sourceMappingURL=index.cjs.map
