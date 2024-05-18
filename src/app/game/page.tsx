"use client";

import { useEffect, useState } from "react";

export default function GameScreen() {
  const [userName, setUserName] = useState("");
  const [userClass, setUserClass] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const userClass = localStorage.getItem("userClass");
    setUserName(name ?? "");
    setUserClass(userClass ?? "");
  }, []);

  const handleScanCode = (pointsEarned: number) => {
    setPoints(points + pointsEarned);
    // Zaktualizuj punkty użytkownika w bazie danych
  };

  return (
    <main className="flex min-h-screen flex-col items center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <h1 className="text-4xl mb-4">Cześć, {userName}</h1>
    <h2 className="text-2xl mb-4">Klasa: {userClass}</h2>
    <h3 className="text-xl mb-4">Punkty: {points} zł/h</h3>
    <button onClick={() => handleScanCode(10)} className="p-2 bg-green-500 rounded">
      Skanuj kod QR / Wpisz hasło
    </button>
  </main>
  );
}
