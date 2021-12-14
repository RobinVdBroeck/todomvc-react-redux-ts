import React from "react";
import { configure, shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen, within } from "@testing-library/react";
import { TodoFilters } from "../../constants/TodoFilters";
import { Footer } from "../Footer";
import { MainSection } from "../MainSection";
import { IProps as ITodoItemProps, TodoItem } from "../TodoItem";
import userEvent from "@testing-library/user-event";

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
  render(<MainSection {...defaultProps} />);
  const main = screen.getByRole("main");
  expect(main).toHaveClass("main");
});

test("toggle all input should render", () => {
  render(<MainSection {...defaultProps} />);

  const toggle = screen.getByTestId("toggle-all");
  expect(toggle).not.toBeChecked();
});

test("toggle all input should be checked if all todos completed", () => {
  const todos = [{ text: "Use Redux", completed: true, id: 0 }];
  render(<MainSection {...defaultProps} todos={todos} />);

  const toggle = screen.getByTestId("toggle-all");
  expect(toggle).toBeChecked();
});

test("toggle all input should call completeAll on change", () => {
  render(<MainSection {...defaultProps} />);
  const toggle = screen.getByTestId("toggle-all");
  userEvent.click(toggle);
  expect(defaultProps.actions.completeAll).toBeCalled();
});

test("footer should render", () => {
  render(<MainSection {...defaultProps} />);

  const footer = screen.queryByRole("contentinfo");
  expect(footer).toBeInTheDocument();
});

test("footer onShow should set the filter", () => {
  render(<MainSection {...defaultProps} />);

  const footer = screen.queryByRole("contentinfo");
  const all = within(footer).getByText("All");
  expect(all).toHaveClass("selected");

  const completed = within(footer).getByText("Completed");
  userEvent.click(completed);
  expect(all).not.toHaveClass("selected");
  expect(completed).toHaveClass("selected");
});

test("footer onClearCompleted should call clearCompleted", () => {
  render(<MainSection {...defaultProps} />);

  const footer = screen.queryByRole("contentinfo");
  const clearCompleted = within(footer).getByText("Clear completed");
  userEvent.click(clearCompleted);
  expect(defaultProps.actions.clearCompleted).toBeCalled();
});

test("todo list should render", () => {
  render(<MainSection {...defaultProps} />);

  const list = screen
    .getAllByRole("list")
    .find((item) => item.classList.contains("todo-list"));
  expect(list).toBeInTheDocument();

  const listItems = within(list).getAllByRole("listitem");
  expect(listItems).toHaveLength(2);
});

test("todo list should filter items", () => {
  render(<MainSection {...defaultProps} />);

  const showCompleted = screen.getByText("Completed");
  userEvent.click(showCompleted);

  const list = screen
    .getAllByRole("list")
    .find((item) => item.classList.contains("todo-list"));
  expect(list).toBeInTheDocument();

  const listItems = within(list).getAllByRole("listitem");
  expect(listItems).toHaveLength(1);
  const listItem = listItems[0];
  expect(listItem.textContent).toBe("Run the tests");
});
