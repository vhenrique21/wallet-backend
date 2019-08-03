import {getBankAccountInfoByBankToken} from '../../data-sources/bank'
import {createUser} from '../../data-sources/user'

export const CreateUserUC = async (user: CreateUserModel) => {
  const userAccounts: string[] = await verifyIfUserBankAccountExists(user.bankToken)
  user = {
    ...user,
    banks: userAccounts
  }
  return await createUser(user)
}

const verifyIfUserBankAccountExists = async (bankToken: string) => {
  let banks = []
  for (let banksListKey in BanksList) {
    try {
      await getBankAccountInfoByBankToken(bankToken, banksListKey)
      banks.push(banksListKey)
    } catch (e) {}
  }
  return banks
}

export interface CreateUserModel {
  name: string
  email: string
  username: string
  password?: string
  bankToken: string
  banks: string[]
}

export interface UserModel {
  name: string
  email: string
  username: string
  password: string
  bankToken: string
  banks: string[]
  suitabilityResult: Suitability
  maxBalanceValue: number
  minEmergencyValue: number
}

export enum Suitability {
  low = 'conservador',
  medium = 'moderado',
  high = 'sophisticated'
  
}

export enum BanksList {
  bank1 = 'banco1',
  bank2 = 'banco2',
  bank3 = 'banco3'
}