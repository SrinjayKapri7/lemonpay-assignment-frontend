import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL; // change base API URL here

export const loginUser = (email, password) =>
  axios.post(`${API_URL}/api/auth/login`, { email, password }, { withCredentials: true });

export const signupUser = (email, password) =>
  axios.post(`${API_URL}/api/auth/register`, { email, password });

export const logoutUser = () =>
  axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });

