import {UpdateUserModel, UpdateUserUC} from '../../core/use-cases/user/updateUserUC'

export async function updateUserHandler(req, res) {
  try {
    const body = req.body
    const result = await UpdateUserUC(body as UpdateUserModel)
    return res.status(200).send({
      message: result
    })

  } catch (e) {
    return res.status(500).send({
      err: e.message,
      message: 'Update fail'
    })
  }
}