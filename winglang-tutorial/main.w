bring cloud;
bring expect;

// we are going to use a few cloud resources: a queue, a bucket, and a function.
// The general idea is that when a message is pushed to the queue, the function gets triggered and stores it into the bucket.

let q = new cloud.Queue();

let b = new cloud.Bucket() as "Bucket: Last Message";

q.setConsumer(inflight (m: str) => {
  b.put("latest.txt", m);
});

let fn = new cloud.Function(inflight (s: str?) => {
  q.push(s!);
  if s == "" {
    log("Function was invoked without a payload");
  } else {
    log("Function was called with argument '{s!}'");
  }
});