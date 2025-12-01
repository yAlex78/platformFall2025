import Cookies from "js-cookie";

/**
 * Try to log in and store auth token as cookie
 * @param username User's username
 * @param password User's password
 * @returns Response data with token
 */
export default async function logIn(username: string, password: string) {
    const loginUrl = "http://localhost:3000/log-in";
    console.log("sending request to ", loginUrl);

    const response = await fetch(loginUrl, {
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
    
    Cookies.set("auth_token", result.token, { expires: 7, path: "/" });
    return result;
}