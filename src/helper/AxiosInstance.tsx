import axios from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;
const AxiosInstance = axios.create({
  baseURL: BASEURL,
});
AxiosInstance.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken") || "";
  config.headers.Authorization = accessToken;
  return config;
});

export default AxiosInstance;
