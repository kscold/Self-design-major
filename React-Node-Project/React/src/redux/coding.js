import { getCodingSidebar, postCodingSidebar } from '../api';

// Action Types
const GET_SIDEBAR_SUCCESS = 'coding/GET_SIDEBAR_SUCCESS';
const GET_SIDEBAR_FAILURE = 'coding/GET_SIDEBAR_FAILURE';
const POST_SIDEBAR_SUCCESS = 'coding/POST_SIDEBAR_SUCCESS';
const POST_SIDEBAR_FAILURE = 'coding/POST_SIDEBAR_FAILURE';

// Action 생성
export const GetSidebarDataSuccess = (data) => ({
  type: GET_SIDEBAR_SUCCESS,
  payload: data,
});
export const GetSidebarDataFailure = (error) => ({
  type: GET_SIDEBAR_FAILURE,
  payload: error,
});
export const PostSidebarItemSuccess = (item) => ({
  type: POST_SIDEBAR_SUCCESS,
  payload: item,
});
export const PostSidebarItemFailure = (error) => ({
  type: POST_SIDEBAR_FAILURE,
  payload: error,
});

// Action 함수 정의
export const GetSidebarData = () => async (dispatch) => {
  try {
    const data = await getCodingSidebar();
    dispatch(GetSidebarDataSuccess(data));
  } catch (error) {
    dispatch(GetSidebarDataFailure(error.message));
  }
};

export const PostSidebarItem =
  ({ sidebarName, parentId }) =>
  async (dispatch) => {
    try {
      const newItem = await postCodingSidebar({ sidebarName, parentId });
      dispatch(PostSidebarItemSuccess(newItem));
      dispatch(GetSidebarData());
    } catch (error) {
      dispatch(PostSidebarItemFailure(error.message));
    }
  };

const initialState = {
  sidebarData: [],
  status: 'idle',
  error: null,
};

const codingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SIDEBAR_SUCCESS:
      return { ...state, status: 'succeeded', sidebarData: action.payload };
    case GET_SIDEBAR_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    case POST_SIDEBAR_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        sidebarData: [...state.sidebarData, action.payload],
      };
    case POST_SIDEBAR_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default codingReducer;
