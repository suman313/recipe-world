import { configureStore } from "@reduxjs/toolkit";
import post from "../reducers/post";
import auth from "../reducers/Auth";

const rootReducer = {
  post,
  auth,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
