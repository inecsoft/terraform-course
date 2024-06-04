bring cloud;
bring expect;
bring http;
bring ex;
bring react;

// let queue = new cloud.Queue();
// let bucket = new cloud.Bucket();
// let counter = new cloud.Counter();

// queue.setConsumer(inflight (body: str): void => {
//   let next = counter.inc();
//   let key = "key-{next}";
//   bucket.put(key, body);
// });

// let path = "/hello";
// let api = new cloud.Api();

// api.get(
//   path,
//   inflight () => {
//       return {
//         status: 200,
//         headers: {
//           "Content-Type" => "application/json"
//         },
//         body: "React Wing Workshop"//Json.stringify(request.body)
//       };

//   }
// );

// test "GET hello" {
//   let url = api.url;
//   let res = http.get("{url}/hello");
//   expect.equal(res.status, 200);
//   expect.equal(res.body, "React Wing Workshop");
// }


let web = new react.App({
    projectPath: "./client",
    localPort: 4000,

});

web.addEnvironment("key1", "value1");
web.addEnvironment("title", "Learn React with Wing");

// Enable cross-origin resource sharing (CORS)
let api = new cloud.Api(
  cors: true
);

api.get("/title", inflight () => {
  return {
    status: 200,
    body: "Hello from the API"
  };
});