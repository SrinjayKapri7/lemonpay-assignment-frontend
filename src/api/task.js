import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchTasks = () =>
  axios.get(`${API_URL}/api/tasks`, { withCredentials: true });

export const createTask = (taskData) =>
  axios.post(`${API_URL}/api/tasks`, taskData, { withCredentials: true });

export const updateTask = (taskId, taskData) =>
  axios.put(`${API_URL}/api/tasks/${taskId}`, taskData, { withCredentials: true });

export const deleteTask = (taskId) =>
  axios.delete(`${API_URL}/api/tasks/${taskId}`, { withCredentials: true });


