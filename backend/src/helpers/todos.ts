import {TodosAccess} from '../helpers/todosAccess'
import {AttachmentUtils} from '../helpers/attachmentUtils';
import {TodoItem} from '../models/TodoItem'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import {UpdateTodoRequest} from '../requests/UpdateTodoRequest'
import {createLogger} from '../utils/logger'
import * as uuid from 'uuid'

// TODO: Implement businessLogic

const logger = createLogger('TodosAccess');

const attachmentUtils = new AttachmentUtils;
const todoAccess = new TodosAccess()

export async function createTodo(
    userId: string,
    createTodoRequest: CreateTodoRequest
): Promise<TodoItem> {
    logger.info('create todo for user', userId)
    const todoId = uuid.v4()

    logger.info(`Create todoId ${todoId}`);

    return await todoAccess.createTodo({
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        ...createTodoRequest
    } as TodoItem)
}

export async function updateTodo(
    todoId: string,
    userId: string,
    todoUpdate: UpdateTodoRequest
): Promise<void> {
    return await todoAccess.updateTodo(todoId, userId, todoUpdate);
}

export async function deleteTodo(userId: string, todoId: string): Promise<void> {
    logger.info('delete todo', todoId)
    return await todoAccess.deleteTodo(userId, todoId)
}

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info(`Get todos list`);

    return await todoAccess.getAllTodos(userId);
}

export async function todoExists(todoId: string, userId: string) {
    logger.info('check todo', todoId)
    return todoAccess.checkExists(todoId, userId);
}

export function createAttachmentPresignedUrl(attachmentId: string) {
    logger.info('create attachement', attachmentId)
    return attachmentUtils.generateAttachmentPresignedUrl(attachmentId);
}

export async function updateTodoAttachmentUrl(todoId: string, userId: string, attachmentUrl: string) {
    logger.info('update todo attachement', todoId)
    return attachmentUtils.updateTodoAttachmentUrl(todoId, userId, attachmentUrl);
}
