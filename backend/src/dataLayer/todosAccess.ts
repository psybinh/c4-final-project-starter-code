import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS);
const docClient = new XAWS.DynamoDB.DocumentClient();

const logger = createLogger('TodosAccess');
const todosTable = process.env.TODOS_TABLE;

export async function getTodoAccess(userId: string): Promise<any> {
    logger.info(`getTodoAccess start with userId ${userId}`)

    const params = {
        TableName: todosTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    const newTodo = await docClient.query(params).promise();

    return newTodo.Items;
}

export async function createTodoAccess(todo: TodoItem): Promise<any> {
    logger.info(`createTodoAccess start with todo ${todo}`)

    const params = {
        TableName: todosTable,
        Item: todo
    }

    return await docClient.put(params).promise();
}

export async function updateTodoAccess(todoId: string, userId: string, todoUpdate: TodoUpdate): Promise<any> {
    logger.info(`updateTodoAccess start with todoId ${todoId}, userId ${userId}`)

    const params = {
        TableName: todosTable,
        Key: {
            todoId: todoId,
            userId: userId                
        },
        UpdateExpression: "set #todoName = :todoName, dueDate = :dueDate, done = :done",
        ExpressionAttributeNames: { '#todoName': "name" },
        ExpressionAttributeValues: {
            ":todoName": todoUpdate.name,
            ":dueDate": todoUpdate.dueDate,
            ":done": todoUpdate.done
        },
        ReturnValues: "ALL_NEW"
    };

    return await docClient.update(params).promise();
}

export async function deleteTodoAccess(todoId: string, userId: string): Promise<any> {
    logger.info(`deleteTodoAccess start with todoId ${todoId}, userId ${userId}`)

    const params = {
        TableName: todosTable,
        Key: {
            todoId: todoId,
            userId: userId                
        },
    };

    return await docClient.delete(params).promise();
}

export async function updateAttachmentAccess(todoId: string, userId: string, attachmentUrl: string): Promise<any> {
    logger.info(`updateAttachmentAccess start with todoId ${todoId}, userId ${userId}`)

    const params = {
        TableName: todosTable,
        Key: {
            todoId: todoId,
            userId: userId                
        },
        UpdateExpression: "set attachmentUrl = :url",
        ExpressionAttributeValues: {
            ":url": attachmentUrl
        },
        ReturnValues: "ALL_NEW"
    };

    return await docClient.update(params).promise();
}

