export class MoviesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MoviesError';
    }
}

export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DatabaseError';
    }
}