import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import * as sinon from "sinon";
import { TodoFilters } from "../../constants/TodoFilters";
import { FILTER_TITLES, Footer } from "../Footer";

const defaultProps = {
  completedCount: 0,
  activeCount: 0,
  filter: TodoFilters.SHOW_ALL,
  onClearCompleted: jest.fn(),
  onShow: jest.fn(),
};

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

test("should render container with class footer", () => {
  const footer = shallow(<Footer {...defaultProps} />);
  expect(footer.hasClass("footer")).toBe(true);
});

test("should display active count when 0", () => {
  const footer = shallow(<Footer {...defaultProps} activeCount={0} />);
  expect(footer.find(".todo-count").text().includes("No items left")).toBe(
    true
  );
});

test("should display active count when above 0", () => {
  const footer = shallow(<Footer {...defaultProps} activeCount={1} />);
  expect(footer.find(".todo-count").text().includes("1 item left")).toBe(true);
});

test("should render filters", () => {
  const footer = shallow(<Footer {...defaultProps} />);
  const filterList = footer.find("ul");
  expect(filterList.hasClass("filters")).toBe(true);

  const filters = filterList.children();
  expect(filters.length).toBe(3);
  expect(filters.find(".selected").length).toBe(1);
  expect(filters.every("li")).toBe(true);

  const filtersText = filters.map((filter) => filter.text());
  expect(
    filtersText.every((value) => Object.values(FILTER_TITLES).includes(value))
  ).toBe(true);
});

test("should call onShow when a filter is clicked", () => {
  const expectedFilter = TodoFilters.SHOW_ACTIVE;
  const footer = shallow(<Footer {...defaultProps} />);
  const link = footer
    .find("ul.filters li a")
    .filterWhere((filter) => filter.text() === FILTER_TITLES[expectedFilter])
    .first();
  link.simulate("click");
  expect(defaultProps.onShow).toBeCalledWith(expectedFilter);
});

test("shouldnt show clear button when no completed todos", () => {
  const footer = shallow(<Footer {...defaultProps} completedCount={0} />);
  const clear = footer.find("button");
  expect(clear.exists()).toBe(false);
});

test("should render clear button when completed todos", () => {
  const footer = shallow(<Footer {...defaultProps} completedCount={1} />);
  const clear = footer.find("button");
  expect(clear.exists()).toBe(true);
  expect(clear.hasClass("clear-completed")).toBe(true);
});

test("should call onClearCompleted on clear button click", () => {
  const footer = shallow(<Footer {...defaultProps} completedCount={1} />);
  const clear = footer.find("button.clear-completed");
  clear.simulate("click");
  expect(defaultProps.onClearCompleted).toBeCalled();
});
