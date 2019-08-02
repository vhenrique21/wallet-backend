import rp from 'request-promise';
export const getBankAccountInfoByBankToken = async (bankToken, bank) => {
    const options = {
        method: 'GET',
        uri: `https://www.btgpactual.com/btgcode/api/${bank}/accounts/${bankToken}`,
        headers: {
            'User-Agent': 'Request-Promise',
            'x-api-key': bankToken
        },
        json: true
    };
    return await rp(options);
};
export const getInvestmentsFromABank = async (bankToken, bank) => {
    const options = {
        method: 'GET',
        uri: `https://www.btgpactual.com/btgcode/api/${bank}/investment`,
        headers: {
            'User-Agent': 'Request-Promise',
            'x-api-key': bankToken
        },
        json: true
    };
    return await rp(options);
};
//# sourceMappingURL=bank.js.map