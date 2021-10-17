import { token } from '../store';
import { AxiosService } from './AxiosService';

export interface TokenInterface {
  type: string,
  token: string,
}

export class AuthService {
  public static login(newToken: TokenInterface): void {
    this.setToken(newToken.token)
    AxiosService.setToken(newToken.token)
  }

  public static logout(): void {
    this.setToken('')
  }

  public static setToken(newToken: string): void {
    token.set(newToken)
  }
}
