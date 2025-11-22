"use client";

import React, { useState } from "react";
import styles from "./edittaskform.module.scss";
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
    onClose: () => void;
    refresh: () => void;
}

export default function EditTaskForm({ todo, onClose, refresh }: Props) {
    const [title, setTitle] = useState(todo.title);
    const [desc, setDesc] = useState(todo.desc);
    const [dueDate, setDueDate] = useState(todo.dueDate);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await updateTodo(todo._id, {
                title,
                desc,
                dueDate,
                completed: todo.completed,
            });
            refresh();
            onClose();
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.card} onClick={(e) => e.stopPropagation()}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>Edit Task</h2>

                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />

                    <label>Due Date</label>
                    <input 
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <div className={styles.buttonContainer}>
                        <button 
                            type="button"
                            className={styles.cancel}
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit" className={styles.submit}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}