import { ACTION } from "./constants";

export const loginAction = (data) => {
  console.log(data);
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
