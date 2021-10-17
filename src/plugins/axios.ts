import axios, { AxiosInstance } from 'axios';
import { token } from '../store';

const SERVER_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_SERVER_PORT}`

let _token!: string | null

token.subscribe((value) => _token = value)

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${ _token }`,
  },
});

export const axiosSetToken = (token) => {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default axiosInstance
