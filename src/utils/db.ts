// db.ts

import mongoose from 'mongoose';

const connectionUri = 'mongodb://localhost:27017/vidly_version2';

const openDbConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(connectionUri);

        console.log('Connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);

        process.exit(1); // Exit the process if unable to connect
    }
};

const closeDbConnection = async (): Promise<void> => {

    await mongoose.disconnect();

    console.log('Disconnected from MongoDB');
};

export { openDbConnection , closeDbConnection };
