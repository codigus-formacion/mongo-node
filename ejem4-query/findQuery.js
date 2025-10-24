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

// Show documents using a cursor
async function showResult(title, result) {

    console.log(title);
    for await (const doc of result) {
        console.log(doc);
    }
}

// Query data

async function findAll(){
    
    //https://www.mongodb.com/docs/drivers/node/current/crud/query/retrieve/#finding-documents

    const result = customers.find();
    
    await showResult('All:', result);
}

async function findByAge15(){

    //https://www.mongodb.com/docs/drivers/node/current/crud/query/query-document/#comparison-operators
    
    const result = customers.find({ age: 15});
    
    await showResult('Age 15:', result);
}

async function findByAgeLessThan18(){

    //https://www.mongodb.com/docs/drivers/node/current/crud/query/query-document/#comparison-operators
    
    const result = customers.find({ age: { $lt: 18 }});
    
    await showResult('Age less than 18:', result);
}

async function findByAgeGreaterOrEqualsTo18AndCountrySpain(){

    //https://www.mongodb.com/docs/drivers/node/current/crud/query/query-document/#logical-operators
    
    const result = customers.find({ age: { $gte: 18 }, country: 'Spain'});
    
    await showResult('Age greather or equals to 18 and country "Spain":', result);
}

async function findByGenderFemaleOrCountrySpain(){

    //https://www.mongodb.com/docs/drivers/node/current/crud/query/query-document/#logical-operators
    
        const result = customers.find({ $or: [
            { gender: 'female' }, 
            { country: 'Spain' }
        ]});
    
    await showResult('Gender "female" or country "Spain":', result);
}

async function findByRegexName(){

    //https://www.mongodb.com/docs/manual/reference/operator/query/regex/
    
    const result = customers.find({ name: { $regex: "Pérez" }});
    
    await showResult('Name including "Pérez":', result);
}

// Main script

await findAll();
await findByAge15();
await findByAgeLessThan18();
await findByAgeGreaterOrEqualsTo18AndCountrySpain();
await findByGenderFemaleOrCountrySpain();
await findByRegexName();

client.close();