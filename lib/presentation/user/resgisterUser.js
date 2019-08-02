import { CreateUserUC } from '../../core/use-cases/user/createUserUC';
export async function signupHandler(req, res) {
    try {
        //  TODO: UseCase to verify if the user already exits
        const user = await CreateUserUC(req.body);
        return res.status(200).send(user);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}
//# sourceMappingURL=resgisterUser.js.map