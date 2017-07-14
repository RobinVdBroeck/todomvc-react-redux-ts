import { shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { IProps, TodoItem } from "../TodoItem";
import { TodoTextInput } from "../TodoTextInput";

const defaultProps: IProps = {
  todo: {
    id: 0,
    text: "Use Redux",
    completed: false
  },
  editTodo: jest.fn(),
  deleteTodo: jest.fn(),
  completeTodo: jest.fn()
};

const setup = (editing = false) => {
  const props = {
    todo: { id: 0, text: "Use Redux", completed: false },
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn()
  };

  const renderer = createRenderer();

  renderer.render(<TodoItem {...props} />);

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props,
    output,
    renderer
  };
};

it("initial render", () => {
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

it("input onChange should call completeTodo", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const input = todoItem.find("input");
  input.simulate("change");
  expect(defaultProps.completeTodo).toBeCalledWith(0);
});

it("button onClick should call deleteTodo", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const button = todoItem.find("button");
  button.simulate("click");
  expect(defaultProps.deleteTodo).toBeCalledWith(0);
});

it("label onDoubleClick should put component in edit state", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");
  expect(todoItem.hasClass("editing")).toBe(true);
});

it("edit state render", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);
  expect(input.props().text).toBe("Use Redux");
  expect(input.props().editing).toBe(true);
});

it("TodoTextInput onSave should call editTodo", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");
  expect(defaultProps.editTodo).toBeCalledWith(0, "Use Redux");
});

it("TodoTextInput onSave should call deleteTodo if text is empty", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);

  input.props().onSave("");
  expect(defaultProps.deleteTodo).toBeCalledWith(0);
});

it("TodoTextInput onSave should exit component from edit state", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere(child => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");

  expect(todoItem.type()).toBe("li");
  expect(todoItem.hasClass("")).toBe(true);
});