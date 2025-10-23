import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const movies = db.collection('movies');

await movies.insertOne({
    title: "Back to the Future",
    year: 1985
});

const movie = await movies.findOne({ title: "Back to the Future" });

console.log(movie);

client.close();