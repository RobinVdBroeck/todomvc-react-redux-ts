import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { setup } from "../../utils/test";
import { TodoTextInput } from "../TodoTextInput";

const test = setup(() => {
  const sandbox = sinon;
  const defaultProps = {
    onSave: sandbox.spy(),
    text: "Use Redux",
    placeholder: "What needs to be done?",
    editing: false,
    newTodo: false,
  };
  return { sandbox, defaultProps };
});

test("should render correctly", (t) => {
  const todoTextInput = shallow(<TodoTextInput {...t.context.defaultProps} />);

  t.is(todoTextInput.props().placeholder, "What needs to be done?");
  t.is(todoTextInput.props().value, "Use Redux");
});

test("should render correctly when editing=true", (t) => {
  const todoTextInput = shallow(
    <TodoTextInput {...t.context.defaultProps} editing={true} />
  );

  t.true(todoTextInput.hasClass("edit"));
});

test("should render correctly when newTodo=true", (t) => {
  const todoTextInput = shallow(
    <TodoTextInput {...t.context.defaultProps} newTodo={true} />
  );
  t.true(todoTextInput.hasClass("new-todo"));
});

test("should update value on change", (t) => {
  const todoTextInput = shallow(<TodoTextInput {...t.context.defaultProps} />);
  todoTextInput.simulate("change", {
    currentTarget: { value: "Use Radox" },
  });
  t.is((todoTextInput.state() as any).text, "Use Radox");
});

test("should call onSave on return key press", (t) => {
  const { defaultProps } = t.context;
  const todoTextInput = shallow(<TodoTextInput {...defaultProps} />);
  todoTextInput.simulate("keydown", {
    which: 13,
    currentTarget: { value: "Use Redux" },
  });
  t.true(defaultProps.onSave.calledWith("Use Redux"));
});

test("should reset state on return key press if newTodo", (t) => {
  const todoTextInput = shallow(
    <TodoTextInput {...t.context.defaultProps} newTodo={true} />
  );
  todoTextInput.simulate("keydown", {
    which: 13,
    currentTarget: { value: "Use Redux" },
  });
  t.is((todoTextInput.state() as any).text, "");
});

test("should call onSave on blur", (t) => {
  const { defaultProps } = t.context;
  const todoTextInput = shallow(<TodoTextInput {...defaultProps} />);
  todoTextInput.simulate("blur", { currentTarget: { value: "Use Redux" } });
  t.true(defaultProps.onSave.calledWith("Use Redux"));
});

test("shouldnt call onSave on blur if newTodo", (t) => {
  const { defaultProps } = t.context;

  const todoTextInput = shallow(
    <TodoTextInput {...defaultProps} newTodo={true} />
  );
  todoTextInput.simulate("blur", {
    currentTarget: { value: "Use Redux" },
  });
  t.true(defaultProps.onSave.notCalled);
});
