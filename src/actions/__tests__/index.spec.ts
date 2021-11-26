import { ActionTypes } from "../../constants/ActionTypes";
import * as actions from "../index";

test("addTodo should create ADD_TODO action", () => {
  const actual = actions.addTodo("Use Redux");
  const expected = { type: ActionTypes.ADD_TODO, text: "Use Redux" };
  expect(actual).toEqual(expected);
});

test("deleteTodo should create DELETE_TODO action", () => {
  const actual = actions.deleteTodo(1);
  const expected = { type: ActionTypes.DELETE_TODO, id: 1 };
  expect(actual).toEqual(expected);
});

test("editTodo should create EDIT_TODO action", () => {
  const actual = actions.editTodo(1, "Use Redux everywhere");
  const expected = {
    type: ActionTypes.EDIT_TODO,
    id: 1,
    text: "Use Redux everywhere",
  };
  expect(actual).toEqual(expected);
});

test("completeTodo should create COMPLETE_TODO action", () => {
  const actual = actions.completeTodo(1);
  const expected = { type: ActionTypes.COMPLETE_TODO, id: 1 };
  expect(actual).toEqual(expected);
});

test("completeAll should create COMPLETE_ALL action", () => {
  const actual = actions.completeAll();
  const expected = { type: ActionTypes.COMPLETE_ALL };
  expect(actual).toEqual(expected);
});

test("clearCompleted should create CLEAR_COMPLETED action", () => {
  const actual = actions.clearCompleted();
  const expected = {
    type: ActionTypes.CLEAR_COMPLETED,
  };
  expect(actual).toEqual(expected);
});
