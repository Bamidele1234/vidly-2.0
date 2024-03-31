import express from 'express';
import 'express-async-errors'; 

import routes from './startup/routes';
import prod from './startup/prod';

const app = express();

routes(app);
prod(app);

export default app;