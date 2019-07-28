import { Router } from 'express'
import {signupHandler} from './presentation/user/resgisterUser'
import {helloWorldHandler} from './presentation/hello/hello-world'

export const buildRouter = () => {
  const router = Router()

  // Example Route
  router.get('/hello', helloWorldHandler)

  // User Routes
  router.post('/register', signupHandler)


  return router
}