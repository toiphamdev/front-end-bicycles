import { login, logout } from "../../services/userService";
import * as actions from "../constants";

export const handleUserLogin = (email, password) => {
  return async (dispatch) => {
    try {
      let res = await login({ email, password });
      if (res && res.errCode === 0) {
        dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: res });
      } else {
        dispatch({ type: actions.USER_LOGIN_FAILED });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.USER_LOGIN_FAILED });
    }
  };
};

export const handleUserLogout = (id, accessToken) => {
  return async (dispatch) => {
    try {
      let res = await logout(id, accessToken);
      if (res && res.errCode === 0) {
        dispatch({ type: actions.USER_LOGOUT_SUCCESS });
      } else {
        dispatch({ type: actions.USER_LOGOUT_FAILED });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: actions.USER_LOGOUT_FAILED });
    }
  };
};
