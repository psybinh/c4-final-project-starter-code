import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createAttachmentPresignedUrl, todoExists, updateTodoAttachmentUrl } from '../../bussinessLayer/todos'
import { getUserId } from '../utils'
import * as uuid from 'uuid'
const bucketName = process.env.ATTACHMENT_S3_BUCKET

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const todoId = event.pathParameters.todoId
        // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
        const userId = getUserId(event);
        const isValidTodoId = await todoExists(todoId, userId)
        if (!isValidTodoId) {
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Todo does not exist'
                })
            }
        }
        const attachmentedId = uuid.v4();
        const uploadedUrl = createAttachmentPresignedUrl(attachmentedId);
        const attachmentedUrl = `https://${bucketName}.s3.amazonaws.com/${attachmentedId}`
        await updateTodoAttachmentUrl(todoId, userId, attachmentedUrl);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                uploadUrl: uploadedUrl
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