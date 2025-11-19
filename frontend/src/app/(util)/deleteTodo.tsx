export async function deleteTodo(id: string) {
  await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" });
}