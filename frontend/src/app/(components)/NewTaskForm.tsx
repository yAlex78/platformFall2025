"use client";

import { useState } from "react";
import styles from "./newtaskform.module.scss";
import { createTodo } from "@/app/(util)/addTodo";

interface Props {
  refresh: () => void;
}

export default function NewTaskForm({ refresh }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    
    console.log("Submitting new task");
    console.log("Form values:", { title, desc, dueDate, completed });

    try {
      await createTodo({ title, desc, dueDate, completed });
      console.log("Todo created successfully!");

      setTitle("");
      setDesc("");
      setDueDate("");
      setCompleted(false);

      console.log("Refreshing task list");
      refresh();
    } catch (err) {
      console.error("Error creating todo:", err);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>New Task</h2>

      <label>Title</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description</label>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />

      <label>Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <label className={styles.check}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Mark as completed
      </label>

      <button className={styles.create}>Create Task</button>
    </form>
  );
}
