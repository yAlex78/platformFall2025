"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = Cookies.get("auth_token");
    
    if (token) {
      // If authenticated, go to todos
      router.push("/todos");
    } else {
      // If not authenticated, go to login
      router.push("/login");
    }
  }, [router]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <p>Redirecting...</p>
    </div>
  );
}