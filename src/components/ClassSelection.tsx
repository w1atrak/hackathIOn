"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

type ClassType = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function ClassSelection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassType[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('https://test.nyaaa.me/data/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: { classes: ClassType[] } = await response.json();

        const classesWithImages: ClassType[] = data.classes.map(cls => ({
          ...cls,
          imageUrl: `/${cls.imageUrl}`,
        }));
        
        setClassOptions(classesWithImages);
      } catch (error) {
        console.error('Error fetching classes:', error);
        alert('Wystąpił błąd podczas pobierania klas!');
      }
    };

    fetchClasses().catch(console.error);
  }, []);

  const handleSelectClass = async (classId: number) => {
    setLoading(true);
    console.log(localStorage);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Nie znaleziono użytkownika!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://test.nyaaa.me/users/class', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: Number(userId), classId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

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
