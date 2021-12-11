import classnames from "classnames";
import React from "react";
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

interface TodoCountProps {
  activeCount: number;
}
function TodoCount({ activeCount }: TodoCountProps) {
  const itemWord = activeCount === 1 ? "item" : "items";

  return (
    <span className="todo-count" data-testid="todo-count">
      <strong>{activeCount || "No"}</strong> {itemWord} left
    </span>
  );
}

interface FilterLinkProps {
  filter: TodoFilters;
  onShow: (filter: TodoFilters) => void;
  selected: boolean;
}

function FilterLink({ filter, onShow, selected }: FilterLinkProps) {
  function onClick() {
    onShow(filter);
  }

  const title = FILTER_TITLES[filter];
  return (
    <a
      className={classnames({
        selected,
      })}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      {title}
    </a>
  );
}

interface ClearButtonProps {
  completedCount: number;
  onClearCompleted: () => void;
}

function ClearButton({ completedCount, onClearCompleted }: ClearButtonProps) {
  if (completedCount > 0) {
    return (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    );
  }
  return <></>;
}

export function Footer(props: IProps) {
  const filters = [
    TodoFilters.SHOW_ALL,
    TodoFilters.SHOW_ACTIVE,
    TodoFilters.SHOW_COMPLETED,
  ];

  return (
    <footer className="footer">
      <TodoCount activeCount={props.activeCount} />

      <ul className="filters">
        {filters.map((filter) => (
          <li key={filter}>
            <FilterLink
              filter={filter}
              onShow={props.onShow}
              selected={filter === props.filter}
            />
          </li>
        ))}
      </ul>

      <ClearButton
        onClearCompleted={props.onClearCompleted}
        completedCount={props.completedCount}
      />
    </footer>
  );
}
