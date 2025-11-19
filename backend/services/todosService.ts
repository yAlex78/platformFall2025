import { MongoClient, ObjectId } from "mongodb"


/**
 * Get a todo from the database
 * @param client: The MongoClient object
 * @param id: ID of the todo to get
 * @returns: An object representing the todo
 */
export async function getTodo(client: MongoClient, id: string) {
    const todo = await client.db("todos").collection("todos").findOne({ _id: new ObjectId(id)});
    return todo;
}

/**
 * Get a todo from the database
 * @param client: The MongoClient object
 * @param id: ID of the todo to get
 * @returns: An object representing the todo
 */
export async function getAllTodos(client: MongoClient) {
    const collection = client.db("todos").collection("todos");
    const todos = await collection.find({}).toArray();
    return todos;
}

/**
 * Create a new todo in the database.
 * @param client: The MongoClient object.
 * @param title: The title of the new todo.
 * @param desc: The description of the new todo.
 * @param dueDate: The due date of the new todo.
 * @param completed: The completion status of the new todo.
 * @returns The newly created todo's id.
 */
 export async function createTodo(client: MongoClient, title: string, desc: string, dueDate: string, completed: boolean) {
    const myDB = client.db("todos");
    const myColl = myDB.collection("todos");
    const doc = { title, desc, dueDate, completed };
    const result = await myColl.insertOne(doc);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId;
}

/**
 * Delete a single todo from the database.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the todo to delete.
 */
 export async function deleteTodo(client: MongoClient, id: string) {
    const myDB = client.db("todos");
    const myColl = myDB.collection("todos");
    const filter = { _id: new ObjectId(id) };
    const deleteResult = await myColl.deleteOne(filter);
    return deleteResult;
}

/**
 * Update a todo in the database.
 * @param client: The MongoClient object.
 * @param id Represents the ID of the todo to update.
 * @param title New title of the todo to update.
 * @param desc New description of the todo to update.
 * @param dueDate New due date of the todo to update.
 * @param completed New completion status of the todo to update.
 */
 export async function updateTodo(client: MongoClient, id: string, title: string, desc: string, dueDate: string, completed: boolean) {
    const myDB = client.db("todos");
    const myColl = myDB.collection("todos");
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: {
            title, 
            desc, 
            dueDate, 
            completed
        },
    };
    const result = await myColl.updateOne(filter, updateDoc);
    return result;
}