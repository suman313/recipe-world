import {
  FETCH_ALL_DATA,
  CREATE,
  UPDATE_POST,
  DELETE,
  START_LOADING,
  END_LOADING,
  FETCH_ONE_POST,
} from "../constants/actionTypes";
const defaultPost = {
  posts: [],
  isLoading: true,
  numberOfPages: 1,
  currentPage: 1,
};
const post = (state = defaultPost, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_DATA:
      return {
        ...state,
        posts: action.payload.posts,
        numberOfPages: action.payload.numberOfPages,
        crrentPage: action.payload.crrentPage,
      };
    case FETCH_ONE_POST:
      return { ...state, post: { ...action.payload } };
    case "FETCH_BY_SEARCH":
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        ],
      };
    case DELETE:
      return {
        ...state,
        posts: [...state.posts.filter((post) => post._id !== action.payload)],
      };
    default:
      return state;
  }
};
export default post;
