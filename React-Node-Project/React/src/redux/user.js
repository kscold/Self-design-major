// Action Types
const SET_NICKNAME = 'user/SET_NICKNAME';

// Action Creators
export const setNickname = (nickname) => ({
  type: SET_NICKNAME,
  payload: nickname,
});

// Reducer
const initialState = {
  nickname: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
