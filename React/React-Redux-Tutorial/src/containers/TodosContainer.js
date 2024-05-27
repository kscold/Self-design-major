import React from 'react';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

const mapStateToProps = (state) => ({
  input: state.todos.input,
  todos: state.todos.todos,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ changeInput, insert, toggle, remove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
