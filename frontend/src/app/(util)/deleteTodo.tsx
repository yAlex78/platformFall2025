import Cookies from "js-cookie";

export async function deleteTodo(id: string) {
  const token = Cookies.get("auth_token");
  
  await fetch(`http://localhost:3000/todos/${id}`, { 
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
}