import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoItem } from "../TodoItem";

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
  const { asFragment } = render(<TodoItem {...defaultProps} />);

  expect(asFragment()).toMatchSnapshot();
});

test("marking item as completed should call completetodo", () => {
  render(<TodoItem {...defaultProps} />);

  const input = screen.getByRole("checkbox");
  userEvent.click(input);

  expect(defaultProps.completeTodo).toHaveBeenCalledWith(0);
});

test("removing item should call deleteTodo", () => {
  render(<TodoItem {...defaultProps} />);

  const button = screen.getByRole("button");
  userEvent.click(button);

  expect(defaultProps.deleteTodo).toHaveBeenCalledWith(0);
});

test("double click should put component in edit state", () => {
  render(<TodoItem {...defaultProps} />);

  const listItem = screen.getByRole("listitem");
  const label = within(listItem).getByText("Use Redux");
  userEvent.dblClick(label);

  expect(listItem).toHaveClass("editing");
});

test("pressing enter while editing should call editTodo", () => {
  render(<TodoItem {...defaultProps} />);

  const listItem = screen.getByRole("listitem");
  const label = within(listItem).getByText("Use Redux");
  userEvent.dblClick(label);

  const input = screen.getByRole("textbox");
  userEvent.type(input, " twice{enter}");

  expect(defaultProps.editTodo).toBeCalledWith(0, "Use Redux twice");
});

test("emptying input should call deleteTodo", () => {
  render(<TodoItem {...defaultProps} />);

  const listItem = screen.getByRole("listitem");
  const label = within(listItem).getByText("Use Redux");
  userEvent.dblClick(label);

  const input = screen.getByRole("textbox");
  userEvent.clear(input);
  userEvent.type(input, "{enter}");

  expect(defaultProps.deleteTodo).toHaveBeenCalledWith(0);
});

test("pressing enter should exit component from edit state", () => {
  render(<TodoItem {...defaultProps} />);

  const listItem = screen.getByRole("listitem");
  const label = within(listItem).getByText("Use Redux");
  userEvent.dblClick(label);

  const input = screen.getByRole("textbox");
  userEvent.type(input, "{enter}");

  expect(listItem).not.toHaveClass("editing");
});
