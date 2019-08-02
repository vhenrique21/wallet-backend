export const getBankAccountInfoHandler = async (req, res) => {
    try {
        const infoAccount = await GetInfoAccount();
        return res.status(200).send({
            data: infoAccount,
            message: 'Success'
        });
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
};
//# sourceMappingURL=user-account.js.map