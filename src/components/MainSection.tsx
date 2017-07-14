import * as React from "react";
import { TodoFilters } from "../constants/TodoFilters";
import { ITodo } from "../interfaces/ITodo";
import { Footer } from "./Footer";
import { TodoItem } from "./TodoItem";

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

export interface IState {
  filter: TodoFilters;
}

const TODO_FILTERS = {
  [TodoFilters.SHOW_ALL]: () => true,
  [TodoFilters.SHOW_ACTIVE]: (todo: ITodo) => !todo.completed,
  [TodoFilters.SHOW_COMPLETED]: (todo: ITodo) => todo.completed
};

export class MainSection extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { filter: TodoFilters.SHOW_ALL };
  }

  public render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }

  private handleClearCompleted = () => {
    this.props.actions.clearCompleted();
  };

  private handleShow = (filter: TodoFilters) => {
    this.setState({ filter });
  };

  private renderToggleAll(completedCount: number) {
    const { todos, actions } = this.props;
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  private renderFooter(completedCount: number) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }
}
