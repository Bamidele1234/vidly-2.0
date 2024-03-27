import request from 'supertest';
import app from '../../src/index';
import { PORT } from '../../src/utils/config';
import { closeDbConnection, openDbConnection } from '../../src/utils/db';
import logger from '../../src/utils/logger';
import { seedData } from '../../seeddata';
import GenreModel from '../../src/models/genre';

describe('/api/genres', () => {
    
    let server: any;

    beforeAll(async () => {
        await openDbConnection();
        server = app.listen(PORT, () => logger.info(`Test: Listening on port ${PORT}...`));
    });
  
    afterAll((done) => {
        server.close(async () => {
            await closeDbConnection().then(() => done()).catch(done);
        });
    });

    const addSeedData = async() : Promise<number> => {
        await GenreModel.deleteMany({});

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

            const res = await request(server).get('/api/genres');

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

});
