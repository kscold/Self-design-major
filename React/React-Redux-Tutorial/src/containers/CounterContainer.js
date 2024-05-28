// import { connect } from 'react-redux';
// import Counter from '../components/Counter';
// import { decrease, increase } from '../modules/counter';
// import { bindActionCreators } from 'redux';

// const CounterContainer = ({ number, increase, decrease }) => {
//   return (
//     <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//   );
// };

// // state를 매개변수로 받아옴
// const mapStateToProps = (state) => ({
//   number: state.counter.number,
// });

// // store의 내장 함수인 dispatch를 받아옴
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       increase,
//       decrease,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispath = useDispatch();

  const onIncrease = useCallback(() => dispath(increase()), [dispath]);
  const onDecrease = useCallback(() => dispath(decrease()), [dispath]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
