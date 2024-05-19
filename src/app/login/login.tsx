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
        setChatLines([
          `${user.name} witamy na naszym wydziale! Tutaj wszystko jest możliwe. Możesz zostać kim tylko chcesz!`,
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
      {!loggedIn ? (
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-black">Zaloguj się</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="rounded p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="rounded p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="rounded bg-blue-500 text-white py-3 mt-4 hover:bg-blue-600 transition-colors"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <Chatbox
          chatLines={chatLines}
          showTitle={false}
          setIsChatboxComplete={setIsChatboxComplete}
        />
      )}
    </main>
  );
}