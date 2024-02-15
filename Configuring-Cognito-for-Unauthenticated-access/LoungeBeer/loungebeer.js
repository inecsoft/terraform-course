// Configure Credentials to use Cognito
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'eu-west-1:0af95926-8c1e-4194-954c-0aca5f8ba2de',
});

AWS.config.region = 'eu-west-1';

// We're going to partition Amazon Kinesis records based on an identity.
// We need to get credentials first, then attach our event listeners.
AWS.config.credentials.get(function (err) {
  alert('ready...');
  // attach event listener
  if (err) {
    alert('Error retrieving credentials.');
    console.error(err);
    return;
  }
  // create kinesis service object
  var kinesis = new AWS.Kinesis({
    apiVersion: '2013-12-02',
  });

  var firehose = new AWS.Firehose();

  send1Button = document.getElementById('Send1');
  send1Button.addEventListener('click', function (event) {
    alert('Send1!!');
    var params = {
      //DeliveryStreamName: 'LoungeBeer',
      DeliveryStreamName: 'loungebeer',
      Record: {
        Data: JSON.stringify({
          blog: window.location.href,
          scrollTopPercentage: 25,
          scrollBottomPercentage: 100,
          time: new Date(),
        }),
      },
    };
    firehose.putRecord(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        console.log(data);
        alert('Send1 Complete!!');
      }
    });
  });

  send100Button = document.getElementById('Send100');
  send100Button.addEventListener('click', function (event) {
    alert('Send100!!');
    var recordData = [];
    for (var i = 0; i < 100; i++) {
      var record = {
        Data: JSON.stringify({
          first_name: data[i].first_name,
          last_name: data[i].last_name,
          phone: data[i].phone,
          email: data[i].email,
          gender: data[i].gender,
          ip_address: data[i].ip_address,
        }),
      };
      recordData.push(record);
    }

    var params = {
      //DeliveryStreamName: 'LoungeBeer',
      DeliveryStreamName: 'loungebeer',
      Records: recordData,
    };
    firehose.putRecordBatch(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        alert('Send100 Complete!!');
        console.log(data);
      }
    });
  });
});
