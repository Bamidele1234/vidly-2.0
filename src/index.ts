import express from 'express';
import 'express-async-errors'; 

import routes from './startup/routes';

const app = express();

routes(app);

export default app;