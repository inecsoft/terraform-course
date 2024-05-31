"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $std_Json, $tasks }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const id = ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(request.vars, "id");
      {
        const $if_let_value = ((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(request.body);
        if ($if_let_value != undefined) {
          const task = $if_let_value;
          const record = ({"id": id, "title": ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(task, "title"))});
          (await $tasks.update(id, record));
          return ({"status": 200, "headers": ({["Content-Type"]: "application/json"}), "body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(record)});
        }
        else {
          return ({"status": 400, "headers": ({["Content-Type"]: "text/plain"}), "body": "Bad Request at api put"});
        }
      }
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map