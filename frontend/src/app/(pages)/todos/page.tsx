"use client";

import { useEffect, useState } from "react";
import TaskCard from "@/app/(components)/TaskCard";
import NewTaskForm from "@/app/(components)/NewTaskForm";
import { getTodos } from "@/app/(util)/getTodo";
import styles from "./page.module.scss";

export interface Todo {
  _id: string;
  title: string;
  desc: string;
  dueDate: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);

  async function refresh() {
    const data = await getTodos();
    setTodos(data);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>All Tasks</h2>
        <p className={styles.section}>COMPLETED</p>

        <div className={styles.section}>INCOMPLETE</div>

        {todos.map((todo) => (
          <TaskCard key={todo._id} todo={todo} refresh={refresh} />
        ))}
      </div>

      <div className={styles.right}>
        <NewTaskForm refresh={refresh} />
      </div>
    </div>
  );
}