import React from "react";
import { render, screen, within } from "@testing-library/react";
import { Header } from "../Header";
import userEvent from "@testing-library/user-event";

const defaultProps = {
  addTodo: jest.fn(),
};

test("should render correctly", () => {
  render(<Header {...defaultProps} />);

  const header = screen.getByRole("banner");
  expect(header).toHaveClass("header");

  const heading = within(header).getByRole("heading");
  expect(heading).toHaveTextContent("todos");

  const input = within(header).queryByPlaceholderText("What needs to be done?");
  expect(input).not.toBeNull();
});

test("should call addTodo if length of text is greater than 0", () => {
  const props = defaultProps;
  render(<Header {...props} />);

  const input = screen.getByPlaceholderText("What needs to be done?");
  userEvent.type(input, "{enter}");
  expect(props.addTodo).not.toHaveBeenCalled();

  userEvent.type(input, "Use Redux{enter}");
  expect(props.addTodo).toHaveBeenCalledWith("Use Redux");
});
