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

//https://www.mongodb.com/docs/drivers/node/current/crud/query/count/

// All

const numCustomers = await customers.countDocuments();

console.log(`Num customers: ${numCustomers} `);

// Under 18

const numCustomersUnder18 = await customers.countDocuments({ age: { $lt: 18 }});

console.log(`Num customers under 18: ${numCustomersUnder18} `);


client.close();