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

//https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/

//Load only name property
const resultCursor = customers.find().project({ _id: 0, name: 1});

for await (const doc of resultCursor) {
    console.log(doc);
}


client.close();