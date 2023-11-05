/**
 * Fields in a request to update a single TODO item. TODO excute by ThienNLNT - 24-10:
 */
export interface UpdateTodoRequest {
  name: string
  dueDate: string
  done: boolean
}