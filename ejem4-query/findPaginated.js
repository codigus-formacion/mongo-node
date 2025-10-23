import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('cinema');
const customers = db.collection('customers');

// Step 1 - Define numElements, pageSize a numPages

let numCustomers = 23;
let pageSize = 5;

let numPages = numCustomers / pageSize;
if(numCustomers % pageSize !== 0){
    numPages++;
}

// Step 2 - Insert sample data

await customers.deleteMany();

for (let i = 0; i < numCustomers; i++) {
    await customers.insertOne({
        name: "Name " + i,
        age: 25 + i
    });
}

//https://www.mongodb.com/docs/manual/reference/method/cursor.skip/#using-cursor-skip


// Step 3 - Query all pages (one by one)


for (let numPage = 1; numPage <= numPages; numPage++) {

    let customersInPage = await customers.find()
        .skip((numPage - 1) * pageSize)
        .limit(pageSize)
        .toArray();

    console.log(`Page ${numPage}:`)
    console.log(customersInPage);

}


client.close();