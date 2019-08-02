import { authorizeByCredentials } from '../../data-sources/authorizer';
export const AuthUserUC = async (user) => {
    return await authorizeByCredentials(user.username, user.password);
};
//# sourceMappingURL=authUserUC.js.map