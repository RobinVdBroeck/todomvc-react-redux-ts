import { configure, shallow } from "enzyme";
import * as React from "react";
import { TodoTextInput } from "../TodoTextInput";
import Adapter from "enzyme-adapter-react-16";

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
  const todoTextInput = shallow(<TodoTextInput {...defaultProps()} />);

  expect(todoTextInput.props().placeholder).toBe("What needs to be done?");
  expect(todoTextInput.props().value).toBe("Use Redux");
});

test("should render correctly when editing=true", () => {
  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps()} editing={true} />
  );

  expect(todoTextInput.hasClass("edit")).toBe(true);
});

test("should render correctly when newTodo=true", () => {
  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps()} newTodo={true} />
  );
  expect(todoTextInput.hasClass("new-todo")).toBe(true);
});

test("should update value on change", () => {
  const todoTextInput = shallow(<TodoTextInput {...defaultProps()} />);
  todoTextInput.simulate("change", {
    currentTarget: { value: "Use Radox" },
  });
  expect((todoTextInput.state() as any).text).toBe("Use Radox");
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
  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps()} newTodo={true} />
  );
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
  const todoTextInput = shallow(<TodoTextInput {...props} newTodo={true} />);
  todoTextInput.simulate("blur", {
    currentTarget: { value: "Use Redux" },
  });
  expect(props.onSave).not.toBeCalled();
});
