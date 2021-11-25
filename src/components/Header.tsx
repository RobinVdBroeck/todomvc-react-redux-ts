import * as React from "react";
import { TodoTextInput } from "./TodoTextInput";

export interface IProps {
  addTodo(text: string): void;
}

export class Header extends React.Component<IProps, Record<string, never>> {
  public render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo={true}
          editing={true}
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }

  private handleSave = (text: string) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };
}
