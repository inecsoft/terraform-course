"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class ReplayableQueue {
    constructor({ $this_bucket, $this_counter, $this_queue }) {
      this.$this_bucket = $this_bucket;
      this.$this_counter = $this_counter;
      this.$this_queue = $this_queue;
    }
    async push(m) {
      (await this.$this_queue.push(m));
      (await this.$this_bucket.put(String.raw({ raw: ["messages/", ""] }, (await this.$this_counter.inc())), m));
    }
    async replay() {
      for (const i of (await this.$this_bucket.list())) {
        (await this.$this_queue.push((await this.$this_bucket.get(i))));
      }
    }
  }
  return ReplayableQueue;
}
//# sourceMappingURL=inflight.ReplayableQueue-1.cjs.map