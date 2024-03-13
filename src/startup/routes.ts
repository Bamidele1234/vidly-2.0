import express from "express";

import genreRoute from '../routes/genreRoutes';
import { errorHandler } from "../middleware/errorHandler";

// Define routes function
const routes = (app: express.Application) => {
    app.use(express.json());
    app.use('/api/genres', genreRoute);
    app.use(errorHandler);
}

export default routes;


