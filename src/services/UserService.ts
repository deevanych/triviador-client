import { User } from '../models/User';
import type { UserInterface } from '../models/User';
import { authUser, token } from '../store';

export class UserService {
  public static createUserInstance(data: UserInterface): User {
    return new User(
      data.id,
      data.nickname,
      data.avatar_url,
      data.rating,
    )
  }

  public static setAuthUser(data: UserInterface): void {
    const user = this.createUserInstance(data)
    authUser.set(user)
  }
}
