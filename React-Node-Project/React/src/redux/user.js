// import axios from 'axios';
// import Cookies from 'js-cookie';

// // Action Types
// const SET_NICKNAME = 'user/SET_NICKNAME';
// const SET_ROLE = 'user/SET_ROLE';
// const SET_USER = 'user/SET_USER';

// // Action Creators
// export const setNickname = (nickname) => ({
//   type: SET_NICKNAME,
//   payload: nickname,
// });

// export const setRole = (role) => ({
//   type: SET_ROLE,
//   payload: role,
// });

// export const setUser = (user) => ({
//   type: SET_USER,
//   payload: user,
// });

// // 로그인 액션
// export const loginUser = (loginId, password) => async (dispatch) => {
//   try {
//     const response = await axios.post('/api/auth/login', { loginId, password });
//     const { nickname, role, token } = response.data;
//     Cookies.set('authToken', token);
//     dispatch(setNickname(nickname));
//     dispatch(setRole(role));
//   } catch (error) {
//     console.error('로그인 실패:', error);
//   }
// };

// // 사용자 정보 요청 액션
// export const fetchUser = (userId) => async (dispatch) => {
//   try {
//     const response = await axios.get(`/api/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${Cookies.get('authToken')}`,
//       },
//     });
//     dispatch(setUser(response.data));
//   } catch (error) {
//     console.error('사용자 정보 요청 실패:', error);
//   }
// };

// // Reducer
// const initialState = {
//   nickname: '',
//   role: '',
// };

// const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_NICKNAME:
//       return {
//         ...state,
//         nickname: action.payload,
//       };
//     case SET_ROLE:
//       return {
//         ...state,
//         role: action.payload,
//       };
//     case SET_USER:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default userReducer;

import axios from 'axios';
import Cookies from 'js-cookie';

// Action Types
const SET_NICKNAME = 'user/SET_NICKNAME';
const SET_ROLE = 'user/SET_ROLE';
const SET_USER = 'user/SET_USER';
const LOGOUT_USER = 'user/LOGOUT_USER';
const SET_IS_LOGGED_IN = 'user/SET_IS_LOGGED_IN';

// Action Creators
export const setNickname = (nickname) => ({
  type: SET_NICKNAME,
  payload: nickname,
});

export const setRole = (role) => ({
  type: SET_ROLE,
  payload: role,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// 로그인 액션
export const loginUser = (loginId, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', { loginId, password });
    const { nickname, role, token } = response.data;
    Cookies.set('authToken', token);
    dispatch(setNickname(nickname));
    dispatch(setRole(role));
    dispatch(setIsLoggedIn(true));
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};

// 사용자 정보 요청 액션
export const fetchUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });
    dispatch(setUser(response.data));
  } catch (error) {
    console.error('사용자 정보 요청 실패:', error);
  }
};

// 로그아웃 액션
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });
    Cookies.remove('authToken');
    dispatch(logoutUser());
    dispatch(setIsLoggedIn(false));
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

// Reducer
const initialState = {
  nickname: '',
  role: '',
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
        isLoggedIn: true,
      };
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        nickname: '',
        role: '',
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
