import { shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import * as sinon from "sinon";
import { TodoFilters } from "../../constants/TodoFilters";
import { FILTER_TITLES, Footer, IProps } from "../Footer";

const defaultProps: IProps = {
  completedCount: 0,
  activeCount: 0,
  filter: TodoFilters.SHOW_ALL,
  onClearCompleted: jest.fn(),
  onShow: jest.fn()
};

it("should render container with class footer", () => {
  const footer = shallow(<Footer {...defaultProps} />);
  expect(footer.type()).toBe("footer");
  expect(footer.hasClass("footer")).toBe(true);
});

it("should display active count when 0", () => {
  const footer = shallow(<Footer {...defaultProps} activeCount={0} />);
  expect(footer.find(".todo-count").text()).toContain("No items left");
});

it("should display active count when above 0", () => {
  const footer = shallow(<Footer {...defaultProps} activeCount={1} />);
  expect(footer.find(".todo-count").text()).toContain("1 item left");
});

it("should render filters", () => {
  const footer = shallow(<Footer {...defaultProps} />);
  const filterList = footer.find("ul");
  expect(filterList.hasClass("filters")).toBe(true);

  const filters = filterList.children();
  expect(filters).toHaveLength(3);
  expect(filters.find(".selected")).toHaveLength(1);
  expect(filters.every("li")).toBe(true);

  const filtersText = filters.map(filter => filter.text());
  expect(
    filtersText.every(value => Object.values(FILTER_TITLES).includes(value))
  ).toBe(true);
});

it("should call onShow when a filter is clicked", () => {
  const expectedFilter = TodoFilters.SHOW_ACTIVE;
  const footer = shallow(<Footer {...defaultProps} />);
  const link = footer
    .find("ul.filters li a")
    .filterWhere(filter => filter.text() === FILTER_TITLES[expectedFilter])
    .first();
  link.simulate("click");
  expect(defaultProps.onShow).toBeCalledWith(expectedFilter);
});

it("shouldnt show clear button when no completed todos", () => {
  const footer = shallow(<Footer {...defaultProps} completedCount={0} />);
  const clear = footer.find("button");
  expect(clear.exists()).toBe(false);
});

it("should render clear button when completed todos", () => {
  const footer = shallow(<Footer {...defaultProps} completedCount={1} />);
  const clear = footer.find("button");
  expect(clear.exists()).toBe(true);
  expect(clear.hasClass("clear-completed")).toBe(true);
});

it("should call onClearCompleted on clear button click", () => {
  const footer = shallow(<Footer {...defaultProps} completedCount={1} />);
  const clear = footer.find("button.clear-completed");
  clear.simulate("click");
  expect(defaultProps.onClearCompleted).toBeCalled();
});
