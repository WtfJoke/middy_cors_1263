import middy, { type MiddyfiedHandler } from "@middy/core";
import cors from "@middy/http-cors";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const origins = ["http://localhost:3000", "https://example.org"];

const lambdaHandler = async (
	event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
	console.log("Received event", event);
	const CONTENT_TYPE_JSON_HEADER: Record<string, string> = {
		"Content-Type": "application/json",
	};
	return {
		statusCode: 200,
		body: JSON.stringify({ hi: "there" }),
		headers: CONTENT_TYPE_JSON_HEADER,
	};
};

export const handler: MiddyfiedHandler<
	APIGatewayProxyEvent,
	APIGatewayProxyResult
> = middy().use(cors({ origins })).handler(lambdaHandler);