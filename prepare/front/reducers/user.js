import produce from 'immer';
import { makeActionType } from './index';

export const initialState = {
  loadMyInfoLoading: false, // 새로고침 시 로그인 정보 받아오기.
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false, // 새로고침 시 로그인 정보 받아오기.
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  unfollowLoading: false, // 닉네임 변경 시도중
  unfollowDone: false,
  unfollowError: null,
  followLoading: false, // 닉네임 변경 시도중
  followDone: false,
  followError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  me: null,
  userInfo: null,
};

export const LOAD_MY_INFO = makeActionType('LOAD_MY_INFO');

export const LOAD_USER = makeActionType('LOAD_USER');
export const loadUserRequestAction = (data) => {
  return {
    type: LOAD_USER.REQUEST,
    data,
  };
};

export const LOG_IN = makeActionType('LOG_IN');
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN.REQUEST,
    data,
  };
};

export const LOG_OUT = makeActionType('LOG_OUT');
export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT.REQUEST,
    data,
  };
};

export const SIGN_UP = makeActionType('SIGN_UP');

export const CHANGE_NICKNAME = makeActionType('CHANGE_NICKNAME');

export const UNFOLLOW = makeActionType('UNFOLLOW');

export const FOLLOW = makeActionType('FOLLOW');

export const BLOCK_FOLLOWER = makeActionType('BLOCK_FOLLOWER');

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO.REQUEST: {
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      }
      case LOAD_MY_INFO.SUCCESS: {
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      }
      case LOAD_MY_INFO.FAILURE: {
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      }
      case LOAD_USER.REQUEST: {
        draft.loadUserLoading = true;
        draft.loadUserDone = false;
        draft.loadUserError = null;
        break;
      }
      case LOAD_USER.SUCCESS: {
        draft.loadUserLoading = false;
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
      }
      case LOAD_USER.FAILURE: {
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      }
      case LOG_IN.REQUEST: {
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      }
      case LOG_IN.SUCCESS: {
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      }
      case LOG_IN.FAILURE: {
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      }
      case LOG_OUT.REQUEST: {
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      }
      case LOG_OUT.SUCCESS: {
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      }
      case LOG_OUT.FAILURE: {
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      }
      case SIGN_UP.REQUEST: {
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      }
      case SIGN_UP.SUCCESS: {
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      }
      case SIGN_UP.FAILURE: {
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      }
      case CHANGE_NICKNAME.REQUEST: {
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      }
      case CHANGE_NICKNAME.SUCCESS: {
        draft.me.nickname = action.data.nickname;
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      }
      case CHANGE_NICKNAME.FAILURE: {
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      }
      case UNFOLLOW.REQUEST: {
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      }
      case UNFOLLOW.SUCCESS: {
        draft.unfollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        draft.unfollowDone = true;
        break;
      }
      case UNFOLLOW.FAILURE: {
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      }
      case FOLLOW.REQUEST: {
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      }
      case FOLLOW.SUCCESS: {
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data.UserId });
        draft.followDone = true;
        break;
      }
      case FOLLOW.FAILURE: {
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      }
      case BLOCK_FOLLOWER.REQUEST: {
        draft.blockFollowerLoading = true;
        draft.blockFollowerDone = false;
        draft.blockFollowerError = null;
        break;
      }
      case BLOCK_FOLLOWER.SUCCESS: {
        draft.blockFollowerLoading = false;
        draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
        draft.blockFollowerDone = true;
        break;
      }
      case BLOCK_FOLLOWER.FAILURE: {
        draft.blockFollowerLoading = false;
        draft.blockFollowerError = action.error;
        break;
      }
      case ADD_POST_TO_ME: {
        if (draft.me.Posts) {
          draft.me.Posts.unshift({ id: action.data });
        } else {
          draft.me = [{ id: action.data }];
        }
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
