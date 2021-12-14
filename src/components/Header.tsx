import React, { useCallback } from "react";
import { TodoTextInput } from "./TodoTextInput";

export interface IProps {
  addTodo(text: string): void;
}

export function Header({ addTodo }: IProps) {
  const handleSave = useCallback(
    (text: string) => {
      if (text.length !== 0) {
        addTodo(text);
      }
    },
    [addTodo]
  );

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo={true}
        editing={true}
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  );
}
