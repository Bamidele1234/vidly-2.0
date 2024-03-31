import helmet from 'helmet';
import compression from 'compression';
import express from "express";

const prod = (app: express.Application) => {
    app.use(helmet());
    app.use(compression);
}

export default prod;

