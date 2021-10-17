const DEFAULT_USER_AVATAR = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png'
const INITIAL_RATING = 100

export interface UserInterface {
  id?: number,
  nickname: string,
  email: string,
  avatar_url: string,
  readonly rating?: number,
}

export default class User implements UserInterface {
  constructor(
    public readonly id: number,
    public readonly nickname: string,
    public readonly email: string,
    public readonly avatar_url: string = DEFAULT_USER_AVATAR,
    public readonly rating: number = INITIAL_RATING,
  ) {
  }
}
