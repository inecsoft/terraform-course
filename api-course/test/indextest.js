'use strict'

exports.handler = function(event, context, callback) {
  var response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8'
    },
    body: '<p>Buenos Dias Amor mio! I love you! eventhough all difficulties</p>'
  }
  callback(null, response)
}