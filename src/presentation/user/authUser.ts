import {AuthUserModel, AuthUserUC} from '../../core/use-cases/user/authUserUC'


export async function authHandler(req, _res) {
  try {
    const body = req.body
    await AuthUserUC(body as AuthUserModel)

  } catch (e) {

  }
}