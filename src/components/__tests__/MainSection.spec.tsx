import { CommonWrapper, mount, shallow } from "enzyme";
import * as React from "react";
import { createRenderer } from "react-test-renderer/shallow";
import * as sinon from "sinon";
import { TodoFilters } from "../../constants/TodoFilters";
import { setup } from "../../utils/test";
import { Footer } from "../Footer";
import { IProps, MainSection } from "../MainSection";
import { IProps as ITodoItemProps, TodoItem } from "../TodoItem";

const test = setup(
  () => {
    const sandbox = sinon.sandbox.create();
    const defaultProps = {
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
        editTodo: sandbox.spy(),
        deleteTodo: sandbox.spy(),
        completeTodo: sandbox.spy(),
        completeAll: sandbox.spy(),
        clearCompleted: sandbox.spy()
      }
    };
    return {
      sandbox,
      defaultProps
    };
  },
  ({ sandbox }) => sandbox.restore()
);

test("should render container", t => {
  const mainSection = shallow(<MainSection {...t.context.defaultProps} />);
  t.is(mainSection.type(), "section");
  t.true(mainSection.hasClass("main"));
});

test("toggle all input should render", t => {
  const mainSection = shallow(<MainSection {...t.context.defaultProps} />);

  const toggle = mainSection.childAt(0);
  t.is(toggle.type(), "input");
  t.is(toggle.props().type, "checkbox");
  t.false(toggle.props().checked);
});

test("toggle all input should be checked if all todos completed", t => {
  const todos = [{ text: "Use Redux", completed: true, id: 0 }];
  const mainSection = shallow(
    <MainSection {...t.context.defaultProps} todos={todos} />
  );
  const toggle = mainSection.childAt(0);
  t.true(toggle.props().checked);
});

test("toggle all input should call completeAll on change", t => {
  const { defaultProps } = t.context;
  const mainSection = shallow(<MainSection {...defaultProps} />);
  const toggle = mainSection.childAt(0);
  toggle.props().onChange({});
  t.true(defaultProps.actions.completeAll.called);
});

test("footer", () => {
  test("should render", t => {
    const { defaultProps } = t.context;
    const mainSection = shallow(<MainSection {...defaultProps} />);

    const footer = mainSection.childAt(2);
    t.is(footer.type(), Footer);
    t.is(footer.props().completedCount, 1);
    t.is(footer.props().activeCount, 1);
    t.is(footer.props().filter, TodoFilters.SHOW_ALL);
  });

  test("onShow should set the filter", t => {
    const mainSection = shallow(<MainSection {...t.context.defaultProps} />);

    const footer = mainSection.childAt(2);
    t.is(footer.props().filter, TodoFilters.SHOW_ALL);
    footer.simulate("show", TodoFilters.SHOW_COMPLETED);
    t.is(footer.props().filter, TodoFilters.SHOW_COMPLETED);
  });

  test("onClearCompleted should call clearCompleted", t => {
    const { defaultProps } = t.context;
    const mainSection = shallow(<MainSection {...deafaultProps} />);

    const footer = mainSection.childAt(2);
    footer.simulate("clearCompleted");
    t.true(defaultProps.actions.clearCompleted.called);
  });
});

test("todo list", () => {
  const todoItemToTodoString = (item: CommonWrapper<ITodoItemProps, any>) =>
    item.props().todo;

  test("should render", t => {
    const { defaultProps } = t.context;
    const mainSection = shallow(<MainSection {...defaultProps} />);

    const list = mainSection.childAt(1);
    t.is(list.type(), "ul");

    const todos = list.children();
    t.is(todos.length, 2);
    t.true(todos.everyWhere(todo => todo.type() === TodoItem));
    t.is(todos.map(todoItemToTodoString), defaultProps.todos);
  });

  test("should filter items", t => {
    const { defaultProps } = t.context;
    const mainSection = shallow(<MainSection {...defaultProps} />);

    const footer = mainSection.childAt(2);
    footer.simulate("show", TodoFilters.SHOW_COMPLETED);

    const list = mainSection.childAt(1);
    t.is(list.children().length, 1);
    const expectedTodos = defaultProps.todos.filter(todo => todo.completed);
    t.is(list.children().map(todoItemToTodoString), expectedTodos);
  });
});
