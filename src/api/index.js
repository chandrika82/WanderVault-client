import axios from 'axios';

// Use environment variable instead of hardcoded localhost
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');
  if (profile) {
    req.headers.authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

// API calls
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
