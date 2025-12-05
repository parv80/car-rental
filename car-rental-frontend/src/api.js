import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.83:8081/api",
});

// Dynamically attach JWT token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
