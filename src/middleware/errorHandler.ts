import { Request, Response, NextFunction, Router } from 'express';
import { MoviesError } from '../utils/error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    if (err instanceof MoviesError) {
        res.status(500).send(`Error fetching movies: ${err.message}`);
    } else {
        res.status(500).send('Internal Server Error');
    }
}


// export const errorHandler = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
//     return function(req: Request, res: Response, next: NextFunction) {
//         handler(req, res, next).catch(next);
//     };
// }