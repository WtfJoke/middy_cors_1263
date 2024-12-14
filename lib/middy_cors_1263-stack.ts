import { resolve } from "node:path";
import * as cdk from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

export class MiddyCors1263Stack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const lambda = new NodejsFunction(this, "MiddyCors1263Handler", {
			entry: resolve("lib", "handler.ts"),
			runtime: Runtime.NODEJS_22_X,
		});

		new cdk.CfnOutput(this, "MiddyCors1263HandlerFunctionName", {
			value: lambda.functionName,
		});
	}
}
