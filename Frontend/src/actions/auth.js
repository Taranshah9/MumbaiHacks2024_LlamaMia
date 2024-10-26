import axios from "../helpers/axios";
import { authConstants } from "./constants";
export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    const res = await axios.post("/signin", {
      email: user.email,
      password: user.password,
    });
    if (res.status === 200) {
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
      console.log(token);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: {
            error: res.data.error,
          },
        });
      }
    }
  };
};
export const isuserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: { error: "Please login first" },
        },
      });
    }
  };
};
