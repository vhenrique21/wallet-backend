// import {getUserByUsername} from '../../data-sources/user'
import { getInvestmentsFromABank } from '../../data-sources/bank';
import { getUserByUsername } from '../../data-sources/user';
import { BanksList } from '../user/createUserUC';
export const GetInvestment = async (username) => {
    const user = await getUserByUsername(username);
    const allBanksInvestments = [];
    for (let banksListKey in BanksList) {
        if (user.banks.includes(banksListKey)) {
            allBanksInvestments.concat(await getInvestmentsFromABank(user.bankToken, banksListKey));
        }
    }
    return allBanksInvestments;
};
//# sourceMappingURL=getInvestments.js.map