// import { DynamoDB } from 'aws-sdk';
import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import {UserModel} from '../use-cases/user/createUserUC'
import {getUserByUsername} from './user'

export const createAuthCredentials = (username: string, password: string) => {
  return jwt.sign({ username: username, password: password}, 'batman batman batman');
}

export const verifyAuthByJWT = (req, res, next)  => {
  let token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })

  jwt.verify(token, 'batman batman batman', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    // se tudo estiver ok, salva no request para uso posterior
    req.username = decoded.id
    next()
  });
}


export const authorizeByCredentials = async (username: string, password: string): Promise<string> => {
  const hash = createHash(password)
  const user: UserModel = await getUserByUsername(username, true)
  if (user.password !== hash) {
    throw new Error('Incorrect username or password')
  }
  return createAuthCredentials(username, hash)
}

// export const authorizeByToken = async (token: string): Promise<string> => {
//
//   //TODO: Verificar se token é valido e retornar userId
//   console.log(token)
//   return Promise.resolve('Meu Id')
// }

export const createHash = (password: string): string => {
  return crypto.createHash('sha1')
    .update(password)
    .digest('hex');
}




