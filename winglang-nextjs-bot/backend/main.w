bring ex;
bring cloud;
bring expect;
bring http;
bring react;
bring openai;

let api = new cloud.Api(cors: true);

api.get("/", inflight () => {
  return {
    status: 200,
    body: "Hello World! API",
  };
});

let project = new react.App(
  projectPath: "../frontend",
  // localPort: 4500,
);


// Before deploying your application, you will be expected to store the secret value in a secure place according to the target-specific instructions below.
// aws secretsmanager create-secret --name my-api-key --secret-string 1234567890
// store secret locally in .env file
// wing secrets
let secret = new cloud.Secret(
  name: "open-ai-key",
);

let oai = new openai.OpenAI(apiKeySecret: secret);

// let manager = new cloud.Function(inflight (request) => {
//   let joke = oai.createCompletion(request!);
//   log(joke);
// });


test "create completion test" {
  let r = oai.createCompletion("tell me a short joke");
  log("respose to the request: `${r}`");
  expect.equal(r, Json.stringify({
    "mock": {
      "max_tokens":2048,
      "model":"gpt-3.5-turbo",
    "messages":[{
      "role":"user",
      "content":"tell me a short joke"}]
    }
  }
  ));
}


api.post("/api", inflight (request) => {
  let apiKey = secret.value();
  let response = oai.createCompletion(request.body!);
  log(response);


  // if (response.content !== "") {
  //   return {
  //     status: 200,
  //     body: response,
  //   };
  // }

  // return undefined;

  return {
    status: 200,
    body: response,
  };


});

project.addEnvironment("API_URL", api.url);
project.addEnvironment("api_url", api.url);
project.addEnvironment("TEXT", "Hello World!");
