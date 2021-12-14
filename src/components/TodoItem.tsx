import React, { useState, useCallback } from "react";
import classnames from "classnames";
import { ITodo } from "../interfaces/ITodo";
import { TodoTextInput } from "./TodoTextInput";

export interface IProps {
  todo: ITodo;
  editTodo(id: number, text: string): void;
  deleteTodo(id: number): void;
  completeTodo(id: number): void;
}

export function TodoItem({ todo, editTodo, deleteTodo, completeTodo }: IProps) {
  const [editing, setEditing] = useState(false);
  const handleSave = useCallback(
    (text: string) => {
      const id = todo.id;
      if (text.length === 0) {
        deleteTodo(id);
      } else {
        editTodo(id, text);
      }
      setEditing(false);
    },
    [todo, deleteTodo, editTodo, setEditing]
  );
  const onChange = useCallback(
    () => completeTodo(todo.id),
    [completeTodo, todo]
  );
  const onClick = useCallback(() => deleteTodo(todo.id), [deleteTodo, todo]);
  const onDoubleClick = useCallback(() => setEditing(true), [setEditing]);

  let element;
  if (editing) {
    element = (
      <TodoTextInput text={todo.text} editing={editing} onSave={handleSave} />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onChange}
        />
        <label onDoubleClick={onDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={onClick} />
      </div>
    );
  }

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing: editing,
      })}
    >
      {element}
    </li>
  );
}
