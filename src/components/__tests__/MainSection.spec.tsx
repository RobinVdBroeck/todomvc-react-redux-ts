import { configure, shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import Adapter from "enzyme-adapter-react-16";
import { TodoFilters } from "../../constants/TodoFilters";
import { Footer } from "../Footer";
import { MainSection } from "../MainSection";
import { IProps as ITodoItemProps, TodoItem } from "../TodoItem";

const defaultProps = {
  todos: [
    {
      text: "Use Redux",
      completed: false,
      id: 0,
    },
    {
      text: "Run the tests",
      completed: true,
      id: 1,
    },
  ],
  actions: {
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn(),
    completeAll: jest.fn(),
    clearCompleted: jest.fn(),
  },
};

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test("should render container", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);
  expect(mainSection.type()).toBe("section");
  expect(mainSection.hasClass("main")).toBe(true);
});

test("toggle all input should render", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);

  const toggle = mainSection.childAt(0);
  expect(toggle.type()).toBe("input");
  expect(toggle.props().type).toBe("checkbox");
  expect(toggle.props().checked).toBe(false);
});

test("toggle all input should be checked if all todos completed", () => {
  const todos = [{ text: "Use Redux", completed: true, id: 0 }];
  const mainSection = shallow(<MainSection {...defaultProps} todos={todos} />);
  const toggle = mainSection.childAt(0);
  expect(toggle.props().checked).toBe(true);
});

test("toggle all input should call completeAll on change", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);
  const toggle = mainSection.childAt(0);
  toggle.props().onChange({});
  expect(defaultProps.actions.completeAll).toBeCalled();
});

test("footer should render", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);

  const footer = mainSection.childAt(2);
  expect(footer.type()).toBe(Footer);
  expect(footer.props().completedCount).toBe(1);
  expect(footer.props().activeCount).toBe(1);
  expect(footer.props().filter).toBe(TodoFilters.SHOW_ALL);
});

test("footer onShow should set the filter", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);

  const footer = mainSection.childAt(2);
  expect(footer.props().filter).toBe(TodoFilters.SHOW_ALL);

  footer.props().onShow(TodoFilters.SHOW_COMPLETED);
  mainSection.update(); // Update it because the footer is rerendered
  const updatedFooter = mainSection.childAt(2);
  expect(updatedFooter.props().filter).toBe(TodoFilters.SHOW_COMPLETED);
});

test("footer onClearCompleted should call clearCompleted", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);

  const footer = mainSection.childAt(2);
  footer.simulate("clearCompleted");
  expect(defaultProps.actions.clearCompleted).toBeCalled();
});

const todoItemToTodoString = (item: ShallowWrapper<ITodoItemProps, any>) =>
  item.props().todo;

test("todo list should render", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);

  const list = mainSection.childAt(1);
  expect(list.type()).toBe("ul");

  const todos = list.children();
  expect(todos.length).toBe(2);
  expect(todos.everyWhere((todo) => todo.type() === TodoItem)).toBe(true);
  expect(todos.map(todoItemToTodoString)).toEqual(defaultProps.todos);
});

test("todo list should filter items", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);

  const footer = mainSection.childAt(2);
  footer.simulate("show", TodoFilters.SHOW_COMPLETED);

  const list = mainSection.childAt(1);
  expect(list.children().length).toBe(1);
  const expectedTodos = defaultProps.todos.filter((todo) => todo.completed);
  expect(list.children().map(todoItemToTodoString)).toEqual(expectedTodos);
});
