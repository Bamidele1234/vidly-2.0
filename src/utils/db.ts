import mongoose from 'mongoose';
import { CONNECTION_URL } from './config';
import logger from './logger';
import { DatabaseError } from './error';

const openDbConnection = async () => {
    try {
        await mongoose.connect(CONNECTION_URL);
        logger.info('Connected to Mongo DB');
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

export { openDbConnection };
