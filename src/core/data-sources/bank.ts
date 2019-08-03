import rp from 'request-promise'

export const getBankAccountInfoByBankToken = async (bankToken: string, bank: string) => {
  const options = {
    method: 'GET',
    uri: `https://www.btgpactual.com/btgcode/api/${bank}/accounts/${bankToken}`,
    headers: {
      'User-Agent': 'Request-Promise',
      'x-api-key': bankToken
    },
    json: true
  }
  return await rp(options)
}

export const getInvestmentsFromABank = async (bankToken: string, bank: string) => {
  const options = {
    method: 'GET',
    uri: `https://www.btgpactual.com/btgcode/api/${bank}/investment`,
    headers: {
      'User-Agent': 'Request-Promise',
      'x-api-key': bankToken
    },
    json: true
  }
  return await rp(options)
}

export const getUserOrdersOnABank = async (bankToken: string, bank: string) => {
  const options = {
    method: 'GET',
    uri: `https://www.btgpactual.com/btgcode/api/${bank}/orders/${bankToken}`,
    headers: {
      'User-Agent': 'Request-Promise',
      'x-api-key': bankToken
    },
    json: true
  }
  return await rp(options)
}

export const registerUserOrdersOnABank = async (bankToken: string, bank: string, body:BankOrdersModel) => {
  const options = {
    method: 'POST',
    uri: `https://www.btgpactual.com/btgcode/api/${bank}/orders/${bankToken}`,
    headers: {
      'User-Agent': 'Request-Promise',
      'x-api-key': bankToken
    },
    body: body,
    json: true
  }
  return await rp(options)
}

export interface BankOrdersModel {
  IdProduct: string
  AcquisitionDate: string,
  Amount: number
}



