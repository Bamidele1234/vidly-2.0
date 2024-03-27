import mongoose from 'mongoose';
import { CONNECTION_URI } from './config';
import logger from './logger';
import { DatabaseError } from './error';

const openDbConnection = async () => {
    try {
        await mongoose.connect(CONNECTION_URI);
        logger.info(`Connected to ${CONNECTION_URI}`);
    } catch (error) {
        throw new DatabaseError('Error connecting to MongoDB');
    }
};

const closeDbConnection = async () => {
    try {
        await mongoose.disconnect();
        logger.info('Disconnected from MongoDB');
    } catch (error) {
        throw new DatabaseError('Error disconnecting from MongoDB');
    }
};

process.on('SIGINT', async () => {
    try {
        await closeDbConnection();
        logger.info('Database connection closed');
    } catch (error) {
        logger.error('Error handling SIGINT:', error);
    } finally {
        process.exit(0);
    }
});

export { openDbConnection, closeDbConnection };
