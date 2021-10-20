import { token } from '../store';
import { get } from 'svelte/store';
import { AxiosService } from './AxiosService';
import { SocketService } from './SocketService';
import type { UserInterface } from '../models/User';
import { UserService } from './UserService';

export interface TokenInterface {
  type: string,
  token: string,
}

export class AuthService {
  public static login(user: UserInterface): void {
    UserService.setAuthUser(user)
    this.initServices()
  }

  public static logout(): void {
    this.setToken('')
  }

  public static setToken(newToken: string): void {
    token.set(newToken)
    this.initServices()
  }

  public static getToken(): string {
    return get(token)
  }

  public static initServices(): void {
    AxiosService.setAuthUser()
    SocketService.setAuthUser()
  }
}
