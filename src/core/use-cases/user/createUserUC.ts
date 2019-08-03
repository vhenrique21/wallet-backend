import {getBankAccountInfoByBankToken} from '../../data-sources/bank'
import {createUser} from '../../data-sources/user'

export const CreateUserUC = async (user: CreateUserModel) => {
  const userAccounts = await verifyIfUserBankAccountExists(user.bankToken)
  user = {
    ...user,
    banco1: userAccounts[0],
    banco2: userAccounts[1],
    banco3: userAccounts[2]
  }
  return await createUser(user)
}

const verifyIfUserBankAccountExists = async (bankToken: string) => {
  let result_1
  let result_2
  let result_3
  try {
    await getBankAccountInfoByBankToken(bankToken, 'banco1')
    result_1 = true
  } catch (e) {
    result_1 = false
  }
  try {
    await getBankAccountInfoByBankToken(bankToken, 'banco2')
    result_2 = true
  } catch (e) {
    result_2 = false
  }
  try {
    await getBankAccountInfoByBankToken(bankToken, 'banco3')
    result_3 = true
  } catch (e) {
    result_3 = false
  }
  return [result_1, result_2, result_3]
}

export interface CreateUserModel {
  name: string
  email: string
  username: string
  password?: string
  bankToken: string
  banco1?: boolean
  banco2?: boolean
  banco3?: boolean
}

export interface UserModel {
  name: string
  email: string
  username: string
  password: string
  bankToken: string
  banco1?: boolean
  banco2?: boolean
  banco3?: boolean
  suitabilityResult: Suitability
  maxBalanceValue: number
  minEmergencyValue: number
}

export enum Suitability {
  low = 'conservador',
  medium = 'moderado',
  high = 'arrojado'
  
}