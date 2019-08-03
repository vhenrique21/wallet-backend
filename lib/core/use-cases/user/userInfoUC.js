import { getUserByUsername } from '../../data-sources/user';
export const userInfoUC = async (username) => {
    return await getUserByUsername(username);
};
//# sourceMappingURL=userInfoUC.js.map