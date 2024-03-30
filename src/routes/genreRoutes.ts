import express, { NextFunction, Request, Response} from 'express';
import { validateGenre, validateMoviesForGenre, validateNewGenre } from '../middleware/validation';
import { Movie } from '../models/genre';
import { getMoviesFromGenre, getAllGenres, addMoviesbyGenre, addNewGenre, deleteGenre, getDataById } from '../controllers/genreController';
import { validateObjectId } from '../middleware/validateObjectID';

const router = express.Router();

router.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
    const genres = await getAllGenres();
        
    if (genres !== null) {
        res.send(genres);
    } else {
        res.status(404).send(`An error occurred while fetching genres`);
    }
});

router.get(`/:id`, validateObjectId, async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await getDataById(id);

    if (data !== null) {
        res.send(data);
    } else {
        res.status(404).send({ error: 'Genre not found' });
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
    } else {
        res.status(404).send(response?.message);
    }
});

router.post(`/:genre/add`, validateMoviesForGenre, async (req: Request, res : Response) => {
    const genreKey = req.params.genre?.toLocaleLowerCase();

    const movies = req.body.movies as Movie[];

    const response = await addMoviesbyGenre(genreKey, movies)

    if (response.success){
        res.send(response.message);
    } else {
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
