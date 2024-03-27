// seedData.ts

import { Movie } from './src/models/genre'; // Adjust the import path based on your project structure

const seedData: Record<string, Movie[]> = {
    action: [
        { name: 'Die Hard', year: 1988 },
        { name: 'Mad Max: Fury Road', year: 2015 },
        // Add more action movies
    ],
    drama: [
        { name: 'The Shawshank Redemption', year: 1994 },
        { name: 'Forrest Gump', year: 1994 },
        // Add more drama movies
    ],
    comedy: [
        { name: 'Dumb and Dumber', year: 1994 },
        { name: 'Superbad', year: 2007 },
        // Add more comedy movies
    ],
    sciFi: [
        { name: 'Blade Runner', year: 1982 },
        { name: 'The Matrix', year: 1999 },
        // Add more sci-fi movies
    ],
    adventure: [
        { name: 'Indiana Jones: Raiders of the Lost Ark', year: 1981 },
        { name: 'Jurassic Park', year: 1993 },
        // Add more adventure movies
    ],
    horror: [
        { name: 'The Shining', year: 1980 },
        { name: 'Get Out', year: 2017 },
        // Add more horror movies
    ],
    romance: [
        { name: 'The Notebook', year: 2004 },
        { name: 'Pride and Prejudice', year: 2005 },
        // Add more romance movies
    ],
    documentary: [
        { name: 'March of the Penguins', year: 2005 },
        { name: 'An Inconvenient Truth', year: 2006 },
        // Add more documentary movies
    ],
}

// async function seedDatabase() {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(CONNECTION_URI);
    
//         console.log('Connected to MongoDB');
    
//         // Clear existing data
//         await GenreModel.deleteMany({});
    
//         // Insert new data
//         for (const genreName of Object.keys(seedData)) {
//             const movies = seedData[genreName];
//             await GenreModel.create({ genre: genreName, movies });
//         }
    
//         console.log('Data seeded successfully');
//     } catch (error) {
//         console.error('Error seeding database:', error);
//     } finally {
//         // Disconnect from MongoDB
//         await mongoose.disconnect();
//         console.log('Disconnected from MongoDB');
//     }
// }

//seedDatabase();



export { seedData };
