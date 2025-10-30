import { MongoClient } from 'mongodb';
import { readFile } from 'node:fs/promises';

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('cinema');
const movies = db.collection('movies');
movies.createIndex({ title: 'text' });

async function loadMoviesIntoDB() {

    const moviesAsString = await readFile(new URL('movies.json', import.meta.url), 'utf8');

    await movies.deleteMany();

    await movies.insertMany(JSON.parse(moviesAsString));
}

async function showTitleYear80to90() {
    const result = await movies
        .find({ $and: [{ year: { $gte: 1980 } }, { year: { $lte: 1989 } }] })
        .project({ _id: 0, title: 1, year: 1 }).toArray();

    console.log('Movies from 80s:');
    console.log(result);
}

async function showStarWars() {

    const result = await movies.find({ $text: { $search: '"Start Wars' } }).toArray();

    console.log('Start Wars movies:');
    console.log(result);
}

async function show5MostRecent() {

    const result = await movies.find()
        .limit(5)
        .sort({ year: -1 })
        .project({ title: 1, year: 1, _id: 0 })
        .toArray();

    console.log('5 most recent movies:');
    console.log(result);

}

async function showTitleRomanceAndLove() {

    const result = await movies
        .find({ $or: [{ title: { $regex: "love" } }, { genre: "Romance" }] })
        .project({ title: 1, genre: 1, _id: 0 })
        .toArray();

    console.log('Romance and love movies:');
    console.log(result);
}

async function main() {

    await loadMoviesIntoDB();

    await showTitleYear80to90();
    await showStarWars();
    await show5MostRecent();
    await showTitleRomanceAndLove();

    client.close();
}

await main();