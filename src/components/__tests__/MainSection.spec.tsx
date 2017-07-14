import { CommonWrapper, mount, shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { TodoFilters } from "../../constants/TodoFilters";
import { Footer } from "../Footer";
import { IProps, MainSection } from "../MainSection";
import { IProps as ITodoItemProps, TodoItem } from "../TodoItem";

const defaultProps: IProps = {
  todos: [
    {
      text: "Use Redux",
      completed: false,
      id: 0
    },
    {
      text: "Run the tests",
      completed: true,
      id: 1
    }
  ],
  actions: {
    editTodo: jest.fn(),
    deleteTodo: jest.fn(),
    completeTodo: jest.fn(),
    completeAll: jest.fn(),
    clearCompleted: jest.fn()
  }
};

it("should render container", () => {
  const mainSection = shallow(<MainSection {...defaultProps} />);
  expect(mainSection.type()).toBe("section");
  expect(mainSection.hasClass("main")).toBe(true);
});

describe("toggle all input", () => {
  it("should render", () => {
    const mainSection = mount(<MainSection {...defaultProps} />);

    const toggle = mainSection.childAt(0);
    expect(toggle.type()).toBe("input");
    expect(toggle.props().type).toBe("checkbox");
    expect(toggle.props().checked).toBe(false);
  });

  it("should be checked if all todos completed", () => {
    const todos = [{ text: "Use Redux", completed: true, id: 0 }];
    const mainSection = mount(<MainSection {...defaultProps} todos={todos} />);
    const toggle = mainSection.childAt(0);
    expect(toggle.props().checked).toBe(true);
  });

  it("should call completeAll on change", () => {
    const mainSection = mount(<MainSection {...defaultProps} />);
    const toggle = mainSection.childAt(0);
    toggle.props().onChange({});
    expect(mainSection.props().actions.completeAll).toBeCalled();
  });
});

describe("footer", () => {
  it("should render", () => {
    const mainSection = shallow(<MainSection {...defaultProps} />);
    const footer = mainSection.childAt(2);
    expect(footer.type()).toBe(Footer);
    expect(footer.props().completedCount).toBe(1);
    expect(footer.props().activeCount).toBe(1);
    expect(footer.props().filter).toBe(TodoFilters.SHOW_ALL);
  });

  it("onShow should set the filter", () => {
    const mainSection = mount(<MainSection {...defaultProps} />);
    const footer = mainSection.childAt(2);
    expect(footer.props().filter).toBe(TodoFilters.SHOW_ALL);
    footer.props().onShow(TodoFilters.SHOW_COMPLETED);
    expect(footer.props().filter).toBe(TodoFilters.SHOW_COMPLETED);
  });

  it("onClearCompleted should call clearCompleted", () => {
    const mainSection = mount(<MainSection {...defaultProps} />);
    const footer = mainSection.childAt(2);
    footer.props().onClearCompleted();
    expect(defaultProps.actions.clearCompleted).toBeCalled();
  });
});

describe("todo list", () => {
  const todoItemToTodoString = (item: CommonWrapper<ITodoItemProps, any>) =>
    item.props().todo;

  it("should render", () => {
    const mainSection = shallow(<MainSection {...defaultProps} />);
    const list = mainSection.childAt(1);
    expect(list.type()).toBe("ul");
    const todos = list.children();
    expect(todos.length).toBe(2);
    expect(todos.everyWhere(todo => todo.type() === TodoItem)).toBe(true);
    expect(todos.map(todoItemToTodoString)).toEqual(defaultProps.todos);
  });

  it("should filter items", () => {
    const mainSection = mount(<MainSection {...defaultProps} />);
    const footer = mainSection.childAt(2);
    footer.props().onShow(TodoFilters.SHOW_COMPLETED);
    const list = mainSection.childAt(1);
    expect(list.children()).toHaveLength(1);
    const expectedTodos = defaultProps.todos.filter(todo => todo.completed);
    expect(list.children().map(todoItemToTodoString)).toEqual(expectedTodos);
  });
});
