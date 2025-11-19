export async function getTodos() {
  const res = await fetch("http://localhost:3000/todos", { cache: "no-store" });
  const json = await res.json();
  return json.data;
}