// import axios from "axios";

// const API_URL = process.env.REACT_APP_BACKEND_URL;

// export const fetchTasks = () =>
//   axios.get(`${API_URL}/api/tasks`, { withCredentials: true });

// export const createTask = (taskData) =>
//   axios.post(`${API_URL}/api/tasks`, taskData, { withCredentials: true });

// export const updateTask = (taskId, taskData) =>
//   axios.put(`${API_URL}/api/tasks/${taskId}`, taskData, { withCredentials: true });

// export const deleteTask = (taskId) =>
//   axios.delete(`${API_URL}/api/tasks/${taskId}`, { withCredentials: true });


import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,  // ensures cookies sent on all requests by default
});

export const fetchTasks = () => api.get("/api/tasks");

export const createTask = (taskData) => api.post("/api/tasks", taskData);

export const updateTask = (taskId, taskData) => 
  api.put(`/api/tasks/${taskId}`, taskData);

export const deleteTask = (taskId) => api.delete(`/api/tasks/${taskId}`);
