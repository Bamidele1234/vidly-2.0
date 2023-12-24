import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateGenre = (req: Request, res: Response, next: NextFunction) => {
   
    const schema = Joi.object({
        genre: Joi.string().max(20).min(3).required(),
    });

    const result = schema.validate({ genre: req.params.genre.toLocaleLowerCase() });

    if (result.error) {
        const errorMessages = result.error.details.map(detail => detail.message);
        res.status(400).send(errorMessages);
    } else {
        next();
    }
}

export const validateGenreAdd = (req: Request, res: Response, next: NextFunction) => {

    const genreKey = req.params.genre?.toLocaleLowerCase();

    const genreSchema = Joi.object({
        genre: Joi.string().max(20).min(3).required(),
    });

    const validationResult = genreSchema.validate({ genre : genreKey })

    if(validationResult.error){
        const errorMessages = validationResult.error.details.map(detail => detail.message);
        res.status(400).send(errorMessages);
    }
    
    const schema = Joi.object({
        movies: Joi.array()
            .min(1)
            .items(
                Joi.object({
                    name: Joi.string().required(),
                    year: Joi.number().required(),
                })
            ).required(),
    });

    const result = schema.validate(req.body);

    if (result.error) {
        const errorMessages = result.error.details.map(detail => detail.message);
        res.status(400).send(errorMessages);
    } 

    next();
};


// export const validateGenreAdd = (req: Request, res: Response, next: NextFunction) => {
//     const validGenres = getMovieGenres();
//     const requestedGenre = req.body.genre?.toLocaleLowerCase();

//     const schema = Joi.object({
//         genre:  Joi.string().min(3).max(20).required(),
//     });

//     const result = schema.validate({ genre: requestedGenre });

//     if (result.error) {
//         const errorMessages = result.error.details.map(detail => detail.message);
//         res.status(400).send(errorMessages);

//         return;
//     } 

//     // Check if the requested genre is already in the validGenres list
//     if (validGenres.includes(requestedGenre)) {
//         res.status(400).send(['Genre already exists']);

//         return;
//     }

//     next();
// }