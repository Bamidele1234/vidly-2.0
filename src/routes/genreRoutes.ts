import express, { Request, Response } from 'express';
import { validateGenre, } from '../middleware/validation';
import { Movie } from '../models/genre';
import { getMoviesFromGenre } from '../controllers/genreController';
import { MoviesError } from '../utils/error';

const router = express.Router();

router.get(`/:genre`, validateGenre, async (req: Request, res: Response) => {
    try {
        const genreKey = req.params.genre.toLocaleLowerCase();

        const movies = await getMoviesFromGenre(genreKey);

        if (movies !== null) {
            res.send(movies);
        } else {
            res.status(404).send(`Genre '${genreKey}' not found.`);
        }
    } catch (error) {
        console.error('Error:', error);

        // Check if the error is an instance of your custom error class
        if (error instanceof MoviesError) {
            res.status(500).send('Error fetching movies');
        } else {
            res.status(500).send('Internal Server Error');
        }
    }
});




// router.post(`/add`, validateGenreAdd, (req: Request, res : Response) => {

//     const newGenreKey = req.body.genre?.toLocaleLowerCase();
  
//     movieGenreList[newGenreKey] = [];

//     res.send(movieGenreList);

// });


export default router;