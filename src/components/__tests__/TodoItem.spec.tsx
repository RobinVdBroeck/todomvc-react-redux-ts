import { shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import * as sinon from "sinon";
import { setup } from "../../utils/test";
import { IProps, TodoItem } from "../TodoItem";
import { TodoTextInput } from "../TodoTextInput";

const test = setup(
  () => {
    const sandbox = sinon.sandbox.create();
    const defaultProps = {
      todo: {
        id: 0,
        text: "Use Redux",
        completed: false
      },
      editTodo: sandbox.spy(),
      deleteTodo: sandbox.spy(),
      completeTodo: sandbox.spy()
    };
    return {
      sandbox,
      defaultProps
    };
  },
  ({ sandbox }) => sandbox.reset()
);

test("initial render", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  expect(todoItem.type()).toBe("li");
  expect(todoItem.props().className).toBe("");

  const div = todoItem.childAt(0);
  expect(div.type()).toBe("div");
  expect(div.hasClass("view")).toBe(true);

  const input = div.childAt(0);
  expect(input.type()).toBe("input");
  expect(input.props().checked).toBe(false);

  const label = div.childAt(1);
  expect(label.type()).toBe("label");
  expect(label.text()).toBe("Use Redux");

  const button = div.childAt(2);
  expect(button.type()).toBe("button");
  expect(button.hasClass("destroy")).toBe(true);
});

test("input onChange should call completeTodo", t => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const input = todoItem.find("input");
  input.simulate("change");
  t.true(defaultProps.completeTodo.calledWith(0));
});

test("button onClick should call deleteTodo", t => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const button = todoItem.find("button");
  button.simulate("click");
  t.true(defaultProps.deleteTodo.calledWith(0));
});

test("label onDoubleClick should put component in edit state", t => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");
  t.true(todoItem.hasClass("editing"));
});

test("edit state render", t => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);
  t.is(input.props().text, "Use Redux");
  t.true(input.props().editing);
});

test("TodoTextInput onSave should call editTodo", t => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");
  t.true(defaultProps.editTodo.calledWith(0, "Use Redux"));
});

test("TodoTextInput onSave should call deleteTodo if text is empty", t => {
  const { defaultProps } = t.context;
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);

  input.props().onSave("");
  t.true(defaultProps.deleteTodo.calledWith(0));
});

test("TodoTextInput onSave should exit component from edit state", t => {
  const todoItem = shallow(<TodoItem {...t.context.defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");

  t.is(todoItem.type(), "li");
  t.true(todoItem.hasClass(""));
});
