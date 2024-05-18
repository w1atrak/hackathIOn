"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "~/server/db";
import { users, classes } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';

type ClassType = InferSelectModel<typeof classes>;

export default function ClassSelection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassType[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classData: ClassType[] = await db.select().from(classes).execute();
        setClassOptions(classData);
      } catch (error) {
        console.error('Error fetching classes:', error);
        alert('Wystąpił błąd podczas pobierania klas!');
      }
    };

    const fetchData = async () => {
      await fetchClasses();
    };

    fetchData().catch(console.error);
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
      await db.update(users)
        .set({ classId })
        .where(eq(users.id, Number(userId)))
        .execute();
      console.log("Class updated successfully");
      router.push("/game");
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji klasy:", error);
      alert("Wystąpił błąd podczas aktualizacji klasy!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl mb-8">WYBIERZ SWOJE PRZEZNACZENIE</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {classOptions.map((cls) => (
          <div
            key={cls.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSelectClass(cls.id)}
          >
            <Image src={cls.imageUrl} alt={cls.name} className="mb-2 w-full" width={200} height={200} />
            <span>{cls.name}</span>
          </div>
        ))}
      </div>
      {loading && <p>Aktualizowanie...</p>}
    </main>
  );
}
