"use client";

import { useEffect, useState } from "react";

const levels = ["Junior", "Mid", "Senior", "God Level"];

export default function CharacterCard() {
  const [userName, setUserName] = useState("");
  const [userClass, setUserClass] = useState("");
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(levels[0]);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const userClass = localStorage.getItem("userClass");
    setUserName(name ?? "");
    setUserClass(userClass ?? "");
    // Pobierz punkty użytkownika z bazy danych i ustaw odpowiedni poziom
    // Przykład: setLevel(levels[points / 100]);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl mb-4">Karta Postaci</h1>
      <h2 className="text-2xl mb-4">Imię: {userName}</h2>
      <h3 className="text-xl mb-4">Klasa: {userClass}</h3>
      <h4 className="text-lg mb-4">Punkty: {points} zł/h</h4>
      <h5 className="text-lg mb-4">Poziom: {level}</h5>
    </main>
  );
}