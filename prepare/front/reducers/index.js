import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
// 리듀서를 합쳐줌. reducer는 함수기 때문에 합치기 힘듬

import user from './user';
import post from './post';

export function makeActionType(title) {
  return {
    REQUEST: `${title}_REQUEST`,
    SUCCESS: `${title}_SUCCESS`,
    FAILURE: `${title}_FAILURE`,
  };
}

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE: {
        return { ...state, ...action.payload };
      }
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;

// action을 dispatch해주면 reducer로 액션이 전달이됨
// return {...state,name:"name"} 새로운 객체를 생성해야 기록(prev,next)이 남는다
