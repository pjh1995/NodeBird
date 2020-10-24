import shortid from 'shortid';
import { makeActionType } from './index';

export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 낙네암 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: 'JHPARK',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const LOG_IN_TYPE = makeActionType('LOG_IN');

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_TYPE.REQUEST,
    data,
  };
};

export const LOG_OUT_TYPE = makeActionType('LOG_OUT');
export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_TYPE.REQUEST,
    data,
  };
};

export const SIGN_UP_TYPE = makeActionType('SIGN_UP');
export const signupRequestAction = (data) => {
  return {
    type: SIGN_UP_TYPE.REQUEST,
    data,
  };
};

export const CHANGE_NICKNAME_TYPE = makeActionType('CHANGE_NICKNAME');
export const changeNicknameRequestAction = (data) => {
  return {
    type: CHANGE_NICKNAME_TYPE.REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_TYPE.REQUEST: {
      console.log('reducer');
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    }
    case LOG_IN_TYPE.SUCCESS: {
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };
    }
    case LOG_IN_TYPE.FAILURE: {
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    }
    case LOG_OUT_TYPE.REQUEST: {
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    }
    case LOG_OUT_TYPE.SUCCESS: {
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    }
    case LOG_OUT_TYPE.FAILURE: {
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    }
    case SIGN_UP_TYPE.REQUEST: {
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    }
    case SIGN_UP_TYPE.SUCCESS: {
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    }
    case SIGN_UP_TYPE.FAILURE: {
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    }
    case CHANGE_NICKNAME_TYPE.REQUEST: {
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    }
    case CHANGE_NICKNAME_TYPE.SUCCESS: {
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    }
    case CHANGE_NICKNAME_TYPE.FAILURE: {
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    }
    default:
      return state;
  }
};

export default reducer;

// switch문 쪼개기,
// type loading,done,err 합치기?
