import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const customers = db.collection('customers');

//Create index if not already created
await customers.createIndex({ name: 'text' });

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

// Show documents using a cursor
async function showResult(title, result) {

    console.log(title);
    for await (const doc of result) {
        console.log(doc);
    }
}

async function findTextSearch(){
    
    //https://www.mongodb.com/docs/drivers/node/current/crud/query/text/

    let searchBar = "ramo";
    
    const result = customers.find({ $text: { $search: searchBar } })
        .sort({ score: { $meta: "textScore" } });
    
    await showResult('All:', result);
}

// Main script

await findTextSearch();

client.close();