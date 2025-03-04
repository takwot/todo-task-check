import axios from "axios";

axios.defaults.withCredentials = true;

export const apiInstanse = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {},
});
