import produce from 'immer';
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
  unfollowLoading: false, // 낙네암 변경 시도중
  unfollowDone: false,
  unfollowError: null,
  followLoading: false, // 낙네암 변경 시도중
  followDone: false,
  followError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

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

export const UNFOLLOW_TYPE = makeActionType('UNFOLLOW');
export const unfollowRequestAction = (data) => {
  return {
    type: UNFOLLOW_TYPE.REQUEST,
    data,
  };
};

export const FOLLOW_TYPE = makeActionType('FOLLOW');
export const followRequestAction = (data) => {
  return {
    type: FOLLOW_TYPE.REQUEST,
    data,
  };
};

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_TYPE.REQUEST: {
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      }
      case LOG_IN_TYPE.SUCCESS: {
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      }
      case LOG_IN_TYPE.FAILURE: {
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      }
      case LOG_OUT_TYPE.REQUEST: {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      }
      case LOG_OUT_TYPE.SUCCESS: {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      }
      case LOG_OUT_TYPE.FAILURE: {
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      }
      case SIGN_UP_TYPE.REQUEST: {
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      }
      case SIGN_UP_TYPE.SUCCESS: {
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      }
      case SIGN_UP_TYPE.FAILURE: {
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      }
      case CHANGE_NICKNAME_TYPE.REQUEST: {
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      }
      case CHANGE_NICKNAME_TYPE.SUCCESS: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      }
      case CHANGE_NICKNAME_TYPE.FAILURE: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      }
      case UNFOLLOW_TYPE.REQUEST: {
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      }
      case UNFOLLOW_TYPE.SUCCESS: {
        draft.unfollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data,
        );
        draft.unfollowDone = true;
        break;
      }
      case UNFOLLOW_TYPE.FAILURE: {
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      }
      case FOLLOW_TYPE.REQUEST: {
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      }
      case FOLLOW_TYPE.SUCCESS: {
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data });
        draft.followDone = true;
        break;
      }
      case FOLLOW_TYPE.FAILURE: {
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      }
      case ADD_POST_TO_ME: {
        draft.me.Posts.unshift({ id: action.data });
        break;
      }
      case REMOVE_POST_OF_ME: {
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;

// switch문 쪼개기,
// type loading,done,err 합치기?
