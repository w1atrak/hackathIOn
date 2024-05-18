"use client";

import { useState } from "react";
import {useRouter} from "next/navigation";

type AddedUser = {
  id: number;
  name: string;
  email: string;
  classId: number;
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = { name: username, email, classId: 5 };
    try {
      const res = await fetch("https://test.nyaaa.me/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        res
          .json()
          .then((data: AddedUser) => {
            localStorage.setItem("userId", `${data.id}`);
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
        alert("User created successfully");
        router.push("/class");
      } else {
        alert("Failed to create user");
      }

      setUsername("");
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <input
          className="rounded p-3"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
          className="rounded p-3"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-500 rounded" type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
