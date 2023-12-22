import GenreModel, { Movie } from '../models/genre';
import { MoviesError } from '../utils/error';


export const getMoviesFromGenre = async (genre: string): Promise<Movie[] | null> => {
    try {
        const genreDocument = await GenreModel.findOne({ genre }, { 'movies.name': 1, 'movies.year': 1 });

        if (genreDocument) {
            const movies = genreDocument.movies;

            console.log(`Movies in ${genre}:`, movies);

            return movies;
        } else {
            console.log(`Genre '${genre}' not found.`);
            return null;
        }
    } catch (err) {
        console.error('Error fetching movies:', err);
        throw new MoviesError('Error fetching movies'); 
    }
};
