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