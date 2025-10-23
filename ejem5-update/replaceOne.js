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

let newCustomer = {
    name: "Pepito Perezito",
    age: 37,
    country: 'Spanistan'
}

let updateResult = await customers.replaceOne({ _id: new ObjectId(idAsString) }, newCustomer);

if(updateResult.matchedCount == 0){
    console.log(`No document found with id ${idAsString}`);
} else {
    if(updateResult.modifiedCount == 0){
        console.log(`No document modified`);
    } else {
        console.log(`Document updated`);
    }
}

client.close();