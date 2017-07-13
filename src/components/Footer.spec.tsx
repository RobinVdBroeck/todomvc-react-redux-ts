import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import { TodoFilters } from "../constants/TodoFilters";
import { Footer, IProps as IFooterProps } from "./Footer";

const setup = (propOverrides: Partial<IFooterProps> = {}) => {
  const props = {
    completedCount: 0,
    activeCount: 0,
    filter: TodoFilters.SHOW_ALL,
    onClearCompleted: jest.fn(),
    onShow: jest.fn(),
    ...propOverrides
  };

  const renderer = createRenderer();
  renderer.render(<Footer {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output
  };
};

const getTextContent = (
  elem: React.ReactElement<{ children: any }>
): string => {
  const children = Array.isArray(elem.props.children)
    ? elem.props.children
    : [elem.props.children];

  return children.reduce(
    (
      out: string,
      child // Concatenate the text
    ) =>
      // Children are either elements or text strings
      out + (child.props ? getTextContent(child) : child),
    ""
  );
};

describe("components", () => {
  describe("Footer", () => {
    it("should render container", () => {
      const { output } = setup();
      expect(output.type).toBe("footer");
      expect(output.props.className).toBe("footer");
    });

    it("should display active count when 0", () => {
      const { output } = setup({ activeCount: 0 });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe("No items left");
    });

    it("should display active count when above 0", () => {
      const { output } = setup({ activeCount: 1 });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe("1 item left");
    });

    it("should render filters", () => {
      const { output } = setup();
      const filters = output.props.children[1];
      expect(filters.type).toBe("ul");
      expect(filters.props.className).toBe("filters");
      expect(filters.props.children.length).toBe(3);
      filters.props.children.forEach((filter: any, i: number) => {
        // TODO: find out the type of filteer
        expect(filter.type).toBe("li");
        const a = filter.props.children;
        expect(a.props.className).toBe(i === 0 ? "selected" : "");
        expect(a.props.children).toBe(["All", "Active", "Completed"][i]);
      });
    });

    it("should call onShow when a filter is clicked", () => {
      const { output, props } = setup();
      const filters = output.props.children[1];
      const filterLink = filters.props.children[1].props.children;
      filterLink.props.onClick({});
      expect(props.onShow).toBeCalledWith(TodoFilters.SHOW_ACTIVE);
    });

    it("shouldnt show clear button when no completed todos", () => {
      const { output } = setup({ completedCount: 0 });
      const clear = output.props.children[2];
      expect(clear).toBe(undefined);
    });

    it("should render clear button when completed todos", () => {
      const { output } = setup({ completedCount: 1 });
      const clear = output.props.children[2];
      expect(clear.type).toBe("button");
      expect(clear.props.children).toBe("Clear completed");
    });

    it("should call onClearCompleted on clear button click", () => {
      const { output, props } = setup({ completedCount: 1 });
      const clear = output.props.children[2];
      clear.props.onClick({});
      expect(props.onClearCompleted).toBeCalled();
    });
  });
});
