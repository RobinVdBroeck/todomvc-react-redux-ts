import classnames from "classnames";
import * as React from "react";
import { TodoFilters } from "../constants/TodoFilters";

export const FILTER_TITLES = {
  [TodoFilters.SHOW_ALL]: "All",
  [TodoFilters.SHOW_ACTIVE]: "Active",
  [TodoFilters.SHOW_COMPLETED]: "Completed",
};

export interface IProps {
  completedCount: number;
  activeCount: number;
  filter: TodoFilters;
  onClearCompleted(): void; // Todo Find out the type
  onShow(filter: TodoFilters): void; // Todo find out the type
}

export class Footer extends React.Component<IProps, Record<string, never>> {
  public render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[
            TodoFilters.SHOW_ALL,
            TodoFilters.SHOW_ACTIVE,
            TodoFilters.SHOW_COMPLETED,
          ].map((filter) => (
            <li key={filter}>{this.renderFilterLink(filter)}</li>
          ))}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }

  private renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? "item" : "items";

    return (
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
    );
  }

  private renderFilterLink(filter: TodoFilters) {
    function onClick() {
      onShow(filter);
    }
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;
    return (
      <a
        className={classnames({
          selected: filter === selectedFilter,
        })}
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        {title}
      </a>
    );
  }

  private renderClearButton() {
    const { completedCount, onClearCompleted } = this.props;
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
  }
}
