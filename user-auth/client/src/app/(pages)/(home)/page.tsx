"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (!token) {
      router.replace("/log-in");
    }
  }, [router]);
  return <div className={styles.page}>hello world</div>;
}
