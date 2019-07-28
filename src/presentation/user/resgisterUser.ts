import {CreateUserModel, CreateUserUC} from '../../core/use-cases/user/createUserUC'

export async function signupHandler(req, _res) {
  try {
    const body = req.body

    //  TODO: UseCase to verify if the user already exits

    await CreateUserUC(body as CreateUserModel)


  } catch (e) {

  }
}