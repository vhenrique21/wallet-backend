import {UserModel, CreateUserUC} from '../../core/use-cases/user/createUserUC'

export async function signupHandler(req, res) {
  try {
    //  TODO: UseCase to verify if the user already exits

    const user = await CreateUserUC(req.body as UserModel)
    return res.status(200).send(user)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}