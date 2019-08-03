import { getBankAccountInfoByBankToken } from '../../data-sources/bank';
import { getUserByUsername } from '../../data-sources/user';
import { BanksList } from '../user/createUserUC';
export const GetInfoAccount = async (username) => {
    const user = await getUserByUsername(username);
    const bankAccountPromises = [];
    for (let banksListKey in BanksList) {
        if (user.banks.includes(banksListKey))
            bankAccountPromises.push(getBankAccountInfoByBankToken(user.bankToken, banksListKey));
    }
    const results = await Promise.all(bankAccountPromises);
    return results.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
    }, []);
};
//# sourceMappingURL=getBankAccountUC.js.map