import classnames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { ITodo } from "../interfaces/ITodo";
import { TodoTextInput } from "./TodoTextInput";

export interface IProps {
  todo: ITodo;
  editTodo(id: number, text: string): void;
  deleteTodo(id: number): void;
  completeTodo(id: number): void;
}

interface IState {
  editing: boolean;
}

export class TodoItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { editing: false };
  }

  public render() {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={text => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }

  private handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  private handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  };
}
