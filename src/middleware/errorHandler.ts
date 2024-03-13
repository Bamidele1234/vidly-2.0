import { Request, Response, NextFunction } from 'express';
import { DatabaseError, MoviesError } from '../utils/error';
import logger from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
    
    if (err instanceof MoviesError) {
        errorMessage = `Error fetching movies: ${err.message}`;
    } else if (err instanceof DatabaseError) {
        errorMessage = `Error with database: ${err.message}`;
    }

    logger.error(errorMessage);

    res.status(statusCode).json({ error: errorMessage });
};