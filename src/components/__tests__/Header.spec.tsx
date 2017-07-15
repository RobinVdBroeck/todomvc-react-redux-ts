import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { setup } from "../../utils/test";
import { Header, IProps } from "../Header";
import { IProps as ITodoTextInputProps, TodoTextInput } from "../TodoTextInput";

const test = setup(
  () => {
    const sandbox = sinon.sandbox.create();
    const defaultProps = {
      addTodo: sandbox.spy()
    };
    return {
      sandbox,
      defaultProps
    };
  },
  ({ sandbox }) => {
    sandbox.restore();
  }
);

test("should render correctly", t => {
  const header = shallow(<Header {...t.context.defaultProps} />);

  t.is(header.type(), "header");
  t.true(header.hasClass("header"));

  const h1 = header.children().at(0);
  t.is(h1.type(), "h1");
  t.is(h1.text(), "todos");

  const input = header.children().at(1);
  t.is(input.type(), TodoTextInput);
  t.true(input.props().newTodo);
  t.is(input.props().placeholder, "What needs to be done?");
});

test("should call addTodo if length of text is greater than 0", t => {
  const { defaultProps } = t.context;
  const header = shallow(<Header {...defaultProps} />);

  const input = header.children().at(1);
  input.props().onSave("");
  t.true(defaultProps.addTodo.notCalled);
  input.props().onSave("Use Redux");
  t.true(defaultProps.addTodo.called);
});
