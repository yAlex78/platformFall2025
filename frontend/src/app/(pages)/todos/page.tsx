"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function refresh() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      router.push("/login");
    }
  }

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    refresh().finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }
  
  const completedTodos = todos.filter((todo) => todo.completed);
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>My Todo List</h1>
        <button className={styles.logout} onClick={handleLogout}>
          Log Out
        </button>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          <h2>All Tasks</h2>
          <div className={styles.section}>COMPLETED ({completedTodos.length})</div>
          <div>
            {completedTodos.length ? (
              completedTodos.map((todo) => (
                <TaskCard key={todo._id} todo={todo} refresh={refresh} />
              ))
            ) : (
              <p>No completed tasks</p>
            )}
          </div>

          <div className={styles.section}>INCOMPLETE ({incompleteTodos.length})</div>

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
    </div>
  );
}