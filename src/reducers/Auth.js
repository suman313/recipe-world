import { AUTH } from "../constants/actionTypes";
const auth = (state = { authDetails: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authDetails: action?.data };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, authDetails: null };

    default:
      return state;
  }
};

export default auth;
