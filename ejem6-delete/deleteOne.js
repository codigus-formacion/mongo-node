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

let id = result.insertedId.toString();

console.log(id);

//https://www.mongodb.com/docs/drivers/node/current/crud/delete/

let deleteResult = await customers.deleteOne({ _id: new ObjectId(id) });

if(deleteResult.deletedCount == 0){
    console.log(`No document found with id ${id}`);
} else {
    console.log(`Document deleted`);
}

client.close();