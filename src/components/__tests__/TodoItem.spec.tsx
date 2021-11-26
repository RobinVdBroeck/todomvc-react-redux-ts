import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { TodoItem } from "../TodoItem";
import { TodoTextInput } from "../TodoTextInput";

beforeAll(() => {
  configure({ adapter: new Adapter() });
});
const defaultProps = {
  todo: {
    id: 0,
    text: "Use Redux",
    completed: false,
  },
  editTodo: jest.fn(),
  deleteTodo: jest.fn(),
  completeTodo: jest.fn(),
};

test("initial render", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);

  expect(todoItem.type()).toBe("li");
  expect(todoItem.hasClass("")).toBe(true);

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

test("input onChange should call completeTodo", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const input = todoItem.find("input");
  input.simulate("change");
  expect(defaultProps.completeTodo).toHaveBeenCalledWith(0);
});

test("button onClick should call deleteTodo", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const button = todoItem.find("button");
  button.simulate("click");
  expect(defaultProps.deleteTodo).toHaveBeenCalledWith(0);
});

test("label onDoubleClick should put component in edit state", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");
  expect(todoItem.hasClass("editing")).toBe(true);
});

test("edit state render", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);
  expect(input.props().text).toBe("Use Redux");
  expect(input.props().editing).toBe(true);
});

test("TodoTextInput onSave should call editTodo", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");
  expect(defaultProps.editTodo).toBeCalledWith(0, "Use Redux");
});

test("TodoTextInput onSave should call deleteTodo if text is empty", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);

  input.props().onSave("");
  expect(defaultProps.deleteTodo).toHaveBeenCalledWith(0);
});

test("TodoTextInput onSave should exit component from edit state", () => {
  const todoItem = shallow(<TodoItem {...defaultProps} />);
  const label = todoItem.find("label");
  label.simulate("doubleClick");

  const input = todoItem
    .children()
    .findWhere((child) => child.type() === TodoTextInput);

  input.props().onSave("Use Redux");

  expect(todoItem.type()).toBe("li");
  expect(todoItem.hasClass("")).toBe(true);
});
