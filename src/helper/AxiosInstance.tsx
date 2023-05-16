import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { useNavigate } from "react-router-dom";

const BASEURL = process.env.REACT_APP_BASEURL;
const AxiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

// interceptor for adding access token to header
AxiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken") || "";
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptor for getting the refresh token
const retryAttempts: Set<string> = new Set();
AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<any>) => {
    const originalConfig = error.config as AxiosRequestConfig;
    if (error.response) {
      // access token was expired
      if (
        error.response?.status === 401 &&
        !retryAttempts.has(originalConfig.url!)
      ) {
        retryAttempts.add(originalConfig.url!);
        try {
          // getting the new refresh token
          const res = await AxiosInstance.post("/auth/refresh");
          localStorage.setItem("accessToken", res.data.accessToken);
          // retrying the original request with the new access token
          originalConfig.headers &&
            (originalConfig.headers.Authorization = `Bearer ${res.data.accessToken}`);
          return AxiosInstance(originalConfig);
        } catch (error) {
          const navigate = useNavigate();
          navigate("/login");
          return Promise.reject(error);
        } finally {
          retryAttempts.delete(originalConfig.url!);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
