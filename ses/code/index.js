'use strict';
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "<rds_endpoint>",
    user: "<rds_username>",
    password: "<password>",
    database: "<db_name>",
});

connection.connect();


exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log('Received event:', JSON.stringify(event, null, 2));
    const message = JSON.parse(event.Records[0].Sns.Message);

    switch(message.notificationType) {
        case "Bounce":
            handleBounce(message, callback);
            break;
        case "Complaint":
            handleComplaint(message);
            break;
        default:
            callback("Unknown notification type: " + message.notificationType);
    }
    console.log('end')
    return

   
};

function handleBounce(message, callback) {
    const messageId = message.mail.messageId;
    const addresses = message.bounce.bouncedRecipients.map(function(recipient){
        return recipient.emailAddress;
    });
    const bounceType = message.bounce.bounceType;

    console.log("Message " + messageId + " bounced when sending to " + addresses.join(", ") + ". Bounce type: " + bounceType);

    for (var i=0; i<addresses.length; i++){
        writeDDB(addresses[i], message, "bounce", "disable", callback); 
        //connection.end();
    }
    
    return 'Success';
}

function handleComplaint(message) {
    const messageId = message.mail.messageId;
    const addresses = message.complaint.complainedRecipients.map(function(recipient){
        return recipient.emailAddress;
    });

    console.log("A complaint was reported by " + addresses.join(", ") + " for message " + messageId + ".");

    for (var i=0; i<addresses.length; i++){
        writeDDB(addresses[i], message, "complaint", "disable");
    }
}

function writeDDB(id, payload, notificationType, status, callback) {
    connection.query('UPDATE wordpress.wp_newsletter SET status = "B" WHERE email = "' + id + '"', function (error, results, fields) {
        if (error) {
            //connection.destroy();
            throw error;
        } else {
            // connected!
            console.log(results);
            callback(error, results);
            //connection.end(function (err) { callback(err, results);});
        }
    });
    

}
