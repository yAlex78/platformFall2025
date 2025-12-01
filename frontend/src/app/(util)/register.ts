/**
 * Register a new user
 * @param username User's desired username
 * @param password User's desired password
 * @returns Response data
 */
 export default async function register(username: string, password: string) {
    const registerUrl = "http://localhost:3000/register";
    console.log("sending request to ", registerUrl);

    const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result", result);
    return result;
}