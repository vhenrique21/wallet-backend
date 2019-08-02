import * as express from 'express';
import { buildRouter } from './routes';
import cors from 'cors';
const app = express();
const router = buildRouter();
app.use(cors());
app.use(router);
export default app;
//# sourceMappingURL=app.js.map