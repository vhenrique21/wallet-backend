import { GetUserOrdersUC } from '../../core/use-cases/bank/getUserOrdersUC';
export const getUserOrdersHandler = async (req, res) => {
    try {
        const infoAccount = await GetUserOrdersUC(req.username);
        return res.status(200).send({
            data: infoAccount,
            message: 'Success'
        });
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
};
//# sourceMappingURL=bank-order.js.map