***

 <div align="center">
    <h1>WEB Socket API<h1/>
    <img src="images/websocket.JPG" width="700"/>
</div>

***
There are two types of Lambda authorizers:

A token-based Lambda authorizer (also called a TOKEN authorizer) receives the caller's identity in a bearer token, such as a JSON Web Token (JWT) or an OAuth token.

A request parameter-based Lambda authorizer (also called a REQUEST authorizer) receives the caller's identity in a combination of headers, query string parameters, stageVariables, and $context variables.

For WebSocket APIs, only request parameter-based authorizers are supported.

https://docs.aws.amazon.com/apigateway/latest/developerguide/call-api-with-api-gateway-lambda-authorization.html

### __connect to the outputted wss url using wscat:__
```
wscat -c <wss-url>
```
***
