import React, { useState, useMemo, useCallback } from "react";
import { TodoFilters } from "../constants/TodoFilters";
import { ITodo } from "../interfaces/ITodo";
import { Footer } from "./Footer";
import { TodoItem } from "./TodoItem";

export interface IState {
  filter: TodoFilters;
}

const TODO_FILTERS = {
  [TodoFilters.SHOW_ALL]: () => true,
  [TodoFilters.SHOW_ACTIVE]: (todo: ITodo) => !todo.completed,
  [TodoFilters.SHOW_COMPLETED]: (todo: ITodo) => todo.completed,
};

function ToggleAll({
  completedCount,
  todos,
  completeAll,
}: {
  completedCount: number;
  todos: ITodo[];
  completeAll: () => void;
}) {
  if (todos.length > 0) {
    return (
      <>
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          data-testid="toggle-all"
          checked={completedCount === todos.length}
          onChange={completeAll}
        />
        <label htmlFor="toggle-all"></label>
      </>
    );
  }
  return <></>;
}

interface MainSectionFooterProps {
  completedCount: number;
  todos: ITodo[];
  filter: TodoFilters;
  handleClearCompleted: () => void;
  handleShow: (filter: TodoFilters) => void;
}

function MainSectionFooter({
  completedCount,
  todos,
  filter,
  handleClearCompleted,
  handleShow,
}: MainSectionFooterProps) {
  const activeCount = todos.length - completedCount;

  if (todos.length) {
    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={handleClearCompleted}
        onShow={handleShow}
      />
    );
  }
  return <></>;
}

export interface IProps {
  todos: ITodo[];
  actions: {
    editTodo(id: number, text: string): void;
    deleteTodo(id: number): void;
    completeTodo(id: number): void;
    clearCompleted(): void;
    completeAll(): void;
  };
}

export function MainSection({ todos, actions }: IProps) {
  const [filter, setFilter] = useState(TodoFilters.SHOW_ALL);

  const handleClearCompleted = useCallback(() => {
    actions.clearCompleted();
  }, [actions]);

  const handleShow = useCallback(
    (filter: TodoFilters) => {
      setFilter(filter);
    },
    [setFilter]
  );

  const filteredTodos = useMemo(
    () => todos.filter(TODO_FILTERS[filter]),
    [todos, filter]
  );
  const completedCount = useMemo(
    () =>
      todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0),
    [todos]
  );

  return (
    <main className="main">
      <ToggleAll
        completedCount={completedCount}
        todos={todos}
        completeAll={actions.completeAll}
      />

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...actions} />
        ))}
      </ul>

      <MainSectionFooter
        todos={todos}
        completedCount={completedCount}
        filter={filter}
        handleClearCompleted={handleClearCompleted}
        handleShow={handleShow}
      />
    </main>
  );
}
