import * as express from 'express'
import { buildRouter } from './routes'

const app = express()
const router = buildRouter()

app.use(router)

export default app