import {updateUser} from '../../data-sources/user'
import {Suitability} from './createUserUC'


export const UpdateUserUC = async (data: UpdateUserModel) => {
  return updateUser(data)
}



export interface UpdateUserModel {
  username: string
  banks: string[]
  suitabilityResult?: Suitability
  maxBalanceValue?: number
  minEmergencyValue?: number
}