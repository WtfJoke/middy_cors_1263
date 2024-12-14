# Bug reproducer

This project is to demonstrate the bug https://github.com/middyjs/middy/issues/1263


# To reproduce

## Manually
1. Login to aws account
2. `npm run cdk deploy`
3. Invoke the lambda using the test console with `payloadInputa.json`
4. Lambda responds with 
```json
{
  "statusCode": 200,
  "body": "{\"hi\":\"there\"}",
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Vary": "Origin"
  }
}
```
4. Invoke the lambda using the test console with `payloadInputb.json`, `Access-Control-Allow-Origin` is still `http://localhost:3000` instead of expected `https://example.org`.
```json
{
  "statusCode": 200,
  "body": "{\"hi\":\"there\"}",
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Vary": "Origin, Origin"
  }
}
```

## Automatically
1. Login to aws account
2. `npm run cdk:integ`

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
