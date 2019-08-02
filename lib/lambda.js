import * as awsServerlessExpress from 'aws-serverless-express';
import app from './app';
global.fetch = require('node-fetch').default;
const server = awsServerlessExpress.createServer(app);
export const handler = (event, context, _callback) => {
    if (event.httpMethod) {
        awsServerlessExpress.proxy(server, event, context);
    }
};
//# sourceMappingURL=lambda.js.map