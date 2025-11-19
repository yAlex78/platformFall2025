"use client";

import styles from "./taskcard.module.scss";
import { deleteTodo } from "@/app/(util)/deleteTodo"; 
import { updateTodo } from "@/app/(util)/updateTodo"; 

interface Todo {
  _id: string;
  title: string;
  desc: string;
  dueDate: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  refresh: () => void;
}

export default function TaskCard({ todo, refresh }: Props) {
    async function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
        await updateTodo(todo._id, { 
          title: todo.title,
          desc: todo.desc,
          dueDate: todo.dueDate,
          completed: e.target.checked 
        });
        refresh();
    }
    
    async function handleDelete() {
        await deleteTodo(todo._id);
        refresh();
    }
    
    return (
      <div className={styles.card}>
        <div className={styles.left}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleCheck}
          />
          <div className={styles.todoInfo}>
            <h3>{todo.title}</h3>
                    <p>{todo.desc}</p>
                    <span className={styles.date}>{todo.dueDate}</span>
          </div>
          </div>
            <div className={styles.icons}>
                <button className={styles.edit}>Edit Todo</button>
                <button className={styles.delete} onClick={handleDelete}>Delete Todo</button>
          </div>
      </div>
    );
}