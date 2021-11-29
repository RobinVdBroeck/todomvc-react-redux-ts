import { configure, shallow } from "enzyme";
import * as React from "react";
import { Header } from "../Header";
import { TodoTextInput } from "../TodoTextInput";
import Adapter from "enzyme-adapter-react-16";

const defaultProps = {
  addTodo: jest.fn(),
};

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test("should render correctly", () => {
  const header = shallow(<Header {...defaultProps} />);

  expect(header.type()).toBe("header");
  expect(header.hasClass("header")).toBe(true);

  const h1 = header.children().at(0);
  expect(h1.type()).toBe("h1");
  expect(h1.text()).toBe("todos");

  const input = header.children().at(1);
  expect(input.type()).toBe(TodoTextInput);
  expect(input.props().newTodo).toBe(true);
  expect(input.props().placeholder).toBe("What needs to be done?");
});

test("should call addTodo if length of text is greater than 0", () => {
  const header = shallow(<Header {...defaultProps} />);

  const input = header.children().at(1);
  input.props().onSave("");
  expect(defaultProps.addTodo).not.toBeCalled();
  input.props().onSave("Use Redux");
  expect(defaultProps.addTodo).toBeCalled();
});
