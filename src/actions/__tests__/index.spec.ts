import test from "ava";
import { ActionTypes } from "../../constants/ActionTypes";
import * as actions from "../index";

test("addTodo should create ADD_TODO action", t => {
  const actual = actions.addTodo("Use Redux");
  const expected = { type: ActionTypes.ADD_TODO, text: "Use Redux" };
  t.deepEqual(actual, expected);
});

test("deleteTodo should create DELETE_TODO action", t => {
  const actual = actions.deleteTodo(1);
  const expected = { type: ActionTypes.DELETE_TODO, id: 1 };
  t.deepEqual(actual, expected);
});

test("editTodo should create EDIT_TODO action", t => {
  const actual = actions.editTodo(1, "Use Redux everywhere");
  const expected = {
    type: ActionTypes.EDIT_TODO,
    id: 1,
    text: "Use Redux everywhere"
  };
  t.deepEqual(actual, expected);
});

test("completeTodo should create COMPLETE_TODO action", t => {
  const actual = actions.completeTodo(1);
  const expected = { type: ActionTypes.COMPLETE_TODO, id: 1 };
  t.deepEqual(actual, expected);
});

test("completeAll should create COMPLETE_ALL action", t => {
  const actual = actions.completeAll();
  const expected = { type: ActionTypes.COMPLETE_ALL };
  t.deepEqual(actual, expected);
});

test("clearCompleted should create CLEAR_COMPLETED action", t => {
  const actual = actions.clearCompleted();
  const expected = {
    type: ActionTypes.CLEAR_COMPLETED
  };
  t.deepEqual(actual, expected);
});
