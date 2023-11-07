import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { updateTodo, todoExists } from '../../bussinessLayer/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const todoId = event.pathParameters.todoId
        const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
        // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
        const userId = getUserId(event);
        const isValidTodoId = await todoExists(todoId, userId)
        if (!isValidTodoId) {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Do not exist'
                })
            }
        }

        await updateTodo(todoId, userId, updatedTodo);

        return {
            statusCode: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                updatedTodo
            })
        }
    }
)

handler
    .use(
        cors({
            credentials: true
        })
    )