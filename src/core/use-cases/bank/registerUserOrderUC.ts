import {BankOrdersModel, registerUserOrdersOnABank} from '../../data-sources/bank'
import {BanksList} from '../user/createUserUC'


export const RegisterUserOrderUC = async (bank: BanksList, bankToken: string, orderBody: BankOrdersModel) => {
  return await registerUserOrdersOnABank(bankToken, bank, orderBody)
}