import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationResult } from 'joi';


const sendValidationErrors = (res: Response, validationResult: ValidationResult<any>): void => {
    const errorMessages = validationResult.error?.details.map(detail => detail.message) || [];
    res.status(400).send(errorMessages);

    return;
};

const genreSchema = Joi.object({
    genre: Joi.string().max(20).min(3).required(),
});

export const validateGenre = (req: Request, res: Response, next: NextFunction) => {
   
    const result = genreSchema.validate({ genre: req.params.genre.toLocaleLowerCase() });

    if (result.error) {
        sendValidationErrors(res, result);

        return;
    }
    
    next();

}


const validate = (req: Request, res: Response, next: NextFunction, usebody: boolean) => {

    const genreKey = usebody ? req.body.genre?.toLocaleLowerCase() : req.params.genre?.toLocaleLowerCase();

    const validationResult = genreSchema.validate({ genre : genreKey })

    if(validationResult.error){
        sendValidationErrors(res, validationResult);

        return;
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

    const result = usebody ? schema.validate({ movies: req.body.movies }) : schema.validate(req.body);

    if (result.error) {
        sendValidationErrors(res, result);

        return;
    } 

    next();
}

export const validateNewGenre = (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next, true);
}

export const validateMoviesForGenre = (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next, false);
};