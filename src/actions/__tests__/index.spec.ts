import { ActionTypes } from "../../constants/ActionTypes";
import * as actions from "../index";

describe("todo actions", () => {
  it("addTodo should create ADD_TODO action", () => {
    expect(actions.addTodo("Use Redux")).toEqual({
      type: ActionTypes.ADD_TODO,
      text: "Use Redux"
    });
  });

  it("deleteTodo should create DELETE_TODO action", () => {
    expect(actions.deleteTodo(1)).toEqual({
      type: ActionTypes.DELETE_TODO,
      id: 1
    });
  });

  it("editTodo should create EDIT_TODO action", () => {
    expect(actions.editTodo(1, "Use Redux everywhere")).toEqual({
      type: ActionTypes.EDIT_TODO,
      id: 1,
      text: "Use Redux everywhere"
    });
  });

  it("completeTodo should create COMPLETE_TODO action", () => {
    expect(actions.completeTodo(1)).toEqual({
      type: ActionTypes.COMPLETE_TODO,
      id: 1
    });
  });

  it("completeAll should create COMPLETE_ALL action", () => {
    expect(actions.completeAll()).toEqual({
      type: ActionTypes.COMPLETE_ALL
    });
  });

  it("clearCompleted should create CLEAR_COMPLETED action", () => {
    expect(actions.clearCompleted()).toEqual({
      type: ActionTypes.CLEAR_COMPLETED
    });
  });
});
