import express, { Request, Response, response } from 'express';
import { validateGenre, validateMoviesForGenre, validateNewGenre } from '../middleware/validation';
import { Movie } from '../models/genre';
import { getMoviesFromGenre, getAllGenres, addMoviesbyGenre, addNewGenre, deleteGenre } from '../controllers/genreController';
import { MoviesError } from '../utils/error';

const router = express.Router();


router.get(`/`, async (req: Request, res: Response) => {
    try {
        const genres = await getAllGenres();
    
        if (genres !== null ) {
            res.send(genres);
        } else {
            res.status(404).send(`An error occured while fetching genres`);
        }
    } catch (error) {
        console.error('Error:', error);

        res.status(500).send('Error fetching genre list');
    }
});

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


router.post(`/add`, validateNewGenre, async (req: Request, res : Response) => {
    try{
        const genreKey = req.body.genre?.toLocaleLowerCase();

        const movies = req.body.movies as Movie[];

        const response = await addNewGenre(genreKey, movies);
    
        if (response.success){
            res.send(response.message);
        }else{
            res.status(404).send(response.message);
        }

    }catch (error){

        if(error instanceof MoviesError){
            res.status(500).send(error.message);
        }else{
            res.status(500).send('An error occured !')
        }

    }
});


router.post(`/:genre/add`, validateMoviesForGenre, async (req: Request, res : Response) => {
    try{
        const genreKey = req.params.genre?.toLocaleLowerCase();

        const movies = req.body.movies as Movie[];

        const response = await addMoviesbyGenre(genreKey, movies)
    
        if (response.success){
            res.send(response.message);
        }else{
            res.status(404).send(response.message);
        }

    }catch (error){

        if(error instanceof MoviesError){
            res.status(500).send(error.message);
        }else{
            res.status(500).send('An error occured !')
        }

    }
});


router.delete(`/:genre`, async (req: Request, res: Response) => {
    try {
        const genreKey = req.params.genre.toLocaleLowerCase();
   
        const response = await deleteGenre(genreKey);
        
        if (response.success) {
            res.send(response.message);
        } else {
            res.status(404).send(response.message);
        }

    } catch (error) {

        if (error instanceof MoviesError) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An error occurred!');
        }
    }
});


export default router;