import classnames from "classnames";
import * as React from "react";

export interface IProps {
  text?: string;
  placeholder?: string;
  editing: boolean;
  newTodo?: boolean;
  onSave(text: string): void;
}
export interface IState {
  text: string;
}

export class TodoTextInput extends React.Component<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    text: "",
    newTodo: true
  };

  constructor(props: IProps) {
    super(props);
    this.state = { text: this.props.text as string };
  }

  public render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          "new-todo": this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    );
  }

  private handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: "" });
      }
    }
  };

  private handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ text: e.currentTarget.value });
  };

  private handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    if (!this.props.newTodo) {
      this.props.onSave(e.currentTarget.value);
    }
  };
}
