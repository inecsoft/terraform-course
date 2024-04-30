bring cloud;
bring expect;
// bring aws;
bring ex;
bring http;

// Rurn wing compile
log("hello world");

let container = new cloud.Bucket();

let fn = new cloud.Function(inflight () => {
  log("hello world");
  container.put("hello.txt", "hello world");
  // return "hello, world";

});

let api = new cloud.Api(cors: true);
let counter = new cloud.Counter();

api.get("/", inflight () => {
  fn.invoke("function request");
});

api.get("/counter", inflight () => {
  return {
    body: "{counter.peek()}"
  };
});

// test "fn returns hello" {
//   expect.equal(fn.invoke(""), "hello, world");
// }


