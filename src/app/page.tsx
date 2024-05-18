"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (name) {
      localStorage.setItem("userName", name);
      router.push("/class-selection");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl mb-4">Witaj w naszej gierce!</h1>
      <input
        type="text"
        placeholder="Podaj swoje imię"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 text-black"
      />
      <button onClick={handleSubmit} className="p-2 bg-blue-500 rounded">
        Rozpocznij przygodę
      </button>
    </main>
  );
}
