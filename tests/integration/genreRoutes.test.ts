import request from 'supertest';
import app from '../../src/index';
import { PORT } from '../../src/utils/config';
import { closeDbConnection, openDbConnection } from '../../src/utils/db';
import logger from '../../src/utils/logger';
import { seedData } from '../../seeddata';
import GenreModel from '../../src/models/genre';

describe('/api/genres', () => {
    
    let server: any;

    const baseUrl = '/api/genres';

    const mockMovies = {
        "movies": [
            {
                "name": "Bamidele Ajewole",
                "year": "2004"
            }
        ]
    }

    beforeAll(async () => {
        await openDbConnection();

        await GenreModel.deleteMany({});

        server = app.listen(PORT, () => logger.info(`Test: Listening on port ${PORT}...`));
    });
  
    afterAll((done) => {
        server.close(async () => {
            await closeDbConnection().then(() => done()).catch(done);
        });
    });

    const addSeedData = async() : Promise<number> => {
        const keys =  Object.keys(seedData);
        
        // Insert new data
        for (const genreName of keys) {
            const movies = seedData[genreName];
            await GenreModel.create({ genre: genreName, movies });
        }

        return keys.length;
    }

    describe('GET /', () => {
        it('should check the get request', async () => {
            const dataLength = await addSeedData(); 

            const res = await request(server).get(baseUrl);

            expect(res.status).toBe(200); 

            // Loop through each key-value pair in the seedData object
            Object.entries(seedData).forEach(([g, movies]) => {

                // Check that each value is an array
                expect(Array.isArray(movies)).toBe(true);

                // Check that each item in the array is an object of type Movie
                movies.forEach((movie) => {
                    expect(typeof movie).toBe('object');
                    expect(movie).toHaveProperty('name');
                    expect(movie).toHaveProperty('year');
                });
            });

            logger.info(`The length is ${dataLength}`);
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            
            const genre = await GenreModel.create({ genre: 'Melody', movies: [] });
            const validId = genre._id;
            
            // Make the Request
            const res = await request(server).get(`${baseUrl}/${validId}`);
    
            // Assert the Response
            expect(res.status).toBe(200);

            expect(res.body).toHaveProperty('genre', genre.genre);
        });


        it('should return 404 if invalid ID is passed', async () => {
            // Make the Request
            const res = await request(server).get(`${baseUrl}/1`);
    
            // Assert the Response
            expect(res.status).toBe(404);
        });

    });

    describe('POST /', () => {
        it('should return 200', async () => {
            const res = await request(server)
                .post(`${baseUrl}/add`)
                .send({
                    "genre": "dele004", ...mockMovies
                }
                );

            expect(res.status).toBe(200);
        })       
        
        it('should return 400 if the request body is not structured well', async () => {
            const res = await request(server)
                .post(`${baseUrl}/add`)
                .send({
                    "genre" : "qqq", ...mockMovies        
                });

            expect(res.status).toBe(400);
        })       
    });

});
