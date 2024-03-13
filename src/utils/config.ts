// config.ts
import * as dotenv from 'dotenv';

dotenv.config(); 

export const CONNECTION_URL = process.env.CONNECTION_URL || 'defaultKey';
export const PORT = process.env.PORT || 5000;
