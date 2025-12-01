import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

/**
 * Get all users from the database
 * @param client: The MongoClient object
 * @returns An array containing all users in the database.
 */
export async function getAllUsers(client: MongoClient) {
    const users = client.db("todo_users").collection("users").find();
    return users.toArray();
}

/**
 * Get a user by their ID
 * @param client: The MongoClient object
 * @param id: User ID of the user to get
 * @returns An object representing the user.
 */
export async function getUserById(client: MongoClient, id: string) {
    const user = await client.db("todo_users").collection("users").findOne({ _id: new ObjectId(id)});
    return user;
}

/**
 * Get a user by their username
 * @param client: The MongoClient object
 * @param username: Username of the user to get
 * @returns An object representing the user.
 */
export async function getUserByUsername(client: MongoClient, username: string) {
    const user = await client.db("todo_users").collection("users").findOne({ username });
    return user;
}

/**
 * Create a new user in the database.
 * @param client: The MongoClient object
 * @param username: The username of the new user.
 * @param password: The password of the new user (will be hashed).
 * @returns The newly created user's id.
 */
export async function createUser(client: MongoClient, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.db("todo_users").collection("users").insertOne({ 
        username, 
        password: hashedPassword 
    });
    console.log(
        `A user was inserted with the _id: ${user.insertedId}`,
    );
    return user.insertedId;
}