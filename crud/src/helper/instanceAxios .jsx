import axios from "axios";
// https://blog-api-t6u0.onrender.com/posts

export const instanceAxios = axios.create({
  baseURL: "https://blog-api-t6u0.onrender.com/",
  timeout: 15000,
});