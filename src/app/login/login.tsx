"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSharedState } from "../context";
import Chatbox from "~/app/Chatbox";

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
  const { setUserId, database, setDatabase } = useSharedState();

  const [loggedIn, setLoggedIn] = useState(false);
  const [chatLines, setChatLines] = useState([""]);
  const [isChatboxComplete, setIsChatboxComplete] = useState(false);

  useEffect(() => {
    if (isChatboxComplete) {
      router.push("/class");
    }
  }, [isChatboxComplete]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = { name: username, email, classId: 7 };
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
            setUserId(data.id);
            const newDb = database;
            newDb.users.push({ ...user, id: data.id });
            setDatabase(newDb);
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
        // alert("User created successfully");
        setChatLines([
          user.name +
            " witamy na naszym wydziale!\n Tutaj wszystko jest możliwe. Możesz zostać kim tylko chcesz!\n",
        ]);
        setLoggedIn(true);
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
      {!loggedIn && (
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
            <button className="rounded bg-blue-500" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
      {loggedIn && (
        <Chatbox
          chatLines={chatLines}
          showTitle={false}
          setIsChatboxComplete={setIsChatboxComplete}
        ></Chatbox>
      )}
    </main>
  );
}
