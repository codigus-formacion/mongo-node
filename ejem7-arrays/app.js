import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://localhost:27017');

const db = client.db('tasks_manager');
const users = db.collection('users');

await users.deleteMany();

const newUser = {
    name: "Juan",
    tasks: [
        { _id: new ObjectId(), title: "Learn JavaScript", done: true }
    ]
}

// Step 1 - Insert new user

let result = await users.insertOne(newUser);

let userId = result.insertedId.toString();

console.log(`User created with id ${newUser._id}`);
console.log(`Task created with id ${newUser.tasks[0].id}`);
console.log(newUser);

// Step 2 - Insert more tasks in the task array

const newTasks = [
    { _id: new ObjectId(), title: "Learn MongoDB", done: false },
    { _id: new ObjectId(), title: "Learn Express", done: false }
];

for (let i = 0; i < newTasks.length; i++) {

    let newTask = newTasks[i];

    await users.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { tasks: newTask } }
    );

    console.log(`Task inserted with id ${newTask._id}`);
}

let user = await users.findOne({ _id: new ObjectId(userId) });
console.log('Updated user');
console.log(user);

let javaScriptTaskId = user.tasks[0]._id.toString();
let mongoTaskId = user.tasks[1]._id.toString();
let expressTaskId = user.tasks[2]._id.toString();

// Step 3 - Set a specific task to done: true;

await users.updateOne(
    { _id: new ObjectId(userId), "tasks._id": new ObjectId(mongoTaskId) },
    {  $set: { "tasks.$.done": true } }
);
console.log(`Updated task: ${mongoTaskId}`);

// Step 4 - Replace a task

let newTask = { _id: javaScriptTaskId, title: "Learn Pascal", done: true };

await users.updateOne(
    { _id: new ObjectId(userId), "tasks._id": new ObjectId(javaScriptTaskId) },
    {  $set: { "tasks.$": newTask } }
);
console.log(`Replaced task: ${javaScriptTaskId}`);

// Step 5 - Find a specific task

const userWithTask = await users.findOne(
    { _id: new ObjectId(userId) },
    { projection: { tasks: { $elemMatch: { _id: new ObjectId(mongoTaskId) } } } }
);

let mongoTask = userWithTask.tasks[0];

console.log('Mongo task: ');
console.log(mongoTask);

// Step 6 - Remove a specific task

await users.updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { tasks: { _id: new ObjectId(expressTaskId) } } }
);
console.log(`Deleted task: ${expressTaskId}`);

// Step 7 - Show final user

user = await users.findOne({ _id: new ObjectId(userId) });

console.log("Updated user:");
console.log(user);

await client.close();
