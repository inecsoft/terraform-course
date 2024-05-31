"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $http_Util, $std_Json, $url }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const r1 = (await $http_Util.get($url));
      (await $expect_Util.equal(r1.status, 200));
      const r1_tasks = JSON.parse(r1.body);
      console.log(String.raw({ raw: ["logging test task_1 ", ""] }, JSON.stringify(r1_tasks)));
      (await $expect_Util.nil((r1_tasks)?.[0]));
      const r2 = (await $http_Util.post($url, { body: ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"title": "First Task"})) }));
      (await $expect_Util.equal(r2.status, 200));
      const r2_task = JSON.parse(r2.body);
      console.log(String.raw({ raw: ["logging test task_2 ", ""] }, JSON.stringify(r2_task)));
      (await $expect_Util.equal(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r2_task, "title")), "First Task"));
      const id = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r2_task, "id"));
      const r3 = (await $http_Util.put(String.raw({ raw: ["", "/", ""] }, $url, id), { body: ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"title": "First Task Updated"})) }));
      (await $expect_Util.equal(r3.status, 200));
      const r3_task = JSON.parse(r3.body);
      console.log(String.raw({ raw: ["logging test task_3 ", ""] }, JSON.stringify(r3_task)));
      console.log(String.raw({ raw: ["value of the id: ", ""] }, id));
      (await $expect_Util.equal(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r3_task, "title")), "First Task Updated"));
      const r4 = (await $http_Util.delete(String.raw({ raw: ["", "/", ""] }, $url, id)));
      (await $expect_Util.equal(r4.status, 200));
      console.log(String.raw({ raw: ["logging test task_4 ", ""] }, ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(r4)));
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map