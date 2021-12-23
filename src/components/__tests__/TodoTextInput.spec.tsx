import * as React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen } from "@testing-library/react";
import { TodoTextInput } from "../TodoTextInput";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

const defaultProps = () => {
  return {
    onSave: jest.fn(),
    text: "Use Redux",
    placeholder: "What needs to be done?",
    editing: false,
    newTodo: false,
  };
};

test("should render correctly", () => {
  render(<TodoTextInput {...defaultProps()} />);

  const input: HTMLInputElement = screen.getByRole("textbox");
  expect(input.placeholder).toBe("What needs to be done?");
  expect(input).toHaveValue("Use Redux");
  // expect(todoTextInput.props().placeholder).toBe("What needs to be done?");
  // expect(todoTextInput.props().value).toBe("Use Redux");
});

test("should render correctly when editing=true", () => {
  render(<TodoTextInput {...defaultProps()} editing />);

  const input: HTMLInputElement = screen.getByRole("textbox");
  expect(input).toHaveClass("edit");
});

test("should render correctly when newTodo=true", () => {
  render(<TodoTextInput {...defaultProps()} newTodo />);

  const input: HTMLInputElement = screen.getByRole("textbox");
  expect(input).toHaveClass("edit");
});

test("should call onSave on return key press", () => {
  const props = defaultProps();
  const todoTextInput = shallow(<TodoTextInput {...props} />);
  todoTextInput.simulate("keydown", {
    which: 13,
    currentTarget: { value: "Use Redux" },
  });
  expect(props.onSave).toBeCalledWith("Use Redux");
});

test("should reset state on return key press if newTodo", () => {
  const todoTextInput = shallow(<TodoTextInput {...defaultProps()} newTodo />);
  todoTextInput.simulate("keydown", {
    which: 13,
    currentTarget: { value: "Use Redux" },
  });
  expect((todoTextInput.state() as any).text).toBe("");
});

test("should call onSave on blur", () => {
  const props = defaultProps();
  const todoTextInput = shallow(<TodoTextInput {...props} />);
  todoTextInput.simulate("blur", { currentTarget: { value: "Use Redux" } });
  expect(props.onSave).toBeCalledWith("Use Redux");
});

test("shouldnt call onSave on blur if newTodo", () => {
  const props = defaultProps();
  const todoTextInput = shallow(<TodoTextInput {...props} newTodo />);
  todoTextInput.simulate("blur", {
    currentTarget: { value: "Use Redux" },
  });
  expect(props.onSave).not.toBeCalled();
});
