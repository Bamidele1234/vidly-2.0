import app from './index';
import { PORT } from './utils/config';
import { openDbConnection } from './utils/db';
import logger from './utils/logger';


const initServer = async() => {
    await openDbConnection();

    app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`));
}

initServer();