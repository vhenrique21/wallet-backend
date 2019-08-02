import { getBankAccountInfoByBankToken } from '../../data-sources/bank';
import { createUser } from '../../data-sources/user';
export const CreateUserUC = async (user) => {
    const userAccounts = await verifyIfUserBankAccountExists(user.bankToken);
    user = Object.assign({}, user, { banco1: userAccounts[0], banco2: userAccounts[1], banco3: userAccounts[2] });
    return await createUser(user);
};
const verifyIfUserBankAccountExists = async (bankToken) => {
    let result_1;
    let result_2;
    let result_3;
    try {
        await getBankAccountInfoByBankToken(bankToken, 'banco1');
        result_1 = true;
    }
    catch (e) {
        result_1 = false;
    }
    try {
        await getBankAccountInfoByBankToken(bankToken, 'banco2');
        result_2 = true;
    }
    catch (e) {
        result_2 = false;
    }
    try {
        await getBankAccountInfoByBankToken(bankToken, 'banco3');
        result_3 = true;
    }
    catch (e) {
        result_3 = false;
    }
    return [result_1, result_2, result_3];
};
//# sourceMappingURL=createUserUC.js.map