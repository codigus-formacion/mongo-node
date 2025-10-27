import { MongoClient } from 'mongodb';
import { readFile } from 'fs/promises';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('shop');

const customers = db.collection('customers');

// Clean database
await customers.deleteMany();

let dataFileName = 'customers.json';
let currentSourceFilePath = import.meta.url;
let absoluteDataFilePath = new URL(dataFileName, currentSourceFilePath);

const customersAsString = await readFile(absoluteDataFilePath, 'utf8');

const customersAsObjects = JSON.parse(customersAsString);

await customers.insertMany(customersAsObjects);

let customersCount = await customers.countDocuments();

console.log(`${customersCount} customers inserted in database`);

client.close();