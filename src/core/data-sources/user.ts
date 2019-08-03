import {DynamoDB} from 'aws-sdk'
import {omit} from 'lodash'
import {CreateUserModel, UserModel} from '../use-cases/user/createUserUC'
import {UpdateUserModel} from '../use-cases/user/updateUserUC'
import {createAuthCredentials, createHash} from './authorizer'

const documentClient = new DynamoDB.DocumentClient()

export const createUser = async (userInput: CreateUserModel) => {
  const hash = createHash(userInput.password)

  const input = {
    TableName: "WalletUser",
    Item: {
      ...userInput,
      password: hash
    }
  }
  await documentClient.put(input,
    function (_err, data) { console.log(JSON.stringify(data.Attributes, undefined, 2))})
  const jwt = createAuthCredentials(userInput.username, hash)

  return {
    user: omit(userInput, ['password']),
    token: jwt
  }
}

export const updateUser = async (userInput: UpdateUserModel): Promise<string> => {

  const params = {
    TableName: "WalletUser",
    Key: { "username": userInput.username },
    UpdateExpression: "set banco1 = :b1, banco2 = :b2, banco3 = :b3, " +
      "suitabilityResult = :suit, maxBalanceValue = :max, minEmergencyValue = :min",
    ExpressionAttributeValues: {
      ":b1": userInput.banco1,
      ":b2": userInput.banco2,
      ":b3": userInput.banco3,
      ":suit": userInput.suitabilityResult,
      ":max": userInput.maxBalanceValue,
      ":min": userInput.minEmergencyValue
    }
  }
  await documentClient.update(params,
    function (_err, data) { console.log(JSON.stringify(data.Attributes, undefined, 2))})
  return 'User successfully updated'
}

export const getUserByUsername = async (username: string, _sendPassword: boolean = false) => {
  const documentClient = new DynamoDB.DocumentClient()
  const getUser = {
    TableName: "WalletUser",
    Key: {
      username: username
    }
  }
  const user = await documentClient.get(getUser).promise()
  if (_sendPassword) {
    return user.Item as UserModel
  }
  return omit(user.Item as UserModel, ['password'])
}