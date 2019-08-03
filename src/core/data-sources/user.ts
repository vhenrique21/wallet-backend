import {DynamoDB} from 'aws-sdk'
import {omit} from 'lodash'
import {CreateUserModel, UserModel} from '../use-cases/user/createUserUC'
import {UpdateUserModel} from '../use-cases/user/updateUserUC'
import {createAuthCredentials, createHash} from './authorizer'


export const createUser = async (userInput: CreateUserModel) => {
  const hash = createHash(userInput.password)
  const documentClient = new DynamoDB.DocumentClient()

  const input = {
    TableName: 'WalletUser',
    Item: {
      ...userInput,
      password: hash
    }
  }
  await documentClient.put(input,
    function (_err, data) {
      console.log(JSON.stringify(data.Attributes, undefined, 2))
    })
  const jwt = createAuthCredentials(userInput.username, hash)

  return {
    user: omit(userInput, ['password']),
    token: jwt
  }
}

export const updateUser = async (userInput: UpdateUserModel): Promise<string> => {
  const documentClient = new DynamoDB.DocumentClient()

  const params = {
    TableName: 'WalletUser',
    Key: {'username': userInput.username},
    UpdateExpression: 'set banks = :b,' +
      'suitabilityResult = :suit, maxBalanceValue = :max, minEmergencyValue = :min',
    ExpressionAttributeValues: {
      ':b': userInput.banks,
      ':suit': userInput.suitabilityResult,
      ':max': userInput.maxBalanceValue,
      ':min': userInput.minEmergencyValue
    }
  }
  await documentClient.update(params,
    function (_err, data) {
      console.log(JSON.stringify(data.Attributes, undefined, 2))
    })
  return 'User successfully updated'
}

export const getUserByUsername = async (username: string, _sendPassword: boolean = false) => {
  const documentClient = new DynamoDB.DocumentClient()
  const getUser = {
    TableName: 'WalletUser',
    Key: {
      username: username
    }
  }
  const user = await documentClient.get(getUser).promise()
  if (_sendPassword) {
    return (user.Item as UserModel)
  }
  return omit(user.Item as UserModel, ['password'])
}

export const getAllUsers = async () => {
  const documentClient = new DynamoDB.DocumentClient()
  const input = {
    TableName: 'WalletUser'
  }
  const users = await (documentClient.scan(input).promise())
  return users.Items.map((user) => omit(user, ['password']))
}