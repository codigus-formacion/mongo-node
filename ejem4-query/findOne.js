import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const customers = db.collection('customers');


let newCustomer = {
    name: "Pepe Pérez",
    age: 37,
    country: 'Spain'
}

await customers.deleteMany();

let result = await customers.insertOne(newCustomer);

let id = result.insertedId.toString();

console.log(id);

let customer = await customers.findOne({ _id: new ObjectId(id) });

console.log(customer);

client.close();