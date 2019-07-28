

export const CreateUserUC = async (user: CreateUserModel) => {

  console.log(user)

  //TODO: Create User

}


export interface CreateUserModel {
  name: string
  email: string
  birthDay: Date
  username: string
  password: string
  bankToken: string
}

export interface User {
  name:string
  email: string
  username: string
}