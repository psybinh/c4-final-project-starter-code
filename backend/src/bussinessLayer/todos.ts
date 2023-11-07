import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'

import { getTodoAccess, createTodoAccess, updateTodoAccess, deleteTodoAccess, updateAttachmentAccess } from '../dataLayer/todosAccess';
import { getSignedUrl } from '../helpers/attachmentUtils'

const bucketName = process.env.ATTACHMENT_S3_BUCKET

export async function getTodo(userId: string): Promise<TodoItem[]> {
    const todoList: TodoItem[] = await getTodoAccess(userId);
    if (todoList.length == 0) {
        return [];
    }
    return await getTodoAccess(userId);
}

export async function createTodo(userId: string, newTodo: CreateTodoRequest): Promise<TodoItem> {
    const createdAt = new Date().toISOString()
    const todoId = uuid.v4();

    const newItem = {
        userId,
        todoId,
        createdAt,
        ...newTodo,
        done: false
    }

    await createTodoAccess(newItem)

    return newItem;
}

export async function updateTodo(todoId: string, userId: string, updateTodoData: UpdateTodoRequest): Promise<TodoItem> {
    return await updateTodoAccess(todoId, userId, updateTodoData);
}

export async function deleteTodo(todoId: string, userId: string): Promise<any> {
    return await deleteTodoAccess(todoId, userId);
}

export async function generateUploadUrl(todoId: string, userId: string): Promise<string> {
    const url: string = `https://${bucketName}.s3.amazonaws.com/${todoId}`
    const attachmentUrl: string = getSignedUrl(todoId);

    await updateAttachmentAccess(todoId, userId, url)

    return attachmentUrl;
}