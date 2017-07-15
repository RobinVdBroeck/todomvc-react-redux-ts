import { mount, shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { IProps, IState, TodoTextInput } from "../TodoTextInput";

const defaultProps: IProps = {
  onSave: jest.fn(),
  text: "Use Redux",
  placeholder: "What needs to be done?",
  editing: false,
  newTodo: false
};

beforeEach(() => {
  jest.clearAllMocks();
});

it("should render correctly", () => {
  const todoTextInput = shallow(<TodoTextInput {...defaultProps} />);

  expect(todoTextInput.props().placeholder).toBe("What needs to be done?");
  expect(todoTextInput.props().value).toBe("Use Redux");
});

it("should render correctly when editing=true", () => {
  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps} editing={true} />
  );
  expect(todoTextInput.hasClass("edit")).toBe(true);
});

it("should render correctly when newTodo=true", () => {
  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps} newTodo={true} />
  );
  expect(todoTextInput.hasClass("new-todo")).toBe(true);
});

it("should update value on change", () => {
  const todoTextInput = shallow(<TodoTextInput {...defaultProps} />);
  todoTextInput.simulate("change", {
    currentTarget: { value: "Use Radox" }
  });
  expect(todoTextInput.state().text).toEqual("Use Radox");
});

it("should call onSave on return key press", () => {
  const todoTextInput = shallow(<TodoTextInput {...defaultProps} />);
  todoTextInput.simulate("keydown", {
    which: 13,
    currentTarget: { value: "Use Redux" }
  });
  expect(defaultProps.onSave).toBeCalledWith("Use Redux");
});

it("should reset state on return key press if newTodo", () => {
  const todoTextInput = mount(
    <TodoTextInput {...defaultProps} newTodo={true} />
  );
  todoTextInput.simulate("keydown", {
    which: 13,
    currentTarget: { value: "Use Redux" }
  });
  expect(todoTextInput.state().text).toEqual("");
});

it("should call onSave on blur", () => {
  const todoTextInput = mount(<TodoTextInput {...defaultProps} />);
  todoTextInput.simulate("blur", { currentTarget: { value: "Use Redux" } });
  expect(defaultProps.onSave).toBeCalledWith("Use Redux");
});

it("shouldnt call onSave on blur if newTodo", () => {
  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps} newTodo={true} />
  );
  todoTextInput.simulate("blur", { currentTarget: { value: "Use Redux" } });
  expect(defaultProps.onSave).not.toBeCalled();
});
