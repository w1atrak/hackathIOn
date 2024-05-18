"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Chatbox from "~/app/Chatbox";

type ClassType = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function ClassSelection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [classOptions, setClassOptions] = useState<ClassType[]>([]);

  const [classSelected, setClassSelected] = useState(false);

  const[chatLines, setChatLines] = useState([]);
  const [isChatboxComplete, setIsChatboxComplete] = useState(false);
  useEffect(() => {
    if (isChatboxComplete) {
      // navigate('/home');
    }
  }, [isChatboxComplete]);

  function setChatLinesBasedOnClass(class_name: string){
    let lines = [];
    switch(class_name) {
      case 'Class1':
        lines = ['Welcome to Class1!', 'You have selected a great class!'];
        break;
      case 'Class2':
        lines = ['Welcome to Class2!', 'This class is challenging!'];
        break;
      case 'Class3':
        lines = ['Welcome to Class3!', 'This class is fun!'];
        break;
      default:
        lines = ['Welcome!', 'You have selected a class!'];
    }
    setChatLines(lines);
  }

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

    setClassSelected(true);

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
      router.push("/home");
    } catch (error) {
      console.error("Wystąpił błąd podczas aktualizacji klasy:", error);
      alert("Wystąpił błąd podczas aktualizacji klasy!");
    } finally {
      setLoading(false);

    }
  };

  return (
    <main className="flex flex-col items-center text-center justify-center min-h-screen">
      {!classSelected && <div>
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
      </div>}
      {classSelected &&
        <div>
          <div>

          </div>
          <Chatbox chatLines = {chatLines} ></Chatbox>
        </div>
      }
    </main>
  );
}
