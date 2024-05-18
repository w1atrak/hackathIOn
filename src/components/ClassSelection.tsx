"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { db } from "~/server/db"; // Zakomentowane, aby nie używać bazy danych
// import { users, classes } from "~/server/db/schema";
// import { eq } from "drizzle-orm";
import Image from 'next/image';

// Typ dla klasy z danymi mock
type ClassType = {
  id: number;
  name: string;
  imageUrl: string;
};

const mockClasses: ClassType[] = [
  { id: 5, name: "UX/UI Designer", imageUrl: "/designer.png" },
  { id: 6, name: "Game Developer", imageUrl: "/game.png" },
  { id: 7, name: "Full Stack Developer", imageUrl: "/full_stack.png" },
  { id: 8, name: "AI Engineer", imageUrl: "/ai.png" },
];

export default function ClassSelection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassType[]>([]);

  useEffect(() => {
    const fetchMockClasses = async () => {
      try {
        // Symulacja opóźnienia sieci
        await new Promise(resolve => setTimeout(resolve, 500));
        setClassOptions(mockClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
        alert('Wystąpił błąd podczas pobierania klas!');
      }
    };

    fetchMockClasses().catch(console.error);
  }, []);

  const handleSelectClass = async (classId: number) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Nie znaleziono użytkownika!");
      setLoading(false);
      return;
    }

    try {
      // Symulacja aktualizacji w bazie danych
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Class updated successfully to ${classId} for user ${userId}`);
      router.push("/game");
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji klasy:", error);
      alert("Wystąpił błąd podczas aktualizacji klasy!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center text-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">WYBIERZ SWOJE<br/>✨PRZEZNACZENIE✨</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {classOptions.map((cls) => (
          <div
            key={cls.id}
            className="image-container cursor-pointer"
            onClick={() => handleSelectClass(cls.id)}
          >
            <Image src={cls.imageUrl} alt={cls.name} width={200} height={200} />
            <span>{cls.name}</span>
          </div>
        ))}
      </div>
      {loading && <p>Aktualizowanie...</p>}
    </main>
  );
}
