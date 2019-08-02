import {DynamoDB} from 'aws-sdk'
import {omit} from 'lodash'
import {UserModel} from '../use-cases/user/createUserUC'
import {createAuthCredentials, createHash} from './authorizer'

export const createUser = async (userInput: UserModel) => {
  const hash = createHash(userInput.password)
  const documentClient = new DynamoDB.DocumentClient()

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