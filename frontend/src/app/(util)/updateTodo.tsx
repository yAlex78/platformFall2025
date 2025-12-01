import Cookies from "js-cookie";

export async function updateTodo(id: string, data: any) {
    const token = Cookies.get("auth_token");
    
    await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
}