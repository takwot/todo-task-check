import axios from "axios";

axios.defaults.withCredentials = true;

export const apiInstanse = axios.create({
  // baseURL: "http://localhost:8080/api/v1",
  baseURL: "http://212.109.223.30:8080/api/v1",
  withCredentials: true,
  headers: {},
});
