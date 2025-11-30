"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import logIn from "@/app/(util)/logIn";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await logIn(usernameInput, passwordInput);
      router.push("/secret");
    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div className={styles.page}>
      <h1>Log In</h1>
      <div>
        <label>Username</label>
        <input
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          value={passwordInput}
          onChange={(e) => {
            setPasswordInput(e.target.value);
          }}
        />
      </div>
      <button onClick={handleLogin}>Log In</button>
      <button
        onClick={() => {
          console.log(Cookies.get("auth_token"));
        }}
      >
        Check token
      </button>
      <Link href="/secret">go to secret page</Link>
    </div>
  );
}
