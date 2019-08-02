import { GetInfoAccount } from '../../core/use-cases/bank/getBankAccountUC';
export const getBankAccountInfoHandler = async (req, res) => {
    try {
        const infoAccount = await GetInfoAccount(req.username);
        return res.status(200).send({
            data: infoAccount,
            message: 'Success'
        });
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
};
//# sourceMappingURL=bank-account.js.map