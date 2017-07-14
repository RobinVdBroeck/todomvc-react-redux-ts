import { ActionTypes } from "../constants/ActionTypes";

export const addTodo = (text: string): IAddTodoAction => ({
  type: ActionTypes.ADD_TODO,
  text
});
export const deleteTodo = (id: number): IDeleteTodoAction => ({
  type: ActionTypes.DELETE_TODO,
  id
});
export const editTodo = (id: number, text: string): IEditTodoAction => ({
  type: ActionTypes.EDIT_TODO,
  id,
  text
});
export const completeTodo = (id: number): ICompleteTodoAction => ({
  type: ActionTypes.COMPLETE_TODO,
  id
});
export const completeAll = (): ICompleteAllAction => ({
  type: ActionTypes.COMPLETE_ALL
});
export const clearCompleted = () => ({ type: ActionTypes.CLEAR_COMPLETED });

export type Actions =
  | IAddTodoAction
  | IDeleteTodoAction
  | IEditTodoAction
  | ICompleteTodoAction
  | ICompleteAllAction
  | IClearCompletedAction;

export interface IAddTodoAction {
  type: ActionTypes.ADD_TODO;
  text: string;
}

export interface IDeleteTodoAction {
  type: ActionTypes.DELETE_TODO;
  id: number;
}

export interface IEditTodoAction {
  type: ActionTypes.EDIT_TODO;
  id: number;
  text: string;
}

export interface ICompleteTodoAction {
  type: ActionTypes.COMPLETE_TODO;
  id: number;
}

export interface ICompleteAllAction {
  type: ActionTypes.COMPLETE_ALL;
}

export interface IClearCompletedAction {
  type: ActionTypes.CLEAR_COMPLETED;
}
