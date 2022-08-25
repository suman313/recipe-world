import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(userData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(JSON.stringify(error.response.data.message));
  }
};

export const signup = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
    alert(JSON.stringify(error.response.data.message));
  }
};
