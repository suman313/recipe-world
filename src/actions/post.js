import {
  FETCH_ALL_DATA,
  CREATE,
  UPDATE_POST,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_ONE_POST,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
export const getPost = (page) => async (dispatch) => {
  try {
    //axios fetch an object with data property having an array of objects
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchAllData(page);
    const action = {
      type: FETCH_ALL_DATA,
      payload: { ...data },
    };
    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
export const getOnePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchOnePost(id);
    dispatch({ type: FETCH_ONE_POST, payload: data.post });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const searchPostByQuery = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostByQuery(searchQuery);
    console.log(data);
    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createNewPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const allPostdata = await api.createPost(post);
    dispatch({ type: CREATE, payload: allPostdata.data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message + " here in this line");
  }
};
export const updatePost = (currentId, postData) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, postData);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE_POST, payload: { ...data } });
  } catch (error) {
    console.log(error);
  }
};
