import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL; // change base API URL here

export const userProfile = () =>
  axios.get(`${API_URL}/api/user/profile`, { withCredentials: true });