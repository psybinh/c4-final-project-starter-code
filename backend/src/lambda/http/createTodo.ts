import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { TodoItem } from '../../models/TodoItem'
import { createTodo } from '../../bussinessLayer/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const userId: string = getUserId(event);
    const newItem: TodoItem = await createTodo(userId, newTodo);

    return {
      statusCode: 200,
      body: JSON.stringify({
        "item": newItem
      }),
    };
});

handler
  .use(httpErrorHandler())
  .use(
      cors({
        credentials: true
   })
)
