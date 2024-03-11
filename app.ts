import express from 'express';
import genreRoute from './src/routes/genreRoutes';
import 'express-async-errors'; 

import { openDbConnection, closeDbConnection } from './src/utils/db';
import { errorMiddleware } from './src/middleware/errorHandler';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/genres', genreRoute);

app.use(errorMiddleware);

// Open the database connection before starting the server
(async () => {

    await openDbConnection();

    app.listen(port, () => console.log(`Listening on port ${port}...`));

})();

// Gracefully disconnect from MongoDB when the application is terminated
process.on('SIGINT', async () => {
    await closeDbConnection();
    
    process.exit(0);
});
