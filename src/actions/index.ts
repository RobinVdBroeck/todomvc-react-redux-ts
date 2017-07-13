import { ActionTypes } from "../constants/ActionTypes";

export const addTodo = (text: string) => ({ type: ActionTypes.ADD_TODO, text });
export const deleteTodo = (id: number) => ({
  type: ActionTypes.DELETE_TODO,
  id
});
export const editTodo = (id: number, text: string) => ({
  type: ActionTypes.EDIT_TODO,
  id,
  text
});
export const completeTodo = (id: number) => ({
  type: ActionTypes.COMPLETE_TODO,
  id
});
export const completeAll = () => ({ type: ActionTypes.COMPLETE_ALL });
export const clearCompleted = () => ({ type: ActionTypes.CLEAR_COMPLETED });
