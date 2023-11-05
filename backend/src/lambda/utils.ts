import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event TODO excute by ThienNLNT - 24-10:
 * @param event an event from API Gateway TODO excute by ThienNLNT - 24-10:
 *
 * @returns a user id from a JWT token TODO excute by ThienNLNT - 24-10:
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}