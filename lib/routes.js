import { Router } from 'express';
import { verifyAuthByJWT } from './core/data-sources/authorizer';
import { authHandler } from './presentation/user/authUser';
import { signupHandler } from './presentation/user/resgisterUser';
import { helloWorldHandler } from './presentation/hello/hello-world';
import * as bodyParser from 'body-parser';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
export const buildRouter = () => {
    const router = Router();
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    router.use(awsServerlessExpressMiddleware.eventContext());
    // Example Route
    router.get('/hello', verifyAuthByJWT, (req, res) => { helloWorldHandler(req, res); });
    // User Routes
    router.post('/register', signupHandler);
    router.post('/auth', authHandler);
    return router;
};
//# sourceMappingURL=routes.js.map