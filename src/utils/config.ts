// config.ts
import * as dotenv from 'dotenv';

dotenv.config(); 

let CONNECTION_URI = process.env.CONNECTION_URI as string;

if (process.env.NODE_ENV === 'test') {
    CONNECTION_URI = process.env.CONNECTION_URI_TEST as string;
}

export { CONNECTION_URI };
export const PORT: number = parseInt(process.env.PORT || '5000', 10);
