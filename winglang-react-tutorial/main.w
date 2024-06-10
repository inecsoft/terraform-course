bring cloud;
bring expect;
bring http;
bring ex;
bring react;
bring util;

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

web.addEnvironment("title", "Learn React with Wing power by TFGM");

// Enable cross-origin resource sharing (CORS)
let api = new cloud.Api(
  cors: true
);

web.addEnvironment("apiUrl", api.url);

api.get("/title", inflight () => {
  return {
    status: 200,
    body: "Hello from the API"
  };
});

pub class FlatFileSystem {
  new() { }
  pub inflight createFolder(name: str) {  }
  pub inflight listFolders(): Array<str> {
    return [];
  }
  pub inflight createFile(folder: str, name: str, content: str){  }
  pub inflight listFiles(folder: str): Array<str> {
    return [];
  }
  pub inflight getFile(folder: str, name: str): str { return str; }
}

let fs = new FlatFileSystem();

test "get and create folders" {
  expect.equal([], fs.listFolders());
  fs.createFolder("a");
  expect.equal(["a"], fs.listFolders());
}

test "get and create file" {
  fs.createFolder("d1");
  fs.createFile("d1", "f1", "Hello Wing");
  expect.equal(["f1"], fs.listFiles("d1"));
  expect.equal("Hello Wing", fs.getFile("d1", "f1"));
}