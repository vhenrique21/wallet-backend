import {getUserByUsername} from '../../core/data-sources/user'
import {CreateUserModel, CreateUserUC} from '../../core/use-cases/user/createUserUC'
const Joi = require('@hapi/joi')

export async function signupHandler(req, res) {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().lowercase().required(),
      password: Joi.string().min(6).max(12).required(),
      email: Joi.string().email().required(),
      bankToken: Joi.string().trim().required(),
      name: Joi.string().required()
    })
    // @ts-ignore
    const validation = Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        return err.message
      }
      return false
    })

    if (validation) { return res.status(400).send(validation) }

    const verify = await getUserByUsername(req.body.username)
    if (verify.username) {
      return res.status(401).send({message: 'This user already exists'})
    }

    const user = await CreateUserUC(req.body as CreateUserModel)
    return res.status(200).send(user)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}