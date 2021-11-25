import classnames from "classnames";
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
  private readonly handleSave = this.handleSaveFactory(this.props.todo.id);

  constructor(props: IProps) {
    super(props);
    this.state = { editing: false };
  }

  public render() {
    const { todo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.onChange}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this.onClick} />
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

  private onChange = () => this.props.completeTodo(this.props.todo.id);
  private onClick = () => this.props.deleteTodo(this.props.todo.id);

  private handleSaveFactory(id: number) {
    return (text: string) => {
      if (text.length === 0) {
        this.props.deleteTodo(id);
      } else {
        this.props.editTodo(id, text);
      }
      this.setState({ editing: false });
    };
  }
}
