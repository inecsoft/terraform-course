npm install faker

npm install -g JSON lambda-local

cd test
file test.js
```
const lambdaLocal = require("lambda-local");
lambdaLocal.execute({
    event: jsonPayload,
    lambdaPath: path.join(__dirname, 'index.js'),
    profilePath: '~/.aws/credentials',
    profileName: 'default',
    timeoutMs: 3000,
    callback: function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    },
    clientContext: JSON.stringify({data})
});
```
lambda-local -l index.js -h handler --watch 8008

curl --request GET  --url http://localhost:8008/ --header 'content-type: application/json' --data '{
    "event": {
        "key1": "value1",
        "key2": "value2",
        "key3": "value3"
    }
}'