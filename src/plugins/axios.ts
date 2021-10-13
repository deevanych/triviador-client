import axios, { AxiosInstance } from 'axios';

const SERVER_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_SERVER_PORT}`

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance
