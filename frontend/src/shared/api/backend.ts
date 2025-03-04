import axios from "axios";

axios.defaults.withCredentials = true;

export const apiInstanse = axios.create({
  baseURL: "http://212.109.223.30:5000/api/v1",
  withCredentials: true,
  headers: {},
});
