import mongoose, { Schema, Document } from 'mongoose';


export interface Movie {
    name: string;
    year: number;
}

interface Genre extends Document {
    genre: string;
    movies: Movie[];
}

const movieSchema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
});

const genreSchema = new Schema<Genre>({
    genre: { type: String, required: true, minlength: 3, maxlength: 20 },
    movies: [{ type: movieSchema }],
});

const GenreModel = mongoose.model<Genre>('Genre', genreSchema);

export default GenreModel;

