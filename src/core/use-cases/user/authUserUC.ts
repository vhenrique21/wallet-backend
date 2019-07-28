export const AuthUserUC = async (user: AuthUserModel) => {

  console.log(user)

  //TODO: Auth User

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