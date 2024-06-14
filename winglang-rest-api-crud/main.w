bring ex;
bring cloud;
bring expect;
bring http;

// Here we define a Winglang Table to keep TODO Tasks with only two columns:
// task ID and title. To keep things simple, we implement task ID as an auto-incrementing number using the Winglang Counter resource. And finally,
// we expose the TODO Service API using the Winglang Api resource.
let tasks = new ex.Table(
  name: "Tasks",
  columns: {
    "id" => ex.ColumnType.STRING,
    "title" => ex.ColumnType.STRING
  },
  primaryKey: "id"
);
let counter = new cloud.Counter();
let api = new cloud.Api();
let path = "/tasks";

// we are going to define a separate handler function for each of the four REST API requests. Getting a list of all tasks is implemented as:
api.get(
  path,
  inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    let rows = tasks.list();
    let var result = MutArray<Json>[];
    for row in rows {
      result.push(row);
    }
    return cloud.ApiResponse{
      status: 200,
      headers: {
        "Content-Type" => "application/json"
      },
      body: Json.stringify(result)
    };
  }
);

// Creating a new task record is implemented as:

api.post(
  path,
  inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    let id = "{counter.inc()}";
    if let task = Json.tryParse(request.body) {
      let record = Json{
        id: id,
        title: task.get("title").asStr()
      };
      tasks.insert(id, record);
      return cloud.ApiResponse{
        status: 200,
        headers: {
          "Content-Type" => "application/json"
        },
        body: Json.stringify(record)
      };
    }else {
      return cloud.ApiResponse{
        status: 400,
        headers: {
          "Content-Type" => "text/plain"
        },
        body: "Bad Request at api post"
      };
    }
  }
);

// Updating an existing task is implemented as:

api.put(
  "{path}/:id",
  inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    let id = request.vars.get("id");
    if let task = Json.tryParse(request.body) {
      let record = Json{
        id: id,
        title: task.get("title").asStr()
      };
      tasks.update(id, record);
      return cloud.ApiResponse {
        status: 200,
        headers: {
          "Content-Type" => "application/json"
        },
        body: Json.stringify(record)
      };
    } else {
      return cloud.ApiResponse {
        status: 400,
        headers: {
          "Content-Type" => "text/plain"
        },
        body: "Bad Request at api put"
      };
    }
  });

// deleting an existing task is implemented as:

api.delete(
  "{path}/:id",
  inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    let id = request.vars.get("id");
    tasks.delete(id);
    return cloud.ApiResponse {
      status: 200,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Data for the id: {id} was deleted successfully"
    };
  }
);

let url = "{api.url}{path}";

// test "run simple crud scenario with get method" {
//   let r1 = http.get(url);
//   expect.equal(r1.status, 200);
//   let r1_tasks = Json.parse(r1.body);
//   expect.nil(r1_tasks.tryGetAt(0));
// }

// test "run simple crud scenario with post method" {
//   let r2 = http.post(url, body: Json.stringify(Json{title: "First Task"}));
//   log(r2.body);
//   expect.equal(r2.status, 200);
//   let r2_task = Json.parse(r2.body);
//   expect.equal(r2_task.get("title").asStr(), "First Task");
//   let id = r2_task.get("id").asStr();
// }


test "run simple crud scenario" {
  let r1 = http.get(url);
  expect.equal(r1.status, 200);
  let r1_tasks = Json.parse(r1.body);
  log("logging test task_1 {r1_tasks}");
  expect.nil(r1_tasks.tryGetAt(0));
  let r2 = http.post(url, body: Json.stringify(Json{"title": "First Task"}));
  expect.equal(r2.status, 200);
  let r2_task = Json.parse(r2.body);
  log("logging test task_2 {r2_task}");
  expect.equal(r2_task.get("title").asStr(), "First Task");
  let id = r2_task.get("id").asStr();
  let r3 = http.put("{url}/{id}", body: Json.stringify(Json{title: "First Task Updated"}));
  expect.equal(r3.status, 200);
  let r3_task = Json.parse(r3.body);
  log("logging test task_3 {r3_task}");
  log("value of the id: {id}");
  expect.equal(r3_task.get("title").asStr(), "First Task Updated");
  let r4 = http.delete("{url}/{id}");
  expect.equal(r4.status, 200);
  log("logging test task_4 {Json.stringify(r4)}");
}


// let website = new cloud.Website(path: "./public");