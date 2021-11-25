import { shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import * as sinon from "sinon";
import { setup } from "../../utils/test";
import { IProps, TodoItem } from "../TodoItem";
import { TodoTextInput } from "../TodoTextInput";

const test = setup(() => {
  const sandbox = sinon;
  const defaultProps = {
    todo: {
      id: 0,
      text: "Use Redux",
      completed: false,
    },
    editTodo: sandbox.spy(),
    deleteTodo: sandbox.spy(),
    completeTodo: sandbox.spy(),
  };
  return {
    sandbox,
    defaultProps,
  };
});

test("initial render", (t) => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);

  t.is(todoItem.type(), "li");
  t.true(todoItem.hasClass(""));

  const div = todoItem.childAt(0);
  t.is(div.type(), "div");
  t.true(div.hasClass("view"));

  const input = div.childAt(0);
  t.is(input.type(), "input");
  t.false(input.props().checked);

  const label = div.childAt(1);
  t.is(label.type(), "label");
  t.is(label.text(), "Use Redux");

  const button = div.childAt(2);
  t.is(button.type(), "button");
  t.true(button.hasClass("destroy"));
});

test("input onChange should call completeTodo", (t) => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const input = todoItem.find("input");
  input.simulate("change");
  t.true(defaultProps.completeTodo.calledWith(0));
});

test("button onClick should call deleteTodo", (t) => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const button = todoItem.find("button");
  button.simulate("click");
  t.true(defaultProps.deleteTodo.calledWith(0));
});

test("label onDoubleClick should put component in edit state", (t) => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");
  t.true(todoItem.hasClass("editing"));
});

test("edit state render", (t) => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);
  t.is(input.props().text, "Use Redux");
  t.true(input.props().editing);
});

test("TodoTextInput onSave should call editTodo", (t) => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");
  t.true(defaultProps.editTodo.calledWith(0, "Use Redux"));
});

test("TodoTextInput onSave should call deleteTodo if text is empty", (t) => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);

  input.props().onSave("");
  t.true(defaultProps.deleteTodo.calledWith(0));
});

test("TodoTextInput onSave should exit component from edit state", (t) => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");

  t.is(todoItem.type(), "li");
  t.true(todoItem.hasClass(""));
});
