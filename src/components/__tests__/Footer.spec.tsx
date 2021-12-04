import React from "react";
import { TodoFilters } from "../../constants/TodoFilters";
import { FILTER_TITLES, Footer } from "../Footer";
import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const defaultProps = {
  completedCount: 0,
  activeCount: 0,
  filter: TodoFilters.SHOW_ALL,
  onClearCompleted: jest.fn(),
  onShow: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

test("should render container with class footer", () => {
  render(<Footer {...defaultProps} />);

  expect(screen.getByRole("contentinfo")).toHaveClass("footer");
});

test("should display active count when 0", () => {
  render(<Footer {...defaultProps} activeCount={0} />);

  expect(screen.getByTestId("todo-count")).toHaveTextContent("No items left");
});

test("should display active count when above 0", () => {
  render(<Footer {...defaultProps} activeCount={1} />);
  expect(screen.getByTestId("todo-count")).toHaveTextContent("1 item left");
});

test("should render filters", () => {
  render(<Footer {...defaultProps} />);
  const filterList = screen.getByRole("list");
  expect(filterList).toHaveClass("filters");

  const filters = within(filterList).getAllByRole("listitem");
  expect(filters.length).toBe(3);
});

test("should call onShow when a filter is clicked", () => {
  const expectedFilter = TodoFilters.SHOW_ACTIVE;
  render(<Footer {...defaultProps} />);
  const link = screen.getByText(FILTER_TITLES[expectedFilter]);
  userEvent.click(link);
  expect(defaultProps.onShow).toBeCalledWith(expectedFilter);
});

test("shouldnt show clear button when no completed todos", () => {
  render(<Footer {...defaultProps} completedCount={0} />);

  expect(() => screen.getByRole("button")).toThrowError();
});

test("should render clear button when completed todos", () => {
  render(<Footer {...defaultProps} completedCount={1} />);
  const clear = screen.getByRole("button");
  expect(clear).toHaveClass("clear-completed");
});

test("should call onClearCompleted on clear button click", () => {
  render(<Footer {...defaultProps} completedCount={1} />);
  const clear = screen.getByRole("button");
  userEvent.click(clear);

  expect(defaultProps.onClearCompleted).toBeCalled();
});
