
var AWS = require("aws-sdk");

let snstopic = process.env.snstopic
exports.handler = function(event, context) {
    var sns = new AWS.SNS();
	var publishParams = {
		Message: "A Wired Brain Coffee order has been submitted by a store. Please fulfill the new order. Thank you!", 
		Subject: "New Order Has Arrived!",
		TopicArn: snstopic
	};
	sns.publish(publishParams, context.done);
};