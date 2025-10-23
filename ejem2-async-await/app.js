import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const movies = db.collection('movies');

async function insertDemoMovie() {
    await movies.insertOne({
        title: "Back to the Future",
        year: 1985
    });
}

async function findDemoMovie(){
    return await movies.findOne({ title: "Back to the Future" });
}

await insertDemoMovie();
const movie = await findDemoMovie();
console.log(movie);

client.close();