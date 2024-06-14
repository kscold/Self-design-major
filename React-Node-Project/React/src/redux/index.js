import { combineReducers } from 'redux';
import userReducer from './user';
import codingReducer from './coding';

const rootReducer = combineReducers({
  user: userReducer,
  coding: codingReducer,
});

export default rootReducer;
