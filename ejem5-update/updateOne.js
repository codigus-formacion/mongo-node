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

let updateResult = await customers.updateOne({ _id: new ObjectId(id) }, { $set: { age: 40 }});

if(updateResult.matchedCount == 0){
    console.log(`No document found with id ${id}`);
} else {
    if(updateResult.modifiedCount == 0){
        console.log(`No document modified`);
    } else {
        console.log(`Document updated`);
    }
}

client.close();