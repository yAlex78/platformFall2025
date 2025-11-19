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
  
  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  console.log("All todos:", todos);
  console.log("Completed todos:", completedTodos);
  console.log("Incomplete todos:", incompleteTodos);
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>All Tasks</h2>
        <div className={styles.section}>COMPLETED</div>
        <div>
          {completedTodos.length ? (
            completedTodos.map((todo) => (
              <TaskCard key={todo._id} todo={todo} refresh={refresh} />
            ))
          ) : (
            <p>No completed tasks</p>
          )}
        </div>

        <div className={styles.section}>INCOMPLETE</div>

        <div>
          {incompleteTodos.length ? (
            incompleteTodos.map((todo) => (
              <TaskCard key={todo._id} todo={todo} refresh={refresh} />
            ))
          ) : (
            <p>No incomplete tasks</p>
          )}
        </div>
      </div>

      <div className={styles.right}>
        <NewTaskForm refresh={refresh} />
      </div>
    </div>
  );
}