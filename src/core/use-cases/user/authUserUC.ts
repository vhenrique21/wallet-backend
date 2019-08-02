import {authorizeByCredentials} from '../../data-sources/authorizer'

export const AuthUserUC = async (user: AuthUserModel) => {
  return await authorizeByCredentials(user.username, user.password)
}

export interface AuthUserModel {
  username: string
  password: string
}

export interface User {
  name:string
  email: string
  username: string
}