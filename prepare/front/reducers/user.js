import { makeActionType } from "./index";

export const initialState = {
  isLoggingIn: false, //로그인 시도중
  isLoggingOut: false, //로그아웃 시도중
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_TYPE = makeActionType("LOG_IN");

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_TYPE.REQUEST,
    data,
  };
};

export const LOG_OUT_TYPE = makeActionType("LOG_OUT");
export const logoutRequestAction = (data) => {
  return {
    type: LOG_OUT_TYPE.REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_TYPE.REQUEST: {
      console.log("reducer");
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case LOG_IN_TYPE.SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "JHPARK" },
      };
    }
    case LOG_IN_TYPE.FAILURE: {
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    }
    case LOG_OUT_TYPE.REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
      };
    }
    case LOG_OUT_TYPE.SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    }
    case LOG_OUT_TYPE.FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
