import * as bodyParser from 'body-parser'
import * as express from 'express'
import { buildRouter } from './routes'

const app = express()

const router = buildRouter()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

export default app