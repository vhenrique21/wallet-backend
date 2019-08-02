import { getUserByUsername } from '../../core/data-sources/user';
import { CreateUserUC } from '../../core/use-cases/user/createUserUC';
const Joi = require('@hapi/joi');
export async function signupHandler(req, res) {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).max(12).required(),
            email: Joi.string().email().required(),
            bankToken: Joi.string().trim().required(),
            name: Joi.string().required()
        });
        // @ts-ignore
        Joi.validate(req.body, schema, (err, value) => {
            if (err) {
                return res.status(400).send(err.message);
            }
        });
        const verify = await getUserByUsername(req.body.username);
        console.log(verify);
        if (verify.username) {
            return res.status(401).send({ message: 'This user already exists' });
        }
        const user = await CreateUserUC(req.body);
        return res.status(200).send(user);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}
//# sourceMappingURL=resgister-user.js.map