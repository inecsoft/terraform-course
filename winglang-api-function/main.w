bring cloud;
bring expect;
// bring aws;
bring ex;
bring http;

// Rurn wing compile
log("hello world");

class Shortener {
  mapping: cloud.Bucket;

  new() {
    this.mapping = new cloud.Bucket();
  }

  pub inflight create (alias: str, target: str) {
    this.mapping.put(alias, target);
  }

  pub inflight get(alias: str): str? {
    if this.mapping.exists(alias) {
      return this.mapping.get(alias);
    }
    return nil;
  }
}

let s = new Shortener();
let apishortener = new cloud.Api();

apishortener.post("/short/:alias", inflight (req) => {
  let alias = req.vars.get("alias");
  if let body = req.body {
    s.create(alias, body);
    return {
      status: 200
    };
  }
  return {
    status: 504,
    body: "No alias for (alias)"
  };
});

apishortener.get("/short/:alias", inflight (req) => {
  let alias = req.vars.get("alias");
  if let target = s.get(alias) {
    return {
      status: 307,
      headers: { location: target }
    };
  }
  else {
    return {
      status: 404,
    };
  }
});

test "should get 404 when not alias found" {
  // http://127.0.0.1:35145
  let resp = http.get("{apishortener.url}/short/a", redirect: http.RequestRedirect.MANUAL);
  expect.equal(404, resp.status) ;
}

test "set alias and get it" {
  // http://127.0.0.1:35145
  http.post("{apishortener.url}/short/w", body:"https://www.winglang.io");
  let resp = http.get("{apishortener.url}/short/w", redirect: http.RequestRedirect.MANUAL);
  // log("{Json.stringify(resp.status)}");
  expect.equal(307, resp.status);
  log("{Json.stringify(resp.headers)}");
  expect.equal("https://www.winglang.io", resp.headers.get("location"));
}