import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';
import { bindActionCreators } from 'redux';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// state를 매개변수로 받아옴
const mapStateToProps = (state) => ({
  number: state.counter.number,
});

// store의 내장 함수인 dispatch를 받아옴
const mapDispatchToProps = (dispatch) =>
  // increase: () => {
  //   // console.log('increase');
  //   dispatch(increase());
  // },
  // decrease: () => {
  //   // console.log('decrease');
  //   dispatch(decrease());
  // },
  bindActionCreators(
    // 일일이 dipatch(increse())를 하징 ㅏㄴㅎ고
    {
      increase,
      decrease,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
