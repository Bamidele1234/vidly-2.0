import express, { NextFunction, Request, Response} from 'express';
import { validateGenre, validateMoviesForGenre, validateNewGenre } from '../middleware/validation';
import { Movie } from '../models/genre';
import { getMoviesFromGenre, getAllGenres, addMoviesbyGenre, addNewGenre, deleteGenre } from '../controllers/genreController';


const router = express.Router();

router.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
    const genres = await getAllGenres();
        
    if (genres !== null) {
        res.send(genres);
    } else {
        res.status(404).send(`An error occurred while fetching genres`);
    }

});

router.get(`/:genre`, validateGenre, async (req: Request, res: Response) => {
   
    const genreKey = req.params.genre.toLocaleLowerCase();

    const movies = await getMoviesFromGenre(genreKey);

    if (movies !== null) {
        res.send(movies);
    } else {
        res.status(404).send(`Genre '${genreKey}' not found.`);
    }

});


router.post(`/add`, validateNewGenre, async (req: Request, res : Response) => {
    const genreKey = req.body.genre?.toLocaleLowerCase();

    const movies = req.body.movies as Movie[];

    const response = await addNewGenre(genreKey, movies);

    if (response?.success){
        res.send(response.message);
    }else{
        res.status(404).send(response?.message);
    }
});


router.post(`/:genre/add`, validateMoviesForGenre, async (req: Request, res : Response) => {
    const genreKey = req.params.genre?.toLocaleLowerCase();

    const movies = req.body.movies as Movie[];

    const response = await addMoviesbyGenre(genreKey, movies)

    if (response.success){
        res.send(response.message);
    }else{
        res.status(404).send(response.message);
    }
});


router.delete(`/:genre`, async (req: Request, res: Response) => {
    const genreKey = req.params.genre.toLocaleLowerCase();
   
        const response = await deleteGenre(genreKey);
        
        if (response.success) {
            res.send(response.message);
        } else {
            res.status(404).send(response.message);
        }
});

export default router;
