import socket from '../plugins/socket.io';
import { AuthService } from './AuthService';

export class SocketService {
  public static setAuthUser(): void {
    socket.auth.token = AuthService.getToken()
    socket.disconnect().connect()
  }

  public static setHeader(key: string, value: string): void {
    socket.io.engine.opts.extraHeaders[key] = value
  }
}
