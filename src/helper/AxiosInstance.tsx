import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";

const BASEURL = process.env.REACT_APP_BASEURL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  withCredentials: true,
});

// interceptor for adding access token to header
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<any>) => {
    const originalConfig = error.config as AxiosRequestConfig;
    if (error.response) {
      console.log(error?.response?.status);
      // access token was expired
      if (
        error.response?.status === 401 &&
        !retryAttempts.has(originalConfig.url!)
      ) {
        retryAttempts.add(originalConfig.url!);
        try {
          console.log("getting refresh token");
          // getting the new refresh token
          const res = await axiosInstance.post("/auth/refresh");
          console.log(res);
          localStorage.setItem("accessToken", res.data.accessToken);
          // retrying the original request with the new access token
          originalConfig.headers &&
            (originalConfig.headers.Authorization = `Bearer ${res.data.accessToken}`);
          return axiosInstance(originalConfig);
        } catch (error) {
          console.log(error);
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        } finally {
          retryAttempts.delete(originalConfig.url!);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
