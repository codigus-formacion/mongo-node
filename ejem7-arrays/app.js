import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('tasks_manager');
const users = db.collection('users');

await users.deleteMany();

const newUser = {
    name: "Juan",
    tasks: []
}

// Step 1 - Insert new user

let result = await users.insertOne(newUser);

let userId = result.insertedId.toString();

console.log(`User created with id ${userId}`);

// Step 2 - Insert tasks in the user task field (array)

const newTasks = [
    { id: new ObjectId(), title: "Learn JavaScript", done: true },
    { id: new ObjectId(), title: "Learn MongoDB", done: false },
    { id: new ObjectId(), title: "Learn Express", done: false }
];

for (let i = 0; i < newTasks.length; i++) {

    let newTask = newTasks[i];

    await users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { tasks: newTask } }
    );

    console.log(`Task inserted with id ${newTask.id}`);
}

// Step 3 - Set a specific task to done: true;

let mongoTaskId = newTasks[1].id.toString();

await users.updateOne(
    { _id: new ObjectId(userId) },
    {
        $set: {
            "tasks.$[task].done": true
        }
    },
    {
        arrayFilters: [{ "task.id": new ObjectId(mongoTaskId) }]
    }
);
console.log(`Updated task: ${mongoTaskId}`);

// Step 4 - Remove a specific task

let expressTaskId = newTasks[2].id.toString();

await users.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { tasks: { id: new ObjectId(expressTaskId) } } }
);
console.log(`Deleted task: ${expressTaskId}`);

// Step 5 - Show final user

const finalUser = await users.findOne({ _id: new ObjectId(userId) });

console.log("Usuario final:");
console.log(finalUser);

await client.close();
