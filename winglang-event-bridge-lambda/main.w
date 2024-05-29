// bring cloud;
// bring expect;

// let fn = new cloud.Function(inflight () => {
//   return "hello, world";
// });

// test "fn returns hello" {
//   expect.equal(fn.invoke(""), "hello, world");
// }


bring cloud;

class ReplayableQueue {
  queue: cloud.Queue;
  bucket: cloud.Bucket;
  counter: cloud.Counter;

  new() {
    this.queue = new cloud.Queue();
    this.bucket = new cloud.Bucket();
    this.counter = new cloud.Counter();
  }

  setConsumer(fn: inflight (str): str){
    this.queue.setConsumer(fn);
  }

  inflight push(m: str) {
    this.queue.push(m);
    this.bucket.put("messages/{this.counter.inc()}", m);
  }

  inflight replay(){
    for i in this.bucket.list() {
      this.queue.push(this.bucket.get(i));
    }
  }
}

let rq = new ReplayableQueue();