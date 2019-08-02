import { getBankAccountInfoByBankToken } from '../../data-sources/bank';
import { getUserByUsername } from '../../data-sources/user';
export const GetInfoAccount = async (username) => {
    const user = await getUserByUsername(username);
    const bankAccountPromises = [];
    if (user.banco1)
        bankAccountPromises.push(getBankAccountInfoByBankToken(user.bankToken, 'banco1'));
    if (user.banco2)
        bankAccountPromises.push(getBankAccountInfoByBankToken(user.bankToken, 'banco2'));
    if (user.banco3)
        bankAccountPromises.push(getBankAccountInfoByBankToken(user.bankToken, 'banco3'));
    const results = await Promise.all(bankAccountPromises);
    return results.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
    }, []);
};
//# sourceMappingURL=getBankAccountUC.js.map