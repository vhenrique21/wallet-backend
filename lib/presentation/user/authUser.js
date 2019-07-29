import { AuthUserUC } from '../../core/use-cases/user/authUserUC';
export async function authHandler(req, res) {
    try {
        const body = req.body;
        const token = await AuthUserUC(body);
        console.log(token);
        return res.status(200).send({
            token: token,
            message: 'User successfully retrieved'
        });
    }
    catch (e) {
        return res.status(500).send({
            err: e.message,
            message: "Auth fail"
        });
    }
}
//# sourceMappingURL=authUser.js.map