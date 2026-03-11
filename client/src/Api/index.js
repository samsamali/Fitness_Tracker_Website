import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Add a request interceptor to include token automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const UserSignUp = (data) => API.post("/user/register", data);
export const UserSignIn = (data) => API.post("/user/login", data);
export const getDashboardDetails = () => API.get("/user/dashboard");
export const getWorkouts = (date) => API.get(`/user/workout${date ? `?date=${date}` : ""}`);
export const addWorkout = (data) => API.post("/user/workout", data);