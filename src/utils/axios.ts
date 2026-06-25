import axios from 'axios';
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const status = error.response?.status || 500;
    const message = getErrorMessage(error.response.data);
    // Handle errors
    return Promise.reject({ message, status });
  }
);
export default axiosInstance;
// ----------------------------------------------------------------------

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    // eslint-disable-next-line prefer-destructuring
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }
  return message;
};
