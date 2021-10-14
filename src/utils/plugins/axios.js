import axios from "axios";

const ax = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 6000,
});

export default ax;
