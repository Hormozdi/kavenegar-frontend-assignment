import { message } from "antd";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { apiUrl } from "./routes";

const axiosInstanceV1: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

const handleError = (error: AxiosError) => {
  let data: { message?: string; error?: string };
  let errorMessage = "";
  if (error) {
    data = error?.response?.data || {};
    errorMessage = data?.message || data?.error || errorMessage;
  }

  if (error.response?.status === 401) {
    //ToDo: logout;
  } else if (["ERR_NETWORK", "ECONNABORTED"].includes(error.code || "")) {
    //ToDo: retry
  }

  void message.error(errorMessage, 6);

  return Promise.reject(error);
};

const requestInterceptors = {
  request: async (request: InternalAxiosRequestConfig) => {
    return request;
  },
  error: (error: AxiosError) => {
    return Promise.reject(error);
  },
};

const responseInterceptors = {
  response: (response: AxiosResponse) => {
    return response;
  },
  error: async (error: AxiosError) => {
    return handleError(error);
  },
};

axiosInstanceV1.interceptors.request.use(
  requestInterceptors.request,
  requestInterceptors.error
);

axiosInstanceV1.interceptors.response.use(
  responseInterceptors.response,
  responseInterceptors.error
);

export { axiosInstanceV1 };
