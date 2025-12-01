import Cookies from "js-cookie";

export async function getTodos() {
  const token = Cookies.get("auth_token");
  
  const res = await fetch("http://localhost:3000/todos", { 
    cache: "no-store",
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  });
  
  const json = await res.json();
  return json.data;
}