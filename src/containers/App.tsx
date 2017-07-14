import * as React from "react";
import { connect } from "react-redux";
import * as Redux from "redux";
import { bindActionCreators } from "redux";
import * as TodoActions from "../actions";
import { Header } from "../components/Header";
import { MainSection } from "../components/MainSection";
import { ITodo } from "../interfaces/ITodo";

export interface IProps {
  todos: ITodo[];
  actions: typeof TodoActions;
}
const AppComponent: React.SFC<IProps> = ({ todos, actions }) =>
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>;

// Todo: fix type
const mapStateToProps = (state: any) => ({
  todos: state.todos
});

// Todo: fix type
const mapDispatchToProps = (dispatch: Redux.Dispatch<any>) => ({
  actions: bindActionCreators(TodoActions as any, dispatch)
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
