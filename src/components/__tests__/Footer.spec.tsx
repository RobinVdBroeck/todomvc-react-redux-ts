import { shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import * as sinon from "sinon";
import { TodoFilters } from "../../constants/TodoFilters";
import { setup } from "../../utils/test";
import { FILTER_TITLES, Footer, IProps } from "../Footer";

const test = setup(
  () => {
    const sandbox = sinon.sandbox.create();
    const defaultProps = {
      completedCount: 0,
      activeCount: 0,
      filter: TodoFilters.SHOW_ALL,
      onClearCompleted: sandbox.spy(),
      onShow: sandbox.spy()
    };
    return { sandbox, defaultProps };
  },
  t => {
    t.context.sandbox.restore();
  }
);

test("should render container with class footer", t => {
  const footer = shallow(<Footer {...t.context.defaultProps} />);
  t.true(footer.hasClass("footer"));
});

test("should display active count when 0", t => {
  const footer = shallow(
    <Footer {...t.context.defaultProps} activeCount={0} />
  );
  t.true(footer.find(".todo-count").text().includes("No items left"));
});

test("should display active count when above 0", t => {
  const footer = shallow(
    <Footer {...t.context.defaultProps} activeCount={1} />
  );
  t.true(footer.find(".todo-count").text().includes("1 item left"));
});

test("should render filters", t => {
  const footer = shallow(<Footer {...t.context.defaultProps} />);
  const filterList = footer.find("ul");
  t.true(filterList.hasClass("filters"));

  const filters = filterList.children();
  t.is(filters.length, 3);
  t.is(filters.find(".selected").length, 1);
  t.true(filters.every("li"));

  const filtersText = filters.map(filter => filter.text());
  t.true(
    filtersText.every(value => Object.values(FILTER_TITLES).includes(value))
  );
});

test("should call onShow when a filter is clicked", t => {
  const expectedFilter = TodoFilters.SHOW_ACTIVE;
  const { defaultProps } = t.context;
  const footer = shallow(<Footer {...defaultProps} />);
  const link = footer
    .find("ul.filters li a")
    .filterWhere(filter => filter.text() === FILTER_TITLES[expectedFilter])
    .first();
  link.simulate("click");
  t.true(defaultProps.onShow.calledWith(expectedFilter));
});

test("shouldnt show clear button when no completed todos", t => {
  const footer = shallow(
    <Footer {...t.context.defaultProps} completedCount={0} />
  );
  const clear = footer.find("button");
  t.false(clear.exists());
});

test("should render clear button when completed todos", t => {
  const footer = shallow(
    <Footer {...t.context.defaultProps} completedCount={1} />
  );
  const clear = footer.find("button");
  t.true(clear.exists());
  t.true(clear.hasClass("clear-completed"));
});

test("should call onClearCompleted on clear button click", t => {
  const { defaultProps } = t.context;
  const footer = shallow(<Footer {...defaultProps} completedCount={1} />);
  const clear = footer.find("button.clear-completed");
  clear.simulate("click");
  t.true(defaultProps.onClearCompleted.called);
});
