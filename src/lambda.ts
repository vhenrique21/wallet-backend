// lambda.js
// 'use strict'
import {APIGatewayEvent, Context, Handler} from 'aws-lambda'
import * as awsServerlessExpress from 'aws-serverless-express'
import app from './app'

  ;(global as any).fetch = require('node-fetch').default

const server = awsServerlessExpress.createServer(app)

export const handler: Handler = (event: APIGatewayEvent, context: Context, _callback) => {
  if (event.httpMethod) {
    awsServerlessExpress.proxy(server, event, context)
  }
}