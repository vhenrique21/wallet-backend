import { Router } from 'express';
import { verifyAuthByJWT } from './core/data-sources/authorizer';
import { getBankAccountInfoHandler } from './presentation/bank/bank-account';
import { authHandler } from './presentation/user/auth-user';
import { signupHandler } from './presentation/user/resgister-user';
import { helloWorldHandler } from './presentation/hello/hello-world';
import * as bodyParser from 'body-parser';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { updateUserHandler } from './presentation/user/update-user';
import { getUserInfoHandler } from './presentation/user/user-info';
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
    router.get('/user', verifyAuthByJWT, async (req, res) => { await getUserInfoHandler(req, res); });
    router.put('/user', verifyAuthByJWT, (async (req, res) => { await updateUserHandler(req, res); }));
    // router.get('/user/orders', verifyAuthByJWT, (req, res) => { getUserOrdersHandler(req, res) })
    // router.post('/user/orders', verifyAuthByJWT, (req, res) => { registerUserOrdersHandler(req, res) })
    // Bank Routes
    // router.get('/investment', verifyAuthByJWT, (req, res) => { getInvestmentHandler(req, res) })
    // router.get('/loans', verifyAuthByJWT, (req, res) => { getLoansHandler(req, res) })
    router.get('/bank', verifyAuthByJWT, async (req, res) => { await getBankAccountInfoHandler(req, res); });
    // router.post('/bank/transfer', verifyAuthByJWT, (req, res) => { makeTransferHandler(req, res) })
    // router.post('/bank/pay', verifyAuthByJWT, (req, res) => { makePaymentHandler(req, res) })
    // router.post('/bank/pay/card', verifyAuthByJWT, (req, res) => { makePaymentsWithCard(req, res) })
    // router.post('/bank/pay/card/invoice', verifyAuthByJWT, (req, res) => { makeCardInvoicePaymentHandler(req, res) })
    // router.get('/bank/card', verifyAuthByJWT, (req, res) => { getUserCardInfoHandler(req, res) })
    // router.get('/bank/card/transfers', verifyAuthByJWT, (req, res) => { getCardTranfersInfo(req,res) })
    // router.get('/bank/card/invoice', verifyAuthByJWT, (req, res) => { getAllCardInvoiceInfoHandler(req, res) })
    // router.get('/user/card/invoice/:id', verifyAuthByJWT, (req, res) => { getCardInvoiceInfoHandler(req, res) })
    return router;
};
//# sourceMappingURL=routes.js.map