import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const customers = db.collection('customers');


let customer = {
    name: "Pepe Pérez",
    age: 37,
    country: 'Spain'
}

await customers.deleteMany();

let result = await customers.insertOne(customer);

let idAsString = result.insertedId.toString();

console.log(idAsString);

let customerFromMongo = await customers.findOne({ _id: new ObjectId(idAsString) });

console.log(customerFromMongo);

client.close();