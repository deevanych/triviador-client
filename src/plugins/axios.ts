import axios, { AxiosInstance } from 'axios';
import { token } from '../store';
import { get } from 'svelte/store';

const SERVER_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_SERVER_PORT}`

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${ get(token) }`,
  },
});

export default axiosInstance
