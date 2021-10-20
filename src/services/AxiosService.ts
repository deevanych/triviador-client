import axiosInstance from '../plugins/axios';
import { AuthService } from './AuthService';

export class AxiosService {
  public static setToken(token: string): void {
    this.setHeader('Authorization', `Bearer ${token}`)
  }

  public static setHeader(key: string, value: string): void {
    axiosInstance.defaults.headers[key] = value
  }

  public static setAuthUser(): void {
    const token = AuthService.getToken()
    this.setToken(token)
  }
}
