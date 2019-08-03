import { getBankAccountInfoByBankToken, getUserOrdersOnABank, registerUserOrdersOnABank } from '../../core/data-sources/bank';
import { getAllUsers } from '../../core/data-sources/user';
import { investmentConfig } from '../../core/use-cases/bank/BankInvestmentsLogical';
import { BanksList } from '../../core/use-cases/user/createUserUC';
export async function handler(event, context, _callback) {
    // Pegar todos os usuarios
    const users = (await getAllUsers());
    //TODO: Para cada usuario verificar saldo em conta e aplicar as regras do suitability
    //TODO: Para usuarios que não estão dentro das regras, reorganizo o dinhero entre saldo, emergencia e investimento
    await Promise.all(users.map(async (user) => {
        const bankInfo = [];
        const emergencyMoney = [];
        for (let banksListKey in BanksList) {
            if (user.banks.includes(banksListKey)) {
                bankInfo.concat(await getBankAccountInfoByBankToken(user.bankToken, banksListKey));
                emergencyMoney.concat(await getUserOrdersOnABank(user.bankToken, banksListKey));
            }
        }
        let allUserMoney = bankInfo.reduce((previousValue, currentValue, currentIndex) => {
            return previousValue + currentValue.Amount;
        }, 0);
        let allUserEmergencyMoney = bankInfo.reduce((previousValue, currentValue, currentIndex) => {
            return previousValue + currentValue.valor;
        }, 0);
        if (allUserMoney > user.maxBalanceValue && allUserEmergencyMoney < user.minEmergencyValue) {
            let extraMoney = allUserMoney - user.maxBalanceValue;
            for (let banksListKey in BanksList) {
                if (user.banks.includes(banksListKey) && extraMoney > 0) {
                    const money = (await getBankAccountInfoByBankToken(user.bankToken, banksListKey)).Amount;
                    const orderBody = {
                        IdProduct: investmentConfig[banksListKey][user.suitabilityResult]['emergency'],
                        AcquisitionDate: (new Date()).toDateString(),
                        Amount: money
                    };
                    await registerUserOrdersOnABank(user.bankToken, banksListKey, orderBody);
                    extraMoney -= money;
                    allUserMoney -= money;
                    allUserEmergencyMoney += money;
                }
            }
        }
        if (allUserEmergencyMoney <= user.minEmergencyValue) {
            // const neededMoney = user.minEmergencyValue - allUserEmergencyMoney
            //TODO: Retirar o valor necessário dos fundos de investimentos e colocar nos fundos de emergência.
            // Não existe uma API para fazer isso no momento.
        }
        else {
            // const extraMoney = allUserEmergencyMoney - user.minEmergencyValue
            //TODO : Retirar o 'extraMoney' do fundo de emergência e colocar no fundo de investimento.
            // Não existe uma API para fazer isso no momento.
        }
        if (allUserMoney > user.maxBalanceValue) {
            let extraMoney = allUserMoney - user.maxBalanceValue;
            for (let banksListKey in BanksList) {
                if (user.banks.includes(banksListKey) && extraMoney > 0) {
                    const money = (await getBankAccountInfoByBankToken(user.bankToken, banksListKey)).Amount;
                    const orderBody = {
                        IdProduct: investmentConfig[banksListKey][user.suitabilityResult]['investment'],
                        AcquisitionDate: (new Date()).toDateString(),
                        Amount: money
                    };
                    await registerUserOrdersOnABank(user.bankToken, banksListKey, orderBody);
                    extraMoney -= money;
                    allUserMoney -= money;
                }
            }
        }
    }));
    //TODO: Envio um email avisando o usuario da mudança
    return;
}
//# sourceMappingURL=PropagateActions.js.map