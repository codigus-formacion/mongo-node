import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const customers = db.collection('customers');


// Insert sample data

let customersData = [
    {
        name: "Pepe Pérez",
        age: 37,
        country: 'Spain'
    },
    {
        name: "Victoria Ramos",
        dni: "04897481L",
        gender: 'female'
    },
    {
        name: "Carlos Pérez",
        gender: 'male',
        dni: "04897481L",
        country: 'Spain'
    },
    {
        name: "Javier Ramos",
        dni: "04496471L",
        age: 15,
        country: 'England'
    }
];

await customers.deleteMany();
await customers.insertMany(customersData);

//https://www.mongodb.com/docs/drivers/node/current/crud/query/cursor/#std-label-node-access-cursor

// Process a document at a time

const resultCursor = customers.find();

for await (const doc of resultCursor) {
    console.log(doc);
}

// Load all documents in memory

const resultArray = await customers.find().toArray();

console.log(resultArray);



client.close();