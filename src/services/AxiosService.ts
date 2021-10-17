import axiosInstance from '../plugins/axios';

export class AxiosService {
  public static setToken(token: string) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
  }
}
