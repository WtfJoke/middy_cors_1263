import { resolve } from "node:path";
import { ExpectedResult, IntegTest } from "@aws-cdk/integ-tests-alpha";
import { App, Stack, type StackProps } from "aws-cdk-lib";
import { type IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

class TestStack extends Stack {
	public readonly lambdaFunction: IFunction;
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		this.lambdaFunction = new NodejsFunction(this, "MiddyCors1263Handler", {
			entry: resolve("..", "lib", "working-handler.ts"),
			runtime: Runtime.NODEJS_22_X,
		});
	}
}

const app = new App();
const stack = new TestStack(app, "middyy-cors-1263-working-test");
const integrationTest = new IntegTest(
	app,
	"middyy-cors-1263-working-integ-test",
	{
		testCases: [stack],
	},
);

const response1 = integrationTest.assertions.invokeFunction({
	functionName: stack.lambdaFunction.functionName,
	payload: JSON.stringify({
		headers: {
			Origin: "http://localhost:3000",
		},
	}),
});

response1.expect(
	ExpectedResult.objectLike({
		Payload: JSON.stringify({
			statusCode: 200,
			body: JSON.stringify({ hi: "there" }),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://localhost:3000",
				Vary: "Origin",
			},
		}),
	}),
);

const response2 = integrationTest.assertions.invokeFunction({
	functionName: stack.lambdaFunction.functionName,
	payload: JSON.stringify({
		headers: {
			Origin: "https://example.org",
		},
	}),
});

response2.expect(
	ExpectedResult.objectLike({
		Payload: JSON.stringify({
			statusCode: 200,
			body: JSON.stringify({ hi: "there" }),
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "https://example.org",
				Vary: "Origin",
			},
		}),
	}),
);
