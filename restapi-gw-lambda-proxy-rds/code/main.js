let AWS = require('aws-sdk');
var mysql2 = require('mysql2'); //https://www.npmjs.com/package/mysql2
let fs  = require('fs');

let connection;

exports.handler = async(event) => {
	const promise = new Promise(function(resolve, reject) {
        
		console.log("Starting query ...\n");
	  	console.log("Running iam auth ...\n");
      
      	//
    	var signer = new AWS.RDS.Signer({
	        region: process.env['region'], // example: us-east-2
	        hostname: process.env['host'],
	        port: process.env['port'],
	        username: process.env['username']
  		});
        
	    let token = signer.getAuthToken({
	      username: process.env['username']
	    });
    
    	console.log ("IAM Token obtained\n");
    
        let connectionConfig = {
          host: process.env['host'], // Store your endpoint as an env var
          user: process.env['username'],
          database: process.env['dbname'], // Store your DB schema name as an env var
          ssl: { rejectUnauthorized: false},
          password: token,
          authSwitchHandler: function ({pluginName, pluginData}, cb) {
              console.log("Setting new auth handler.");
          }
        };
   
		// Adding the mysql_clear_password handler
        connectionConfig.authSwitchHandler = (data, cb) => {
            if (data.pluginName === 'mysql_clear_password') {
              // See https://dev.mysql.com/doc/internals/en/clear-text-authentication.html
              console.log("pluginName: "+data.pluginName);
              let password = token + '\0';
              let buffer = Buffer.from(password);
              cb(null, password);
            }
        };
        connection = mysql2.createConnection(connectionConfig);
		
		connection.connect(function(err) {
			if (err) {
				console.log('error connecting: ' + err.stack);
				return;
			}
			
			console.log('connected as id ' + connection.threadId + "\n");
		 });

		connection.query("SELECT * FROM contacts", function (error, results, fields) {
			if (error){ 
		  		//throw error;
		  		reject ("ERROR " + error);
			}
		  	
			if(results.length > 0){
				let result = results[0].email + ' ' + results[0].firstname + ' ' + results[0].lastname;
				console.log(result);
				
				let response = {
			        "statusCode": 200,
			        "statusDescription": "200 OK",
			        "isBase64Encoded": false,
			        "headers":{
			        	"Content-Type": "text/html"
			        },
			        body: result,
			    };
				
				connection.end(function(error, results) {
					  if(error){
					    //return "error";
					    reject ("ERROR");
					  }
					  // The connection is terminated now 
					  console.log("Connection ended\n");
					  
					  resolve(response);
				});
			}
		});
	});
	return promise;
};