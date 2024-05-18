"use client"

import { useState } from "react";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await db.insert(users).values({ name: username, email })
            .then((result) => {
                const userId = result.oid;
                console.log("User ID:", userId);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
            });
        

        setUsername("");
        setEmail("");
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}