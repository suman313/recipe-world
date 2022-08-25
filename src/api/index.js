import axios from "axios";
const API = axios.create({
  baseURL: "https://world-of-recipe.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchAllData = (page) => API.get(`/posts?page=${page}`);
export const fetchOnePost = (id) => API.get(`/posts/${id}`);
export const fetchPostByQuery = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags || "none"
    }`
  );
export const createPost = (newPost) => {
  const data = API.post("/posts", newPost);
  return data;
};
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);

export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (userData) => API.post("/users/signin", userData);
export const signUp = (userData) => API.post("/users/signup", userData);
