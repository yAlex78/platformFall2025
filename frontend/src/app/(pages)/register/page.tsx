"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import register from "@/app/(util)/register";
import logIn from "@/app/(util)/logIn";
import Link from "next/link";
import styles from "./page.module.scss";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(username, password);
      
      await logIn(username, password);
      
      router.push("/todos");
    } catch (err) {
      setError("Registration failed. Username may already be taken.");
      console.error("Registration error:", err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Account</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Register
          </button>
        </form>

        <p className={styles.link}>
          Already have an account? <Link href="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}