import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');

async function insertOneExamples() {

    const movies = db.collection('movies');

    // Insert one

    let result = await movies.insertOne({
        title: "Back to the Future",
        year: 1985
    });

    console.log(`Inserted id: ${result.insertedId}`);

    let movie = {
        title: "The Goonies",
        year: 1985
    }

    await movies.insertOne(movie);

    console.log(`Inserted id: ${movie._id}`);

}

async function insertManyExamples() {

    const customers = db.collection('customers');

    const result = await customers.insertMany([
        { firstName: 'Jack', lastName: 'Bauer' },
        { firstName: 'Juan', lastName: 'Pérez' }
    ]);

    console.log('Customers inserted with ids:', result.insertedIds);

}

await insertOneExamples();
await insertManyExamples();

client.close();