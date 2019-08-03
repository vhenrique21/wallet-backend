import {getUserOrdersOnABank} from '../../data-sources/bank'
import {getUserByUsername} from '../../data-sources/user'
import {BanksList} from '../user/createUserUC'


export const GetUserOrdersUC = async (username: string) => {
  const user = await getUserByUsername(username)
  const allOrders = []

  for (let banksListKey in BanksList) {
    if (user.banks.includes(banksListKey)) {
      allOrders.concat(await getUserOrdersOnABank(user.bankToken, banksListKey))
    }
  }
  return allOrders
}