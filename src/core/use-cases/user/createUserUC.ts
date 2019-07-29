import {createUser} from '../../data-sources/user'

export const CreateUserUC = async (user: UserModel) => {
  return  await createUser(user)
}

export interface UserModel {
  name: string
  email: string
  birthday: Date
  username: string
  password?: string
  bankToken: string
}

export interface User {
  name:string
  email: string
  username: string
}