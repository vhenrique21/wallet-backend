import { getBankAccountInfoByBankToken } from '../../data-sources/bank';
import { createUser } from '../../data-sources/user';
export const CreateUserUC = async (user) => {
    const userAccounts = await verifyIfUserBankAccountExists(user.bankToken);
    user = Object.assign({}, user, { banks: userAccounts });
    return await createUser(user);
};
const verifyIfUserBankAccountExists = async (bankToken) => {
    let banks = [];
    for (let banksListKey in BanksList) {
        try {
            await getBankAccountInfoByBankToken(bankToken, banksListKey);
            banks.push(banksListKey);
        }
        catch (e) {
            console.log(e);
        }
    }
    return banks;
};
export var Suitability;
(function (Suitability) {
    Suitability["low"] = "conservador";
    Suitability["medium"] = "moderado";
    Suitability["high"] = "sophisticated";
})(Suitability || (Suitability = {}));
export var BanksList;
(function (BanksList) {
    BanksList["banco1"] = "banco1";
    BanksList["banco2"] = "banco2";
    BanksList["banco3"] = "banco3";
})(BanksList || (BanksList = {}));
//# sourceMappingURL=createUserUC.js.map