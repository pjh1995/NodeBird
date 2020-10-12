export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

const LOG_IN = "LOG_IN";
export const loginAction = (data) => {
  return {
    type: LOG_IN,
    data,
  };
};

const LOG_OUT = "LOG_OUT";
export const logoutAction = (data) => {
  return {
    type: LOG_OUT,
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        isLoggedIn: true,
      };
    }
    case LOG_OUT: {
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
