import { ACTION } from "./constants";

export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: ACTION.LOG_IN,
    data,
  };
};
export const logoutAction = (data) => {
  return {
    type: ACTION.LOG_OUT,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case ACTION.LOG_OUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default reducer;
