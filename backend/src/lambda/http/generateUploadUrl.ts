import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { generateUploadUrl } from '../../bussinessLayer/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId: string = event.pathParameters.todoId;
    const userId: string = getUserId(event);
    
    const url: string = await generateUploadUrl(todoId, userId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url
      })
    };
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
