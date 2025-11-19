export async function createTodo(todo: {
  title: string;
  desc: string;
  dueDate: string;
  completed: boolean;
}) {
  console.log("Sending POST to /todos with:", todo);
  
    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });

      console.log("Server response status:", res.status);

      if (!res.ok) {
        console.error(
          "Server returned an error response:",
          await res.text(),
        );
        throw new Error("Failed to create todo");
      }

      console.log("Todo successfully stored");
      return res;
    } catch (error) {
      console.error("Network/fetch error:", error);
      throw error;
    }
}
