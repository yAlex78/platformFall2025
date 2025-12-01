import { MongoClient, ObjectId } from "mongodb"

/**
 * Get all todos for a specific user from the database
 * @param client: The MongoClient object
 * @param userId: The ID of the user whose todos to retrieve
 * @returns: An array of todos belonging to the user
 */
export async function getAllTodos(client: MongoClient, userId: string) {
    const collection = client.db("todos").collection("todos");
    const todos = await collection.find({ userId: new ObjectId(userId) }).toArray();
    return todos;
}

/**
 * Get a specific todo from the database
 * @param client: The MongoClient object
 * @param id: ID of the todo to get
 * @param userId: ID of the user (to verify ownership)
 * @returns: An object representing the todo
 */
export async function getTodo(client: MongoClient, id: string, userId: string) {
    const todo = await client.db("todos").collection("todos").findOne({ 
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
    });
    return todo;
}

/**
 * Create a new todo in the database.
 * @param client: The MongoClient object.
 * @param userId: The ID of the user creating the todo.
 * @param title: The title of the new todo.
 * @param desc: The description of the new todo.
 * @param dueDate: The due date of the new todo.
 * @param completed: The completion status of the new todo.
 * @returns The newly created todo's id.
 */
export async function createTodo(
    client: MongoClient, 
    userId: string,
    title: string, 
    desc: string, 
    dueDate: string, 
    completed: boolean
) {
    const myDB = client.db("todos");
    const myColl = myDB.collection("todos");
    const doc = { 
        userId: new ObjectId(userId),
        title, 
        desc, 
        dueDate, 
        completed 
    };
    const result = await myColl.insertOne(doc);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );
    return result.insertedId;
}

/**
 * Delete a single todo from the database.
 * @param client: The MongoClient object.
 * @param id: Represents the ID of the todo to delete.
 * @param userId: ID of the user (to verify ownership)
 */
export async function deleteTodo(client: MongoClient, id: string, userId: string) {
    const myDB = client.db("todos");
    const myColl = myDB.collection("todos");
    // Only delete if the todo belongs to the user
    const filter = { 
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
    };
    const deleteResult = await myColl.deleteOne(filter);
    return deleteResult;
}

/**
 * Update a todo in the database.
 * @param client: The MongoClient object.
 * @param id: Represents the ID of the todo to update.
 * @param userId: ID of the user (to verify ownership)
 * @param title: New title of the todo to update.
 * @param desc: New description of the todo to update.
 * @param dueDate: New due date of the todo to update.
 * @param completed: New completion status of the todo to update.
 */
export async function updateTodo(
    client: MongoClient, 
    id: string, 
    userId: string,
    title: string, 
    desc: string, 
    dueDate: string, 
    completed: boolean
) {
    const myDB = client.db("todos");
    const myColl = myDB.collection("todos");
    const filter = { 
        _id: new ObjectId(id),
        userId: new ObjectId(userId)
    };
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