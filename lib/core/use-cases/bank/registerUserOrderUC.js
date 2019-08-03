import { registerUserOrdersOnABank } from '../../data-sources/bank';
export const RegisterUserOrderUC = async (bank, bankToken, orderBody) => {
    return await registerUserOrdersOnABank(bankToken, bank, orderBody);
};
//# sourceMappingURL=registerUserOrderUC.js.map