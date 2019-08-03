import {updateUser} from '../../data-sources/user'
import {Suitability} from './createUserUC'


export const UpdateUserUC = async (data: UpdateUserModel) => {
  return updateUser(data)
}



export interface UpdateUserModel {
  username: string
  banco1?: boolean
  banco2?: boolean
  banco3?: boolean
  suitabilityResult?: Suitability
  maxBalanceValue?: number
  minEmergencyValue?: number
}