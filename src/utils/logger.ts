import winston from 'winston';
import 'winston-mongodb';
import { CONNECTION_URL } from './config';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
                winston.format.printf(({ level, message, timestamp }) => {
                    return `${timestamp} [${level}]: ${message}`;
                })
            )
        }),
        new winston.transports.File({ filename: 'combined.log' , level: "error" }),
        new winston.transports.MongoDB({
            db: CONNECTION_URL,
            options: { useUnifiedTopology: true },
            level: "info",
            collection: "Console Logs"
        })
    ]
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (ex) => {
    logger.error('Uncaught Exception:', ex);
    process.exit(1); 
});

export default logger;
