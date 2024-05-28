// import React from 'react';
// import { changeInput, insert, toggle, remove } from '../modules/todos';
// import Todos from '../components/Todos';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// const TodosContainer = ({
//   input,
//   todos,
//   changeInput,
//   insert,
//   toggle,
//   remove,
// }) => {
//   return (
//     <Todos
//       input={input}
//       todos={todos}
//       onChangeInput={changeInput}
//       onInsert={insert}
//       onToggle={toggle}
//       onRemove={remove}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   input: state.todos.input,
//   todos: state.todos.todos,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ changeInput, insert, toggle, remove }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);

import { useDispatch, useSelector } from 'react-redux';
import Todos from '../components/Todos';
import { useCallback } from 'react';
import { changeInput, insert, remove, toggle } from '../modules/todos';
import React from 'react';

const TodosContainer = () => {
  // useSelector를 이용하여 상태를 조회했을 때는 React.memo를 컨테이너 컴포넌트에 사용해 주어야 함
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const dispatch = useDispatch();
  const onChangeInput = useCallback(
    (input) => dispatch(changeInput(input)),
    [dispatch]
  );
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);
