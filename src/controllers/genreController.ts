import { movieResponse } from '../models/movieResponse';
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

export const getDataById = async (id : string) => {
    try {
        const genre = await GenreModel.findById(id);

        if (!genre) {
            return null;
        }

        return genre;

    } catch(err) { 
        console.error('Error fetching movies by ID:', err);

        throw new MoviesError('Error fetching movies by ID');
    }
}

export const getAllGenres = async (): Promise<string[] | null> => {
    try {
        
        return await GenreModel.distinct('genre');

    }catch(err){
        console.error('Error fetching genres:', err);
        return null;
    }
}

export const deleteGenre = async (genreKey: string) :  Promise<movieResponse> => {
    try{
        const genres = await getAllGenres();

        if(genres?.includes(genreKey)){
            const result = await GenreModel.deleteOne({ genre: genreKey });

            if (result.deletedCount === 0) {
                // No document was deleted, genre not found
                return {
                    success : false,
                    message : 'Document not found',
                }
            } else {
                return {
                    success : true,
                    message : 'Genre deleted successfully',
                }
            }
                        
        } else {
            // Genre does not exist
            return {
                success: false,
                message: 'Genre does not exist',
            }
        }
    }catch(err){
        console.error('Error deleting genre: ', err);

        throw new MoviesError('Error deleting genre: '); 
    }
}

export const addNewGenre = async (genreKey: string, movies: Movie[]) : Promise<movieResponse | void> => {
    try {
        const genres = await getAllGenres();
        
        if (!genres?.includes(genreKey)) {

            // Genre does not exist, 
            const genre = new GenreModel({
                genre : genreKey,
                movies: movies,
            });

            // Save it to mongodb
            const result = await genre.save();

            return {
                success : true,
                message: 'Genre saved successfully',
            };
           
        } else {
            // Genre already exists, handle accordingly
            return { 
                success: false, 
                message: 'Genre already exists',
            };
        }
    } catch (error : any ) {
        throw new MoviesError(error); 
    }
}

export const addMoviesbyGenre = async (genreKey: string, movies: Movie[]): Promise<movieResponse> => {
    try {
        const genres = await getAllGenres();

        if (genres?.includes(genreKey)) {
            // Genre exists, check if movies already exist for this genre
            const existingMovies = await GenreModel.findOne({ genre: genreKey, 'movies.name': { $in: movies.map(movie => movie.name) } });

            if (!existingMovies) {
                // Movies don't exist, add them to the database
                await GenreModel.updateOne({ genre: genreKey }, { $push: { movies: { $each: movies } } });

                return { 
                    success: true, 
                    message: 'Movies added successfully' 
                };

            } else {
                // Movies already exist, handle accordingly
                return { 
                    success: false, 
                    message: 'Movies already exist for this genre' 
                };
            }
        } else {
            // Genre does not exist, handle accordingly
            return { 
                success: false, 
                message: 'Genre does not exist'
            };
        }
    } catch (error) {
        console.error('Error adding movies by genre:', error);

        throw new MoviesError('Error adding movies by genre: '); 
    }
};
